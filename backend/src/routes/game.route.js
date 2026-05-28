// src/routes/game.route.js
// ---------------------------------------------------------------------------
// Core CRUD Routes for Steam Games
// ---------------------------------------------------------------------------
// GET    /api/v1/games              → Fetch all games (pagination + query filters)
// GET    /api/v1/games/exists/:appid → Check if game exists
// GET    /api/v1/games/:appid       → Fetch one game by appid
// POST   /api/v1/games              → Create new game
// PUT    /api/v1/games/:appid       → Replace entire game record
// PATCH  /api/v1/games/:appid       → Partially update game
// DELETE /api/v1/games/:appid       → Permanently delete game
// GET    /api/v1/games/:appid/summary  → Summarized game details
// GET    /api/v1/games/:appid/history  → Update history
// PATCH  /api/v1/games/:appid/archive  → Archive a game
// PATCH  /api/v1/games/:appid/restore  → Restore archived game
// GET    /api/v1/games/:appid/related  → Related game recommendations
// ---------------------------------------------------------------------------

const express = require("express");
const router  = express.Router();

const { games, paginateAndSort } = require("../store/dataStore");
const { protect, authorize }     = require("../middleware/auth");
const { sendSuccess, sendError } = require("../utils/responseHandler");

// ── GET /api/v1/games ─────────────────────────────────────────────────────
// Supports ?genre=  ?developer=  ?publisher=  ?platform=  ?tag=
//           ?minPrice=  ?maxPrice=  ?minRating=  ?maxRating=
//           ?sort=  ?page=  ?limit=
router.get("/", (req, res) => {
  let list = games.filter(g => !g.isDeleted);

  const {
    genre, developer, publisher, platform, tag,
    minPrice, maxPrice, minRating, maxRating
  } = req.query;

  if (genre)      list = list.filter(g => g.genres.some(gen => gen.toLowerCase() === genre.toLowerCase()));
  if (developer)  list = list.filter(g => g.developer.toLowerCase().includes(developer.toLowerCase()));
  if (publisher)  list = list.filter(g => g.publisher.toLowerCase().includes(publisher.toLowerCase()));
  if (platform)   list = list.filter(g => g.platforms.includes(platform.toLowerCase()));
  if (tag)        list = list.filter(g => g.tags.includes(tag.toLowerCase()));
  if (minPrice)   list = list.filter(g => g.price >= parseFloat(minPrice));
  if (maxPrice)   list = list.filter(g => g.price <= parseFloat(maxPrice));
  if (minRating)  list = list.filter(g => g.rating >= parseFloat(minRating));
  if (maxRating)  list = list.filter(g => g.rating <= parseFloat(maxRating));

  const result = paginateAndSort(list, req);
  return sendSuccess(res, result.data, 200, result.pagination);
});

// ── GET /api/v1/games/exists/:appid ───────────────────────────────────────
router.get("/exists/:appid", (req, res) => {
  const exists = games.some(g => g.appid === req.params.appid && !g.isDeleted);
  return sendSuccess(res, { exists }, 200);
});

// ── GET /api/v1/games/:appid ──────────────────────────────────────────────
router.get("/:appid", (req, res) => {
  const game = games.find(g => g.appid === req.params.appid && !g.isDeleted);
  if (!game) return sendError(res, "Game not found", 404);
  return sendSuccess(res, game, 200);
});

// ── POST /api/v1/games ────────────────────────────────────────────────────
router.post("/", protect, authorize("admin"), (req, res) => {
  const { appid, name, price, rating, release_date, genres, tags, platforms } = req.body;

  if (!appid || !name)
    return sendError(res, "appid and name are required fields", 400);
  if (rating !== undefined && (parseFloat(rating) < 1.0 || parseFloat(rating) > 10.0))
    return sendError(res, "rating must be between 1.0 and 10.0", 400);
  if (price !== undefined && parseFloat(price) < 0)
    return sendError(res, "price must be a non-negative number", 400);
  if (release_date && isNaN(Date.parse(release_date)))
    return sendError(res, "release_date must be a valid date format", 400);
  if (genres && !Array.isArray(genres))
    return sendError(res, "genres must be an array", 400);
  if (tags && !Array.isArray(tags))
    return sendError(res, "tags must be an array", 400);
  if (platforms && !Array.isArray(platforms))
    return sendError(res, "platforms must be an array", 400);
  if (games.find(g => g.appid === appid))
    return sendError(res, `Game with appid '${appid}' already exists`, 400);

  const newGame = {
    appid,
    name,
    release_year: release_date ? new Date(release_date).getFullYear() : new Date().getFullYear(),
    release_date: release_date || new Date().toDateString(),
    genres:    genres    || [],
    categories: ["Single-player"],
    platforms: platforms || ["windows"],
    tags:      tags      || [],
    rating:    rating !== undefined ? parseFloat(rating) : 7.0,
    discounted: false,
    price:         price !== undefined ? parseFloat(price) : 0.0,
    originalPrice: price !== undefined ? parseFloat(price) : 0.0,
    recommendations: 0,
    downloads:  0,
    popularity: 50,
    isEarlyAccess: false,
    isVROnly:   false,
    developer:  "Unknown",
    publisher:  "Unknown",
    isDeleted:  false,
    history:    [],
    screenshots:[],
    trailers:   []
  };

  games.push(newGame);
  return sendSuccess(res, newGame, 201);
});

