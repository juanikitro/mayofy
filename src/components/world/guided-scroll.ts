/**
 * The page's shared scroll guidance (see docs/plans/2026-11-20-scroll-por-secciones.md):
 *
 * - `guideScrollTo`: a calm scroll to a target, driven frame by frame instead
 *   of the browser's fast native smooth scroll, so whatever the scroll scrubs
 *   (Mayo's painted frames on island 5, the parts of island 4) plays at a
 *   readable pace. Any input from the reader (wheel, touch, pointer, key)
 *   stops it at once.
 * - `onGestureEnd`: one reader gesture, start to end. A burst of wheel events
 *   (one notch, a few notches, a touchpad swipe and its momentum), a touch
 *   with its fling, or a scroll key is one gesture, and it ends only once the
 *   input has been quiet for a moment and the page has stopped. The page is
 *   only ever guided after that, in the gesture's own direction.
 * - `addMomentumStops`: points a touch fling may not fly past. The finger
 *   itself always wins; only the fling after it stops before the first point
 *   past where the finger went down (at once, if the finger already passed
 *   it), so one flick never skips a step of the story.
 *
 * Shared by SectionSnap, SenderoController (six steps) and WorkshopController (island 4).
 */

export const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
/** Slows down into the target, where a scene's pose waits (island 3's hops end just before their rest points). */
export const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);

let active: { stop: () => void } | null = null;

export function isGuiding() {
  return active !== null;
}

/** Scrolls the window to `top` over `duration` ms; resolves when done or interrupted. */
export function guideScrollTo(top: number, duration: number, ease = easeInOutSine) {
  active?.stop();
  const from = window.scrollY;
  const distance = top - from;
  if (Math.abs(distance) < 1) return Promise.resolve(true);

  return new Promise<boolean>((resolve) => {
    let frame = 0;
    const start = performance.now();
    const events = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    const stop = (finished: boolean) => {
      cancelAnimationFrame(frame);
      for (const type of events) window.removeEventListener(type, interrupt, true);
      if (active === handle) active = null;
      resolve(finished);
    };
    const interrupt = () => stop(false);
    const handle = { stop: () => stop(false) };
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const next = Math.round(from + distance * ease(t));
      // Only ever toward the target: if the page drifted ahead (the tail of a fling), never pull it back.
      if ((next - window.scrollY) * distance > 0) window.scrollTo({ top: next, behavior: "instant" });
      if (t < 1) frame = requestAnimationFrame(step);
      else stop(true);
    };
    for (const type of events) window.addEventListener(type, interrupt, { capture: true, passive: true });
    active = handle;
    frame = requestAnimationFrame(step);
  });
}

/** A duration between `min` and `max` ms for `frames` painted frames at `fps`. */
export function framesDuration(frames: number, fps: number, min: number, max: number) {
  return Math.min(max, Math.max(min, (frames / fps) * 1000));
}

/** Whether the page may move by itself: never with reduced motion. */
export function motionAllowed() {
  return (
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    document.documentElement.dataset.motionTier !== "reduced"
  );
}

export type Gesture = {
  /** Scroll position when the gesture ended. */
  to: number;
  /**
   * Where the reader was going, down (1) or up (-1), read from the input itself
   * (the wheel deltas, the key, the finger), not from scroll positions: the
   * browser may already have scrolled when the page hears the first wheel event.
   */
  direction: 1 | -1;
  /**
   * Stepped input (mouse wheel notches, scroll keys) asks for a step; smooth
   * input (touch, touchpad) has already put the page where the reader wants it.
   */
  stepped: boolean;
};

/** Input quiet for this long (ms) ends a gesture: longer than the gap between notches of one spin. */
const QUIET = 320;
/** The page still for this long (ms) means its own smooth scroll or fling is over. */
const STILL = 140;
/** A finger that moved the page less than this (px) was tapping, not scrolling. */
const TAP_DRIFT = 10;
/** A wheel event this large (px) starts a notch, not a touchpad swipe, which starts small. */
const NOTCH = 50;

/** Scroll keys and the way each goes (Space goes up with Shift). */
const scrollKeys: Record<string, 1 | -1> = { ArrowDown: 1, PageDown: 1, " ": 1, End: 1, ArrowUp: -1, PageUp: -1, Home: -1 };

type StopsProvider = () => readonly number[];

const listeners = new Set<(gesture: Gesture) => void>();
const stopProviders = new Set<StopsProvider>();
let detach: (() => void) | null = null;

