/**
 * Where Mayo stands on each island. One slot per MayoFigure in the page,
 * in journey order. `moment` is the entry of src/lib/mayo/moments.ts whose
 * camera framed the captured images; the full tier uses the same camera,
 * so the image → 3D swap is exact. `size` is the side of Mayo's square
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

export const mayoModelUrl = "/mayo/mayo.glb";

/* ---------------------------------------------------------------- plates */

export type PlateImage = { avif: string; webp: string; width: number; height: number };

export type PlateSpec = {
  desktop: PlateImage;
  mobile?: PlateImage;
  /** Horizontal anchor kept in view when the plate is cropped (default 50%). */
  anchorX?: string;
};

const assetRoot = "/images/mundo-mayo";

function plateImage(name: string, width: number, height: number): PlateImage {
  return { avif: `${assetRoot}/${name}.avif`, webp: `${assetRoot}/${name}.webp`, width, height };
}

const desktopPlate = (name: string) => plateImage(name, 1672, 941);
const mobilePlate = (name: string) => plateImage(name, 864, 1536);

/** Generated plates per island (asset manifest docs/plans/mundo-mayo-assets.md). */
export const islandPlates = {
  hero: { desktop: desktopPlate("01-hero-escritorio"), mobile: mobilePlate("02-hero-celular"), anchorX: "72%" },
  problem: { desktop: desktopPlate("30-isla2-escritorio"), mobile: mobilePlate("30-isla2-celular") },
  packs: { desktop: desktopPlate("10-isla3-base") },
  systems: { desktop: desktopPlate("40-isla4-escritorio"), mobile: mobilePlate("40-isla4-celular") },
  works: { desktop: desktopPlate("45-isla5-escritorio"), mobile: mobilePlate("45-isla5-celular") },
  host: { desktop: desktopPlate("50-isla6-escritorio"), mobile: mobilePlate("50-isla6-celular") },
  questions: { desktop: desktopPlate("55-isla7-escritorio"), mobile: mobilePlate("55-isla7-celular") },
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
};

export const mayoAnchors: Partial<Record<MayoSlotId, MayoAnchor>> = {
  hero: { x: "58%", y: "69%", size: "13%", xMobile: "52%", yMobile: "79%", sizeMobile: "30%" },
  problem: { x: "46%", y: "63%", size: "12%", xMobile: "50%", yMobile: "76%", sizeMobile: "28%" },
  systems: { x: "40%", y: "74%", size: "12%", xMobile: "40%", yMobile: "80%", sizeMobile: "28%" },
  works: { x: "48%", y: "60%", size: "11%", xMobile: "50%", yMobile: "75%", sizeMobile: "26%" },
  host: { x: "45%", y: "64%", size: "12%", xMobile: "48%", yMobile: "77%", sizeMobile: "28%" },
  questions: { x: "40%", y: "62%", size: "11%", xMobile: "44%", yMobile: "75%", sizeMobile: "26%" },
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
};

const obj = (name: string, width: number, height: number, x: number, y: number, w: number, extra: Partial<PlateObject> = {}): PlateObject => ({
  src: `${assetRoot}/${name}.avif`,
  width,
  height,
  x: `${x}%`,
  y: `${y}%`,
  w: `${w}%`,
  ...extra,
});

/** Objects per island, in paint order (first = furthest back). */
export const plateObjects: Partial<Record<MayoSlotId, readonly PlateObject[]>> = {
  problem: [
    obj("33-isla2-roca-04", 1024, 500, 30, 62, 8, { float: true }),
    obj("33-isla2-roca-02", 1024, 486, 62, 60, 9, { float: true }),
    obj("33-isla2-roca-06", 1024, 520, 72, 66, 7, { float: true }),
    obj("33-isla2-roca-01", 916, 780, 36, 70, 7, { float: true }),
    obj("33-isla2-roca-05", 1024, 520, 56, 69, 6, { float: true }),
    obj("33-isla2-roca-03", 994, 464, 66, 74, 8, { float: true }),
    obj("33-isla2-roca-07", 1024, 520, 24, 72, 5, { float: true }),
    obj("33-isla2-roca-08", 1024, 520, 50, 76, 6, { float: true }),
  ],
  systems: [
    obj("43-isla4-invernadero", 1024, 807, 64, 72, 18),
    obj("43-isla4-tierra-02", 1024, 423, 30, 73, 9),
    obj("43-isla4-tierra-01", 1024, 423, 46, 77, 11),
    obj("43-isla4-maceta", 863, 700, 25, 71, 5),
    obj("43-isla4-engranaje", 996, 692, 51, 75, 6),
    obj("43-isla4-caja", 1024, 684, 74, 64, 7),
  ],
  works: [
    obj("48-isla5-paso-01", 1024, 522, 52, 54, 6),
    obj("48-isla5-hito-01", 883, 672, 56, 52, 3),
    obj("48-isla5-paso-02", 1024, 522, 47, 58, 6),
    obj("48-isla5-hito-02", 883, 672, 43, 56, 3),
    obj("48-isla5-paso-03", 1024, 522, 42, 62, 6),
    obj("48-isla5-hito-03", 883, 672, 46, 60, 3),
    obj("48-isla5-paso-04", 1024, 522, 43, 66, 6),
    obj("48-isla5-hito-04", 883, 672, 39, 65, 3),
    obj("48-isla5-paso-05", 1024, 522, 48, 70, 6),
    obj("48-isla5-hito-05", 883, 672, 52, 68, 3),
    obj("48-isla5-paso-06", 1024, 522, 53, 73, 6),
    obj("48-isla5-hito-06", 883, 672, 57, 71, 3),
  ],
  host: [
    obj("53-isla6-banco", 1024, 457, 66, 61, 12),
    obj("53-isla6-fogon", 1024, 1024, 56, 66, 9),
  ],
  questions: [
    obj("58-isla7-farol", 592, 1024, 30, 58, 4),
    obj("58-isla7-luciernaga-03", 512, 512, 36, 46, 6, { glow: true, float: true }),
    obj("58-isla7-luciernaga-02", 512, 512, 52, 40, 4, { glow: true, float: true }),
    obj("58-isla7-luciernaga-01", 512, 512, 60, 48, 3, { glow: true, float: true }),
    obj("58-isla7-luciernaga-02", 512, 512, 68, 42, 4, { glow: true, float: true }),
    obj("58-isla7-luciernaga-01", 512, 512, 44, 52, 3, { glow: true, float: true }),
    obj("58-isla7-luciernaga-03", 512, 512, 74, 54, 5, { glow: true, float: true }),
    obj("58-isla7-luciernaga-01", 512, 512, 26, 50, 3, { glow: true, float: true }),
    obj("58-isla7-luciernaga-02", 512, 512, 58, 58, 4, { glow: true, float: true }),
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

