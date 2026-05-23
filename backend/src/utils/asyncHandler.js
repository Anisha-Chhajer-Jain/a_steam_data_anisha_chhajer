/**
 * A wrapper function for Express async route handlers to catch unresolved promises
 * and automatically forward them to the global error handler middleware.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
