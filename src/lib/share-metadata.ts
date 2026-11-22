import type { Metadata } from "next";

/** The default share card (scripts/og-cards.mjs renders every card in public/og/). */
export const homeShareImage = {
  url: "/og/home.jpg",
  width: 1200,
  height: 630,
  alt: "Mayofy: webs que venden, sistemas que ordenan. Mayo sentada en la isla del amanecer.",
} as const;

type ShareInput = {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  type?: "website" | "article";
};

/**
 * Open Graph and Twitter tags for one page. A page that sets `openGraph`
 * replaces the layout's whole object (Next.js does not merge it), so every
 * page builds the full set here instead of inheriting the home's title and URL.
 */
export function shareMetadata({ title, description, path, image = homeShareImage, type = "website" }: ShareInput): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type,
      locale: "es_AR",
      siteName: "Mayofy",
      url: path,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}
