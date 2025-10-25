# 🚀 Quick Reference Card

## One-Page Cheat Sheet for Dock-D Backend

---

## 🏃 Quick Start (5 Minutes)

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
copy .env.example .env

# 3. Edit .env with your settings
notepad .env

# 4. Start server
npm run dev
```

---

## 📝 Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/dock-d
JWT_SECRET=your-secret-key-change-this
FIREBASE_SERVICE_ACCOUNT_PATH=./config/firebase-service-account.json
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
CORS_ORIGIN=http://localhost:3000
```

---

## 🔗 API Endpoints

### Authentication
```http
POST   /api/auth/signup      # Register user
POST   /api/auth/login       # Login user
GET    /api/auth/me          # Get current user (protected)
```

### File Upload
```http
POST   /api/upload           # Upload file (protected)
GET    /api/upload/files     # List files (protected)
DELETE /api/upload/:id       # Delete file (protected)
```

---

## 🧪 Quick Test Commands

### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"test123\",\"name\":\"Test User\"}"
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"test123\"}"
```

### Upload File
```bash
curl -X POST http://localhost:5000/api/upload ^
  -H "Authorization: Bearer YOUR_TOKEN" ^
  -F "file=@path\to\file.pdf"
```

### Get Files
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" ^
  http://localhost:5000/api/upload/files
```

---

## 🗂️ Project Structure

```
Dock-D/
├── config/          # Firebase configuration
├── middleware/      # Auth middleware
├── models/          # MongoDB schemas (User, File)
├── routes/          # API routes (auth, upload)
├── .env             # Environment variables
├── server.js        # Main server file
└── package.json     # Dependencies
```

---

## 🔥 Firebase Setup

1. Go to: https://console.firebase.google.com/
2. Create project → Enable Storage
3. Project Settings → Service accounts → Generate key
4. Save as: `config/firebase-service-account.json`
5. Copy bucket name to `.env`

---

## 🗄️ MongoDB Setup

### Local:
```bash
net start MongoDB
```

### Atlas:
1. https://www.mongodb.com/cloud/atlas
2. Create cluster → Create user → Whitelist IP
3. Copy connection string to `.env`

---

## 🚀 Deployment Quick Commands

### Heroku
```bash
heroku create dock-d-backend
heroku config:set MONGODB_URI="..." JWT_SECRET="..." FIREBASE_STORAGE_BUCKET="..."
git push heroku main
```

### Railway
```bash
# Use Railway dashboard to:
# 1. Connect GitHub repo
# 2. Add environment variables
# 3. Deploy automatically
```

---

## 🐛 Common Issues

### MongoDB Connection Error
```bash
# Check if running
net start MongoDB

# Or update .env with Atlas connection string
```

### Firebase Error
```bash
# Check file exists
dir config\firebase-service-account.json

# Verify .env has correct bucket name
```

### Port Already in Use
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID [PID] /F
```

---

## 📚 Documentation Files

- `README.md` - Complete documentation
- `SETUP_GUIDE.md` - Quick setup
- `FIREBASE_SETUP.md` - Firebase guide
- `MONGODB_SETUP.md` - MongoDB guide
- `API_TESTING.md` - API testing
- `DEPLOYMENT.md` - Deploy guide
- `PROJECT_SUMMARY.md` - Project overview

---

## ⚡ Useful Commands

```bash
# Development
npm run dev          # Start with nodemon

# Production
npm start            # Start server

# MongoDB shell
mongosh              # Connect to local MongoDB

# Check running processes
netstat -ano | findstr :5000

# View logs (Heroku)
heroku logs --tail
```

---

## 🔐 Security Checklist

- [ ] Strong JWT_SECRET
- [ ] HTTPS in production
- [ ] Update CORS_ORIGIN
- [ ] Firebase production rules
- [ ] MongoDB IP whitelist
- [ ] No secrets in Git

---

## 📞 Help

- Full docs: See `README.md`
- Setup issues: See `SETUP_GUIDE.md`
- Firebase help: See `FIREBASE_SETUP.md`
- MongoDB help: See `MONGODB_SETUP.md`
- API testing: See `API_TESTING.md`
- Deployment: See `DEPLOYMENT.md`

---

## ✅ Pre-flight Checklist

Before starting:
- [ ] Node.js installed (v16+)
- [ ] MongoDB installed OR Atlas account
- [ ] Firebase project created
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file configured
- [ ] Firebase service account key in place

---

**Quick Links:**
- Firebase Console: https://console.firebase.google.com/
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Postman: https://www.postman.com/downloads/

---

**Version:** 1.0.0
**Last Updated:** October 2025
