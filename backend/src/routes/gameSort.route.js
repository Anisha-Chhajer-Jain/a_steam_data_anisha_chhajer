// src/routes/gameSort.route.js
// ---------------------------------------------------------------------------
// Sorting routes for common game ordering options.
//
// Each endpoint returns a paginated list of games sorted by the chosen field.
//
// Example:
//   GET /api/v1/games/sort/price-desc?page=1&limit=10
//   response: sorted games + pagination metadata
// ---------------------------------------------------------------------------

const express = require("express");
const router  = express.Router();

const Game                       = require("../models/Game");
const { sendSuccess, sendError } = require("../utils/responseHandler");

const sorted = async (sortObj, req, res) => {
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

router.get("/price-asc",       (req, res) => sorted({ price:        1 }, req, res));
router.get("/price-desc",      (req, res) => sorted({ price:       -1 }, req, res));
router.get("/rating-desc",     (req, res) => sorted({ rating:      -1 }, req, res));
router.get("/rating-asc",      (req, res) => sorted({ rating:       1 }, req, res));
router.get("/downloads-desc",  (req, res) => sorted({ downloads:   -1 }, req, res));
router.get("/releaseDate-desc",(req, res) => sorted({ release_year:-1 }, req, res));
router.get("/releaseDate-asc", (req, res) => sorted({ release_year: 1 }, req, res));
router.get("/popularity-desc", (req, res) => sorted({ popularity:  -1 }, req, res));
router.get("/title-asc",       (req, res) => sorted({ name:         1 }, req, res));

module.exports = router;
