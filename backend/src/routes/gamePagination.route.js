// src/routes/gamePagination.route.js
// ---------------------------------------------------------------------------
// Pagination routes for browsing game collections.
// ---------------------------------------------------------------------------

const express = require("express");
const router  = express.Router();

const { games, paginateAndSort } = require("../store/dataStore");
const { sendSuccess }            = require("../utils/responseHandler");

// ==========================================
// 1. GET Routes
// ==========================================

// GET /api/v1/games/paginate/info - Get pagination metadata (total games, page limit, pages count)
router.get("/info", (req, res) => {
  const total = games.filter(g => !g.isDeleted).length;
  const limit = parseInt(req.query.limit, 10) || 10;
  return sendSuccess(res, {
    total,
    limit,
    pages: Math.ceil(total / limit)
  }, 200);
});

// GET /api/v1/games/paginate/first-page - Shortcut route to fetch the first page of games
router.get("/first-page", (req, res) => {
  const fakeReq = { query: { page: 1, limit: parseInt(req.query.limit, 10) || 2 } };
  const active  = games.filter(g => !g.isDeleted);
  const result  = paginateAndSort(active, fakeReq);
  return sendSuccess(res, result.data, 200, result.pagination);
});

// GET /api/v1/games/paginate/last-page - Shortcut route to fetch the last page of games
router.get("/last-page", (req, res) => {
  const limit  = parseInt(req.query.limit, 10) || 2;
  const active = games.filter(g => !g.isDeleted);
  const pages  = Math.ceil(active.length / limit);
  const fakeReq = { query: { page: pages, limit } };
  const result  = paginateAndSort(active, fakeReq);
  return sendSuccess(res, result.data, 200, result.pagination);
});

// GET /api/v1/games/paginate - Main paginated list of active games (?page=&limit=)
router.get("/", (req, res) => {
  const active = games.filter(g => !g.isDeleted);
  const result = paginateAndSort(active, req);
  return sendSuccess(res, result.data, 200, result.pagination);
});

module.exports = router;
