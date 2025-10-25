const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { bucket } = require('../config/firebase');
const authMiddleware = require('../middleware/auth');
const File = require('../models/File');

// Configure multer for memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow all file types, but you can restrict if needed
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt|zip|mp4|mp3/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Allowed types: jpeg, jpg, png, gif, pdf, doc, docx, txt, zip, mp4, mp3'));
    }
  }
});

/**
 * @route   POST /api/upload
 * @desc    Upload file to Firebase Storage
 * @access  Private
 */
router.post('/', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Create unique filename
    const timestamp = Date.now();
    const fileName = `${timestamp}-${req.file.originalname}`;
    const filePath = `uploads/${req.user._id}/${fileName}`;

    // Create a blob in Firebase Storage
    const blob = bucket.file(filePath);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
        metadata: {
          uploadedBy: req.user._id.toString(),
          originalName: req.file.originalname
        }
      }
    });

    // Handle upload errors
    blobStream.on('error', (error) => {
      console.error('Upload error:', error);
      res.status(500).json({
        success: false,
        message: 'Error uploading file to cloud storage',
        error: error.message
      });
    });

    // Handle successful upload
    blobStream.on('finish', async () => {
      try {
        // Make file publicly accessible (optional - you can skip this for private files)
        await blob.makePublic();

        // Get public URL
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;

        // Save file metadata to MongoDB
        const fileDoc = new File({
          userId: req.user._id,
          fileName: fileName,
          originalName: req.file.originalname,
          mimeType: req.file.mimetype,
          size: req.file.size,
          firebaseUrl: publicUrl,
          firebasePath: filePath
        });

        await fileDoc.save();

        res.status(201).json({
          success: true,
          message: 'File uploaded successfully',
          data: {
            file: {
              id: fileDoc._id,
              fileName: fileDoc.fileName,
              originalName: fileDoc.originalName,
              mimeType: fileDoc.mimeType,
              size: fileDoc.size,
              url: publicUrl,
              uploadedAt: fileDoc.uploadedAt
            }
          }
        });
      } catch (error) {
        console.error('Error saving file metadata:', error);
        res.status(500).json({
          success: false,
          message: 'File uploaded but error saving metadata',
          error: error.message
        });
      }
    });

    // Write buffer to blob
    blobStream.end(req.file.buffer);
  } catch (error) {
    console.error('Upload route error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing upload',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/upload/files
 * @desc    Get all files uploaded by the user
 * @access  Private
 */
router.get('/files', authMiddleware, async (req, res) => {
  try {
    const files = await File.find({ userId: req.user._id })
      .sort({ uploadedAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      count: files.length,
      data: {
        files: files.map(file => ({
          id: file._id,
          fileName: file.fileName,
          originalName: file.originalName,
          mimeType: file.mimeType,
          size: file.size,
          url: file.firebaseUrl,
          uploadedAt: file.uploadedAt
        }))
      }
    });
  } catch (error) {
    console.error('Get files error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching files',
      error: error.message
    });
  }
});

/**
 * @route   DELETE /api/upload/:id
 * @desc    Delete a file
 * @access  Private
 */
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const file = await File.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    // Delete from Firebase Storage
    try {
      await bucket.file(file.firebasePath).delete();
    } catch (error) {
      console.error('Error deleting from Firebase:', error);
    }

    // Delete from MongoDB
    await File.deleteOne({ _id: file._id });

    res.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting file',
      error: error.message
    });
  }
});

module.exports = router;
