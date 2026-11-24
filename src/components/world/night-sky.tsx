import type { CSSProperties, ReactNode } from "react";

import { ShootingStar } from "@/components/world/shooting-star";
import { STAR_GLINTS, nightStars } from "@/content/ambient";
import { seeded } from "@/lib/ambient";

/** Stars twinkle in a few groups, each on its own clock: a handful of animations instead of one per star. */
const GROUPS = 4;

function Stars({ stars, seed, className }: { stars: readonly (readonly [number, number])[]; seed: number; className: string }) {
  const random = seeded(seed);
  const groups = Array.from({ length: GROUPS }, () => [] as ReactNode[]);
  stars.forEach(([x, y], index) => {
    // Brighter stars (the list runs strongest first) twinkle a little larger and stronger.
    const strength = 1 - index / stars.length;
    const style = {
      "--amb-x": `${x}%`,
      "--amb-y": `${y}%`,
      "--amb-star": (0.7 + strength * 0.6).toFixed(2),
      "--amb-star-o": (0.55 + random() * 0.45).toFixed(2),
      "--amb-glint": `${(9 + random() * 7).toFixed(2)}s`,
      "--amb-glint-delay": `${(-random() * 16).toFixed(2)}s`,
    } as CSSProperties;
    groups[index % GROUPS].push(<i key={index} className={index < STAR_GLINTS ? "ambient-star ambient-star--glint" : "ambient-star"} style={style} />);
  });
  return (
    <div className={`ambient-stars ${className}`}>
      {groups.map((group, index) => (
        <div
          key={index}
          className="ambient-stars__group"
          style={{ "--amb-twinkle": `${(3.7 + index * 1.2).toFixed(1)}s`, "--amb-twinkle-delay": `${(-index * 2.3).toFixed(1)}s` } as CSSProperties}
        >
          {group}
        </div>
      ))}
    </div>
  );
}

/**
 * Island 7's sky at night (docs/plans/2026-11-24-ambiente.md): the stars
 * painted on its background twinkle where they are (positions found on the
 * plate itself, `nightStars`), the strongest flash a small cross now and
 * then, and a rare shooting star crosses. Goes in the plate's backdrop, so
 * the island hides whatever passes behind it.
 */
export function NightSky() {
  return (
    <div className="ambient-night" aria-hidden="true">
      <Stars stars={nightStars.desktop} seed={7} className="ambient-stars--desktop" />
      <Stars stars={nightStars.mobile} seed={17} className="ambient-stars--mobile" />
      <ShootingStar />
    </div>
  );
}
