import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import localFont from "next/font/local";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { GoogleAnalytics } from "@/components/google-analytics";
import { HashLinkHistory } from "@/components/hash-link-history";
import { shareMetadata } from "@/lib/share-metadata";
import { getSiteUrl } from "@/lib/site-url";
import "./world.css";

// Mayo world fonts (see docs/plans/2026-11-16-biblia-visual-mundo-mayo.md).
// No handwritten accent: Juani decided Mayo does not "speak" in notes.
const worldSansFont = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

// Fraunces italic pinned to weight 400, the only one the serif uses (146 ->
// 71 KB preloaded); optical size and SOFT stay whole. Built by
// scripts/subset-fraunces.py from Google's Latin file. Its metric-matched
// fallback keeps next/font/google's numbers (world.css "Fraunces Fallback").
const worldSerifFont = localFont({
  src: "./fonts/fraunces-italic-latin.woff2",
  variable: "--font-fraunces",
  style: "italic",
  weight: "400",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Fraunces Fallback"],
});

const googleAnalyticsId =
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? "G-F2DHJCS51K";

// Search title and description carry the searches Juani wants to win
// (docs/plans/2026-11-22-seo-rendimiento.md); share cards keep the slogan.
const homeTitle = "Mayofy — Páginas web con turnos online y sistemas a medida";
const homeDescription =
  "Diseño de páginas web para negocios de servicios: landing pages, sistemas de gestión con turnos online y sistemas a medida en Argentina y LATAM. Charla gratis para empezar.";
const shareTitle = "Mayofy — webs que venden, sistemas que ordenan";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: homeTitle,
    template: "%s — Mayofy",
  },
  description: homeDescription,
  applicationName: "Mayofy",
  authors: [{ name: "Mayofy" }],
  creator: "Mayofy",
  alternates: { canonical: "/" },
  ...shareMetadata({ title: shareTitle, description: homeDescription, path: "/" }),
  // Search Console ownership through a meta tag, only when the token is set
  // (a DNS TXT record on mayofy.dev is the preferred route, see the SEO plan).
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-AR"
      className={`${worldSansFont.variable} ${worldSerifFont.variable}`}
    >
      <body>
        {children}
        <HashLinkHistory />
        {googleAnalyticsId ? (
          <>
            <GoogleAnalytics gaId={googleAnalyticsId} />
            <AnalyticsTracker />
          </>
        ) : null}
      </body>
    </html>
  );
}
