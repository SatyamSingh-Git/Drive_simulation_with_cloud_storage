# 📊 System Architecture & Workflow

## System Overview

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│             │         │              │         │             │
│   Client    │◄───────►│   Backend    │◄───────►│   MongoDB   │
│  (Browser/  │  HTTP   │   (Node.js   │  Store  │   (User &   │
│   Mobile)   │ Request │   Express)   │  Data   │  File Meta) │
│             │         │              │         │             │
└─────────────┘         └──────┬───────┘         └─────────────┘
                               │
                               │ Upload/
                               │ Retrieve
                               │ Files
                               ▼
                        ┌──────────────┐
                        │              │
                        │   Firebase   │
                        │   Storage    │
                        │  (Cloud CDN) │
                        │              │
                        └──────────────┘
```

---

## Authentication Flow

```
User Signup/Login Flow:
─────────────────────────

1. User submits credentials
   │
   ▼
2. Backend validates input
   │
   ▼
3. Password hashed (bcrypt)
   │
   ▼
4. User saved to MongoDB
   │
   ▼
5. JWT token generated
   │
   ▼
6. Token sent to client
   │
   ▼
7. Client stores token
   │
   ▼
8. Token sent in subsequent requests
   │
   ▼
9. Middleware verifies token
   │
   ▼
10. Access granted/denied
```

---

## File Upload Flow

```
File Upload Process:
────────────────────

Client                Backend              Firebase           MongoDB
  │                     │                     │                 │
  │──(1) Select File───►│                     │                 │
  │                     │                     │                 │
  │──(2) Send + Token──►│                     │                 │
  │                     │                     │                 │
  │                     │──(3) Verify Token──►│                 │
  │                     │                     │                 │
  │                     │◄────(4) Valid───────│                 │
  │                     │                     │                 │
  │                     │──(5) Upload File───►│                 │
  │                     │                     │                 │
  │                     │◄────(6) URL─────────│                 │
  │                     │                     │                 │
  │                     │──(7) Save Metadata─────────────────►  │
  │                     │                     │                 │
  │                     │◄────(8) Success────────────────────── │
  │                     │                     │                 │
  │◄────(9) Response────│                     │                 │
  │     (File URL)      │                     │                 │
```

---

## API Request/Response Flow

```
┌───────────────────────────────────────────────────────────┐
│                     API Request Flow                       │
└───────────────────────────────────────────────────────────┘

