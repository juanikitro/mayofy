import Link from "next/link";

/**
 * Floating pill navigation: Packs, Trabajos, Preguntas and the CTA
 * (decision 15). Links are absolute so the pill works from any route.
 */
export function IslandNav() {
  return (
    <header className="island-nav-wrap">
      <nav className="island-nav" aria-label="Navegación principal">
        <Link className="island-nav__brand" href="/#inicio">
          Mayofy
        </Link>
        <Link className="island-nav__link" href="/#packs">
          Packs
        </Link>
        <Link className="island-nav__link" href="/#trabajos">
          Trabajos
        </Link>
        <Link className="island-nav__link" href="/#preguntas">
          Preguntas
        </Link>
        <Link className="btn btn--moss island-nav__cta" href="/#agenda">
          Agendá tu diagnóstico
        </Link>
      </nav>
    </header>
  );
}
