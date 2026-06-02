require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { connectDB, isDbConnected } = require('./config/db');

const loggerMiddleware = require('./middleware/loggerMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');
const { sendSuccess } = require('./utils/responseHandler');

const app = express();

const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    if (!isDbConnected()) {
      console.warn('Warning: MongoDB is not connected. Database-backed routes will fail until MongoDB is available.');
    }
  });
};

startServer();

// 1. Basic Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// 2. Global Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Logging Middleware
app.use(loggerMiddleware);

// 3. Modular Routes (order-safe fall-through sequence)

// A. Search Route (e.g. /api/v1/search/games?q=elden)
app.use("/api/v1/search", require("./routes/gameSearch.route"));

// B. Specific filter, pagination, and sort routes
app.use("/api/v1/games/filter", require("./routes/gameFilter.route"));
app.use("/api/v1/games/paginate", require("./routes/gamePagination.route"));
app.use("/api/v1/games/sort", require("./routes/gameSort.route"));

// C. Analytics routes (Mongoose database-backed, CommonJS)
app.use("/api/v1/analytics", require("./routes/analytics.route"));

// D. Auth & JWT routes (/api/v1/auth/... and /api/v1/jwt/...)
const { authRouter, jwtRouter } = require("./routes/auth.route");
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jwt", jwtRouter);

// E. Middleware practice and admin/protected routes
const { middlewareRouter, adminRouter, protectedRouter } = require("./routes/middleware.route");
app.use("/api/v1/middleware", middlewareRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/protected", protectedRouter);

// F. Advanced, notifications, and miscellaneous utility routes
app.use("/api/v1", require("./routes/advanced.route"));

// G. Parameterized and dynamic CRUD routes (gameParam contains /genre/:genre etc.)
app.use("/api/v1/games", require("./routes/gameParam.route"));
app.use("/api/v1/games/:appid", require("./routes/gameInfo.route"));
app.use("/api/v1/games", require("./routes/game.route"));

// 4. Wildcard HEAD and OPTIONS Handlers (Fulfills Good to Have Routes dynamically)
app.head('/*path', (req, res) => {
  res.set({
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    'Allow': 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
    'X-API-Version': '1.0.0',
    'X-Author': 'Anisha Chhajer'
  });
  return res.status(200).end();
});

app.options('/*path', (req, res) => {
  res.set({
    'Allow': 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400'
  });
  return res.status(200).end();
});

// Base route
app.get('/', (req, res) => {
  return sendSuccess(res, { message: 'Welcome to Steam Games API v1' }, 200);
});

// 5. Centralized Error Handler Middleware
app.use(errorMiddleware);
