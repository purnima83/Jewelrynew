"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Handle touch swipe
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartX.current === null) return;
      const touchEndX = e.changedTouches[0].clientX;
      const distance = touchEndX - touchStartX.current;

      if (distance > 50) {
        // Swipe right ➡️ - Open Sidebar
        setSidebarOpen(true);
      } else if (distance < -50) {
        // Swipe left ⬅️ - Close Sidebar
        setSidebarOpen(false);
      }
      touchStartX.current = null;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out bg-gradient-to-b from-yellow-400 to-yellow-500 shadow-lg md:relative md:translate-x-0 md:flex md:flex-col`}>
        <div className="h-full p-8 flex flex-col">
          <h2 className="text-3xl font-extrabold text-black mb-10 text-center">Admin Panel</h2>
          <nav className="flex flex-col gap-6 text-lg text-black font-semibold">
            <Link href="/admin/dashboard" className="hover:text-white">📊 Dashboard</Link>
            <Link href="/admin/products" className="hover:text-white">🛍️ Products</Link>
            <Link href="/admin/orders" className="hover:text-white">📦 Orders</Link>
            <Link href="/admin/users" className="hover:text-white">👥 Users</Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-x-hidden">
        {/* Mobile Topbar */}
        <div className="flex items-center justify-between md:hidden p-4 bg-yellow-400 text-black">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-3xl" aria-label="Toggle Menu">
            ☰
          </button>
          <h1 className="text-lg font-bold">Admin Panel</h1>
        </div>

        {/* Actual Page Content */}
        <main className="flex-1 p-6 sm:p-8 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
