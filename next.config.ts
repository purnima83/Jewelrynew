const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "images.unsplash.com",
      "fakestoreapi.com",
      "i.ebayimg.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
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
