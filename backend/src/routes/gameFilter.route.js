// src/routes/gameFilter.route.js
// ---------------------------------------------------------------------------
// Filtering Routes — Pre-defined filter categories
// ---------------------------------------------------------------------------
// GET /api/v1/games/filter/free-to-play
// GET /api/v1/games/filter/paid
// GET /api/v1/games/filter/discounted
// GET /api/v1/games/filter/early-access
// GET /api/v1/games/filter/vr-only
// GET /api/v1/games/filter/controller-support
// GET /api/v1/games/filter/multiplayer
// GET /api/v1/games/filter/singleplayer
// GET /api/v1/games/filter/coop
// GET /api/v1/games/filter/open-world
// GET /api/v1/games/filter/survival
// GET /api/v1/games/filter/horror
// GET /api/v1/games/filter/anime
// GET /api/v1/games/filter/indie
// GET /api/v1/games/filter/top-rated
// ---------------------------------------------------------------------------

const express = require("express");
const router  = express.Router();

const { games, paginateAndSort } = require("../store/dataStore");
const { sendSuccess }            = require("../utils/responseHandler");

const filtered = (predicate, req, res) => {
  const list   = games.filter(g => !g.isDeleted && predicate(g));
  const result = paginateAndSort(list, req);
  return sendSuccess(res, result.data, 200, result.pagination);
};

router.get("/free-to-play",       (req, res) => filtered(g => g.price === 0,                                                       req, res));
router.get("/paid",               (req, res) => filtered(g => g.price > 0,                                                         req, res));
router.get("/discounted",         (req, res) => filtered(g => g.discounted,                                                         req, res));
router.get("/early-access",       (req, res) => filtered(g => g.isEarlyAccess,                                                      req, res));
router.get("/vr-only",            (req, res) => filtered(g => g.isVROnly,                                                           req, res));
router.get("/controller-support", (req, res) => filtered(g => g.categories.some(c => c.toLowerCase().includes("controller")),       req, res));
router.get("/multiplayer",        (req, res) => filtered(g => g.tags.includes("multiplayer") || g.categories.includes("Multiplayer"), req, res));
router.get("/singleplayer",       (req, res) => filtered(g => g.categories.some(c => c.toLowerCase().includes("single-player")),    req, res));
router.get("/coop",               (req, res) => filtered(g => g.tags.includes("co-op"),                                             req, res));
router.get("/open-world",         (req, res) => filtered(g => g.tags.includes("open-world"),                                        req, res));
router.get("/survival",           (req, res) => filtered(g => g.tags.includes("survival"),                                          req, res));
router.get("/horror",             (req, res) => filtered(g => g.tags.includes("horror"),                                            req, res));
router.get("/anime",              (req, res) => filtered(g => g.tags.includes("anime"),                                             req, res));
router.get("/indie",              (req, res) => filtered(g => g.genres.includes("Indie"),                                           req, res));
router.get("/top-rated",          (req, res) => filtered(g => g.rating >= 8.5,                                                      req, res));

module.exports = router;
