import type { CSSProperties } from "react";

type GlowPosition = { x: string; y: string; w: string };

/**
 * A warm light breathing over a light source painted in a plate (the island 6
 * campfire, the island 7 lantern). Centred on (x, y) in percent of the plate,
 * `w` wide; `mobile` places it on the mobile plate. Decorative only.
 */
export function SceneGlow({
  kind,
  desktop,
  mobile,
}: {
  kind: "fire" | "lantern";
  desktop: GlowPosition;
  mobile: GlowPosition;
}) {
  const style = {
    "--x": desktop.x,
    "--y": desktop.y,
    "--w": desktop.w,
    "--x-m": mobile.x,
    "--y-m": mobile.y,
    "--w-m": mobile.w,
  } as CSSProperties;

  return <span className={`scene-glow scene-glow--${kind}`} style={style} aria-hidden="true" />;
}
