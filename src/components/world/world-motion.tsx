"use client";

import { useEffect } from "react";

type NavigatorWithHints = Navigator & {
  connection?: { saveData?: boolean; effectiveType?: string };
  deviceMemory?: number;
};

export type MotionTier = "full" | "reduced";

/**
 * Picks the motion tier for the island world and exposes it as
 * `data-motion-tier` on <html>. Only the user's reduced-motion preference
 * decides: every animation is CSS (scroll-driven or a stepped sprite), which
 * is cheap enough for any phone, so hardware and network hints never lower
 * the tier. CSS owns every visual consequence and the page already works
 * before this runs: the no-JS first paint is the assembled, still scene.
 */
export function detectMotionTier(reducedMotion: boolean): MotionTier {
  return reducedMotion ? "reduced" : "full";
}

/** Signals behind the tier decision, shown by the `?diag` overlay. */
export function describeMotionSignals(nav: NavigatorWithHints, reducedMotion: boolean) {
  return {
    tier: detectMotionTier(reducedMotion),
    prefersReducedMotion: reducedMotion,
    scrollTimeline: typeof CSS !== "undefined" && CSS.supports("animation-timeline: view()"),
    saveData: nav.connection?.saveData ?? null,
    effectiveType: nav.connection?.effectiveType ?? null,
    deviceMemory: nav.deviceMemory ?? null,
    cores: nav.hardwareConcurrency ?? null,
    dpr: window.devicePixelRatio,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    ua: nav.userAgent.slice(0, 90),
  };
}

/** `?diag` or `#diag` anywhere in the URL turns the overlay on. */
function wantsDiag(location: Location) {
  return new URLSearchParams(location.search).has("diag") || /(^|[#&])diag(=|&|$)/.test(location.hash);
}

export function WorldMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const diag = wantsDiag(window.location);
    let badge: HTMLPreElement | null = null;

    function apply() {
      const nav = navigator as NavigatorWithHints;
      root.dataset.motionTier = detectMotionTier(media.matches);
      if (!diag) return;
      const signals = describeMotionSignals(nav, media.matches);
      console.info("[motion]", signals);
      if (!badge) {
        badge = document.createElement("pre");
        badge.className = "motion-diag";
        badge.setAttribute("aria-hidden", "true");
        (document.body ?? root).appendChild(badge);
      }
      badge.textContent = Object.entries(signals)
        .map(([key, value]) => `${key}: ${String(value)}`)
        .join("\n");
    }

    apply();
    media.addEventListener("change", apply);

    return () => {
      media.removeEventListener("change", apply);
      badge?.remove();
      delete root.dataset.motionTier;
    };
  }, []);

  return null;
}
