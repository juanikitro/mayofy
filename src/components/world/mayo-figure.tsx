import type { CSSProperties } from "react";

import { getMayoSlot, mayoAnchors, mayoPoseSources, mayoSprites, type MayoAnchor, type MayoContactLayer, type MayoSlotId, type MayoSprite } from "@/content/stage";

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
  const travelMobile = anchor.travelMobile ?? anchor.travel;
  return {
    "--travel-from-d": offset(anchor.travel.from, anchor.x, anchor.size),
    "--travel-to-d": offset(anchor.travel.to, anchor.x, anchor.size),
    "--travel-from-m": offset(travelMobile.from, xMobile, sizeMobile),
    "--travel-to-m": offset(travelMobile.to, xMobile, sizeMobile),
  };
}

/** Contact shadow lean and strength, away from the island's key light. */
function shadowStyle(anchor: MayoAnchor) {
  if (!anchor.shadow) return {};
  return { "--shadow-lean": anchor.shadow.lean, "--shadow-opacity": String(anchor.shadow.opacity) };
}

/**
 * Ground contact under a painted-in sprite: every ellipse becomes one
 * radial-gradient layer of a single still box behind the strip, so the
 * shadow never steps with the frames. Normal blending in the plate's own
 * shadow tint stands in for multiply: `.mayo--anchored` is transformed, an
 * isolated group in which multiply would only blend with transparency.
 */
function contactStyle(anchor: MayoAnchor) {
  if (!anchor.contact) return {};
  const { tint, layers } = anchor.contact;
  const ellipse = ({ x, y, w, h, opacity }: MayoContactLayer) =>
    `radial-gradient(${w} ${h} at ${x} ${y}, rgb(${tint} / ${opacity}), rgb(${tint} / ${(opacity * 0.5).toFixed(3)}) 50%, rgb(${tint} / 0))`;
  return { "--mayo-contact": layers.map(ellipse).join(", ") };
}

/**
 * The scroll range that steps the sprite (and drives the travel), read by
 * world.css: the slot's named timeline and its desktop and mobile ranges.
 */
function scrubStyle(sprite: MayoSprite | undefined) {
  if (!sprite) return {};
  const { timeline, range, rangeMobile, cycles, cyclesMobile = cycles } = sprite.scrub;
  return {
    "--scrub-timeline": timeline,
    "--scrub-range-d": range,
    "--scrub-range-m": rangeMobile ?? range,
    "--cycles-d": String(cycles),
    "--cycles-m": String(cyclesMobile),
    // The travel advances once per painted frame, never between two, so a
    // held pose never glides over the meadow.
    "--travel-steps-d": String(Math.round(cycles * sprite.frames)),
    "--travel-steps-m": String(Math.round(cyclesMobile * sprite.frames)),
  };
}

/**
 * Mayo's slot on an island. When the slot has a painted sprite strip
 * (`mayoSprites`) it renders that strip: a square window over an <img>
 * `frames` times wider, stepped by CSS one cell at a time as the page
 * scrolls (the slot's `scrub` timeline and range), so she only moves while
 * the reader scrolls and rewinds when they scroll back. Without scroll-driven
 * animations, in the reduced tier and with reduced motion she shows the
 * first frame.
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
          ...shadowStyle(anchor),
          ...contactStyle(anchor),
          ...scrubStyle(sprite),
        } as Record<string, string>)
      : ({ "--mayo-size": size, "--feet-y": sprite?.feetY ?? "100%", ...scrubStyle(sprite) } as Record<string, string>)
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
      {anchor?.contact ? <span className="mayo__contact" aria-hidden="true" /> : null}
      {sprite ? (
        <div
          className="mayo__sprite"
          style={{ "--frames": sprite.frames, "--loop": sprite.loop === "cycle" ? "normal" : "alternate" } as CSSProperties}
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
