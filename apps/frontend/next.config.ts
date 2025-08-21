import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Basic optimizations
  compress: true,
  poweredByHeader: false,
  
  // Simple webpack config
  webpack: (config, { isServer }) => {
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
  
  // Experimental features
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react']
  }
};

export default nextConfig;
