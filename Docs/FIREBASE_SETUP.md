# Firebase Setup - Complete Guide with Screenshots

## 📋 Prerequisites
- Google account
- 5 minutes of time

---

## Step 1: Create Firebase Project

### 1.1 Go to Firebase Console
Navigate to: https://console.firebase.google.com/

### 1.2 Create New Project
1. Click **"Add project"** (or **"Create a project"**)
2. Enter project name: `dock-d-backend` (or your preferred name)
3. Click **"Continue"**

### 1.3 Google Analytics (Optional)
- **Disable** Google Analytics for faster setup
- Or enable if you want analytics
- Click **"Create project"**

### 1.4 Wait for Project Creation
- Takes about 30 seconds
- Click **"Continue"** when ready

---

## Step 2: Enable Firebase Storage

### 2.1 Navigate to Storage
1. In the left sidebar, click **"Build"**
2. Click **"Storage"**
3. Click **"Get Started"**

### 2.2 Security Rules
Choose one:

**Option A: Test Mode (Development)**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```
✅ Easy for testing
⚠️ **Not secure for production!**

**Option B: Production Mode (Recommended for later)**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
✅ Secure - requires authentication
Click **"Next"**

### 2.3 Select Location
- Choose a location close to your users
- Example: `us-central` or `europe-west`
- Click **"Done"**

Storage is now enabled! ✅

---

## Step 3: Get Firebase Service Account Key

### 3.1 Open Project Settings
1. Click the **⚙️ gear icon** (top-left, next to "Project Overview")
2. Click **"Project settings"**

### 3.2 Navigate to Service Accounts
1. Click the **"Service accounts"** tab (top menu)
2. You'll see: "Firebase Admin SDK"

### 3.3 Generate Private Key
1. Scroll down to **"Admin SDK configuration snippet"**
2. Select **"Node.js"** (should be selected by default)
3. Click **"Generate new private key"** button
4. A warning dialog appears
5. Click **"Generate key"**

### 3.4 Save the JSON File
- A JSON file will be downloaded automatically
- **Filename**: `dock-d-backend-firebase-adminsdk-xxxxx-xxxxxxxxxx.json`
- **⚠️ IMPORTANT**: Keep this file secure! It contains sensitive credentials.

### 3.5 Rename and Move File
1. Rename to: `firebase-service-account.json`
2. Move to your project folder: `Dock-D/config/firebase-service-account.json`

**Final location:**
```
Dock-D/
└── config/
    └── firebase-service-account.json
```

---

## Step 4: Get Your Storage Bucket Name

### 4.1 Find Bucket Name (Method 1 - Storage Page)
1. Go back to **"Storage"** in left sidebar
2. Look at the top of the page
3. You'll see: **"gs://your-project-id.appspot.com"**
4. Your bucket name is: `your-project-id.appspot.com`

### 4.2 Find Bucket Name (Method 2 - Project Settings)
1. Go to **"Project settings"** (gear icon)
2. Under **"General"** tab
3. Look for **"Project ID"**: `your-project-id`
4. Your bucket name is: `your-project-id.appspot.com`

### 4.3 Update .env File
Open your `.env` file and add:
```env
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
```

**Example:**
```env
FIREBASE_STORAGE_BUCKET=dock-d-backend.appspot.com
```

---

## Step 5: Verify Setup

### 5.1 Check File Structure
```
Dock-D/
├── config/
│   └── firebase-service-account.json  ✅ Should exist
├── .env                               ✅ Should have FIREBASE_STORAGE_BUCKET
└── ...
```

### 5.2 Check .env Contents
Your `.env` should have:
```env
PORT=5000
NODE_ENV=development

MONGODB_URI=mongodb://localhost:27017/dock-d

JWT_SECRET=your-super-secret-jwt-key-change-this

FIREBASE_SERVICE_ACCOUNT_PATH=./config/firebase-service-account.json
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com

CORS_ORIGIN=http://localhost:3000
```

### 5.3 Test Your Setup
```bash
npm run dev
```

**Expected output:**
```
✅ Firebase Admin initialized successfully
✅ MongoDB connected successfully
🚀 Server is running on port 5000
```

If you see these checkmarks, you're good to go! 🎉

---

## 🔒 Security Best Practices

### 1. Keep Service Account Secure
- ❌ **Never** commit `firebase-service-account.json` to GitHub
- ✅ It's already in `.gitignore`
- ❌ **Never** share this file publicly

### 2. Update Storage Rules for Production
Replace test mode rules with:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /uploads/{userId}/{fileName} {
      // Only the user who owns this folder can read/write
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 3. Rotate Keys if Compromised
If your service account key is exposed:
1. Go to **"Service accounts"**
2. Generate a new key
3. Delete the old key
4. Update your server

---

## 🐛 Troubleshooting

### Error: "Firebase Storage bucket not initialized"

**Solutions:**
```bash
# 1. Check file exists
dir config\firebase-service-account.json

# 2. Check .env variable
echo %FIREBASE_STORAGE_BUCKET%

# 3. Verify JSON file is valid
# Open firebase-service-account.json and check for errors
```

### Error: "Service account key is invalid"

**Solutions:**
- Re-download the service account key from Firebase
- Ensure the file is not corrupted
- Check file has correct structure (should be valid JSON)

### Error: "Permission denied"

**Solutions:**
- Check Firebase Storage rules
- Ensure Storage is enabled in Firebase Console
- Try "Test Mode" rules for initial testing

---

## 📸 Visual Checklist

After completing all steps, you should have:

✅ Firebase project created
✅ Firebase Storage enabled
✅ Service account key downloaded and placed in `config/` folder
✅ Storage bucket name added to `.env`
✅ Storage rules configured (test or production mode)
✅ Server starts without Firebase errors

---

## 🎯 Next Steps

1. ✅ Firebase setup complete
2. ⏭️ Setup MongoDB (see [SETUP_GUIDE.md](SETUP_GUIDE.md))
3. ⏭️ Start the server: `npm run dev`
4. ⏭️ Test API endpoints (see [API_TESTING.md](API_TESTING.md))

---

## 📞 Need More Help?

- Firebase Docs: https://firebase.google.com/docs/storage
- YouTube: Search "Firebase Storage Node.js Tutorial"
- Stack Overflow: Tag `firebase` + `node.js`

---

**Setup Time: ~3-5 minutes** ⏱️

**Difficulty: Easy** ⭐⭐☆☆☆
