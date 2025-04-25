"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams?.get("session_id"); // ✅ Safe access
  const { clearCart } = useCart();
  const { data: session, status } = useSession();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (status === "loading") return;
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
          clearCart();
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("🚨 Fetch Error:", error);
        setLoading(false);
      });
  }, [sessionId, clearCart]);

  if (status === "loading") return null;

  if (!sessionId) {
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold text-red-600">No Order Found</h1>
        <p className="text-gray-400 mt-4">It looks like you haven't placed an order.</p>
        <a
          href="/"
          className="mt-6 inline-block bg-gold-500 text-black px-6 py-2 rounded hover:bg-yellow-400 transition"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="relative container mx-auto px-6 py-8">
      {/* 🎉 Confetti */}
      <Confetti width={width} height={height} numberOfPieces={300} recycle={false} />

      <h2 className="text-4xl font-bold text-center text-green-400 mb-8">Payment Successful 🎉</h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading order details...</p>
      ) : !order ? (
        <p className="text-center text-red-500">🚨 Order not found. Please check your email for confirmation.</p>
      ) : (
        <div className="max-w-2xl mx-auto bg-black/50 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-gold-500">Order Summary</h3>
          <p className="text-gray-400 mb-6">Order ID: {order._id}</p>

          {/* Ordered Items */}
          <div className="space-y-4">
            {order.items.map((item: any, index: number) => (
              <div
                key={index}
                className="flex items-center gap-4 border border-gold-500 p-4 rounded-lg bg-black/40"
              >
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="rounded object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-gray-400">
                    ${item.price} x {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Total & Status */}
          <div className="mt-6 border-t pt-4">
            <p className="text-xl font-bold text-white">
              Total: ${order.total?.toFixed(2)}
            </p>
            <p className="text-green-400 font-semibold mt-2">
              Payment Status: Paid ✅
            </p>
          </div>
        </div>
      )}

      {/* Continue Shopping */}
      <div className="text-center mt-8">
        <a
          href="/"
          className="bg-gold-500 text-black px-6 py-3 rounded hover:bg-yellow-400 transition text-lg font-semibold"
        >
          Continue Shopping
        </a>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<p className="text-center text-gray-400 py-8">Loading payment details...</p>}>
      <SuccessPageContent />
    </Suspense>
  );
}
