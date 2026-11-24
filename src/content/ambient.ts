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
      // Low, under the copy column: the light text never sits on a lit cloud.
      { puff: 1, depth: "far", x: 20, y: 84, w: 10, mobile: { x: 18, y: 62, w: 24 } },
      { puff: 0, depth: "far", x: 82, y: 78, w: 9, flip: true, mobile: { x: 86, y: 58, w: 20 } },
      { puff: 2, depth: "near", x: 60, y: 94, w: 22, mobile: { x: 46, y: 97, w: 40 } },
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

/* ----------------------------------------------------------------- stars */

/**
 * The brightest stars painted on island 7's background layer, found on the
 * image itself (local brightness peaks well above the sky around them,
 * strongest first), as [x, y] in % of the plate. Each one twinkles where it
 * is painted; the first few also flash a small cross now and then.
 */
export const nightStars = {
  desktop: [
    [86.78, 13.71], [66.45, 16.9], [75.42, 19.45], [42.46, 14.24], [53.47, 19.98], [29.84, 15.94],
    [48.03, 22.0], [56.94, 27.63], [57.0, 17.75], [8.49, 41.55], [71.71, 11.37], [60.71, 43.04],
    [69.62, 16.05], [79.31, 43.57], [46.23, 38.68], [7.95, 14.35], [81.1, 16.58], [77.51, 12.33],
    [15.67, 44.31], [58.01, 32.84], [83.25, 44.31], [71.53, 36.56], [90.91, 44.0], [85.29, 52.39],
    [21.29, 11.9], [20.51, 37.51], [52.15, 49.31], [29.55, 22.53], [16.03, 52.71], [49.52, 29.86],
    [34.21, 18.07], [70.1, 23.49], [32.18, 26.78], [38.58, 22.21], [68.24, 26.25], [82.24, 55.58],
  ],
  mobile: [
    [15.05, 15.89], [38.19, 14.0], [19.68, 19.73], [86.46, 13.67], [91.9, 23.96], [76.5, 17.19],
    [46.06, 17.64], [64.7, 23.76], [54.98, 15.62], [29.75, 14.78], [9.49, 27.21], [63.66, 16.21],
    [24.65, 35.87], [67.71, 30.4], [35.3, 30.21], [41.78, 57.49], [7.29, 20.25], [70.25, 11.91],
    [83.91, 40.17], [63.19, 36.91], [19.91, 25.52], [46.3, 22.85], [22.69, 30.21], [88.66, 35.81],
    [26.85, 17.32], [41.32, 25.65], [26.27, 23.11], [94.79, 16.8], [28.7, 41.02], [48.96, 13.61],
  ],
} as const satisfies { desktop: readonly (readonly [number, number])[]; mobile: readonly (readonly [number, number])[] };

/** How many of the strongest stars get the cross-shaped glint. */
export const STAR_GLINTS = 5;

/** Seconds between shooting stars while island 7 is on screen. */
export const SHOOTING_STAR_INTERVAL: readonly [number, number] = [14, 32];

/* ---------------------------------------------------------------- breeze */

/**
 * A tree canopy that sways in the breeze: the box (x, y, w, h in % of the
 * plate) holds the whole tree, from a little above the crown to the grass
 * around the trunk, and `pivot` is the height (% of the plate) of the
 * trunk's base, where the sway is zero. Measured on the island cutouts.
 */
export type CanopyBox = { x: number; y: number; w: number; h: number; pivot: number };

export const ambientCanopies: Partial<Record<AmbientIsland, { desktop: CanopyBox; mobile: CanopyBox | null }>> = {
  // The hero's big tree. On phones the hero is one flat plate without a cutout: no breeze there.
  hero: {
    desktop: { x: 34.5, y: 45.5, w: 16, h: 25.5, pivot: 69 },
    mobile: null,
  },
  host: {
    desktop: { x: 26.5, y: 28, w: 17.5, h: 25, pivot: 52 },
    mobile: { x: 16, y: 58, w: 25, h: 13, pivot: 69.5 },
  },
  questions: {
    desktop: { x: 40.5, y: 17, w: 19.5, h: 26, pivot: 41.5 },
    mobile: { x: 33, y: 52.5, w: 37, h: 18, pivot: 69 },
  },
};
