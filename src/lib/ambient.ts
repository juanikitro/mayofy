/*
 * Ambient motion of the island world: drifting clouds, birds, stars, firelight,
 * breeze and pointer depth (docs/plans/2026-11-24-ambiente.md). Pure helpers
 * shared by the ambient components, plus the one requestAnimationFrame loop
 * every scripted effect runs on.
 */

/**
 * - `full`: every effect.
 * - `lite`: Save-Data or a low-end device. Only the CSS effects that run on
 *   the compositor and download nothing new (clouds, stars, light); no canvas,
 *   no WebGL, no pointer or tilt depth.
 * - `off`: reduced motion. Nothing moves; the scenes keep their still art.
 */
export type AmbientTier = "full" | "lite" | "off";

export type AmbientSignals = {
  reducedMotion: boolean;
  saveData?: boolean | null;
  /** `navigator.deviceMemory`, GB (Chromium only). */
  deviceMemory?: number | null;
  /** `navigator.hardwareConcurrency`. */
  cores?: number | null;
};

export function detectAmbientTier({ reducedMotion, saveData, deviceMemory, cores }: AmbientSignals): AmbientTier {
  if (reducedMotion) return "off";
  if (saveData) return "lite";
  if (deviceMemory != null && deviceMemory <= 2) return "lite";
  if (cores != null && cores <= 2) return "lite";
  return "full";
}

/* ------------------------------------------------------------ the loop */

export type FrameCallback = (time: number, delta: number) => void;

const callbacks = new Set<FrameCallback>();
let handle: number | null = null;
let last = 0;

function frame(time: number) {
  // A frame after a pause (hidden tab, idle loop) must not jump: cap the step.
  const delta = Math.min(time - last, 64);
  last = time;
  handle = null;
  for (const callback of [...callbacks]) callback(time, delta);
  if (callbacks.size > 0 && !document.hidden) handle = requestAnimationFrame(frame);
}

function wake() {
  if (handle !== null || callbacks.size === 0 || document.hidden) return;
  last = performance.now();
  handle = requestAnimationFrame(frame);
}

let visibilityBound = false;

/**
 * Runs `callback` on every frame until the returned function is called.
 * All ambient effects share one loop, which stops when nothing is
 * subscribed and while the tab is hidden.
 */
export function onFrame(callback: FrameCallback) {
  if (!visibilityBound) {
    visibilityBound = true;
    document.addEventListener("visibilitychange", wake);
  }
  callbacks.add(callback);
  wake();
  return () => {
    callbacks.delete(callback);
    if (callbacks.size === 0 && handle !== null) {
      cancelAnimationFrame(handle);
      handle = null;
    }
  };
}

/* ------------------------------------------------------------ easing */

/**
 * Moves `current` toward `target` with a frame-rate independent exponential
 * ease: after `halfLife` ms it has covered half the remaining distance.
 */
export function approach(current: number, target: number, delta: number, halfLife: number) {
  return target + (current - target) * Math.pow(0.5, delta / halfLife);
}

/** Pointer position on the viewport as -1..1 on each axis, 0 at the centre. */
export function normalisedPointer(x: number, y: number, width: number, height: number) {
  const clamp = (value: number) => Math.max(-1, Math.min(1, value));
  return { x: clamp((x / width) * 2 - 1), y: clamp((y / height) * 2 - 1) };
}

/**
 * Device tilt as -1..1 from a `deviceorientation` reading, relative to the
 * pose the phone had when tilt depth was switched on (`rest`), so the reader
 * holds it however they like. `range` degrees of tilt reach the full depth.
 */
export function normalisedTilt(beta: number, gamma: number, rest: { beta: number; gamma: number }, range = 18) {
  const clamp = (value: number) => Math.max(-1, Math.min(1, value));
  return { x: clamp((gamma - rest.gamma) / range), y: clamp((beta - rest.beta) / range) };
}

/** A small deterministic random generator (mulberry32), so a layout is the same on every render. */
export function seeded(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
