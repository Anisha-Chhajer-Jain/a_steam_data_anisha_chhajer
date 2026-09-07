// routes/analyticsRoutes.js
// -------------------------------------------------------------
// REST API routes for Analytics and Dashboard statistics.
// -------------------------------------------------------------

const express = require('express');
const router = express.Router();

const {
  getOverview,
  getOrdersCount,
  getTotalRevenue,
  getTopCategories,
  getPaymentDistribution,
} = require('../controllers/analyticsController');

// Complete overview
router.get('/', getOverview);
router.get('/overview', getOverview);

// Individual metric endpoints
router.get('/orders/count', getOrdersCount);
router.get('/revenue/total', getTotalRevenue);
router.get('/categories/top', getTopCategories);
router.get('/payments/distribution', getPaymentDistribution);

module.exports = router;
