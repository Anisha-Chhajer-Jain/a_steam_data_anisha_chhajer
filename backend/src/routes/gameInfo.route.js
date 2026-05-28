// src/routes/gameInfo.route.js
// ---------------------------------------------------------------------------
// Game Information Routes — Media, Reviews & Metadata sub-routes
// ---------------------------------------------------------------------------
// GET    /api/v1/games/:appid/screenshots
// GET    /api/v1/games/:appid/trailers
// GET    /api/v1/games/:appid/reviews/stats
// GET    /api/v1/games/:appid/reviews
// POST   /api/v1/games/:appid/reviews
// PATCH  /api/v1/games/:appid/reviews/:reviewId
// DELETE /api/v1/games/:appid/reviews/:reviewId
// GET    /api/v1/games/:appid/system-requirements
// GET    /api/v1/games/:appid/dlc
// GET    /api/v1/games/:appid/achievements
// GET    /api/v1/games/:appid/leaderboards
// GET    /api/v1/games/:appid/updates
// GET    /api/v1/games/:appid/news
// ---------------------------------------------------------------------------

const express = require("express");
const router  = express.Router({ mergeParams: true }); // mergeParams lets us read :appid

const { games, reviews }         = require("../store/dataStore");
const { protect }                = require("../middleware/auth");
const { sendSuccess, sendError } = require("../utils/responseHandler");

// ── Screenshots ───────────────────────────────────────────────────────────
router.get("/screenshots", (req, res) => {
  const { appid } = req.params;
  if (!games.some(g => g.appid === appid && !g.isDeleted))
    return sendError(res, "Game not found", 404);

  const screenshots = [
    `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/ss_1.jpg`,
    `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/ss_2.jpg`,
    `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/ss_3.jpg`
  ];
  return sendSuccess(res, screenshots, 200);
});

// ── Trailers ──────────────────────────────────────────────────────────────
router.get("/trailers", (req, res) => {
  const { appid } = req.params;
  if (!games.some(g => g.appid === appid && !g.isDeleted))
    return sendError(res, "Game not found", 404);

  const trailers = [
    {
      id: "trailer_1",
      name: "Official Gameplay Trailer",
      url: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/movie_max.mp4`,
      thumbnail: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/movie_600x337.jpg`
    }
  ];
  return sendSuccess(res, trailers, 200);
});

// ── Review Stats ──────────────────────────────────────────────────────────
router.get("/reviews/stats", (req, res) => {
  const { appid } = req.params;
  if (!games.some(g => g.appid === appid))
    return sendError(res, "Game not found", 404);

  const gameReviews = reviews.filter(r => r.gameAppid === appid);
  if (gameReviews.length === 0)
    return sendSuccess(res, { totalReviews: 0, avgRating: 0, recommendationRate: 0 }, 200);

  const total       = gameReviews.length;
  const sumRating   = gameReviews.reduce((sum, r) => sum + r.rating, 0);
  const recommended = gameReviews.filter(r => r.recommend).length;

  return sendSuccess(res, {
    totalReviews:      total,
    avgRating:         parseFloat((sumRating / total).toFixed(1)),
    recommendationRate: Math.round((recommended / total) * 100)
  }, 200);
});

// ── Fetch Reviews ─────────────────────────────────────────────────────────
router.get("/reviews", (req, res) => {
  const { appid } = req.params;
  if (!games.some(g => g.appid === appid))
    return sendError(res, "Game not found", 404);

  return sendSuccess(res, reviews.filter(r => r.gameAppid === appid), 200);
});

// ── Add Review ────────────────────────────────────────────────────────────
router.post("/reviews", protect, (req, res) => {
  const { appid } = req.params;
  const { rating, comment, recommend } = req.body;

  if (!games.some(g => g.appid === appid))
    return sendError(res, "Game not found", 404);
  if (reviews.find(r => r.gameAppid === appid && r.user._id === req.user._id))
    return sendError(res, "You have already submitted a review for this game", 400);

  const newReview = {
    _id:      `review_${Date.now()}`,
    user:     { _id: req.user._id, name: req.user.name, email: req.user.email },
    gameAppid: appid,
    rating:   parseInt(rating, 10),
    comment,
    recommend: recommend !== undefined ? recommend : true,
    createdAt: new Date().toISOString()
  };

  reviews.push(newReview);
  return sendSuccess(res, newReview, 201);
});

// ── Update Review ─────────────────────────────────────────────────────────
router.patch("/reviews/:reviewId", protect, (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment, recommend } = req.body;

  const review = reviews.find(r => r._id === reviewId);
  if (!review) return sendError(res, "Review not found", 404);
  if (review.user._id.toString() !== req.user._id.toString())
    return sendError(res, "Not authorized to update this review", 403);

  if (rating    !== undefined) review.rating    = parseInt(rating, 10);
  if (comment   !== undefined) review.comment   = comment;
  if (recommend !== undefined) review.recommend = recommend;

  return sendSuccess(res, review, 200);
});

