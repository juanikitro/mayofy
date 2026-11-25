"use client";

import { useEffect } from "react";

import { type SceneDepth, createSceneDepth } from "@/components/world/scene-depth";
import { startTiltDepth } from "@/components/world/tilt-depth";
import { afterLoadIdle } from "@/lib/after-load";
import { type AmbientTier, autoTiltAllowed, detectAmbientTier, normalisedPointer } from "@/lib/ambient";

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
 * It also runs the depth (createSceneDepth): with the pointer on desktop,
 * and with the phone's tilt on phones (startTiltDepth, autoTiltAllowed). It
 * never asks for motion permission: where the browser sends no reading
 * without it (iOS Safari), the tilt stops listening and never shows.
 *
 * Without JavaScript none of this happens and the islands keep their still art.
 */
export function AmbientMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const phone = window.matchMedia("(hover: none) and (pointer: coarse)");
    let depth: SceneDepth | null = null;
    let mode: "pointer" | "tilt" | null = null;
    let stopTilt: (() => void) | null = null;
    // No usable reading arrived once (no gyroscope, or no permission on iOS): the tilt never starts again on this page.
    let noSensor = false;

    function onPointer(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      const { x, y } = normalisedPointer(event.clientX, event.clientY, window.innerWidth, window.innerHeight);
      depth?.aim(x, y);
    }
    function onLeave(event: PointerEvent) {
      if (event.pointerType === "mouse") depth?.aim(0, 0);
    }
    function stopDepth() {
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      stopTilt?.();
      stopTilt = null;
      depth?.dispose();
      depth = null;
      mode = null;
    }
    // Depth: desktop mice and trackpads, or the tilt of a phone; only on the full tier.
    function syncDepth() {
      const full = root.dataset.ambient === "full";
      const tilt =
        !noSensor &&
        autoTiltAllowed({ tier: full ? "full" : "off", phone: phone.matches, hasOrientation: "DeviceOrientationEvent" in window });
      const wanted = full && finePointer.matches ? "pointer" : tilt ? "tilt" : null;
      if (wanted === mode) return;
      stopDepth();
      if (!wanted) return;
      const scene = createSceneDepth();
      depth = scene;
      mode = wanted;
      if (wanted === "pointer") {
        window.addEventListener("pointermove", onPointer, { passive: true });
        document.documentElement.addEventListener("pointerleave", onLeave);
      } else {
        stopTilt = startTiltDepth(scene, () => {
          stopTilt = null;
          noSensor = true;
          stopDepth();
        });
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
    phone.addEventListener("change", syncDepth);

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
      phone.removeEventListener("change", syncDepth);
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
