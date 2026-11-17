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

/** Public paths of the captured images for a moment. */
export function mayoPoseSources(moment: string) {
  const base = `/mayo/poses/mayo-pose-${moment}`;
  return {
    still: { avif: `${base}.avif`, webp: `${base}.webp` },
    loop: { avif: `${base}-loop.avif`, webp: `${base}-loop.webp` },
  };
}

/* --------------------------------------------------------------- sprites */

/**
 * Painted Mayo, animated by frames: a horizontal strip of square cells
 * (1024 x 1024, 4-6 frames) played at `fps`, in the island style. When a
 * slot has a strip, MayoFigure renders it instead of the still/loop
 * pictures. Strips arrive as `/images/mundo-mayo/70-mayo-<slot>-tira.avif|.webp`.
 */
export type MayoSprite = {
  strip: { avif: string; webp: string };
  frames: number;
  fps: number;
  cell: number;
  /** Feet line as a percentage of the cell height (manifest "feet anchor"). */
  feetY: string;
  /** `pingpong` plays the strip forward then backward so the last frame never
   * jumps to the first; `cycle` is for motions painted as a closed loop (run, chase). */
  loop: "pingpong" | "cycle";
};

const sprite = (slot: MayoSlotId, frames: number, fps: number, feetY: string, loop: MayoSprite["loop"] = "pingpong"): MayoSprite => ({
  strip: { avif: `/images/mundo-mayo/70-mayo-${slot}-tira.avif`, webp: `/images/mundo-mayo/70-mayo-${slot}-tira.webp` },
  frames,
  fps,
  cell: 640,
  feetY,
  loop,
});

/** Painted strips delivered so far (manifest docs/plans/mundo-mayo-assets.md). */
export const mayoSprites: Partial<Record<MayoSlotId, MayoSprite>> = {
  hero: sprite("hero", 12, 10, "94.7%"),
  fall: sprite("fall", 12, 10, "87.9%"),
  problem: sprite("problem", 12, 10, "92.8%"),
  packs: sprite("packs", 12, 10, "90.8%", "cycle"),
  systems: sprite("systems", 12, 10, "94%"),
  works: sprite("works", 12, 10, "87%", "cycle"),
  host: sprite("host", 12, 8, "91%"),
  questions: sprite("questions", 12, 10, "91%", "cycle"),
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
   * so panels never cover the island. Measured on the plates and objects.
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
    desktop: desktopPlate("30-isla2-escritorio"),
    mobile: mobilePlate("30-isla2-celular"),
    layers: { background: desktopPlate("30-isla2-escritorio-fondo"), island: desktopPlate("30-isla2-escritorio-isla") },
    mobileLayers: { background: mobilePlate("30-isla2-celular-fondo"), island: mobilePlate("30-isla2-celular-isla") },
    clear: { desktop: 0.49, mobile: 0.43 },
  },
  packs: {
    desktop: desktopPlate("10-isla3-base"),
    // No mobile plate: the same pair serves both sizes, so the cutout stays visible on phones.
    layers: { background: desktopPlate("10-isla3-base-fondo"), island: desktopPlate("10-isla3-base-isla") },
    mobileLayers: { background: desktopPlate("10-isla3-base-fondo"), island: desktopPlate("10-isla3-base-isla") },
  },
  systems: {
    desktop: desktopPlate("40-isla4-escritorio"),
    mobile: mobilePlate("40-isla4-celular"),
    layers: { background: desktopPlate("40-isla4-escritorio-fondo"), island: desktopPlate("40-isla4-escritorio-isla") },
    mobileLayers: { background: mobilePlate("40-isla4-celular-fondo"), island: mobilePlate("40-isla4-celular-isla") },
    // Greenhouse roof at 47 % of the desktop plate.
    clear: { desktop: 0.53, mobile: 0.37 },
  },
  works: {
    desktop: desktopPlate("45-isla5-escritorio"),
    mobile: mobilePlate("45-isla5-celular"),
    layers: { background: desktopPlate("45-isla5-escritorio-fondo"), island: desktopPlate("45-isla5-escritorio-isla") },
    mobileLayers: { background: mobilePlate("45-isla5-celular-fondo"), island: mobilePlate("45-isla5-celular-isla") },
    // Path milestones from 48 % (desktop) and 51 % (mobile).
    clear: { desktop: 0.53, mobile: 0.5 },
  },
  host: {
    desktop: desktopPlate("50-isla6-escritorio"),
    mobile: mobilePlate("50-isla6-celular"),
    layers: { background: desktopPlate("50-isla6-escritorio-fondo"), island: desktopPlate("50-isla6-escritorio-isla") },
    mobileLayers: { background: mobilePlate("50-isla6-celular-fondo"), island: mobilePlate("50-isla6-celular-isla") },
    // Tree tops and Mayo's ears from 46 %; bench and campfire from 59 % on mobile.
    clear: { desktop: 0.54, mobile: 0.41 },
  },
  questions: {
    desktop: desktopPlate("55-isla7-escritorio"),
    mobile: mobilePlate("55-isla7-celular"),
    layers: { background: desktopPlate("55-isla7-escritorio-fondo"), island: desktopPlate("55-isla7-escritorio-isla") },
    mobileLayers: { background: mobilePlate("55-isla7-celular-fondo"), island: mobilePlate("55-isla7-celular-isla") },
    // The lantern from 46 % (desktop) and 54 % (mobile); the fireflies may rise above it.
    clear: { desktop: 0.54, mobile: 0.46 },
  },
} as const satisfies Record<string, PlateSpec>;

