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
