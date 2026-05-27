We’ll build a real‑world admin authentication system using JWT, bcrypt, and role‑based access control.
Only a superadmin can create new admin accounts – normal users cannot sign up as admin.
All book write operations (create, update, delete) require an admin (or superadmin) token.

---

1. Packages to Install

```bash
npm install bcrypt jsonwebtoken
```

---

2. User Model (models/User.js)

This model will hold admin credentials. It hashes the password automatically before saving.

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false,   // never return password by default
    },
    role: {
      type: String,
      enum: ['admin', 'superadmin'],
      default: 'admin',
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare entered password with hashed one
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

Why this is “real”

· Passwords are never stored in plain text.
· The role field restricts who can do what.
· select: false makes sure the password is not accidentally leaked.

---

3. Auth Controller (controllers/authController.js)

Handles login and register (admin creation).

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT
const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  });
};

// POST /admin/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // 2. Find user by email (explicitly select password because of select:false)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 3. Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credent..ials' });
    }

    // 4. Send token + user data (without password)
    user.password = undefined;
    res.status(200).json({
      token: signToken(user._id),
      user,
    });
  } catch (error) {
    next(error);
  }
};

// POST /admin/register   (superadmin only)
const register = async (req, res, next) => {
  try {
    // Only superadmin can create new admins
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Only superadmin can create admins' });
    }

    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password, role: 'admin' });

    // Return token (optional – we are just creating the account)
    res.status(201).json({ message: 'Admin created', user });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    next(error);
  }
};

module.exports = { login, register };
```

Key points

· register checks req.user.role – this comes from the authentication middleware.
· login looks up the user with +password, compares hashed password, and returns a JWT.

---

4. Auth Middleware (middlewares/authMiddleware.js)

We need two middlewares:

· protect – verifies the JWT and attaches the user to the request.
· authorize(...roles) – restricts access to specific roles.

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes – must be logged in
const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'You are not logged in' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({ message: 'User no longer exists' });
    }

    // Attach user to request
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Authorize by role
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'You do not have permission to perform this action',
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
```

How they’re used

· protect ensures the user is authenticated.
· authorize('admin', 'superadmin') ensures the user has one of the allowed roles.

---

5. Admin Routes (routes/adminRoutes.js)

```javascript
const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Public – login
router.post('/login', login);

// Only superadmin can create new admins
router.post('/register', protect, authorize('superadmin'), register);

module.exports = router;
```

---

6. Book Routes – Now Protected by Admin Role

Update your existing routes/bookRoutes.js to use the new middleware.

```javascript
const express = require('express');
const router = express.Router();
const {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Public – anyone can list/search books
router.get('/', getBooks);

// Admin / superadmin only
router.post('/', protect, authorize('admin', 'superadmin'), createBook);
router.put('/:id', protect, authorize('admin', 'superadmin'), updateBook);
router.delete('/:id', protect, authorize('admin', 'superadmin'), deleteBook);

module.exports = router;
```

---

7. Environment Variables (.env)

Add a JWT secret:

```
ADMIN_PASSWORD=MySecret123   (not used anymore)
JWT_SECRET=your_very_long_random_string_here
JWT_EXPIRES_IN=30d
MONGO_URI=...
```

---

8. Seeding the First Superadmin

You need at least one superadmin to create other admins. Create a small seed script seed.js that you can run once.

```javascript
// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const existing = await User.findOne({ role: 'superadmin' });
    if (existing) {
      console.log('Superadmin already exists');
      return process.exit();
    }

    await User.create({
      username: 'superadmin',
      email: 'super@admin.com',
      password: 'SuperSecret123',   // change in production
      role: 'superadmin',
    });
    console.log('Superadmin created');
    process.exit();
  })
  .catch(err => console.error(err));
```

Run it once: node seed.js

---

9. How It Works – The Admin Role Flow

Step Action Who can do it?
1 Login POST /admin/login Anyone who knows the email/password of an admin or superadmin
2 Get token Received after successful login
3 Create admin POST /admin/register Only a superadmin (must include superadmin’s token)
4 Write operations POST/PUT/DELETE /api/books Only authenticated admin/superadmin with valid token

---

10. Testing on Linux / macOS / Windows

Login as superadmin (get token)

Linux/macOS:

```bash
curl -X POST http://localhost:5000/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"super@admin.com","password":"SuperSecret123"}'
```

Windows PowerShell:

```powershell
Invoke-RestMethod -Uri http://localhost:5000/admin/login `
  -Method Post `
  -Body '{"email":"super@admin.com","password":"SuperSecret123"}' `
  -ContentType "application/json"
```

Response contains the JWT token (long string). Copy it.

Create a new admin (using superadmin token)

Linux/macOS:

```bash
curl -X POST http://localhost:5000/admin/register \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <superadmin_token>" \
  -d '{"username":"admin1","email":"admin1@example.com","password":"AdminPass123"}'
```

Windows PowerShell:

```powershell
$token = "<paste_superadmin_token_here>"
Invoke-RestMethod -Uri http://localhost:5000/admin/register `
  -Method Post `
  -Body '{"username":"admin1","email":"admin1@example.com","password":"AdminPass123"}' `
  -ContentType "application/json" `
  -Headers @{ Authorization = "Bearer $token" }
```

If you try to register without a valid superadmin token, you get 403 Forbidden.

Use admin token to create a book

```bash
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin_token>" \
  -d '{"title":"Test","author":"Me"}'
```

Without a token (or with a normal user token – if you had one), the request would be rejected.

---

11. Why This Is a Real‑World Backend

· Password hashing with bcrypt (industry standard).
· JWT tokens with expiration.
· Role‑based access control (superadmin vs admin).
· Protection of sensitive endpoints through composable middleware.
· Seeding initial superuser – common practice.
· No one can accidentally promote themselves – only a superadmin can create admin accounts.
· The public API (GET /api/books) remains open, as it should.

You now have a production‑style admin authentication system that can be easily extended with more roles or permissions.