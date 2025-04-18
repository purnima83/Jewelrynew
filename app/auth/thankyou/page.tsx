// /app/auth/thankyou/page.tsx

"use client";

export default function ThankyouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Connected to eBay!</h1>
        <p className="text-gray-700 mb-6">
          Your account has been successfully authorized.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
}
