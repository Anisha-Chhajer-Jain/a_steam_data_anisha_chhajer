// src/routes/game.route.js
// ---------------------------------------------------------------------------
// Core Game CRUD routes implemented with Mongoose.
//
// Routes respond with JSON format:
//   { success: boolean, data: <result>, message?: string }
// ---------------------------------------------------------------------------

const express = require("express");
const router  = express.Router();

const Game                       = require("../models/Game");
const { protect, authorize }     = require("../middleware/auth");
const { sendSuccess, sendError } = require("../utils/responseHandler");


// POST /api/v1/games - Create a new game (Admin only)
router.post("/", protect, authorize("admin"), async (req, res) => {
  try {
    const { appid, name, price, rating, release_date, genres, tags, platforms } = req.body;

    if (!appid || !name)
      return sendError(res, "appid and name are required fields", 400);
    if (rating !== undefined && (parseFloat(rating) < 1.0 || parseFloat(rating) > 10.0))
      return sendError(res, "rating must be between 1.0 and 10.0", 400);
    if (price !== undefined && parseFloat(price) < 0)
      return sendError(res, "price must be a non-negative number", 400);
    if (genres && !Array.isArray(genres))
      return sendError(res, "genres must be an array", 400);
    if (tags && !Array.isArray(tags))
      return sendError(res, "tags must be an array", 400);
    if (platforms && !Array.isArray(platforms))
      return sendError(res, "platforms must be an array", 400);

    const existing = await Game.findOne({ appid });
    if (existing) return sendError(res, `Game with appid '${appid}' already exists`, 400);

    const newGame = await Game.create({
      appid,
      name,
      release_year: release_date ? new Date(release_date).getFullYear() : new Date().getFullYear(),
      release_date: release_date || new Date().toDateString(),
      genres:    genres    || [],
      platforms: platforms || ["windows"],
      tags:      tags      || [],
      rating:    rating !== undefined ? parseFloat(rating) : 7.0,
      price:     price   !== undefined ? parseFloat(price)  : 0.0,
    });

    return sendSuccess(res, newGame, 201);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
});


// GET /api/v1/games/exists/:appid - Check if a game exists (isDeleted is false)
router.get("/exists/:appid", async (req, res) => {
  try {
    const exists = await Game.exists({ appid: req.params.appid, isDeleted: false });
    return sendSuccess(res, { exists: !!exists }, 200);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
});

// GET /api/v1/games/:appid/summary - Retrieve essential game metadata fields
router.get("/:appid/summary", async (req, res) => {
  try {
    const game = await Game.findOne(
      { appid: req.params.appid, isDeleted: false },
      "appid name rating price genres platforms release_date"
    );
    if (!game) return sendError(res, "Game not found", 404);
    return sendSuccess(res, game, 200);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
});

// GET /api/v1/games/:appid/history - Get update and action history of a game
router.get("/:appid/history", async (req, res) => {
  try {
    const game = await Game.findOne({ appid: req.params.appid, isDeleted: false }, "history");
    if (!game) return sendError(res, "Game not found", 404);
    return sendSuccess(res, game.history || [], 200);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
});

// GET /api/v1/games/:appid/related - Get 3 games sharing the same genres
router.get("/:appid/related", async (req, res) => {
  try {
    const game = await Game.findOne({ appid: req.params.appid, isDeleted: false });
    if (!game) return sendError(res, "Game not found", 404);
    const related = await Game.find({
      appid:     { $ne: game.appid },
      isDeleted: false,
      genres:    { $in: game.genres }
    }).limit(3);
    return sendSuccess(res, related, 200);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
});

// GET /api/v1/games/:appid - Get full details of a single game
router.get("/:appid", async (req, res) => {
  try {
    const game = await Game.findOne({ appid: req.params.appid, isDeleted: false });
    if (!game) return sendError(res, "Game not found", 404);
    return sendSuccess(res, game, 200);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
});

// GET /api/v1/games - List games with filtering, sorting, and pagination
router.get("/", async (req, res) => {
  try {
    const {
      genre, developer, publisher, platform, tag,
      minPrice, maxPrice, minRating, maxRating,
      sort, page = 1, limit = 10
    } = req.query;

    const filter = { isDeleted: false };

    if (genre)     filter.genres     = { $regex: new RegExp(`^${genre}$`, "i") };
    if (developer) filter.developer  = { $regex: developer, $options: "i" };
    if (publisher) filter.publisher  = { $regex: publisher, $options: "i" };
    if (platform)  filter.platforms  = platform.toLowerCase();
    if (tag)       filter.tags       = tag.toLowerCase();
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    if (minRating || maxRating) {
      filter.rating = {};
      if (minRating) filter.rating.$gte = parseFloat(minRating);
      if (maxRating) filter.rating.$lte = parseFloat(maxRating);
    }

    const sortMap = {
      price:       { price: 1 },
      "price-desc":{ price: -1 },
      rating:      { rating: -1 },
      "rating-asc":{ rating: 1 },
      downloads:   { downloads: -1 },
      releaseDate: { release_year: -1 },
      popularity:  { popularity: -1 },
      title:       { name: 1 },
    };
    const sortBy = sortMap[sort] || { createdAt: -1 };

    const skip  = (parseInt(page) - 1) * parseInt(limit);
    const total = await Game.countDocuments(filter);
    const games = await Game.find(filter).sort(sortBy).skip(skip).limit(parseInt(limit));

    return sendSuccess(res, games, 200, {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / parseInt(limit))
    });
  } catch (err) {
    return sendError(res, err.message, 500);
  }
});

// ==========================================
// 3. PUT & PATCH Routes
// ==========================================

// PUT /api/v1/games/:appid - Fully replace a game details (Admin only)
router.put("/:appid", protect, authorize("admin"), async (req, res) => {
  try {
    const game = await Game.findOneAndReplace(
      { appid: req.params.appid },
      { appid: req.params.appid, isDeleted: false, ...req.body },
      { new: true, runValidators: true }
    );
    if (!game) return sendError(res, "Game not found", 404);
    return sendSuccess(res, game, 200);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
});

// PATCH /api/v1/games/:appid/archive - Soft delete / archive a game (Admin only)
router.patch("/:appid/archive", protect, authorize("admin"), async (req, res) => {
  try {
    const game = await Game.findOneAndUpdate(
      { appid: req.params.appid },
      { $set: { isDeleted: true } },
      { new: true }
    );
    if (!game) return sendError(res, "Game not found", 404);
    return sendSuccess(res, { message: "Game archived successfully", appid: game.appid }, 200);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
});

// PATCH /api/v1/games/:appid/restore - Restore a soft-deleted / archived game (Admin only)
router.patch("/:appid/restore", protect, authorize("admin"), async (req, res) => {
  try {
    const game = await Game.findOneAndUpdate(
      { appid: req.params.appid },
      { $set: { isDeleted: false } },
      { new: true }
    );
    if (!game) return sendError(res, "Game not found", 404);
    return sendSuccess(res, { message: "Game restored successfully", appid: game.appid }, 200);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
});

// PATCH /api/v1/games/:appid - Update specific fields of a game (Admin only)
router.patch("/:appid", protect, authorize("admin"), async (req, res) => {
  try {
    const { rating, price } = req.body;
    if (rating !== undefined && (parseFloat(rating) < 1.0 || parseFloat(rating) > 10.0))
      return sendError(res, "rating must be between 1.0 and 10.0", 400);
    if (price !== undefined && parseFloat(price) < 0)
      return sendError(res, "price must be a non-negative number", 400);

    const game = await Game.findOneAndUpdate(
      { appid: req.params.appid, isDeleted: false },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!game) return sendError(res, "Game not found", 404);
    return sendSuccess(res, game, 200);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
});

// ==========================================
// 4. DELETE Routes
// ==========================================

// DELETE /api/v1/games/:appid - Hard delete a game from the database (Admin only)
router.delete("/:appid", protect, authorize("admin"), async (req, res) => {
  try {
    const game = await Game.findOneAndDelete({ appid: req.params.appid });
    if (!game) return sendError(res, "Game not found", 404);
    return sendSuccess(res, { message: "Game deleted successfully" }, 200);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
});

module.exports = router;
