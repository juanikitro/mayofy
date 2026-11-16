import { siteContent } from "@/content/site";
import { getWhatsAppHref } from "@/lib/whatsapp";

/**
 * Floating pill navigation. The vertical slice only links to the islands
 * that exist (hero and packs); "Trabajos" and "Preguntas" join when their
 * islands are built.
 */
export function IslandNav() {
  return (
    <header className="island-nav-wrap">
      <nav className="island-nav" aria-label="Navegación principal">
        <a className="island-nav__brand" href="#inicio">
          Mayofy
        </a>
        <a className="island-nav__link" href="#packs">
          Packs
        </a>
        <a
          className="btn btn--moss island-nav__cta"
          href={getWhatsAppHref(siteContent.hero.primaryMessage)}
        >
          Agendá tu diagnóstico
        </a>
      </nav>
    </header>
  );
}
