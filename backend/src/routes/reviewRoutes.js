// src/routes/reviewRoutes.js
// ---------------------------------------------------------------------------
// Review routes mounted under /api/v1/games/:appid/reviews
//
// These endpoints allow clients to fetch reviews, create reviews, and get
// aggregated review statistics for a specific game.
//
// Example:
//   GET /api/v1/games/570/reviews
//   response: [ review objects ]
//
//   POST /api/v1/games/570/reviews
//   header: Authorization: Bearer {{token}}
//   body: { rating, comment, recommend }
//   response: created review object
//
//   GET /api/v1/games/570/reviews/stats
//   response: review aggregation metrics
// ---------------------------------------------------------------------------
const express = require('express');
const {
  createReview,
  getReviewsForGame,
  getGameReviewStats
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

// Use mergeParams so we can access appid parameter from the game router mount path
const router = express.Router({ mergeParams: true });

// Routes:
// GET /api/v1/games/:appid/reviews - Get reviews
// POST /api/v1/games/:appid/reviews - Submit review (Authenticated Users)
router
  .route('/')
  .get(getReviewsForGame)
  .post(protect, createReview);

// GET /api/v1/games/:appid/reviews/stats - Get average ratings & recommendation metrics (Aggregation Pipeline)
router.get('/stats', getGameReviewStats);

module.exports = router;
