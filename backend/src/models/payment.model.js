import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  PaymentStatus: { type: String, required: true },
  TotalAmount: { type: Number, required: true },
  status: { type: String },
  method: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);

