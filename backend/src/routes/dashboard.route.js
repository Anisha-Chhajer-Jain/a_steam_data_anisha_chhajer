const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const { sendSuccess, sendError } = require('../utils/responseHandler');

// GET /api/v1/dashboard/top-games
// Fetches the top performing games for the dashboard
router.get('/top-games', async (req, res) => {
  try {
    // We'll fetch 4 top games based on rating and map them to the format the dashboard expects
    const games = await Game.find({ isDeleted: false })
      .sort({ rating: -1, recommendations: -1 })
      .limit(4);

    // Map database games to the specific format used by the frontend dashboard component
    const topGamesData = games.map((game, index) => {
      const colors = [
        { bg: '#003344', color: '#00d4ff' },
        { bg: '#2b3245', color: '#7986cb' },
        { bg: '#003344', color: '#00d4ff' },
        { bg: '#1a1f2b', color: '#7986cb' },
      ];
      
      const statuses = ['TRENDING', 'STABLE', 'TRENDING', 'MAINTENANCE'];

      return {
        id: game._id || game.appid,
        appid: game.appid,
        name: game.name,
        genre: game.genres?.[0] || 'Action / RPG',
        status: statuses[index] || 'STABLE',
        bg: colors[index]?.bg || '#2b3245',
        color: colors[index]?.color || '#7986cb',
        initial: game.name ? game.name.charAt(0).toUpperCase() : 'G',
        price: game.price,
        rating: game.rating
      };
    });

    return sendSuccess(res, topGamesData, 200);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
});

module.exports = router;
