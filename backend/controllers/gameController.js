// controllers/gameController.js
// -------------------------------------------------------------
// Controller for Games:
// - List games with filtering, searching, sorting, and pagination
// - Fetch single game by appid
// - Create new game in MongoDB
// - Update existing game
// - Delete game from MongoDB
// -------------------------------------------------------------

const Game = require('../models/Game');

// @desc    Get all games (with filters, search, sort, pagination)
// @route   GET /api/v1/games
// @access  Public
exports.getGames = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      q,
      genre,
      rating,
      minRating,
      maxPrice,
      platform,
      year,
      sort = 'popularity',
    } = req.query;

    const query = { isDeleted: false };

    // 1. Search by name or developer
    const searchTerm = search || q;
    if (searchTerm && searchTerm.trim() !== '') {
      query.$or = [
        { name: { $regex: searchTerm.trim(), $options: 'i' } },
        { developer: { $regex: searchTerm.trim(), $options: 'i' } },
        { publisher: { $regex: searchTerm.trim(), $options: 'i' } },
      ];
    }

    // 2. Filter by Genre
    if (genre && genre !== 'All Genres' && genre.trim() !== '') {
      query.genres = { $regex: new RegExp(genre.trim(), 'i') };
    }

    // 3. Filter by Platform
    if (platform && platform.trim() !== '') {
      query.platforms = { $regex: new RegExp(platform.trim(), 'i') };
    }

    // 4. Filter by Rating (handles '4.5+', '4.0+', or numeric minRating)
    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    } else if (rating && rating !== 'All Ratings') {
      const match = rating.match(/([0-9.]+)/);
      if (match) {
        query.rating = { $gte: parseFloat(match[1]) };
      }
    }

    // 5. Filter by Price
    if (maxPrice !== undefined && maxPrice !== '') {
      query.price = { $lte: parseFloat(maxPrice) };
    }

    // 6. Filter by Release Year
    if (year && year !== 'Release Year') {
      if (year === 'Before 2020') {
        query.release_year = { $lt: 2020 };
      } else {
        const numYear = parseInt(year, 10);
        if (!isNaN(numYear)) {
          query.release_year = numYear;
        }
      }
    }

    // 7. Sorting
    let sortOption = { createdAt: -1 };
    switch (sort) {
      case 'popularity':
      case 'trending':
        sortOption = { recommendations: -1, rating: -1 };
        break;
      case 'rating':
      case 'top-rated':
        sortOption = { rating: -1 };
        break;
      case 'price':
        sortOption = { price: 1 };
        break;
      case 'price-desc':
        sortOption = { price: -1 };
        break;
      case 'releaseDate':
      case 'release_date':
      case 'new-releases':
        sortOption = { release_year: -1, createdAt: -1 };
        break;
      case 'title':
        sortOption = { name: 1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const pageNumber = Math.max(1, parseInt(page, 10));
    const limitNumber = Math.max(1, parseInt(limit, 10));
    const skip = (pageNumber - 1) * limitNumber;

    const total = await Game.countDocuments(query);
    const games = await Game.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);

    const pages = Math.ceil(total / limitNumber) || 1;

    return res.status(200).json({
      success: true,
      data: games,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        pages,
      },
      meta: {
        page: pageNumber,
        limit: limitNumber,
        total,
        pages,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get a single game by App ID
// @route   GET /api/v1/games/:appid
// @access  Public
exports.getGameById = async (req, res) => {
  try {
    const { appid } = req.params;

    // Search by appid or by MongoDB _id
    const game = await Game.findOne({
      $or: [{ appid }, { _id: appid.match(/^[0-9a-fA-F]{24}$/) ? appid : null }],
      isDeleted: false,
    });

    if (!game) {
      return res.status(404).json({
        success: false,
        message: `Game with id '${appid}' not found`,
      });
    }

    return res.status(200).json({
      success: true,
      data: game,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create a new game
// @route   POST /api/v1/games
// @access  Private (Admin)
exports.createGame = async (req, res) => {
  try {
    const {
      appid,
      name,
      price = 0,
      rating = 7.5,
      release_date,
      release_year,
      genres = ['Action'],
      categories = ['Single-player'],
      platforms = ['windows'],
      developer = 'Arcade Studio',
      publisher = 'Arcade Stream',
    } = req.body;

    // Generate unique appid if not provided
    const finalAppid = appid ? String(appid).trim() : String(Date.now());

    // Check if appid exists
    const existing = await Game.findOne({ appid: finalAppid });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `Game with App ID '${finalAppid}' already exists`,
      });
    }

    const year = release_year
      ? parseInt(release_year, 10)
      : release_date
      ? new Date(release_date).getFullYear()
      : new Date().getFullYear();

    const newGame = await Game.create({
      appid: finalAppid,
      name,
      price: parseFloat(price) || 0,
      rating: parseFloat(rating) || 7.5,
      release_date: release_date || new Date().toDateString(),
      release_year: isNaN(year) ? 2024 : year,
      genres: Array.isArray(genres) ? genres : [genres],
      categories: Array.isArray(categories) ? categories : [categories],
      platforms: Array.isArray(platforms) ? platforms : [platforms],
      developer,
      publisher,
    });

    return res.status(201).json({
      success: true,
      message: 'Game created successfully',
      data: newGame,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update an existing game
// @route   PUT /api/v1/games/:appid or PATCH /api/v1/games/:appid
// @access  Private (Admin)
exports.updateGame = async (req, res) => {
  try {
    const { appid } = req.params;

    const game = await Game.findOneAndUpdate(
      { $or: [{ appid }, { _id: appid.match(/^[0-9a-fA-F]{24}$/) ? appid : null }] },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Game updated successfully',
      data: game,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete a game (hard delete or soft delete)
// @route   DELETE /api/v1/games/:appid
// @access  Private (Admin)
exports.deleteGame = async (req, res) => {
  try {
    const { appid } = req.params;

    const game = await Game.findOneAndDelete({
      $or: [{ appid }, { _id: appid.match(/^[0-9a-fA-F]{24}$/) ? appid : null }],
    });

    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Game deleted successfully',
      data: { appid },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
