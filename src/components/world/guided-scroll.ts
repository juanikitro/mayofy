/**
 * A calm scroll to a target, driven frame by frame instead of the browser's
 * fast native smooth scroll, so whatever the scroll scrubs (Mayo's painted
 * frames on island 5, the parts of island 4) plays at a readable pace. Any
 * input from the reader (wheel, touch, pointer, key) stops it at once.
 * Shared by SenderoController (six steps) and WorkshopController (island 4).
 */

const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

let active: { stop: () => void } | null = null;

export function isGuiding() {
  return active !== null;
}

/** Scrolls the window to `top` over `duration` ms; resolves when done or interrupted. */
export function guideScrollTo(top: number, duration: number) {
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
      window.scrollTo({ top: Math.round(from + distance * easeInOutSine(t)), behavior: "instant" });
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

/**
 * Calls `onRest` once a scroll by the reader has ended (`scrollend`, or a
 * short pause where that event is missing), never during a guided scroll.
 * Returns a cleanup function.
 */
export function onScrollRest(onRest: () => void) {
  const hasScrollEnd = "onscrollend" in window;
  let pause = 0;
  const fire = () => {
    if (!isGuiding()) onRest();
  };
  const onScroll = () => {
    window.clearTimeout(pause);
    pause = window.setTimeout(fire, 160);
  };
  if (hasScrollEnd) window.addEventListener("scrollend", fire);
  else window.addEventListener("scroll", onScroll, { passive: true });
  return () => {
    window.clearTimeout(pause);
    window.removeEventListener("scrollend", fire);
    window.removeEventListener("scroll", onScroll);
  };
}
