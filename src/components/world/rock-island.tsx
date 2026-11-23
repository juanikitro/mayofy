/* eslint-disable @next/next/no-img-element -- already-optimised AVIF cutouts; next/image would re-encode them */
import { Fragment, type CSSProperties } from "react";

import { IslandPlate, plateSceneStyle } from "@/components/world/island-plate";
import { NearGate } from "@/components/world/near-gate";
import { PacksMayoClock } from "@/components/world/packs-mayo-clock";
import { PlatformMarkers } from "@/components/world/platform-markers";
import { IslandTitle } from "@/components/world/island-title";
import { StripSources } from "@/components/world/mayo-figure";
import { commercialPlans } from "@/content/commercial-plans";
import { islandCopy } from "@/content/islands";
import {
  islandPlates,
  landingOrder,
  looseRocks,
  packsAssembledPlate,
  packsMayo,
  PLATFORM_CANVAS,
  platformGroundShadows,
  platformPlacements,
  platforms,
  rockFloats,
  rockTiming,
  rocksStage,
  stageCover,
  type LooseRock,
  type Platform,
  type PlatformPiece,
  type PlatformPlacement,
  type PlatformShadow,
} from "@/content/stage";

/** Plate height over width: `top` is in % of the plate height, everything else in % of its width. */
const RATIO = islandPlates.packs.desktop.height / islandPlates.packs.desktop.width;

/** Rise of each flight's apex above the higher of its two ends, in % of the plate height. */
const APEX_LIFT = 9;

/** Stacking inside the plate: back rocks under the island cutout (z 2), front rocks over the platforms (z 3) and under Mayo (z 6). */
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

/** One piece's flight, in vh of the stage's pinned scroll (rocksStage). */
function flightRange(index: number, kind: PlatformPiece["kind"]) {
  const start = rockTiming.start + index * rockTiming.stagger + landingOrder.indexOf(kind) * rockTiming.pieceStagger;
  return { start, end: start + rockTiming.flight };
}

/** A stretch of the pinned scroll (vh, rocksStage) as an `animation-range` on the `--rocks` timeline. */
const cover = (start: number, end: number) => `cover ${stageCover(start)}% cover ${stageCover(end)}%`;

/** A stable pseudo-random number in [0, 1) per serial and seed, so server and client agree. */
const noise = (serial: number, seed: number) => Math.abs((Math.sin(serial * 12.9898 + seed * 78.233) * 43758.5453) % 1);

/**
 * Idle float of each rock, never in step with another (Juani: "mas ritmo y
 * variedad previo al orden, que se muevan mas"): its own bob, sway, lateral
 * drift and depth breathing (it grows and shrinks a little, as if coming
 * closer and drifting away), each with its own period (seconds) and
 * amplitude, and one rock in three tumbles slowly end over end. Negative
 * delays start them mid-swing. `scale` shrinks the motion of far rocks.
 */
function idleVars(serial: number, scale = 1) {
  const pick = (seed: number, min: number, max: number) => round(min + noise(serial, seed) * (max - min));
  const tumbles = serial % 3 === 0;
  return {
    "--bob-dur": `${pick(1, 3.4, 6.8)}s`,
    "--bob-amp": round(pick(2, 0.9, 2.2) * scale),
    "--sway-dur": `${pick(3, 4.5, 8.5)}s`,
    "--sway-amp": `${pick(4, 3, 9)}deg`,
    "--drift-dur": `${pick(5, 6, 12)}s`,
    "--drift-amp": round(pick(6, 1.2, 3) * scale),
    "--breath-dur": `${pick(8, 5, 10)}s`,
    "--breath-amp": round(pick(9, 0.04, 0.1) * scale),
    "--tumble-dur": `${pick(10, 16, 34)}s`,
    "--tumble-turn": tumbles ? `${noise(serial, 11) > 0.5 ? 360 : -360}deg` : "0deg",
    "--idle-delay": `${-pick(7, 0, 9)}s`,
  };
}

/** Island-3 centre the rocks swirl around before the order, in % of the plate. */
const SWIRL_CENTRE = { x: 50, y: 48 };

