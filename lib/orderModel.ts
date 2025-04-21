// lib/orderModel.ts
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  items: [
    {
      id: { type: String, required: true },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
      quantity: { type: Number, required: true },
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  sessionId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// ✅ Dynamic safe loading
export function getOrderModel() {
  return mongoose.models.Order || mongoose.model("Order", OrderSchema);
}
