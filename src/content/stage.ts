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
  problem: { x: "52%", y: "64%", size: "12%", xMobile: "50%", yMobile: "76%", sizeMobile: "28%" },
  systems: { x: "44%", y: "67%", size: "12%", xMobile: "46%", yMobile: "78%", sizeMobile: "28%" },
  works: { x: "50%", y: "61%", size: "11%", xMobile: "50%", yMobile: "75%", sizeMobile: "26%" },
  host: { x: "56%", y: "63%", size: "12%", xMobile: "54%", yMobile: "76%", sizeMobile: "28%" },
  questions: { x: "46%", y: "61%", size: "11%", xMobile: "48%", yMobile: "75%", sizeMobile: "26%" },
};
