import type { CSSProperties } from "react";

import type { PlateSpec } from "@/content/stage";

type Image = { avif: string; webp: string };

/** The cutout as a CSS image, in the same format the plate's <picture> picks, so the mask is a cache hit. */
const maskOf = ({ avif, webp }: Image) => `image-set(url("${avif}") type("image/avif"), url("${webp}") type("image/webp"))`;

/**
 * Light cast by a painted source onto its island (docs/plans/2026-11-24-ambiente.md):
 * two layers over the plate, masked by the island cutout so the light falls
 * only on the island (grass, rocks, the people and Mayo standing on it) and
 * never on the sky, flickering on two clocks of different length. Where the
 * pools sit is in world.css (`.ambient-light--<kind>`). Decorative only; it
 * joins the page with the island's other ambient layers.
 */
export function SceneLight({ kind, plate }: { kind: "fire" | "lantern"; plate: PlateSpec }) {
  const island = plate.layers?.island;
  if (!island) return null;
  const mobile = plate.mobileLayers?.island ?? island;
  const style = {
    "--amb-mask": maskOf(island),
    "--amb-mask-m": maskOf(mobile),
    "--amb-mask-fallback": `url("${island.webp}")`,
    "--amb-mask-fallback-m": `url("${mobile.webp}")`,
  } as CSSProperties;
  return (
    <>
      <span className={`ambient-light ambient-light--${kind} ambient-light--warm`} style={style} aria-hidden="true" />
      <span className={`ambient-light ambient-light--${kind} ambient-light--glow`} style={style} aria-hidden="true" />
    </>
  );
}
