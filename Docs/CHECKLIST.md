# ✅ Complete Setup Checklist

Use this checklist to ensure everything is set up correctly.

---

## 📋 Pre-Setup Requirements

- [ ] Node.js v16+ installed
- [ ] npm or yarn installed
- [ ] Text editor/IDE (VS Code recommended)
- [ ] Git installed (optional)
- [ ] Internet connection

---

## 🗂️ Project Setup

- [ ] Navigate to project folder: `cd Dock-D`
- [ ] Install dependencies: `npm install`
- [ ] Copy environment file: `copy .env.example .env`
- [ ] Review `.gitignore` is present

---

## 🔥 Firebase Configuration

- [ ] Create Firebase project at https://console.firebase.google.com/
- [ ] Enable Firebase Storage
- [ ] Generate service account key
- [ ] Rename key to `firebase-service-account.json`
- [ ] Place file in `config/` folder
- [ ] Copy project bucket name (format: `project-id.appspot.com`)
- [ ] Update `FIREBASE_STORAGE_BUCKET` in `.env`
- [ ] Configure storage rules (test mode for development)
- [ ] Verify Firebase initialization (no errors on server start)

---

## 🗄️ MongoDB Configuration

### Local MongoDB
- [ ] Download MongoDB Community Server
- [ ] Install MongoDB with "Install as Service" option
- [ ] Verify MongoDB is running: `net start | findstr MongoDB`
- [ ] Test connection: `mongosh`
- [ ] Update `.env`: `MONGODB_URI=mongodb://localhost:27017/dock-d`

### MongoDB Atlas (Cloud)
- [ ] Create free account at https://www.mongodb.com/cloud/atlas
- [ ] Create new cluster (free tier M0)
- [ ] Create database user
- [ ] Save username and password
- [ ] Whitelist IP address (or use 0.0.0.0/0 for testing)
- [ ] Get connection string
- [ ] Replace `<password>` with actual password
- [ ] Add database name `/dock-d` to connection string
- [ ] Update `MONGODB_URI` in `.env`
- [ ] Test connection (server starts without errors)

---

## 🔐 Environment Variables

Open `.env` and verify all fields are configured:

- [ ] `PORT=5000`
- [ ] `NODE_ENV=development`
- [ ] `MONGODB_URI=` (configured)
- [ ] `JWT_SECRET=` (change to random string)
- [ ] `FIREBASE_SERVICE_ACCOUNT_PATH=./config/firebase-service-account.json`
- [ ] `FIREBASE_STORAGE_BUCKET=` (your-project.appspot.com)
- [ ] `CORS_ORIGIN=http://localhost:3000`

---

## 🚀 Server Startup

- [ ] Start server: `npm run dev`
- [ ] Check for success messages:
  - [ ] ✅ MongoDB connected successfully
  - [ ] ✅ Firebase Admin initialized successfully
  - [ ] 🚀 Server is running on port 5000
- [ ] No error messages in console
- [ ] Server accessible at http://localhost:5000

---

## 🧪 API Testing

### Test 1: Root Endpoint
- [ ] Open browser: http://localhost:5000
- [ ] See welcome message with API endpoints

### Test 2: Signup
- [ ] Send POST to `/api/auth/signup`
- [ ] Include: email, password, name
- [ ] Receive 201 status
- [ ] Get token in response
- [ ] Save token for next tests

### Test 3: Login
- [ ] Send POST to `/api/auth/login`
- [ ] Use same credentials as signup
- [ ] Receive 200 status
- [ ] Get token in response

### Test 4: Get Current User
- [ ] Send GET to `/api/auth/me`
- [ ] Include `Authorization: Bearer TOKEN` header
- [ ] Receive user details

### Test 5: Upload File
- [ ] Send POST to `/api/upload`
- [ ] Include `Authorization: Bearer TOKEN` header
- [ ] Attach file in form-data
- [ ] Receive 201 status
- [ ] Get file URL in response
- [ ] Verify file accessible at URL

### Test 6: List Files
- [ ] Send GET to `/api/upload/files`
- [ ] Include authorization header
- [ ] See uploaded files in response

### Test 7: Delete File
- [ ] Send DELETE to `/api/upload/:fileId`
- [ ] Include authorization header
- [ ] Receive success message
- [ ] File removed from list

---

## 🛠️ Testing Tools Setup

### Postman
- [ ] Install Postman Desktop or use web version
- [ ] Import `Postman_Collection.json`
- [ ] Set `baseUrl` variable to `http://localhost:5000`
- [ ] Set `token` variable after signup/login
- [ ] Run all requests successfully

### Thunder Client (VS Code Extension)
- [ ] Install Thunder Client extension
- [ ] Import collection (if available)
- [ ] Test all endpoints

### cURL (Command Line)
- [ ] Test signup with cURL
- [ ] Test login with cURL
- [ ] Test file upload with cURL

---

## 📊 Database Verification

### MongoDB Compass (GUI)
- [ ] Install MongoDB Compass
- [ ] Connect to database
- [ ] See `dock-d` database created
- [ ] See `users` collection with test user
- [ ] See `files` collection with uploaded file metadata

### mongosh (CLI)
- [ ] Connect: `mongosh`
- [ ] Switch DB: `use dock-d`
- [ ] List collections: `show collections`
- [ ] View users: `db.users.find().pretty()`
- [ ] View files: `db.files.find().pretty()`

