"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { useKeenSlider } from "keen-slider/react";
import { Product } from "@/types/product"; // ✅ Import shared Product type
import "keen-slider/keen-slider.min.css";

// ✅ RawProduct matches API response
interface RawProduct {
  id: string | number;
  title: string;
  price: string | number;
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
    slides: { perView: 1 },
    renderMode: "performance",
    defaultAnimation: { duration: 2000 },
    created: (slider) => {
      setInterval(() => {
        slider.next();
      }, 4000);
    },
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ebay?limit=6");
      const data: RawProduct[] = await res.json();

      if (Array.isArray(data)) {
        const updatedProducts: Product[] = data.map((item) => ({
          id: String(item.id),
          title: item.title,
          price: typeof item.price === "string" ? parseFloat(item.price) : item.price,
          image: item.image,
          quantity: 1, // ✅ Always add quantity field
        }));
        setProducts(updatedProducts);
      } else {
        console.warn("⚠️ Unexpected response:", data);
        setProducts([]);
      }
    } catch (err) {
      console.error("❌ Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      {/* Hero Section */}
      <section
        className="relative w-full h-[95vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-jewelry.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>
        <div className="relative z-10 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-gold-500 mb-6">
            Timeless Jewelry
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-8">
            Elegance in every sparkle ✨
          </p>
          <button
            onClick={() => router.push("/shop")}
            className="px-8 py-4 text-lg"
          >
            Explore Now
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-8 text-gold-500">Featured Jewelry</h2>

        {loading ? (
          <div className="text-gray-400">Loading...</div>
        ) : products.length > 0 ? (
          <div ref={sliderRef} className="keen-slider">
            {products.map((product) => (
              <div
                key={product.id}
                className="keen-slider__slide flex justify-center transition-opacity duration-1000"
              >
                <ProductCard product={product} addToCart={addToCart} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No products found.</p>
        )}
      </section>

      {/* About Section */}
      <section className="container mx-auto px-6 py-12 bg-black bg-opacity-30 rounded-lg">
        <h2 className="text-4xl font-bold mb-6 text-gold-500">Our Story</h2>
        <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Jewelry Store is where craftsmanship meets passion. Our collections are designed to bring timeless beauty, sophistication, and elegance to every occasion. ✨
        </p>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-6 text-gold-500">What Our Clients Say</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <div className="bg-black p-6 rounded-lg shadow-md">
            <p className="text-gray-300 italic">"Absolutely stunning designs! The craftsmanship is impeccable."</p>
            <h4 className="text-gold-500 mt-4">— Sophia R.</h4>
          </div>
          <div className="bg-black p-6 rounded-lg shadow-md">
            <p className="text-gray-300 italic">"I've never seen such unique, timeless pieces. Highly recommend!"</p>
            <h4 className="text-gold-500 mt-4">— Daniel K.</h4>
          </div>
        </div>
      </section>
    </div>
  );
}
