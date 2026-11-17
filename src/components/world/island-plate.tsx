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

  const loading = eager ? "eager" : "lazy";
  const priority = eager ? "high" : "auto";

  if (plate.layers) {
    // Parallax pair: the background (sky, clouds, far islands) drifts slower
    // than the island cutout; mobile keeps the single plate.
    return (
      <div className="plate plate--layered" style={style}>
        <picture className="plate__picture plate__picture--background">
          {plate.mobile ? (
            <source media="(max-width: 48rem)" type="image/avif" srcSet={plate.mobile.avif} />
          ) : null}
          <source type="image/avif" srcSet={plate.layers.background.avif} />
          <img
            src={plate.layers.background.webp}
            alt=""
            width={plate.layers.background.width}
            height={plate.layers.background.height}
            loading={loading}
            decoding="async"
            fetchPriority={priority}
          />
        </picture>
        <picture className="plate__picture plate__picture--island">
          <source type="image/avif" srcSet={plate.layers.island.avif} />
          <img
            src={plate.layers.island.webp}
            alt=""
            width={plate.layers.island.width}
            height={plate.layers.island.height}
            loading={loading}
            decoding="async"
            fetchPriority={priority}
          />
        </picture>
        {children}
      </div>
    );
  }

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
          loading={loading}
          decoding="async"
          fetchPriority={priority}
        />
      </picture>
      {children}
    </div>
  );
}
