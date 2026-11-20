"use client";

import { useEffect, useState } from "react";

/**
 * The island that fills most of the viewport, by section id. Returns null on
 * routes without islands (or before the first observation), so callers can
 * mark nothing as current there.
 */
export function useActiveIsland(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(" ");

  useEffect(() => {
    const sections = key
      .split(" ")
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (!("IntersectionObserver" in window) || sections.length === 0) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let bestId: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestId) setActive(bestId);
      },
      { threshold: [0.1, 0.25, 0.5, 0.75] },
    );
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [key]);

  return active;
}
