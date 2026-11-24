"use client";

import { useEffect } from "react";

import { motionAllowed, POPOVER_OPEN } from "@/components/world/guided-scroll";

/** Share of the homing stretch (from its start) by which a loop must be home, whatever the time it had. */
const HOME_BY = 0.8;

/** Strip loops: ms per painted frame (the illustrator's ping-pongs: 22 steps of 110 and 120 ms). */
const MIRA_STEP = 110;
const SENTADA_STEP = 120;
const FRAMES = 12;

/** Longest wait for the island's art before a play; past it the page lets go and shows the play's end (ms). */
const LOAD_WAIT = 2000;
/** Input quiet for this long (ms) ends a gesture: the next input is a new one. */
const QUIET = 250;
/** The page this close (px) to the section's top rests on it: the section fills the screen. */
const SETTLED = 2;
/** The short glide that brings the page onto the section's top (ms). */
const GLIDE = 260;

/** Scroll keys: their way and how far they move the page (px, or screens). Home and End are jumps, left alone. */
const scrollKeys: Record<string, { direction: 1 | -1; px?: number; screens?: number }> = {
  ArrowDown: { direction: 1, px: 40 },
  ArrowUp: { direction: -1, px: 40 },
  PageDown: { direction: 1, screens: 0.875 },
  PageUp: { direction: -1, screens: 0.875 },
  " ": { direction: 1, screens: 0.875 },
};

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
  "marker-rise",
  "packs-mayo-hop",
  "packs-mayo-leap",
  "packs-mayo-on",
  "packs-mayo-off",
  "mayo-sprite",
  "packs-mayo-run-frames",
]);

