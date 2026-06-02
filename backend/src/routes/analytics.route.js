// src/routes/analytics.route.js
// ---------------------------------------------------------------------------
// Analytics endpoints for revenue, orders, customers, products, categories, payments,
// locations, returns, and discounts.
//
// Example response shape:
//   { success: true, data: { ... } }
//
// These routes are read-only GET endpoints.
// ---------------------------------------------------------------------------
const express = require("express");
const analytics = require("../controllers/analytics.controller");

const router = express.Router();

// ── Revenue ───────────────────────────────────────────
router.get("/revenue/total",   analytics.getTotalRevenue);
router.get("/revenue/monthly", analytics.getMonthlyRevenue);
router.get("/revenue/yearly",  analytics.getYearlyRevenue);

// ── Orders ────────────────────────────────────────────
router.get("/orders/average-value", analytics.getAverageOrderValue);
router.get("/orders/count",         analytics.getOrderCount);
router.get("/orders/cancelled",     analytics.getCancelledOrders);
router.get("/orders/refunded",      analytics.getRefundedOrders);

// ── Customers ─────────────────────────────────────────
router.get("/customers/top", analytics.getTopCustomers);

// ── Products ──────────────────────────────────────────
router.get("/products/top-selling", analytics.getTopSellingProducts);
router.get("/products/low-selling", analytics.getLowSellingProducts);

// ── Categories ────────────────────────────────────────
router.get("/categories/top", analytics.getTopCategories);

// ── Payments ──────────────────────────────────────────
router.get("/payments/distribution", analytics.getPaymentDistribution);

// ── Locations ─────────────────────────────────────────
router.get("/locations/top-cities", analytics.getTopCities);

// ── Returns ───────────────────────────────────────────
router.get("/returns/rate", analytics.getReturnRate);

// ── Discounts ─────────────────────────────────────────
router.get("/discounts/usage", analytics.getDiscountUsage);

module.exports = router;
