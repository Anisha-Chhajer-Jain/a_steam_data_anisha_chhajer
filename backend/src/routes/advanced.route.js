// src/routes/advanced.route.js
// ---------------------------------------------------------------------------
// Advanced, notifications, stats, and in-memory analytics routes.
//
// These endpoints operate on stateless in-memory data structures from dataStore.
// ---------------------------------------------------------------------------

const express = require("express");
const router  = express.Router();

const { games, reviews, notifications } = require("../store/dataStore");
const { protect }                       = require("../middleware/auth");
const { sendSuccess, sendError }        = require("../utils/responseHandler");

// ==========================================
// 1. GET Routes
// ==========================================

// --- Game Lists & Discovery ---

// GET /api/v1/games/random - Get a random game
router.get("/games/random", (req, res) => {
  const random = games[Math.floor(Math.random() * games.length)];
  return sendSuccess(res, random, 200);
});

// GET /api/v1/trending/games - Get trending games (popularity >= 85)
router.get("/trending/games", (req, res) => {
  const trending = games.filter(g => g.popularity >= 85);
  return sendSuccess(res, trending, 200);
});

// GET /api/v1/recommendations/games/:appid - Get recommended related games
router.get("/recommendations/games/:appid", (req, res) => {
  const { appid } = req.params;
  const game = games.find(g => g.appid === appid);
  if (!game) return sendError(res, "Game not found", 404);
  const related = games
    .filter(g => g.appid !== appid && g.genres.some(gen => game.genres.includes(gen)))
    .slice(0, 3);
  return sendSuccess(res, related, 200);
});

// GET /api/v1/compare/games/:id1/:id2 - Compare two games side-by-side
router.get("/compare/games/:id1/:id2", (req, res) => {
  const g1 = games.find(g => g.appid === req.params.id1);
  const g2 = games.find(g => g.appid === req.params.id2);
  if (!g1 || !g2) return sendError(res, "One or both games not found", 404);
  return sendSuccess(res, { game1: g1, game2: g2 }, 200);
});

// GET /api/v1/timeline/game/:appid - Get a game release and update timeline
router.get("/timeline/game/:appid", (req, res) => {
  const { appid } = req.params;
  const game = games.find(g => g.appid === appid);
  if (!game) return sendError(res, "Game not found", 404);
  const timeline = [
    { event: "Game Released", date: game.release_date },
    { event: "First patch v1.1.0", date: "Jan 15, 2026" }
  ];
  return sendSuccess(res, timeline, 200);
});

// --- News & Logs ---

// GET /api/v1/news/latest - Get latest gaming updates
router.get("/news/latest", (req, res) => {
  const news = [{ title: "Steam Games Update News", content: "Major summer promotions underway." }];
  return sendSuccess(res, news, 200);
});

// GET /api/v1/news/trending - Get trending gaming news
router.get("/news/trending", (req, res) => {
  const news = [{ title: "Cyberpunk VR trending", hits: 54000 }];
  return sendSuccess(res, news, 200);
});

// GET /api/v1/activity/logs - Retrieve admin and developer activity logs
router.get("/activity/logs", (req, res) => {
  const logs = [
    { timestamp: new Date().toISOString(), user: "anisha_admin@test.com", action: "GET_API_HEALTH" }
  ];
  return sendSuccess(res, logs, 200);
});

// --- Notifications ---

// GET /api/v1/notifications - Retrieve all user notifications
router.get("/notifications", (req, res) => {
  return sendSuccess(res, notifications, 200);
});

// --- System & Utilities ---

// GET /api/v1/system/info - Get API engine and environment info
router.get("/system/info", (req, res) => {
  return sendSuccess(res, { system: "NodeJS Express API Server", environment: "Stateless Development Engine" }, 200);
});

// GET /api/v1/system/version - Get server build and version metrics
router.get("/system/version", (req, res) => {
  return sendSuccess(res, { version: "1.0.0", releaseDate: "May 27, 2026" }, 200);
});

// --- Mock Error Handlers (Validation Testing Routes) ---

// GET /api/v1/games/rating/invalid - Test response for rating out of bounds
router.get("/games/rating/invalid", (req, res) => {
  return sendError(res, "Handle invalid rating values: Rating must be a floating number between 1.0 and 10.0", 400);
});

// GET /api/v1/games/price/invalid - Test response for negative price values
router.get("/games/price/invalid", (req, res) => {
  return sendError(res, "Handle invalid price values: Price must be a non-negative float format", 400);
});

// GET /api/v1/games/genre/unknown - Test response for non-existent genres
router.get("/games/genre/unknown", (req, res) => {
  return sendError(res, "Handle invalid genre requests: Genre category is unrecognized", 404);
});

// --- In-Memory Stats & Analytics ---

// GET /api/v1/stats/games/count - Get total active games count
router.get("/stats/games/count", (req, res) => sendSuccess(res, { count: games.length }, 200));

// GET /api/v1/stats/games/top-rated - Get top rated game in dataStore
router.get("/stats/games/top-rated", (req, res) => {
  const topRated = [...games].sort((a, b) => b.rating - a.rating)[0];
  return sendSuccess(res, topRated, 200);
});

// GET /api/v1/stats/games/most-downloaded - Get most downloaded game in dataStore
router.get("/stats/games/most-downloaded", (req, res) => {
  const mostDownloaded = [...games].sort((a, b) => b.downloads - a.downloads)[0];
  return sendSuccess(res, mostDownloaded, 200);
});

// GET /api/v1/stats/games/average-price - Calculate average game price
router.get("/stats/games/average-price", (req, res) => {
  const total = games.reduce((sum, g) => sum + g.price, 0);
  return sendSuccess(res, { averagePrice: parseFloat((total / games.length).toFixed(2)) }, 200);
});

