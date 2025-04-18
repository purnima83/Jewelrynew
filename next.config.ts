/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "images.unsplash.com",
      "fakestoreapi.com",
      "i.ebayimg.com", // ✅ Allow eBay images
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // ✅ Allow all external images
      },
    ],
    unoptimized: true, // ✅ TURN OFF Image Optimization globally
  },
  experimental: {
    serverActions: { enable: true },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/fallback-db",
    EBAY_CLIENT_ID: process.env.EBAY_CLIENT_ID,
    EBAY_CLIENT_SECRET: process.env.EBAY_CLIENT_SECRET,
  },
};

console.log("✅ NEXT_PUBLIC_URL:", process.env.NEXT_PUBLIC_URL || "Not Found");
console.log("✅ NEXTAUTH_URL:", process.env.NEXTAUTH_URL || "Not Found");
console.log(
  "✅ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:",
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? "Loaded" : "Not Found"
);
console.log(
  "✅ STRIPE_SECRET_KEY:",
  process.env.STRIPE_SECRET_KEY ? "Loaded" : "Not Found"
);
console.log(
  "✅ MONGODB_URI:",
  process.env.MONGODB_URI ? "Loaded" : "Not Found"
);

module.exports = nextConfig;
