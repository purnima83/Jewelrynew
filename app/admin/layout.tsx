"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-black text-white overflow-x-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-yellow-400 to-yellow-500 p-8 shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:static md:translate-x-0`}
      >
        <h2 className="text-3xl font-extrabold mb-10 text-center text-black drop-shadow">
          Admin Panel
        </h2>
        <nav className="flex flex-col gap-6 text-lg text-black font-semibold">
          <Link href="/admin/dashboard" className="hover:text-white transition-colors">
            📊 Dashboard
          </Link>
          <Link href="/admin/products" className="hover:text-white transition-colors">
            🛍️ Products
          </Link>
          <Link href="/admin/orders" className="hover:text-white transition-colors">
            📦 Orders
          </Link>
          <Link href="/admin/users" className="hover:text-white transition-colors">
            👥 Users
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Toggle Button */}
        <div className="md:hidden p-4 bg-yellow-400 text-black flex justify-between items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-2xl font-bold"
          >
            ☰ Menu
          </button>
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>

        <main className="flex-1 p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