/** Window listeners, shared by every subscriber so they all see the same gestures. */
function attach() {
  // `push` adds up the input (wheel pixels, key presses); a touch is read from where the finger began.
  let gesture: { push: number; touchFrom: number | null; stepped: boolean; moved: boolean } | null = null;
  let touching = false;
  let lastInput = 0;
  let lastScroll = 0;
  let timer = 0;
  // A fling after the finger lifts: where the finger went down, the stop it may not pass, its last frame.
  let fling: { from: number; stop: number | null; direction: number; y: number; t: number } | null = null;

  const end = () => {
    timer = 0;
    if (!gesture) return;
    // The finger is still down: lifting it schedules the end again.
    if (touching) return;
    const now = performance.now();
    const wait = Math.max(QUIET - (now - lastInput), STILL - (now - lastScroll));
    if (wait > 0) {
      timer = window.setTimeout(end, Math.max(16, wait));
      return;
    }
    const { push, touchFrom, stepped, moved } = gesture;
    gesture = null;
    fling = null;
    const to = window.scrollY;
    const way = touchFrom === null ? push : to - touchFrom;
    // A guided scroll that started meanwhile owns the page; a gesture that went nowhere means nothing,
    // and neither does a finger that only drifted while tapping.
    if (isGuiding() || !moved || way === 0 || (touchFrom !== null && Math.abs(way) < TAP_DRIFT)) return;
    for (const listener of listeners) listener({ to, direction: way > 0 ? 1 : -1, stepped });
  };
  const schedule = () => {
    if (!timer) timer = window.setTimeout(end, 16);
  };
  const begin = (push: number, stepped: boolean) => {
    lastInput = performance.now();
    gesture ??= { push: 0, touchFrom: null, stepped, moved: false };
    gesture.push += push;
    schedule();
  };

  const onWheel = (event: WheelEvent) => {
    if (event.ctrlKey) return; // pinch zoom on a touchpad
    begin(event.deltaY, event.deltaMode !== 0 || Math.abs(event.deltaY) >= NOTCH);
  };
  const onKey = (event: KeyboardEvent) => {
    const way = scrollKeys[event.key];
    if (!way || event.ctrlKey || event.metaKey || event.altKey) return;
    const target = event.target as HTMLElement | null;
    if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
    begin(event.key === " " && event.shiftKey ? -1 : way, true);
  };
  const onTouchStart = () => {
    touching = true;
    fling = null;
    // A new touch is a new gesture: it stops any fling where it is.
    gesture = { push: 0, touchFrom: window.scrollY, stepped: false, moved: false };
    begin(0, false);
  };
  const onTouchEnd = () => {
    touching = false;
    lastInput = performance.now();
    const from = gesture?.touchFrom ?? window.scrollY;
    fling = { from, stop: null, direction: 0, y: window.scrollY, t: performance.now() };
    schedule();
  };
  // A click (a link in the header, a button) starts a scroll of its own: the gesture is over.
  const onClick = () => {
    gesture = null;
    fling = null;
  };
  const onScroll = () => {
    lastScroll = performance.now();
    if (gesture) {
      gesture.moved = true;
      schedule();
    }
    if (fling && !touching && !isGuiding()) catchFling();
  };

  /**
   * Stops a fling before the first momentum stop past where the finger went
   * down, by blocking the page's overflow for a moment (what stops a fling in
   * mobile browsers; a scrollTo does not). Only where the scrollbar takes no
   * room, so blocking it cannot shift the layout.
   */
  const catchFling = () => {
    if (!fling || !stopProviders.size) return;
    const now = performance.now();
    const y = window.scrollY;
    const delta = y - fling.y;
    const elapsed = Math.max(1, now - fling.t);
    if (!fling.direction && delta !== 0) {
      fling.direction = Math.sign(delta);
      const start = fling.from;
      const ahead = [...stopProviders]
        .flatMap((provider) => provider())
        .filter((point) => (point - start) * fling!.direction > 2)
        .sort((a, b) => (a - b) * fling!.direction);
      fling.stop = ahead[0] ?? null;
    }
    const { stop, direction } = fling;
    fling.y = y;
    fling.t = now;
    if (stop === null || !direction) return;
    // The next frame (about as far as this one) would cross the stop, or this one already did.
    const remaining = (stop - y) * direction;
    if (remaining > (Math.abs(delta) / elapsed) * 20) return;
    fling = null;
    if (window.innerWidth !== document.documentElement.clientWidth) return;
    const root = document.documentElement;
    root.style.overflowY = "hidden";
    window.setTimeout(() => {
      root.style.overflowY = "";
    }, 120);
  };

  window.addEventListener("wheel", onWheel, { capture: true, passive: true });
  window.addEventListener("keydown", onKey, { capture: true });
  window.addEventListener("touchstart", onTouchStart, { capture: true, passive: true });
  window.addEventListener("touchend", onTouchEnd, { capture: true, passive: true });
  window.addEventListener("touchcancel", onTouchEnd, { capture: true, passive: true });
  window.addEventListener("click", onClick, { capture: true, passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => {
    window.clearTimeout(timer);
    window.removeEventListener("wheel", onWheel, true);
    window.removeEventListener("keydown", onKey, true);
    window.removeEventListener("touchstart", onTouchStart, true);
    window.removeEventListener("touchend", onTouchEnd, true);
    window.removeEventListener("touchcancel", onTouchEnd, true);
    window.removeEventListener("click", onClick, true);
    window.removeEventListener("scroll", onScroll);
  };
}

function retain() {
  detach ??= attach();
  return () => {
    if (!listeners.size && !stopProviders.size) {
      detach?.();
      detach = null;
    }
  };
}

/**
 * Calls `onEnd` once a gesture by the reader is over (see `Gesture`). Scrolls
 * nobody gestured for (a focus moved by Tab, an in-page link, find in page, a
 * guided scroll) never end a gesture. Returns a cleanup function.
 */
export function onGestureEnd(onEnd: (gesture: Gesture) => void) {
  listeners.add(onEnd);
  const release = retain();
  return () => {
    listeners.delete(onEnd);
    release();
  };
}

/**
 * Registers scroll positions a touch fling stops before (the provider is
 * asked when a fling starts; return none to leave it free). Returns a cleanup function.
 */
export function addMomentumStops(provider: StopsProvider) {
  stopProviders.add(provider);
  const release = retain();
  return () => {
    stopProviders.delete(provider);
    release();
  };
}
