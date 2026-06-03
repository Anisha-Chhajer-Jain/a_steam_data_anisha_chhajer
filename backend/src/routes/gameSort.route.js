// src/routes/gameSort.route.js
// ---------------------------------------------------------------------------
// Sorting routes for common game ordering options.
// ---------------------------------------------------------------------------

const express = require("express");
const router  = express.Router();

const Game                       = require("../models/Game");
const { sendSuccess, sendError } = require("../utils/responseHandler");

// Helper: run a MongoDB query with pagination and specific sorting
const executeSortedQuery = async (sortObj, req, res) => {
  try {
    const page  = parseInt(req.query.page,  10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip  = (page - 1) * limit;

    const total = await Game.countDocuments({ isDeleted: false });
    const data  = await Game.find({ isDeleted: false }).sort(sortObj).skip(skip).limit(limit);

    return sendSuccess(res, data, 200, { page, limit, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};

// ==========================================
// 1. GET Routes (Sorting Endpoints)
// ==========================================

// GET /api/v1/games/sort/price-asc - Sort games by price from low to high
router.get("/price-asc", (req, res) => executeSortedQuery({ price: 1 }, req, res));

// GET /api/v1/games/sort/price-desc - Sort games by price from high to low
router.get("/price-desc", (req, res) => executeSortedQuery({ price: -1 }, req, res));

// GET /api/v1/games/sort/rating-desc - Sort games by rating from high to low
router.get("/rating-desc", (req, res) => executeSortedQuery({ rating: -1 }, req, res));

// GET /api/v1/games/sort/rating-asc - Sort games by rating from low to high
router.get("/rating-asc", (req, res) => executeSortedQuery({ rating: 1 }, req, res));

// GET /api/v1/games/sort/downloads-desc - Sort games by downloads volume descending
router.get("/downloads-desc", (req, res) => executeSortedQuery({ downloads: -1 }, req, res));

// GET /api/v1/games/sort/releaseDate-desc - Sort games by release year descending (newest first)
router.get("/releaseDate-desc", (req, res) => executeSortedQuery({ release_year: -1 }, req, res));

// GET /api/v1/games/sort/releaseDate-asc - Sort games by release year ascending (oldest first)
router.get("/releaseDate-asc", (req, res) => executeSortedQuery({ release_year: 1 }, req, res));

// GET /api/v1/games/sort/popularity-desc - Sort games by popularity score descending
router.get("/popularity-desc", (req, res) => executeSortedQuery({ popularity: -1 }, req, res));

// GET /api/v1/games/sort/title-asc - Sort games alphabetically by name (A-Z)
router.get("/title-asc", (req, res) => executeSortedQuery({ name: 1 }, req, res));

module.exports = router;
