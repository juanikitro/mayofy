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

type Subscriber = { callback: FrameCallback; interval: number; last: number };

const subscribers = new Set<Subscriber>();
let handle: number | null = null;
let timer: number | null = null;

/** Longest step handed to a callback: after a pause (hidden tab, idle loop) nothing jumps. */
const MAX_STEP = 100;

function frame(time: number) {
  handle = null;
  for (const subscriber of [...subscribers]) {
    if (!subscribers.has(subscriber)) continue;
    // A subscriber at a lower rate runs on the first frame at or after its next turn.
    if (subscriber.interval > 0 && time - subscriber.last < subscriber.interval - 8) continue;
    const delta = Math.min(time - subscriber.last, MAX_STEP);
    subscriber.last = time;
    subscriber.callback(time, delta);
  }
  schedule();
}

/**
 * Asks for the next frame. When every subscriber runs at a reduced rate, the
 * loop sleeps on a timer until the earliest is due instead of waking the page
 * on every display refresh: each frame the page draws also costs style work
 * for every running animation on screen.
 */
function schedule() {
  if (handle !== null || timer !== null || subscribers.size === 0 || document.hidden) return;
  let wait = Infinity;
  const now = performance.now();
  for (const subscriber of subscribers) {
    wait = Math.min(wait, subscriber.interval === 0 ? 0 : subscriber.last + subscriber.interval - now);
  }
  if (wait <= 16) {
    handle = requestAnimationFrame(frame);
    return;
  }
  // Wake a display frame early: the frame then lands on the turn, not a frame after it.
  timer = window.setTimeout(() => {
    timer = null;
    if (handle === null && subscribers.size > 0 && !document.hidden) handle = requestAnimationFrame(frame);
  }, wait - 16);
}

let visibilityBound = false;

/**
 * Runs `callback` on every frame (or `fps` times a second) until the returned
 * function is called. All ambient effects share one loop, which stops when
 * nothing is subscribed and while the tab is hidden.
 */