// GET /api/v1/stats/games/average-rating - Calculate average game rating
router.get("/stats/games/average-rating", (req, res) => {
  const total = games.reduce((sum, g) => sum + g.rating, 0);
  return sendSuccess(res, { averageRating: parseFloat((total / games.length).toFixed(1)) }, 200);
});

// GET /api/v1/stats/games/genre-count - Group games count by genre
router.get("/stats/games/genre-count", (req, res) => {
  const counts = {};
  games.forEach(g => g.genres.forEach(genre => {
    counts[genre] = (counts[genre] || 0) + 1;
  }));
  return sendSuccess(res, counts, 200);
});

// GET /api/v1/stats/games/platform-count - Group games count by platform
router.get("/stats/games/platform-count", (req, res) => {
  const counts = {};
  games.forEach(g => g.platforms.forEach(platform => {
    counts[platform] = (counts[platform] || 0) + 1;
  }));
  return sendSuccess(res, counts, 200);
});

// GET /api/v1/stats/games/free-to-play-count - Count of free-to-play games
router.get("/stats/games/free-to-play-count", (req, res) => {
  const count = games.filter(g => g.price === 0).length;
  return sendSuccess(res, { freeToPlayCount: count }, 200);
});

// GET /api/v1/stats/games/multiplayer-count - Count of multiplayer games
router.get("/stats/games/multiplayer-count", (req, res) => {
  const count = games.filter(g => g.tags.includes('multiplayer') || g.categories.includes('Multiplayer')).length;
  return sendSuccess(res, { multiplayerCount: count }, 200);
});

// GET /api/v1/stats/games/monthly-releases - Mock monthly releases summary
router.get("/stats/games/monthly-releases", (req, res) => {
  const releases = { "June": 1, "July": 2, "December": 1 };
  return sendSuccess(res, releases, 200);
});

// GET /api/v1/analytics/games/top-rated - Top 3 rated games
router.get("/analytics/games/top-rated", (req, res) => {
  const sorted = [...games].sort((a, b) => b.rating - a.rating).slice(0, 3);
  return sendSuccess(res, sorted, 200);
});

// GET /api/v1/analytics/games/most-downloaded - Top 3 downloaded games
router.get("/analytics/games/most-downloaded", (req, res) => {
  const sorted = [...games].sort((a, b) => b.downloads - a.downloads).slice(0, 3);
  return sendSuccess(res, sorted, 200);
});

// GET /api/v1/analytics/games/revenue - Estimated revenue list for all games
router.get("/analytics/games/revenue", (req, res) => {
  const revenue = games.map(g => ({
    appid: g.appid,
    name: g.name,
    estimatedRevenue: parseFloat((g.downloads * g.price).toFixed(2))
  }));
  return sendSuccess(res, revenue, 200);
});

// GET /api/v1/analytics/games/platform-distribution - Platform split counts
router.get("/analytics/games/platform-distribution", (req, res) => {
  const distribution = { windows: 4, mac: 2, linux: 1 };
  return sendSuccess(res, distribution, 200);
});

// GET /api/v1/analytics/games/genre-distribution - Genre split counts
router.get("/analytics/games/genre-distribution", (req, res) => {
  const distribution = { Action: 2, Adventure: 2, Indie: 4, RPG: 2, Strategy: 3, Casual: 1, Simulation: 1 };
  return sendSuccess(res, distribution, 200);
});

// GET /api/v1/analytics/games/trending - Trending games analytics
router.get("/analytics/games/trending", (req, res) => {
  const trending = games.filter(g => g.popularity >= 85);
  return sendSuccess(res, trending, 200);
});

// GET /api/v1/analytics/games/release-trends - Year release split counts
router.get("/analytics/games/release-trends", (req, res) => {
  const trends = { "2023": 1, "2024": 1, "2025": 2 };
  return sendSuccess(res, trends, 200);
});

// GET /api/v1/analytics/games/user-activity - Global active counts and player hours
router.get("/analytics/games/user-activity", (req, res) => {
  const activity = { activePlayers: 145000, hoursPlayed: 12500000, concurrentUsers: 48000 };
  return sendSuccess(res, activity, 200);
});

// GET /api/v1/analytics/games/wishlist-analysis - Projected wishlist hits
router.get("/analytics/games/wishlist-analysis", (req, res) => {
  const wishlists = games.map(g => ({
    appid: g.appid,
    name: g.name,
    wishlistHits: Math.round(g.popularity * 15.5)
  }));
  return sendSuccess(res, wishlists, 200);
});

// GET /api/v1/analytics/games/review-analysis - Total review breakdown
router.get("/analytics/games/review-analysis", (req, res) => {
  const analysis = { totalRatingAverage: 8.6, positiveReviews: 1, negativeReviews: 0 };
  return sendSuccess(res, analysis, 200);
});

// ==========================================
// 2. PATCH Routes
// ==========================================

// PATCH /api/v1/notifications/read/:id - Mark a notification as read
router.patch("/notifications/read/:id", (req, res) => {
  const notif = notifications.find(n => n.id === req.params.id);
  if (!notif) return sendError(res, "Notification not found", 404);
  notif.read = true;
  return sendSuccess(res, notif, 200);
});

// ==========================================
// 3. DELETE Routes
// ==========================================

// DELETE /api/v1/notifications/:id - Delete a notification
router.delete("/notifications/:id", (req, res) => {
  const index = notifications.findIndex(n => n.id === req.params.id);
  if (index === -1) return sendError(res, "Notification not found", 404);
  notifications.splice(index, 1);
  return sendSuccess(res, { message: "Notification successfully deleted" }, 200);
});

module.exports = router;
