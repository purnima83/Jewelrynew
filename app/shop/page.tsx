"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const categories = ["All", "Rings", "Necklaces", "Bracelets", "Earrings"];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("All");
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts(1, category);
  }, [category]);

  const fetchProducts = async (pageNumber: number, selectedCategory: string) => {
    setLoading(true);
    try {
      let query = selectedCategory === "All" ? "jewelry" : selectedCategory;
      const res = await fetch(`/api/ebay?q=${encodeURIComponent(query)}&limit=12&page=${pageNumber}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        if (pageNumber === 1) {
          setProducts(data);
        } else {
          setProducts(prev => [...prev, ...data]);
        }
      } else {
        console.warn("⚠️ Unexpected response:", data);
      }
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage, category);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-gold-500 mb-8">
        Shop Our Collections ✨
      </h1>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-lg border ${
              cat === category ? "bg-gold-500 text-black" : "bg-transparent text-white border-gold-500"
            } hover:bg-gold-400 hover:text-black transition`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products */}
      {loading && page === 1 ? (
        <p className="text-center text-gray-400">Loading products...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  quantity: 1,
                }}
                addToCart={addToCart}
              />
            ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 rounded-lg bg-gold-500 hover:bg-gold-400 text-black font-semibold transition"
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
