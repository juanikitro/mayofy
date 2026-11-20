"use client";

import { useEffect } from "react";

import { guideScrollTo, onScrollRest } from "@/components/world/guided-scroll";

/**
 * Island 4's guided scroll, only while its stage is pinned (motion allowed
 * and scroll-driven animations supported; world.css decides, this reads the
 * stage's `position`). Juani, 20 November 2026: "el scroll debe ser guiado
 * para pasar a estar en el centro siempre alguna". When a scroll ends with a
 * part off centre, the page carries on to the next part in the direction of
 * travel and centres it in the reading zone (the screen, or on phones the
 * space under the island) with a guided scroll (guided-scroll.ts). Past the
 * first or the last part, or more than one part away, it does nothing, so
 * the section is entered and left freely. With reduced motion the page is
 * never moved for the reader.
 */
export function WorkshopController() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>(".workshop");
    const stage = section?.querySelector<HTMLElement>(".workshop__stage");
    const parts = section ? [...section.querySelectorAll<HTMLElement>(".workshop__part")] : [];
    if (!section || !stage || parts.length < 2) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pinned = () => getComputedStyle(stage).position === "sticky";
    /** The reading zone, in viewport pixels (world.css sets `--workshop-zone-top` and `-bottom`). */
    const zone = () => {
      const style = getComputedStyle(section);
      const share = (name: string, fallback: number) => Number.parseFloat(style.getPropertyValue(name)) || fallback;
      return { top: (window.innerHeight * share("--workshop-zone-top", 0)) / 100, bottom: (window.innerHeight * share("--workshop-zone-bottom", 100)) / 100 };
    };

    let restingY = window.scrollY;
    const settle = () => {
      const travel = window.scrollY - restingY;
      restingY = window.scrollY;
      if (reduced.matches || document.documentElement.dataset.motionTier === "reduced" || !pinned()) return;
      const box = section.getBoundingClientRect();
      if (box.top > 0 || box.bottom < window.innerHeight) return;
      const { top: zoneTop, bottom: zoneBottom } = zone();
      // How far each part is from its rest: centred in the zone, or at its top when taller.
      const offsets = parts.map((part) => {
        const rect = part.getBoundingClientRect();
        return rect.top - (zoneTop + Math.max(0, (zoneBottom - zoneTop - rect.height) / 2));
      });
      // Already centred (a few pixels of rounding aside).
      if (offsets.some((offset) => Math.abs(offset) < 4)) return;
      const target = travel >= 0 ? offsets.find((offset) => offset > 0) : offsets.findLast((offset) => offset < 0);
      if (target === undefined) return;
      const spacing = Math.max(...offsets.slice(1).map((offset, index) => Math.abs(offset - offsets[index])));
      if (Math.abs(target) > spacing * 1.05) return;
      const top = Math.round(window.scrollY + target);
      // About a second for a whole part, so its object lights up at a readable pace.
      void guideScrollTo(top, Math.min(1200, Math.max(500, (Math.abs(target) / spacing) * 1100)));
    };
    const onGuidedEnd = () => {
      restingY = window.scrollY;
    };

    const stopRest = onScrollRest(settle);
    window.addEventListener("scrollend", onGuidedEnd);
    return () => {
      stopRest();
      window.removeEventListener("scrollend", onGuidedEnd);
    };
  }, []);

  return null;
}
