const Game = require('../models/Game');

/**
 * Service to handle Game database operations and business logic
 */
class GameService {
  /**
   * Fetch all games with advanced filtering, sorting, pagination, and search
   * @param {Object} queryParams - Raw request query parameters
   */
  async getAllGames(queryParams) {
    const page = parseInt(queryParams.page, 10) || 1;
    const limit = parseInt(queryParams.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // 1. Build MongoDB Filters (operators: $gte, $lte, $in, $regex)
    const filter = { isDeleted: { $ne: true } };

    // Text Search on Game Name (Regex case-insensitive)
    if (queryParams.q) {
      filter.name = { $regex: queryParams.q, $options: 'i' };
    }

    // Genre Filtering (Supports semicolon-separated or array in dataset)
    if (queryParams.genre) {
      filter.genres = { $in: [new RegExp(queryParams.genre, 'i')] };
    }

    // Developer / Publisher Regex Filtering
    if (queryParams.developer) {
      filter.developer = { $regex: queryParams.developer, $options: 'i' };
    }
    if (queryParams.publisher) {
      filter.publisher = { $regex: queryParams.publisher, $options: 'i' };
    }

    // Release Year Filtering
    if (queryParams.release_year) {
      filter.release_year = parseInt(queryParams.release_year, 10);
    }

    // Price Filtering (using operators $gte and $lte)
    if (queryParams.price_min || queryParams.price_max) {
      filter.price = {};
      if (queryParams.price_min) {
        filter.price.$gte = parseFloat(queryParams.price_min);
      }
      if (queryParams.price_max) {
        filter.price.$lte = parseFloat(queryParams.price_max);
      }
    }

    // 2. Projection (field selection)
    let selectFields = '';
    if (queryParams.fields) {
      selectFields = queryParams.fields.split(',').join(' ');
    }

    // 3. Sorting
    let sortQuery = '-createdAt'; // Default sort
    if (queryParams.sort) {
      sortQuery = queryParams.sort.split(',').join(' ');
    }

    // 4. Execute Query
    const games = await Game.find(filter)
      .select(selectFields)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit);

    const total = await Game.countDocuments(filter);

    return {
      games,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get a single game by its appid
   * @param {String} appid - Steam app ID
   */
  async getGameByAppId(appid) {
    const game = await Game.findOne({ appid, isDeleted: { $ne: true } });
    if (!game) {
      const error = new Error('Game not found');
      error.statusCode = 404;
      throw error;
    }
    return game;
  }

  /**
   * Create a new game in the database
   * @param {Object} gameData - New game information
   */
  async createNewGame(gameData) {
    const { appid } = gameData;

    // Check if game appid already exists
    const gameExists = await Game.findOne({ appid, isDeleted: { $ne: true } });
    if (gameExists) {
      const error = new Error(`Game with appid '${appid}' already exists`);
      error.statusCode = 400;
      throw error;
    }

    const game = await Game.create(gameData);
    return game;
  }

  /**
   * Update a game details in the database
   * @param {String} appid - Steam app ID
   * @param {Object} updateData - Key/value pairs to update
   */
  async updateGameByAppId(appid, updateData) {
    // Avoid changing appid during update
    delete updateData.appid;

    const game = await Game.findOneAndUpdate(
      { appid, isDeleted: { $ne: true } },
      updateData,
      { new: true, runValidators: true }
    );

    if (!game) {
      const error = new Error('Game not found');
      error.statusCode = 404;
      throw error;
    }

    return game;
  }

  /**
   * Delete a game from the database
   * @param {String} appid - Steam app ID
   */
  async deleteGameByAppId(appid) {
    const game = await Game.findOneAndUpdate(
      { appid, isDeleted: { $ne: true } },
      { isDeleted: true },
      { new: true }
    );
    if (!game) {
      const error = new Error('Game not found');
      error.statusCode = 404;
      throw error;
    }
    return game;
  }
}

module.exports = new GameService();
