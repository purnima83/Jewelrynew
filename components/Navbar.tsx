"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const { cart, mounted } = useCart();
  const { data: session, status } = useSession();

  if (status === "loading" || !mounted) return null;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-black text-white shadow sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center relative">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gold-500">
          Jewelry Store
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
          aria-label="Toggle menu"
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="hover:text-gold-500 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Cart Button */}
          <button
            onClick={() => setMiniCartOpen(!miniCartOpen)}
            className="relative hover:text-gold-500 transition-colors"
          >
            Cart 🛒
            {cart.length > 0 && (
              <span className="bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full absolute -top-2 -right-4 animate-bounce">
                {cart.length}
              </span>
            )}
          </button>

          {/* Auth Buttons */}
          {session ? (
            <button
              onClick={() => signOut()}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition ml-4"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="bg-gold-500 text-black px-4 py-2 rounded hover:bg-yellow-400 transition ml-4"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-black border-t border-gold-500 px-6 py-6 flex flex-col space-y-6 shadow-lg absolute top-16 left-0 w-full">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="block text-lg hover:text-gold-500 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMiniCartOpen(!miniCartOpen);
                setMenuOpen(false);
              }}
              className="block text-lg hover:text-gold-500 transition-colors"
            >
              Cart 🛒
            </button>

            {session ? (
              <button
                onClick={() => {
                  signOut();
                  setMenuOpen(false);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  signIn("google");
                  setMenuOpen(false);
                }}
                className="bg-gold-500 text-black px-4 py-2 rounded hover:bg-yellow-400 transition"
              >
                Login
              </button>
            )}
          </div>
        )}

        {/* Mini Cart Preview */}
        {miniCartOpen && (
          <div className="absolute right-0 top-16 w-72 bg-black text-white rounded-lg shadow-lg border border-gold-500 p-4 z-50 animate-fade-in">
            <h4 className="text-lg font-bold mb-3">🛍️ Your Cart</h4>
            {cart.length === 0 ? (
              <p className="text-gray-400">Your cart is empty.</p>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span className="text-sm">{item.title.slice(0, 20)}...</span>
                    <span className="text-sm">${item.price}</span>
                  </div>
                ))}
              </div>
            )}
            <Link
              href="/cart"
              onClick={() => setMiniCartOpen(false)}
              className="mt-4 inline-block w-full bg-gold-500 text-black py-2 rounded hover:bg-yellow-400 transition text-center"
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
