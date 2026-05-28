const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user'],
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: [true, 'Review must belong to a game'],
  },
  rating: {
    type: Number,
    required: [true, 'Please add a rating between 1 and 5'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5'],
  },
  comment: {
    type: String,
    required: [true, 'Please add a comment'],
    trim: true,
  },
  recommend: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true
});

// Prevent user from submitting more than one review per game
reviewSchema.index({ game: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
