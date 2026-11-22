"use client";

import { useEffect } from "react";

/** Share of the homing stretch (from its start) by which a loop must be home, whatever the time it had. */
const HOME_BY = 0.25;

/** Strip loops: ms per painted frame (the illustrator's ping-pongs: 22 steps of 110 and 120 ms). */
const MIRA_STEP = 110;
const SENTADA_STEP = 120;
const FRAMES = 12;

type Loop = {
  img: HTMLImageElement;
  step: number;
  frame: number;
  dir: 1 | -1;
  elapsed: number;
  /** Where (cover %) and on which frame it started stepping home, or null while not homing. */
  home: { at: number; frame: number } | null;
};

/**
 * The clock of Mayo's two loops on island 3 (watching, seated). They play on
 * their own time, but every hand-over to or from a scroll-driven strip must
 * fall on the same painted frame (Juani, 22 November 2026: "la cabeza de mayo
 * que salta el cuadro"). So, by the position on the `--rocks` range (cover %):
 *
 * - Watching plays until `miraRest`, then steps back to its first frame at
 *   twice its pace and holds it, so when the hop takes over at `miraEnd` its
 *   first frame (the same painting) follows; from `miraEnd` on, hidden, it
 *   holds its first frame, ready for a scroll back. However fast the reader
 *   scrolls, the frame is also pulled home by the position: it reaches the
 *   first frame within the first quarter of that stretch, so even a wheel
 *   notch that jumps most of the stretch shows the first frame before the
 *   hand-over.
 * - Seated holds its first frame (the last of sitting down) until
 *   `sentadaLoop`, a little after it takes over at `sentadaStart`, and only
 *   then breathes; scrolling back it steps home to its first frame before
 *   sitting down takes over again, and holds it while hidden.
 *
 * The frame is written as the strip's `transform` (one cell per frame). It
 * runs only while the island is on screen, never with reduced motion, and
 * without JavaScript both strips rest on their first frame.
 */
export function PacksMayoClock({
  miraRest,
  miraEnd,
  sentadaStart,
  sentadaLoop,
}: {
  miraRest: number;
  miraEnd: number;
  sentadaStart: number;
  sentadaLoop: number;
}) {
  useEffect(() => {
    const section = document.getElementById("packs");
    const miraImg = section?.querySelector<HTMLImageElement>(".packs-mayo__strip--mira img");
    const sentadaImg = section?.querySelector<HTMLImageElement>(".packs-mayo__strip--sentada img");
    if (!section || !miraImg || !sentadaImg) return;

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduced = () => reducedQuery.matches || document.documentElement.dataset.motionTier === "reduced";
    // Without scroll-driven animations only the seated strip shows, and it simply loops.
    const scrollDriven = CSS.supports("animation-timeline: view()");

    const mira: Loop = { img: miraImg, step: MIRA_STEP, frame: 0, dir: 1, elapsed: 0, home: null };
    const sentada: Loop = { img: sentadaImg, step: SENTADA_STEP, frame: 0, dir: 1, elapsed: 0, home: null };

    const paint = (loop: Loop) => {
      loop.img.style.transform = `translateX(${(-100 * loop.frame) / FRAMES}%)`;
    };
    const progress = () => {
      const box = section.getBoundingClientRect();
      return ((window.innerHeight - box.top) / (box.height + window.innerHeight)) * 100;
    };

    /**
     * One loop's frame for this moment: playing ping-pong, stepping home to
     * its first frame (`left`: the share, 1 to 0, of the homing stretch still
     * left before the hand-over), or held there.
     */
    const advance = (loop: Loop, delta: number, mode: "play" | "home" | "hold", at: number, left = 1) => {
      if (mode === "hold") {
        loop.frame = 0;
        loop.dir = 1;
        loop.elapsed = 0;
        loop.home = null;
        return;
      }
      if (mode === "home") loop.home ??= { at, frame: loop.frame };
      else loop.home = null;
      const step = mode === "home" ? loop.step / 2 : loop.step;
      loop.elapsed += delta;
      while (loop.elapsed >= step) {
        loop.elapsed -= step;
        if (mode === "home") {
          if (loop.frame > 0) loop.frame -= 1;
          loop.dir = 1;
        } else {
          if (loop.frame + loop.dir > FRAMES - 1 || loop.frame + loop.dir < 0) loop.dir = loop.dir === 1 ? -1 : 1;
          loop.frame += loop.dir;
        }
      }
      if (loop.home) {
        const pull = Math.max(0, Math.min(1, (left - (1 - HOME_BY)) / HOME_BY));
        loop.frame = Math.min(loop.frame, Math.floor(loop.home.frame * pull));
      }
    };
    const share = (value: number, from: number, to: number) => (value - to) / (from - to);

    let frameRequest = 0;
    let last = 0;
    let onScreen = false;

    const tick = (now: number) => {
      const delta = last ? Math.min(now - last, 100) : 0;
      last = now;
      const at = progress();
      if (scrollDriven) {
        advance(mira, delta, at >= miraEnd ? "hold" : at >= miraRest ? "home" : "play", at, share(at, miraRest, miraEnd));
        advance(sentada, delta, at < sentadaStart ? "hold" : at < sentadaLoop ? "home" : "play", at, share(at, sentadaLoop, sentadaStart));
      } else {
        advance(sentada, delta, "play", 0);
      }
      paint(mira);
      paint(sentada);
      frameRequest = window.requestAnimationFrame(tick);
    };

    const stop = () => {
      window.cancelAnimationFrame(frameRequest);
      frameRequest = 0;
      last = 0;
    };
    const update = () => {
      stop();
      if (onScreen && !reduced()) frameRequest = window.requestAnimationFrame(tick);
      if (reduced()) {
        mira.frame = 0;
        sentada.frame = 0;
        paint(mira);
        paint(sentada);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });
    observer.observe(section);
    reducedQuery.addEventListener("change", update);

    return () => {
      stop();
      observer.disconnect();
      reducedQuery.removeEventListener("change", update);
      miraImg.style.transform = "";
      sentadaImg.style.transform = "";
    };
  }, [miraRest, miraEnd, sentadaStart, sentadaLoop]);

  return null;
}
