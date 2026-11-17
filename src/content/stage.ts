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
