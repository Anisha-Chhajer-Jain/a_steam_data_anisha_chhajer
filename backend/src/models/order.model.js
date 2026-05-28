import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  CustomerName: { type: String, required: true },
  ProductName: { type: String, required: true },
  TotalAmount: { type: Number, required: true },
  Quantity: { type: Number, required: true },
  Category: { type: String, required: true },
  City: { type: String, required: true },
  OrderStatus: { type: String, required: true },
  Discount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
