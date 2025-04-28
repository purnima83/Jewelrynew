"use client";

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-gold-500 mb-10">
        Admin Dashboard
      </h1>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {[
          { href: "/admin/products", icon: "📦", label: "Manage Products" },
          { href: "/admin/orders", icon: "🧾", label: "Manage Orders" },
          { href: "/admin/users", icon: "👥", label: "Manage Users" },
          { href: "/admin/reports", icon: "📊", label: "View Reports" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 hover:from-gray-700 hover:to-gray-600 transition-transform transform hover:scale-105 shadow-md"
          >
            <span className="text-5xl mb-4">{item.icon}</span>
            <h2 className="text-lg sm:text-xl font-semibold text-center">{item.label}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
