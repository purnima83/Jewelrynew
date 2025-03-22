"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();
  const { data: session, status } = useSession(); // ✅ Use NextAuth session

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Redirect unauthenticated users only when session is confirmed as unauthenticated
  useEffect(() => {
    if (status === "loading") return; // Wait until session is determined
    if (!session) {
      router.push("/login");
    }
  }, [status, session, router]);

  useEffect(() => {
    if (!sessionId) return;

    fetch(`/api/success?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error("🚨 Order Fetch Error:", data.error);
          setOrder(null);
        } else {
          setOrder(data);
          clearCart(); // ✅ Clear cart only after order is confirmed
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("🚨 Fetch Error:", error);
        setLoading(false);
      });
  }, [sessionId, clearCart]);

  if (status === "loading") return null; // ✅ Prevent hydration errors

  if (!sessionId) {
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold text-red-600">No Order Found</h1>
        <p className="text-gray-700 mt-4">It looks like you haven't placed an order.</p>
        <a href="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Payment Successful 🎉</h2>

      {loading ? (
        <p className="text-center">Loading order details...</p>
      ) : !order ? (
        <p className="text-center text-red-500">🚨 Order not found. Please check your email for confirmation.</p>
      ) : (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          <p className="text-gray-600 mb-4">Order ID: {order._id}</p>

          {Array.isArray(order.items) && order.items.length > 0 ? (
            order.items.map((item: any, index: number) => (
              <div key={index} className="border p-3 rounded-lg flex items-center">
                <img src={item.image} alt={item.title} className="w-16 h-16 rounded" />
                <div className="ml-4">
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-gray-600">${item.price} x {item.quantity}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No items found in order.</p>
          )}

          <p className="text-lg font-bold mt-4">Total: ${order.total?.toFixed(2)}</p>
          <p className="text-green-600 font-semibold mt-2">Payment Status: Paid</p>
        </div>
      )}

      <div className="text-center mt-6">
        <a href="/" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Continue Shopping
        </a>
      </div>
    </div>
  );
}