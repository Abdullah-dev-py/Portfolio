import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages (no server features used).
  output: "export",
};

export default nextConfig;
