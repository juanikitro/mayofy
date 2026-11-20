"use client";

import Link from "next/link";

import { islandIds } from "@/components/world/island-progress";
import { useActiveIsland } from "@/components/world/use-active-island";

const links = [
  { id: "packs", label: "Packs" },
  { id: "trabajos", label: "Trabajos" },
  { id: "preguntas", label: "Preguntas" },
] as const;

/**
 * Floating pill navigation: Packs, Trabajos, Preguntas and the CTA
 * (decision 15). Links are absolute so the pill works from any route; on the
 * home page the link of the island in view is marked as the current location.
 */
export function IslandNav() {
  const active = useActiveIsland(islandIds);

  return (
    <header className="island-nav-wrap">
      <nav className="island-nav" aria-label="Navegación principal">
        <Link className="island-nav__brand" href="/#inicio">
          Mayofy
        </Link>
        {links.map((link) => (
          <Link
            className="island-nav__link"
            href={`/#${link.id}`}
            key={link.id}
            aria-current={active === link.id ? "location" : undefined}
          >
            {link.label}
          </Link>
        ))}
        <Link className="btn btn--moss island-nav__cta" href="/#agenda">
          Agendá tu diagnóstico
        </Link>
      </nav>
    </header>
  );
}
