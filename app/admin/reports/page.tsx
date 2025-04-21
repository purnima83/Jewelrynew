"use client";

import { useEffect, useState } from "react";

export default function AdminReports() {
  const [stats, setStats] = useState({
    orders: 0,
    revenue: 0,
    users: 0,
    products: 0,
    ebayProducts: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    };
    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8 text-gold-500 text-center">
        Admin Reports 📊
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <div className="border border-gold-500 p-6 rounded-lg">
          <h2 className="text-xl text-gray-400">Total Orders</h2>
          <p className="text-3xl font-bold text-white mt-2">{stats.orders}</p>
        </div>
        <div className="border border-gold-500 p-6 rounded-lg">
          <h2 className="text-xl text-gray-400">Total Revenue</h2>
          <p className="text-3xl font-bold text-white mt-2">${stats.revenue.toFixed(2)}</p>
        </div>
        <div className="border border-gold-500 p-6 rounded-lg">
          <h2 className="text-xl text-gray-400">Total Products (DB)</h2>
          <p className="text-3xl font-bold text-white mt-2">{stats.products}</p>
        </div>
        <div className="border border-gold-500 p-6 rounded-lg">
          <h2 className="text-xl text-gray-400">eBay Products</h2>
          <p className="text-3xl font-bold text-white mt-2">{stats.ebayProducts}</p>
        </div>
        <div className="border border-gold-500 p-6 rounded-lg">
          <h2 className="text-xl text-gray-400">Total Users</h2>
          <p className="text-3xl font-bold text-white mt-2">{stats.users}</p>
        </div>
      </div>
    </div>
  );
}
