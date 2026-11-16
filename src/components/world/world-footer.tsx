import Link from "next/link";

import { publicChannels, siteContent } from "@/content/site";
import { getWhatsAppHref } from "@/lib/whatsapp";

/** Night footer shared by every route of the Mayo world. */
export function WorldFooter() {
  return (
    <footer className="world-footer">
      <div className="world-shell world-footer__layout">
        <p>{siteContent.hero.title}</p>
        <div className="world-footer__links">
          <a href={getWhatsAppHref()}>WhatsApp</a>
          <a href={publicChannels.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={publicChannels.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <Link href="/privacidad">Privacidad</Link>
        </div>
        <small>Mayofy · Webs y software a medida · Argentina y LATAM</small>
      </div>
    </footer>
  );
}
