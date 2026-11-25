/*
 * The cloud bank that parts in the page intro (docs/plans/2026-11-25-intro-amanecer.md).
 * Every cloud is the fall's puff 2 (62-nube-suelta-2): a phone already
 * downloads it before the page's `load` event for the fall below the hero,
 * so the curtain adds no file of its own. Coordinates are the cloud's centre
 * in % of the hero section (x of its width, y of its height), its width in %
 * of the section, and where it goes as the bank parts (`dx`, `dy`, in % of
 * the cloud's own size); `mobile: null` leaves a cloud out on phones.
 */

/** Index into `cloudFall.puffs` (stage.ts). */
export const INTRO_PUFF = 1;

type CloudPlace = { x: number; y: number; w: number; dx: number; dy: number };

export type CurtainCloud = CloudPlace & {
  flip?: boolean;
  mobile: CloudPlace | null;
};

// Desktop: the island fills the right half (48-96 % across, roots down to
// about 84 %); the bank covers its lower rim, its roots and its right edge,
// never the copy column. Phones: the island sits in the lowest quarter.
// Three clouds at most: each one is a large layer while the page loads.
export const introCurtain: readonly CurtainCloud[] = [
  { x: 56, y: 80, w: 30, dx: -60, dy: 34, mobile: { x: 10, y: 94, w: 80, dx: -62, dy: 12 } },
  { x: 94, y: 72, w: 30, dx: 72, dy: 10, flip: true, mobile: { x: 92, y: 91, w: 76, dx: 62, dy: 10 } },
  { x: 76, y: 97, w: 46, dx: 8, dy: 46, mobile: null },
];
