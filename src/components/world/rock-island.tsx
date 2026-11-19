/* eslint-disable @next/next/no-img-element -- already-optimised AVIF cutouts; next/image would re-encode them */
import { Fragment, type CSSProperties } from "react";

import { IslandPlate, plateSceneStyle } from "@/components/world/island-plate";
import { MayoFigure } from "@/components/world/mayo-figure";
import { IslandTitle } from "@/components/world/island-title";
import { commercialPlans } from "@/content/commercial-plans";
import { islandCopy } from "@/content/islands";
import {
  islandPlates,
  landingOrder,
  mayoAnchors,
  packsMayoHops,
  PLATFORM_CANVAS,
  platformPlacements,
  platforms,
  rockFloats,
  rockTiming,
  type Platform,
  type PlatformPiece,
  type PlatformPlacement,
  type PlatformShadow,
} from "@/content/stage";

/** Plate height over width: `top` is in % of the plate height, everything else in % of its width. */
const RATIO = islandPlates.packs.desktop.height / islandPlates.packs.desktop.width;

/** Rise of each flight's apex above the higher of its two ends, in % of the plate height. */
const APEX_LIFT = 9;

/** Stacking inside the plate: back rocks under the island cutout (z 2), front rocks over Mayo (z 4). */
const LAYER_Z = { back: 1, front: 5 } as const;

type Box = { left: number; top: number; width: number; height: number };
type Size = "d" | "m";

const round = (value: number) => Math.round(value * 100) / 100;

/** Extent of a platform's rocks on its 1254 design canvas. */
function bounds(platform: Platform) {
  const xs = platform.pieces.flatMap((piece) => [piece.x, piece.x + piece.w]);
  const ys = platform.pieces.flatMap((piece) => [piece.y, piece.y + (piece.w * piece.height) / piece.width]);
  return { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) };
}

/**
 * A rectangle of the design canvas placed on the plate: the platform's feet
 * (bottom centre of its rocks) land on the placement point.
 */
function onPlate(platform: Platform, placement: PlatformPlacement, x: number, y: number, w: number, h: number): Box {
  const { minX, maxX, maxY } = bounds(platform);
  const unit = placement.canvas / PLATFORM_CANVAS;
  return {
    left: placement.x + (x - (minX + maxX) / 2) * unit,
    top: placement.y + ((y - maxY) * unit) / RATIO,
    width: w * unit,
    height: (h * unit) / RATIO,
  };
}

const boxVars = (box: Box, size: Size) => ({
  [`--x-${size}`]: `${round(box.left)}%`,
  [`--y-${size}`]: `${round(box.top)}%`,
  [`--w-${size}`]: `${round(box.width)}%`,
});

/** Phones see the plate scaled up around its centre: the floating rocks close in so they stay on screen. */
const floatX = (x: number, size: Size) => (size === "d" ? x : 50 + (x - 50) * 0.5);

/**
 * Flight of one rock from where it floats to where it rests, as offsets from
 * its resting place in % of the plate width (world.css multiplies them by
 * `--pu`): the start and the apex, which rises above both ends so the rock
 * arcs over the island's rim instead of passing through it.
 */
function flightVars(box: Box, kind: PlatformPiece["kind"], index: number, size: Size) {
  const float = rockFloats[index][kind];
  const restX = box.left + box.width / 2;
  const restY = box.top + box.height / 2;
  const startX = floatX(float.x, size) - restX;
  const startY = (float.y - restY) * RATIO;
  const apexY = (Math.min(float.y, restY) - APEX_LIFT - restY) * RATIO;
  return {
    [`--dx-${size}`]: round(startX),
    [`--dy-${size}`]: round(startY),
    [`--ax-${size}`]: round(startX * 0.3),
    [`--ay-${size}`]: round(apexY),
  };
}

/** Scroll range of one piece's flight on the `--rocks` cover range. */
function flightRange(index: number, kind: PlatformPiece["kind"]) {
  const start = rockTiming.start + index * rockTiming.stagger + landingOrder.indexOf(kind) * rockTiming.pieceStagger;
  return { start, end: start + rockTiming.flight };
}

