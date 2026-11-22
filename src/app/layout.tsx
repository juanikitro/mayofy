import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Fraunces, Instrument_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "Mayofy — webs que venden, sistemas que ordenan",
    template: "%s — Mayofy",
  },
  description:
    "Landings, webs con turnos y sistemas a medida para negocios de servicios en Argentina y LATAM. Empezamos con una charla gratis.",
  applicationName: "Mayofy",
  authors: [{ name: "Mayofy" }],
  creator: "Mayofy",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Mayofy",
    title: "Mayofy — webs que venden, sistemas que ordenan",
    description:
      "Landings, webs con turnos y sistemas a medida para negocios de servicios. Charla gratis.",
    images: [
      {
        url: "/images/hero-umbral-desktop.png",
        width: 1816,
        height: 866,
        alt: "Mayofy: webs que venden, sistemas que ordenan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mayofy — webs que venden, sistemas que ordenan",
    description:
      "Landings, webs con turnos y sistemas a medida para negocios de servicios.",
    images: ["/images/hero-umbral-desktop.png"],
  },
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
      <body>{children}</body>
      {googleAnalyticsId ? <GoogleAnalytics gaId={googleAnalyticsId} /> : null}
    </html>
  );
}
