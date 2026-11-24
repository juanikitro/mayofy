/**
 * Where Mayo stands on each island. One slot per MayoFigure in the page,
 * in journey order. `moment` names the captured pose (the moment ids of the
 * archived 3D scene, docs/archive/mayo-3d-integration/) whose still and
 * loop images are the fallback until the painted sprite strip of the slot
 * arrives (`mayoSprites`). `size` is the side of Mayo's square
 * (images are square; the dog spans ~55% of the width and its feet sit at
 * ~80% of the height). Anchors in % of the island plate arrive with the
 * generated plates (docs/plans/2026-11-17-integracion-mayo-assets.md §4);
 * until then the slots keep their provisional CSS positions.
 */
export type MayoSlotId =
  | "hero"
  | "fall"
  | "problem"
  | "packs"
  | "systems"
  | "works"
  | "host"
  | "questions";

export type MayoSlot = {
  id: MayoSlotId;
  moment: string;
  /** Accessible description of what Mayo is doing. */
  label: string;
  /** Preferred square side, as CSS. */
  size: string;
};

export const mayoSlots: readonly MayoSlot[] = [
  { id: "hero", moment: "01-hero", label: "Mayo, la border collie de Mayofy, sentada en el prado del amanecer", size: "clamp(9rem, 20vw, 17rem)" },
  { id: "fall", moment: "03-fall-float", label: "Mayo flotando entre las nubes", size: "clamp(7rem, 14vw, 12rem)" },
  { id: "problem", moment: "04-play-rocks", label: "Mayo jugando entre rocas sueltas", size: "clamp(7rem, 12vw, 11rem)" },
  { id: "packs", moment: "05-platform-jump", label: "Mayo saltando entre las plataformas de los packs", size: "clamp(5.5rem, 9vw, 8rem)" },
  { id: "systems", moment: "06-dig", label: "Mayo escarbando junto al invernadero", size: "clamp(7rem, 12vw, 11rem)" },
  { id: "works", moment: "07-run", label: "Mayo corriendo por el sendero", size: "clamp(7rem, 12vw, 11rem)" },
  { id: "host", moment: "10-rest", label: "Mayo echada junto al fogón", size: "clamp(7rem, 12vw, 11rem)" },
  { id: "questions", moment: "08-chase-firefly", label: "Mayo persiguiendo luciérnagas", size: "clamp(7rem, 12vw, 11rem)" },
];

export function getMayoSlot(id: MayoSlotId) {
  const slot = mayoSlots.find((s) => s.id === id);
  if (!slot) throw new Error(`Unknown Mayo slot: ${id}`);
  return slot;
}

/** Public paths of the captured still for a moment. */
export function mayoPoseSources(moment: string) {
  const base = `/mayo/poses/mayo-pose-${moment}`;
  return {
    still: { avif: `${base}.avif`, webp: `${base}.webp` },
  };
}

/* --------------------------------------------------------------- sprites */

/**
 * Painted Mayo, animated by frames: a horizontal strip of square cells
 * (640 x 640, 12 frames) stepped by the scroll, not by the clock (Juani,
 * 19 November 2026: "que se mueva solo al scrollear, no como un gif todo el
 * tiempo"). The frame is a function of the scroll position on the slot's
 * named view timeline: scrolling down advances it, scrolling up rewinds it
 * and a still page keeps a still Mayo. When a slot has a strip, MayoFigure
 * renders it instead of the still/loop pictures. Strips arrive as
 * `/images/mundo-mayo/70-mayo-<slot>-tira.avif|.webp`.
 */
export type MayoScrub = {
  /** Named view timeline of the section that holds Mayo (world.css). */
  timeline: "--dawn" | "--fall" | "--rocks" | "--isle" | "--sendero";
  /** Range on that timeline, roughly while Mayo is on screen, as `animation-range`. */
  range: string;
  /** Range on phones (<= 48rem), where the sections are taller. */
  rangeMobile?: string;
  /** How many times the strip plays across the range (a `pingpong` play is one way). */
  cycles: number;
  /** Plays on phones, where a travelling slot covers a shorter stretch of meadow. */
  cyclesMobile?: number;
};

export type MayoSprite = {
  strip: { avif: string; webp: string };
  frames: number;
  cell: number;
  /** Feet line as a percentage of the cell height: the lowest opaque pixels of
   * the grounded frames (or the painted ground shadow for run and jump strips). */
  feetY: string;
  /** `pingpong` plays the strip forward then backward so the last frame never
   * jumps to the first; `cycle` is for motions painted as a closed loop (run, chase). */
  loop: "pingpong" | "cycle";
  scrub: MayoScrub;
  /** Ground covered between frames, for a strip that runs between stops (`mayoAnchors[].stops`). */
  stride?: MayoStride;
  /**
   * One-shot strip that takes over from the run on its last frames (island 5:
   * brake and stand). Its first frame continues a stance start of the run,
   * its last frame is the rest pose at the anchor (end of the range, reduced
   * motion, no scroll-driven animations). Same cell and feet line as the run.
   */
  arrival?: { strip: { avif: string; webp: string }; frames: number; stride: MayoStride };
  /** Share of each stop's slice of the range spent reaching it; she stands for the rest. */
  legShare?: number;
  /**
   * One-shot hop for legs shorter than `maxCells` cells (island 5: crouch,
   * flight, land, settle, stand). Only the steps into the `flight` frames
   * (0-based) carry her; she stays planted on the others. Its last frame is
   * the arrival's rest pose, so a hop ends standing just as a run does.
   */
  hop?: { strip: { avif: string; webp: string }; frames: number; flight: readonly number[]; maxCells: number };
};

/**
 * How far a planted paw moves back inside the cell between two frames, in %
 * of the cell, measured on the painted strip: during a stance step Mayo must
 * advance exactly that much, or the paw slides on the ground.
 */
export type MayoStride = {
  /** Planted-paw advance, keyed by the 0-based index of the frame the step leads into. */
  stance: Readonly<Record<number, number>>;
  /** Advance for every other step (paws in the air): the mean stance advance for a gallop, 0 once she stands. */
  airborne: number;
};

