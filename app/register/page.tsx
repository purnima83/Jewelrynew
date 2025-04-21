"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      toast.success("Registration successful! Please log in.");
      router.push("/login");
    } else {
      const data = await res.json();
      toast.error(data.error || "Registration failed");
    }
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-center mb-6">Register</h2>
      <form onSubmit={handleRegister} className="max-w-md mx-auto bg-black p-8 rounded-lg shadow-lg">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded bg-gray-800 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded bg-gray-800 text-white"
        />
        <button
          type="submit"
          className="w-full py-3 bg-gold-500 hover:bg-gold-400 text-black rounded font-semibold"
        >
          Register
        </button>
      </form>
    </div>
  );
}