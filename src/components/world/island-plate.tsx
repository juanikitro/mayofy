import type { CSSProperties, ReactNode } from "react";

import type { PlateSpec } from "@/content/stage";

/** A transparent 1 x 1 GIF, for a picture source that must not download anything. */
const BLANK_PIXEL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

/**
 * Height of the plate as a fraction of its width (desktop and mobile) and the
 * share of it the island art takes, set on the section (or the scene) so the
 * sky can reach the plate's top colour where the plate starts (`--plate-top`
 * in world.css) and the content can stop above the island (`.isle` padding).
 */
export function plateSceneStyle(plate: PlateSpec) {
  const mobile = plate.mobile ?? plate.desktop;
  return {
    "--plate-h": plate.desktop.height / plate.desktop.width,
    "--plate-h-m": mobile.height / mobile.width,
    ...(plate.clear ? { "--plate-clear": plate.clear.desktop, "--plate-clear-m": plate.clear.mobile } : {}),
  } as CSSProperties;
}

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
    const mobileLayers = plate.mobileLayers;
    const className = mobileLayers ? "plate plate--layered plate--layered-mobile" : "plate plate--layered";
    return (
      <div className={className} style={style}>
        <picture className="plate__picture plate__picture--background">
          {/* Each phone AVIF has its WebP twin: without AVIF (Safari 15 and
              older) the browser would otherwise skip to the desktop crop. */}
          {mobileLayers ? (
            <>
              <source media="(max-width: 48rem)" type="image/avif" srcSet={mobileLayers.background.avif} />
              <source media="(max-width: 48rem)" type="image/webp" srcSet={mobileLayers.background.webp} />
            </>
          ) : plate.mobile ? (
            <>
              <source media="(max-width: 48rem)" type="image/avif" srcSet={plate.mobile.avif} />
              <source media="(max-width: 48rem)" type="image/webp" srcSet={plate.mobile.webp} />
            </>
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
          {/* Without a mobile pair the cutout is hidden on phones (world.css), yet an eager
              <img> still downloads it: a blank pixel there keeps the desktop file off phones. */}
          <source
            media="(max-width: 48rem)"
            type={mobileLayers ? "image/avif" : undefined}
            srcSet={mobileLayers ? mobileLayers.island.avif : BLANK_PIXEL}
          />
          {mobileLayers ? <source media="(max-width: 48rem)" type="image/webp" srcSet={mobileLayers.island.webp} /> : null}
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
          <>
            <source media="(max-width: 48rem)" type="image/avif" srcSet={plate.mobile.avif} />
            <source media="(max-width: 48rem)" type="image/webp" srcSet={plate.mobile.webp} />
          </>
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
