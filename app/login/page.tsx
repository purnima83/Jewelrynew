"use client";

import { Suspense, useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

function LoginInner() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(callbackUrl);
    }
  }, [status, callbackUrl, router]);

  if (status === "loading") {
    return <p className="text-center py-8">Loading...</p>;
  }

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // 🔥 don't auto redirect here, handle manually
    });
    setLoading(false);

    if (res?.error) {
      toast.error(res.error);
    } else {
      router.replace(callbackUrl);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 text-center">
      <h2 className="text-4xl font-bold mb-6 text-gold-500">Sign In</h2>

      {/* Email/Password Login Form */}
      <form onSubmit={handleCredentialsLogin} className="max-w-md mx-auto mb-6">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
          className="w-full mb-4 p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gold-500 hover:bg-yellow-400 text-black rounded font-semibold transition"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      {/* Divider */}
      <p className="text-gray-400 my-4">or</p>

      {/* OAuth Buttons */}
      <div className="space-y-4">
        <button
          onClick={() => signIn("google", { callbackUrl })}
          className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-500 w-full transition"
        >
          Sign in with Google
        </button>
        <button
          onClick={() => signIn("github", { callbackUrl })}
          className="bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-700 w-full transition"
        >
          Sign in with GitHub
        </button>
      </div>

      {/* Link to Register */}
      <p className="mt-6 text-gray-400">
        Don't have an account?{" "}
        <Link href="/register" className="text-gold-500 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading login page...</div>}>
      <LoginInner />
    </Suspense>
  );
}