---

## 🔥 Firebase Console Verification

- [ ] Login to Firebase Console
- [ ] Navigate to Storage
- [ ] See `uploads/` folder
- [ ] See user-specific folders (by userId)
- [ ] See uploaded files
- [ ] Files are accessible via URL

---

## 📝 Documentation Review

- [ ] Read `README.md` - Main documentation
- [ ] Read `SETUP_GUIDE.md` - Quick setup
- [ ] Read `FIREBASE_SETUP.md` - Firebase details
- [ ] Read `MONGODB_SETUP.md` - MongoDB details
- [ ] Read `API_TESTING.md` - API examples
- [ ] Read `DEPLOYMENT.md` - Deployment guide
- [ ] Read `PROJECT_SUMMARY.md` - Project overview
- [ ] Read `QUICK_REFERENCE.md` - Quick reference
- [ ] Read `ARCHITECTURE.md` - System architecture

---

## 🔒 Security Checks

- [ ] `.env` file is in `.gitignore`
- [ ] `firebase-service-account.json` is in `.gitignore`
- [ ] `node_modules/` is in `.gitignore`
- [ ] JWT_SECRET is changed from default
- [ ] Strong passwords used
- [ ] No sensitive data in code comments
- [ ] CORS configured for specific origin (not *)

---

## 🌐 Deployment Preparation

- [ ] Choose deployment platform (Heroku/Railway/Render/AWS)
- [ ] MongoDB Atlas configured (not local)
- [ ] Firebase service account converted to base64 (if needed)
- [ ] All environment variables documented
- [ ] Production CORS_ORIGIN ready
- [ ] Frontend domain known (for CORS)
- [ ] SSL certificate ready or platform provides it

---

## 📦 Git Repository

- [ ] Initialize git: `git init`
- [ ] Create `.gitignore` with sensitive files
- [ ] First commit: `git commit -m "Initial commit"`
- [ ] Create GitHub repository
- [ ] Add remote: `git remote add origin <url>`
- [ ] Push to GitHub: `git push -u origin main`
- [ ] Verify no secrets in GitHub repo

---

## 📸 Screenshots for PDF

- [ ] Firebase Console - Project overview
- [ ] Firebase Storage - Files uploaded
- [ ] MongoDB Atlas - Cluster view
- [ ] MongoDB Compass - Data view
- [ ] Postman - Signup request
- [ ] Postman - Login response
- [ ] Postman - File upload
- [ ] Terminal - Server running
- [ ] Browser - API root endpoint
- [ ] Code editor - Project structure

---

## 📄 PDF Guide Creation

- [ ] Choose method (Word/Pandoc/Online tool)
- [ ] Include all setup steps
- [ ] Add screenshots at appropriate places
- [ ] Format code blocks properly
- [ ] Add table of contents
- [ ] Include troubleshooting section
- [ ] Add API examples
- [ ] Export/save as PDF
- [ ] Name: `Dock-D-Backend-Setup-Guide.pdf`

---

## ✅ Final Verification

- [ ] All features working locally
- [ ] No errors in console
- [ ] All tests passing
- [ ] Documentation complete
- [ ] PDF guide created
- [ ] GitHub repo ready
- [ ] Ready for deployment
- [ ] Ready for frontend integration

---

## 🎯 Optional Enhancements

- [ ] Add rate limiting
- [ ] Add request logging (Morgan)
- [ ] Add input sanitization
- [ ] Add file compression
- [ ] Add image thumbnails
- [ ] Add email verification
- [ ] Add password reset
- [ ] Add refresh tokens
- [ ] Add admin dashboard
- [ ] Add API documentation (Swagger)

---

## 📊 Success Metrics

**You've successfully completed the project if:**

✅ Server starts without errors
✅ User can signup and login
✅ Authentication works (JWT)
✅ Files upload to Firebase Storage
✅ File metadata saved to MongoDB
✅ Files can be listed and deleted
✅ API responses are consistent
✅ Documentation is complete
✅ Ready for deployment

---

## 🎉 Completion Status

**Total Tasks:** ~150
**Completed:** _____ / 150

**Progress:**
- [ ] 0-25%   - Just getting started
- [ ] 26-50%  - Making good progress
- [ ] 51-75%  - Almost there!
- [ ] 76-99%  - Final touches
- [ ] 100%    - 🎉 PROJECT COMPLETE!

---

## 📞 Need Help?

If you're stuck on any item:

1. Check the relevant documentation file
2. Review error messages carefully
3. Verify environment variables
4. Check Firebase/MongoDB console
5. Review code for typos
6. Restart server after changes
7. Clear cache/reinstall node_modules if needed

**Common Commands:**
```bash
# Restart server
Ctrl+C (stop) → npm run dev

# Reinstall dependencies
rmdir /s node_modules
npm install

# Check environment
type .env

# Test MongoDB connection
mongosh

# Check Firebase file
type config\firebase-service-account.json
```

---

**Last Updated:** October 2025
**Version:** 1.0.0

**Ready to Deploy?** See `DEPLOYMENT.md`
**Need Quick Reference?** See `QUICK_REFERENCE.md`
**Want Architecture Details?** See `ARCHITECTURE.md`
