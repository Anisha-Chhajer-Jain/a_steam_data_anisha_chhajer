// src/routes/gameFilter.route.js
// ---------------------------------------------------------------------------
// Filter routes for pre-defined game categories.
//
// These endpoints return paginated game lists filtered by a fixed criteria.
//
// Example:
//   GET /api/v1/games/filter/free-to-play
//   response: free-to-play games, page metadata
// ---------------------------------------------------------------------------
const express = require("express");
const router  = express.Router();

const Game                       = require("../models/Game");
const { sendSuccess, sendError } = require("../utils/responseHandler");

// Helper: run a MongoDB filter query with pagination
const filtered = async (filter, req, res) => {
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

// ── Filter Endpoints ──────────────────────────────────────────────────────

router.get("/free-to-play",       (req, res) => filtered({ price: 0 },                                        req, res));
router.get("/paid",               (req, res) => filtered({ price: { $gt: 0 } },                               req, res));
router.get("/discounted",         (req, res) => filtered({ discounted: true },                                 req, res));
router.get("/early-access",       (req, res) => filtered({ isEarlyAccess: true },                             req, res));
router.get("/vr-only",            (req, res) => filtered({ isVROnly: true },                                  req, res));
router.get("/controller-support", (req, res) => filtered({ categories: { $regex: /controller/i } },           req, res));
router.get("/multiplayer",        (req, res) => filtered({ $or: [{ tags: "multiplayer" }, { categories: "Multiplayer" }] }, req, res));
router.get("/singleplayer",       (req, res) => filtered({ categories: { $regex: /single-player/i } },        req, res));
router.get("/coop",               (req, res) => filtered({ tags: "co-op" },                                   req, res));
router.get("/open-world",         (req, res) => filtered({ tags: "open-world" },                              req, res));
router.get("/survival",           (req, res) => filtered({ tags: "survival" },                                req, res));
router.get("/horror",             (req, res) => filtered({ tags: "horror" },                                  req, res));
router.get("/anime",              (req, res) => filtered({ tags: "anime" },                                   req, res));
router.get("/indie",              (req, res) => filtered({ genres: "Indie" },                                 req, res));
router.get("/top-rated",          (req, res) => filtered({ rating: { $gte: 8.5 } },                          req, res));

module.exports = router;
