const { sendError } = require('../utils/responseHandler');

/**
 * Global centralized error handling middleware
 */
const errorMiddleware = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error stack for debugging
  console.error(err);

  // Mongoose Bad ObjectId (Cast Error)
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    return sendError(res, message, 404);
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `Duplicate field value entered: '${field}'. That ${field} already exists.`;
    return sendError(res, message, 409);
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message).join(', ');
    return sendError(res, message, 400);
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    return sendError(res, 'Not authorized, token failed', 401);
  }

  if (err.name === 'TokenExpiredError') {
    return sendError(res, 'Not authorized, token expired', 401);
  }

  // General Server Error
  return sendError(res, error.message || 'Server Error', error.statusCode || 500);
};

module.exports = errorMiddleware;
