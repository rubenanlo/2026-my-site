import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["sonner", "motion", "cmdk"],
    useCache: false,
  },
};

export default nextConfig;
