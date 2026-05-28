import express from "express";
import * as analytics from "../controllers/analytics.controller.mjs";

const router = express.Router();

router.get("/revenue/total", analytics.getTotalRevenue);
router.get("/revenue/monthly", analytics.getMonthlyRevenue);
router.get("/revenue/yearly", analytics.getYearlyRevenue);

router.get("/orders/average-value", analytics.getAverageOrderValue);
router.get("/orders/count", analytics.getOrderCount);
router.get("/orders/cancelled", analytics.getCancelledOrders);
router.get("/orders/refunded", analytics.getRefundedOrders);

router.get("/customers/top", analytics.getTopCustomers);

router.get("/products/top-selling", analytics.getTopSellingProducts);
router.get("/products/low-selling", analytics.getLowSellingProducts);

router.get("/categories/top", analytics.getTopCategories);

router.get("/payments/distribution", analytics.getPaymentDistribution);

router.get("/locations/top-cities", analytics.getTopCities);

router.get("/returns/rate", analytics.getReturnRate);

router.get("/discounts/usage", analytics.getDiscountUsage);

export default router;
