# Dock-D Backend API 🚀

A comprehensive backend system built with **Node.js**, **Express**, **MongoDB**, and **Firebase Cloud Storage** for user authentication and file management.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Firebase Setup](#firebase-setup)
- [MongoDB Setup](#mongodb-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Testing with Postman](#testing-with-postman)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

- ✅ **User Authentication** (Signup/Login with JWT)
- ✅ **File Upload** to Firebase Cloud Storage
- ✅ **File Management** (List, Delete files)
- ✅ **MongoDB** for user and file metadata storage
- ✅ **Secure** password hashing with bcryptjs
- ✅ **CORS** enabled for frontend integration
- ✅ **Input validation** using express-validator

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (local or MongoDB Atlas)
- **Cloud Storage**: Firebase Cloud Storage
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Password Hashing**: bcryptjs

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Firebase Project** with Storage enabled
- **Git** (optional, for cloning)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Dock-D
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

---

## ⚙️ Configuration

### 1. Create Environment File

Copy the example environment file:

```bash
copy .env.example .env
```

### 2. Update `.env` File

Open `.env` and configure the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/dock-d
# Or use MongoDB Atlas: mongodb+srv://<username>:<password>@cluster.mongodb.net/dock-d

# JWT Secret (Change this to a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Firebase Configuration
FIREBASE_SERVICE_ACCOUNT_PATH=./config/firebase-service-account.json
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com

# CORS Origin (Frontend URL)
CORS_ORIGIN=http://localhost:3000
```

---

## 🔥 Firebase Setup

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or select existing project
3. Follow the setup wizard

### Step 2: Enable Firebase Storage

1. In Firebase Console, go to **"Build" → "Storage"**
2. Click **"Get Started"**
3. Choose **"Start in production mode"** or **"Test mode"**
4. Select a location and click **"Done"**

### Step 3: Generate Service Account Key

1. Go to **Project Settings** (gear icon) → **"Service accounts"**
2. Click **"Generate new private key"**
3. Click **"Generate key"** - this downloads a JSON file
4. Rename the file to `firebase-service-account.json`
5. Place it in the `config/` folder:
   ```
   Dock-D/
   └── config/
       └── firebase-service-account.json
   ```

### Step 4: Update Firebase Storage Bucket

In your `.env` file, set:

```env
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
```

Replace `your-project-id` with your actual Firebase project ID (found in Project Settings).

### Step 5: Configure Storage Rules (Optional)

For testing, you can use these rules in Firebase Console → Storage → Rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true; // For testing only!
    }
  }
}
```

⚠️ **Important**: Use proper authentication rules in production!

---

## 🗄️ MongoDB Setup

### Option 1: Local MongoDB

1. **Install MongoDB** - [Download](https://www.mongodb.com/try/download/community)
2. **Start MongoDB Service**:
   ```bash
   mongod
   ```
3. Use the default connection string in `.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/dock-d
   ```

### Option 2: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a **free cluster**
3. Create a **database user** (username and password)
4. **Whitelist your IP** or allow access from anywhere (0.0.0.0/0)
5. Get your **connection string**:
   - Click **"Connect"** → **"Connect your application"**
   - Copy the connection string
6. Update `.env`:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/dock-d
   ```

---

## ▶️ Running the Application

### Development Mode (with auto-restart)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:5000` (or the PORT specified in `.env`).

### Verify Server is Running

Open your browser and go to: `http://localhost:5000`

You should see:
```json
{
  "message": "Welcome to Dock-D Backend API",
  "version": "1.0.0",
  "endpoints": {
    "auth": "/api/auth (signup, login)",
    "upload": "/api/upload (file upload)"
  }
}
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000
```

---

### 🔐 Authentication Endpoints

#### 1. **Signup**

**POST** `/api/auth/signup`

Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "64abc123...",
      "email": "user@example.com",
      "name": "John Doe",
      "createdAt": "2025-10-20T10:30:00.000Z"
    }
  }
}
```

---

#### 2. **Login**

**POST** `/api/auth/login`

Authenticate existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "64abc123...",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
}
```

---

#### 3. **Get Current User**

**GET** `/api/auth/me`

Get authenticated user details.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "64abc123...",
      "email": "user@example.com",
      "name": "John Doe",
      "createdAt": "2025-10-20T10:30:00.000Z"
    }
  }
}
```

---

### 📤 File Upload Endpoints

#### 4. **Upload File**

**POST** `/api/upload`

Upload a file to Firebase Storage (requires authentication).

**Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
- **Key**: `file`
- **Value**: (select your file)

**Allowed File Types:**
- Images: jpeg, jpg, png, gif
- Documents: pdf, doc, docx, txt
- Archives: zip
- Media: mp4, mp3

**Max File Size**: 10MB

**Response (201):**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "file": {
      "id": "64xyz789...",
      "fileName": "1729422600000-myfile.pdf",
      "originalName": "myfile.pdf",
      "mimeType": "application/pdf",
      "size": 524288,
      "url": "https://storage.googleapis.com/your-bucket/uploads/...",
      "uploadedAt": "2025-10-20T11:00:00.000Z"
    }
  }
}
```

---

#### 5. **Get All Files**

**GET** `/api/upload/files`

