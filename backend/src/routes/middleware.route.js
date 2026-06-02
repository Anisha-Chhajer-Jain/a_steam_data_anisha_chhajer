// src/routes/middleware.route.js
// ---------------------------------------------------------------------------
// Demo and practice routes for middleware, admin, and protected access.
//
// These show how authentication, authorization, and error handling work.
//
// Example:
//   GET /api/v1/middleware/logger
//   response: middleware active message
//
//   POST /api/v1/protected/games
//   header: Authorization: Bearer {{token}}
//   body: { appid, name }
//   response: created protected game entry
// ---------------------------------------------------------------------------

const express = require("express");
const middlewareRouter = express.Router();
const adminRouter = express.Router();
const protectedRouter = express.Router();

const { games } = require("../store/dataStore");
const { protect, authorize } = require("../middleware/auth");
const { sendSuccess, sendError } = require("../utils/responseHandler");

// ===========================================================================
// 1. Middleware Router (mounted on /api/v1/middleware)
// ===========================================================================

// GET /api/v1/middleware/logger
middlewareRouter.get("/logger", (req, res) => {
  return sendSuccess(res, { message: "Practice logger middleware. Logger is active and tracking calls." }, 200);
});

// GET /api/v1/middleware/auth
middlewareRouter.get("/auth", protect, (req, res) => {
  return sendSuccess(res, { message: "Practice authentication middleware. Verified successfully.", user: req.user }, 200);
});

// GET /api/v1/middleware/rate-limit
middlewareRouter.get("/rate-limit", (req, res) => {
  return sendSuccess(res, { message: "Practice rate-limit middleware. Active configuration is 100 requests per 15 minutes." }, 200);
});

// GET /api/v1/middleware/error-handler
middlewareRouter.get("/error-handler", (req, res, next) => {
  const err = new Error("Practice Global Error handling framework.");
  err.statusCode = 400;
  next(err);
});


// ===========================================================================
// 2. Admin Router (mounted on /api/v1/admin)
// ===========================================================================

// GET /api/v1/admin/games
adminRouter.get("/games", protect, authorize("admin"), (req, res) => {
  return sendSuccess(res, games, 200);
});

// GET /api/v1/admin/analytics
adminRouter.get("/analytics", protect, authorize("admin"), (req, res) => {
  return sendSuccess(res, { totalDownloads: 1650000, revenueEstimation: 3950000 }, 200);
});

// GET /api/v1/admin/reports
adminRouter.get("/reports", protect, authorize("admin"), (req, res) => {
  return sendSuccess(res, { generatedReports: ["Wishlist Report May", "Popularity Distribution June"] }, 200);
});


// ===========================================================================
// 3. Protected Router (mounted on /api/v1/protected)
// ===========================================================================

// POST /api/v1/protected/games
protectedRouter.post("/games", protect, authorize("admin"), (req, res) => {
  const { appid, name } = req.body;
  if (!appid || !name) {
    return sendError(res, "Return 400: appid and name are required fields", 400);
  }
  const newGame = {
    appid,
    name,
    genres: [],
    categories: [],
    price: 0.00,
    history: [],
    screenshots: [],
    trailers: []
  };
  games.push(newGame);
  return sendSuccess(res, newGame, 201);
});

// PATCH /api/v1/protected/games/:appid
protectedRouter.patch("/games/:appid", protect, authorize("admin"), (req, res) => {
  const game = games.find(g => g.appid === req.params.appid);
  if (!game) {
    return sendError(res, "Return 404: Game not found", 404);
  }
  Object.assign(game, req.body);
  return sendSuccess(res, game, 200);
});

// DELETE /api/v1/protected/games/:appid
protectedRouter.delete("/games/:appid", protect, authorize("admin"), (req, res) => {
  const index = games.findIndex(g => g.appid === req.params.appid);
  if (index === -1) {
    return sendError(res, "Return 404: Game not found", 404);
  }
  games.splice(index, 1);
  return sendSuccess(res, { message: "Proper delete response: Game permanently deleted" }, 200);
});

module.exports = { middlewareRouter, adminRouter, protectedRouter };
