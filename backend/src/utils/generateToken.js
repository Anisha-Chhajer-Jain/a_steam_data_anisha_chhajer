const jwt = require('jsonwebtoken');

/**
 * Generate a JWT token signed with the user's ID
 * @param {String} id - User's database ID
 * @returns {String} Signed JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_key_12345', {
    expiresIn: '30d',
  });
};

module.exports = generateToken;
