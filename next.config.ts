import type { NextConfig } from "next";

// Fully static export: `npm run build` writes plain HTML/CSS/JS to ./out,
// which Cloudflare Pages (free plan) serves from its CDN. No server needed.
// Security headers live in public/_headers (Cloudflare Pages reads that file).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
