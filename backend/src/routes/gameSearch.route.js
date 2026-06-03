// src/routes/gameSearch.route.js
// ---------------------------------------------------------------------------
// Search routes for finding games using query text.
// ---------------------------------------------------------------------------

const express = require("express");
const router  = express.Router();

const Game                       = require("../models/Game");
const { sendSuccess, sendError } = require("../utils/responseHandler");

// ==========================================
// 1. GET Routes
// ==========================================

// GET /api/v1/search/games - Search active games by query term (?q=keyword)
router.get("/games", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === "")
      return sendError(res, "Search query ?q= is required and cannot be empty", 400);

    const regex = new RegExp(q.trim(), "i");

    const games = await Game.find({
      isDeleted: false,
      $or: [
        { name:       regex },
        { genres:     regex },
        { tags:       regex },
        { categories: regex },
        { developer:  regex },
        { publisher:  regex },
      ]
    });

    return sendSuccess(res, games, 200, { total: games.length });
  } catch (err) {
    return sendError(res, err.message, 500);
  }
});

module.exports = router;