const sprite = (slot: MayoSlotId, feetY: string, loop: MayoSprite["loop"], scrub: MayoScrub): MayoSprite => ({
  strip: { avif: `/images/mundo-mayo/70-mayo-${slot}-tira.avif`, webp: `/images/mundo-mayo/70-mayo-${slot}-tira.webp` },
  frames: 12,
  cell: 640,
  feetY,
  loop,
  scrub,
});

/**
 * Painted strips delivered so far (manifest docs/plans/mundo-mayo-assets.md).
 * Ranges were measured on the page as the share of each section's `cover`
 * range during which Mayo is on screen at 1440 x 900 and 390 x 844; the
 * island ranges also drive her walk between stops (`mayoAnchors[].stops`). Island 7 is
 * the last section, so its range ends before the page stops scrolling.
 */
export const mayoSprites: Partial<Record<MayoSlotId, MayoSprite>> = {
  // Seated, tail wag, scrubbed by the scroll; she stays seated (no leap).
  // Painted in place on a crop of the hero plate (seated, scale ~1/3 of the tree).
  hero: { ...sprite("hero", "88.28%", "pingpong", { timeline: "--dawn", range: "cover 50% cover 78%", rangeMobile: "cover 48% cover 78%", cycles: 2 }), strip: { avif: "/images/mundo-mayo/70-mayo-hero-v2-tira.avif", webp: "/images/mundo-mayo/70-mayo-hero-v2-tira.webp" } },
  // Tumbling in the clouds, in step with mayo-fall (cover 20-80 %).
  fall: sprite("fall", "88%", "pingpong", { timeline: "--fall", range: "cover 20% cover 80%", cycles: 3 }),
  // Play bow among the rocks.
  // Painted in place on a crop of the island 2 v2 plate (play bow among the rocks).
  problem: { ...sprite("problem", "87.91%", "pingpong", { timeline: "--isle", range: "cover 30% cover 85%", rangeMobile: "cover 35% cover 88%", cycles: 2 }), strip: { avif: "/images/mundo-mayo/70-mayo-problem-v2-tira.avif", webp: "/images/mundo-mayo/70-mayo-problem-v2-tira.webp" } },
  // Island 3 mounts its own four painted strips (packsMayo below, rock-island.tsx).
  // Digging: quick, repetitive paw strokes.
  // Painted in place on a crop of the island 4 v2 plate (camera, light and shadow from the scene).
  // The island is pinned for the whole section (systems-island.tsx): she digs while it is pinned.
  systems: { ...sprite("systems", "88.09%", "pingpong", { timeline: "--isle", range: "contain 0% contain 100%", cycles: 8 }), strip: { avif: "/images/mundo-mayo/70-mayo-systems-v2-tira.avif", webp: "/images/mundo-mayo/70-mayo-systems-v2-tira.webp" } },
  // Front three-quarter gallop painted in place on a crop of the island 5 v2 plate
  // (works-v3: 786, 467, 134 px of 1672; two strides, f10/f11 reuse f4/f5), then the
  // arrival strip (works-llegada: 694, 513, 134 px): f1 picks up a front-stance start of
  // the gallop, f2 is its last planted step, she trots, brakes and f8 stands on the front
  // stepping stone looking at the camera. Both cells are 8.014 % of the plate with the
  // ground line at 78 %. Stance advances from the asset manifest (works-v3) and measured on
  // the arrival strip (f1 to f2: 39 px of 640; the paw then stays planted, 228 to 231 px).
  // Six steps (option A): the range is the pinned stretch of the six-stone path
  // (`--sendero`, contain 0 % to 100 %), one slice per stone (mayoAnchors.works.stops); in
  // each she reaches the stone in the first `legShare` of the slice and stands on it for the
  // rest. `cycles` is not used: each leg takes the gallop frames that fit its length.
  works: {
    ...sprite("works", "78%", "cycle", { timeline: "--sendero", range: "contain 0% contain 100%", cycles: 1 }),
    legShare: 0.55,
    strip: { avif: "/images/mundo-mayo/70-mayo-works-v3-tira.avif", webp: "/images/mundo-mayo/70-mayo-works-v3-tira.webp" },
    stride: { stance: { 1: 6.445312, 4: 7.03125, 7: 5.859375, 10: 7.03125 }, airborne: 6.591797 },
    arrival: {
      strip: { avif: "/images/mundo-mayo/70-mayo-works-llegada-tira.avif", webp: "/images/mundo-mayo/70-mayo-works-llegada-tira.webp" },
      frames: 8,
      stride: { stance: { 1: 6.09 }, airborne: 0 },
    },
    // works-salto (724, 486, 134 px of 1672, feet 47.3 % / 62.7545 %, ground line 78 %): f1
    // crouch, f2-f3 in the air, f4 lands, f5 settles, f6 stands (pixel-identical to the
    // arrival's f8). Her body only shifts with her posture inside the cell (manifest), so the
    // whole leg is carried by the steps into f2, f3 and f4; f1, f5 and f6 stay put. Legs
    // under 0.6 cells hop: on desktop stones 1-2, 3-4, 4-5 and 5-6 (0.33 to 0.57 cells).
    hop: {
      strip: { avif: "/images/mundo-mayo/70-mayo-works-salto-tira.avif", webp: "/images/mundo-mayo/70-mayo-works-salto-tira.webp" },
      frames: 6,
      flight: [1, 2, 3],
      maxCells: 0.6,
    },
  },
  // Resting by the fire: breathing and ears, barely.
  // Painted in place on a crop of the island 6 v2 plate (resting, facing the campfire).
  host: { ...sprite("host", "85.16%", "pingpong", { timeline: "--isle", range: "cover 62% cover 93%", rangeMobile: "cover 72% cover 98%", cycles: 1 }), strip: { avif: "/images/mundo-mayo/70-mayo-host-v2-tira.avif", webp: "/images/mundo-mayo/70-mayo-host-v2-tira.webp" } },
  // Trotting after a firefly.
  // Painted in place on a crop of the island 7 v2 plate: seated, following a firefly with her head.
  questions: { ...sprite("questions", "88.27%", "pingpong", { timeline: "--isle", range: "cover 47% cover 70%", rangeMobile: "cover 57% cover 77%", cycles: 1 }), strip: { avif: "/images/mundo-mayo/70-mayo-questions-v2-tira.avif", webp: "/images/mundo-mayo/70-mayo-questions-v2-tira.webp" } },
};

