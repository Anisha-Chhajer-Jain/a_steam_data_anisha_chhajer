const Order = require("../models/order.model");
const Payment = require("../models/payment.model");

/**
 * =========================
 * REVENUE (Order + Payment)
 * =========================
 */

// Total Revenue → Payment (more accurate)
const getTotalRevenue = async (req, res) => {
  try {
    const data = await Payment.aggregate([
      { $match: { PaymentStatus: "Paid" } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$TotalAmount" },
        },
      },
    ]);
    res.json({ success: true, source: "Payment", data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Monthly Revenue → Payment
const getMonthlyRevenue = async (req, res) => {
  try {
    const data = await Payment.aggregate([
      { $match: { PaymentStatus: "Paid" } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$TotalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json({ success: true, source: "Payment", data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Yearly Revenue → Payment
const getYearlyRevenue = async (req, res) => {
  try {
    const data = await Payment.aggregate([
      { $match: { PaymentStatus: "Paid" } },
      {
        $group: {
          _id: { $year: "$createdAt" },
          revenue: { $sum: "$TotalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json({ success: true, source: "Payment", data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * =========================
 * ORDER ANALYTICS (Order)
 * =========================
 */

const getAverageOrderValue = async (req, res) => {
  try {
    const data = await Order.aggregate([
      { $group: { _id: null, avg: { $avg: "$TotalAmount" } } },
    ]);
    res.json({ success: true, source: "Order", data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getOrderCount = async (req, res) => {
  try {
    const count = await Order.countDocuments();
    res.json({ success: true, source: "Order", count });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getCancelledOrders = async (req, res) => {
  try {
    const data = await Order.find({ OrderStatus: "Cancelled" });
    res.json({ success: true, source: "Order", count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getRefundedOrders = async (req, res) => {
  try {
    const data = await Payment.find({ status: "Refunded" });
    res.json({ success: true, source: "Payment", count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * =========================
 * CUSTOMER ANALYTICS (Order)
 * =========================
 */

const getTopCustomers = async (req, res) => {
  try {
    const data = await Order.aggregate([
      {
        $group: {
          _id: "$CustomerName",
          totalSpent: { $sum: "$TotalAmount" },
        },
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 10 },
    ]);
    res.json({ success: true, source: "Order", data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * =========================
 * PRODUCT ANALYTICS (Order)
 * =========================
 */

const getTopSellingProducts = async (req, res) => {
  try {
    const data = await Order.aggregate([
      {
        $group: {
          _id: "$ProductName",
          sold: { $sum: "$Quantity" },
        },
      },
      { $sort: { sold: -1 } },
      { $limit: 10 },
    ]);
    res.json({ success: true, source: "Order", data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getLowSellingProducts = async (req, res) => {
  try {
    const data = await Order.aggregate([
      {
        $group: {
          _id: "$ProductName",
          sold: { $sum: "$Quantity" },
        },
      },
      { $sort: { sold: 1 } },
      { $limit: 10 },
    ]);
    res.json({ success: true, source: "Order", data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * =========================
 * CATEGORY ANALYTICS (Order)
 * =========================
 */

const getTopCategories = async (req, res) => {
  try {
    const data = await Order.aggregate([
      {
        $group: {
          _id: "$Category",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);
    res.json({ success: true, source: "Order", data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * =========================
 * PAYMENT ANALYTICS (Payment)
 * =========================
 */

const getPaymentDistribution = async (req, res) => {
  try {
    const data = await Payment.aggregate([
      {
        $group: {
          _id: "$method",
          count: { $sum: 1 },
        },
      },
    ]);
    res.json({ success: true, source: "Payment", data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * =========================
 * LOCATION ANALYTICS (Order)
 * =========================
 */

const getTopCities = async (req, res) => {
  try {
    const data = await Order.aggregate([
      {
        $group: {
          _id: "$City",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);
    res.json({ success: true, source: "Order", data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * =========================
 * RETURN RATE ANALYTICS (Order)
 * =========================
 */

const getReturnRate = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const returnedOrders = await Order.countDocuments({
      OrderStatus: { $regex: "^returned$", $options: "i" },
    });
    const rate = totalOrders === 0 ? 0 : (returnedOrders / totalOrders) * 100;
    res.json({ success: true, returnRate: rate, totalOrders, returnedOrders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * =========================
 * DISCOUNT ANALYTICS (Order)
 * =========================
 */

const getDiscountUsage = async (req, res) => {
  try {
    const data = await Order.aggregate([
      { $match: { Discount: { $gt: 0 } } },
      {
        $group: {
          _id: null,
          totalDiscount: { $sum: "$Discount" },
          orders: { $sum: 1 },
        },
      },
    ]);
    res.json({ success: true, source: "Order", data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getTotalRevenue,
  getMonthlyRevenue,
  getYearlyRevenue,
  getAverageOrderValue,
  getOrderCount,
  getCancelledOrders,
  getRefundedOrders,
  getTopCustomers,
  getTopSellingProducts,
  getLowSellingProducts,
  getTopCategories,
  getPaymentDistribution,
  getTopCities,
  getReturnRate,
  getDiscountUsage,
};
