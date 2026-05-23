/**
 * Standardized API Response Helper
 */

/**
 * Send a success response
 * @param {Object} res - Express response object
 * @param {Any} data - Main data payload
 * @param {Number} statusCode - HTTP status code (default: 200)
 * @param {Object} pagination - Optional pagination metadata
 */
exports.sendSuccess = (res, data = null, statusCode = 200, pagination = null) => {
  const response = {
    success: true,
  };

  if (data !== null) {
    response.data = data;
  }

  if (pagination !== null) {
    response.pagination = pagination;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send an error response
 * @param {Object} res - Express response object
 * @param {String} message - Error message
 * @param {Number} statusCode - HTTP status code (default: 500)
 * @param {Any} errors - Optional detailed error breakdown
 */
exports.sendError = (res, message = 'Internal Server Error', statusCode = 500, errors = null) => {
  const response = {
    success: false,
    message,
  };

  if (errors !== null) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};