/* ---------------------------------------------------------------- plates */

export type PlateImage = { avif: string; webp: string; width: number; height: number };

export type PlateSpec = {
  desktop: PlateImage;
  mobile?: PlateImage;
  /** Horizontal anchor kept in view when the plate is cropped (default 50%). */
  anchorX?: string;
  /** Parallax pair (desktop): the plate without its island, and the island cut out with alpha. */
  layers?: { background: PlateImage; island: PlateImage };
  /** Parallax pair for the mobile plate, when the cutout was delivered. */
  mobileLayers?: { background: PlateImage; island: PlateImage };
  /**
   * Share of the plate's height, measured from its bottom, taken by the
   * island art (meadow, objects, Mayo). The section's content stays above it,
   * so panels never cover the island. Measured on the alpha of the island
   * cutouts and on the objects placed on them.
   */
  clear?: { desktop: number; mobile: number };
};

const assetRoot = "/images/mundo-mayo";

function plateImage(name: string, width: number, height: number): PlateImage {
  return { avif: `${assetRoot}/${name}.avif`, webp: `${assetRoot}/${name}.webp`, width, height };
}

const desktopPlate = (name: string) => plateImage(name, 1672, 941);
const mobilePlate = (name: string) => plateImage(name, 864, 1536);

/** Generated plates per island (asset manifest docs/plans/mundo-mayo-assets.md). */
export const islandPlates = {
  hero: {
    desktop: desktopPlate("01-hero-escritorio"),
    mobile: mobilePlate("02-hero-celular"),
    anchorX: "72%",
    layers: { background: desktopPlate("01-hero-escritorio-fondo"), island: desktopPlate("01-hero-escritorio-isla") },
  },
  problem: {
    desktop: desktopPlate("30-isla2-escritorio-v2"),
    mobile: mobilePlate("30-isla2-celular-v2"),
    // Only used while the plate is scaled up (desktop, world.css): leans the island right of the copy.
    anchorX: "30%",
    layers: { background: desktopPlate("30-isla2-escritorio-v2-fondo"), island: desktopPlate("30-isla2-escritorio-v2-isla") },
    mobileLayers: { background: mobilePlate("30-isla2-celular-v2-fondo"), island: mobilePlate("30-isla2-celular-v2-isla") },
    clear: { desktop: 0.49, mobile: 0.43 },
  },
  packs: {
    desktop: desktopPlate("10-isla3-base"),
    // No mobile plate: the same pair serves both sizes, so the cutout stays visible on phones.
    layers: { background: desktopPlate("10-isla3-base-fondo"), island: desktopPlate("10-isla3-base-isla") },
    mobileLayers: { background: desktopPlate("10-isla3-base-fondo"), island: desktopPlate("10-isla3-base-isla") },
  },
  systems: {
    desktop: desktopPlate("40-isla4-escritorio-v2"),
    mobile: mobilePlate("40-isla4-celular-v2"),
    layers: { background: desktopPlate("40-isla4-escritorio-v2-fondo"), island: desktopPlate("40-isla4-escritorio-v2-isla") },
    mobileLayers: { background: mobilePlate("40-isla4-celular-v2-fondo"), island: mobilePlate("40-isla4-celular-v2-isla") },
    // Greenhouse roof at 47 % of the desktop plate.
    clear: { desktop: 0.53, mobile: 0.37 },
  },
  works: {
    desktop: desktopPlate("45-isla5-escritorio-v2"),
    mobile: mobilePlate("45-isla5-celular-v2"),
    layers: { background: desktopPlate("45-isla5-escritorio-v2-fondo"), island: desktopPlate("45-isla5-escritorio-v2-isla") },
    mobileLayers: { background: mobilePlate("45-isla5-celular-v2-fondo"), island: mobilePlate("45-isla5-celular-v2-isla") },
    // Bushes from 45.7 % (desktop cutout); path milestones from 51 % on mobile.
    clear: { desktop: 0.55, mobile: 0.5 },
  },
  host: {
    desktop: desktopPlate("50-isla6-escritorio-v3"),
    mobile: mobilePlate("50-isla6-celular-v3"),
    layers: { background: desktopPlate("50-isla6-escritorio-v2-fondo"), island: desktopPlate("50-isla6-escritorio-v3-isla") },
    mobileLayers: { background: mobilePlate("50-isla6-celular-v2-fondo"), island: mobilePlate("50-isla6-celular-v3-isla") },
    // The tree from 30.6 % of the desktop cutout; bench and campfire from 59 % on mobile.
    clear: { desktop: 0.7, mobile: 0.41 },
  },
  questions: {
    desktop: desktopPlate("55-isla7-escritorio-v2"),
    mobile: mobilePlate("55-isla7-celular-v2"),
    layers: { background: desktopPlate("55-isla7-escritorio-v2-fondo"), island: desktopPlate("55-isla7-escritorio-v2-isla") },
    mobileLayers: { background: mobilePlate("55-isla7-celular-v2-fondo"), island: mobilePlate("55-isla7-celular-v2-isla") },
    // The tree from 19.3 % of the desktop cutout and 54 % of the mobile one; fireflies may rise above it.
    clear: { desktop: 0.81, mobile: 0.46 },
  },
} as const satisfies Record<string, PlateSpec>;

/* ------------------------------------------------------------ cloud fall */

const fallFrameIds = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"] as const;

