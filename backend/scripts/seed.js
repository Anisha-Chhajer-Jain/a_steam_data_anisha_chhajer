const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Game = require('../src/models/Game');
const connectDB = require('../src/config/db');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

// Connect to DB
connectDB();

// Read JSON files
const games = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/games.json'), 'utf-8')
);

// Format and parse data before insertion
const formattedGames = games.map((game) => {
  return {
    appid: game.appid,
    name: game.name,
    release_year: game.release_year ? parseInt(game.release_year, 10) : null,
    release_date: game.release_date,
    genres: game.genres ? game.genres.split(';') : [],
    categories: game.categories ? game.categories.split(';') : [],
    price: game.price ? parseFloat(game.price) : 0,
    recommendations: game.recommendations ? parseInt(game.recommendations, 10) : 0,
    developer: game.developer,
    publisher: game.publisher,
  };
});

// Import into DB
const importData = async () => {
  try {
    await Game.deleteMany();
    await Game.insertMany(formattedGames);
    console.log('Data Imported successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Game.deleteMany();
    console.log('Data Destroyed successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}
