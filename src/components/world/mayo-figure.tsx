import type { CSSProperties } from "react";

import { getMayoSlot, mayoAnchors, mayoPoseSources, type MayoSlotId } from "@/content/stage";

/**
 * Mayo's slot on an island. Renders the captured images of the slot's
 * moment: the still (static tier and first paint) and the animated loop
 * (lite tier). The full tier hides both once the real-time canvas is ready
 * (`html[data-mayo3d="ready"]`) and draws Mayo on this exact square, with
 * the same camera the images were captured with.
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
  const loading = eager ? "eager" : "lazy";
  const anchor = mayoAnchors[slot];
  const style = (
    anchor
      ? ({
          "--mayo-size": size,
          "--anchor-x": anchor.x,
          "--anchor-y": anchor.y,
          "--anchor-size": anchor.size,
          "--anchor-x-m": anchor.xMobile ?? anchor.x,
          "--anchor-y-m": anchor.yMobile ?? anchor.y,
          "--anchor-size-m": anchor.sizeMobile ?? anchor.size,
        } as Record<string, string>)
      : ({ "--mayo-size": size } as Record<string, string>)
  ) as CSSProperties;

  return (
    <div
      className={`mayo mayo--${slot}${anchor ? " mayo--anchored" : ""} ${className}`.trim()}
      data-mayo-slot={slot}
      data-mayo-moment={moment}
      style={style}
    >
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
      <picture className="mayo__picture mayo__picture--loop">
        <source type="image/avif" srcSet={sources.loop.avif} />
        <img src={sources.loop.webp} alt="" width={800} height={800} loading="lazy" decoding="async" />
      </picture>
    </div>
  );
}
