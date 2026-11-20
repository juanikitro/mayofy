"use client";

import { useEffect } from "react";

import { guideScrollTo, onScrollRest } from "@/components/world/guided-scroll";

/**
 * Soft full-page scroll between the sections of the world (Juani, 20 November
 * 2026: "full page scroll con scroll snapping entre secciones (no tan
 * estricto)").
 *
 * Rest points are where a section starts and, for a section taller than the
 * screen, where its last screen ends; the edges of the two guided pins
 * (island 4 and the six steps) count too. When a scroll by the reader ends:
 *
 * - On a seam (two rest points about a screen apart, so the screen shows part
 *   of one section and part of the next) the page always settles, on to the
 *   next point in the direction of travel: one wheel notch is enough.
 * - Inside a tall section it only settles when the point ahead is within a
 *   quarter of a screen, never back, so scroll-driven scenes can be read at
 *   any position.
 * - Inside a guided pin it does nothing: SenderoController and
 *   WorkshopController own those stretches.
 *
 * It never reacts to a scroll it did not see the reader start (a focus moved
 * by Tab, an in-page link, find in page), and never with reduced motion. It
 * uses the same calm, interruptible guided scroll as the pins, not CSS scroll
 * snapping, which would re-snap every frame of those guided scrolls.
 */

/** Pinned stretches owned by another controller: the track, and the stage that is sticky while it pins. */
const guidedPins = [
  { track: ".workshop", stage: ".workshop__stage" },
  { track: ".sendero", stage: ".sendero__stage" },
] as const;

const scrollKeys = new Set(["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Home", "End"]);

/** Two rest points this close (in screens) form a seam between sections. */
const SEAM = 1.1;
/** A travel shorter than this (px) is a nudge, not a direction. */
const JITTER = 24;
/** Reach of the point ahead inside a tall section, in screens. */
const REACH = 0.25;

export function SectionSnap() {
  useEffect(() => {
    const main = document.getElementById("contenido");
    if (!main) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

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
      points.push(maxScroll());
      const limit = maxScroll();
      return [...new Set(points.map((point) => Math.round(Math.min(limit, Math.max(0, point)))))].sort((a, b) => a - b);
    };

    /** Where the page should settle from `y`, after travelling `travel` px, or null to leave it. */
    const settleTarget = (y: number, travel: number) => {
      const height = window.innerHeight;
      const owned = pins();
      if (owned.some((pin) => y > pin.from + 1 && y < pin.to - 1)) return null;
      const points = restPoints(owned);
      if (points.some((point) => Math.abs(point - y) <= 1)) return null;
      const next = points.findIndex((point) => point > y);
      const above = next === -1 ? points.at(-1) : next === 0 ? undefined : points[next - 1];
      const below = next === -1 ? undefined : points[next];
      if (above !== undefined && below !== undefined && below - above <= height * SEAM) {
        // A nudge too small to mean anything goes back to the nearer point.
        if (Math.abs(travel) < JITTER) return y - above <= below - y ? above : below;
        return travel > 0 ? below : above;
      }
      // Inside a tall section only the point ahead pulls, so the reader is never dragged back.
      const ahead = travel >= 0 ? below : above;
      return ahead !== undefined && Math.abs(ahead - y) <= height * REACH ? ahead : null;
    };

    // Only settle after a scroll the reader started with a wheel, a touch, a
    // scroll key or the scrollbar.
    let readerScroll = false;
    const onWheel = () => {
      readerScroll = true;
    };
    const onKey = (event: KeyboardEvent) => {
      readerScroll = scrollKeys.has(event.key) && !event.ctrlKey && !event.metaKey && !event.altKey;
    };
    const onPointer = (event: PointerEvent) => {
      // A press on the page's scrollbar lands on the root element.
      readerScroll = event.target === document.documentElement;
    };

    let restingY = window.scrollY;
    const settle = () => {
      const y = window.scrollY;
      const travel = y - restingY;
      restingY = y;
      const fromReader = readerScroll;
      readerScroll = false;
      if (!fromReader || reduced.matches || document.documentElement.dataset.motionTier === "reduced") return;
      const target = settleTarget(y, travel);
      if (target === null) return;
      const distance = Math.abs(target - y) / window.innerHeight;
      void guideScrollTo(target, Math.min(900, 380 + distance * 520)).then(() => {
        restingY = window.scrollY;
      });
    };

    const stopRest = onScrollRest(settle);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      stopRest();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  return null;
}
