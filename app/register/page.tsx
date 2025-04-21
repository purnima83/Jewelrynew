"use client";

import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-gold-500 text-center mb-6">
          Create an Account
        </h1>
        <form className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Full Name"
            className="px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
            required
          />
          <button
            type="submit"
            className="bg-gold-500 hover:bg-yellow-400 text-black font-semibold py-3 rounded-md transition-all"
          >
            Register
          </button>
        </form>
        <p className="text-gray-400 mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-gold-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
