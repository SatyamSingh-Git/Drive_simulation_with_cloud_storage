const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config();

// Initialize Firebase Admin SDK
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './config/firebase-service-account.json';

try {
  const serviceAccount = require(path.resolve(serviceAccountPath));
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });

  console.log('✅ Firebase Admin initialized successfully');
} catch (error) {
  console.error('❌ Firebase Admin initialization error:', error.message);
  console.log('⚠️  Please ensure firebase-service-account.json is in the config folder');
}

const bucket = admin.storage().bucket();

module.exports = {
  admin,
  bucket
};
