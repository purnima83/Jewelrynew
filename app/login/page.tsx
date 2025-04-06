"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the callback URL or default to home page
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    if (status === "authenticated") {
      // Redirect back if already signed in
      router.replace(callbackUrl);
    }
  }, [status, callbackUrl, router]);

  if (status === "loading") {
    return <p className="text-center py-8">Loading...</p>;
  }

  return (
    <div className="container mx-auto px-6 py-8 text-center">
      <h2 className="text-3xl font-bold mb-6">Sign In</h2>
      <button
        onClick={() => signIn("github", { callbackUrl })}
        className="bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-700 mb-4"
      >
        Sign in with GitHub
      </button>
      <br />
      <button
        onClick={() => signIn("google", { callbackUrl })}
        className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-500"
      >
        Sign in with Google
      </button>
    </div>
  );
}