/**
 * Where a rock is pushed along its swirl at the start of the section
 * (`--pre` 0, world.css): a turn around the island plus a little outwards,
 * in % of the plate width, so as the stage arrives the rocks circle in on
 * the scroll and pass in front of and behind each other.
 */
function swirlVars(x: number, y: number, serial: number, size: Size) {
  const ox = x - SWIRL_CENTRE.x;
  const oy = (y - SWIRL_CENTRE.y) * RATIO;
  const length = Math.hypot(ox, oy) || 1;
  const turn = (5 + noise(serial, 12) * 5) * (serial % 2 === 0 ? 1 : -1) * (size === "d" ? 1 : 0.6);
  const out = 2 * (size === "d" ? 1 : 0.6);
  return {
    [`--px-${size}`]: round((-oy / length) * turn + (ox / length) * out),
    [`--py-${size}`]: round((ox / length) * turn + (oy / length) * out),
  };
}

function Rock({ piece, index }: { piece: PlatformPiece; index: number }) {
  const platform = platforms[index];
  const height = (piece.w * piece.height) / piece.width;
  const desktop = onPlate(platform, platformPlacements.desktop[index], piece.x, piece.y, piece.w, height);
  const mobile = onPlate(platform, platformPlacements.mobile[index], piece.x, piece.y, piece.w, height);
  const float = rockFloats[index][piece.kind];
  const serial = index * 4 + landingOrder.indexOf(piece.kind);
  const { start, end } = flightRange(index, piece.kind);
  const style = {
    ...boxVars(desktop, "d"),
    ...boxVars(mobile, "m"),
    ...flightVars(desktop, piece.kind, index, "d"),
    ...flightVars(mobile, piece.kind, index, "m"),
    ...idleVars(serial),
    ...swirlVars(float.x, float.y, serial, "d"),
    ...swirlVars(floatX(float.x, "m"), float.y, serial, "m"),
    "--r0": `${float.rotate}deg`,
    // Settles with a small tilt against its spin, then rocks back to rest.
    "--wobble": `${float.rotate > 0 ? -3.5 : 3.5}deg`,
    "--s0": float.scale,
    "--z0": LAYER_Z[float.layer],
    "--range": cover(start, end),
    "--mask": `url("${piece.src}")`,
  } as CSSProperties;
  return (
    <div className={`rock rock--${piece.kind} rock--${float.layer} rock--platform-${index + 1}`} style={style}>
      {/* The body carries the idle float; its ::after grades the rock into the plate once it lands. */}
      <div className="rock__body">
        {/* Lazy, and hidden with its grading mask (same file) until the reader nears the island (NearGate, world.css). */}
        <img className="rock__img" src={piece.src} alt="" width={piece.width} height={piece.height} loading="lazy" decoding="async" />
      </div>
    </div>
  );
}

/**
 * A loose rock that stays far away and never joins a platform: paler, softer
 * and slower the further it is (`--depth`), drifting a little with the scroll
 * (parallax, less when further) and on its own clock.
 */
function FarRock({ rock, serial }: { rock: LooseRock; serial: number }) {
  const height = (rock.w * rock.height) / rock.width / RATIO;
  const style = {
    "--x-d": `${round(rock.x - rock.w / 2)}%`,
    "--y-d": `${round(rock.y - height / 2)}%`,
    "--w-d": `${rock.w}%`,
    "--x-m": `${round(floatX(rock.x, "m") - rock.w / 2)}%`,
    "--y-m": `${round(rock.y - height / 2)}%`,
    "--w-m": `${rock.w}%`,
    "--r0": `${rock.rotate}deg`,
    "--depth": rock.depth,
    "--far-dx": round((noise(serial, 13) - 0.5) * 6 * (1 - rock.depth * 0.6)),
    "--far-dy": round((2 + noise(serial, 14) * 3) * (1 - rock.depth * 0.6)),
    ...idleVars(serial + 40, 1 - rock.depth * 0.55),
  } as CSSProperties;
  return (
    <div className="rock-far" style={style}>
      <div className="rock__body">
        <img className="rock__img" src={rock.src} alt="" width={rock.width} height={rock.height} loading="lazy" decoding="async" />
      </div>
    </div>
  );
}

/**
 * Ragged top edge of grass as an SVG alpha mask, different per platform:
 * clumps of overlapping blades of mixed width, height and lean over a solid
 * sod band, softened a little so no blade reads as a cut-out spike.
 */
