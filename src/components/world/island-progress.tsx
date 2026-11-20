"use client";

import { useEffect, useState } from "react";

import { useActiveIsland } from "@/components/world/use-active-island";
import { WhatsAppIcon } from "@/components/world/whatsapp-icon";
import { siteContent } from "@/content/site";
import { getWhatsAppHref } from "@/lib/whatsapp";

export const islands = [
  { id: "inicio", number: 1, label: "Inicio" },
  { id: "problema", number: 2, label: "El problema" },
  { id: "packs", number: 3, label: "Packs" },
  { id: "sistemas", number: 4, label: "Sistemas" },
  { id: "trabajos", number: 5, label: "Trabajos" },
  { id: "contacto", number: 6, label: "Contacto" },
  { id: "preguntas", number: 7, label: "Preguntas" },
] as const;

export const islandIds = islands.map((island) => island.id);

function PawIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <ellipse cx="7" cy="8" rx="2.2" ry="3" />
      <ellipse cx="12" cy="5.5" rx="2.2" ry="3" />
      <ellipse cx="17" cy="8" rx="2.2" ry="3" />
      <path d="M12 10c-4 0-7 3.5-7 6.5 0 2 1.5 3 3 3 1.3 0 2.4-.6 4-.6s2.7.6 4 .6c1.5 0 3-1 3-3 0-3-3-6.5-7-6.5z" />
    </svg>
  );
}

/**
 * Paw-print progress indicator (side on desktop, bottom on mobile) and the
 * mobile WhatsApp float that appears from island 2 on. Both are pure
 * enhancement: the islands are reachable by scrolling and by the nav.
 */
export function IslandProgress() {
  const active = useActiveIsland(islandIds) ?? "inicio";
  const activeIndex = islandIds.indexOf(active as (typeof islandIds)[number]);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero || !("IntersectionObserver" in window)) return;
    const heroObserver = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting), {
      threshold: 0.2,
    });
    heroObserver.observe(hero);
    return () => heroObserver.disconnect();
  }, []);

  return (
    <>
      <nav className="progress" aria-label="Islas del recorrido">
        <ol>
          {islands.map((island) => (
            <li key={island.id}>
              <a
                href={`#${island.id}`}
                className="progress__paw"
                aria-current={active === island.id ? "location" : undefined}
                data-visited={island.number - 1 < activeIndex ? "true" : undefined}
                aria-label={`Isla ${island.number}: ${island.label}`}
                data-label={island.label}
              >
                <PawIcon />
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <a
        className={`wa-float${pastHero ? " wa-float--visible" : ""}`}
        href={getWhatsAppHref(siteContent.hero.primaryMessage)}
        target="_blank"
        rel="noreferrer"
        aria-label="Escribir por WhatsApp"
        tabIndex={pastHero ? 0 : -1}
        aria-hidden={!pastHero}
      >
        <WhatsAppIcon />
      </a>
    </>
  );
}
