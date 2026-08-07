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
    default: "Mayofy — páginas web que abren conversaciones",
    template: "%s — Mayofy",
  },
  description:
    "Diseñamos páginas web y landings para negocios de servicios que ya reciben atención y necesitan convertirla en consultas.",
  applicationName: "Mayofy",
  authors: [{ name: "Mayofy" }],
  creator: "Mayofy",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_419",
    siteName: "Mayofy",
    title: "Mayofy — la consulta entra por acá",
    description:
      "Páginas web y landings con identidad para transformar atención existente en conversaciones reales.",
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
    title: "Mayofy — la consulta entra por acá",
    description:
      "Páginas web y landings con identidad para negocios de servicios.",
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
      lang="es"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body>{children}</body>
      {googleAnalyticsId ? <GoogleAnalytics gaId={googleAnalyticsId} /> : null}
    </html>
  );
}
