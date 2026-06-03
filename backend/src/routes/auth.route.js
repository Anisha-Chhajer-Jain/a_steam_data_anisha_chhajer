// src/routes/auth.route.js
// ---------------------------------------------------------------------------
// Authentication routes: session-based and JWT-based auth flows.
//
// Mount locations:
//   - /api/v1/auth    => authRouter (Session Auth)
//   - /api/v1/jwt     => jwtRouter (JWT Token operations)
// ---------------------------------------------------------------------------

const express = require("express");
const authRouter = express.Router();
const jwtRouter = express.Router();

const { games, userProfile } = require("../store/dataStore");
const { protect, authorize } = require("../middleware/auth");
const { sendSuccess, sendError } = require("../utils/responseHandler");

// ===========================================================================
// SECTION 1: Session Auth Router (mounted on /api/v1/auth)
// ===========================================================================

// --- GET Routes ---

// GET /api/v1/auth/profile - Retrieve authenticated user profile info
authRouter.get("/profile", protect, (req, res) => {
  return sendSuccess(res, userProfile, 200);
});

// --- POST Routes ---

// POST /api/v1/auth/register - Register a new user in stateless database mode
authRouter.post("/register", (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) {
    return sendError(res, "Register error: Validate email and password are required fields", 400);
  }
  return sendSuccess(res, { message: "User successfully registered in stateless mode", user: { name, email } }, 201);
});

// POST /api/v1/auth/login - Authenticate credentials and return a mock token
authRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return sendError(res, "Login error: Validate login credentials are required", 400);
  }
  return sendSuccess(res, { message: "User successfully authenticated in stateless mode", token: "mock_jwt_token_session_anisha" }, 200);
});

// POST /api/v1/auth/logout - Clear or invalidate user session
authRouter.post("/logout", (req, res) => {
  return sendSuccess(res, { message: "Successfully logged out user session" }, 200);
});

// POST /api/v1/auth/forgot-password - Request a password reset verification link
authRouter.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  if (!email) return sendError(res, "Email address is required", 400);
  return sendSuccess(res, { message: `Password reset verification link dispatched to ${email}` }, 200);
});

// POST /api/v1/auth/reset-password - Complete password reset using token
authRouter.post("/reset-password", (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return sendError(res, "Token and newPassword are required fields", 400);
  return sendSuccess(res, { message: "Password reset completed successfully" }, 200);
});

// POST /api/v1/auth/change-password - Change password while authenticated
authRouter.post("/change-password", protect, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) return sendError(res, "Current and new password are required fields", 400);
  return sendSuccess(res, { message: "Password updated successfully" }, 200);
});

// POST /api/v1/auth/verify-email - Verify email address registration code
authRouter.post("/verify-email", (req, res) => {
  const { code } = req.body;
  if (!code) return sendError(res, "Verification code is required", 400);
  return sendSuccess(res, { message: "Email validation completed successfully" }, 200);
});

// POST /api/v1/auth/send-otp - Dispatch verification OTP to email
authRouter.post("/send-otp", (req, res) => {
  const { email } = req.body;
  if (!email) return sendError(res, "Email is required to dispatch OTP", 400);
  return sendSuccess(res, { message: `One-Time-Password sent to ${email} (Practice OTP Code: 49201)` }, 200);
});

// --- PATCH Routes ---

// PATCH /api/v1/auth/profile - Update user profile attributes
authRouter.patch("/profile", protect, (req, res) => {
  Object.assign(userProfile, req.body);
  return sendSuccess(res, userProfile, 200);
});

// ===========================================================================
// SECTION 2: JWT Auth Router (mounted on /api/v1/jwt)
// ===========================================================================

// --- GET Routes ---

// GET /api/v1/jwt/profile - Retrieve profile details secured under JWT middleware
jwtRouter.get("/profile", protect, (req, res) => {
  return sendSuccess(res, { scope: "jwt-profile", user: req.user }, 200);
});

// GET /api/v1/jwt/dashboard - secured general dashboard endpoint
jwtRouter.get("/dashboard", protect, (req, res) => {
  return sendSuccess(res, { message: "Welcome to your JWT-secured dashboard system." }, 200);
});

// GET /api/v1/jwt/private-games - Get games list (requires JWT)
jwtRouter.get("/private-games", protect, (req, res) => {
  return sendSuccess(res, games, 200);
});

// GET /api/v1/jwt/private-analytics - Get analytics panel data (requires admin role & JWT)
jwtRouter.get("/private-analytics", protect, authorize("admin"), (req, res) => {
  return sendSuccess(res, { secureHits: 495000, threatAlerts: 0 }, 200);
});

// --- POST Routes ---

// POST /api/v1/jwt/generate-token - Generate a JWT access token for userId
jwtRouter.post("/generate-token", (req, res) => {
  const { userId } = req.body;
  const token = "mock_jwt_token_" + (userId || "anisha_admin_user");
  return sendSuccess(res, { token, expiresIn: "24h" }, 201);
});

// POST /api/v1/jwt/verify-token - Validate validity of a JWT token
jwtRouter.post("/verify-token", (req, res) => {
  const { token } = req.body;
  if (!token) return sendError(res, "Token is required for validation", 400);
  return sendSuccess(res, { isValid: true, decoded: { id: "6650b2849b20b22a5c531d04", email: "anisha_admin@test.com" } }, 200);
});

// POST /api/v1/jwt/refresh-token - Refresh an expired access token with a refresh token
jwtRouter.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return sendError(res, "Refresh token is required", 400);
  return sendSuccess(res, { accessToken: "new_refreshed_mock_token_12345" }, 200);
});

// --- DELETE Routes ---

// DELETE /api/v1/jwt/revoke-token - Invalidate/Revoke access token (add to blacklist)
jwtRouter.delete("/revoke-token", (req, res) => {
  const { token } = req.body;
  if (!token) return sendError(res, "Token is required for revocation", 400);
  return sendSuccess(res, { message: "Token successfully added to revocation blacklist" }, 200);
});

module.exports = { authRouter, jwtRouter };