/**
 * Painted camera descent between island 1 and island 2 (lote C): ten frames
 * per orientation, warm dawn with horizon (01–05), cooling (06), inside the
 * cloud deck (07–08) and below it in the blue morning (09–10). `still` is the
 * frame shown alone when the fall cannot animate.
 */
export const cloudFall = {
  frames: fallFrameIds.map((id) => ({
    id,
    desktop: desktopPlate(`60-nubes-${id}`),
    mobile: mobilePlate(`61-nubes-cel-${id}`),
  })),
  still: "05",
  /** Isolated dawn-lit puffs with alpha, used as foreground parallax. */
  puffs: [
    plateImage("62-nube-suelta-1", 812, 471),
    plateImage("62-nube-suelta-2", 1024, 725),
    plateImage("62-nube-suelta-3", 1024, 813),
    plateImage("62-nube-suelta-4", 1024, 915),
  ],
} as const;

/**
 * Where Mayo's feet touch each plate, in percent of the plate, and the side
 * of her square as a percent of the plate width. Read on the rendered
 * plates (desktop and mobile `-v2-isla` cutouts, hero and island 3 plates)
 * with a 5 % grid on 19 November 2026: the feet sit on the meadow surface,
 * between its back rim and the front lip, and the size follows the painted
 * objects nearby. Mobile plates are taller: the same spot sits lower and the
 * square grows.
 */
/** Feet position in % of the plate (x of its width, y of its height) and depth scale. */
export type RoutePoint = readonly [x: number, y: number, scale: number];

/**
 * Stops along a painted path: where she waits before the first step, then
 * one stop per step (island 5: the six stepping stones). The last stop is the
 * anchor, scale 1.
 */
export type MayoStops = {
  points: readonly RoutePoint[];
  /** Plate height / width, to turn a y in % of the height into Mayo's widths. */
  aspect: number;
};

export type MayoAnchor = {
  x: string;
  y: string;
  size: string;
  xMobile?: string;
  yMobile?: string;
  sizeMobile?: string;
  /** The strips are painted facing left; `right` mirrors Mayo towards what she interacts with. */
  face?: "left" | "right";
  /**
   * Scroll-driven walk from stop to stop over the slot's scrub range, one
   * equal slice of the range per stop: in each slice she runs (or leaps) to
   * the next stop, brakes and stands on it (`mayoSprites[].stride`,
   * `arrival`, `legShare`). Feet in % of the plate with a depth scale.
   */
  stops?: MayoStops;
  /** Stops on the mobile plate, which frames the path differently. */
  stopsMobile?: MayoStops;
  /**
   * Contact shadow at the feet line (default on; `false` when airborne).
   * `lean` shifts it away from the island's key light, in % of Mayo's width
   * (negative = to her left); `opacity` keeps it subtle.
   */
  shadow?: false | { lean: string; opacity: number };
  /**
   * Ground contact painted by CSS under a sprite whose own shadow is painted
   * in but too faint to hold her on the ground. Soft ellipses in % of Mayo's
   * square cell, so they scale with her on desktop and mobile and stay still
   * while the strip loops.
   */
  contact?: MayoContact;
};

/** Contact layer: one tint (the plate's own shadow colour, as `r g b`) and its ellipses. */
export type MayoContact = { tint: string; layers: readonly MayoContactLayer[] };

/**
 * One soft ellipse of the contact layer. `ao` is the ambient occlusion tight
 * under the paws; `cast` is the shadow thrown away from a light. `x`, `y` are
 * its centre and `w`, `h` its radii, in % of the cell; `opacity` is the alpha
 * at its centre, fading to none at its rim.
 */
export type MayoContactLayer = {
  kind: "ao" | "cast";
  x: string;
  y: string;
  w: string;
  h: string;
  opacity: number;
};

