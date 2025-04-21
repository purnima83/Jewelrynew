"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, mounted } = useCart();
  const { data: session, status } = useSession();
  const router = useRouter();

  if (!mounted || status === "loading") {
    return <div className="text-center py-12 text-lg">Loading cart...</div>;
  }

  if (!session) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-4xl font-bold mb-8 text-gold-500">
          Please login to view your cart 🛒
        </h2>
        <Link
          href="/login"
          className="inline-block bg-gold-500 hover:bg-yellow-400 text-black font-semibold px-8 py-3 rounded-lg transition"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-4xl font-bold text-center mb-10 text-gold-500">
        Shopping Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          Your cart is empty.{" "}
          <Link
            href="/shop"
            className="text-yellow-400 underline hover:text-yellow-300"
          >
            Shop Now
          </Link>
        </p>
      ) : (
        <div>
          {/* Cart Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cart.map((product) => (
              <div
                key={product.id}
                className="border border-gold-500 p-6 rounded-2xl shadow-lg flex flex-col items-center bg-black"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  width={180}
                  height={180}
                  className="rounded-lg object-contain"
                />
                <h3 className="mt-4 text-xl font-semibold text-center text-white">
                  {product.title}
                </h3>
                <p className="mt-2 text-gray-400 text-center">
                  ${Number(product.price).toFixed(2)} x {product.quantity}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2 mt-4">
                  <button
                    onClick={() => updateQuantity(product.id, product.quantity - 1)}
                    className="px-3 py-1 bg-gold-500 hover:bg-yellow-400 text-black rounded-lg text-xl transition"
                  >
                    -
                  </button>

                  <input
                    value={product.quantity}
                    readOnly
                    className="w-12 text-center px-2 py-1 rounded-lg bg-white text-black border border-gold-500"
                  />

                  <button
                    onClick={() => updateQuantity(product.id, product.quantity + 1)}
                    className="px-3 py-1 bg-gold-500 hover:bg-yellow-400 text-black rounded-lg text-xl transition"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="mt-10 p-6 border-t-2 border-gold-500 text-center">
            <h3 className="text-2xl font-bold text-gold-500">
              Total: ${totalPrice.toFixed(2)}
            </h3>

            {/* Proceed to Checkout Button */}
            <button
              onClick={() => router.push("/checkout")}
              className="mt-6 bg-gold-500 hover:bg-yellow-400 text-black font-semibold px-8 py-3 rounded-xl transition text-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
