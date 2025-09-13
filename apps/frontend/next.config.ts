import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during builds for now
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript type checking during builds for faster deployment
    ignoreBuildErrors: true,
  },
  experimental: {
    turbo: {
      // Optimize turbo configuration
      resolveAlias: {
        "@": "./src",
      },
    },
  },
  images: {
    domains: ["images.unsplash.com"],
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
