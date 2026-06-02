// src/routes/userRoutes.js
// ---------------------------------------------------------------------------
// User routes for account registration, login, and profile retrieval.
//
// Example:
//   POST /api/v1/users/register
//   body: { email, password, name }
//   response: created user info
//
//   GET /api/v1/users/me
//   header: Authorization: Bearer {{token}}
//   response: current user profile
// ---------------------------------------------------------------------------
const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected user profile route
router.get('/me', protect, getUserProfile);

module.exports = router;
