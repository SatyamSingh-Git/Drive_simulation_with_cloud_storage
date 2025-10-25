# MongoDB Setup Guide

## 📋 Choose Your Setup Method

1. **Local MongoDB** - Install on your computer (Recommended for development)
2. **MongoDB Atlas** - Cloud database (Recommended for production)

---

## Option 1: Local MongoDB Setup

### For Windows

#### Step 1: Download MongoDB
1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - **Version**: Latest (e.g., 7.0.x)
   - **Platform**: Windows
   - **Package**: MSI
3. Click **"Download"**

#### Step 2: Install MongoDB
1. Run the downloaded `.msi` file
2. Click **"Next"** → **"Next"**
3. Accept license → **"Next"**
4. Choose **"Complete"** installation
5. **Install MongoDB as a Service**: ✅ Check this
6. **Service Name**: MongoDB
7. **Data Directory**: `C:\Program Files\MongoDB\Server\7.0\data\`
8. **Log Directory**: `C:\Program Files\MongoDB\Server\7.0\log\`
9. Click **"Next"**
10. **Install MongoDB Compass**: ✅ (Optional but recommended - GUI tool)
11. Click **"Install"**
12. Wait for installation to complete
13. Click **"Finish"**

#### Step 3: Verify Installation
```bash
# Open Command Prompt or PowerShell
mongod --version

# Expected output:
# db version v7.0.x
```

#### Step 4: Check MongoDB Service
```bash
# Check if MongoDB service is running
net start | findstr MongoDB

# If not running, start it:
net start MongoDB
```

#### Step 5: Test Connection
```bash
# Connect to MongoDB shell
mongosh

# You should see:
# Current Mongosh Log ID: ...
# Connecting to: mongodb://127.0.0.1:27017
# Using MongoDB: 7.0.x
```

Type `exit` to exit the shell.

#### Step 6: Update .env
```env
MONGODB_URI=mongodb://localhost:27017/dock-d
```

---

## Option 2: MongoDB Atlas (Cloud) Setup

### Step 1: Create Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with email or Google
3. Verify your email

### Step 2: Create Cluster
1. Click **"Build a Database"**
2. Choose **"FREE"** tier (M0)
3. **Provider**: AWS, Google Cloud, or Azure (any is fine)
4. **Region**: Choose closest to you (e.g., `us-east-1`)
5. **Cluster Name**: `Cluster0` (default is fine)
6. Click **"Create"**

**Wait 3-5 minutes for cluster to be created.**

### Step 3: Create Database User
1. In the **"Security Quickstart"** screen:
2. **Authentication Method**: Username and Password
3. **Username**: `dockd-admin` (or your choice)
4. **Password**: Click **"Autogenerate Secure Password"** (save this!)
   - Or create your own (must be strong)
5. Click **"Create User"**

**⚠️ SAVE YOUR PASSWORD!** You'll need it for the connection string.

### Step 4: Configure Network Access
1. In the same screen, under **"Where would you like to connect from?"**
2. Choose **"My Local Environment"**
3. Click **"Add My Current IP Address"**
4. For development, you can also:
   - Click **"Add IP Address"**
   - Enter `0.0.0.0/0` (allows access from anywhere)
   - ⚠️ Only for development! Not secure for production
5. Click **"Finish and Close"**

### Step 5: Get Connection String
1. Click **"Connect"** on your cluster
2. Click **"Connect your application"**
3. **Driver**: Node.js
4. **Version**: 5.5 or later
5. **Copy the connection string**:
   ```
   mongodb+srv://dockd-admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Update Connection String
1. Replace `<password>` with your actual password
2. Add database name `/dock-d` before the `?`
3. Final format:
   ```
   mongodb+srv://dockd-admin:YourPasswordThathasbeenset123@cluster123.xxxxxxxx.mongodb.net/dock1-d1?retryWrites=true&w=majoritymt
   ```

### Step 7: Update .env
```env
MONGODB_URI=mongodb+srv://dockd-admin:YourPasswordThathasbeenset123@cluster123.xxxxxxxx.mongodb.net/dock1-d1?retryWrites=true&w=majoritymt
```

### Step 8: Test Connection
```bash
npm run dev
```

**Expected output:**
```
✅ MongoDB connected successfully
```

---

## MongoDB Compass (GUI Tool)

### What is MongoDB Compass?
- Visual interface for MongoDB
- View collections and documents
- Run queries graphically
- Great for debugging

