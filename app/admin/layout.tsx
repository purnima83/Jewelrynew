"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-black text-white overflow-x-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-yellow-400 to-yellow-500 p-6 shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:static md:translate-x-0 z-50`}
      >
        <h2 className="text-2xl font-extrabold mb-8 text-black text-center">
          Admin Panel
        </h2>
        <nav className="flex flex-col gap-6 text-lg">
          <Link href="/admin/dashboard" className="hover:text-black text-black font-semibold">
            📊 Dashboard
          </Link>
          <Link href="/admin/products" className="hover:text-black text-black font-semibold">
            🛍️ Products
          </Link>
          <Link href="/admin/orders" className="hover:text-black text-black font-semibold">
            📦 Orders
          </Link>
          <Link href="/admin/users" className="hover:text-black text-black font-semibold">
            👥 Users
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar for Mobile */}
        <div className="md:hidden flex items-center justify-between p-4 bg-yellow-400 text-black">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-2xl font-bold"
          >
            ☰
          </button>
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
