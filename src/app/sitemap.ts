import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getSiteUrl().toString(),
      lastModified: new Date("2026-07-12"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
