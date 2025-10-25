# API Testing Collection

## Base URL
```
http://localhost:5000
```

---

## 1. Authentication

### 1.1 Signup
```http
POST {{baseUrl}}/api/auth/signup
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "securepass123",
  "name": "John Doe"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "64abc...",
      "email": "john.doe@example.com",
      "name": "John Doe",
      "createdAt": "2025-10-20T10:30:00.000Z"
    }
  }
}
```

---

### 1.2 Login
```http
POST {{baseUrl}}/api/auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "securepass123"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "64abc...",
      "email": "john.doe@example.com",
      "name": "John Doe"
    }
  }
}
```

---

### 1.3 Get Current User
```http
GET {{baseUrl}}/api/auth/me
Authorization: Bearer {{token}}
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "64abc...",
      "email": "john.doe@example.com",
      "name": "John Doe",
      "createdAt": "2025-10-20T10:30:00.000Z"
    }
  }
}
```

---

## 2. File Upload

### 2.1 Upload File
```http
POST {{baseUrl}}/api/upload
Authorization: Bearer {{token}}
Content-Type: multipart/form-data

file: [Select your file]
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "file": {
      "id": "64xyz...",
      "fileName": "1729422600000-document.pdf",
      "originalName": "document.pdf",
      "mimeType": "application/pdf",
      "size": 524288,
      "url": "https://storage.googleapis.com/your-bucket/uploads/...",
      "uploadedAt": "2025-10-20T11:00:00.000Z"
    }
  }
}
```

---

### 2.2 Get All Files
```http
GET {{baseUrl}}/api/upload/files
Authorization: Bearer {{token}}
```

**Expected Response (200):**
```json
{
  "success": true,
  "count": 3,
  "data": {
    "files": [
      {
        "id": "64xyz...",
        "fileName": "1729422600000-document.pdf",
        "originalName": "document.pdf",
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

### 2.3 Delete File
```http
DELETE {{baseUrl}}/api/upload/64xyz...
Authorization: Bearer {{token}}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "File deleted successfully"
}
```

---

## 3. Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "msg": "Please enter a valid email",
      "param": "email"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "No token provided. Authorization denied."
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "File not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal Server Error",
  "error": "..."
}
```

---

## Testing Flow

1. **Signup** → Get token
2. **Login** (optional) → Verify token works
3. **Get Current User** → Test authentication
4. **Upload File** → Get file URL
5. **Get All Files** → Verify file is listed
6. **Delete File** → Cleanup

---

## cURL Examples

### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"test123\",\"name\":\"Test User\"}"
```

### Upload File
```bash
curl -X POST http://localhost:5000/api/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/your/file.pdf"
```

---

## PowerShell Examples

### Signup
```powershell
$body = @{
    email = "test@example.com"
    password = "test123"
    name = "Test User"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/signup" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

### Upload File
```powershell
$token = "YOUR_TOKEN"
$filePath = "C:\path\to\file.pdf"

$headers = @{
    Authorization = "Bearer $token"
}

$form = @{
    file = Get-Item -Path $filePath
}

Invoke-RestMethod -Uri "http://localhost:5000/api/upload" `
  -Method Post `
  -Headers $headers `
  -Form $form
```
