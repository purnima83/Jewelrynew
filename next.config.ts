const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "images.unsplash.com",
      "i.ebayimg.com",
    ],
    unoptimized: true, // ⚡ Add this line
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
  },
};

export default nextConfig;
