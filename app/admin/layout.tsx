"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-yellow-400 to-yellow-500 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:static md:translate-x-0`}
      >
        <div className="h-full flex flex-col p-6">
          <h2 className="text-2xl font-extrabold text-black mb-8 text-center">
            Admin Panel
          </h2>
          <nav className="flex flex-col gap-6 text-lg font-semibold text-black">
            <Link href="/admin/dashboard" className="hover:text-white">📊 Dashboard</Link>
            <Link href="/admin/products" className="hover:text-white">🛍️ Products</Link>
            <Link href="/admin/orders" className="hover:text-white">📦 Orders</Link>
            <Link href="/admin/users" className="hover:text-white">👥 Users</Link>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-black text-white">
        {/* Mobile Top Bar */}
        <div className="md:hidden flex items-center justify-between bg-yellow-400 text-black p-4 shadow-lg">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-3xl">
            ☰
          </button>
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>

        {/* Main page */}
        <main className="flex-1 p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
