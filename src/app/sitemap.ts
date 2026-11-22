import type { MetadataRoute } from "next";
import { publishedProjects } from "@/content/projects";
import { getSiteUrl } from "@/lib/site-url";

/*
 * Only canonical, indexable pages: the home, the published case studies and
 * the privacy policy. Placeholder case studies are never built in production.
 * Bump a date when that page's content really changes.
 */
const homeUpdated = new Date("2026-11-22");
const projectsUpdated = new Date("2026-11-22");
const privacyUpdated = new Date("2026-11-16");

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const url = (path: string) => new URL(path, siteUrl).toString();

  return [
    { url: url("/"), lastModified: homeUpdated, changeFrequency: "monthly", priority: 1 },
    ...publishedProjects.map((project) => ({
      url: url(`/proyectos/${project.slug}`),
      lastModified: projectsUpdated,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    { url: url("/privacidad"), lastModified: privacyUpdated, changeFrequency: "yearly", priority: 0.2 },
  ];
}
