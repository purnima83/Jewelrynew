import mongoose, { Schema, models, model } from "mongoose";

const OrderSchema = new Schema({
  userEmail: { type: String, required: true },
  items: [
    {
      id: { type: String, required: true },  // ✅ id is String
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

// ✅ Correct dynamic model creation
const Order = models?.Order || model("Order", OrderSchema);

export default Order;
