"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-b from-background to-black dark:from-background dark:to-black transition-all duration-500">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-500 to-yellow-400 dark:from-yellow-300 dark:to-yellow-500">
        Discover Timeless Jewelry
      </h1>
      <p className="text-lg md:text-xl max-w-2xl text-muted dark:text-gray-400 mb-8">
        Explore our curated collections of elegant fine jewelry, crafted for every moment.
      </p>
      <Link
        href="/shop"
        className="bg-accent hover:brightness-110 text-background font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg"
      >
        Shop Now
      </Link>
    </section>
  );
}
