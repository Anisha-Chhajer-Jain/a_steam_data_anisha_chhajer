const User = require('../models/User');
const generateToken = require('../utils/generateToken');

/**
 * Service to handle User database operations and business logic
 */
class UserService {
  /**
   * Register a new user
   * @param {Object} userData - User information
   */
  async registerUser(userData) {
    const { name, email, password, role } = userData;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      const error = new Error('User already exists with this email');
      error.statusCode = 400;
      throw error;
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user',
    });

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    };
  }

  /**
   * Login an existing user
   * @param {String} email - User email
   * @param {String} password - Plain text password
   */
  async loginUser(email, password) {
    if (!email || !password) {
      const error = new Error('Please provide both email and password');
      error.statusCode = 400;
      throw error;
    }

    // Find user and select password field explicitly
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    // Check password match
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    };
  }

  /**
   * Fetch user profile by ID
   * @param {String} userId - Database ID of user
   */
  async getUserProfile(userId) {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    return user;
  }
}

module.exports = new UserService();
