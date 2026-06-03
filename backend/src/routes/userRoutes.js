// src/routes/userRoutes.js
// ---------------------------------------------------------------------------
// User routes for account registration, login, and profile retrieval.
// ---------------------------------------------------------------------------

const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

// ==========================================
// 1. POST Routes (Auth & Registration)
// ==========================================

// POST /api/v1/users/register - Register a new user account
router.post('/register', registerUser);

// POST /api/v1/users/login - Authenticate credentials and get a session token
router.post('/login', loginUser);

// ==========================================
// 2. GET Routes (User Details)
// ==========================================

// GET /api/v1/users/me - Get the currently authenticated user profile
router.get('/me', protect, getUserProfile);

module.exports = router;
