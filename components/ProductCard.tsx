"use client";

import Image from "next/image";
import { FC } from "react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, addToCart }) => {
  return (
    <div className="border-2 border-gold-500 rounded-2xl p-4 bg-white shadow-md hover:shadow-lg transition-all transform hover:scale-105 flex flex-col items-center w-72">
      {/* Image */}
      <div className="w-60 h-60 relative mb-4">
        <Image
          src={product.image}
          alt={product.title}
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-center mb-2 text-gray-800">
        {product.title}
      </h3>

      {/* Price */}
      <p className="text-gray-600 text-center mb-4 text-base">
        ${Number(product.price).toFixed(2)}
      </p>

      {/* Add to Cart */}
      <button
        onClick={() => addToCart(product)}
        className="bg-gold-500 hover:bg-yellow-400 text-black px-5 py-2 rounded-lg transition-all"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
