"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartX.current === null) return;
      const touchEndX = e.changedTouches[0].clientX;
      const distance = touchEndX - touchStartX.current;

      if (distance > 50) setSidebarOpen(true);
      else if (distance < -50) setSidebarOpen(false);

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
    <div className="flex min-h-screen bg-black text-white overflow-x-auto">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out bg-[#1f1f1f] shadow-xl md:relative md:translate-x-0 md:flex md:flex-col`}
      >
        <div className="h-full p-6 flex flex-col">
          <h2 className="text-2xl font-bold text-gold-500 mb-8 text-center">
            Admin Panel
          </h2>
          <nav className="flex flex-col gap-4 text-base font-medium text-white">
            <Link href="/admin/dashboard" className="hover:text-yellow-300 transition">📊 Dashboard</Link>
            <Link href="/admin/products" className="hover:text-yellow-300 transition">🛍️ Products</Link>
            <Link href="/admin/orders" className="hover:text-yellow-300 transition">📦 Orders</Link>
            <Link href="/admin/users" className="hover:text-yellow-300 transition">👥 Users</Link>
            <Link href="/admin/reports" className="hover:text-yellow-300 transition">📈 Reports</Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full overflow-x-auto">
        {/* Mobile Topbar */}
        <div className="md:hidden flex items-center justify-between p-4 bg-black text-gold-500 border-b border-yellow-500">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-3xl"
            aria-label="Toggle Sidebar"
          >
            ☰
          </button>
          <h1 className="text-lg font-bold">Admin Panel</h1>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 w-full overflow-x-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
