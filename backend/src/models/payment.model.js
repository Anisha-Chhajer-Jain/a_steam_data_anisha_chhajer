const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    PaymentStatus: { type: String, required: true },
    TotalAmount:   { type: Number, required: true },
    status:        { type: String },
    method:        { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
