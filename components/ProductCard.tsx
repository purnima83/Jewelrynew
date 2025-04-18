"use client";

import Image from "next/image";
import { FC } from "react";
import { Product } from "@/types/product"; // ✅ Import the shared Product type

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, addToCart }) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <Image
        src={product.image}
        alt={product.title}
        width={300}
        height={300}
        className="object-cover mx-auto rounded"
      />
      <h3 className="text-lg font-bold mt-2 text-center">{product.title}</h3>
      <p className="text-gray-700 text-center">
        ${Number(product.price).toFixed(2)}
      </p>

      <button
        onClick={() => addToCart(product)}
        className="block mt-4 mx-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
