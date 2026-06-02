// src/routes/gameRoutes.js
// ---------------------------------------------------------------------------
// Game routes for public listing and protected admin operations.
//
// Example:
//   GET /api/v1/games
//   response: list of games
//
//   POST /api/v1/games
//   header: Authorization: Bearer {{token}}
//   response: created game
//
//   PATCH /api/v1/games/:appid
//   header: Authorization: Bearer {{token}}
//   response: updated game
// ---------------------------------------------------------------------------
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
