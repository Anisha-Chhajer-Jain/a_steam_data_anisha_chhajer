// config/db.js
// -------------------------------------------------------------
// MongoDB database connection using Mongoose.
// Simple, clean, and beginner-friendly.
// -------------------------------------------------------------

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/steam_games';
    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Don't crash immediately in development so server can still serve mock data if needed
  }
};

module.exports = connectDB;
