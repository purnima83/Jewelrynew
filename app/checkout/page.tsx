"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);
    }
  }, [session]);

  // Redirect if not logged in
  if (!session) {
    return (
      <div className="container mx-auto px-6 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
        <p className="text-gray-600">You must be signed in to continue.</p>
        <button
          onClick={() => signIn()}
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Sign In to Continue
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
        clearCart(); // Clear the cart before redirecting
        router.push(data.url); // Redirect to Stripe Checkout
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Failed to process checkout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Checkout</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">
          Your cart is empty. <a href="/shop" className="text-blue-500 underline">Shop Now</a>
        </p>
      ) : (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Billing Details</h3>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="text"
            placeholder="Shipping Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border p-2 rounded mb-4"
          />

          <button
            onClick={handleCheckout}
            disabled={loading}
            className={`bg-green-600 text-white px-6 py-3 rounded w-full ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
            }`}
          >
            {loading ? "Processing..." : "Complete Purchase"}
          </button>
        </div>
      )}
    </div>
  );
}