const gameService = require('../services/gameService');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/responseHandler');

/**
 * @desc    Get all games (with filtering, searching, sorting, pagination, and projection)
 * @route   GET /api/v1/games
 * @access  Public
 */
exports.getGames = asyncHandler(async (req, res, next) => {
  const { games, pagination } = await gameService.getAllGames(req.query);
  return sendSuccess(res, games, 200, pagination);
});

/**
 * @desc    Get a single game details by appid
 * @route   GET /api/v1/games/:appid
 * @access  Public
 */
exports.getGame = asyncHandler(async (req, res, next) => {
  const game = await gameService.getGameByAppId(req.params.appid);
  return sendSuccess(res, game, 200);
});

/**
 * @desc    Create a new game
 * @route   POST /api/v1/games
 * @access  Private (Admin Only)
 */
exports.createGame = asyncHandler(async (req, res, next) => {
  const game = await gameService.createNewGame(req.body);
  return sendSuccess(res, game, 201);
});

/**
 * @desc    Update a game details
 * @route   PATCH /api/v1/games/:appid
 * @access  Private (Admin Only)
 */
exports.updateGame = asyncHandler(async (req, res, next) => {
  const game = await gameService.updateGameByAppId(req.params.appid, req.body);
  return sendSuccess(res, game, 200);
});

/**
 * @desc    Delete a game
 * @route   DELETE /api/v1/games/:appid
 * @access  Private (Admin Only)
 */
exports.deleteGame = asyncHandler(async (req, res, next) => {
  await gameService.deleteGameByAppId(req.params.appid);
  return sendSuccess(res, { message: 'Game deleted successfully' }, 200);
});