export const mayoAnchors: Partial<Record<MayoSlotId, MayoAnchor>> = {
  // Hero: seated mid-meadow to the right of the big tree (trunk at 42 %, 68.6 %); dawn light from the right.
  // Cell = the plate crop the frames were painted on (left 798 px, side 109 px of 1672); shadow painted in.
  hero: {
    x: "50.99%",
    y: "72.5%",
    size: "6.52%",
    xMobile: "56%",
    yMobile: "80.5%",
    sizeMobile: "14.3%",
    shadow: false,
    // Low sun from the right: the big tree and the sign throw long, soft shadows to the left
    // and a little towards the camera (the tree's is ~1.1 times its height, olive on the
    // golden grass). Hers does the same: ~0.8 cell from her seat, fading as it goes, plus
    // occlusion under her seat and tail (Juani, 2026-11-20: "la sombra de mayo no acompaña
    // la sombra del arbol").
    contact: {
      tint: "40 52 12",
      layers: [
        { kind: "cast", x: "30%", y: "90.5%", w: "28%", h: "6.5%", opacity: 0.62 },
        { kind: "cast", x: "0%", y: "92.5%", w: "34%", h: "6%", opacity: 0.38 },
        { kind: "ao", x: "50%", y: "88.5%", w: "17%", h: "2.4%", opacity: 0.55 },
        { kind: "ao", x: "38%", y: "88.6%", w: "8%", h: "1.6%", opacity: 0.4 },
      ],
    },
  },
  // Island 2: in the free meadow patch between the rocks (rim 53.5 %, lip 70 % at x 45); morning light from the left.
  // Cell = plate crop (left 681 px, top 468 px, side 142 px of 1672); shadow painted in.
  problem: {
    x: "44.98%",
    y: "63%",
    size: "8.49%",
    xMobile: "43%",
    yMobile: "69.5%",
    sizeMobile: "17.8%",
    shadow: false,
    // Painted shadow measured at ~13 % alpha and blotchy: she floated over the grass. The rocks are
    // lit from the right and lie in dark green pools on their left, a little towards the camera
    // (Juani, 2026-11-20: her cast pointed the other way). Occlusion under the front paws (cell
    // 20-52 %, 88 %) and the hind paws (70-78 %, 72 %), plus a cast down-left like the rocks': from
    // under her hindquarters to past her front paws, fading at its far end.
    contact: {
      tint: "26 46 10",
      layers: [
        { kind: "cast", x: "45%", y: "86%", w: "36%", h: "7%", opacity: 0.48 },
        { kind: "ao", x: "66%", y: "88%", w: "23%", h: "3%", opacity: 0.62 },
        { kind: "ao", x: "24%", y: "82%", w: "9%", h: "2.6%", opacity: 0.62 },
      ],
    },
  },
  // Island 3 places its own painted strips (packsMayo below).
  // Island 4: digging the left soil mound; golden light from the right. The frames were painted on a
  // plate crop (left 31.52 %, width 22.01 %, feet at 67.5 %); on 2026-11-20 Juani asked for her smaller,
  // at the scale of the mini greenhouse: the cell is scaled by 0.6 around her feet and the anchor moved
  // so her nose stays on the mound (desktop 39.6 %, 63 %; mobile 37.5 %, 74.6 %, measured on frame 1).
  // The contact layers are in % of the cell, so they shrink with her. Her shadow is painted in.
  systems: {
    x: "41.35%",
    y: "65.7%",
    size: "13.21%",
    xMobile: "40.19%",
    yMobile: "75.92%",
    sizeMobile: "20.4%",
    shadow: false,
    // The painted shadow is right but light next to the long dark shadows the pot, the mounds and the
    // gear throw to the right: her hind paws (cell 58-72 %, 75 %) hovered. Occlusion under the front
    // paws in the soil (30-50 %, 87 %) and the hind paws, plus a cast to the right like the objects' shadows.
    contact: {
      tint: "58 24 10",
      layers: [
        { kind: "cast", x: "66%", y: "79%", w: "22%", h: "5.5%", opacity: 0.3 },
        { kind: "ao", x: "40%", y: "87.5%", w: "10%", h: "2.2%", opacity: 0.45 },
        { kind: "ao", x: "65%", y: "75.5%", w: "8%", h: "1.8%", opacity: 0.5 },
      ],
    },
  },
  // Island 5, the six steps (option A, "el sendero de seis piedras"): she waits where the
  // path enters the meadow, then reaches one stepping stone per step, back to front, and
  // stands on it; sunset light from the left; shadow painted in. Stone centres read with a
  // 1 % grid on the `-v2-isla` cutouts (desktop and mobile). The scale follows the stones'
  // painted widths (desktop 3.8 % at the back to 4.9 % at the front) and is 1 on the last
  // stone, the anchor: the painted cell is 8.014 % of the desktop plate at stone 4 (where the
  // strips were painted, scale 0.94 here), so 8.535 % on stone 6; on the mobile plate the
  // stones are 1.83 times wider and the path recedes more steeply.
  works: {
    x: "52.3%",
    y: "72.6%",
    size: "8.535%",
    xMobile: "55.2%",
    yMobile: "75%",
    sizeMobile: "16.2%",
    stops: {
      points: [
        [51.8, 51.2, 0.73],
        [56.1, 55.4, 0.78],
        [55.9, 59.4, 0.835],
        [47.3, 62.8, 0.875],
        [44.8, 66.3, 0.94],
        [47.9, 69.6, 0.94],
        [52.3, 72.6, 1],
      ],
      aspect: 941 / 1672,
    },
    stopsMobile: {
      points: [
        [51.5, 63.2, 0.64],
        [63.6, 66.5, 0.69],
        [58.3, 68, 0.78],
        [48, 69.3, 0.845],
        [41, 71.2, 0.91],
        [45.6, 73.3, 0.93],
        [55.2, 75, 1],
      ],
      aspect: 1536 / 864,
    },
    shadow: false,
  },
  // Island 6: resting on the grass facing the campfire (fire at 55 %, 59.5 %; mobile 53 %, 75 %), which lights her from the right.
  // Cell = plate crop (left 681 px, side 142 px of 1672); she faces the fire as painted; shadow painted in.
  host: {
    x: "44.98%", y: "61.1%", size: "8.49%", xMobile: "36%", yMobile: "74.5%", sizeMobile: "17%", shadow: false,
    contact: {
      tint: "31 24 13",
      layers: [
        { kind: "cast", x: "41%", y: "85.5%", w: "66%", h: "9%", opacity: 0.42 },
        { kind: "ao", x: "54%", y: "85%", w: "59%", h: "4%", opacity: 0.62 },
      ],
    },
  },
  // Island 7: trots after a firefly on the meadow behind the front lip (rim 41 %, lip 49.5 %), right of the lantern (36.6 %, 48 %), which lights her from the left.
  // Cell = plate crop (left 711 px, top 354 px, side 100 px of 1672); light and shadow painted in.
  questions: {
    x: "45.51%",
    y: "47%",
    size: "5.98%",
    xMobile: "45%",
    yMobile: "73.5%",
    sizeMobile: "15.4%",
    shadow: false,
    // Seated on the meadow, her painted shadow too faint for the night: the rock beside her rests on a
    // dark base. Occlusion along her seat (cell 22-66 %, 90 %), a cast to the right away from the
    // lantern on her left, and a fainter one down-left from the mint firefly light above-right.
    contact: {
      tint: "2 20 22",
      layers: [
        { kind: "cast", x: "64%", y: "89%", w: "26%", h: "5%", opacity: 0.35 },
        { kind: "cast", x: "36%", y: "92%", w: "18%", h: "3.5%", opacity: 0.2 },
        { kind: "ao", x: "45%", y: "90.5%", w: "24%", h: "3%", opacity: 0.6 },
      ],
    },
  },
};

/* --------------------------------------------------------------- objects */

/** An isolated object placed on a plate: bottom-centre at (x, y), width in % of the plate. */
export type PlateObject = {
  src: string;
  x: string;
  y: string;
  w: string;
  /** Natural size of the AVIF, for layout. */
  width: number;
  height: number;
  /** Additive glow (black background): composited with screen blending. */
  glow?: boolean;
  /** Full tier: gentle idle animation. */
  float?: boolean;
  /** Drifts across the plate with the scroll (the firefly Mayo chases): `x` moves to this value. */
  chasedTo?: string;
  /** Placement on the mobile plate, whose island is framed differently. */
  mobile?: { x: string; y: string; w: string; chasedTo?: string };
};