// ── Delete Review ─────────────────────────────────────────────────────────
router.delete("/reviews/:reviewId", protect, (req, res) => {
  const { reviewId } = req.params;
  const index = reviews.findIndex(r => r._id === reviewId);
  if (index === -1) return sendError(res, "Review not found", 404);

  const review = reviews[index];
  if (review.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin")
    return sendError(res, "Not authorized to delete this review", 403);

  reviews.splice(index, 1);
  return sendSuccess(res, { message: "Review successfully deleted" }, 200);
});

// ── System Requirements ───────────────────────────────────────────────────
router.get("/system-requirements", (req, res) => {
  const { appid } = req.params;
  if (!games.some(g => g.appid === appid))
    return sendError(res, "Game not found", 404);

  return sendSuccess(res, {
    minimum: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5-4460 or AMD Ryzen 3 1200",
      memory: "8 GB RAM",
      graphics: "NVIDIA GeForce GTX 960 or AMD Radeon RX 460",
      directX: "Version 12",
      storage: "50 GB available space"
    },
    recommended: {
      os: "Windows 10/11 64-bit",
      processor: "Intel Core i7-8700 or AMD Ryzen 5 3600X",
      memory: "16 GB RAM",
      graphics: "NVIDIA GeForce GTX 1070 or AMD Radeon RX 590",
      directX: "Version 12",
      storage: "50 GB SSD available space"
    }
  }, 200);
});

// ── DLC ───────────────────────────────────────────────────────────────────
router.get("/dlc", (req, res) => {
  const { appid } = req.params;
  const game = games.find(g => g.appid === appid && !g.isDeleted);
  if (!game) return sendError(res, "Game not found", 404);

  return sendSuccess(res, [
    { dlc_appid: `${appid}1`, name: `${game.name} - Digital Artbook & Soundtrack`, price: 9.99,  released: true },
    { dlc_appid: `${appid}2`, name: `${game.name} - Cyber Expansion Pack`,          price: 19.99, released: true }
  ], 200);
});

// ── Achievements ──────────────────────────────────────────────────────────
router.get("/achievements", (req, res) => {
  const { appid } = req.params;
  if (!games.some(g => g.appid === appid))
    return sendError(res, "Game not found", 404);

  return sendSuccess(res, [
    {
      id: "ach_first_steps",
      name: "First Steps",
      description: "Complete the introductory mission.",
      icon: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/ach_1.jpg`,
      unlockedPercentage: 84.5
    },
    {
      id: "ach_hardcore",
      name: "Legendary Survivor",
      description: "Complete the game on maximum difficulty.",
      icon: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/ach_2.jpg`,
      unlockedPercentage: 4.2
    }
  ], 200);
});

// ── Leaderboards ──────────────────────────────────────────────────────────
router.get("/leaderboards", (req, res) => {
  const { appid } = req.params;
  if (!games.some(g => g.appid === appid))
    return sendError(res, "Game not found", 404);

  return sendSuccess(res, [
    { rank: 1, username: "SpeedrunnerX",   score: 94820, country: "US" },
    { rank: 2, username: "AnishaChhajer",  score: 91300, country: "IN" },
    { rank: 3, username: "GamerPro",       score: 87500, country: "UK" }
  ], 200);
});

// ── Latest Updates ────────────────────────────────────────────────────────
router.get("/updates", (req, res) => {
  const { appid } = req.params;
  if (!games.some(g => g.appid === appid))
    return sendError(res, "Game not found", 404);

  return sendSuccess(res, [
    {
      version: "v1.1.0",
      title: "Performance Optimization Update",
      date: new Date().toISOString().split("T")[0],
      changelog: [
        "Optimized graphics rendering pipelines — memory footprint reduced by 15%",
        "Fixed crash related to windowed mode toggling",
        "Balanced price metrics for primary custom achievements"
      ]
    }
  ], 200);
});

// ── Game News ─────────────────────────────────────────────────────────────
router.get("/news", (req, res) => {
  const { appid } = req.params;
  const game = games.find(g => g.appid === appid && !g.isDeleted);
  if (!game) return sendError(res, "Game not found", 404);

  return sendSuccess(res, [
    {
      title: `${game.name} Summer Sale & Special Event!`,
      author: "Publisher News Network",
      publishedAt: new Date().toISOString(),
      content: `The ultimate developer event has started! Play ${game.name} today and unlock limited seasonal achievements.`
    }
  ], 200);
});

module.exports = router;
