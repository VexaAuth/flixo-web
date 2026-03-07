import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api-proxy/:path*",
        destination: `${process.env.NEXT_PUBLIC_BOT_API_URL || "https://top.visionhost.cloud:2004"}/:path*`, // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
