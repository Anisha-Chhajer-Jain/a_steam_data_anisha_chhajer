const mongoose = require('mongoose');
const Review = require('../models/Review');
const Game = require('../models/Game');

/**
 * Service to handle Review database operations, business logic, and aggregations
 */
class ReviewService {
  /**
   * Write a new review for a game
   * @param {String} userId - Mongoose ObjectId of the reviewer
   * @param {String} appid - Steam app ID of the game
   * @param {Object} reviewData - Rating, comment, recommend boolean
   */
  async createReview(userId, appid, reviewData) {
    const { rating, comment, recommend } = reviewData;

    // 1. Resolve Steam appid to internal MongoDB Game ObjectId
    const game = await Game.findOne({ appid });
    if (!game) {
      const error = new Error('Game not found');
      error.statusCode = 404;
      throw error;
    }

    // 2. Check if user already reviewed this game (compounded unique index will also enforce this)
    const existingReview = await Review.findOne({ game: game._id, user: userId });
    if (existingReview) {
      const error = new Error('You have already submitted a review for this game');
      error.statusCode = 400;
      throw error;
    }

    // 3. Create review
    const review = await Review.create({
      user: userId,
      game: game._id,
      rating,
      comment,
      recommend: recommend !== undefined ? recommend : true,
    });

    return review;
  }

  /**
   * Fetch all reviews for a specific game
   * @param {String} appid - Steam app ID of the game
   */
  async getReviewsForGame(appid) {
    // Resolve appid to internal ID
    const game = await Game.findOne({ appid });
    if (!game) {
      const error = new Error('Game not found');
      error.statusCode = 404;
      throw error;
    }

    // Fetch reviews and populate reviewer name/email
    const reviews = await Review.find({ game: game._id })
      .populate('user', 'name email')
      .sort('-createdAt');

    return reviews;
  }

  /**
   * Calculate average rating and recommendation metrics using MongoDB Aggregation Pipeline
   * @param {String} appid - Steam app ID of the game
   */
  async getReviewStats(appid) {
    // Resolve appid to internal ID
    const game = await Game.findOne({ appid });
    if (!game) {
      const error = new Error('Game not found');
      error.statusCode = 404;
      throw error;
    }

    // Aggregation Pipeline (Match, Group, Project stages)
    const stats = await Review.aggregate([
      // Stage 1: Match reviews for this specific game
      {
        $match: { game: game._id }
      },
      // Stage 2: Group and calculate averages and totals
      {
        $group: {
          _id: '$game',
          totalReviews: { $sum: 1 },
          avgRating: { $avg: '$rating' },
          totalRecommended: {
            $sum: { $cond: [{ $eq: ['$recommend', true] }, 1, 0] }
          }
        }
      },
      // Stage 3: Project the values into a clean structure
      {
        $project: {
          _id: 0,
          gameId: '$_id',
          totalReviews: 1,
          avgRating: { $round: ['$avgRating', 1] },
          recommendationRate: {
            $round: [
              { $multiply: [{ $divide: ['$totalRecommended', '$totalReviews'] }, 100] },
              0
            ]
          }
        }
      }
    ]);

    // Return empty stats if no reviews exist yet
    if (stats.length === 0) {
      return {
        totalReviews: 0,
        avgRating: 0,
        recommendationRate: 0,
      };
    }

    return stats[0];
  }
}

module.exports = new ReviewService();
