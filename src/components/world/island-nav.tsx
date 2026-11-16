import { siteContent } from "@/content/site";
import { getWhatsAppHref } from "@/lib/whatsapp";

/** Floating pill navigation: Packs, Trabajos, Preguntas and the CTA (decision 15). */
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
        <a className="island-nav__link" href="#trabajos">
          Trabajos
        </a>
        <a className="island-nav__link" href="#preguntas">
          Preguntas
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
