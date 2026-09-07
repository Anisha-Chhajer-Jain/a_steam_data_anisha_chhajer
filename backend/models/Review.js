// models/Review.js
// -------------------------------------------------------------
// Mongoose Model for Game Reviews.
// Stores user reviews, star ratings, and comments.
// -------------------------------------------------------------

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      default: 'Operative User',
      trim: true,
    },
    userEmail: {
      type: String,
      trim: true,
    },
    gameAppid: {
      type: String,
      required: [true, 'Game App ID is required'],
      index: true,
    },
    gameName: {
      type: String,
      default: 'Unknown Game',
    },
    rating: {
      type: Number,
      required: [true, 'Rating between 1 and 5 is required'],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
      trim: true,
    },
    recommend: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Review', reviewSchema);
