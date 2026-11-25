"use client";

import { useEffect } from "react";

import { motionAllowed } from "@/components/world/guided-scroll";

/** Share of the homing stretch (from its start) by which a loop must be home, whatever the time it had. */
const HOME_BY = 0.8;

/** Strip loops: ms per painted frame (the illustrator's ping-pongs: 22 steps of 110 and 120 ms). */
const MIRA_STEP = 110;
const SENTADA_STEP = 120;
const FRAMES = 12;

/** Longest wait for the island's art once it is shown; past it the island shows the play's end (ms). */
const LOAD_WAIT = 2000;
/** Share of the section (one screen tall) on screen that shows the island and starts the play. */
const SHOWN = 0.6;

/** The CSS animations of the assembly (world.css); the rocks' endless idle float and the far rocks' scroll drift are not part of it. */
const PLAY_ANIMATIONS = new Set([
  "rock-fly-x",
  "rock-fly-y",
  "rock-turn",
  "rock-pre",
  "live-out",
  "assembled-in",
  "rock-shadow-in",
  "rock-ground-in",
  "sign-settle",
  "sign-plant",
  "packs-mayo-hop",
  "packs-mayo-leap",
  "packs-mayo-on",
  "packs-mayo-off",
  "mayo-sprite",
  "packs-mayo-run-frames",
]);

/** Rocks loose, assembling, built. */
type State = "loose" | "in" | "built";

type Loop = {
  img: HTMLImageElement;
  step: number;
  frame: number;
  dir: 1 | -1;
  elapsed: number;
  /** On which frame it started stepping home, or null while not homing. */
  home: { frame: number } | null;
};

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

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

/** Resolves once every image has loaded or failed. */
function whenLoaded(images: HTMLImageElement[]) {
  return Promise.all(
    images
      .filter((img) => !img.complete)
      .map(
        (img) =>
          new Promise<void>((resolve) => {
            img.addEventListener("load", () => resolve(), { once: true });
            img.addEventListener("error", () => resolve(), { once: true });
          }),
      ),
  );
}

/**
 * Island 3's play (Juani, 24 November 2026: "Una vez se muestra la isla 3
 * debe de empezar la animacion. indistinta del scroll"): the rocks wait loose,
 * floating, with Mayo watching, until the island is shown (SHOWN of the
 * section on screen). Then the whole assembly plays once, about 3.9 s
 * (stage.ts), on its own clock, to its end: whatever the reader does with
 * the scroll meanwhile neither holds the page nor touches the play, and a
 * reader who scrolls away finds the island assembled on the way back. It
 * plays once per page view and never comes apart.
 *
 * The CSS animations (world.css, delays and durations from stage.ts) are
 * held and played here with the Web Animations API, all on one clock. Before
 * the play the art must be in and Mayo's strips decoded (a strip decoded
 * only when first shown left her cell empty for a few frames), within
 * LOAD_WAIT; past it the island shows the play's end, never a rock that
 * pops in mid-flight.
 *
 * It is also the clock of Mayo's two loops (watching, seated), which play on
 * their own time but hand over to and from the played strips on the same
 * painted frame (Juani, 22 November 2026: "la cabeza de mayo que salta el
 * cuadro"): watching steps home to its first frame before the hop takes
 * over, and seated holds its first frame until a little after it takes over
 * from sitting down.
 *
 * Nothing of this with reduced motion: world.css then shows the built
 * island. Without JavaScript the island stands built and both strips rest
 * on their first frame.
 */
