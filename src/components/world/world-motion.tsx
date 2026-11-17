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

/** Signals behind the tier decision, shown by the `?diag` overlay. */
export function describeMotionSignals(nav: NavigatorWithHints, reducedMotion: boolean) {
  let webgl = false;
  try {
    const probe = document.createElement("canvas");
    webgl = Boolean(probe.getContext("webgl2") ?? probe.getContext("webgl"));
  } catch {
    webgl = false;
  }
  return {
    tier: detectMotionTier(nav, reducedMotion),
    reducedMotion,
    saveData: nav.connection?.saveData ?? null,
    effectiveType: nav.connection?.effectiveType ?? null,
    deviceMemory: nav.deviceMemory ?? null,
    cores: nav.hardwareConcurrency ?? null,
    webgl,
    dpr: window.devicePixelRatio,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    ua: nav.userAgent.slice(0, 90),
  };
}

export function WorldMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const diag = new URLSearchParams(window.location.search).has("diag");
    let badge: HTMLPreElement | null = null;

    function apply() {
      const nav = navigator as NavigatorWithHints;
      root.dataset.motionTier = detectMotionTier(nav, media.matches);
      if (diag) {
        badge ??= document.body.appendChild(document.createElement("pre"));
        badge.className = "motion-diag";
        const signals = describeMotionSignals(nav, media.matches);
        badge.textContent = Object.entries(signals)
          .map(([key, value]) => `${key}: ${String(value)}`)
          .join("
");
      }
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
