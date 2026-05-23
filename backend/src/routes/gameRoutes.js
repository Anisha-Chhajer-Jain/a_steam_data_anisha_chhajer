const express = require('express');
const {
  getGames,
  getGame,
  createGame,
  updateGame,
  deleteGame
} = require('../controllers/gameController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router
  .route('/')
  .get(getGames)
  // Only admins can create games
  .post(protect, authorize('admin'), createGame);

router
  .route('/:appid')
  .get(getGame)
  // Only admins can update or delete games
  .patch(protect, authorize('admin'), updateGame)
  .delete(protect, authorize('admin'), deleteGame);

module.exports = router;