export function PacksPlay({
  length,
  miraRest,
  miraEnd,
  sentadaStart,
  sentadaLoop,
}: {
  /** The whole play, ms. */
  length: number;
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

    // world.css gates the animations on the same query; where it does not apply the island stands built and only the seated loop plays.
    const timed = window.matchMedia("(scripting: enabled)").matches;
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Mayo's loops ------------------------------------------------------

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
    const advance = (loop: Loop, delta: number, mode: "play" | "home" | "hold", left = 1) => {
      if (mode === "hold") {
        loop.frame = 0;
        loop.dir = 1;
        loop.elapsed = 0;
        loop.home = null;
        return;
      }
      if (mode === "home") loop.home ??= { frame: loop.frame };
      else loop.home = null;
      loop.elapsed += delta;
      while (loop.elapsed >= loop.step) {
        loop.elapsed -= loop.step;
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

    // The play ------------------------------------------------------------

    let state: State = "loose";
    /** The play running: when it started, on the page's clock. */
    let play: { start: number } | null = null;
    let disposed = false;
    let endTimer = 0;

    /** Where the assembly is (ms) at `now`, on the page's clock. */
    const position = (now: number) => {
      if (play) return Math.max(0, Math.min(length, now - play.start));
      return state === "built" ? length : 0;
    };

    /**
     * The assembly's animations. Kept once seen: a finished one that fills
     * nothing (Mayo's strip windows) drops out of `getAnimations()`, yet holding
     * the island must still reach it. One CSS cancelled (reduced motion) is idle
     * and left out; its replacement is picked up again.
     */
    const known = new Set<CSSAnimation>();
    const animations = () => {
      for (const animation of section.getAnimations({ subtree: true })) {
        if (animation instanceof CSSAnimation && PLAY_ANIMATIONS.has(animation.animationName) && animation.timeline === document.timeline) known.add(animation);
      }
      for (const animation of known) if (animation.playState === "idle") known.delete(animation);
      return known;
    };
    /** Every animation of the assembly held at `at` ms. */
    const holdAt = (at: number) => {
      for (const animation of animations()) {
        animation.pause();
        animation.currentTime = at;
      }
    };
    /** Every animation of the assembly playing from its start, all on the same start on the page's clock. */
    const runFrom = (now: number) => {
      for (const animation of animations()) {
        animation.pause();
        animation.startTime = now;
      }
    };
    const setState = (next: State) => {
      state = next;
      section.dataset.play = next;
    };

    let art: Promise<void> | null = null;
    /** The art the play shows, loaded, and Mayo's strips decoded (asked once). */
    const artReady = () =>
      (art ??= (async () => {
        await whenNear(section);
        await whenLoaded([...section.querySelectorAll<HTMLImageElement>(".rock__img, .packs-mayo img, .plate__picture--assembled img")]);
        await Promise.all([...section.querySelectorAll<HTMLImageElement>(".packs-mayo img")].map((img) => img.decode().catch(() => undefined)));
      })());

    // When it plays --------------------------------------------------------

    let onScreen = false;
    let shown = false;
    let played = false;

    /** Ends the play (or the wait for it) on the assembled island and holds every animation there. */
    const finish = () => {
      window.clearTimeout(endTimer);
      play = null;
      holdAt(length);
      setState("built");
    };

    /** The whole assembly, once per page view, on its own clock: what the reader does with the scroll meanwhile never touches it. */
    const start = async () => {
      if (played) return;
      played = true;
      if (!motionAllowed()) {
        finish();
        return;
      }
      const ready = await Promise.race([artReady().then(() => true), wait(LOAD_WAIT).then(() => false)]);
      if (disposed) return;
      if (!ready) {
        finish();
        return;
      }
      const now = Number(document.timeline.currentTime);
      play = { start: now };
      setState("in");
      runFrom(now);
      // Mayo's clock ends the play in the frame that reaches its end (see tick); this is the fallback, also off screen.
      endTimer = window.setTimeout(finish, length + 200);
    };

    // Mayo's clock --------------------------------------------------------

    let frameRequest = 0;
    let last = 0;

    const tick = (now: number) => {
      const delta = last ? Math.min(now - last, 100) : 0;
      last = now;
      // The play ends in the frame that reaches its end, before it paints.
      if (timed && play && position(now) >= length) finish();
      if (timed) {
        const at = position(now);
        const miraMode = at >= miraEnd ? "hold" : play && at >= miraRest ? "home" : "play";
        advance(mira, delta, miraMode, share(at, miraRest, miraEnd));
        if (at < sentadaStart) advance(sentada, delta, "hold");
        else if (play && at < sentadaLoop) advance(sentada, delta, "home", share(at, sentadaLoop, sentadaStart));
        else advance(sentada, delta, "play");
      } else {
        advance(sentada, delta, "play");
      }
      paint(mira);
      paint(sentada);
      frameRequest = window.requestAnimationFrame(tick);
    };

    const stopLoops = () => {
      window.cancelAnimationFrame(frameRequest);
      frameRequest = 0;
      last = 0;
    };
    const update = () => {
      stopLoops();
      const reduced = !motionAllowed();
      if (onScreen && !reduced) frameRequest = window.requestAnimationFrame(tick);
      if (reduced) {
        mira.frame = 0;
        sentada.frame = 0;
        paint(mira);
        paint(sentada);
      }
    };

    // Wiring ----------------------------------------------------------------

    holdAt(0);
    setState("loose");

    // Shown once SHOWN of the section is on screen (it is one screen tall); the loops run only while any of it is.
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (!shown && timed && onScreen && entry.intersectionRatio >= SHOWN - 0.01) {
          shown = true;
          void start();
        }
        update();
      },
      { threshold: [0, SHOWN] },
    );
    observer.observe(section);

    /**
     * Once NearGate opens the island, its art loads at once (lazy, a rock
     * floating outside the clipped stage would only load as it flew in), and
     * Mayo's strips start decoding, so the play rarely waits once shown.
     */
    const loadArt = () => {
      if (!section.hasAttribute("data-near")) return;
      for (const img of section.querySelectorAll<HTMLImageElement>(".rock__img, .rock-shadow, .packs-mayo img, .plate__picture--assembled img")) img.loading = "eager";
      if (timed) void artReady();
    };
    loadArt();
    // Rock pieces enter the layout with `data-near`: their new animations take the island's state.
    const near = new MutationObserver(() => {
      loadArt();
      if (!play) holdAt(position(Number(document.timeline.currentTime)));
    });
    near.observe(section, { attributes: true, attributeFilter: ["data-near"] });

    reducedQuery.addEventListener("change", update);

    return () => {
      disposed = true;
      window.clearTimeout(endTimer);
      stopLoops();
      observer.disconnect();
      near.disconnect();
      reducedQuery.removeEventListener("change", update);
      miraImg.style.transform = "";
      sentadaImg.style.transform = "";
    };
  }, [length, miraRest, miraEnd, sentadaStart, sentadaLoop]);

  return null;
}
