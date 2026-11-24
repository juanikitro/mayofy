"use client";

import { useEffect } from "react";

import {
  addMomentumStops,
  easeOutQuad,
  guideScrollTo,
  motionAllowed,
  onGestureEnd,
  type Gesture,
} from "@/components/world/guided-scroll";

/**
 * Soft full-page scroll between the sections of the world (Juani, 20 November
 * 2026: "full page scroll con scroll snapping entre secciones (no tan
 * estricto)"; 22 November: keep the premium guided feel, but "el scroll
 * guiado esta molestando mas que ayudando"). Principles in
 * docs/plans/2026-11-20-scroll-por-secciones.md.
 *
 * Rest points are where a section starts and, for a section taller than the
 * screen, where its last screen ends; the edges of the two guided pins
 * (island 4 and the six steps) count too. A section adds its own (a key pose
 * of a scroll-driven scene) with a marker element in its scrolling flow, not
 * inside a sticky stage: `<span data-scroll-rest aria-hidden="true" />`,
 * positioned where the top of the screen should rest. Only once a gesture by the reader
 * is over (guided-scroll.ts, `onGestureEnd`), and only ever in its direction:
 *
 * - On a seam (two rest points about a screen apart, so the screen shows part
 *   of one section and part of the next), stepped input (a wheel notch, a
 *   scroll key) carries on to the next point: one notch is enough. Smooth
 *   input (touch, touchpad) has put the page where the reader wants it, so the
 *   seam is only finished when more than half of it is already behind.
 * - Inside a tall section it only settles when the point ahead is within a
 *   quarter of a screen, so scroll-driven scenes can be read at any position.
 * - Inside a guided pin it does nothing: SenderoController and
 *   WorkshopController own those stretches.
 * - A touch fling stops before the next rest point, so a flick never carries
 *   the reader past the end of a section (where its buttons are) or the start
 *   of the next one.
 * - Island 3 (packs-play.tsx) holds the page on its own top while its rocks
 *   assemble or come apart: it swallows the input, so the page does not move
 *   and no gesture ends there; its top is an ordinary rest point, where both
 *   the settle and the fling stop bring the reader.
 *
 * None of this with reduced motion, and never after a scroll nobody gestured for (a
 * focus moved by Tab, an in-page link, find in page). Not CSS scroll
 * snapping, which would re-snap every frame of the guided scrolls.
 */

/** Pinned stretches owned by another controller: the track, and the stage that is sticky while it pins. */
const guidedPins = [
  { track: ".workshop", stage: ".workshop__stage" },
  { track: ".sendero", stage: ".sendero__stage" },
] as const;

/** Two rest points this close (in screens) form a seam between sections. */
const SEAM = 1.1;
/** Reach of the point ahead inside a tall section, in screens. */
const REACH = 0.25;

export function SectionSnap() {
  useEffect(() => {
    const main = document.getElementById("contenido");
    if (!main) return;

    const pageTop = (element: Element) => element.getBoundingClientRect().top + window.scrollY;
    const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

    /** Pins currently pinned, as open scroll ranges. */
    const pins = () =>
      guidedPins.flatMap(({ track, stage }) => {
        const trackElement = document.querySelector<HTMLElement>(track);
        const stageElement = trackElement?.querySelector<HTMLElement>(stage);
        if (!trackElement || !stageElement || getComputedStyle(stageElement).position !== "sticky") return [];
        const top = pageTop(trackElement);
        return [{ from: top, to: top + trackElement.offsetHeight - window.innerHeight }];
      });

    /** Rest points sections declare on their own scenes' key poses (`data-scroll-rest`). */
    const scenePoses = () =>
      [...main.querySelectorAll("[data-scroll-rest]")].map((marker) => Math.round(pageTop(marker)));

    const restPoints = (owned: { from: number; to: number }[]) => {
      const height = window.innerHeight;
      const points: number[] = [];
      for (const section of main.children) {
        const top = pageTop(section);
        points.push(top);
        const end = top + (section as HTMLElement).offsetHeight - height;
        if (end > top + 1) points.push(end);
      }
      for (const pin of owned) points.push(pin.from, pin.to);
      // A section's own rest points: the page rests with the marker at the top of the screen.
      points.push(...scenePoses());
      points.push(maxScroll());
      const limit = maxScroll();
      return [...new Set(points.map((point) => Math.round(Math.min(limit, Math.max(0, point)))))].sort((a, b) => a - b);
    };

    /** Where the page should settle after `gesture`, or null to leave it where the reader did. */
    const settleTarget = ({ to: y, direction, stepped }: Gesture) => {
      const height = window.innerHeight;
      const owned = pins();
      if (owned.some((pin) => y > pin.from + 1 && y < pin.to - 1)) return null;
      const points = restPoints(owned);
      if (points.some((point) => Math.abs(point - y) <= 1)) return null;
      const next = points.findIndex((point) => point > y);
      const above = next === -1 ? points.at(-1) : next === 0 ? undefined : points[next - 1];
      const below = next === -1 ? undefined : points[next];
      const ahead = direction > 0 ? below : above;
      if (ahead === undefined) return null;
      if (above !== undefined && below !== undefined && below - above <= height * SEAM) {
        if (stepped) return ahead;
        const behind = direction > 0 ? y - above : below - y;
        return behind > (below - above) / 2 ? ahead : null;
      }
      return Math.abs(ahead - y) <= height * REACH ? ahead : null;
    };

    const stopGestures = onGestureEnd((gesture) => {
      if (!motionAllowed()) return;
      const target = settleTarget(gesture);
      if (target === null) return;
      // Calm and slowing down into the rest point. A scene's own pose comes at the scene's reading
      // pace, slower than a seam between sections, so the movement just before it reads.
      const distance = Math.abs(target - gesture.to) / window.innerHeight;
      const pose = scenePoses().some((point) => Math.abs(point - target) <= 1);
      const duration = pose ? Math.min(1600, 450 + distance * 1300) : Math.min(1100, 400 + distance * 700);
      void guideScrollTo(target, duration, easeOutQuad);
    });
    // Inside a pin its own controller sets the stops.
    const stopMomentum = addMomentumStops(() => {
      if (!motionAllowed()) return [];
      const owned = pins();
      return restPoints(owned).filter((point) => !owned.some((pin) => point > pin.from + 1 && point < pin.to - 1));
    });
    return () => {
      stopGestures();
      stopMomentum();
    };
  }, []);

  return null;
}
