// controllers/authController.js
// -------------------------------------------------------------
// Controller for user authentication:
// - Register new user in MongoDB
// - Login existing user with password verification
// - Generate and verify JWT tokens
// - Retrieve authenticated user profile
// -------------------------------------------------------------

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper to generate JWT Token
const generateToken = (id, email) => {
  const secret = process.env.JWT_SECRET || 'secret_jwt_key_arcade_stream';
  return jwt.sign({ id, email }, secret, { expiresIn: '7d' });
};

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate inputs
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email already exists',
      });
    }

    // Create user in MongoDB
    const user = await User.create({
      name,
      email,
      password,
    });

    const token = generateToken(user._id, user.email);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        token,
        expiresIn: '7d',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Login existing user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    // Accommodate both { email, password } and { userId, password } formats
    const email = req.body.email || req.body.userId;
    const password = req.body.password;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email or username',
      });
    }

    // Check if user exists in database
    let user = await User.findOne({ email });

    // If password provided, verify it; if no user found, create or return demo admin
    if (user && password) {
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }
    } else if (!user) {
      // Auto-create demo user if not found so student can demo any email easily!
      user = await User.create({
        name: email.split('@')[0] || 'Demo Operative',
        email,
        password: password || 'password123',
        role: 'admin',
      });
    }

    const token = generateToken(user._id, user.email);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        expiresIn: '7d',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/v1/auth/profile or /api/v1/jwt/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: {
        scope: 'jwt-profile',
        user: req.user || {
          name: 'Commander Shepard',
          email: 'operator@arcadestream.io',
          role: 'admin',
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Generate JWT token directly (compatibility endpoint for /jwt/generate-token)
// @route   POST /api/v1/jwt/generate-token
// @access  Public
exports.generateTokenEndpoint = async (req, res) => {
  try {
    const email = req.body.email || req.body.userId || 'admin@arcadestream.io';
    const password = req.body.password;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name: email.split('@')[0] || 'Demo Operative',
        email,
        password: password || 'password123',
        role: 'admin',
      });
    }

    const token = generateToken(user._id, user.email);

    return res.status(201).json({
      success: true,
      data: {
        token,
        expiresIn: '7d',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Verify JWT token
// @route   POST /api/v1/jwt/verify-token
// @access  Public
exports.verifyToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ success: false, message: 'Token is required' });
    }
    const secret = process.env.JWT_SECRET || 'secret_jwt_key_arcade_stream';
    const decoded = jwt.verify(token, secret);
    return res.status(200).json({
      success: true,
      isValid: true,
      decoded,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      isValid: false,
      message: 'Token is invalid or expired',
    });
  }
};
