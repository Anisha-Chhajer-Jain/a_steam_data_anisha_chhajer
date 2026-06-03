// src/routes/analytics.route.js
// ---------------------------------------------------------------------------
// Analytics routes for business and transactional reporting.
//
// These endpoints query aggregation pipelines and metrics on database models.
// ---------------------------------------------------------------------------

const express = require("express");
const analytics = require("../controllers/analytics.controller");

const router = express.Router();

// ==========================================
// 1. GET Routes (Analytics Reports)
// ==========================================

// --- Revenue Reports ---

// GET /api/v1/analytics/revenue/total - Get lifetime total revenue
router.get("/revenue/total", analytics.getTotalRevenue);

// GET /api/v1/analytics/revenue/monthly - Get monthly revenue breakdown
router.get("/revenue/monthly", analytics.getMonthlyRevenue);

// GET /api/v1/analytics/revenue/yearly - Get yearly revenue breakdown
router.get("/revenue/yearly", analytics.getYearlyRevenue);

// --- Order Metrics ---

// GET /api/v1/analytics/orders/average-value - Get average order value (AOV)
router.get("/orders/average-value", analytics.getAverageOrderValue);

// GET /api/v1/analytics/orders/count - Get total orders count
router.get("/orders/count", analytics.getOrderCount);

// GET /api/v1/analytics/orders/cancelled - Get total cancelled orders count
router.get("/orders/cancelled", analytics.getCancelledOrders);

// GET /api/v1/analytics/orders/refunded - Get total refunded orders count
router.get("/orders/refunded", analytics.getRefundedOrders);

// --- Customers & Products ---

// GET /api/v1/analytics/customers/top - Get top customers by spend/orders
router.get("/customers/top", analytics.getTopCustomers);

// GET /api/v1/analytics/products/top-selling - Get top selling products list
router.get("/products/top-selling", analytics.getTopSellingProducts);

// GET /api/v1/analytics/products/low-selling - Get low performing products list
router.get("/products/low-selling", analytics.getLowSellingProducts);

// --- Category & Payment split ---

// GET /api/v1/analytics/categories/top - Get top product categories
router.get("/categories/top", analytics.getTopCategories);

// GET /api/v1/analytics/payments/distribution - Get payment method breakdown
router.get("/payments/distribution", analytics.getPaymentDistribution);

// --- Location & Logistics ---

// GET /api/v1/analytics/locations/top-cities - Get top order volumes by city
router.get("/locations/top-cities", analytics.getTopCities);

// GET /api/v1/analytics/returns/rate - Get product return rates
router.get("/returns/rate", analytics.getReturnRate);

// --- Promotions ---

// GET /api/v1/analytics/discounts/usage - Get discount coupon performance stats
router.get("/discounts/usage", analytics.getDiscountUsage);

module.exports = router;
