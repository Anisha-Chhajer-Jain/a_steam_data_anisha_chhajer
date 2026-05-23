require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

const connectDB = require('./config/db');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');
const { sendSuccess } = require('./utils/responseHandler');

// Connect to MongoDB
connectDB();

const app = express();

// 1. Basic Rate Limiting (Good to Have item #8)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

// 2. Global Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Logging Middleware (Good to Have item #2)
app.use(loggerMiddleware);

// 3. Health Check API (Good to Have item #15)
app.get('/api/v1/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  return sendSuccess(res, {
    status: 'healthy',
    database: dbStatus,
    timestamp: new Date().toISOString(),
  }, 200);
});

// 4. API Routes
const gameRoutes = require('./routes/gameRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

app.use('/api/v1/games', gameRoutes);
app.use('/api/v1/auth', userRoutes);

// Nest reviews sub-router under games
app.use('/api/v1/games/:appid/reviews', reviewRoutes);

// Base route
app.get('/', (req, res) => {
  return sendSuccess(res, { message: 'Welcome to Steam Games API v1' }, 200);
});

// 5. Centralized Error Handler Middleware (Good to Have item #3 & core error handling system)
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
