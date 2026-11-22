import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Fraunces, Instrument_Sans } from "next/font/google";
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

const worldSerifFont = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["italic"],
  weight: "variable",
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const googleAnalyticsId =
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? "G-F2DHJCS51K";

const homeTitle = "Mayofy — webs que venden, sistemas que ordenan";
const homeDescription =
  "Landings, webs con turnos y sistemas a medida para negocios de servicios en Argentina y LATAM. Empezamos con una charla gratis.";

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
  ...shareMetadata({ title: homeTitle, description: homeDescription, path: "/" }),
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
      </body>
      {googleAnalyticsId ? <GoogleAnalytics gaId={googleAnalyticsId} /> : null}
    </html>
  );
}
