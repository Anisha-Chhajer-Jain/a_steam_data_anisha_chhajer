// src/routes/gameParam.route.js
// ---------------------------------------------------------------------------
// Parameter-based routes that filter games from the path values.
//
// Example request:
//   GET /api/v1/games/genre/Action
//   response: games with genre "Action"
//
// Request parameters:
//   genre, developer, publisher, platform, tag, year, rating, price, feature
//
// All responses include page metadata and an array of matching games.
// ---------------------------------------------------------------------------

const express = require("express");
const router  = express.Router();

const { games, paginateAndSort } = require("../store/dataStore");
const { sendSuccess, sendError } = require("../utils/responseHandler");

// GET /api/v1/games/genre/:genre
router.get("/genre/:genre", (req, res) => {
  const list   = games.filter(g => !g.isDeleted && g.genres.some(gen => gen.toLowerCase() === req.params.genre.toLowerCase()));
  const result = paginateAndSort(list, req);
  return sendSuccess(res, result.data, 200, result.pagination);
});

// GET /api/v1/games/developer/:developer
router.get("/developer/:developer", (req, res) => {
  const list   = games.filter(g => !g.isDeleted && g.developer.toLowerCase().includes(req.params.developer.toLowerCase()));
  const result = paginateAndSort(list, req);
  return sendSuccess(res, result.data, 200, result.pagination);
});

// GET /api/v1/games/publisher/:publisher
router.get("/publisher/:publisher", (req, res) => {
  const list   = games.filter(g => !g.isDeleted && g.publisher.toLowerCase().includes(req.params.publisher.toLowerCase()));
  const result = paginateAndSort(list, req);
  return sendSuccess(res, result.data, 200, result.pagination);
});

// GET /api/v1/games/platform/:platform
router.get("/platform/:platform", (req, res) => {
  const list   = games.filter(g => !g.isDeleted && g.platforms.includes(req.params.platform.toLowerCase()));
  const result = paginateAndSort(list, req);
  return sendSuccess(res, result.data, 200, result.pagination);
});

// GET /api/v1/games/tag/:tag
router.get("/tag/:tag", (req, res) => {
  const list   = games.filter(g => !g.isDeleted && g.tags.includes(req.params.tag.toLowerCase()));
  const result = paginateAndSort(list, req);
  return sendSuccess(res, result.data, 200, result.pagination);
});

// GET /api/v1/games/release-year/:year
router.get("/release-year/:year", (req, res) => {
  const year = parseInt(req.params.year, 10);
  if (isNaN(year)) return sendError(res, "year must be a valid number", 400);
  const list   = games.filter(g => !g.isDeleted && g.release_year === year);
  const result = paginateAndSort(list, req);
  return sendSuccess(res, result.data, 200, result.pagination);
});

// GET /api/v1/games/rating/:rating  — fetch games with rating >= value
router.get("/rating/:rating", (req, res) => {
  const minRating = parseFloat(req.params.rating);
  if (isNaN(minRating) || minRating < 1 || minRating > 10)
    return sendError(res, "rating must be a number between 1.0 and 10.0", 400);
  const list   = games.filter(g => !g.isDeleted && g.rating >= minRating);
  const result = paginateAndSort(list, req);
  return sendSuccess(res, result.data, 200, result.pagination);
});

// GET /api/v1/games/price/:price  — fetch games at or below price
router.get("/price/:price", (req, res) => {
  const maxPrice = parseFloat(req.params.price);
  if (isNaN(maxPrice) || maxPrice < 0)
    return sendError(res, "price must be a non-negative number", 400);
  const list   = games.filter(g => !g.isDeleted && g.price <= maxPrice);
  const result = paginateAndSort(list, req);
  return sendSuccess(res, result.data, 200, result.pagination);
});

// GET /api/v1/games/feature/:feature  — match feature in categories
router.get("/feature/:feature", (req, res) => {
  const feature = req.params.feature.toLowerCase();
  const list    = games.filter(g => !g.isDeleted && g.categories.some(c => c.toLowerCase().includes(feature)));
  const result  = paginateAndSort(list, req);
  return sendSuccess(res, result.data, 200, result.pagination);
});

module.exports = router;
