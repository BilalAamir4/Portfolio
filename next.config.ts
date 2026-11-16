import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // cacheComponents (and partialPrefetching, which needs it) are off: the
  // site is fully static, and /work/[slug] relies on dynamicParams = false,
  // which Cache Components does not support.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