Get all files uploaded by the authenticated user.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": {
    "files": [
      {
        "id": "64xyz789...",
        "fileName": "1729422600000-myfile.pdf",
        "originalName": "myfile.pdf",
        "mimeType": "application/pdf",
        "size": 524288,
        "url": "https://storage.googleapis.com/...",
        "uploadedAt": "2025-10-20T11:00:00.000Z"
      }
    ]
  }
}
```

---

#### 6. **Delete File**

**DELETE** `/api/upload/:id`

Delete a file from Firebase Storage and database.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**URL Parameter:**
- `id` - File ID from database

**Response (200):**
```json
{
  "success": true,
  "message": "File deleted successfully"
}
```

---

## 📁 Project Structure

```
Dock-D/
├── config/
│   ├── firebase.js                          # Firebase Admin SDK initialization
│   ├── firebase-service-account.json        # Firebase credentials (git-ignored)
│   └── firebase-service-account.example.json
├── middleware/
│   └── auth.js                              # JWT authentication middleware
├── models/
│   ├── User.js                              # User schema (MongoDB)
│   └── File.js                              # File metadata schema
├── routes/
│   ├── auth.js                              # Authentication routes
│   └── upload.js                            # File upload routes
├── .env                                     # Environment variables (git-ignored)
├── .env.example                             # Example environment file
├── .gitignore                               # Git ignore file
├── package.json                             # Dependencies and scripts
├── server.js                                # Main server file
└── README.md                                # This file
```

---

## 🧪 Testing with Postman

### Setup

1. **Download Postman**: [Get Postman](https://www.postman.com/downloads/)
2. **Create a new collection**: "Dock-D API"

### Test Flow

#### Step 1: Signup
- **Method**: POST
- **URL**: `http://localhost:5000/api/auth/signup`
- **Body** → **raw** → **JSON**:
  ```json
  {
    "email": "test@example.com",
    "password": "test123",
    "name": "Test User"
  }
  ```
- **Send** → Copy the `token` from response

#### Step 2: Login (Optional)
- **Method**: POST
- **URL**: `http://localhost:5000/api/auth/login`
- **Body** → **raw** → **JSON**:
  ```json
  {
    "email": "test@example.com",
    "password": "test123"
  }
  ```

#### Step 3: Upload File
- **Method**: POST
- **URL**: `http://localhost:5000/api/upload`
- **Headers**: 
  - **Key**: `Authorization`
  - **Value**: `Bearer <your-token>`
- **Body** → **form-data**:
  - **Key**: `file` (change type to **File**)
  - **Value**: Select a file from your computer
- **Send**

#### Step 4: Get Files
- **Method**: GET
- **URL**: `http://localhost:5000/api/upload/files`
- **Headers**: 
  - **Key**: `Authorization`
  - **Value**: `Bearer <your-token>`
- **Send**

---

## 🌐 Deployment

### Deploy to Heroku

1. **Install Heroku CLI**: [Get Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

2. **Login to Heroku**:
   ```bash
   heroku login
   ```

3. **Create Heroku App**:
   ```bash
   heroku create dock-d-backend
   ```

4. **Set Environment Variables**:
   ```bash
   heroku config:set MONGODB_URI="your-mongodb-atlas-uri"
   heroku config:set JWT_SECRET="your-secret-key"
   heroku config:set FIREBASE_STORAGE_BUCKET="your-bucket"
   ```

5. **Upload Firebase Service Account** (as base64):
   ```bash
   # Windows (PowerShell)
   $fileContent = Get-Content -Path "config\firebase-service-account.json" -Raw
   $bytes = [System.Text.Encoding]::UTF8.GetBytes($fileContent)
   $base64 = [Convert]::ToBase64String($bytes)
   heroku config:set FIREBASE_SERVICE_ACCOUNT_BASE64=$base64
   ```

6. **Update `config/firebase.js`** to handle base64:
   ```javascript
   let serviceAccount;
   if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
     const decoded = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf-8');
     serviceAccount = JSON.parse(decoded);
   } else {
     serviceAccount = require(path.resolve(serviceAccountPath));
   }
   ```

7. **Deploy**:
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Deploy to Railway/Render

Similar process - add environment variables in their dashboards.

---

## 🔧 Troubleshooting

### Issue: MongoDB Connection Error

**Error**: `MongooseServerSelectionError`

**Solutions**:
- Check if MongoDB is running: `mongod`
- Verify `MONGODB_URI` in `.env`
- For Atlas: Check IP whitelist and credentials

---

### Issue: Firebase Storage Error

**Error**: `Firebase Storage bucket not initialized`

**Solutions**:
- Verify `firebase-service-account.json` exists in `config/` folder
- Check `FIREBASE_STORAGE_BUCKET` in `.env`
- Ensure Firebase Storage is enabled in Firebase Console

---

### Issue: Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Change port in .env
PORT=5001
```

---

### Issue: JWT Token Invalid

**Error**: `Invalid token. Authorization denied.`

**Solutions**:
- Ensure token is sent in header: `Authorization: Bearer <token>`
- Check if `JWT_SECRET` matches between signup and login
- Token might be expired (default: 7 days)

---

## 📸 Screenshots

### 1. Firebase Console - Storage Setup
*Screenshot showing Firebase Storage enabled*

### 2. Postman - Signup Request
*Screenshot of successful signup with token*

### 3. Postman - File Upload
*Screenshot of file upload with Firebase URL*

### 4. MongoDB Compass - Data View
*Screenshot of users and files collections*

---

## 🤝 Contributing

Feel free to fork this project and submit pull requests!

---

## 📄 License

ISC License

---

## 📞 Support

For issues or questions, please create an issue in the repository.

---

## 🎯 Next Steps

- [ ] Add email verification
- [ ] Implement refresh tokens
- [ ] Add file sharing functionality
- [ ] Create React/Vue frontend
- [ ] Add rate limiting
- [ ] Implement file compression
- [ ] Add webhook notifications

---

**Made with ❤️ using Node.js, MongoDB, and Firebase**
