"use client";

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8 text-gold-500">Admin Dashboard</h1>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          href="/admin/products"
          className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 flex flex-col items-center justify-center transition-all"
        >
          <span className="text-2xl">📦</span>
          <h2 className="mt-4 text-xl font-semibold text-center">Manage Products</h2>
        </Link>

        <Link
          href="/admin/orders"
          className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 flex flex-col items-center justify-center transition-all"
        >
          <span className="text-2xl">🧾</span>
          <h2 className="mt-4 text-xl font-semibold text-center">Manage Orders</h2>
        </Link>

        <Link
          href="/admin/users"
          className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 flex flex-col items-center justify-center transition-all"
        >
          <span className="text-2xl">👥</span>
          <h2 className="mt-4 text-xl font-semibold text-center">Manage Users</h2>
        </Link>

        <Link
          href="/admin/reports"
          className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 flex flex-col items-center justify-center transition-all"
        >
          <span className="text-2xl">📊</span>
          <h2 className="mt-4 text-xl font-semibold text-center">View Reports</h2>
        </Link>
      </div>

      {/* Analytics Preview (Placeholder) */}
      <div className="mt-12 bg-black bg-opacity-40 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Quick Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-gray-800 rounded-lg p-6">
            <p className="text-lg text-gray-400">Total Sales</p>
            <h3 className="text-3xl font-bold text-gold-500 mt-2">$15,240</h3>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <p className="text-lg text-gray-400">Total Orders</p>
            <h3 className="text-3xl font-bold text-gold-500 mt-2">120</h3>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <p className="text-lg text-gray-400">Total Users</p>
            <h3 className="text-3xl font-bold text-gold-500 mt-2">45</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