Request:
────────
1. Client sends HTTP request
   ├── Method: POST/GET/DELETE
   ├── Headers: Authorization, Content-Type
   ├── Body: JSON data or FormData
   └── URL: /api/auth/* or /api/upload/*

2. Express receives request
   ├── CORS middleware checks origin
   ├── Body parser parses data
   └── Routes to appropriate handler

3. Route handler processes
   ├── Auth middleware (if protected)
   ├── Input validation
   ├── Business logic
   ├── Database operations
   └── File operations (if upload)

Response:
─────────
4. Handler sends response
   ├── Status code (200, 201, 400, 401, 500)
   ├── Success flag
   ├── Message
   └── Data payload

5. Client receives response
   ├── Parse JSON
   ├── Update UI
   └── Store token (if auth)
```

---

## Data Models

```
┌─────────────────────────────────────────────┐
│              User Model                     │
├─────────────────────────────────────────────┤
│ _id          : ObjectId (auto)              │
│ email        : String (unique, required)    │
│ password     : String (hashed, required)    │
│ name         : String (required)            │
│ firebaseUid  : String (optional)            │
│ createdAt    : Date (auto)                  │
│ updatedAt    : Date (auto)                  │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│              File Model                     │
├─────────────────────────────────────────────┤
│ _id          : ObjectId (auto)              │
│ userId       : ObjectId (ref: User)         │
│ fileName     : String (unique timestamp)    │
│ originalName : String                       │
│ mimeType     : String                       │
│ size         : Number (bytes)               │
│ firebaseUrl  : String (public URL)          │
│ firebasePath : String (storage path)        │
│ uploadedAt   : Date (auto)                  │
└─────────────────────────────────────────────┘
```

---

## Folder Structure Explained

```
Dock-D/
│
├── config/                    # Configuration files
│   ├── firebase.js           # Firebase Admin SDK initialization
│   └── firebase-service-      # Credentials (gitignored)
│       account.json
│
├── middleware/               # Express middleware
│   └── auth.js              # JWT token verification
│
├── models/                  # MongoDB schemas (Mongoose)
│   ├── User.js             # User data model
│   └── File.js             # File metadata model
│
├── routes/                 # API route handlers
│   ├── auth.js            # Authentication endpoints
│   └── upload.js          # File upload endpoints
│
├── node_modules/          # Dependencies (gitignored)
│
├── .env                   # Environment variables (gitignored)
├── .env.example          # Environment template
├── .gitignore           # Git ignore rules
├── package.json         # Project metadata & dependencies
├── package-lock.json    # Locked dependency versions
├── server.js           # Main application entry point
│
└── Documentation/
    ├── README.md              # Main documentation
    ├── SETUP_GUIDE.md        # Quick setup
    ├── FIREBASE_SETUP.md     # Firebase config
    ├── MONGODB_SETUP.md      # MongoDB config
    ├── API_TESTING.md        # Testing guide
    ├── DEPLOYMENT.md         # Deploy guide
    ├── PROJECT_SUMMARY.md    # Project overview
    └── QUICK_REFERENCE.md    # Cheat sheet
```

---

## Security Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Security Layers                        │
└─────────────────────────────────────────────────────────┘

Layer 1: Network Security
├── CORS: Restrict origins
├── HTTPS: Encrypted transport (production)
└── Rate Limiting: Prevent abuse (optional)

Layer 2: Authentication
├── JWT: Stateless token authentication
├── bcrypt: Password hashing (10 rounds)
├── Token expiry: 7 days
└── Middleware: Verify token on protected routes

Layer 3: Input Validation
├── express-validator: Sanitize inputs
├── Schema validation: Mongoose models
└── File type checking: Multer filters

Layer 4: Authorization
├── User-specific data: Query by userId
├── File ownership: Check userId before delete
└── Private files: Storage rules (optional)

Layer 5: Data Protection
├── Environment variables: Sensitive config
├── .gitignore: Prevent secret commits
└── Firebase rules: Storage access control
```

---

## Technology Stack Details

```
┌─────────────────────────────────────────────────────────┐
│                  Tech Stack Breakdown                    │
└─────────────────────────────────────────────────────────┘

Backend Framework:
├── Node.js v18+          # JavaScript runtime
├── Express.js v4.18+     # Web framework
└── ES6+ syntax           # Modern JavaScript

Database:
├── MongoDB v6+           # NoSQL database
├── Mongoose v8+          # ODM (Object Data Modeling)
└── MongoDB Atlas         # Cloud option

Cloud Storage:
├── Firebase Storage      # Google Cloud Storage
├── Firebase Admin SDK    # Server-side SDK
└── Storage Rules         # Access control

Authentication:
├── JWT (jsonwebtoken)    # Token generation/verification
├── bcryptjs              # Password hashing
└── express-validator     # Input validation

File Upload:
├── Multer                # Multipart form handling
├── Memory Storage        # Temporary storage
└── Stream Upload         # Efficient large files

Development Tools:
├── nodemon               # Auto-restart on changes
├── dotenv                # Environment variables
└── CORS                  # Cross-origin requests
```

---

## Request Lifecycle

```
┌─────────────────────────────────────────────────────────┐
│            Complete Request Lifecycle                    │
└─────────────────────────────────────────────────────────┘

1. Client Initiates Request
   └─► HTTP Request (POST /api/upload)

2. Request Reaches Server
   └─► Express receives on port 5000

3. CORS Middleware
   └─► Checks if origin is allowed

4. Body Parser Middleware
   └─► Parses JSON or FormData

5. Route Matching
   └─► Express router finds handler

6. Auth Middleware (if protected)
   └─► Verifies JWT token
   └─► Attaches user to req.user

7. Route Handler
   └─► Input validation
   └─► Business logic
   └─► Database queries
   └─► File operations

8. Response Generation
   └─► Format JSON response
   └─► Set status code
   └─► Add headers

9. Send Response
   └─► Client receives data

10. Error Handling (if error)
    └─► Error middleware catches
    └─► Formats error response
    └─► Logs error
    └─► Sends error response
```

---

## Scalability Considerations

```
Current Setup (Single Server):
├── Node.js single instance
├── Direct MongoDB connection
└── Direct Firebase Storage

Scaling Path:
├── Horizontal Scaling
│   ├── Load balancer (Nginx/HAProxy)
│   ├── Multiple Node.js instances
│   └── PM2 cluster mode
│
├── Database Scaling
│   ├── MongoDB replica sets
│   ├── Read replicas
│   └── Sharding (if needed)
│
├── Caching Layer
│   ├── Redis for sessions
│   ├── Cache frequent queries
│   └── CDN for static files
│
└── Microservices (Future)
    ├── Auth service
    ├── Upload service
    └── API gateway
```

---

## Monitoring & Logging

```
Logging Points:
├── Server startup
├── Database connections
├── API requests (access logs)
├── Authentication attempts
├── File uploads
├── Errors and exceptions
└── Performance metrics

Tools to Integrate:
├── Winston/Morgan: Application logging
├── PM2: Process monitoring
├── New Relic/Datadog: APM
├── Sentry: Error tracking
└── ELK Stack: Log aggregation
```

---

## Performance Optimization

```
Current Optimizations:
├── Multer memory storage (fast)
├── Mongoose lean queries (when needed)
├── Indexed MongoDB fields
└── Streamed file uploads

Future Improvements:
├── Response compression (gzip)
├── Database query optimization
├── Connection pooling
├── CDN integration
├── Image optimization
├── Lazy loading
└── API rate limiting
```

---

**This architecture supports:**
- ✅ Concurrent users
- ✅ Large file uploads (up to 10MB)
- ✅ Secure authentication
- ✅ Cloud-native deployment
- ✅ Easy scaling
- ✅ Production-ready