/**
 * Where Mayo's feet touch each plate, in percent of the plate, and the side
 * of her square as a percent of the plate width (analysis §4). Mobile
 * plates are taller: the same object sits lower and the square grows.
 */
export type MayoAnchor = {
  x: string;
  y: string;
  size: string;
  xMobile?: string;
  yMobile?: string;
  sizeMobile?: string;
  /** The strips are painted facing left; `right` mirrors Mayo towards what she interacts with. */
  face?: "left" | "right";
  /** Scroll-driven travel across the plate: `x` moves from `from` to `to` while the island crosses the viewport. */
  travel?: { from: string; to: string };
  /** Contact shadow under the feet (default on; off when airborne). */
  shadow?: boolean;
};

export const mayoAnchors: Partial<Record<MayoSlotId, MayoAnchor>> = {
  // Hero: seated inside the meadow, between the sign and the right edge.
  hero: { x: "54%", y: "70%", size: "13%", xMobile: "64%", yMobile: "79%", sizeMobile: "30%" },
  // Island 2: play bow in front of the loose rocks she is "sorting" (rocks 07 and 01 sit to her left).
  problem: { x: "38%", y: "71%", size: "12%", xMobile: "42%", yMobile: "73%", sizeMobile: "26%" },
  // Island 3: jumps on the meadow beside the third platform (anchored on the plate, not on a card).
  packs: { x: "85%", y: "53%", size: "10%", xMobile: "74%", yMobile: "50%", sizeMobile: "24%" },
  // Island 4: digging into the soil mound (tierra-02 at 30 %, 73 %).
  systems: { x: "36%", y: "74%", size: "12%", xMobile: "40%", yMobile: "78.5%", sizeMobile: "22%" },
  // Island 5: runs right-to-left across the meadow below the path while the island scrolls by.
  works: { x: "50%", y: "66%", size: "11%", xMobile: "50%", yMobile: "76.5%", sizeMobile: "26%", travel: { from: "68%", to: "30%" } },
  // Island 6: resting, turned towards the campfire (fogon at 56 %, 66 %).
  host: { x: "44%", y: "66%", size: "12%", xMobile: "37%", yMobile: "76%", sizeMobile: "24%", face: "right" },
  // Island 7: chases a firefly that drifts ahead of her, away from the lantern.
  questions: { x: "40%", y: "62%", size: "11%", xMobile: "40%", yMobile: "75%", sizeMobile: "26%", face: "right", travel: { from: "30%", to: "52%" } },
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
  problem: [
    obj("33-isla2-roca-04", 1024, 500, 30, 62, 8, { float: true }, [28, 66, 12]),
    obj("33-isla2-roca-02", 1024, 486, 62, 60, 9, { float: true }, [60, 65.5, 13]),
    obj("33-isla2-roca-06", 1024, 520, 72, 66, 7, { float: true }, [77, 67.5, 10]),
    obj("33-isla2-roca-01", 916, 780, 36, 70, 7, { float: true }, [30, 70.5, 10]),
    obj("33-isla2-roca-05", 1024, 520, 56, 69, 6, { float: true }, [58, 69.5, 9]),
    obj("33-isla2-roca-03", 994, 464, 66, 74, 8, { float: true }, [70, 72, 12]),
    obj("33-isla2-roca-07", 1024, 520, 24, 72, 5, { float: true }, [16, 71.5, 8]),
    obj("33-isla2-roca-08", 1024, 520, 50, 76, 6, { float: true }, [52, 73.5, 9]),
  ],
  systems: [
    obj("43-isla4-invernadero", 1024, 807, 64, 72, 18, {}, [70, 76, 20]),
    obj("43-isla4-tierra-02", 1024, 423, 30, 73, 9, {}, [36, 77, 12]),
    obj("43-isla4-tierra-01", 1024, 423, 46, 77, 11, {}, [52, 78.5, 13]),
    obj("43-isla4-maceta", 863, 700, 25, 71, 5, {}, [22, 76, 6]),
    obj("43-isla4-engranaje", 996, 692, 51, 75, 6, {}, [58, 77.5, 7]),
    obj("43-isla4-caja", 1024, 684, 74, 64, 7, {}, [83, 76.5, 8]),
  ],
  works: [
    obj("48-isla5-paso-01", 1024, 522, 52, 54, 6, {}, [57, 64.8, 8]),
    obj("48-isla5-hito-01", 883, 672, 56, 52, 3, {}, [49, 64.4, 3.5]),
    obj("48-isla5-paso-02", 1024, 522, 47, 58, 6, {}, [63, 67, 8]),
    obj("48-isla5-hito-02", 883, 672, 43, 56, 3, {}, [71, 67.4, 3.5]),
    obj("48-isla5-paso-03", 1024, 522, 42, 62, 6, {}, [51, 69.2, 8]),
    obj("48-isla5-hito-03", 883, 672, 46, 60, 3, {}, [60, 70, 3.5]),
    obj("48-isla5-paso-04", 1024, 522, 43, 66, 6, {}, [41, 71.2, 8]),
    obj("48-isla5-hito-04", 883, 672, 39, 65, 3, {}, [32, 71.6, 3.5]),
    obj("48-isla5-paso-05", 1024, 522, 48, 70, 6, {}, [45, 74, 8]),
    obj("48-isla5-hito-05", 883, 672, 52, 68, 3, {}, [36, 74.6, 3.5]),
    obj("48-isla5-paso-06", 1024, 522, 53, 73, 6, {}, [55, 76, 8]),
    obj("48-isla5-hito-06", 883, 672, 57, 71, 3, {}, [64, 75.8, 3.5]),
  ],
  host: [
    obj("53-isla6-banco", 1024, 457, 66, 61, 12, {}, [66, 72.5, 16]),
    obj("53-isla6-fogon", 1024, 1024, 56, 66, 9, {}, [53, 75, 12]),
  ],
  questions: [
    obj("58-isla7-farol", 592, 1024, 30, 58, 4, {}, [19, 76, 6]),
    obj("58-isla7-luciernaga-03", 512, 512, 36, 46, 6, { glow: true, float: true }, [30, 63, 9]),
    obj("58-isla7-luciernaga-02", 512, 512, 52, 40, 4, { glow: true, float: true }, [44, 56, 6]),
    obj("58-isla7-luciernaga-01", 512, 512, 60, 48, 3, { glow: true, float: true }, [68, 61, 5]),
    obj("58-isla7-luciernaga-02", 512, 512, 68, 42, 4, { glow: true, float: true }, [80, 58, 6]),
    obj("58-isla7-luciernaga-01", 512, 512, 44, 52, 3, { glow: true, float: true, chasedTo: "66%" }, [44, 69, 5, 68]),
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

