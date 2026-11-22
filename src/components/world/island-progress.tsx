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
 * What the reader fills in or picks from: the agenda and the contact form.
 * While one of them is on screen the floating controls step aside, so they
 * never sit on a field or a time slot (simulated user test, M5).
 */
const clearZoneSelector = "#agenda, .contact-form";

/** How long the name of a newly reached island shows over its paw. */
const announceMs = 2500;

/**
 * Paw-print progress indicator (side on desktop, bottom on mobile) and the
 * mobile WhatsApp float that appears from island 2 on. Both are pure
 * enhancement: the islands are reachable by scrolling and by the nav. The
 * float hides on island 6, which has its own WhatsApp buttons, and both
 * step aside over the agenda and the form. When the reader reaches a new
 * island its paw shows the island's name for a moment, so the paws read as
 * places and not as decoration.
 */
export function IslandProgress() {
  const active = useActiveIsland(islandIds) ?? "inicio";
  const activeIndex = islandIds.indexOf(active as (typeof islandIds)[number]);
  const [pastHero, setPastHero] = useState(false);
  const [inClearZone, setInClearZone] = useState(false);
  const [lastActive, setLastActive] = useState(active);
  const [announced, setAnnounced] = useState<string | null>(null);

  if (active !== lastActive) {
    setLastActive(active);
    setAnnounced(active);
  }

  useEffect(() => {
    if (!announced) return;
    const timer = window.setTimeout(() => setAnnounced(null), announceMs);
    return () => window.clearTimeout(timer);
  }, [announced]);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero || !("IntersectionObserver" in window)) return;
    const heroObserver = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting), {
      threshold: 0.2,
    });
    heroObserver.observe(hero);
    return () => heroObserver.disconnect();
  }, []);

  useEffect(() => {
    const zones = document.querySelectorAll(clearZoneSelector);
    if (zones.length === 0 || !("IntersectionObserver" in window)) return;
    const visible = new Set<Element>();
    const zoneObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setInClearZone(visible.size > 0);
    });
    zones.forEach((zone) => zoneObserver.observe(zone));
    return () => zoneObserver.disconnect();
  }, []);

  const floatVisible = pastHero && active !== "contacto" && !inClearZone;

  return (
    <>
      <nav className="progress" aria-label="Islas del recorrido" data-clear={inClearZone ? "true" : undefined}>
        <ol>
          {islands.map((island) => (
            <li key={island.id}>
              <a
                href={`#${island.id}`}
                className="progress__paw"
                aria-current={active === island.id ? "location" : undefined}
                data-visited={island.number - 1 < activeIndex ? "true" : undefined}
                data-announce={announced === island.id ? "true" : undefined}
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
        className={`wa-float${floatVisible ? " wa-float--visible" : ""}`}
        href={getWhatsAppHref(siteContent.hero.primaryMessage)}
        target="_blank"
        rel="noreferrer"
        aria-label="Escribir por WhatsApp"
        tabIndex={floatVisible ? 0 : -1}
        aria-hidden={!floatVisible}
      >
        <WhatsAppIcon />
      </a>
    </>
  );
}
