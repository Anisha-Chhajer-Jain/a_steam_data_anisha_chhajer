const userService = require('../services/userService');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/responseHandler');

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
exports.registerUser = asyncHandler(async (req, res, next) => {
  const result = await userService.registerUser(req.body);
  return sendSuccess(res, result, 201);
});

/**
 * @desc    Authenticate user and get token
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const result = await userService.loginUser(email, password);
  return sendSuccess(res, result, 200);
});

/**
 * @desc    Get current logged in user details
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const profile = await userService.getUserProfile(req.user._id);
  return sendSuccess(res, profile, 200);
});