const cover = (start: number, end: number) => `cover ${round(start)}% cover ${round(end)}%`;

/**
 * Idle float of each rock, never in step with another: its own bob, sway and
 * drift periods (seconds) and amplitudes, from the piece's position in the
 * twelve, with negative delays so they start mid-swing.
 */
function idleVars(serial: number) {
  const wave = (seed: number) => (Math.sin(serial * 12.9898 + seed * 78.233) * 43758.5453) % 1;
  const pick = (seed: number, min: number, max: number) => round(min + Math.abs(wave(seed)) * (max - min));
  return {
    "--bob-dur": `${pick(1, 4.2, 7.4)}s`,
    "--bob-amp": pick(2, 0.45, 1),
    "--sway-dur": `${pick(3, 5.5, 9.5)}s`,
    "--sway-amp": `${pick(4, 2, 5.5)}deg`,
    "--drift-dur": `${pick(5, 7, 12)}s`,
    "--drift-amp": pick(6, 0.25, 0.7),
    "--idle-delay": `${-pick(7, 0, 9)}s`,
  };
}

function Rock({ piece, index }: { piece: PlatformPiece; index: number }) {
  const platform = platforms[index];
  const height = (piece.w * piece.height) / piece.width;
  const desktop = onPlate(platform, platformPlacements.desktop[index], piece.x, piece.y, piece.w, height);
  const mobile = onPlate(platform, platformPlacements.mobile[index], piece.x, piece.y, piece.w, height);
  const float = rockFloats[index][piece.kind];
  const { start, end } = flightRange(index, piece.kind);
  const style = {
    ...boxVars(desktop, "d"),
    ...boxVars(mobile, "m"),
    ...flightVars(desktop, piece.kind, index, "d"),
    ...flightVars(mobile, piece.kind, index, "m"),
    ...idleVars(index * 4 + landingOrder.indexOf(piece.kind)),
    "--r0": `${float.rotate}deg`,
    // Settles with a small tilt against its spin, then rocks back to rest.
    "--wobble": `${float.rotate > 0 ? -3.5 : 3.5}deg`,
    "--s0": float.scale,
    "--z0": LAYER_Z[float.layer],
    "--range": cover(start, end),
  } as CSSProperties;
  return (
    <div className={`rock rock--${piece.kind} rock--${float.layer}`} style={style}>
      <img className="rock__img" src={piece.src} alt="" width={piece.width} height={piece.height} loading="lazy" decoding="async" />
    </div>
  );
}

/** A painted contact shadow between two pieces: it darkens as the piece that casts it lands. */
function Shadow({ shadow, index }: { shadow: PlatformShadow; index: number }) {
  const platform = platforms[index];
  const { start, end } = flightRange(index, shadow.under);
  const style = {
    ...boxVars(onPlate(platform, platformPlacements.desktop[index], shadow.x, shadow.y, shadow.w, shadow.h), "d"),
    ...boxVars(onPlate(platform, platformPlacements.mobile[index], shadow.x, shadow.y, shadow.w, shadow.h), "m"),
    "--range": cover(start, end),
  } as CSSProperties;
  return <img className="rock-shadow" src={shadow.src} alt="" width={shadow.w} height={shadow.h} loading="lazy" decoding="async" style={style} />;
}

/**
 * The platform's shadow on the grass under its base: wide and faint while
 * the base is still high, tight and dark as it touches down (noon sun, so
 * straight below).
 */
function GroundShadow({ index }: { index: number }) {
  const platform = platforms[index];
  const { minX, maxX } = bounds(platform);
  const { start, end } = flightRange(index, "base");
  const width = (size: Size) => {
    const placement = platformPlacements[size === "d" ? "desktop" : "mobile"][index];
    return `${round(((maxX - minX) * placement.canvas * 1.08) / PLATFORM_CANVAS)}%`;
  };
  const style = {
    "--x-d": `${platformPlacements.desktop[index].x}%`,
    "--y-d": `${platformPlacements.desktop[index].y}%`,
    "--w-d": width("d"),
    "--x-m": `${platformPlacements.mobile[index].x}%`,
    "--y-m": `${platformPlacements.mobile[index].y}%`,
    "--w-m": width("m"),
    "--range": cover(start, end),
  } as CSSProperties;
  return <span className="rock-ground" style={style} />;
}

