"use client";

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-10 overflow-x-hidden">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-gold-500 mb-10">
        Admin Dashboard
      </h1>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {/* Card */}
        <Link
          href="/admin/products"
          className="border border-gold-500 hover:bg-gold-500 hover:text-black rounded-xl p-8 flex flex-col items-center justify-center transition-transform transform hover:scale-105 shadow-lg"
        >
          <span className="text-4xl mb-2">📦</span>
          <h2 className="mt-2 text-lg font-semibold text-center">Manage Products</h2>
        </Link>

        {/* Card */}
        <Link
          href="/admin/orders"
          className="border border-gold-500 hover:bg-gold-500 hover:text-black rounded-xl p-8 flex flex-col items-center justify-center transition-transform transform hover:scale-105 shadow-lg"
        >
          <span className="text-4xl mb-2">🧾</span>
          <h2 className="mt-2 text-lg font-semibold text-center">Manage Orders</h2>
        </Link>

        {/* Card */}
        <Link
          href="/admin/users"
          className="border border-gold-500 hover:bg-gold-500 hover:text-black rounded-xl p-8 flex flex-col items-center justify-center transition-transform transform hover:scale-105 shadow-lg"
        >
          <span className="text-4xl mb-2">👥</span>
          <h2 className="mt-2 text-lg font-semibold text-center">Manage Users</h2>
        </Link>

        {/* Card */}
        <Link
          href="/admin/reports"
          className="border border-gold-500 hover:bg-gold-500 hover:text-black rounded-xl p-8 flex flex-col items-center justify-center transition-transform transform hover:scale-105 shadow-lg"
        >
          <span className="text-4xl mb-2">📊</span>
          <h2 className="mt-2 text-lg font-semibold text-center">View Reports</h2>
        </Link>
      </div>
    </div>
  );
}
