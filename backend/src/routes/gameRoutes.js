// src/routes/gameRoutes.js
// ---------------------------------------------------------------------------
// Game routes for public listing and protected admin CRUD operations.
//
// These connect directly to the database-backed gameController.
// ---------------------------------------------------------------------------

const express = require('express');
const router = express.Router();

const {
  getGames,
  getGame,
  createGame,
  updateGame,
  deleteGame
} = require('../controllers/gameController');

const { protect, authorize } = require('../middleware/authMiddleware');

// ==========================================
// 1. POST Routes
// ==========================================

// POST /api/v1/games - Create a new game entry (Admin only)
router.post('/', protect, authorize('admin'), createGame);

// ==========================================
// 2. GET Routes
// ==========================================

// GET /api/v1/games/:appid - Get a single game detail by App ID
router.get('/:appid', getGame);

// GET /api/v1/games - Get a list of all games
router.get('/', getGames);

// ==========================================
// 3. PATCH Routes
// ==========================================

// PATCH /api/v1/games/:appid - Update details of an existing game (Admin only)
router.patch('/:appid', protect, authorize('admin'), updateGame);

// ==========================================
// 4. DELETE Routes
// ==========================================

// DELETE /api/v1/games/:appid - Permanently delete a game (Admin only)
router.delete('/:appid', protect, authorize('admin'), deleteGame);

module.exports = router;
