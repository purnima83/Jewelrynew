"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext"; // ✅ Cart context
import { useRouter } from "next/navigation"; // ✅ Router for navigation

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart, cart } = useCart(); // ✅ Access cart too
  const router = useRouter(); // ✅ Initialize router

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/jewelery")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative h-64 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-image.jpg')" }}
      >
        <h1 className="text-white text-4xl font-bold">Discover Elegant Jewelry</h1>
      </section>

      {/* Product Listing */}
      <section className="mt-8 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-6">Featured Jewelry</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition">
              <Image src={product.image} alt={product.title} width={200} height={200} className="mx-auto rounded" />
              <h3 className="text-lg font-semibold mt-3 text-center">{product.title}</h3>
              <p className="text-gray-700 text-center">${product.price}</p>

              {/* ✅ Add to Cart */}
              <button 
                onClick={() => addToCart({ ...product, quantity: 1 })}
                className="mt-3 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Add to Cart 🛒
              </button>
            </div>
          ))}
        </div>

        {/* ✅ Proceed to Checkout Button */}
        {cart.length > 0 && (
          <div className="mt-10 text-center">
            <button
              onClick={() => router.push("/checkout")}
              className="bg-black text-white px-6 py-3 rounded text-lg hover:bg-gray-800 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
