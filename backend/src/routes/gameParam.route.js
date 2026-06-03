// src/routes/gameParam.route.js
// ---------------------------------------------------------------------------
// Parameter-based routes that filter games directly from the path values.
// ---------------------------------------------------------------------------

const express = require("express");
const router  = express.Router();

const { games, paginateAndSort } = require("../store/dataStore");
const { sendSuccess, sendError } = require("../utils/responseHandler");

// ==========================================
// 1. GET Routes (Path Parameter Filters)
// ==========================================

// GET /api/v1/games/genre/:genre - Get games by genre tag (case-insensitive)
router.get("/genre/:genre", (req, res) => {
  const list   = games.filter(g => !g.isDeleted && g.genres.some(gen => gen.toLowerCase() === req.params.genre.toLowerCase()));
  const result = paginateAndSort(list, req);
  return sendSuccess(res, result.data, 200, result.pagination);
});

// GET /api/v1/games/developer/:developer - Get games matching developer name (partial)
router.get("/developer/:developer", (req, res) => {
  const list   = games.filter(g => !g.isDeleted && g.developer.toLowerCase().includes(req.params.developer.toLowerCase()));
  const result = paginateAndSort(list, req);
  return sendSuccess(res, result.data, 200, result.pagination);
});

// GET /api/v1/games/publisher/:publisher - Get games matching publisher name (partial)
router.get("/publisher/:publisher", (req, res) => {
  const list   = games.filter(g => !g.isDeleted && g.publisher.toLowerCase().includes(req.params.publisher.toLowerCase()));
  const result = paginateAndSort(list, req);
  return sendSuccess(res, result.data, 200, result.pagination);
});

// GET /api/v1/games/platform/:platform - Get games matching platform tag (e.g. windows, mac, linux)
router.get("/platform/:platform", (req, res) => {
  const list   = games.filter(g => !g.isDeleted && g.platforms.includes(req.params.platform.toLowerCase()));
  const result = paginateAndSort(list, req);
  return sendSuccess(res, result.data, 200, result.pagination);
});

// GET /api/v1/games/tag/:tag - Get games matching user tag (e.g. survival, indie)
router.get("/tag/:tag", (req, res) => {
  const list   = games.filter(g => !g.isDeleted && g.tags.includes(req.params.tag.toLowerCase()));
  const result = paginateAndSort(list, req);
  return sendSuccess(res, result.data, 200, result.pagination);
});

// GET /api/v1/games/release-year/:year - Get games matching a specific release year
router.get("/release-year/:year", (req, res) => {
  const year = parseInt(req.params.year, 10);
  if (isNaN(year)) return sendError(res, "year must be a valid number", 400);
  const list   = games.filter(g => !g.isDeleted && g.release_year === year);
  const result = paginateAndSort(list, req);
  return sendSuccess(res, result.data, 200, result.pagination);
});

// GET /api/v1/games/rating/:rating - Get games with ratings at or above parameter value
router.get("/rating/:rating", (req, res) => {
  const minRating = parseFloat(req.params.rating);
  if (isNaN(minRating) || minRating < 1 || minRating > 10)
    return sendError(res, "rating must be a number between 1.0 and 10.0", 400);
  const list   = games.filter(g => !g.isDeleted && g.rating >= minRating);
  const result = paginateAndSort(list, req);
  return sendSuccess(res, result.data, 200, result.pagination);
});

// GET /api/v1/games/price/:price - Get games with price at or below parameter value
router.get("/price/:price", (req, res) => {
  const maxPrice = parseFloat(req.params.price);
  if (isNaN(maxPrice) || maxPrice < 0)
    return sendError(res, "price must be a non-negative number", 400);
  const list   = games.filter(g => !g.isDeleted && g.price <= maxPrice);
  const result = paginateAndSort(list, req);
  return sendSuccess(res, result.data, 200, result.pagination);
});

// GET /api/v1/games/feature/:feature - Get games matching input feature string in categories
router.get("/feature/:feature", (req, res) => {
  const feature = req.params.feature.toLowerCase();
  const list    = games.filter(g => !g.isDeleted && g.categories.some(c => c.toLowerCase().includes(feature)));
  const result  = paginateAndSort(list, req);
  return sendSuccess(res, result.data, 200, result.pagination);
});

module.exports = router;
