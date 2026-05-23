const reviewService = require('../services/reviewService');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/responseHandler');

/**
 * @desc    Submit a new review for a game
 * @route   POST /api/v1/games/:appid/reviews
 * @access  Private (Authenticated Users)
 */
exports.createReview = asyncHandler(async (req, res, next) => {
  const review = await reviewService.createReview(req.user._id, req.params.appid, req.body);
  return sendSuccess(res, review, 201);
});

/**
 * @desc    Fetch all reviews for a specific game
 * @route   GET /api/v1/games/:appid/reviews
 * @access  Public
 */
exports.getReviewsForGame = asyncHandler(async (req, res, next) => {
  const reviews = await reviewService.getReviewsForGame(req.params.appid);
  return sendSuccess(res, reviews, 200);
});

/**
 * @desc    Get aggregate review statistics (average rating, recommendation rate) for a game
 * @route   GET /api/v1/games/:appid/reviews/stats
 * @access  Public
 */
exports.getGameReviewStats = asyncHandler(async (req, res, next) => {
  const stats = await reviewService.getReviewStats(req.params.appid);
  return sendSuccess(res, stats, 200);
});
