/**
 * Custom Request Logging Middleware
 * Logs method, URL, response status, duration, and timestamp.
 */
const loggerMiddleware = (req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  // Log on response completion
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${timestamp}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`
    );
  });

  next();
};

module.exports = loggerMiddleware;
