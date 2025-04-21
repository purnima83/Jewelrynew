import mongoose, { Schema, models, model } from "mongoose";

const ProductSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String },
  stock: { type: Number, default: 1 },
}, { timestamps: true });

const Product = models?.Product || model("Product", ProductSchema);

export default Product;