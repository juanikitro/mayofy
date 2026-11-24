import type { CSSProperties } from "react";

import { type AmbientIsland, type CloudSpec, ambientClouds, cloudDrift } from "@/content/ambient";
import { cloudFall } from "@/content/stage";

function cloudStyle(cloud: CloudSpec, island: AmbientIsland) {
  const layer = ambientClouds[island];
  const desktop = cloudDrift(cloud, layer, cloud.depth);
  const style: Record<string, string | number> = {
    "--amb-y": `${cloud.y}%`,
    "--amb-w": `${cloud.w}%`,
    "--amb-drift": `${layer.wind * desktop.distance}%`,
    "--amb-drift-time": `${desktop.duration}s`,
    "--amb-drift-delay": `${desktop.delay}s`,
  };
  if (cloud.mobile) {
    const mobile = cloudDrift(cloud.mobile, layer, cloud.depth);
    Object.assign(style, {
      "--amb-y-m": `${cloud.mobile.y}%`,
      "--amb-w-m": `${cloud.mobile.w}%`,
      "--amb-drift-m": `${layer.wind * mobile.distance}%`,
      "--amb-drift-time-m": `${mobile.duration}s`,
      "--amb-drift-delay-m": `${mobile.delay}s`,
    });
  }
  return style as CSSProperties;
}

/**
 * Painted clouds drifting across an island's plate (docs/plans/2026-11-24-ambiente.md).
 * `depth="far"` goes between the background layer and the island cutout
 * (IslandPlate's `backdrop`), `depth="near"` after the cutout, in front of
 * the roots. Static markup: the drift is a CSS animation on `translate`
 * (compositor only) that runs while the section is on screen and the
 * ambient tier allows it; the clouds stay out of the page (and their files
 * unrequested) until the reader nears the island after the page has loaded.
 */
export function AmbientClouds({ island, depth }: { island: AmbientIsland; depth: CloudSpec["depth"] }) {
  const layer = ambientClouds[island];
  const clouds = layer.clouds.filter((cloud) => cloud.depth === depth);
  if (clouds.length === 0) return null;
  return (
    <div className={`ambient-clouds ambient-clouds--${depth} ambient-clouds--wind-${layer.wind > 0 ? "right" : "left"}`} aria-hidden="true">
      {clouds.map((cloud, index) => {
        const puff = cloudFall.puffs[cloud.puff];
        return (
          <picture
            key={index}
            className={`ambient-cloud${cloud.flip ? " ambient-cloud--flip" : ""}${cloud.mobile ? "" : " ambient-cloud--desktop"}${cloud.desktop === false ? " ambient-cloud--mobile" : ""}`}
            style={cloudStyle(cloud, island)}
          >
            {/* The fall's own files and formats, so the browser reuses what it already downloaded. */}
            <source type="image/avif" srcSet={puff.avif} />
            <img src={puff.webp} alt="" width={puff.width} height={puff.height} loading="lazy" decoding="async" />
          </picture>
        );
      })}
    </div>
  );
}
