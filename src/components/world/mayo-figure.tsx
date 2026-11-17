import type { CSSProperties } from "react";

import { getMayoSlot, mayoAnchors, mayoPoseSources, mayoSprites, type MayoAnchor, type MayoSlotId } from "@/content/stage";

/**
 * Scroll travel as `translate` offsets in Mayo's own widths (a percentage of
 * `translate` is relative to the element), so the run and the chase move on
 * the compositor instead of re-laying out `left` on every scrolled frame.
 * Offsets are measured from the anchor, where she rests without motion.
 */
function travelOffsets(anchor: MayoAnchor) {
  if (!anchor.travel) return {};
  const pct = (value: string) => Number.parseFloat(value);
  const offset = (to: string, x: string, size: string) => `${((pct(to) - pct(x)) / pct(size)) * 100}%`;
  const xMobile = anchor.xMobile ?? anchor.x;
  const sizeMobile = anchor.sizeMobile ?? anchor.size;
  return {
    "--travel-from-d": offset(anchor.travel.from, anchor.x, anchor.size),
    "--travel-to-d": offset(anchor.travel.to, anchor.x, anchor.size),
    "--travel-from-m": offset(anchor.travel.from, xMobile, sizeMobile),
    "--travel-to-m": offset(anchor.travel.to, xMobile, sizeMobile),
  };
}

/**
 * Mayo's slot on an island. When the slot has a painted sprite strip
 * (`mayoSprites`) it renders that strip: a square window over an <img>
 * `frames` times wider, stepped by CSS one cell at a time in the full tier;
 * the reduced tier and the no-JavaScript first paint show the first frame.
 * Slots without a strip show the captured still of the slot's moment.
 */
export function MayoFigure({
  slot,
  className = "",
  eager = false,
}: {
  slot: MayoSlotId;
  className?: string;
  eager?: boolean;
}) {
  const { moment, label, size } = getMayoSlot(slot);
  const sources = mayoPoseSources(moment);
  const sprite = mayoSprites[slot];
  const loading = eager ? "eager" : "lazy";
  const anchor = mayoAnchors[slot];
  const style = (
    anchor
      ? ({
          "--mayo-size": size,
          "--feet-y": sprite?.feetY ?? "80%",
          "--anchor-x": anchor.x,
          "--anchor-y": anchor.y,
          "--anchor-size": anchor.size,
          "--anchor-x-m": anchor.xMobile ?? anchor.x,
          "--anchor-y-m": anchor.yMobile ?? anchor.y,
          "--anchor-size-m": anchor.sizeMobile ?? anchor.size,
          ...travelOffsets(anchor),
        } as Record<string, string>)
      : ({ "--mayo-size": size, "--feet-y": sprite?.feetY ?? "100%" } as Record<string, string>)
  ) as CSSProperties;

  return (
    <div
      className={[
        "mayo",
        `mayo--${slot}`,
        anchor ? "mayo--anchored" : "",
        anchor && anchor.shadow !== false ? "mayo--shadow" : "",
        anchor?.face === "right" ? "mayo--face-right" : "",
        anchor?.travel ? "mayo--travel" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-mayo-slot={slot}
      data-mayo-moment={moment}
      style={style}
    >
      {sprite ? (
        <div
          className="mayo__sprite"
          style={{ "--frames": sprite.frames, "--fps": sprite.fps, "--loop": sprite.loop === "cycle" ? "normal" : "alternate" } as CSSProperties}
        >
          <picture>
            <source type="image/avif" srcSet={sprite.strip.avif} />
            <img
              src={sprite.strip.webp}
              alt={label}
              width={sprite.cell * sprite.frames}
              height={sprite.cell}
              loading={loading}
              decoding="async"
              fetchPriority={eager ? "high" : "auto"}
            />
          </picture>
        </div>
      ) : (
        <picture className="mayo__picture mayo__picture--still">
          <source type="image/avif" srcSet={sources.still.avif} />
          <img
            src={sources.still.webp}
            alt={label}
            width={1600}
            height={1600}
            loading={loading}
            decoding="async"
            fetchPriority={eager ? "high" : "auto"}
          />
        </picture>
      )}
    </div>
  );
}
