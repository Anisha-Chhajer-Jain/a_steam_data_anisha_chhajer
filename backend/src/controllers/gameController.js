const Game = require('../models/Game');

// @desc    Get all games
// @route   GET /api/v1/games
// @access  Public
exports.getGames = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    // Build query
    let queryArgs = {};
    
    // Filtering
    if (req.query.genre) {
      queryArgs.genres = { $in: [new RegExp(req.query.genre, 'i')] };
    }
    if (req.query.developer) {
      queryArgs.developer = new RegExp(req.query.developer, 'i');
    }
    if (req.query.publisher) {
      queryArgs.publisher = new RegExp(req.query.publisher, 'i');
    }

    let query = Game.find(queryArgs);

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt'); // default sort
    }

    // Pagination
    query = query.skip(startIndex).limit(limit);

    const games = await query;
    const total = await Game.countDocuments(queryArgs);

    res.status(200).json({
      success: true,
      count: games.length,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      data: games
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single game
// @route   GET /api/v1/games/:appid
// @access  Public
exports.getGame = async (req, res, next) => {
  try {
    const game = await Game.findOne({ appid: req.params.appid });

    if (!game) {
      return res.status(404).json({ success: false, message: 'Game not found' });
    }

    res.status(200).json({ success: true, data: game });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new game
// @route   POST /api/v1/games
// @access  Private
exports.createGame = async (req, res, next) => {
  try {
    const game = await Game.create(req.body);
    res.status(201).json({ success: true, data: game });
  } catch (error) {
    next(error);
  }
};

// @desc    Update game
// @route   PATCH /api/v1/games/:appid
// @access  Private
exports.updateGame = async (req, res, next) => {
  try {
    const game = await Game.findOneAndUpdate(
      { appid: req.params.appid },
      req.body,
      { new: true, runValidators: true }
    );

    if (!game) {
      return res.status(404).json({ success: false, message: 'Game not found' });
    }

    res.status(200).json({ success: true, data: game });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete game
// @route   DELETE /api/v1/games/:appid
// @access  Private
exports.deleteGame = async (req, res, next) => {
  try {
    const game = await Game.findOneAndDelete({ appid: req.params.appid });

    if (!game) {
      return res.status(404).json({ success: false, message: 'Game not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
