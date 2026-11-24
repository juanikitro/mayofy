/*
 * Where the ambient effects sit on each island (docs/plans/2026-11-24-ambiente.md).
 * Coordinates are in percent of the island's plate (x of its width, y of its
 * height), on the desktop plate (1672 x 941) and on the mobile plate (864 x
 * 1536); `mobile: null` leaves an item out on phones.
 */

export type AmbientIsland = "hero" | "problem" | "systems" | "works" | "host" | "questions";

/* ---------------------------------------------------------------- clouds */

/**
 * A painted puff (62-nube-suelta-1..4, the fall's clouds, already in the
 * browser's cache by the time an island shows) drifting across the plate.
 * `far` clouds sit behind the island cutout, small and hazy, and drift
 * slowly; `near` ones pass in front of the island's roots, bigger and
 * faster, so the island floats between two depths of sky.
 */
export type CloudSpec = {
  puff: 0 | 1 | 2 | 3;
  depth: "far" | "near";
  /** Centre of the cloud when the island first shows (the drift's phase). */
  x: number;
  y: number;
  /** Width, % of the plate. */
  w: number;
  /** Mirrored, so the same puff does not read twice. */
  flip?: boolean;
  mobile?: { x: number; y: number; w: number } | null;
  /** `false` leaves it out on desktop (where it would cover the island). */
  desktop?: false;
};

export type CloudLayer = {
  /** Wind: +1 drifts right, -1 left. */
  wind: 1 | -1;
  /** Plate widths per minute for a far cloud; near clouds go 2.2 times faster. */
  speed: number;
  clouds: readonly CloudSpec[];
};

export const ambientClouds: Record<AmbientIsland, CloudLayer> = {
  // Dawn: warm puffs low behind the island, one wisp crossing under its roots.
  hero: {
    wind: 1,
    speed: 0.22,
    clouds: [
      { puff: 1, depth: "far", x: 62, y: 58, w: 13, mobile: null },
      { puff: 0, depth: "far", x: 88, y: 50, w: 10, flip: true, mobile: null },
      { puff: 2, depth: "far", x: 30, y: 74, w: 11, mobile: null },
      { puff: 1, depth: "near", x: 80, y: 93, w: 24, flip: true, mobile: null },
    ],
  },
  // Morning: white cumulus behind the island and one under it.
  problem: {
    wind: -1,
    speed: 0.24,
    clouds: [
      { puff: 0, depth: "far", x: 70, y: 52, w: 12, mobile: { x: 28, y: 63, w: 26 } },
      { puff: 3, depth: "far", x: 96, y: 62, w: 10, flip: true, mobile: { x: 84, y: 70, w: 22 } },
      { puff: 2, depth: "far", x: 46, y: 70, w: 9, mobile: null },
      { puff: 1, depth: "near", x: 62, y: 96, w: 26, desktop: false, mobile: { x: 40, y: 99, w: 62 } },
    ],
  },
  // Golden afternoon over the workshop.
  systems: {
    wind: 1,
    speed: 0.2,
    clouds: [
      { puff: 3, depth: "far", x: 14, y: 50, w: 10, mobile: { x: 20, y: 56, w: 24 } },
      { puff: 1, depth: "far", x: 48, y: 44, w: 12, flip: true, mobile: { x: 78, y: 52, w: 26 } },
      { puff: 0, depth: "far", x: 74, y: 62, w: 9, mobile: null },
      { puff: 2, depth: "near", x: 30, y: 97, w: 25, flip: true, mobile: { x: 60, y: 100, w: 60 } },
    ],
  },
  // Sunset: the six-steps path. The plate is the island cutout alone, on the section's sky.
  works: {
    wind: -1,
    speed: 0.2,
    clouds: [
      { puff: 0, depth: "far", x: 26, y: 40, w: 11, mobile: { x: 20, y: 58, w: 18 } },
      { puff: 2, depth: "far", x: 76, y: 34, w: 13, flip: true, mobile: { x: 80, y: 61, w: 20 } },
      { puff: 3, depth: "far", x: 54, y: 66, w: 9, mobile: null },
      { puff: 1, depth: "near", x: 40, y: 92, w: 22, mobile: { x: 52, y: 95, w: 38 } },
    ],
  },
  // Dusk around the campfire.
  host: {
    wind: 1,
    speed: 0.18,
    clouds: [
      { puff: 1, depth: "far", x: 20, y: 52, w: 10, mobile: { x: 18, y: 62, w: 24 } },
      { puff: 0, depth: "far", x: 82, y: 40, w: 9, flip: true, mobile: { x: 86, y: 58, w: 20 } },
      { puff: 2, depth: "near", x: 60, y: 94, w: 22, mobile: { x: 46, y: 98, w: 56 } },
    ],
  },
  // Night: dark cumulus lit by the moon, slow.
  questions: {
    wind: -1,
    speed: 0.16,
    clouds: [
      { puff: 3, depth: "far", x: 24, y: 48, w: 12, mobile: { x: 16, y: 60, w: 26 } },
      { puff: 1, depth: "far", x: 76, y: 38, w: 11, flip: true, mobile: { x: 86, y: 56, w: 24 } },
      { puff: 2, depth: "near", x: 48, y: 90, w: 24, mobile: { x: 50, y: 95, w: 58 } },
    ],
  },
};

/** How much faster a near cloud drifts than a far one (parallax between the layers). */
export const NEAR_CLOUD_SPEED = 2.2;

/**
 * Animation timing for a cloud crossing the plate: it starts just off one
 * side, ends just off the other, and its negative delay puts it at its `x`
 * when the island first shows.
 */
export function cloudDrift(cloud: { x: number; w: number }, layer: { wind: 1 | -1; speed: number }, depth: CloudSpec["depth"]) {
  const travel = 100 + cloud.w; // % of the plate, from fully off one side to fully off the other
  const perSecond = (layer.speed * (depth === "near" ? NEAR_CLOUD_SPEED : 1) * 100) / 60;
  const duration = travel / perSecond;
  // Share of the trip already done when the cloud's centre is at x.
  const done = layer.wind > 0 ? (cloud.x + cloud.w / 2) / travel : (100 + cloud.w / 2 - cloud.x) / travel;
  return {
    /** Seconds. */
    duration: Math.round(duration),
    /** Negative seconds. */
    delay: -Math.round(duration * Math.min(Math.max(done, 0), 1)),
    /** The trip as a translate in the cloud's own widths. */
    distance: (travel / cloud.w) * 100,
  };
}

/* ----------------------------------------------------------------- birds */

/**
 * Open sky where a flock may cross each day island, as a band of plate
 * heights (top, bottom) on desktop and on the mobile plate, and the colour
 * of the silhouettes against that sky.
 */
export type BirdSky = { band: readonly [number, number]; bandMobile: readonly [number, number]; ink: string };

export const ambientBirds: Partial<Record<AmbientIsland, BirdSky>> = {
  hero: { band: [16, 34], bandMobile: [48, 58], ink: "64 44 84" },
  problem: { band: [14, 30], bandMobile: [40, 52], ink: "44 58 84" },
  systems: { band: [10, 26], bandMobile: [36, 48], ink: "92 58 44" },
  works: { band: [8, 24], bandMobile: [36, 50], ink: "82 46 72" },
};

/** Seconds before the first flock once an island is on screen, and between flocks. */
export const BIRD_FIRST_DELAY: readonly [number, number] = [3, 7];
export const BIRD_INTERVAL: readonly [number, number] = [24, 48];
