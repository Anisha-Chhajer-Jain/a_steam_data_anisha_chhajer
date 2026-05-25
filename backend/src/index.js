require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

const connectDB = require('./config/db');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');
const { sendSuccess, sendError } = require('./utils/responseHandler');
const Game = require('./models/Game');
const { protect, authorize } = require('./middleware/authMiddleware');

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
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

app.use('/api/v1/auth', userRoutes);

// --- Steam Games Direct CRUD & Utility Routes ---

// 1. GET /api/v1/games - Fetch all Steam games with pagination support
app.get('/api/v1/games', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const filter = { isDeleted: { $ne: true } };

    if (req.query.q) {
      filter.name = { $regex: req.query.q, $options: 'i' };
    }
    if (req.query.genre) {
      filter.genres = { $in: [new RegExp(req.query.genre, 'i')] };
    }
    if (req.query.developer) {
      filter.developer = { $regex: req.query.developer, $options: 'i' };
    }
    if (req.query.publisher) {
      filter.publisher = { $regex: req.query.publisher, $options: 'i' };
    }
    if (req.query.release_year) {
      filter.release_year = parseInt(req.query.release_year, 10);
    }
    if (req.query.price_min || req.query.price_max) {
      filter.price = {};
      if (req.query.price_min) {
        filter.price.$gte = parseFloat(req.query.price_min);
      }
      if (req.query.price_max) {
        filter.price.$lte = parseFloat(req.query.price_max);
      }
    }

    let selectFields = '';
    if (req.query.fields) {
      selectFields = req.query.fields.split(',').join(' ');
    }

    let sortQuery = '-createdAt';
    if (req.query.sort) {
      sortQuery = req.query.sort.split(',').join(' ');
    }

    const games = await Game.find(filter)
      .select(selectFields)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit);

    const total = await Game.countDocuments(filter);

    return sendSuccess(res, games, 200, {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    next(err);
  }
});

// 2. GET /api/v1/games/exists/:appid - Check whether game exists
app.get('/api/v1/games/exists/:appid', async (req, res, next) => {
  try {
    const { appid } = req.params;
    const exists = await Game.exists({ appid });
    return sendSuccess(res, { exists: !!exists }, 200);
  } catch (err) {
    next(err);
  }
});

// 3. GET /api/v1/games/:appid/summary - Get summarized details of a game
app.get('/api/v1/games/:appid/summary', async (req, res, next) => {
  try {
    const { appid } = req.params;
    const game = await Game.findOne({ appid, isDeleted: { $ne: true } })
      .select('appid name price genres developer publisher');
    if (!game) {
      return sendError(res, 'Game not found', 404);
    }
    return sendSuccess(res, game, 200);
  } catch (err) {
    next(err);
  }
});

// 4. GET /api/v1/games/:appid/history - Retrieve update history of a game
app.get('/api/v1/games/:appid/history', async (req, res, next) => {
  try {
    const { appid } = req.params;
    const game = await Game.findOne({ appid });
    if (!game) {
      return sendError(res, 'Game not found', 404);
    }
    return sendSuccess(res, game.history || [], 200);
  } catch (err) {
    next(err);
  }
});

// 5. GET /api/v1/games/:appid/related - Fetch related game recommendations
app.get('/api/v1/games/:appid/related', async (req, res, next) => {
  try {
    const { appid } = req.params;
    const game = await Game.findOne({ appid, isDeleted: { $ne: true } });
    if (!game) {
      return sendError(res, 'Game not found', 404);
    }

    const relatedGames = await Game.find({
      appid: { $ne: appid },
      isDeleted: { $ne: true },
      genres: { $in: game.genres || [] }
    })
    .limit(5)
    .sort({ recommendations: -1 });

    return sendSuccess(res, relatedGames, 200);
  } catch (err) {
    next(err);
  }
});

// 6. PATCH /api/v1/games/:appid/archive - Archive a game entry (soft-delete)
app.patch('/api/v1/games/:appid/archive', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { appid } = req.params;
    const game = await Game.findOneAndUpdate(
      { appid, isDeleted: { $ne: true } },
      { isDeleted: true },
      { new: true }
    );
    if (!game) {
      return sendError(res, 'Game not found or already archived', 404);
    }
    return sendSuccess(res, game, 200);
  } catch (err) {
    next(err);
  }
});

// 7. PATCH /api/v1/games/:appid/restore - Restore archived game
app.patch('/api/v1/games/:appid/restore', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { appid } = req.params;
    const game = await Game.findOneAndUpdate(
      { appid, isDeleted: true },
      { isDeleted: false },
      { new: true }
    );
    if (!game) {
      return sendError(res, 'Archived game not found', 404);
    }
    return sendSuccess(res, game, 200);
  } catch (err) {
    next(err);
  }
});

// 8. GET /api/v1/games/:appid - Fetch complete details of a specific game
app.get('/api/v1/games/:appid', async (req, res, next) => {
  try {
    const { appid } = req.params;
    const game = await Game.findOne({ appid, isDeleted: { $ne: true } });
    if (!game) {
      return sendError(res, 'Game not found', 404);
    }
    return sendSuccess(res, game, 200);
  } catch (err) {
    next(err);
  }
});

// 9. POST /api/v1/games - Create a new game entry
app.post('/api/v1/games', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { appid } = req.body;
    if (!appid) {
      return sendError(res, 'appid is required', 400);
    }
    const existingGame = await Game.findOne({ appid });
    if (existingGame) {
      return sendError(res, `Game with appid '${appid}' already exists`, 400);
    }
    const game = await Game.create(req.body);
    return sendSuccess(res, game, 201);
  } catch (err) {
    next(err);
  }
});

// 10. PUT /api/v1/games/:appid - Replace entire game record
app.put('/api/v1/games/:appid', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { appid } = req.params;
    const gameData = { ...req.body, appid };
    let game = await Game.findOne({ appid });

    if (game) {
      const historyEntry = {
        action: 'PUT',
        updatedAt: new Date(),
        changes: req.body
      };
      gameData.history = [...(game.history || []), historyEntry];

      game = await Game.findOneAndReplace({ appid }, gameData, { new: true, runValidators: true });
      return sendSuccess(res, game, 200);
    } else {
      game = await Game.create(gameData);
      return sendSuccess(res, game, 201);
    }
  } catch (err) {
    next(err);
  }
});

// 11. PATCH /api/v1/games/:appid - Partially update game details
app.patch('/api/v1/games/:appid', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { appid } = req.params;
    const updateData = { ...req.body };
    delete updateData.appid;

    const game = await Game.findOne({ appid, isDeleted: { $ne: true } });
    if (!game) {
      return sendError(res, 'Game not found', 404);
    }

    const historyEntry = {
      action: 'PATCH',
      updatedAt: new Date(),
      changes: req.body
    };

    const updatedGame = await Game.findOneAndUpdate(
      { appid, isDeleted: { $ne: true } },
      {
        $set: updateData,
        $push: { history: historyEntry }
      },
      { new: true, runValidators: true }
    );

    return sendSuccess(res, updatedGame, 200);
  } catch (err) {
    next(err);
  }
});

// 12. DELETE /api/v1/games/:appid - Permanently delete a game
app.delete('/api/v1/games/:appid', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { appid } = req.params;
    const result = await Game.deleteOne({ appid });
    if (result.deletedCount === 0) {
      return sendError(res, 'Game not found', 404);
    }
    return sendSuccess(res, { message: 'Game permanently deleted' }, 200);
  } catch (err) {
    next(err);
  }
});

// --- Nest reviews sub-router under games ---
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
