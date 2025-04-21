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
        <div className="hidden md:flex items-center space-x-8 text-lg">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[#f6e05e] hover:text-[#ffe066] transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Cart */}
          <Link href="/cart" className="relative text-[#f6e05e] hover:text-[#ffe066] transition">
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

          {/* Auth Buttons */}
          {session ? (
            <button
              onClick={handleAuth}
              className="ml-4 bg-gold-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2 rounded-lg border border-yellow-400 transition"
            >
              Logout
            </button>
          ) : (
            <div className="flex space-x-4">
              <button
                onClick={handleAuth}
                className="bg-gold-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2 rounded-lg border border-yellow-400 transition"
              >
                Login
              </button>
              <Link
                href="/register"
                className="bg-transparent border border-gold-500 text-[#f6e05e] hover:bg-gold-500 hover:text-black font-semibold px-5 py-2 rounded-lg transition"
              >
                Register
              </Link>
            </div>
          )}
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
        <div className="md:hidden bg-black flex flex-col px-6 py-4 space-y-4 text-[#f6e05e]">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-lg hover:text-[#ffe066] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/cart"
            onClick={() => setMenuOpen(false)}
            className="text-lg hover:text-[#ffe066] transition-colors"
          >
            🛒 Cart
          </Link>

          {session ? (
            <button
              onClick={handleAuth}
              className="bg-gold-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2 rounded-lg border border-yellow-400 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={handleAuth}
                className="bg-gold-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2 rounded-lg border border-yellow-400 transition"
              >
                Login
              </button>
              <Link
                href="/register"
                className="bg-transparent border border-gold-500 text-[#f6e05e] hover:bg-gold-500 hover:text-black font-semibold px-5 py-2 rounded-lg transition"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
