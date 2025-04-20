"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const handleAuth = async () => {
    if (session) {
      await signOut();
    } else {
      await signIn("google");
    }
    setMenuOpen(false);
  };

  return (
    <nav className="bg-black border-b border-gold-500 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="text-3xl font-bold text-gold-500">
          Jewelry Store
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-lg text-white">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-yellow-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Cart */}
          <Link href="/cart" className="relative hover:text-yellow-400 transition">
            🛒 Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-gold-500 text-black rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Greeting */}
          {session?.user?.name && (
            <span className="text-gold-500 ml-4 whitespace-nowrap">
              Hi, {session.user.name.split(" ")[0]} 👋
            </span>
          )}

          {/* Auth Button */}
          <button
            onClick={handleAuth}
            className="ml-4 bg-gold-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2 rounded-lg border border-yellow-400 transition"
          >
            {session ? "Logout" : "Login"}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl text-gold-500"
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-black flex flex-col px-6 py-4 space-y-4 text-white">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-lg hover:text-yellow-400 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/cart"
            onClick={() => setMenuOpen(false)}
            className="text-lg hover:text-yellow-400 transition-colors"
          >
            🛒 Cart
          </Link>

          {session?.user?.name && (
            <span className="text-gold-500 text-lg">
              Hi, {session.user.name.split(" ")[0]} 👋
            </span>
          )}

          <button
            onClick={handleAuth}
            className="bg-gold-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2 rounded-lg border border-yellow-400 transition"
          >
            {session ? "Logout" : "Login"}
          </button>
        </div>
      )}
    </nav>
  );
}
