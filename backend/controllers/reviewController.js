// controllers/reviewController.js
// -------------------------------------------------------------
// Controller for Community Reviews:
// - List reviews (optional filter by gameAppid)
// - Create new review
// - Delete a review
// -------------------------------------------------------------

const Review = require('../models/Review');

// @desc    Get all reviews
// @route   GET /api/v1/reviews
// @access  Public
exports.getReviews = async (req, res) => {
  try {
    const { gameAppid } = req.query;
    const filter = {};
    if (gameAppid) filter.gameAppid = gameAppid;

    const reviews = await Review.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create a new review
// @route   POST /api/v1/reviews
// @access  Public (or Protected)
exports.createReview = async (req, res) => {
  try {
    const { gameAppid, gameName, rating, comment, recommend } = req.body;

    if (!gameAppid || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'gameAppid, rating, and comment are required',
      });
    }

    const review = await Review.create({
      userName: req.user?.name || req.body.userName || 'Operative User',
      userEmail: req.user?.email || req.body.userEmail || 'user@arcadestream.io',
      gameAppid,
      gameName: gameName || 'Steam Game',
      rating: Number(rating),
      comment,
      recommend: recommend !== undefined ? recommend : true,
    });

    return res.status(201).json({
      success: true,
      message: 'Review posted successfully',
      data: review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete a review
// @route   DELETE /api/v1/reviews/:id
// @access  Private (Admin)
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
