"use client";

import { Suspense, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginInner() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    if (status === "authenticated") {
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

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading login page...</div>}>
      <LoginInner />
    </Suspense>
  );
}
