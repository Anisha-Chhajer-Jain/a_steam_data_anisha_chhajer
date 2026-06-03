// src/routes/middleware.route.js
// ---------------------------------------------------------------------------
// Demo routes for practicing Express middlewares, authentication, and role authorization.
//
// Mount locations:
//   - /api/v1/middleware  => middlewareRouter
//   - /api/v1/admin       => adminRouter
//   - /api/v1/protected   => protectedRouter
// ---------------------------------------------------------------------------

const express = require("express");
const middlewareRouter = express.Router();
const adminRouter = express.Router();
const protectedRouter = express.Router();

const { games } = require("../store/dataStore");
const { protect, authorize } = require("../middleware/auth");
const { sendSuccess, sendError } = require("../utils/responseHandler");

// ===========================================================================
// SECTION 1: Middleware Demo Router (mounted on /api/v1/middleware)
// ===========================================================================

// --- GET Routes ---

// GET /api/v1/middleware/logger - Practice route demonstrating request logger middleware activity
middlewareRouter.get("/logger", (req, res) => {
  return sendSuccess(res, { message: "Practice logger middleware. Logger is active and tracking calls." }, 200);
});

// GET /api/v1/middleware/auth - Practice route verifying token-based protection middleware
middlewareRouter.get("/auth", protect, (req, res) => {
  return sendSuccess(res, { message: "Practice authentication middleware. Verified successfully.", user: req.user }, 200);
});

// GET /api/v1/middleware/rate-limit - Practice route showing rate limiter activity details
middlewareRouter.get("/rate-limit", (req, res) => {
  return sendSuccess(res, { message: "Practice rate-limit middleware. Active configuration is 100 requests per 15 minutes." }, 200);
});

// GET /api/v1/middleware/error-handler - Practice route that triggers Express global error handling middleware
middlewareRouter.get("/error-handler", (req, res, next) => {
  const err = new Error("Practice Global Error handling framework.");
  err.statusCode = 400;
  next(err);
});


// ===========================================================================
// SECTION 2: Admin Panel Router (mounted on /api/v1/admin)
// ===========================================================================

// --- GET Routes ---

// GET /api/v1/admin/games - Get list of games (requires admin role authorization)
adminRouter.get("/games", protect, authorize("admin"), (req, res) => {
  return sendSuccess(res, games, 200);
});

// GET /api/v1/admin/analytics - Retrieve aggregate financial metrics (requires admin role authorization)
adminRouter.get("/analytics", protect, authorize("admin"), (req, res) => {
  return sendSuccess(res, { totalDownloads: 1650000, revenueEstimation: 3950000 }, 200);
});

// GET /api/v1/admin/reports - Get latest system-generated PDF/CSV report listings (requires admin role authorization)
adminRouter.get("/reports", protect, authorize("admin"), (req, res) => {
  return sendSuccess(res, { generatedReports: ["Wishlist Report May", "Popularity Distribution June"] }, 200);
});


// ===========================================================================
// SECTION 3: Protected Operations Router (mounted on /api/v1/protected)
// ===========================================================================

// --- POST Routes ---

// POST /api/v1/protected/games - Create a new game in memory dataStore (requires admin role authorization)
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

// --- PATCH Routes ---

// PATCH /api/v1/protected/games/:appid - Modify an in-memory game entry (requires admin role authorization)
protectedRouter.patch("/games/:appid", protect, authorize("admin"), (req, res) => {
  const game = games.find(g => g.appid === req.params.appid);
  if (!game) {
    return sendError(res, "Return 404: Game not found", 404);
  }
  Object.assign(game, req.body);
  return sendSuccess(res, game, 200);
});

// --- DELETE Routes ---

// DELETE /api/v1/protected/games/:appid - Permanently delete game from in-memory store (requires admin role authorization)
protectedRouter.delete("/games/:appid", protect, authorize("admin"), (req, res) => {
  const index = games.findIndex(g => g.appid === req.params.appid);
  if (index === -1) {
    return sendError(res, "Return 404: Game not found", 404);
  }
  games.splice(index, 1);
  return sendSuccess(res, { message: "Proper delete response: Game permanently deleted" }, 200);
});

module.exports = { middlewareRouter, adminRouter, protectedRouter };
