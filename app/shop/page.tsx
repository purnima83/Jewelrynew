"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext"; // ✅ import useCart
import ProductCard from "@/components/ProductCard";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // ✅ get addToCart from context

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/ebay?limit=20&q=jewelry");
        const data = await res.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.warn("⚠ Unexpected response:", data);
        }
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gold-500 mb-8">
        Shop Our Collections ✨
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{ ...product, quantity: 1 }} // ✅ inject quantity: 1
              addToCart={addToCart} // ✅ real addToCart
            />
          ))}
        </div>
      )}
    </div>
  );
}
