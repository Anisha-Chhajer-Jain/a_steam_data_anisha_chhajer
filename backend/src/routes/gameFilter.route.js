// src/routes/gameFilter.route.js
// ---------------------------------------------------------------------------
// Filtering routes for discovering games with specific tags, categories, and prices.
// ---------------------------------------------------------------------------

const express = require("express");
const router  = express.Router();

const Game                       = require("../models/Game");
const { sendSuccess, sendError } = require("../utils/responseHandler");

// Helper: run a MongoDB filter query with pagination
const executeFilteredQuery = async (filter, req, res) => {
  try {
    const page  = parseInt(req.query.page,  10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip  = (page - 1) * limit;

    const query = { isDeleted: false, ...filter };
    const total = await Game.countDocuments(query);
    const data  = await Game.find(query).skip(skip).limit(limit);

    return sendSuccess(res, data, 200, { page, limit, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};

// ==========================================
// 1. GET Routes (Filter Queries)
// ==========================================

// GET /api/v1/games/filter/free-to-play - Get games where price is 0
router.get("/free-to-play", (req, res) => executeFilteredQuery({ price: 0 }, req, res));

// GET /api/v1/games/filter/paid - Get games where price is greater than 0
router.get("/paid", (req, res) => executeFilteredQuery({ price: { $gt: 0 } }, req, res));

// GET /api/v1/games/filter/discounted - Get games currently marked with discounts
router.get("/discounted", (req, res) => executeFilteredQuery({ discounted: true }, req, res));

// GET /api/v1/games/filter/early-access - Get games currently in Early Access phase
router.get("/early-access", (req, res) => executeFilteredQuery({ isEarlyAccess: true }, req, res));

// GET /api/v1/games/filter/vr-only - Get games that are VR Only compatible
router.get("/vr-only", (req, res) => executeFilteredQuery({ isVROnly: true }, req, res));

// GET /api/v1/games/filter/controller-support - Get games featuring controller inputs support
router.get("/controller-support", (req, res) => executeFilteredQuery({ categories: { $regex: /controller/i } }, req, res));

// GET /api/v1/games/filter/multiplayer - Get multiplayer games (from tags or categories)
router.get("/multiplayer", (req, res) => executeFilteredQuery({ $or: [{ tags: "multiplayer" }, { categories: "Multiplayer" }] }, req, res));

// GET /api/v1/games/filter/singleplayer - Get single-player games
router.get("/singleplayer", (req, res) => executeFilteredQuery({ categories: { $regex: /single-player/i } }, req, res));

// GET /api/v1/games/filter/coop - Get co-op tagged games
router.get("/coop", (req, res) => executeFilteredQuery({ tags: "co-op" }, req, res));

// GET /api/v1/games/filter/open-world - Get open-world tagged games
router.get("/open-world", (req, res) => executeFilteredQuery({ tags: "open-world" }, req, res));

// GET /api/v1/games/filter/survival - Get survival tagged games
router.get("/survival", (req, res) => executeFilteredQuery({ tags: "survival" }, req, res));

// GET /api/v1/games/filter/horror - Get horror tagged games
router.get("/horror", (req, res) => executeFilteredQuery({ tags: "horror" }, req, res));

// GET /api/v1/games/filter/anime - Get anime tagged games
router.get("/anime", (req, res) => executeFilteredQuery({ tags: "anime" }, req, res));

// GET /api/v1/games/filter/indie - Get games belonging to the Indie genre
router.get("/indie", (req, res) => executeFilteredQuery({ genres: "Indie" }, req, res));

// GET /api/v1/games/filter/top-rated - Get games with ratings at or above 8.5
router.get("/top-rated", (req, res) => executeFilteredQuery({ rating: { $gte: 8.5 } }, req, res));

module.exports = router;
