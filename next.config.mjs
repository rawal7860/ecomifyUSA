/** @type {import('next').NextConfig} */
import { createRequire } from "module";

// Check if element-tagger is available
function isElementTaggerAvailable() {
  try {
    const require = createRequire(import.meta.url);
    require.resolve("@softgenai/element-tagger");
    return true;
  } catch {
    return false;
  }
}

// Build turbo rules only if tagger is available
function getTurboRules() {
  if (!isElementTaggerAvailable()) {
    console.log(
      "[Softgen] Element tagger not found, skipping loader configuration"
    );
    return {};
  }

  return {
    "*.tsx": ["@softgenai/element-tagger"],
    "*.jsx": ["@softgenai/element-tagger"],
  };
}

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: {
      rules: getTurboRules(),
    },
    // Next.js 15 tree-shakes lucide-react via optimizePackageImports — no manual
    // modularizeImports transform needed (a custom path breaks this lucide version).
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Enumerate only the domains we actually load images from. Avoid wildcards —
    // they turn Next.js into an open image proxy / SSRF surface.
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  eslint: {
    // Lint runs during `next build`. 0 errors today (122 warnings are non-blocking).
    // Errors will now correctly fail CI instead of being silently ignored.
    ignoreDuringBuilds: false,
  },
  allowedDevOrigins: ["*.daytona.work", "*.softgen.dev"],
};

export default nextConfig;
