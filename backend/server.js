// server.js
// -------------------------------------------------------------
// Main entry point for the Node.js + Express backend server.
// Clean, readable, and beginner-friendly structure.
// -------------------------------------------------------------

require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Database connection
const connectDB = require('./config/db');

// Route handlers
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

// Error handling middleware
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

// 1. Connect to MongoDB Atlas
connectDB();

// 2. Global Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. API Routes Mount
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jwt', authRoutes);
app.use('/api/v1/games', gameRoutes);
app.use('/api/v1/search', gameRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/dashboard', analyticsRoutes);

// Base route for health check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Arcade Stream Pro API is up and running!',
    version: '1.0.0',
  });
});

// 4. Centralized Error Handler
app.use(errorHandler);

// 5. Start listening on configured port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

module.exports = app;
