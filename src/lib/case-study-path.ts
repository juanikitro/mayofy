const prefix = "/proyectos/";

/**
 * The project slug of a case study path ("/proyectos/shineapp" → "shineapp"),
 * or undefined for any other page. A malformed escape such as "%E0%A4%A"
 * keeps the raw text instead of throwing, so a hand-typed URL never breaks
 * the page's analytics.
 */
export function caseStudyProject(pathname: string) {
  if (!pathname.startsWith(prefix)) return undefined;
  const slug = pathname.slice(prefix.length);
  if (!slug) return undefined;
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}
