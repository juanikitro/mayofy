import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import {
  Cormorant_Garamond,
  IBM_Plex_Mono,
  Manrope,
} from "next/font/google";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
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
    "Landings, webs con turnos y sistemas a medida para negocios de servicios en Argentina y LATAM. Empezamos con una reunión de diagnóstico gratis.",
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
      "Landings, webs con turnos y sistemas a medida para negocios de servicios. Reunión de diagnóstico gratis.",
    images: [
      {
        url: "/images/hero-umbral-desktop.png",
        width: 1816,
        height: 866,
        alt: "Umbral Vivo, la dirección visual de Mayofy",
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
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body>{children}</body>
      {googleAnalyticsId ? <GoogleAnalytics gaId={googleAnalyticsId} /> : null}
    </html>
  );
}
