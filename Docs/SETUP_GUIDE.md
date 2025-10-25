# Dock-D Backend - Quick Setup Guide

## 🚀 Quick Start (5 Minutes)

### Prerequisites Checklist
- ✅ Node.js installed (v16+)
- ✅ MongoDB running OR MongoDB Atlas account
- ✅ Firebase project created

---

## Step-by-Step Setup

### 1️⃣ Install Dependencies
```bash
cd Dock-D
npm install
```

### 2️⃣ Configure Environment
```bash
# Copy example file
copy .env.example .env

# Edit .env with your values
notepad .env
```

### 3️⃣ Firebase Setup (2 minutes)

#### A. Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click "Add project" → Enter name → Continue
3. Disable Google Analytics (optional) → Create project

#### B. Enable Storage
1. Left menu → "Build" → "Storage"
2. Click "Get Started"
3. Start in "Test mode" → Next → Done

#### C. Get Service Account Key
1. Project Settings (gear icon) → "Service accounts"
2. Click "Generate new private key" → Generate
3. Save as `firebase-service-account.json` in `config/` folder

#### D. Update .env
```env
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
```
*Find your project ID in Firebase Console → Project Settings*

### 4️⃣ MongoDB Setup

**Option A: Local MongoDB**
```bash
# Start MongoDB
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster → Create user → Whitelist IP
3. Get connection string → Update in .env

### 5️⃣ Start Server
```bash
npm run dev
```

**Expected Output:**
```
✅ MongoDB connected successfully
✅ Firebase Admin initialized successfully
🚀 Server is running on port 5000
📍 Environment: development
```

### 6️⃣ Test API
Open browser: http://localhost:5000

---

## 🧪 Testing with Postman/Thunder Client

### Test 1: Signup
```http
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "test123",
  "name": "Test User"
}
```

**Save the token from response!**

### Test 2: Upload File
```http
POST http://localhost:5000/api/upload
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: multipart/form-data

file: [Select a file]
```

### Test 3: Get Files
```http
GET http://localhost:5000/api/upload/files
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 🔥 Common Issues & Fixes

### MongoDB Connection Failed
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB service
net start MongoDB
```

### Firebase Error
- Ensure `firebase-service-account.json` exists in `config/` folder
- Check Firebase Storage is enabled
- Verify bucket name in .env

### Port 5000 Already in Use
```bash
# Windows: Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID [PID_NUMBER] /F

# Or change port in .env
PORT=5001
```

---

## 📁 Required File Structure

```
Dock-D/
├── config/
│   └── firebase-service-account.json  ← Download from Firebase
├── .env                                ← Copy from .env.example
├── node_modules/                       ← Created by npm install
└── [other files]
```

---

## 🎯 API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| POST | `/api/upload` | Upload file | Yes |
| GET | `/api/upload/files` | Get user files | Yes |
| DELETE | `/api/upload/:id` | Delete file | Yes |

---

## 📞 Need Help?

1. Check the main [README.md](README.md) for detailed documentation
2. Review the [Troubleshooting](README.md#troubleshooting) section
3. Ensure all environment variables are set correctly

---

**Setup Time: ~5 minutes** ⏱️
