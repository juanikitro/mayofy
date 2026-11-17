import type { ReactNode } from "react";

import { IslandPlate } from "@/components/world/island-plate";
import type { PlateSpec } from "@/content/stage";

export type SceneVariant = "morning" | "golden" | "sunset" | "dusk" | "night";

/**
 * Provisional scene for islands 2 and 4–7: sky gradient (per the bible's
 * light table), optional stars, a wide floating island and island-specific
 * ornaments passed as children. Every layer is a slot for a generated
 * plate (see docs/plans/2026-11-16-biblia-visual-mundo-mayo.md).
 */
export function IslandScene({
  variant,
  plate,
  children,
}: {
  variant: SceneVariant;
  plate?: PlateSpec;
  children?: ReactNode;
}) {
  const dark = variant === "dusk" || variant === "night";

  if (plate) {
    return (
      <div className={`scene scene--${variant} scene--plated`} aria-hidden="true">
        <div className="scene__sky" />
        <IslandPlate plate={plate}>{children}</IslandPlate>
      </div>
    );
  }

  return (
    <div className={`scene scene--${variant}`} aria-hidden="true">
      <div className="scene__sky" />
      {dark ? (
        <svg className="scene__stars" viewBox="0 0 1600 600" preserveAspectRatio="xMidYMin slice">
          {stars.map(([x, y, r], index) => (
            <circle key={index} cx={x} cy={y} r={r} />
          ))}
        </svg>
      ) : null}
      <svg className="scene__island scene__island--wide" viewBox="0 0 1600 420" preserveAspectRatio="xMidYMax meet">
        <path
          className="island__rock"
          d="M140 230c-30 50 0 110 60 130 50 16 110 10 160 40 60 36 120 0 190 10 70 10 130-20 200-10 80 12 140-30 200-16 60 14 120-20 160-70 30-40 70-70 50-100-40-50-980-50-1020 16z"
        />
        <path
          className="island__moss"
          d="M130 230c0 24 20 42 50 48 20 4 40-6 60 2 30 10 50 0 80 4 40 6 60-10 100-4 40 6 70-6 110 0 50 8 80-10 120-2 40 8 80-12 120-4 60 12 110-10 140-40 20-30-780-40-780-4z"
        />
        <ellipse className="island__meadow" cx="800" cy="220" rx="700" ry="60" />
        <ellipse className="island__meadow-light" cx="840" cy="206" rx="520" ry="36" />
      </svg>
      {children}
    </div>
  );
}

const stars: ReadonlyArray<readonly [number, number, number]> = [
  [120, 80, 2], [260, 40, 1.4], [410, 120, 1.8], [560, 60, 1.2], [700, 150, 2.2],
  [830, 30, 1.4], [960, 110, 1.6], [1090, 70, 2], [1220, 160, 1.2], [1380, 50, 1.8],
  [1500, 130, 1.4], [180, 220, 1.2], [640, 250, 1.4], [1040, 230, 1.8], [1460, 240, 1.2],
];

/** Island 2: loose rocks scattered on the meadow. */
export function LooseRocks() {
  return (
    <svg className="ornament ornament--rocks" viewBox="0 0 1600 300" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      {[
        [300, 230, 60, 34], [470, 262, 36, 20], [720, 218, 48, 28], [900, 256, 30, 18],
        [1080, 226, 70, 40], [1300, 258, 44, 24], [560, 196, 26, 16], [1180, 200, 32, 18],
      ].map(([x, y, rx, ry], index) => (
        <g key={index} transform={`translate(${x} ${y})`}>
          <ellipse className="rock__stone" rx={rx} ry={ry} />
          <path className="rock__moss" d={`M${-rx * 0.8} ${-ry * 0.3}q${rx * 0.8} ${-ry * 0.9} ${rx * 1.6} 0q-${rx * 0.8} ${-ry * 0.2} -${rx * 1.6} 0z`} />
        </g>
      ))}
    </svg>
  );
}

