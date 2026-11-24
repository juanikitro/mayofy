"use client";

import { useEffect } from "react";

import { afterLoadIdle } from "@/lib/after-load";
import { type AmbientTier, detectAmbientTier } from "@/lib/ambient";

type NavigatorWithHints = Navigator & {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
};

/** How far ahead (viewport heights) an island's ambient layers join the page. */
const NEAR_AHEAD = 1;

/**
 * Root of the ambient motion (docs/plans/2026-11-24-ambiente.md). Sets
 * `html[data-ambient]` (full, lite or off; see detectAmbientTier) and marks
 * every island section with:
 *
 * - `data-ambient-near`: once the page has loaded and the reader is within
 *   a screen of it. Until then its ambient layers are `display: none`, so
 *   they never compete with the first load.
 * - `data-ambient-live`: while any of it is on screen. The ambient CSS
 *   animations pause without it, and the scripted effects (birds, shooting
 *   star, breeze) only run while it is set.
 *
 * Without JavaScript none of this happens and the islands keep their still art.
 */
export function AmbientMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    function applyTier() {
      const nav = navigator as NavigatorWithHints;
      const tier: AmbientTier = detectAmbientTier({
        reducedMotion: media.matches || root.dataset.motionTier === "reduced",
        saveData: nav.connection?.saveData ?? null,
        deviceMemory: nav.deviceMemory ?? null,
        cores: nav.hardwareConcurrency ?? null,
      });
      root.dataset.ambient = tier;
    }
    applyTier();
    media.addEventListener("change", applyTier);

    const sections = [...document.querySelectorAll<HTMLElement>("main section[data-island]")];

    const live = new IntersectionObserver((entries) => {
      for (const entry of entries) (entry.target as HTMLElement).toggleAttribute("data-ambient-live", entry.isIntersecting);
    });
    for (const section of sections) live.observe(section);

    let near: IntersectionObserver | null = null;
    const cancelIdle = afterLoadIdle(() => {
      near = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            (entry.target as HTMLElement).dataset.ambientNear = "";
            near?.unobserve(entry.target);
          }
        },
        { rootMargin: `${NEAR_AHEAD * 100}% 0px` },
      );
      for (const section of sections) near.observe(section);
    });

    return () => {
      media.removeEventListener("change", applyTier);
      live.disconnect();
      near?.disconnect();
      cancelIdle();
      for (const section of sections) {
        section.removeAttribute("data-ambient-live");
        delete section.dataset.ambientNear;
      }
      delete root.dataset.ambient;
    };
  }, []);

  return null;
}