/** Highest point of a platform's rocks, in % of the plate height: its card rests there. */
function cardVars(index: number) {
  const platform = platforms[index];
  const { minY, maxY } = bounds(platform);
  const top = (placement: PlatformPlacement) => placement.y + ((minY - maxY) * placement.canvas) / PLATFORM_CANVAS / RATIO;
  const { start } = flightRange(index, "top");
  const landed = start + rockTiming.flight * rockTiming.landing;
  return {
    "--x-d": `${platformPlacements.desktop[index].x}%`,
    "--top-d": `${round(top(platformPlacements.desktop[index]))}%`,
    "--x-m": `${platformPlacements.mobile[index].x}%`,
    "--top-m": `${round(top(platformPlacements.mobile[index]))}%`,
    "--range": cover(landed, landed + 3.5),
  } as CSSProperties;
}

/** Mayo's hop stops as `translate` offsets from her resting anchor, in her own widths. */
function hopVars() {
  const anchor = mayoAnchors.packs!;
  const offset = (to: number, x: string, size: string) => `${round(((to - parseFloat(x)) / parseFloat(size)) * 100)}%`;
  return Object.fromEntries(
    packsMayoHops.desktop.flatMap((stop, hop) => [
      [`--hop-${hop}-d`, offset(stop, anchor.x, anchor.size)],
      [`--hop-${hop}-m`, offset(packsMayoHops.mobile[hop], anchor.xMobile ?? anchor.x, anchor.sizeMobile ?? anchor.size)],
    ]),
  ) as CSSProperties;
}

/** Back to front: the middle platform stands furthest back, so it is painted first. */
const depthOrder = [1, 0, 2];

export function RockIsland() {
  return (
    <section id="packs" className="rocks" data-island="3" aria-labelledby="packs-title">
      <div className="rocks__stage">
        <header className="rocks__intro">
          <h2 id="packs-title">
            <IslandTitle segments={islandCopy.packs.title} />
          </h2>
          <p>{islandCopy.packs.body}</p>
        </header>

        <div className="scene scene--noon scene--plated" style={plateSceneStyle(islandPlates.packs)} aria-hidden="true">
          <div className="scene__sky" />
          <IslandPlate plate={islandPlates.packs}>
            {depthOrder.map((index) => (
              <Fragment key={index}>
                <GroundShadow index={index} />
                {/* Manifest rule: each contact shadow sits under its emitter and over the receivers. */}
                {platforms[index].pieces.map((piece) => (
                  <Fragment key={piece.kind}>
                    {platforms[index].shadows
                      .filter((shadow) => shadow.under === piece.kind)
                      .map((shadow) => (
                        <Shadow key={shadow.src} shadow={shadow} index={index} />
                      ))}
                    <Rock piece={piece} index={index} />
                  </Fragment>
                ))}
              </Fragment>
            ))}
            <div className="rocks__mayo-path" style={hopVars()}>
              <MayoFigure slot="packs" className="rocks__mayo" />
            </div>
          </IslandPlate>
        </div>

        {/* The cards share the plate's frame, so each rests on top of its own platform. */}
        <div className="platforms">
          {commercialPlans.map((plan, index) => (
            <a className={`platform__card platform__card--${index + 1}`} href={`#pack-${plan.id}`} style={cardVars(index)} key={plan.id}>
              <span className="platform__name">{plan.name}</span>
              <span className="platform__from">Desde</span>
              <span className="platform__price">{plan.price}</span>
              <span className="platform__timeline">{plan.timeline}</span>
              <span className="platform__link">Ver qué incluye</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