/** Rocks loose, assembling, built, coming apart. */
type State = "loose" | "in" | "built" | "out";

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
 * Island 3's three states (Juani, 24 November 2026: "piedras desarmadas,
 * piedras armandose, piedras armadas. Entonces empiezo en el 1, empiezo a
 * scrollear y no me deja continuar hasta terminar la animacion hasta llegar
 * al 3. luego si subo las piedras deben desarmarse"):
 *
 * 1. Loose: the section arrives and the page rests on it (a scroll that
 *    would carry past its top stops there instead), the rocks floating and
 *    Mayo watching. The gesture that brought the page here never starts the
 *    play: only a new one does.
 * 2. Assembling: the reader's next scroll down (wheel, touch, keys) plays the
 *    whole assembly, about 3.9 s (stage.ts), while the page waits: every
 *    scroll input is swallowed, not queued, and the scrollbar is held.
 * 3. Built: the reader's next gesture carries on down as usual.
 *
 * Coming back up into the built island, the page rests on it the same way
 * and the next scroll up plays the assembly backwards (Mayo turned round
 * while she runs and hops back, so she faces the way she goes) before the
 * page is free to go on up. Off screen, the island takes the state of the
 * side it was left on (loose below the reader, built above), so in-page
 * links and jumps never meet the gate, and a link followed during a play
 * lets the page go at once.
 *
 * The CSS animations (world.css, delays and durations from stage.ts) are
 * held and played here with the Web Animations API, all on one clock, so a
 * play is the exact reverse of the other. Before a play the art must be in
 * and Mayo's strips decoded (a strip decoded only when first shown left
 * her cell empty for a few frames), within LOAD_WAIT; past it the page shows
 * the play's end and lets go, so the reader is never trapped.
 *
 * It is also the clock of Mayo's two loops (watching, seated), which play on
 * their own time but hand over to and from the played strips on the same
 * painted frame (Juani, 22 November 2026: "la cabeza de mayo que salta el
 * cuadro"): watching steps home to its first frame before the hop takes
 * over, and seated holds its first frame until a little after it takes over
 * from sitting down (and steps home before it hands back, coming apart).
 *
 * Nothing of this with reduced motion: world.css then shows the built
 * island and the page scrolls freely. Without JavaScript the island stands
 * built and both strips rest on their first frame.
 */
export function PacksPlay({
  length,
  miraRest,
  miraEnd,
  runEnd,
  sentadaStart,
  sentadaLoop,
}: {
  /** The whole play, ms. */
  length: number;
  miraRest: number;
  miraEnd: number;
  /** When she has run to her last stop (the end of the hops). */
  runEnd: number;
  sentadaStart: number;
  sentadaLoop: number;
}) {
  useEffect(() => {
    const section = document.getElementById("packs");
    const mayo = section?.querySelector<HTMLElement>(".packs-mayo");
    const miraImg = section?.querySelector<HTMLImageElement>(".packs-mayo__strip--mira img");
    const sentadaImg = section?.querySelector<HTMLImageElement>(".packs-mayo__strip--sentada img");
    if (!section || !mayo || !miraImg || !sentadaImg) return;

    // world.css gates the animations on the same query; where it does not apply the island stands built and only the seated loop plays.
    const timed = window.matchMedia("(scripting: enabled)").matches;
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const gated = () => timed && motionAllowed();

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
    /** The play running: where it started (ms of the assembly), its way (1 assembling, -1 coming apart) and when, on the page's clock. */
    let play: { from: number; rate: 1 | -1; start: number } | null = null;
    let disposed = false;
    let endTimer = 0;

    /** Where the assembly is (ms) at `now`, on the page's clock. */
    const position = (now: number) => {
      if (play) return Math.max(0, Math.min(length, play.from + play.rate * (now - play.start)));
      // Built, or waiting to come apart: the end of the assembly.
      return state === "built" || state === "out" ? length : 0;
    };

    /**
     * The assembly's animations. Kept once seen: a finished one that fills
     * nothing (Mayo's strip windows) drops out of `getAnimations()`, yet the
     * play back must still run it. One CSS cancelled (reduced motion) is idle
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
        animation.playbackRate = 1;
        animation.currentTime = at;
      }
    };
    /** Every animation of the assembly playing from `from` ms, all on the same start on the page's clock. */
    const runFrom = (from: number, rate: 1 | -1, now: number) => {
      for (const animation of animations()) {
        animation.pause();
        animation.playbackRate = rate;
        animation.startTime = now - from / rate;
      }
    };
    const setState = (next: State) => {
      state = next;
      section.dataset.play = next;
    };

    let decoded = false;
    /** The art the play shows, loaded, and Mayo's strips decoded. */
    const artReady = async () => {
      await whenNear(section);
      await whenLoaded([...section.querySelectorAll<HTMLImageElement>(".rock__img, .packs-mayo img, .plate__picture--assembled img")]);
      if (decoded) return;
      await Promise.all([...section.querySelectorAll<HTMLImageElement>(".packs-mayo img")].map((img) => img.decode().catch(() => undefined)));
      decoded = true;
    };

    // The gate --------------------------------------------------------------

    /** Where the page is held while a play runs, or null while it is free. */
    let lockY: number | null = null;
    /** A glide or a play holds the page: every scroll input is swallowed. */
    let busy = false;
    /** The rest of the gesture that brought the page here, or that was going on when a play ended, is swallowed. */
    let holding = false;
    let lastInput = 0;
    let onScreen = false;

    const sectionTop = () => Math.round(section.getBoundingClientRect().top + window.scrollY);

    /** A short eased scroll onto `to`, which no input interrupts (all of it is swallowed meanwhile). */
    const glideTo = (to: number) =>
      new Promise<void>((resolve) => {
        busy = true;
        const from = window.scrollY;
        const started = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - started) / GLIDE);
          window.scrollTo({ top: Math.round(from + (to - from) * (1 - (1 - t) * (1 - t))), behavior: "instant" });
          if (t < 1 && !disposed) window.requestAnimationFrame(step);
          else resolve();
        };
        window.requestAnimationFrame(step);
      });

    /** Ends the play (or the wait for it) on `target`, holds every animation there and lets the page go. */
    const finish = (target: "loose" | "built") => {
      window.clearTimeout(endTimer);
      play = null;
      holdAt(target === "built" ? length : 0);
      setState(target);
      mayo.style.scale = "";
      busy = false;
      lockY = null;
      holding = true;
      // Focus that Tab moved out of the island meanwhile gets its place on screen back.
      const focused = document.activeElement;
      if (onScreen && focused instanceof HTMLElement && focused !== document.body && !section.contains(focused)) focused.scrollIntoView({ block: "nearest" });
    };

    const start = async (target: "loose" | "built") => {
      busy = true;
      lockY = sectionTop();
      setState(target === "built" ? "in" : "out");
      const ready = await Promise.race([artReady().then(() => true), wait(LOAD_WAIT).then(() => false)]);
      if (disposed || lockY === null) {
        // A link was followed meanwhile: the island simply takes the play's end.
        if (!disposed && !play) finish(target);
        return;
      }
      if (!ready) {
        finish(target);
        return;
      }
      const now = Number(document.timeline.currentTime);
      const rate = target === "built" ? 1 : -1;
      const from = rate > 0 ? 0 : length;
      play = { from, rate, start: now };
      runFrom(from, rate, now);
      // Mayo's clock ends the play in the frame that reaches its end (see tick); this is the fallback.
      endTimer = window.setTimeout(() => finish(target), length + 200);
    };

    /** Lets the page go during a play (a link or a button was followed); the play finishes on its own. */
    const release = () => {
      lockY = null;
      busy = false;
      holding = false;
    };

    /**
     * Stops a finger's scroll on the island's top, the way guided-scroll.ts
     * stops a fling: the page's overflow blocked for a moment (what ends a
     * touch scroll in mobile browsers), only where the scrollbar takes no
     * room, so the layout cannot shift. It stays blocked until the finger
     * lifts: the rest of that touch is swallowed.
     */
    let caught = 0;
    const freeOverflow = () => {
      window.clearTimeout(caught);
      caught = 0;
      document.documentElement.style.overflowY = "";
    };
    const catchOn = (top: number) => {
      holding = true;
      if (window.innerWidth !== document.documentElement.clientWidth) return;
      document.documentElement.style.overflowY = "hidden";
      window.clearTimeout(caught);
      // Whatever happens to the touch, the page is never left blocked.
      caught = window.setTimeout(freeOverflow, 2500);
      if (Math.abs(window.scrollY - top) > SETTLED) window.scrollTo({ top, behavior: "instant" });
    };

    /** Swallows an input the browser still lets the page cancel. */
    const swallow = (event: Event) => {
      if (event.cancelable) event.preventDefault();
    };

    /**
     * One scroll input of the reader: `direction` down (1) or up (-1), about
     * `step` px; `fresh` when it surely starts a new gesture (a new touch).
     */
    const intent = (event: Event, direction: 1 | -1, step: number, fresh: boolean) => {
      const now = performance.now();
      const quiet = now - lastInput >= QUIET;
      lastInput = now;
      if (busy) {
        swallow(event);
        return;
      }
      // Released by a link: the page is free while the play finishes. An open popover (PaymentTip) keeps the page where it is too.
      if (play || !gated() || document.documentElement.hasAttribute(POPOVER_OPEN)) return;
      // A finger already scrolling the page (its moves can no longer be cancelled) is only ever stopped on the island.
      const dragging = !event.cancelable;
      if (holding) {
        if (!quiet && !fresh) {
          swallow(event);
          // A finger still dragging the page after it was stopped on the island: stopped again.
          if (dragging && caught) catchOn(sectionTop());
          return;
        }
        holding = false;
      }
      const target = direction > 0 ? (state === "loose" ? "built" : null) : state === "built" ? "loose" : null;
      if (!target) return;
      const top = sectionTop();
      const offset = window.scrollY - top;
      if (dragging) {
        const past = offset * direction;
        if ((past >= 0 && past <= window.innerHeight / 2) || -past <= step) catchOn(top);
        return;
      }
      if (Math.abs(offset) <= SETTLED) {
        swallow(event);
        void start(target);
        return;
      }
      if (offset * direction < 0) {
        // On the way to the island: a step that would carry past its top stops on it instead.
        if (Math.abs(offset) <= step) {
          swallow(event);
          holding = true;
          void glideTo(top).then(() => {
            busy = false;
          });
        }
        return;
      }
      // A little past its top (a finger carried the page on): back onto it, and play.
      if (Math.abs(offset) <= window.innerHeight / 2) {
        swallow(event);
        void glideTo(top).then(() => start(target));
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.deltaY === 0) return;
      const px = event.deltaMode === 1 ? event.deltaY * 40 : event.deltaMode === 2 ? event.deltaY * window.innerHeight : event.deltaY;
      intent(event, px > 0 ? 1 : -1, Math.abs(px), false);
    };
    const onKey = (event: KeyboardEvent) => {
      const key = scrollKeys[event.key];
      if (!key || event.ctrlKey || event.metaKey || event.altKey) return;
      if ((event.target as HTMLElement | null)?.closest("input, textarea, select, button, [contenteditable='true']")) return;
      const direction = event.key === " " && event.shiftKey ? -1 : key.direction;
      intent(event, direction, key.px ?? window.innerHeight * (key.screens ?? 0), false);
    };
    let touch: { y: number; fresh: boolean } | null = null;
    const onTouchStart = (event: TouchEvent) => {
      touch = event.touches.length === 1 ? { y: event.touches[0].clientY, fresh: true } : null;
    };
    const onTouchEnd = () => {
      if (caught) {
        window.clearTimeout(caught);
        caught = window.setTimeout(freeOverflow, 120);
      }
    };
    const onTouchMove = (event: TouchEvent) => {
      if (busy) {
        swallow(event);
        return;
      }
      if (!touch || event.touches.length !== 1) return;
      const y = event.touches[0].clientY;
      // A finger moving up scrolls the page down.
      const moved = touch.y - y;
      if (Math.abs(moved) < 3) return;
      intent(event, moved > 0 ? 1 : -1, Math.abs(moved), touch.fresh);
      touch.fresh = false;
      touch.y = y;
    };
    // The scrollbar, autoscroll or a focus scroll while the page is held: back onto the island.
    const onScroll = () => {
      if (lockY !== null && Math.abs(window.scrollY - lockY) > 1) window.scrollTo({ top: lockY, behavior: "instant" });
    };
    const onClick = (event: MouseEvent) => {
      if ((busy || play) && (event.target as Element | null)?.closest("a[href], button")) release();
    };
    // Tab onto a marker while the rocks are loose: the island settles and assembles, the focus stays on it.
    const onFocus = (event: FocusEvent) => {
      if (!gated() || busy || play || state !== "loose") return;
      if (!(event.target as Element | null)?.closest(".platform__marker")) return;
      void glideTo(sectionTop()).then(() => start("built"));
    };

    const inputs: [string, EventListener, AddEventListenerOptions][] = [
      ["wheel", onWheel as EventListener, { capture: true, passive: false }],
      ["keydown", onKey as EventListener, { capture: true }],
      ["touchstart", onTouchStart as EventListener, { capture: true, passive: true }],
      ["touchmove", onTouchMove as EventListener, { capture: true, passive: false }],
      ["touchend", onTouchEnd, { capture: true, passive: true }],
      ["touchcancel", onTouchEnd, { capture: true, passive: true }],
    ];
    let listening = false;
    /** The input listeners (some of which can block scrolling) only while the island is on screen. */
    const listen = (on: boolean) => {
      if (on === listening) return;
      listening = on;
      for (const [type, listener, options] of inputs) {
        if (on) window.addEventListener(type, listener, options);
        else window.removeEventListener(type, listener, options);
      }
    };

    // Mayo's clock --------------------------------------------------------

    let frameRequest = 0;
    let last = 0;

    const tick = (now: number) => {
      const delta = last ? Math.min(now - last, 100) : 0;
      last = now;
      if (timed && play) {
        // The play ends in the frame that reaches its end, before it paints: played back, the strip
        // windows that fill nothing switch off at its very start, which would show the wrong one.
        const end = play.rate > 0 ? length : 0;
        if ((position(now) - end) * play.rate >= 0) finish(play.rate > 0 ? "built" : "loose");
      }
      if (timed) {
        const at = position(now);
        const way = play?.rate ?? 0;
        const miraMode = at >= miraEnd ? "hold" : way > 0 && at >= miraRest ? "home" : "play";
        advance(mira, delta, miraMode, share(at, miraRest, miraEnd));
        if (at < sentadaStart) advance(sentada, delta, "hold");
        else if (way > 0 && at < sentadaLoop) advance(sentada, delta, "home", share(at, sentadaLoop, sentadaStart));
        else if (way < 0) advance(sentada, delta, "home", share(at, length, sentadaStart));
        else advance(sentada, delta, "play");
        // Running back she faces the way she goes, turned round while she stands.
        mayo.style.scale = way < 0 && at > miraEnd && at < runEnd ? "-1 1" : "";
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

    // Off screen the island takes the state of the side it was left on; a play still running finishes there.
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      listen(onScreen && timed);
      if (!onScreen) {
        const side = entry.boundingClientRect.top > 0 ? "loose" : "built";
        if (play || busy || state !== side) finish(side);
        holding = false;
      }
      update();
    }, { rootMargin: "-1px 0px" });
    observer.observe(section);

    /**
     * Once NearGate opens the island, its art loads at once: lazy, a rock
     * floating outside the clipped stage would only load as it flew in.
     */
    const loadArt = () => {
      if (!section.hasAttribute("data-near")) return;
      for (const img of section.querySelectorAll<HTMLImageElement>(".rock__img, .rock-shadow, .packs-mayo img, .plate__picture--assembled img")) img.loading = "eager";
    };
    loadArt();
    // Rock pieces enter the layout with `data-near`: their new animations take the island's state.
    const near = new MutationObserver(() => {
      loadArt();
      if (!play) holdAt(position(Number(document.timeline.currentTime)));
    });
    near.observe(section, { attributes: true, attributeFilter: ["data-near"] });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("click", onClick, { capture: true, passive: true });
    window.addEventListener("hashchange", release);
    section.addEventListener("focusin", onFocus);
    reducedQuery.addEventListener("change", update);

    return () => {
      disposed = true;
      window.clearTimeout(endTimer);
      if (caught) freeOverflow();
      stopLoops();
      listen(false);
      observer.disconnect();
      near.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", release);
      section.removeEventListener("focusin", onFocus);
      reducedQuery.removeEventListener("change", update);
      miraImg.style.transform = "";
      sentadaImg.style.transform = "";
      mayo.style.scale = "";
    };
  }, [length, miraRest, miraEnd, runEnd, sentadaStart, sentadaLoop]);

  return null;
}