function tuftMask(seed: number) {
  const blades = 220;
  const shapes = Array.from({ length: blades }, (_, blade) => {
    const serial = seed * 1000 + blade;
    const x = noise(serial, 15) * 200;
    // Only the outer tenth of the strip thins out, so the base's curved sides sink too.
    const edge = Math.min(1, Math.min(x, 200 - x) / 20);
    // Mostly short blades, so the gaps between them stay shallow, with a few tall ones.
    const height = (blade % 7 === 0 ? 8 + noise(serial, 16) * 6 : 3 + noise(serial, 16) * 6) * (0.45 + 0.55 * edge);
    const lean = (noise(serial, 17) - 0.5) * 7;
    const half = 1.8 + noise(serial, 18) * 3;
    return `M${round(x - half)} 27L${round(x + lean)} ${round(27 - height)}L${round(x + half)} 27Z`;
  });
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 40' preserveAspectRatio='none'>` +
    `<filter id='s'><feGaussianBlur stdDeviation='0.7'/></filter>` +
    `<path filter='url(#s)' d='${shapes.join("")}M0 25h200v15H0Z'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/**
 * Grass in front of a platform's base: the plate's own meadow (the island
 * cutout, aligned to the plate) cut to a strip of blades along the feet, so
 * the bottom of the stack sinks into the grass. Over bare meadow it shows the
 * very pixels beneath it, so it needs no fade of its own; it carries the
 * platform's grass shadow (same place and size) so the blades stand in the
 * shade, darkening with it as the base comes down.
 */
function GrassTufts({ index }: { index: number }) {
  const platform = platforms[index];
  const { minX, maxX } = bounds(platform);
  const island = islandPlates.packs.layers.island;
  const vars = (size: Size) => {
    const placement = platformPlacements[size === "d" ? "desktop" : "mobile"][index];
    const width = ((maxX - minX) * placement.canvas * 1.2) / PLATFORM_CANVAS;
    const left = placement.x - width / 2;
    const top = placement.y - GRASS_RISE;
    const shade = groundShadowBox(index, size);
    return {
      [`--x-${size}`]: `${round(left)}%`,
      [`--y-${size}`]: `${round(top)}%`,
      [`--w-${size}`]: `${round(width)}%`,
      // Offsets of the meadow behind the strip, in % of the plate width.
      [`--gx-${size}`]: round(left),
      [`--gy-${size}`]: round(top * RATIO),
      // The platform's grass shadow over the blades too, at the same place and size, in % of the plate width.
      [`--sx-${size}`]: round(shade.left - left),
      [`--sy-${size}`]: round((shade.top - top) * RATIO),
      [`--sw-${size}`]: round(shade.width),
      [`--sh-${size}`]: round(shade.height * RATIO),
    };
  };
  const style = {
    ...vars("d"),
    ...vars("m"),
    "--tufts": tuftMask(index + 1),
    "--range": cover(flightRange(index, "base").start, flightRange(index, "base").end),
    "--meadow": `image-set(url("${island.avif}") type("image/avif"), url("${island.webp}") type("image/webp"))`,
  } as CSSProperties;
  return <span className="rock-grass" style={style} />;
}

/** How far the grass strip reaches above a platform's feet, in % of the plate height (it is 7 % tall). */
const GRASS_RISE = 5.2;

/** The commissioned painted end state, crossfading in over the live stacks at the end (stage.ts). */
function AssembledPlate() {
  const { desktop, mobile } = packsAssembledPlate;
  if (!desktop) return null;
  return (
    <picture className="plate__picture plate__picture--assembled">
      {mobile ? <source media="(max-width: 48rem)" type="image/avif" srcSet={mobile.avif} /> : null}
      <source type="image/avif" srcSet={desktop.avif} />
      <img src={desktop.webp} alt="" width={desktop.width} height={desktop.height} loading="lazy" decoding="async" />
    </picture>
  );
}

/**
 * The piece whose landing completes a painted shadow: the later to land of
 * the piece that casts it and the pieces it falls on (those its box overlaps
 * by more than a sixth of its area). A shadow cast on a piece that lands
 * after its caster must wait for it, or it would hang in the air.
 */
function shadowCompleter(platform: Platform, shadow: PlatformShadow) {
  const area = shadow.w * shadow.h;
  return platform.pieces.reduce((latest, piece) => {
    const height = (piece.w * piece.height) / piece.width;
    const overlapX = Math.min(shadow.x + shadow.w, piece.x + piece.w) - Math.max(shadow.x, piece.x);
    const overlapY = Math.min(shadow.y + shadow.h, piece.y + height) - Math.max(shadow.y, piece.y);
    const receives = overlapX > 0 && overlapY > 0 && overlapX * overlapY > area / 6;
    return receives && landingOrder.indexOf(piece.kind) > landingOrder.indexOf(latest) ? piece.kind : latest;
  }, shadow.under);
}

/** A painted contact shadow between two pieces: it darkens as the last of them comes down. */
function Shadow({ shadow, index }: { shadow: PlatformShadow; index: number }) {
  const platform = platforms[index];
  const { start, end } = flightRange(index, shadowCompleter(platform, shadow));
  const style = {
    ...boxVars(onPlate(platform, platformPlacements.desktop[index], shadow.x, shadow.y, shadow.w, shadow.h), "d"),
    ...boxVars(onPlate(platform, platformPlacements.mobile[index], shadow.x, shadow.y, shadow.w, shadow.h), "m"),
    "--range": cover(start, end),
  } as CSSProperties;
  return <img className="rock-shadow" src={shadow.src} alt="" width={shadow.w} height={shadow.h} loading="lazy" decoding="async" style={style} />;
}

/** Where a platform's grass shadow sits, as a box in % of the plate (its centre offset from the feet). */
function groundShadowBox(index: number, size: Size): Box {
  const placement = platformPlacements[size === "d" ? "desktop" : "mobile"][index];
  const shape = platformGroundShadows[size === "d" ? "desktop" : "mobile"][index];
  return {
    left: placement.x + shape.dx - shape.w / 2,
    top: placement.y + shape.dy - shape.h / 2,
    width: shape.w,
    height: shape.h,
  };
}

/**
 * The platform's shadow on the grass, under its rocks, with the painted
 * plate's shape, place and strength (stage.ts platformGroundShadows). It grows
 * in as the base comes down (`--ground`, world.css): wide and faint while the
 * base is high, tight and dark as it touches down, so a landed stack always
 * has its shadow.
 */
function GroundShadow({ index }: { index: number }) {
  const { start, end } = flightRange(index, "base");
  const box = (size: Size) => {
    const { left, top, width, height } = groundShadowBox(index, size);
    return {
      [`--x-${size}`]: `${round(left)}%`,
      [`--y-${size}`]: `${round(top)}%`,
      [`--w-${size}`]: `${round(width)}%`,
      [`--h-${size}`]: `${round(height)}%`,
    };
  };
  const style = { ...box("d"), ...box("m"), "--range": cover(start, end) } as CSSProperties;
  return <span className="rock-ground" style={style} />;
}

/** Highest point of a platform's rocks, in % of the plate height: its marker stands there, shown once its top rock lands. */
function markerVars(index: number) {
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
    "--range": cover(landed, landed + 12),
  } as CSSProperties;
}

type PacksStrip = keyof typeof packsMayo.strips;

/**
 * Mayo's cell and stops: the cell stands where she ends (seated by the third
 * platform), the feet line on the painted feet; the earlier stops are
 * `translate` offsets from there, in her own widths (world.css
 * `packs-mayo-hops`).
 */
function packsMayoVars() {
  const vars = (size: Size) => {
    const width = packsMayo.size[size === "d" ? "desktop" : "mobile"];
    const stops = packsMayo.stops[size === "d" ? "desktop" : "mobile"];
    const end = stops[stops.length - 1];
    return {
      [`--x-${size}`]: `${round(end - width / 2)}%`,
      [`--y-${size}`]: `${round(packsMayo.y - ((width * packsMayo.feetY) / 100) / RATIO)}%`,
      [`--w-${size}`]: `${width}%`,
      ...Object.fromEntries(stops.map((stop, hop) => [`--hop-${hop}-${size}`, `${round(((stop - end) / width) * 100)}%`])),
    };
  };
  return { ...vars("d"), ...vars("m") } as CSSProperties;
}

/**
 * Mayo on island 3, painted in place (stage.ts packsMayo): four strip windows
 * share one cell and world.css shows the one the moment calls for, watching
 * while the rocks float, hopping as the first two platforms land, sitting
 * down as the third lands and seated afterwards. Every window steps its strip
 * one painted frame at a time; without motion only the seated one shows.
 */
function PacksMayo() {
  return (
    <div className="packs-mayo" style={packsMayoVars()}>
      {(Object.keys(packsMayo.strips) as PacksStrip[]).map((name) => {
        const strip = packsMayo.strips[name];
        return (
          <div className={`packs-mayo__strip packs-mayo__strip--${name}`} style={{ "--frames": strip.frames } as CSSProperties} key={name}>
            <picture>
              <StripSources avif={strip.avif} />
              <img src={strip.webp} alt="" width={packsMayo.cell * strip.frames} height={packsMayo.cell} loading="lazy" decoding="async" />
            </picture>
          </div>
        );
      })}
    </div>
  );
}

/**
 * The section's height and the island's scroll ranges that world.css uses
 * directly, all from the pinned-scroll timing in stage.ts.
 */
function stageVars() {
  const { hops, sentarse, crossfade } = packsMayo.timing;
  return {
    "--rocks-height": `${rocksStage.height}vh`,
    "--range-swirl": `cover 4% cover ${stageCover(rockTiming.start)}%`,
    "--range-crossfade": cover(crossfade[0], crossfade[1]),
    // The live pieces hide once the painting is opaque.
    "--live-out": cover(crossfade[1] - 0.5, crossfade[1]),
    "--range-mira": `cover 0% cover ${stageCover(hops[0])}%`,
    "--range-hops": cover(hops[0], hops[1]),
    "--range-sentarse": cover(sentarse[0], sentarse[1]),
    "--range-sentada-off": `cover 0% cover ${stageCover(sentarse[1])}%`,
  } as CSSProperties;
}

/** Back to front: the middle platform stands furthest back, so it is painted first. */
const depthOrder = [1, 0, 2];

export function RockIsland() {
  return (
    <section
      id="packs"
      className={packsAssembledPlate.desktop ? "rocks rocks--painted" : "rocks"}
      data-island="3"
      aria-labelledby="packs-title"
      style={stageVars()}
    >
      {/* The rock pieces and grass strips load as the reader nears the island or once the page has loaded. */}
      <NearGate />
      {/* Mayo's key poses, where the page may settle (the guided scroll's rest points; outside the sticky stage). */}
      {packsMayo.timing.rests.map((vh) => (
        <span className="rocks__rest" data-scroll-rest aria-hidden="true" style={{ top: `${vh}vh` }} key={vh} />
      ))}
      <div className="rocks__stage">
        <header className="rocks__intro">
          <h2 id="packs-title">
            <IslandTitle segments={islandCopy.packs.title} />
          </h2>
        </header>

        <div className="scene scene--noon scene--plated" style={plateSceneStyle(islandPlates.packs)} aria-hidden="true">
          <div className="scene__sky" />
          <IslandPlate plate={islandPlates.packs}>
            {looseRocks.map((rock, serial) => (
              <FarRock key={serial} rock={rock} serial={serial} />
            ))}
            {depthOrder.map((index) => (
              <Fragment key={index}>
                {/* On the grass, under the rocks; the grass strip in front carries the same shade. */}
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
                <GrassTufts index={index} />
              </Fragment>
            ))}
            <AssembledPlate />
            <PacksMayo />
          </IslandPlate>
          <PacksMayoClock
            miraRest={stageCover(packsMayo.timing.miraRest)}
            miraEnd={stageCover(packsMayo.timing.hops[0])}
            sentadaStart={stageCover(packsMayo.timing.sentarse[1])}
            sentadaLoop={stageCover(packsMayo.timing.sentadaLoop)}
          />
        </div>

        {/* The markers share the plate's frame, so each stands on top of its own platform. */}
        <PlatformMarkers
          markers={commercialPlans.map((plan, index) => ({ id: plan.id, name: plan.name, price: plan.price, style: markerVars(index) }))}
        />
      </div>
    </section>
  );
}
