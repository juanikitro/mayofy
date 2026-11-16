"use client";

import { useEffect } from "react";

type NavigatorWithHints = Navigator & {
  connection?: { saveData?: boolean; effectiveType?: string };
  deviceMemory?: number;
};

export type MotionTier = "full" | "lite" | "reduced";

const slowConnections = new Set(["slow-2g", "2g", "3g"]);

/**
 * Picks the performance tier for the island world and exposes it as
 * `data-motion-tier` on <html>. CSS owns every visual consequence, so the
 * page already works before this runs: scroll-driven animations are gated by
 * @supports and reduced motion by the media query. This only adds the
 * "lite" tier, which the browser cannot detect on its own.
 */
export function detectMotionTier(nav: NavigatorWithHints, reducedMotion: boolean): MotionTier {
  if (reducedMotion) return "reduced";
  const connection = nav.connection;
  if (connection?.saveData) return "lite";
  if (connection?.effectiveType && slowConnections.has(connection.effectiveType)) return "lite";
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2) return "lite";
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 2) return "lite";
  return "full";
}

export function WorldMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    function apply() {
      root.dataset.motionTier = detectMotionTier(
        navigator as NavigatorWithHints,
        media.matches,
      );
    }

    apply();
    media.addEventListener("change", apply);

    return () => {
      media.removeEventListener("change", apply);
      delete root.dataset.motionTier;
    };
  }, []);

  return null;
}
