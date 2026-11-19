"use client";

import { useEffect, useState } from "react";

import { useActiveIsland } from "@/components/world/use-active-island";
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
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z" />
        </svg>
      </a>
    </>
  );
}
