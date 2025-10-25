# Deployment Guide

## 🚀 Deploy Your Backend to Production

This guide covers deploying to popular platforms:
1. **Heroku** (Easiest)
2. **Railway** (Modern alternative)
3. **Render** (Free tier available)
4. **AWS EC2** (Most control)

---

## Prerequisites

Before deploying:
- ✅ MongoDB Atlas account setup (not local)
- ✅ Firebase project with Storage enabled
- ✅ GitHub repository with your code
- ✅ `.gitignore` properly configured (no secrets committed)

---

## Option 1: Deploy to Heroku

### Step 1: Install Heroku CLI
Download and install: https://devcenter.heroku.com/articles/heroku-cli

### Step 2: Login to Heroku
```bash
heroku login
```

### Step 3: Create Heroku App
```bash
cd Dock-D
heroku create dock-d-backend
# Or custom name: heroku create your-app-name
```

### Step 4: Set Environment Variables

#### Method A: Using CLI
```bash
heroku config:set NODE_ENV=production
heroku config:set PORT=5000
heroku config:set MONGODB_URI="your-mongodb-atlas-connection-string"
heroku config:set JWT_SECRET="your-super-secret-jwt-key"
heroku config:set FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
heroku config:set CORS_ORIGIN="https://your-frontend-url.com"
```

#### Method B: Using Dashboard
1. Go to: https://dashboard.heroku.com/apps/dock-d-backend
2. Click **"Settings"** tab
3. Click **"Reveal Config Vars"**
4. Add each variable manually

### Step 5: Handle Firebase Service Account

**Option A: Environment Variable (Recommended)**

```bash
# Windows PowerShell
$fileContent = Get-Content -Path "config\firebase-service-account.json" -Raw
$bytes = [System.Text.Encoding]::UTF8.GetBytes($fileContent)
$base64 = [Convert]::ToBase64String($bytes)
heroku config:set FIREBASE_SERVICE_ACCOUNT_BASE64=$base64
```

Then update `config/firebase.js`:
```javascript
let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
  // Heroku - decode from base64
  const decoded = Buffer.from(
    process.env.FIREBASE_SERVICE_ACCOUNT_BASE64,
    'base64'
  ).toString('utf-8');
  serviceAccount = JSON.parse(decoded);
} else {
  // Local - read from file
  serviceAccount = require(path.resolve(serviceAccountPath));
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});
```

**Option B: Commit Encrypted File (Not Recommended)**
- Use Heroku's encryption features
- See: https://devcenter.heroku.com/articles/config-vars#example

### Step 6: Create Procfile
```bash
echo web: node server.js > Procfile
```

### Step 7: Initialize Git (if not done)
```bash
git init
git add .
git commit -m "Initial commit for Heroku deployment"
```

### Step 8: Deploy to Heroku
```bash
git push heroku main
# Or if your branch is master: git push heroku master
```

### Step 9: Open Your App
```bash
heroku open
# Or visit: https://dock-d-backend.herokuapp.com
```

### Step 10: View Logs
```bash
heroku logs --tail
```

### Step 11: Test Your Deployment
```bash
# Test base URL
curl https://dock-d-backend.herokuapp.com

# Test signup
curl -X POST https://dock-d-backend.herokuapp.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'
```

---

## Option 2: Deploy to Railway

### Step 1: Sign Up
1. Go to: https://railway.app/
2. Sign up with GitHub

### Step 2: Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Connect your GitHub account
4. Select your `Dock-D` repository

### Step 3: Add Environment Variables
1. Click on your deployment
2. Go to **"Variables"** tab
3. Click **"Add Variable"**
4. Add all variables from `.env`:
   ```
   NODE_ENV=production
   MONGODB_URI=your-connection-string
   JWT_SECRET=your-secret
   FIREBASE_STORAGE_BUCKET=your-bucket
   FIREBASE_SERVICE_ACCOUNT_BASE64=your-base64-key
   CORS_ORIGIN=your-frontend-url
   ```

### Step 4: Deploy
- Railway automatically deploys on push to main branch
- View logs in the dashboard
- Get your public URL from the **"Settings"** tab

### Step 5: Set Up Custom Domain (Optional)
1. Go to **"Settings"** → **"Domains"**
2. Click **"Generate Domain"**
3. Or add your custom domain

---

## Option 3: Deploy to Render

### Step 1: Sign Up
1. Go to: https://render.com/
2. Sign up with GitHub

### Step 2: Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: dock-d-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free (or paid)

