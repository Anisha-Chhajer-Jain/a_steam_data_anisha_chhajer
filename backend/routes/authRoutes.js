// routes/authRoutes.js
// -------------------------------------------------------------
// Authentication routes for registration, login, and profile.
// -------------------------------------------------------------

const express = require('express');
const router = express.Router();

const {
  register,
  login,
  getProfile,
  generateTokenEndpoint,
  verifyToken,
} = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');

// Public auth routes
router.post('/register', register);
router.post('/login', login);

// Token endpoints (supports both /auth/... and /jwt/...)
router.post('/generate-token', generateTokenEndpoint);
router.post('/verify-token', verifyToken);

// Protected profile route
router.get('/profile', protect, getProfile);
router.get('/me', protect, getProfile);

module.exports = router;
