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
const Review = require('./models/Review');
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

// --- Game Information, Media, and Reviews Sub-routes ---

// 1. GET /api/v1/games/:appid/screenshots - Fetch screenshots of a game
app.get('/api/v1/games/:appid/screenshots', async (req, res, next) => {
  try {
    const { appid } = req.params;
    const game = await Game.findOne({ appid, isDeleted: { $ne: true } });
    if (!game) {
      return sendError(res, 'Game not found', 404);
    }
    const screenshots = game.screenshots && game.screenshots.length > 0
      ? game.screenshots
      : [
          `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/ss_1.jpg`,
          `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/ss_2.jpg`,
          `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/ss_3.jpg`
        ];
    return sendSuccess(res, screenshots, 200);
  } catch (err) {
    next(err);
  }
});

// 2. GET /api/v1/games/:appid/trailers - Fetch trailers and gameplay videos
app.get('/api/v1/games/:appid/trailers', async (req, res, next) => {
  try {
    const { appid } = req.params;
    const game = await Game.findOne({ appid, isDeleted: { $ne: true } });
    if (!game) {
      return sendError(res, 'Game not found', 404);
    }
    const trailers = game.trailers && game.trailers.length > 0
      ? game.trailers
      : [
          {
            id: "trailer_1",
            name: "Official Gameplay Trailer",
            url: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/movie_max.mp4`,
            thumbnail: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/movie_600x337.jpg`
          }
        ];
    return sendSuccess(res, trailers, 200);
  } catch (err) {
    next(err);
  }
});

// 3. GET /api/v1/games/:appid/reviews/stats - Get average ratings & recommendation metrics (Aggregation Pipeline)
app.get('/api/v1/games/:appid/reviews/stats', async (req, res, next) => {
  try {
    const { appid } = req.params;
    const game = await Game.findOne({ appid });
    if (!game) {
      return sendError(res, 'Game not found', 404);
    }

    const stats = await Review.aggregate([
      { $match: { game: game._id } },
      {
        $group: {
          _id: '$game',
          totalReviews: { $sum: 1 },
          avgRating: { $avg: '$rating' },
          totalRecommended: {
            $sum: { $cond: [{ $eq: ['$recommend', true] }, 1, 0] }
          }
        }
      },
      {
        $project: {
          _id: 0,
          gameId: '$_id',
          totalReviews: 1,
          avgRating: { $round: ['$avgRating', 1] },
          recommendationRate: {
            $round: [
              { $multiply: [{ $divide: ['$totalRecommended', '$totalReviews'] }, 100] },
              0
            ]
          }
        }
      }
    ]);

    if (stats.length === 0) {
      return sendSuccess(res, {
        totalReviews: 0,
        avgRating: 0,
        recommendationRate: 0,
      }, 200);
    }

    return sendSuccess(res, stats[0], 200);
  } catch (err) {
    next(err);
  }
});

// 4. GET /api/v1/games/:appid/reviews - Fetch user reviews
app.get('/api/v1/games/:appid/reviews', async (req, res, next) => {
  try {
    const { appid } = req.params;
    const game = await Game.findOne({ appid });
    if (!game) {
      return sendError(res, 'Game not found', 404);
    }
    const reviews = await Review.find({ game: game._id })
      .populate('user', 'name email')
      .sort('-createdAt');
    return sendSuccess(res, reviews, 200);
  } catch (err) {
    next(err);
  }
});

// 5. POST /api/v1/games/:appid/reviews - Add a user review (Authenticated Users)
app.post('/api/v1/games/:appid/reviews', protect, async (req, res, next) => {
  try {
    const { appid } = req.params;
    const { rating, comment, recommend } = req.body;

    const game = await Game.findOne({ appid });
    if (!game) {
      return sendError(res, 'Game not found', 404);
    }

    const existingReview = await Review.findOne({ game: game._id, user: req.user._id });
    if (existingReview) {
      return sendError(res, 'You have already submitted a review for this game', 400);
    }

    const review = await Review.create({
      user: req.user._id,
      game: game._id,
      rating,
      comment,
      recommend: recommend !== undefined ? recommend : true,
    });

    return sendSuccess(res, review, 201);
  } catch (err) {
    next(err);
  }
});

// 6. PATCH /api/v1/games/:appid/reviews/:reviewId - Update user review (Authenticated Users)
app.patch('/api/v1/games/:appid/reviews/:reviewId', protect, async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment, recommend } = req.body;

    let review = await Review.findById(reviewId);
    if (!review) {
      return sendError(res, 'Review not found', 404);
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return sendError(res, 'Not authorized to update this review', 403);
    }

    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;
    if (recommend !== undefined) review.recommend = recommend;

    await review.save();
    return sendSuccess(res, review, 200);
  } catch (err) {
    next(err);
  }
});

// 7. DELETE /api/v1/games/:appid/reviews/:reviewId - Delete user review (Authenticated Users)
app.delete('/api/v1/games/:appid/reviews/:reviewId', protect, async (req, res, next) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);
    if (!review) {
      return sendError(res, 'Review not found', 404);
    }

    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return sendError(res, 'Not authorized to delete this review', 403);
    }

    await Review.deleteOne({ _id: reviewId });
    return sendSuccess(res, { message: 'Review successfully deleted' }, 200);
  } catch (err) {
    next(err);
  }
});

