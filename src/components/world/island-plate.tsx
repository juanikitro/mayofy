import type { CSSProperties, ReactNode } from "react";

import type { PlateSpec } from "@/content/stage";

/**
 * A generated island plate as the background of a scene. The plate keeps
 * its own aspect ratio and covers the scene like `object-fit: cover`,
 * anchored at the bottom and at `anchorX` horizontally; everything placed
 * inside (objects, Mayo) is positioned in percent of the plate, so anchors
 * measured on the image hold at any viewport size.
 */
export function IslandPlate({
  plate,
  children,
  eager = false,
}: {
  plate: PlateSpec;
  children?: ReactNode;
  eager?: boolean;
}) {
  const style = {
    "--plate-ratio": `${plate.desktop.width} / ${plate.desktop.height}`,
    "--plate-ratio-m": plate.mobile
      ? `${plate.mobile.width} / ${plate.mobile.height}`
      : `${plate.desktop.width} / ${plate.desktop.height}`,
    "--plate-x": plate.anchorX ?? "50%",
  } as CSSProperties;

  return (
    <div className="plate" style={style}>
      <picture className="plate__picture">
        {plate.mobile ? (
          <source media="(max-width: 48rem)" type="image/avif" srcSet={plate.mobile.avif} />
        ) : null}
        <source type="image/avif" srcSet={plate.desktop.avif} />
        <img
          src={plate.desktop.webp}
          alt=""
          width={plate.desktop.width}
          height={plate.desktop.height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={eager ? "high" : "auto"}
        />
      </picture>
      {children}
    </div>
  );
}
