const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  appid: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
    index: true,
  },
  release_year: {
    type: Number,
    index: true,
  },
  release_date: {
    type: String,
  },
  genres: {
    type: [String],
    index: true,
  },
  categories: {
    type: [String],
    index: true,
  },
  price: {
    type: Number,
    default: 0,
    index: true,
  },
  recommendations: {
    type: Number,
    default: 0,
  },
  developer: {
    type: String,
    index: true,
  },
  publisher: {
    type: String,
    index: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
    index: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);
