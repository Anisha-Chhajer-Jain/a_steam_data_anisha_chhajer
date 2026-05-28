// src/routes/auth.route.js
// ---------------------------------------------------------------------------
// Authentication (Session & JWT) Routes
// ---------------------------------------------------------------------------

const express = require("express");
const authRouter = express.Router();
const jwtRouter = express.Router();

const { games, userProfile } = require("../store/dataStore");
const { protect, authorize } = require("../middleware/auth");
const { sendSuccess, sendError } = require("../utils/responseHandler");

// ===========================================================================
// 1. Session Auth Router (mounted on /api/v1/auth)
// ===========================================================================

// POST /api/v1/auth/register
authRouter.post("/register", (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) {
    return sendError(res, "Register error: Validate email and password are required fields", 400);
  }
  return sendSuccess(res, { message: "User successfully registered in stateless mode", user: { name, email } }, 201);
});

// POST /api/v1/auth/login
authRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return sendError(res, "Login error: Validate login credentials are required", 400);
  }
  return sendSuccess(res, { message: "User successfully authenticated in stateless mode", token: "mock_jwt_token_session_anisha" }, 200);
});

// POST /api/v1/auth/logout
authRouter.post("/logout", (req, res) => {
  return sendSuccess(res, { message: "Successfully logged out user session" }, 200);
});

// GET /api/v1/auth/profile
authRouter.get("/profile", protect, (req, res) => {
  return sendSuccess(res, userProfile, 200);
});

// PATCH /api/v1/auth/profile
authRouter.patch("/profile", protect, (req, res) => {
  Object.assign(userProfile, req.body);
  return sendSuccess(res, userProfile, 200);
});

// POST /api/v1/auth/forgot-password
authRouter.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  if (!email) return sendError(res, "Email address is required", 400);
  return sendSuccess(res, { message: `Password reset verification link dispatched to ${email}` }, 200);
});

// POST /api/v1/auth/reset-password
authRouter.post("/reset-password", (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return sendError(res, "Token and newPassword are required fields", 400);
  return sendSuccess(res, { message: "Password reset completed successfully" }, 200);
});

// POST /api/v1/auth/change-password
authRouter.post("/change-password", protect, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) return sendError(res, "Current and new password are required fields", 400);
  return sendSuccess(res, { message: "Password updated successfully" }, 200);
});

// POST /api/v1/auth/verify-email
authRouter.post("/verify-email", (req, res) => {
  const { code } = req.body;
  if (!code) return sendError(res, "Verification code is required", 400);
  return sendSuccess(res, { message: "Email validation completed successfully" }, 200);
});

// POST /api/v1/auth/send-otp
authRouter.post("/send-otp", (req, res) => {
  const { email } = req.body;
  if (!email) return sendError(res, "Email is required to dispatch OTP", 400);
  return sendSuccess(res, { message: `One-Time-Password sent to ${email} (Practice OTP Code: 49201)` }, 200);
});


// ===========================================================================
// 2. JWT Auth Router (mounted on /api/v1/jwt)
// ===========================================================================

// GET /api/v1/jwt/profile
jwtRouter.get("/profile", protect, (req, res) => {
  return sendSuccess(res, { scope: "jwt-profile", user: req.user }, 200);
});

// GET /api/v1/jwt/dashboard
jwtRouter.get("/dashboard", protect, (req, res) => {
  return sendSuccess(res, { message: "Welcome to your JWT-secured dashboard system." }, 200);
});

// POST /api/v1/jwt/generate-token
jwtRouter.post("/generate-token", (req, res) => {
  const { userId } = req.body;
  const token = "mock_jwt_token_" + (userId || "anisha_admin_user");
  return sendSuccess(res, { token, expiresIn: "24h" }, 201);
});

// POST /api/v1/jwt/verify-token
jwtRouter.post("/verify-token", (req, res) => {
  const { token } = req.body;
  if (!token) return sendError(res, "Token is required for validation", 400);
  return sendSuccess(res, { isValid: true, decoded: { id: "6650b2849b20b22a5c531d04", email: "anisha_admin@test.com" } }, 200);
});

// POST /api/v1/jwt/refresh-token
jwtRouter.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return sendError(res, "Refresh token is required", 400);
  return sendSuccess(res, { accessToken: "new_refreshed_mock_token_12345" }, 200);
});

// DELETE /api/v1/jwt/revoke-token
jwtRouter.delete("/revoke-token", (req, res) => {
  const { token } = req.body;
  if (!token) return sendError(res, "Token is required for revocation", 400);
  return sendSuccess(res, { message: "Token successfully added to revocation blacklist" }, 200);
});

// GET /api/v1/jwt/private-games
jwtRouter.get("/private-games", protect, (req, res) => {
  return sendSuccess(res, games, 200);
});

// GET /api/v1/jwt/private-analytics
jwtRouter.get("/private-analytics", protect, authorize("admin"), (req, res) => {
  return sendSuccess(res, { secureHits: 495000, threatAlerts: 0 }, 200);
});

module.exports = { authRouter, jwtRouter };
