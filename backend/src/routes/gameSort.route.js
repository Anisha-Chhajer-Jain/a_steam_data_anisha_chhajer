// src/routes/gameSort.route.js
// ---------------------------------------------------------------------------
// Sorting Routes — Explicit sort-by-field endpoints
// ---------------------------------------------------------------------------
// GET /api/v1/games/sort/price-asc
// GET /api/v1/games/sort/price-desc
// GET /api/v1/games/sort/rating-desc
// GET /api/v1/games/sort/rating-asc
// GET /api/v1/games/sort/downloads-desc
// GET /api/v1/games/sort/releaseDate-desc
// GET /api/v1/games/sort/releaseDate-asc
// GET /api/v1/games/sort/popularity-desc
// GET /api/v1/games/sort/title-asc
// ---------------------------------------------------------------------------

const express = require("express");
const router  = express.Router();

const { games }                  = require("../store/dataStore");
const { sendSuccess }            = require("../utils/responseHandler");

const active = () => games.filter(g => !g.isDeleted);

router.get("/price-asc",        (req, res) => sendSuccess(res, [...active()].sort((a, b) => a.price      - b.price),      200));
router.get("/price-desc",       (req, res) => sendSuccess(res, [...active()].sort((a, b) => b.price      - a.price),      200));
router.get("/rating-desc",      (req, res) => sendSuccess(res, [...active()].sort((a, b) => b.rating     - a.rating),     200));
router.get("/rating-asc",       (req, res) => sendSuccess(res, [...active()].sort((a, b) => a.rating     - b.rating),     200));
router.get("/downloads-desc",   (req, res) => sendSuccess(res, [...active()].sort((a, b) => b.downloads  - a.downloads),  200));
router.get("/releaseDate-desc",  (req, res) => sendSuccess(res, [...active()].sort((a, b) => b.release_year - a.release_year), 200));
router.get("/releaseDate-asc",   (req, res) => sendSuccess(res, [...active()].sort((a, b) => a.release_year - b.release_year), 200));
router.get("/popularity-desc",   (req, res) => sendSuccess(res, [...active()].sort((a, b) => b.popularity - a.popularity), 200));
router.get("/title-asc",        (req, res) => sendSuccess(res, [...active()].sort((a, b) => a.name.localeCompare(b.name)), 200));

module.exports = router;
