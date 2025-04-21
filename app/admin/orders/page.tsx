"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.get("/api/admin/orders");
    setOrders(res.data);
  };

  const markCompleted = async (id: string) => {
    await axios.put(`/api/admin/orders?id=${id}`);
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Orders</h1>

      <div className="flex flex-col gap-6">
        {orders.map((o: any) => (
          <div key={o._id} className="border p-4 rounded shadow">
            <p><strong>Email:</strong> {o.userEmail}</p>
            <p><strong>Total:</strong> ${o.total}</p>
            <p><strong>Status:</strong> {o.status}</p>
            <button
              onClick={() => markCompleted(o._id)}
              className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              disabled={o.status === "completed"}
            >
              {o.status === "completed" ? "Completed" : "Mark as Completed"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}