### Step 3: Add Environment Variables
1. Scroll to **"Environment Variables"**
2. Click **"Add Environment Variable"**
3. Add all variables:
   ```
   NODE_ENV=production
   MONGODB_URI=your-connection-string
   JWT_SECRET=your-secret
   FIREBASE_STORAGE_BUCKET=your-bucket
   FIREBASE_SERVICE_ACCOUNT_BASE64=your-base64-key
   CORS_ORIGIN=your-frontend-url
   PORT=10000
   ```

### Step 4: Deploy
1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Your URL will be: `https://dock-d-backend.onrender.com`

### Notes:
- Free tier may sleep after inactivity
- First request after sleep takes ~30 seconds to wake up

---

## Option 4: Deploy to AWS EC2

### Prerequisites
- AWS account
- Basic Linux knowledge

### Step 1: Launch EC2 Instance
1. Go to AWS Console → EC2
2. Click **"Launch Instance"**
3. Choose **Ubuntu Server 22.04 LTS**
4. Instance type: **t2.micro** (free tier)
5. Create/select key pair (download .pem file)
6. Security group: Allow HTTP (80), HTTPS (443), SSH (22)
7. Launch instance

### Step 2: Connect to Instance
```bash
# Windows (use Git Bash or WSL)
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@your-instance-ip
```

### Step 3: Install Node.js
```bash
# Update system
sudo apt update
sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node --version
npm --version
```

### Step 4: Install Git and Clone Repo
```bash
sudo apt install git -y
git clone https://github.com/yourusername/Dock-D.git
cd Dock-D
```

### Step 5: Install Dependencies
```bash
npm install
```

### Step 6: Set Up Environment Variables
```bash
nano .env
# Paste your environment variables
# Press Ctrl+X, then Y, then Enter to save
```

### Step 7: Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

### Step 8: Start Application
```bash
pm2 start server.js --name dock-d-backend
pm2 save
pm2 startup
# Run the command it outputs
```

### Step 9: Set Up Nginx (Optional - for domain/SSL)
```bash
sudo apt install nginx -y

# Create Nginx config
sudo nano /etc/nginx/sites-available/dock-d-backend

# Add:
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/dock-d-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 10: Set Up SSL with Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

---

## Post-Deployment Checklist

### ✅ Verify Deployment
```bash
# Test health check
curl https://your-deployed-url.com

# Test signup
curl -X POST https://your-deployed-url.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test"}'
```

### ✅ Update CORS Origin
In `.env` on server:
```env
CORS_ORIGIN=https://your-frontend-domain.com
```

### ✅ Update Firebase Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /uploads/{userId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### ✅ MongoDB Atlas Network Access
- Add your server's IP address to whitelist
- Or keep `0.0.0.0/0` for development

### ✅ Monitor Application
- Set up error logging (e.g., Sentry)
- Monitor uptime (e.g., UptimeRobot)
- Set up alerts for downtime

---

## 🐛 Troubleshooting Deployment

### Error: "Cannot find module"
```bash
# Ensure all dependencies are installed
npm install
# Check NODE_ENV is set to 'production'
```

### Error: "MongoDB connection failed"
- Verify connection string is correct
- Check IP whitelist in MongoDB Atlas
- Ensure network access is configured

### Error: "Firebase Storage not initialized"
- Verify `FIREBASE_SERVICE_ACCOUNT_BASE64` is set correctly
- Check storage bucket name
- Ensure Firebase Storage is enabled

### Application Not Starting
```bash
# Check logs
heroku logs --tail  # Heroku
railway logs         # Railway
# Or check platform-specific logs
```

---

## 📊 Monitoring & Maintenance

### Set Up Logging
- Use services like:
  - Papertrail
  - Loggly
  - Datadog

### Set Up Uptime Monitoring
- UptimeRobot (free): https://uptimerobot.com/
- Pingdom
- StatusCake

### Performance Monitoring
- New Relic
- AppDynamics
- Datadog APM

---

## 💰 Cost Comparison

| Platform | Free Tier | Paid Plans |
|----------|-----------|------------|
| **Heroku** | No free tier (2022+) | $7/month |
| **Railway** | $5 credit/month | Pay as you go |
| **Render** | Yes (with limits) | $7/month |
| **AWS EC2** | 750 hrs/month (12 months) | From $3.50/month |

---

## 🔐 Security Best Practices

1. ✅ Use HTTPS only
2. ✅ Keep dependencies updated
3. ✅ Use strong JWT secrets
4. ✅ Enable rate limiting
5. ✅ Set up CORS properly
6. ✅ Monitor for suspicious activity
7. ✅ Regular backups of MongoDB
8. ✅ Rotate secrets periodically

---

## 📞 Support

- Heroku Docs: https://devcenter.heroku.com/
- Railway Docs: https://docs.railway.app/
- Render Docs: https://render.com/docs
- AWS Docs: https://docs.aws.amazon.com/

---

**Congratulations! Your backend is now live! 🎉**
