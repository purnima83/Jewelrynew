// /app/admin/refresh/page.tsx

"use client";

import { useState } from "react";

export default function RefreshTokenPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const refreshToken = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/token/refresh");
      const data = await res.json();

      if (res.ok) {
        setMessage("✅ " + data.message);
      } else {
        setMessage("❌ " + data.error);
      }
    } catch (err: any) {
      console.error("❌ Error refreshing token:", err.message);
      setMessage("❌ Failed to refresh token.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6">Admin: Refresh eBay Token</h1>

      <button
        onClick={refreshToken}
        disabled={loading}
        className="bg-gold-500 hover:bg-gold-600 text-black font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50"
      >
        {loading ? "Refreshing..." : "🔄 Refresh Token"}
      </button>

      {message && (
        <p className="mt-6 text-center text-lg">
          {message}
        </p>
      )}
    </div>
  );
}
