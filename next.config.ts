import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 80, 90],
  },
  // Secondary domains redirect to the canonical domain (see docs/ops/domains.md).
  async redirects() {
    return ["www.mayofy.dev", "mayofy.juanikitro.com"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: "https://mayofy.dev/:path*",
      permanent: true,
    }));
  },
  async headers() {
    // Painted plates, Mayo strips and captures in public/ are served with
    // `max-age=0` by default, so every visit revalidates ~150 images. They are
    // renamed when redrawn (v2, v3...), so a week of browser cache plus a
    // month of background revalidation is safe; an image replaced under the
    // same name can show its old version to returning visitors for up to a week.
    const publicAssetCache = {
      key: "Cache-Control",
      value: "public, max-age=604800, stale-while-revalidate=2592000",
    };
    return [
      { source: "/images/:path*", headers: [publicAssetCache] },
      { source: "/mayo/:path*", headers: [publicAssetCache] },
      { source: "/og/:path*", headers: [publicAssetCache] },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // HTTPS only for a year; no includeSubDomains/preload until every
          // subdomain is known to serve HTTPS (docs/ops/domains.md).
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
          // Nobody frames the site (it frames Cal.com, not the other way round).
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