// ── PUT /api/v1/games/:appid ──────────────────────────────────────────────
router.put("/:appid", protect, authorize("admin"), (req, res) => {
  const index = games.findIndex(g => g.appid === req.params.appid);
  if (index === -1) return sendError(res, "Game not found", 404);

  const replaced = {
    appid: req.params.appid,
    isDeleted: false,
    history:   [],
    screenshots:[],
    trailers:  [],
    ...req.body
  };
  games[index] = replaced;
  return sendSuccess(res, replaced, 200);
});

// ── PATCH /api/v1/games/:appid ────────────────────────────────────────────
router.patch("/:appid", protect, authorize("admin"), (req, res) => {
  const game = games.find(g => g.appid === req.params.appid && !g.isDeleted);
  if (!game) return sendError(res, "Game not found", 404);

  const { rating, price } = req.body;
  if (rating !== undefined && (parseFloat(rating) < 1.0 || parseFloat(rating) > 10.0))
    return sendError(res, "rating must be between 1.0 and 10.0", 400);
  if (price !== undefined && parseFloat(price) < 0)
    return sendError(res, "price must be a non-negative number", 400);

  Object.assign(game, req.body);
  return sendSuccess(res, game, 200);
});

// ── DELETE /api/v1/games/:appid ───────────────────────────────────────────
router.delete("/:appid", protect, authorize("admin"), (req, res) => {
  const index = games.findIndex(g => g.appid === req.params.appid);
  if (index === -1) return sendError(res, "Game not found", 404);
  games.splice(index, 1);
  return sendSuccess(res, { message: "Game deleted successfully" }, 200);
});

// ── GET /api/v1/games/:appid/summary ─────────────────────────────────────
router.get("/:appid/summary", (req, res) => {
  const game = games.find(g => g.appid === req.params.appid && !g.isDeleted);
  if (!game) return sendError(res, "Game not found", 404);
  return sendSuccess(res, {
    appid:       game.appid,
    name:        game.name,
    rating:      game.rating,
    price:       game.price,
    genres:      game.genres,
    platforms:   game.platforms,
    release_date:game.release_date
  }, 200);
});

// ── GET /api/v1/games/:appid/history ─────────────────────────────────────
router.get("/:appid/history", (req, res) => {
  const game = games.find(g => g.appid === req.params.appid && !g.isDeleted);
  if (!game) return sendError(res, "Game not found", 404);
  return sendSuccess(res, game.history || [], 200);
});

// ── PATCH /api/v1/games/:appid/archive ───────────────────────────────────
router.patch("/:appid/archive", protect, authorize("admin"), (req, res) => {
  const game = games.find(g => g.appid === req.params.appid);
  if (!game) return sendError(res, "Game not found", 404);
  game.isDeleted = true;
  return sendSuccess(res, { message: "Game archived successfully", appid: game.appid }, 200);
});

// ── PATCH /api/v1/games/:appid/restore ───────────────────────────────────
router.patch("/:appid/restore", protect, authorize("admin"), (req, res) => {
  const game = games.find(g => g.appid === req.params.appid);
  if (!game) return sendError(res, "Game not found", 404);
  game.isDeleted = false;
  return sendSuccess(res, { message: "Game restored successfully", appid: game.appid }, 200);
});

// ── GET /api/v1/games/:appid/related ─────────────────────────────────────
router.get("/:appid/related", (req, res) => {
  const game = games.find(g => g.appid === req.params.appid && !g.isDeleted);
  if (!game) return sendError(res, "Game not found", 404);
  const related = games
    .filter(g => g.appid !== game.appid && !g.isDeleted && g.genres.some(gen => game.genres.includes(gen)))
    .slice(0, 3);
  return sendSuccess(res, related, 200);
});

module.exports = router;
