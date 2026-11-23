/**
 * Phone copies of Mayo's sprite strips: the same frames with 320 px cells
 * (`70-mayo-<name>-tira-cel.avif`, AVIF quality 85 like the originals, cut
 * cell by cell from the painted masters). A 390 px phone shows her cell at
 * 56 to 101 CSS px, so even at 3x the 640 px cells carried about four times
 * the pixels it can show; the copies weigh ~38 % of the originals
 * (docs/plans/2026-11-23-rendimiento-celular.md). Up to 480 px wide only, so
 * portrait tablets, which show her at up to ~200 px, keep the full cells.
 * The fall strip shows her at ~600 px on phones and has no copy.
 */
export const PHONE_STRIP_MEDIA = "(max-width: 30rem)";

const withPhoneCopy = new Set([
  "hero-v2",
  "problem-v2",
  "systems-v2",
  "works-v3",
  "works-llegada",
  "works-salto",
  "host-v2",
  "questions-v2",
  "packs-mira",
  "packs-salto",
  "packs-sentarse",
  "packs-sentada",
]);

/** The phone copy of a strip's AVIF, or undefined when the strip has none. */
export function phoneStrip(avif: string) {
  const match = avif.match(/^(.*\/70-mayo-)(.+)-tira\.avif$/);
  return match && withPhoneCopy.has(match[2]) ? `${match[1]}${match[2]}-tira-cel.avif` : undefined;
}
