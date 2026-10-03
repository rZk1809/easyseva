import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the filesystem root so Turbopack ignores stray lockfiles in parent
  // directories and resolves modules from this project only.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