/** x, y and width in % of the mobile plate, and the chase target. */
type MobilePlacement = [x: number, y: number, w: number, chasedTo?: number];

const obj = (
  name: string,
  width: number,
  height: number,
  x: number,
  y: number,
  w: number,
  extra: Omit<Partial<PlateObject>, "mobile"> = {},
  mobile?: MobilePlacement,
): PlateObject => ({
  src: `${assetRoot}/${name}.avif`,
  width,
  height,
  x: `${x}%`,
  y: `${y}%`,
  w: `${w}%`,
  ...extra,
  ...(mobile
    ? { mobile: { x: `${mobile[0]}%`, y: `${mobile[1]}%`, w: `${mobile[2]}%`, ...(mobile[3] ? { chasedTo: `${mobile[3]}%` } : {}) } }
    : {}),
});

/**
 * Objects per island, in paint order (first = furthest back). The last
 * argument places the object on the mobile plate: its island sits lower and
 * fills more of the width, so the desktop percentages left objects floating
 * in the sky. Read on the mobile plates with a 5 % grid (17 November 2026).
 */
export const plateObjects: Partial<Record<MayoSlotId, readonly PlateObject[]>> = {
  questions: [
    obj("58-isla7-luciernaga-03", 512, 512, 36, 46, 6, { glow: true, float: true }, [30, 63, 9]),
    obj("58-isla7-luciernaga-02", 512, 512, 52, 40, 4, { glow: true, float: true }, [44, 56, 6]),
    obj("58-isla7-luciernaga-01", 512, 512, 60, 48, 3, { glow: true, float: true }, [68, 61, 5]),
    obj("58-isla7-luciernaga-02", 512, 512, 68, 42, 4, { glow: true, float: true }, [80, 58, 6]),
    // Ahead of Mayo's head while she trots along the meadow (mayoAnchors.questions).
    obj("58-isla7-luciernaga-01", 512, 512, 56, 41, 3, { glow: true, float: true }, [58, 64, 5]),
    obj("58-isla7-luciernaga-03", 512, 512, 74, 54, 5, { glow: true, float: true }, [84, 67, 8]),
    obj("58-isla7-luciernaga-01", 512, 512, 26, 50, 3, { glow: true, float: true }, [16, 64, 5]),
    obj("58-isla7-luciernaga-02", 512, 512, 58, 58, 4, { glow: true, float: true }, [58, 66, 6]),
  ],
};

/* ------------------------------------------------------------- platforms */

/** A rock piece of a pack platform on the 1254 x 1254 design canvas of the asset manifest. */
export type PlatformPiece = {
  kind: "base" | "left" | "right" | "top";
  src: string;
  x: number;
  y: number;
  w: number;
  width: number;
  height: number;
};

export type PlatformShadow = { src: string; x: number; y: number; w: number; h: number; under: PlatformPiece["kind"] };

export type Platform = { pieces: readonly PlatformPiece[]; shadows: readonly PlatformShadow[] };

const piece = (kind: PlatformPiece["kind"], name: string, width: number, height: number, x: number, y: number, w: number): PlatformPiece => ({
  kind,
  src: `${assetRoot}/${name}.avif`,
  width,
  height,
  x,
  y,
  w,
});

const shadow = (name: string, geometry: string, under: PlatformPiece["kind"]): PlatformShadow => {
  const [, w, h, x, y] = geometry.match(/^(\d+)x(\d+)\+(\d+)\+(\d+)$/)!;
  return { src: `${assetRoot}/${name}.avif`, w: Number(w), h: Number(h), x: Number(x), y: Number(y), under };
};

export const PLATFORM_CANVAS = 1254;

/** Assembly coordinates from docs/plans/mundo-mayo-assets.md, in paint order. */
export const platforms: readonly Platform[] = [
  {
    pieces: [
      piece("right", "14-p1-der", 736, 938, 765, 355, 350),
      piece("base", "14-p1-base", 1024, 500, 320, 550, 815),
      piece("top", "14-p1-tapa", 980, 670, 390, 400, 450),
      piece("left", "14-p1-izq", 962, 659, 120, 650, 435),
    ],
    shadows: [
      shadow("14-p1-shadow-tapa", "442x192+420+550", "top"),
      shadow("14-p1-shadow-izq", "262x261+320+677", "left"),
    ],
  },
  {
    pieces: [
      piece("base", "15-p2-base", 958, 623, 310, 705, 625),
      piece("right", "15-p2-der", 602, 951, 565, 300, 335),
      piece("left", "15-p2-izq", 614, 872, 340, 420, 320),
      piece("top", "15-p2-tapa", 900, 608, 395, 180, 435),
    ],
    shadows: [
      shadow("15-p2-shadow-der", "295x153+579+705", "right"),
      shadow("15-p2-shadow-izq", "315x455+369+448", "left"),
      shadow("15-p2-shadow-tapa", "412x203+439+300", "top"),
    ],
  },
  {
    pieces: [
      piece("base", "16-p3-base", 952, 597, 240, 675, 740),
      piece("right", "16-p3-der", 550, 903, 550, 300, 345),
      piece("left", "16-p3-izq", 617, 853, 265, 365, 365),
      piece("top", "16-p3-tapa", 908, 699, 420, 130, 385),
    ],
    shadows: [
      shadow("16-p3-shadow-der", "334x221+539+675", "right"),
      shadow("16-p3-shadow-izq", "369x482+285+417", "left"),
      shadow("16-p3-shadow-tapa", "397x155+422+300", "top"),
    ],
  },
];


/* ------------------------------------------------- island 3 rock assembly */

