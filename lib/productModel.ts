import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export function getProductModel() {
  return mongoose.models.Product || mongoose.model("Product", ProductSchema);
}