export function onFrame(callback: FrameCallback, { fps }: { fps?: number } = {}) {
  if (!visibilityBound) {
    visibilityBound = true;
    document.addEventListener("visibilitychange", schedule);
  }
  const subscriber: Subscriber = { callback, interval: fps ? 1000 / fps : 0, last: performance.now() };
  subscribers.add(subscriber);
  if (subscriber.interval === 0 && timer !== null) {
    // A full-rate subscriber cannot wait for a sleeping loop.
    window.clearTimeout(timer);
    timer = null;
  }
  schedule();
  return () => {
    subscribers.delete(subscriber);
    if (subscribers.size === 0) {
      if (handle !== null) cancelAnimationFrame(handle);
      if (timer !== null) window.clearTimeout(timer);
      handle = null;
      timer = null;
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
 * pose the phone rests in (`rest`), so the reader holds it however they
 * like. `range` degrees of tilt reach the full depth.
 */
export function normalisedTilt(beta: number, gamma: number, rest: { beta: number; gamma: number }, range = 18) {
  const clamp = (value: number) => Math.max(-1, Math.min(1, value));
  return { x: clamp((gamma - rest.gamma) / range), y: clamp((beta - rest.beta) / range) };
}

/**
 * Turns a `deviceorientation` reading into the screen's own axes: `beta`
 * (front-back, positive as the top rises) and `gamma` (left-right, positive
 * as the right edge drops) are measured on the device, so in landscape they
 * swap. `angle` is `screen.orientation.angle` (0, 90, 180, 270). Derived
 * from the specifications; not yet checked on a phone in landscape.
 */
export function tiltOnScreen(beta: number, gamma: number, angle: number) {
  switch (((angle % 360) + 360) % 360) {
    // Turned counter-clockwise: the screen's top is the device's left edge, its right the device's bottom.
    case 90:
      return { beta: gamma, gamma: beta };
    case 180:
      return { beta: -beta, gamma: -gamma };
    // Turned clockwise: the screen's top is the device's right edge, its right the device's top.
    case 270:
      return { beta: -gamma, gamma: -beta };
    default:
      return { beta, gamma };
  }
}

export type AutoTiltSignals = {
  tier: AmbientTier;
  /** `(hover: none) and (pointer: coarse)`. */
  phone: boolean;
  /** `DeviceOrientationEvent` exists. */
  hasOrientation: boolean;
};

/**
 * Tilt depth starts listening by itself, with no button, on phones in the
 * full tier. It never calls `DeviceOrientationEvent.requestPermission()`:
 * iOS Safari only answers it from a tap, with a system prompt, and sends no
 * reading without it, so iPhones get no tilt (startTiltDepth stops listening
 * when no reading arrives). Chrome also exposes `requestPermission()` but
 * allows the sensor by default, so its existence says nothing about iOS.
 */
export function autoTiltAllowed({ tier, phone, hasOrientation }: AutoTiltSignals) {
  return tier === "full" && phone && hasOrientation;
}

export type TiltReaderOptions = {
  /** Degrees of tilt that reach the full depth. */
  range: number;
  /** Share of the pointer depth at full tilt. */
  strength: number;
  /** Half-life (ms) of the rest pose following the hand, so a new grip re-centres the scene. */
  recentre: number;
  /** Smaller changes of the aim than this are hand tremor or sensor noise: ignored. */
  deadZone: number;
  /** Readings averaged into the first rest pose; the first ones are often stale. */
  calibration: number;
};

/** Past this |beta| the phone is near upright and gamma swings wildly (gimbal lock). */
const UPRIGHT = 75;
/** A jump this large between two readings is an axis flip or the phone turned over, not a tilt. */
const JUMP = 100;

/**
 * Turns `deviceorientation` readings into a calm aim for the scene depth.
 * `read` returns the new aim, or null while nothing should move: during the
 * calibration, near upright, or for a change inside the dead zone (a phone
 * lying flat on a table never moves the scene). After a jump it returns the
 * rest aim once and calibrates again.
 */
export function createTiltReader({ range, strength, recentre, deadZone, calibration }: TiltReaderOptions) {
  let samples: { beta: number; gamma: number }[] = [];
  let rest: { beta: number; gamma: number } | null = null;
  let previous: { beta: number; gamma: number } | null = null;
  let last = 0;
  let aimed = { x: 0, y: 0 };

  return {
    read(beta: number, gamma: number, angle: number, now: number): { x: number; y: number } | null {
      if (Math.abs(beta) > UPRIGHT) return null;
      const jumped = previous !== null && (Math.abs(beta - previous.beta) > JUMP || Math.abs(gamma - previous.gamma) > JUMP);
      previous = { beta, gamma };
      const pose = tiltOnScreen(beta, gamma, angle);
      if (jumped) {
        samples = [pose];
        rest = null;
        if (aimed.x === 0 && aimed.y === 0) return null;
        aimed = { x: 0, y: 0 };
        return aimed;
      }
      if (!rest) {
        samples.push(pose);
        if (samples.length < calibration) return null;
        const average = (key: "beta" | "gamma") => samples.reduce((sum, sample) => sum + sample[key], 0) / samples.length;
        rest = { beta: average("beta"), gamma: average("gamma") };
        samples = [];
        last = now;
      }
      rest.beta = approach(rest.beta, pose.beta, now - last, recentre);
      rest.gamma = approach(rest.gamma, pose.gamma, now - last, recentre);
      last = now;
      const tilt = normalisedTilt(pose.beta, pose.gamma, rest, range);
      const next = { x: tilt.x * strength, y: tilt.y * strength };
      if (Math.abs(next.x - aimed.x) < deadZone && Math.abs(next.y - aimed.y) < deadZone) return null;
      aimed = next;
      return aimed;
    },
  };
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