/**
 * Where each assembled platform stands on the island-3 plate (Juani, 19
 * November 2026: "que al scrollear se ordenen pero en un lugar realista"):
 * `x`, `y` are its feet (the bottom centre of its rocks) in % of the plate
 * width and height, on the meadow between the far rim (44 %) and the walkable
 * front edge (59 %); `canvas` is the size of its 1254 design canvas in % of
 * the plate width. The middle platform stands a little further back, so it
 * is drawn a little smaller. Phones scale the plate up (world.css), so the
 * platforms close in to sit under three side-by-side cards.
 */
export type PlatformPlacement = { x: number; y: number; canvas: number };

export const platformPlacements: { desktop: readonly PlatformPlacement[]; mobile: readonly PlatformPlacement[] } = {
  desktop: [
    { x: 26, y: 54.5, canvas: 15.5 },
    { x: 50, y: 51.5, canvas: 14.6 },
    { x: 74, y: 54, canvas: 15.5 },
  ],
  mobile: [
    { x: 32.5, y: 54.5, canvas: 15 },
    { x: 50, y: 51.5, canvas: 14.2 },
    { x: 67.5, y: 54, canvas: 15 },
  ],
};

/**
 * Where a rock floats before the scroll gathers it: its centre in % of the
 * plate, its tilt and its depth. `back` rocks hang behind the island (drawn
 * under the island cutout, so its rim hides their lower part), smaller and
 * hazier; `front` rocks hang in front of the island's underside, larger and
 * slightly out of focus. None floats over the meadow itself, where a real
 * rock would cast a shadow on the grass.
 */
export type RockFloat = { x: number; y: number; rotate: number; scale: number; layer: "back" | "front" };

export const rockFloats: readonly Record<PlatformPiece["kind"], RockFloat>[] = [
  {
    base: { x: 22, y: 77, rotate: -18, scale: 1.22, layer: "front" },
    left: { x: 6, y: 50, rotate: 34, scale: 0.94, layer: "back" },
    right: { x: 31, y: 34, rotate: -26, scale: 0.92, layer: "back" },
    top: { x: 15, y: 25, rotate: 44, scale: 0.9, layer: "back" },
  },
  {
    base: { x: 47, y: 82, rotate: 12, scale: 1.28, layer: "front" },
    left: { x: 42, y: 25, rotate: -38, scale: 0.9, layer: "back" },
    right: { x: 59, y: 41, rotate: 22, scale: 0.92, layer: "back" },
    top: { x: 35, y: 70, rotate: -30, scale: 1.18, layer: "front" },
  },
  {
    base: { x: 69, y: 78, rotate: -10, scale: 1.24, layer: "front" },
    left: { x: 72, y: 40, rotate: 28, scale: 0.92, layer: "back" },
    right: { x: 93, y: 51, rotate: -40, scale: 0.94, layer: "back" },
    top: { x: 86, y: 21, rotate: -52, scale: 0.9, layer: "back" },
  },
];

/**
 * Island 3's pinned stage (Juani, 22 November 2026: "mejorar la visualizacion
 * de la animacion de mayo"): the section is `height` vh tall, so the stage
 * stays pinned for `height - 100` vh of scroll. Every moment of the island is
 * timed in vh of that pinned scroll (0 when the stage pins, 220 when it lets
 * go) and turned into the `--rocks` cover range by `stageCover`, so the
 * timing holds whatever the section's height.
 */
export const rocksStage = { height: 320 } as const;

/** A moment `vh` into the pinned scroll (negative: before the stage pins) as a share of the `--rocks` cover range, in %. */
export const stageCover = (vh: number) => Math.round(((100 + vh) / (rocksStage.height + 100)) * 10000) / 100;

/**
 * Scroll timing of the assembly, in vh of pinned scroll (rocksStage): the
 * rocks float until `start`; each platform then gathers `stagger` after the
 * previous one, its pieces `pieceStagger` apart in landing order (base,
 * left, right, top), each flight lasting `flight` and touching down at
 * `landing` of it. Platform tops land at 52.9, 90.9 and 128.9 vh; Mayo's
 * moments (packsMayo.timing) follow them.
 */
export const rockTiming = { start: 15, stagger: 38, pieceStagger: 5.5, flight: 25.5, landing: 0.84 } as const;

/** Landing order of a platform's pieces: what holds comes before what rests on it. */
export const landingOrder: readonly PlatformPiece["kind"][] = ["base", "left", "right", "top"];

/**
 * Mayo on island 3, painted in place (illustrator, 20 November 2026; manifest
 * docs/plans/mundo-mayo-assets.md): four strips of 640 px cells with alpha,
 * her light and dark-green shadow painted in. `mira` (watching the floating
 * rocks, a loop in time) and `salto` (one hop, scrubbed by the scroll) were
 * painted on the plate crop left 585, top 418, side 134 px of 1672 (centre
 * 38.995 %); `sentarse` (sitting down, once, scrubbed) and `sentada` (seated
 * admiring the third stack, a loop in time) on the assembled plate crop left
 * 978 (centre 62.5 %). All share the cell (8.014 % of the plate width) and
 * the feet line (563 of 640 px, 87.969 % of the cell, at 56.952 % of the
 * plate's height). The joins are the same painted frame: mira f1 = salto f1
 * = salto f12 = sentarse f1, sentarse f6 = sentada f1.
 *
 * `stops` are where she stands, in % of the plate width: she watches from
 * the middle of the gap between the first two platforms (desktop 32.1-46.4 %,
 * phones 38.4-46.5 %), hops a little when the first is done, leaps in front
 * of the second to the gap before the third when the second is done (the
 * sitting crop's centre on desktop), and sits there as the third lands.
 * Phones place the same strips in their own composition, a little larger
 * than on desktop (9 % of the plate against 8.014 %) so she reads on a
 * small screen.
 */