/** Island 4: a small greenhouse and unearthed pieces. */
export function Greenhouse() {
  return (
    <svg className="ornament ornament--greenhouse" viewBox="0 0 1600 420" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <g transform="translate(1040 150)">
        <path className="greenhouse__frame" d="M0 200V90L120 20l120 70v110z" />
        <path className="greenhouse__glass" d="M12 192V96l108-62 108 62v96z" />
        <path className="greenhouse__frame" d="M120 20v180M60 55v145M180 55v145M12 120h216" />
        <path className="greenhouse__door" d="M98 200v-70h44v70z" />
      </g>
      <g className="greenhouse__soil">
        <ellipse cx="520" cy="346" rx="90" ry="22" />
        <ellipse cx="700" cy="356" rx="60" ry="16" />
        <circle className="greenhouse__gear" cx="560" cy="320" r="22" />
        <rect className="greenhouse__box" x="660" y="318" width="60" height="30" rx="4" />
      </g>
    </svg>
  );
}

/** Island 5: a winding path with six stepping stones. */
export function PathStones() {
  const points = [
    [260, 330], [480, 300], [690, 330], [900, 290], [1120, 320], [1330, 280],
  ];
  return (
    <svg className="ornament ornament--path" viewBox="0 0 1600 420" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <path
        className="path__trail"
        d={`M${points.map(([x, y]) => `${x} ${y}`).join(" L")}`}
      />
      {points.map(([x, y], index) => (
        <g key={index} transform={`translate(${x} ${y})`}>
          <ellipse className="path__stone" rx="40" ry="16" />
          <ellipse className="path__stone-top" cx="-4" cy="-4" rx="30" ry="10" />
        </g>
      ))}
    </svg>
  );
}

/** Island 6: fireflies with a soft halo and a lantern. */
export function Fireflies() {
  const dots = [
    [240, 120], [420, 220], [610, 90], [780, 180], [960, 60], [1120, 200], [1300, 110], [1450, 240], [700, 290], [360, 320],
  ];
  return (
    <svg className="ornament ornament--fireflies" viewBox="0 0 1600 420" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      {dots.map(([x, y], index) => (
        <g key={index} className="firefly" style={{ "--firefly-delay": `${index * 0.6}s` } as React.CSSProperties}>
          <circle className="firefly__halo" cx={x} cy={y} r="18" />
          <circle className="firefly__core" cx={x} cy={y} r="4" />
        </g>
      ))}
      <g transform="translate(1180 250)">
        <rect className="lantern__post" x="-4" y="0" width="8" height="120" />
        <path className="lantern__body" d="M-22 0h44l-6-40h-32z" />
        <circle className="firefly__halo" cx="0" cy="-20" r="26" />
      </g>
    </svg>
  );
}

/** Island 7: campfire and a log bench under the stars. */
export function Campfire() {
  return (
    <svg className="ornament ornament--campfire" viewBox="0 0 1600 420" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <g transform="translate(760 320)">
        <circle className="campfire__glow" r="120" />
        <ellipse className="campfire__ring" rx="70" ry="22" />
        <path className="campfire__log" d="M-60 6l50-26 8 14-50 26z" />
        <path className="campfire__log" d="M60 6l-50-26-8 14 50 26z" />
        <path className="campfire__flame" d="M0-70c22 20 30 44 16 64-10 14-42 14-48-6-8-22 10-36 32-58z" />
        <path className="campfire__flame-core" d="M0-40c12 12 16 26 8 38-6 8-24 8-28-4-4-14 8-22 20-34z" />
      </g>
      <g transform="translate(980 300)">
        <rect className="bench__log" x="0" y="0" width="200" height="30" rx="15" />
        <rect className="bench__leg" x="24" y="24" width="18" height="30" />
        <rect className="bench__leg" x="158" y="24" width="18" height="30" />
      </g>
    </svg>
  );
}
