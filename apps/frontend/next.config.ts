import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: require("path").join(__dirname, "../../"),
  turbopack: {
    // Optimize turbopack configuration
    resolveAlias: {
      "@": "./src",
    },
  },
  images: {
    domains: ["images.unsplash.com"],
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
