"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useSession, signOut } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart, clearCart } = useCart();
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const handleLogout = async () => {
    clearCart();
    await signOut();
    toast.success("Logged out successfully 🚀");
  };

  const getGreetingName = () => {
    if (session?.user?.name) return session.user.name.split(" ")[0];
    if (session?.user?.email) return session.user.email.split("@")[0];
    return "Guest";
  };

  return (
    <nav className="bg-black border-b border-gold-500 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo + Brand Title */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Jewelry Store Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-2xl font-bold text-gold-500">Jewelry Store</span>
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

          <Link href="/cart" className="relative text-[#f6e05e] hover:text-[#ffe066] transition">
            🛒 Cart
            {session && cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-gold-500 text-black rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>

          {session?.user && (
            <span className="text-gold-500 ml-4 whitespace-nowrap">
              Hi, {getGreetingName()} 👋
            </span>
          )}

          {session ? (
            <button
              onClick={handleLogout}
              className="ml-4 bg-gold-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2 rounded-lg border border-yellow-400 transition"
            >
              Logout
            </button>
          ) : (
            <div className="flex space-x-4">
              <Link
                href="/login"
                className="bg-gold-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2 rounded-lg border border-yellow-400 transition"
              >
                Login
              </Link>
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
          className="md:hidden flex items-center space-x-2 text-gold-500 font-semibold text-lg"
          aria-label="Toggle Menu"
        >
          <span className="text-2xl">{menuOpen ? "✖" : "☰"}</span>
          <span>Menu</span>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-black flex flex-col px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-lg text-[#f6e05e] hover:text-yellow-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/cart"
            onClick={() => setMenuOpen(false)}
            className="text-lg text-[#f6e05e] hover:text-yellow-400 transition-colors"
          >
            🛒 Cart
          </Link>
          {session ? (
            <>
              <span className="text-gold-500 text-center">Hi, {getGreetingName()} 👋</span>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="bg-gold-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2 rounded-lg border border-yellow-400 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="bg-gold-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2 rounded-lg border border-yellow-400 transition text-center"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="bg-transparent border border-gold-500 text-[#f6e05e] hover:bg-gold-500 hover:text-black font-semibold px-5 py-2 rounded-lg transition text-center"
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
