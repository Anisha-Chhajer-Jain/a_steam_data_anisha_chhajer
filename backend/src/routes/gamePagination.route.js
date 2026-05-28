// src/routes/gamePagination.route.js
// ---------------------------------------------------------------------------
// Pagination Routes — Demonstrates page / limit / offset patterns
// ---------------------------------------------------------------------------
// GET /api/v1/games/paginate?page=1&limit=2
// GET /api/v1/games/paginate/info             → shows pagination metadata only
// GET /api/v1/games/paginate/first-page       → hardcoded first page shortcut
// GET /api/v1/games/paginate/last-page        → last page of results
// ---------------------------------------------------------------------------

const express = require("express");
const router  = express.Router();

const { games, paginateAndSort } = require("../a_steam_data_anisha_chhajer/backend/src/store/dataStore");
const { sendSuccess }            = require("../a_steam_data_anisha_chhajer/backend/src/utils/responseHandler");

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
