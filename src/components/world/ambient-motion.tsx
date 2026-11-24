"use client";

import { useEffect } from "react";

import { type SceneDepth, createSceneDepth } from "@/components/world/scene-depth";
import { afterLoadIdle } from "@/lib/after-load";
import { type AmbientTier, detectAmbientTier, normalisedPointer } from "@/lib/ambient";

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
 * It also runs the pointer depth (createSceneDepth) on desktop.
 *
 * Without JavaScript none of this happens and the islands keep their still art.
 */
export function AmbientMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let depth: SceneDepth | null = null;

    // Pointer depth: desktop mice and trackpads only, on the full tier.
    function onPointer(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      const { x, y } = normalisedPointer(event.clientX, event.clientY, window.innerWidth, window.innerHeight);
      depth?.aim(x, y);
    }
    function onLeave(event: PointerEvent) {
      if (event.pointerType === "mouse") depth?.aim(0, 0);
    }
    function syncDepth() {
      const wanted = root.dataset.ambient === "full" && finePointer.matches;
      if (wanted && !depth) {
        depth = createSceneDepth();
        window.addEventListener("pointermove", onPointer, { passive: true });
        document.documentElement.addEventListener("pointerleave", onLeave);
      } else if (!wanted && depth) {
        window.removeEventListener("pointermove", onPointer);
        document.documentElement.removeEventListener("pointerleave", onLeave);
        depth.dispose();
        depth = null;
      }
    }

    function applyTier() {
      const nav = navigator as NavigatorWithHints;
      const tier: AmbientTier = detectAmbientTier({
        reducedMotion: media.matches || root.dataset.motionTier === "reduced",
        saveData: nav.connection?.saveData ?? null,
        deviceMemory: nav.deviceMemory ?? null,
        cores: nav.hardwareConcurrency ?? null,
      });
      root.dataset.ambient = tier;
      syncDepth();
    }
    applyTier();
    media.addEventListener("change", applyTier);
    finePointer.addEventListener("change", syncDepth);

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
      finePointer.removeEventListener("change", syncDepth);
      root.dataset.ambient = "off";
      syncDepth();
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
