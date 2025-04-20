"use client";

import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import FloatingChatbot from "@/components/FloatingChatbot";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    renderMode: "performance",
    slides: { perView: 1 },
    drag: true,
    defaultAnimation: { duration: 2500, easing: (t) => t * (2 - t) },
    created: (slider) => {
      setInterval(() => {
        slider.moveToIdx(slider.track.details.abs + 1, true);
      }, 4000);
    },
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://fakestoreapi.com/products/category/jewelery");
      const data: Product[] = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center relative">

      {/* Hero Section */}
      <section
        className="relative w-full h-[85vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-jewelry.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>
        <div className="relative z-10 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-gold-500 mb-6 drop-shadow-lg">
            Dazzle with Every Detail
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-8 drop-shadow-sm">
            Discover jewelry that tells your story ✨
          </p>
          <button
            onClick={() => router.push("/shop")}
            className="px-8 py-4 text-lg bg-gold-500 hover:bg-yellow-400 text-black rounded-xl transition-all hover:scale-105"
          >
            Explore Collection
          </button>
        </div>
      </section>

      {/* Featured Jewelry */}
      <section className="container mx-auto px-6 py-12 animate-fade-in">
        <h2 className="text-4xl font-bold mb-8 text-gold-500 text-center">
          Featured Jewelry
        </h2>

        {loading ? (
          <div className="text-gray-400 text-center text-xl animate-pulse">
            Loading jewelry...
          </div>
        ) : products.length > 0 ? (
          <div ref={sliderRef} className="keen-slider">
            {products.map((product) => (
              <div
                key={product.id}
                className="keen-slider__slide flex justify-center items-center p-4 transition-transform duration-1000"
              >
                <div className="border border-gold-500 rounded-xl p-4 bg-white max-w-sm w-full hover:scale-105 transition-all">
                  <ProductCard product={product} addToCart={addToCart} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">No products found.</p>
        )}
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-6 py-16 animate-fade-in">
        <h2 className="text-4xl font-bold mb-8 text-gold-500 text-center">
          Our Happy Clients
        </h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center hover:scale-105 transition-all">
            <p className="text-gray-700 italic mb-4">
              "Absolutely stunning designs! The craftsmanship is impeccable."
            </p>
            <h4 className="text-gold-500 font-semibold">— Sophia R.</h4>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center hover:scale-105 transition-all">
            <p className="text-gray-700 italic mb-4">
              "I've never seen such unique, timeless pieces. Highly recommend!"
            </p>
            <h4 className="text-gold-500 font-semibold">— Daniel K.</h4>
          </div>
        </div>
      </section>

      {/* Chatbot */}
      <FloatingChatbot />
    </div>
  );
}
