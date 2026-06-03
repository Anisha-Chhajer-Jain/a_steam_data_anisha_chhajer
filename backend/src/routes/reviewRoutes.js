// src/routes/reviewRoutes.js
// ---------------------------------------------------------------------------
// Review routes mounted under "/api/v1/games/:appid/reviews".
//
// These endpoints allow clients to fetch reviews, submit reviews, and get
// aggregated review statistics for a specific game.
// ---------------------------------------------------------------------------

const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams lets us read :appid from the parent game router

const {
  createReview,
  getReviewsForGame,
  getGameReviewStats
} = require('../controllers/reviewController');

const { protect } = require('../middleware/authMiddleware');

// ==========================================
// 1. POST Routes
// ==========================================

// POST /api/v1/games/:appid/reviews - Submit a review for a game (Authenticated Users)
router.post('/', protect, createReview);

// ==========================================
// 2. GET Routes (Ordered to prevent conflicts)
// ==========================================

// GET /api/v1/games/:appid/reviews/stats - Get aggregated rating & recommendation metrics
router.get('/stats', getGameReviewStats);

// GET /api/v1/games/:appid/reviews - Get reviews list for a specific game
router.get('/', getReviewsForGame);

module.exports = router;
