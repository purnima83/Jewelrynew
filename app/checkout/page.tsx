"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <p className="text-gray-400">Loading session...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-bold text-gold-500 mb-4">Sign In Required</h2>
        <p className="text-gray-400 mb-6">You must be signed in to proceed to checkout.</p>
        <button
          onClick={() => signIn(undefined, { callbackUrl: "/checkout" })}
          className="bg-gold-500 text-black px-8 py-3 rounded-full hover:bg-yellow-400 transition"
        >
          Sign In
        </button>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!email || !address) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, email, address }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        clearCart(); // ✅ Clear cart
        router.push(data.url); // ✅ Redirect to Stripe
      } else {
        alert(data.error || "Something went wrong during checkout.");
      }
    } catch (error) {
      console.error("🚨 Checkout Error:", error);
      alert("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-center mb-10 text-gold-500">Checkout</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-400">
          Your cart is empty.{" "}
          <Link href="/shop" className="text-gold-500 underline hover:text-yellow-400">
            Shop Now
          </Link>
        </p>
      ) : (
        <div className="max-w-lg mx-auto bg-black bg-opacity-30 p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gold-500 mb-6">Billing Details</h3>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-700 p-3 rounded bg-black text-white placeholder-gray-500"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-700 p-3 rounded bg-black text-white placeholder-gray-500"
            />
            <input
              type="text"
              placeholder="Shipping Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-700 p-3 rounded bg-black text-white placeholder-gray-500"
            />
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className={`mt-6 w-full px-6 py-3 rounded-full text-lg font-semibold ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } text-white transition`}
          >
            {loading ? "Processing..." : "Complete Purchase"}
          </button>
        </div>
      )}
    </div>
  );
}
