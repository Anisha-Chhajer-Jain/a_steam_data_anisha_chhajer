// models/Game.js
// -------------------------------------------------------------
// Mongoose Model for Games.
// Matches the fields needed by the React frontend UI.
// -------------------------------------------------------------

const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    appid: {
      type: String,
      required: [true, 'App ID is required'],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Game name is required'],
      trim: true,
    },
    release_year: {
      type: Number,
      default: () => new Date().getFullYear(),
    },
    release_date: {
      type: String,
      default: () => new Date().toDateString(),
    },
    genres: {
      type: [String],
      default: ['Action'],
    },
    categories: {
      type: [String],
      default: ['Single-player'],
    },
    platforms: {
      type: [String],
      default: ['windows'],
    },
    price: {
      type: Number,
      default: 0.0,
    },
    rating: {
      type: Number,
      default: 7.5,
      min: 0,
      max: 10,
    },
    recommendations: {
      type: Number,
      default: 0,
    },
    developer: {
      type: String,
      default: 'Indie Studio',
    },
    publisher: {
      type: String,
      default: 'Arcade Stream Publishing',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

module.exports = mongoose.model('Game', gameSchema);
