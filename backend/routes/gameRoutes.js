// routes/gameRoutes.js
// -------------------------------------------------------------
// REST API routes for Game management.
// Supports CRUD operations, filtering, search, and pagination.
// -------------------------------------------------------------

const express = require('express');
const router = express.Router();

const {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
} = require('../controllers/gameController');

const { protect, authorize } = require('../middleware/authMiddleware');

// Public listing & search
router.get('/', getGames);
router.get('/search', getGames);

// Single game detail
router.get('/:appid', getGameById);

// Admin-protected CRUD operations
router.post('/', protect, authorize('admin'), createGame);
router.put('/:appid', protect, authorize('admin'), updateGame);
router.patch('/:appid', protect, authorize('admin'), updateGame);
router.delete('/:appid', protect, authorize('admin'), deleteGame);

module.exports = router;
