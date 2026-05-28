// src/routes/gameSearch.route.js
// ---------------------------------------------------------------------------
// Search Routes — Full-text search across name, genres, tags, categories
// ---------------------------------------------------------------------------
// GET /api/v1/search/games?q=elden
// GET /api/v1/search/games?q=multiplayer
// GET /api/v1/search/games?q=horror   ... etc.
// ---------------------------------------------------------------------------

const express = require("express");
const router  = express.Router();

const { games }                  = require("../store/dataStore");
const { sendSuccess, sendError } = require("../utils/responseHandler");

// GET /api/v1/search/games?q=<term>
router.get("/games", (req, res) => {
  const { q } = req.query;
  if (!q || q.trim() === "")
    return sendError(res, "Search query ?q= is required and cannot be empty", 400);

  const query   = q.toLowerCase().trim();
  const matched = games.filter(
    g =>
      !g.isDeleted &&
      (
        g.name.toLowerCase().includes(query) ||
        g.genres.some(genre => genre.toLowerCase().includes(query)) ||
        g.tags.some(tag   => tag.toLowerCase().includes(query))    ||
        g.categories.some(cat => cat.toLowerCase().includes(query))
      )
  );

  return sendSuccess(res, matched, 200, { total: matched.length });
});

module.exports = router;
