// src/routes/gamePagination.route.js
// ---------------------------------------------------------------------------
// Pagination routes for browsing game collections.
//
// All responses use the standard JSON format:
//   { success: boolean, data: array, meta: pagination }
//
// Example:
//   GET /api/v1/games/paginate?page=1&limit=2
//   response: { data: [...games], meta: { page, limit, total, pages } }
//
//   GET /api/v1/games/paginate/info
//   response: page metadata only
// ---------------------------------------------------------------------------

const express = require("express");
const router  = express.Router();

const { games, paginateAndSort } = require("../store/dataStore");
const { sendSuccess }            = require("../utils/responseHandler");

// Main paginate endpoint — supports ?page= ?limit= ?sort=
router.get("/", (req, res) => {
  const active = games.filter(g => !g.isDeleted);
  const result = paginateAndSort(active, req);
  return sendSuccess(res, result.data, 200, result.pagination);
});

// Metadata only — tells the client how many total pages exist
router.get("/info", (req, res) => {
  const total = games.filter(g => !g.isDeleted).length;
  const limit = parseInt(req.query.limit, 10) || 10;
  return sendSuccess(res, {
    total,
    limit,
    pages: Math.ceil(total / limit)
  }, 200);
});

// Shortcut: always returns page 1
router.get("/first-page", (req, res) => {
  const fakeReq = { query: { page: 1, limit: parseInt(req.query.limit, 10) || 2 } };
  const active  = games.filter(g => !g.isDeleted);
  const result  = paginateAndSort(active, fakeReq);
  return sendSuccess(res, result.data, 200, result.pagination);
});

// Shortcut: always returns the last page
router.get("/last-page", (req, res) => {
  const limit  = parseInt(req.query.limit, 10) || 2;
  const active = games.filter(g => !g.isDeleted);
  const pages  = Math.ceil(active.length / limit);
  const fakeReq = { query: { page: pages, limit } };
  const result  = paginateAndSort(active, fakeReq);
  return sendSuccess(res, result.data, 200, result.pagination);
});

module.exports = router;
