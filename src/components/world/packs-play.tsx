"use client";

import { useEffect } from "react";

/** Share of the homing stretch (from its start) by which a loop must be home, whatever the time it had. */
const HOME_BY = 0.8;

/** Strip loops: ms per painted frame (the illustrator's ping-pongs: 22 steps of 110 and 120 ms). */
const MIRA_STEP = 110;
const SENTADA_STEP = 120;
const FRAMES = 12;

/** Share of the section on screen that starts the play: the island and its title are in view. */
const START_SHARE = 0.6;

/** Longest wait for the rock pieces and Mayo's strips before the play starts anyway (ms). */
const LOAD_WAIT = 1500;

type Loop = {
  img: HTMLImageElement;
  step: number;
  frame: number;
  dir: 1 | -1;
  elapsed: number;
  /** When (ms of the play) and on which frame it started stepping home, or null while not homing. */
  home: { at: number; frame: number } | null;
};

/** Resolves once `section` has `data-near` (NearGate): before it, the rock pieces are not even in the layout. */
function whenNear(section: HTMLElement) {
  if (section.hasAttribute("data-near")) return Promise.resolve();
  return new Promise<void>((resolve) => {
    const observer = new MutationObserver(() => {
      if (!section.hasAttribute("data-near")) return;
      observer.disconnect();
      resolve();
    });
    observer.observe(section, { attributes: true, attributeFilter: ["data-near"] });
  });
}

/** Resolves once every image has loaded or failed, or after LOAD_WAIT. */
function whenLoaded(images: HTMLImageElement[]) {
  const pending = images.filter((img) => !img.complete);
  const loaded = Promise.all(
    pending.map(
      (img) =>
        new Promise<void>((resolve) => {
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        }),
    ),
  );
  return Promise.race([loaded, new Promise((resolve) => setTimeout(resolve, LOAD_WAIT))]);
}

/**
 * Island 3's one play (Juani, 24 November 2026: "que se haga toda la
 * animacion de un solo paso"): once most of the section is on screen and its
 * art has arrived, it sets `data-play="run"` and world.css runs the whole
 * assembly in time (stage.ts rockTiming, packsMayo.timing), once per page
 * view. Before that every animation waits on its first frame (the rocks
 * floating, Mayo watching); after it everything holds its last (the painted
 * plate, Mayo seated), so scrolling past or back never finds it half built.
 *
 * It is also the clock of Mayo's two loops (watching, seated). They play on
 * their own time, but every hand-over to or from a timeline strip must fall
 * on the same painted frame (Juani, 22 November 2026: "la cabeza de mayo que
 * salta el cuadro"). So, by the time into the play (ms):
 *
 * - Watching plays until `miraRest`, then steps back to its first frame at
 *   its usual pace and holds it, so when the hop takes over at `miraEnd` its
 *   first frame (the same painting) follows; it is also pulled home by the
 *   time, so it is there before the end of that stretch.
 * - Seated holds its first frame (the last of sitting down) until
 *   `sentadaLoop`, a little after it takes over at `sentadaStart`, and only
 *   then breathes.
 *
 * The frame is written as the strip's `transform` (one cell per frame). The
 * loops run only while the island is on screen, never with reduced motion
 * (world.css then shows the assembled state), and without JavaScript both
 * strips rest on their first frame and the island stands built.
 */
export function PacksPlay({
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
    // world.css gates the timeline on the same query; where it does not apply the island stands built and only the seated loop plays.
    const timed = window.matchMedia("(scripting: enabled)").matches;

    const mira: Loop = { img: miraImg, step: MIRA_STEP, frame: 0, dir: 1, elapsed: 0, home: null };
    const sentada: Loop = { img: sentadaImg, step: SENTADA_STEP, frame: 0, dir: 1, elapsed: 0, home: null };

    const paint = (loop: Loop) => {
      loop.img.style.transform = `translateX(${(-100 * loop.frame) / FRAMES}%)`;
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
      const step = loop.step;
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
        const eased = pull * pull * (3 - 2 * pull);
        loop.frame = Math.min(loop.frame, Math.round(loop.home.frame * eased));
      }
    };
    const share = (value: number, from: number, to: number) => (value - to) / (from - to);

    /**
     * When the play started, on the page's clock, or null before it (the
     * timeline then waits on its first frame). Read from the CSS animation of
     * Mayo's watching window (delay 0), which starts a frame or more after
     * `data-play` is set, so the loops keep in step with the strips.
     */
    let startedAt: number | null = null;
    let lead: Animation | undefined;
    let frameRequest = 0;
    let last = 0;
    let onScreen = false;
    let disposed = false;

    const tick = (now: number) => {
      const delta = last ? Math.min(now - last, 100) : 0;
      last = now;
      if (startedAt === null && lead?.startTime != null) startedAt = Number(lead.startTime);
      if (timed) {
        const at = startedAt === null ? 0 : now - startedAt;
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

    // The play starts once, with its art in: a rock whose image arrived mid-flight would pop in.
    const play = async () => {
      await whenNear(section);
      await whenLoaded([...section.querySelectorAll<HTMLImageElement>(".rock__img, .packs-mayo img, .plate__picture--assembled img")]);
      // Mayo's hidden strips decoded ahead: decoded only when first shown, she vanished for a few frames at each hand-over.
      await Promise.race([
        Promise.all([...section.querySelectorAll<HTMLImageElement>(".packs-mayo img")].map((img) => img.decode().catch(() => undefined))),
        new Promise((resolve) => setTimeout(resolve, LOAD_WAIT)),
      ]);
      if (disposed) return;
      section.dataset.play = "run";
      lead = section.querySelector(".packs-mayo__strip--mira")?.getAnimations()[0];
      // No CSS animation to follow (reduced motion turned on meanwhile): the page's clock from now.
      if (!lead) startedAt = document.timeline.currentTime === null ? null : Number(document.timeline.currentTime);
    };
    const trigger = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < START_SHARE) return;
        trigger.disconnect();
        void play();
      },
      { threshold: START_SHARE },
    );
    if (timed) trigger.observe(section);

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });
    observer.observe(section);
    reducedQuery.addEventListener("change", update);

    return () => {
      disposed = true;
      stop();
      trigger.disconnect();
      observer.disconnect();
      reducedQuery.removeEventListener("change", update);
      miraImg.style.transform = "";
      sentadaImg.style.transform = "";
    };
  }, [miraRest, miraEnd, sentadaStart, sentadaLoop]);

  return null;
}
