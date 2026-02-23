import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api-proxy/:path*",
        destination: `${process.env.NEXT_PUBLIC_BOT_API_URL || "http://miami.vexanode.cloud:2009"}/:path*`, // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
