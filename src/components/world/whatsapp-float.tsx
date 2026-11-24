"use client";

import { useEffect, useState } from "react";

import { WhatsAppIcon } from "@/components/world/whatsapp-icon";
import { siteContent } from "@/content/site";
import { getWhatsAppHref } from "@/lib/whatsapp";

/**
 * What the reader fills in or picks from (the agenda, the contact form and
 * island 4's extras builder, whose "Tu consulta" bar holds the bottom of the
 * screen) and island 6, which has its own WhatsApp buttons. While one of them
 * is in the upper part of the screen the float steps aside, so it never sits
 * on a field, a time slot or the builder's bar (simulated user test, M5).
 */
const clearZoneSelector = "#contacto, #agenda, .contact-form, #sistemas";

/**
 * Mobile WhatsApp float, from the end of the hero on. Pure enhancement: the
 * hero and island 6 hold the same link.
 */
export function WhatsAppFloat() {
  const [pastHero, setPastHero] = useState(false);
  const [inClearZone, setInClearZone] = useState(false);

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
    const zoneObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setInClearZone(visible.size > 0);
      },
      { rootMargin: "0px 0px -40% 0px" },
    );
    zones.forEach((zone) => zoneObserver.observe(zone));
    return () => zoneObserver.disconnect();
  }, []);

  const visible = pastHero && !inClearZone;

  return (
    <a
      className={`wa-float${visible ? " wa-float--visible" : ""}`}
      href={getWhatsAppHref(siteContent.hero.primaryMessage)}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribir por WhatsApp"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <WhatsAppIcon />
    </a>
  );
}
