import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize images for production
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable compression and optimizations
  compress: true,
  poweredByHeader: false,
  // Configure bundle analysis
  webpack: (config, { isServer }) => {
    // Optimize for client-side bundles
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  // Configure redirects if needed
  async redirects() {
    return [
      // Add any necessary redirects here
    ];
  },
  // Configure rewrites for API routes
  async rewrites() {
    return [
      // Add API rewrites if needed for production
    ];
  },
  // Add experimental features if needed
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react']
  }
};

export default nextConfig;
