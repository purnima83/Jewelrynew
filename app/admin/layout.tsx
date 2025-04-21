// app/admin/layout.tsx
"use client";

import { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-gold-400 to-gold-600 p-8 flex flex-col shadow-lg">
        <h2 className="text-3xl font-extrabold mb-10 text-center text-black drop-shadow">
          Admin Panel
        </h2>
        <nav className="flex flex-col gap-6 text-lg text-black font-semibold">
          <Link href="/admin/dashboard" className="hover:text-white transition">
            📊 Dashboard
          </Link>
          <Link href="/admin/products" className="hover:text-white transition">
            🛍️ Products
          </Link>
          <Link href="/admin/orders" className="hover:text-white transition">
            📦 Orders
          </Link>
          <Link href="/admin/users" className="hover:text-white transition">
            👥 Users
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}