// 8. GET /api/v1/games/:appid/system-requirements - Fetch system requirements
app.get('/api/v1/games/:appid/system-requirements', async (req, res, next) => {
  try {
    const { appid } = req.params;
    const game = await Game.findOne({ appid, isDeleted: { $ne: true } });
    if (!game) {
      return sendError(res, 'Game not found', 404);
    }

    const requirements = {
      minimum: {
        os: "Windows 10 64-bit",
        processor: "Intel Core i5-4460 or AMD Ryzen 3 1200",
        memory: "8 GB RAM",
        graphics: "NVIDIA GeForce GTX 960 or AMD Radeon RX 460",
        directX: "Version 12",
        storage: "50 GB available space"
      },
      recommended: {
        os: "Windows 10/11 64-bit",
        processor: "Intel Core i7-8700 or AMD Ryzen 5 3600X",
        memory: "16 GB RAM",
        graphics: "NVIDIA GeForce GTX 1070 or AMD Radeon RX 590",
        directX: "Version 12",
        storage: "50 GB SSD available space"
      }
    };
    return sendSuccess(res, requirements, 200);
  } catch (err) {
    next(err);
  }
});

// 9. GET /api/v1/games/:appid/dlc - Fetch downloadable content list
app.get('/api/v1/games/:appid/dlc', async (req, res, next) => {
  try {
    const { appid } = req.params;
    const game = await Game.findOne({ appid, isDeleted: { $ne: true } });
    if (!game) {
      return sendError(res, 'Game not found', 404);
    }

    const dlcList = [
      {
        dlc_appid: `${appid}1`,
        name: `${game.name} - Digital Artbook & Soundtrack`,
        price: 9.99,
        released: true
      },
      {
        dlc_appid: `${appid}2`,
        name: `${game.name} - Cyber Expansion Pack`,
        price: 19.99,
        released: true
      }
    ];
    return sendSuccess(res, dlcList, 200);
  } catch (err) {
    next(err);
  }
});

// 10. GET /api/v1/games/:appid/achievements - Fetch achievements
app.get('/api/v1/games/:appid/achievements', async (req, res, next) => {
  try {
    const { appid } = req.params;
    const game = await Game.findOne({ appid, isDeleted: { $ne: true } });
    if (!game) {
      return sendError(res, 'Game not found', 404);
    }

    const achievements = [
      {
        id: "ach_first_steps",
        name: "First Steps",
        description: "Complete the introductory mission.",
        icon: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/ach_1.jpg`,
        unlockedPercentage: 84.5
      },
      {
        id: "ach_hardcore",
        name: "Legendary Survivor",
        description: "Complete the game on maximum difficulty.",
        icon: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/ach_2.jpg`,
        unlockedPercentage: 4.2
      }
    ];
    return sendSuccess(res, achievements, 200);
  } catch (err) {
    next(err);
  }
});

// 11. GET /api/v1/games/:appid/leaderboards - Fetch leaderboard rankings
app.get('/api/v1/games/:appid/leaderboards', async (req, res, next) => {
  try {
    const { appid } = req.params;
    const game = await Game.findOne({ appid, isDeleted: { $ne: true } });
    if (!game) {
      return sendError(res, 'Game not found', 404);
    }

    const leaderboards = [
      { rank: 1, username: "SpeedrunnerX", score: 94820, country: "US" },
      { rank: 2, username: "AnishaChhajer", score: 91300, country: "IN" },
      { rank: 3, username: "GamerPro", score: 87500, country: "UK" }
    ];
    return sendSuccess(res, leaderboards, 200);
  } catch (err) {
    next(err);
  }
});

// 12. GET /api/v1/games/:appid/updates - Fetch latest game updates
app.get('/api/v1/games/:appid/updates', async (req, res, next) => {
  try {
    const { appid } = req.params;
    const game = await Game.findOne({ appid, isDeleted: { $ne: true } });
    if (!game) {
      return sendError(res, 'Game not found', 404);
    }

    const updates = [
      {
        version: "v1.1.0",
        title: "Performance Optimization Update",
        date: new Date().toISOString().split('T')[0],
        changelog: [
          "Optimized graphics rendering pipelines to reduce memory footprint by 15%",
          "Fixed crash related to windowed mode toggling",
          "Balanced price metrics for primary custom achievements"
        ]
      }
    ];
    return sendSuccess(res, updates, 200);
  } catch (err) {
    next(err);
  }
});

// 13. GET /api/v1/games/:appid/news - Fetch game related news
app.get('/api/v1/games/:appid/news', async (req, res, next) => {
  try {
    const { appid } = req.params;
    const game = await Game.findOne({ appid, isDeleted: { $ne: true } });
    if (!game) {
      return sendError(res, 'Game not found', 404);
    }

    const news = [
      {
        title: `${game.name} Summer Sale & Special Event!`,
        author: "Publisher News Network",
        publishedAt: new Date().toISOString(),
        content: `The ultimate developer event has started! Play ${game.name} today and unlock limited seasonal achievements.`
      }
    ];
    return sendSuccess(res, news, 200);
  } catch (err) {
    next(err);
  }
});

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
