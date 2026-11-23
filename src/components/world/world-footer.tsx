import Link from "next/link";

import { legalEntity } from "@/content/legal";
import { publicChannels, siteContent } from "@/content/site";
import { getWhatsAppHref } from "@/lib/whatsapp";

/** Night footer shared by every route of the Mayo world. */
export function WorldFooter() {
  return (
    <footer className="world-footer">
      <div className="world-shell world-footer__layout">
        <p>{siteContent.hero.title}</p>
        <div className="world-footer__links">
          <a href={getWhatsAppHref()} target="_blank" rel="noreferrer">
            <span className="link-label">WhatsApp</span>
          </a>
          <a href={publicChannels.instagram} target="_blank" rel="noreferrer">
            <span className="link-label">Instagram</span>
          </a>
          <a href={publicChannels.linkedin} target="_blank" rel="noreferrer">
            <span className="link-label">LinkedIn</span>
          </a>
          <a href={`mailto:${publicChannels.email}`}>
            <span className="link-label">{publicChannels.email}</span>
          </a>
          <Link href="/privacidad">
            <span className="link-label">Privacidad</span>
          </Link>
          <Link href="/terminos">
            <span className="link-label">Términos</span>
          </Link>
        </div>
        <small>
          Mayofy · Webs y software a medida · Argentina y LATAM
          <br />
          {legalEntity.name} · CUIT {legalEntity.cuit}
        </small>
      </div>
    </footer>
  );
}