### Installation
- If not installed during MongoDB installation:
  - Download: https://www.mongodb.com/try/download/compass
  - Install and run

### Connect to Local MongoDB
1. Open MongoDB Compass
2. Connection string: `mongodb://localhost:27017`
3. Click **"Connect"**

### Connect to MongoDB Atlas
1. Open MongoDB Compass
2. In Atlas dashboard, click **"Connect"** → **"Connect using MongoDB Compass"**
3. Copy the connection string
4. Paste in Compass
5. Replace `<password>` with your password
6. Click **"Connect"**

### View Your Data
1. After your server creates data, refresh Compass
2. You'll see database: `dock-d`
3. Collections: `users`, `files`
4. Click to view documents

---

## Verification Checklist

### ✅ Local MongoDB
- [ ] MongoDB service running
- [ ] Can connect with `mongosh`
- [ ] .env has correct local URI
- [ ] Server starts without errors

### ✅ MongoDB Atlas
- [ ] Cluster created
- [ ] Database user created
- [ ] IP address whitelisted
- [ ] Connection string in .env
- [ ] Server connects successfully

---

## 🐛 Troubleshooting

### Error: "MongooseServerSelectionError: connect ECONNREFUSED"

**For Local MongoDB:**
```bash
# Check if MongoDB is running
net start | findstr MongoDB

# If not, start it
net start MongoDB

# If service doesn't exist, reinstall MongoDB
```

**For MongoDB Atlas:**
- Check internet connection
- Verify IP address is whitelisted
- Check username/password are correct
- Ensure connection string is properly formatted

---

### Error: "Authentication failed"

**Solutions:**
- Double-check username and password
- Special characters in password need URL encoding:
  - `@` → `%40`
  - `#` → `%23`
  - `$` → `%24`
  - `/` → `%2F`
- Or regenerate password without special characters

---

### Error: "MongoDB not recognized as a command"

**Solutions:**
```bash
# Add MongoDB to PATH (Windows)
# 1. Open System Properties → Environment Variables
# 2. Under System Variables, find "Path"
# 3. Click "Edit" → "New"
# 4. Add: C:\Program Files\MongoDB\Server\7.0\bin
# 5. Click OK, restart terminal
```

---

### Error: "Network timeout" (Atlas)

**Solutions:**
- Check your IP address is whitelisted
- Try adding `0.0.0.0/0` temporarily for testing
- Check firewall/antivirus isn't blocking connection
- Verify connection string has no extra spaces

---

## 📊 Test Your Database

### Using mongosh (Local)
```bash
mongosh

use dock-d
db.users.find()
db.files.find()
```

### Using MongoDB Compass
1. Connect to your database
2. Navigate to `dock-d` database
3. Click `users` or `files` collection
4. View documents

---

## 🔒 Security Best Practices

### Local MongoDB
1. Enable authentication:
   ```bash
   # Edit mongod.cfg
   # Add:
   security:
     authorization: enabled
   ```
2. Create admin user
3. Restart MongoDB service

### MongoDB Atlas
1. ❌ Remove `0.0.0.0/0` from IP whitelist in production
2. ✅ Add only specific IP addresses
3. ✅ Use strong passwords
4. ✅ Enable 2FA on your MongoDB Atlas account
5. ✅ Rotate passwords regularly

---

## 🎯 Quick Commands

### Local MongoDB Commands
```bash
# Start MongoDB
net start MongoDB

# Stop MongoDB
net stop MongoDB

# Connect to shell
mongosh

# Show databases
show dbs

# Use database
use dock-d

# Show collections
show collections

# Query users
db.users.find().pretty()
```

### Useful Queries
```javascript
// Count documents
db.users.countDocuments()

// Find by email
db.users.findOne({ email: "test@example.com" })

// Find all files for a user
db.files.find({ userId: ObjectId("...") })

// Delete all data (careful!)
db.users.deleteMany({})
db.files.deleteMany({})
```

---

## 📞 Additional Resources

- MongoDB Docs: https://www.mongodb.com/docs/
- MongoDB University: https://university.mongodb.com/ (Free courses)
- Atlas Docs: https://www.mongodb.com/docs/atlas/
- Community Forum: https://www.mongodb.com/community/forums/

---

**Setup Time:**
- Local: ~10 minutes
- Atlas: ~5 minutes

**Difficulty:**
- Local: ⭐⭐⭐☆☆
- Atlas: ⭐⭐☆☆☆
