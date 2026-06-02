const mongoose = require('mongoose');

let dbConnected = false;

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/steam_games';
  const maxRetries = 5;
  const retryDelayMs = 2000;

  if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI is not defined. Falling back to local MongoDB at mongodb://127.0.0.1:27017/steam_games');
  }

  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    try {
      const conn = await mongoose.connect(mongoUri);
      dbConnected = true;
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return true;
    } catch (error) {
      console.error(`MongoDB connection attempt ${attempt}/${maxRetries} failed.`);
      console.error(`Error: ${error.message}`);
      if (attempt < maxRetries) {
        console.log(`Retrying MongoDB connection in ${retryDelayMs / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
      }
    }
  }

  console.error('MongoDB connection failed after multiple attempts. The server will continue running, but database-backed routes will not work until MongoDB is available.');
  return false;
};

const isDbConnected = () => dbConnected;

module.exports = { connectDB, isDbConnected };