export const packsMayo = {
  strips: {
    mira: { frames: 12, avif: `${assetRoot}/70-mayo-packs-mira-tira.avif`, webp: `${assetRoot}/70-mayo-packs-mira-tira.webp` },
    salto: { frames: 12, avif: `${assetRoot}/70-mayo-packs-salto-tira.avif`, webp: `${assetRoot}/70-mayo-packs-salto-tira.webp` },
    sentarse: { frames: 6, avif: `${assetRoot}/70-mayo-packs-sentarse-tira.avif`, webp: `${assetRoot}/70-mayo-packs-sentarse-tira.webp` },
    sentada: { frames: 12, avif: `${assetRoot}/70-mayo-packs-sentada-tira.avif`, webp: `${assetRoot}/70-mayo-packs-sentada-tira.webp` },
  },
  cell: 640,
  feetY: 87.969,
  y: 56.952,
  size: { desktop: 8.014, mobile: 9 },
  stops: { desktop: [38.995, 40.5, 62.5], mobile: [42, 43, 59] },
  /**
   * Her moments in vh of pinned scroll (rocksStage), each long enough to be
   * watched with a wheel or a flick (a wheel notch is about 11 vh on a
   * 900 px screen): two hop cycles of 40 vh from `hops` (each airborne for
   * 20 vh, right after the first and the second platform land), sitting down
   * over 28 vh as the third has landed, then seated. Her watching loop eases
   * back to its first frame from `miraRest` so it hands over to the hop on
   * the same painted frame, and the seated loop only starts at `sentadaLoop`,
   * so it shows its first frame while it takes over from the sitting down.
   * Both stretches are 18 vh, more than a wheel notch (100 px is 11 to 13 vh
   * on 900 to 768 px screens), so a notch cannot skip them
   * (packs-mayo-clock.tsx).
   * `rests` are the poses the page may settle on (after the small hop, after
   * the leap, seated with the painted plate in).
   */
  timing: { hops: [52, 132], sentarse: [132, 160], miraRest: 34, sentadaLoop: 178, crossfade: [164, 182], rests: [80, 120, 184] },
} as const;

/**
 * Loose rocks that never join a platform (Juani, 19 November 2026: "que queden
 * algunas mas lejanas sin ordenar"): far away behind the island, small, pale
 * and soft (`depth` 0 is near, 1 is the far haze), drifting on their own
 * before and after the order is built. Painted loose rocks and platform pieces
 * reused at other scales and turns. `x`, `y` are their centres and `w` their
 * width, in % of the plate; phones pull them towards the centre like the
 * platform pieces.
 */
export type LooseRock = { src: string; width: number; height: number; x: number; y: number; w: number; rotate: number; depth: number };

const loose = (name: string, width: number, height: number, x: number, y: number, w: number, rotate: number, depth: number): LooseRock => ({
  src: `${assetRoot}/${name}.avif`,
  width,
  height,
  x,
  y,
  w,
  rotate,
  depth,
});

export const looseRocks: readonly LooseRock[] = [
  loose("20-roca-suelta-1", 861, 699, 9, 30, 3.2, -12, 0.55),
  loose("20-roca-suelta-2", 997, 376, 21, 16, 2.4, 18, 0.85),
  loose("16-p3-izq", 617, 853, 37, 33, 1.6, 64, 1),
  loose("20-roca-suelta-3", 995, 388, 63, 19, 2.6, -24, 0.8),
  loose("20-roca-suelta-4", 923, 731, 80, 31, 3, 30, 0.6),
  loose("14-p1-tapa", 980, 670, 95, 22, 2.2, -40, 0.9),
  loose("20-roca-suelta-1", 861, 699, 2, 58, 2.6, 52, 0.7),
  loose("15-p2-izq", 614, 872, 98, 62, 2, -18, 0.75),
  loose("20-roca-suelta-2", 997, 376, 55, 38, 1.8, 8, 0.95),
  loose("20-roca-suelta-4", 923, 731, 89, 44, 1.7, -62, 1),
];

/**
 * The painted end state (illustrator, 19 November 2026): the plate's island
 * cutout with the three stacks painted in (1672 x 941, same framing as
 * `10-isla3-base-isla`), one per composition (phones place the stacks at
 * 32.5 / 50 / 67.5 %). The live stacks crossfade into it at the end of the
 * assembly (world.css `.plate__picture--assembled`); measured against the
 * live render, the painted stacks sit within 1 px of the live ones. Its sky
 * is transparent, so the parallax background and the far rocks stay live.
 */
export const packsAssembledPlate: { desktop?: PlateImage; mobile?: PlateImage } = {
  desktop: desktopPlate("10-isla3-armada-escritorio-isla"),
  mobile: desktopPlate("10-isla3-armada-celular-isla"),
};

/**
 * Each platform's shadow on the grass, measured on the painted plates
 * (`10-isla3-armada-*-isla` against `10-isla3-base-isla`: the darkening of
 * the grass around each stack's feet, weighted by how much darker it is), so
 * the live shadow already has the painted one's place, size and strength and
 * the crossfade does not change it. `dx`, `w` are in % of the plate width and
 * `dy`, `h` in % of its height: the centre's offset from the feet (to the
 * right and a little behind, away from the high front-left sun) and the size
 * of the ellipse (four standard deviations of the measured darkening), then
 * matched against the live render, where the rocks hide the shadow's middle:
 * a little flatter, wider and further right, so the grass beside and in front
 * of each base comes within about 10 levels (of 255) of the painting. At its
 * core the painted shadow keeps about 45 % of the grass's light.
 */
export type GroundShadowShape = { dx: number; dy: number; w: number; h: number };

export const platformGroundShadows: { desktop: readonly GroundShadowShape[]; mobile: readonly GroundShadowShape[] } = {
  desktop: [
    { dx: 2.24, dy: -1.61, w: 19.59, h: 5.8 },
    { dx: 1.57, dy: -0.97, w: 13.55, h: 4.76 },
    { dx: 1.64, dy: -1.09, w: 16.14, h: 5.32 },
  ],
  mobile: [
    { dx: 1.71, dy: -1.11, w: 18.98, h: 4.68 },
    { dx: 1.35, dy: -0.64, w: 14.66, h: 4.4 },
    { dx: 1.97, dy: -1, w: 15.77, h: 4.59 },
  ],
};
