import type { CSSProperties } from "react";

import { getMayoSlot, mayoAnchors, mayoPoseSources, mayoSprites, type MayoAnchor, type MayoContactLayer, type MayoRoute, type MayoSlotId, type MayoSprite } from "@/content/stage";

const pct = (value: string) => Number.parseFloat(value);

/** y and depth scale of the route's line at x (linear between its points, extended past its ends). */
function onRoute(route: MayoRoute, x: number) {
  const points = route.points;
  let index = 0;
  while (index < points.length - 2 && x < points[index + 1][0]) index++;
  const [x0, y0, s0] = points[index];
  const [x1, y1, s1] = points[index + 1];
  const t = (x - x0) / (x1 - x0);
  return { y: y0 + (y1 - y0) * t, scale: s0 + (s1 - s0) * t };
}

/**
 * Mayo's feet and scale on every painted frame of a route: the run's
 * `cycles` of frames and then the arrival's, laid out backwards from the
 * anchor, where the arrival's last frame stands. Each step advances by the
 * paw advance of the frame it leads into (`stride`), in cells scaled by
 * depth, so a planted paw never slides; during a stance step she keeps her
 * height and scale too, and the path's descent and depth are taken while her
 * paws are in the air. The step into the arrival is the run's next step, as if
 * it went on.
 */
function routeFrames(route: MayoRoute, anchorX: number, size: number, sprite: MayoSprite, cycles: number) {
  const runFrames = Math.round(cycles * sprite.frames);
  const steps = [
    ...Array.from({ length: runFrames }, (_, g) => ({ stride: sprite.stride!, index: g % sprite.frames })),
    ...Array.from({ length: sprite.arrival?.frames ?? 0 }, (_, j) => ({ stride: sprite.arrival!.stride, index: j })),
  ];
  if (sprite.arrival) steps[runFrames] = { stride: sprite.stride!, index: runFrames % sprite.frames };
  const isStance = (g: number) => steps[g].stride.stance[steps[g].index] !== undefined;
  const xs = new Array<number>(steps.length);
  xs[steps.length - 1] = anchorX;
  for (let g = steps.length - 1; g > 0; g--) {
    const { stride, index } = steps[g];
    const advance = stride.stance[index] ?? stride.airborne;
    xs[g - 1] = xs[g] + (advance / 100) * size * onRoute(route, xs[g]).scale;
  }
  const frames: { x: number; y: number; scale: number }[] = [];
  xs.forEach((x, g) => {
    frames.push(g > 0 && isStance(g) ? { ...frames[g - 1], x } : { x, ...onRoute(route, x) });
  });
  return { frames, runFrames };
}

/**
 * The route as keyframes, one per painted frame, each held until the next
 * (`step-end`), with `translate` offsets from the anchor in Mayo's own widths
 * (a percentage of `translate` is relative to the element; a y in % of the
 * plate's height becomes widths through the plate's aspect) and a depth
 * `scale`, so the run moves on the compositor and only when a frame changes.
 */
function routeKeyframes(name: string, route: MayoRoute, x: string, y: string, size: string, sprite: MayoSprite, cycles: number) {
  const { frames, runFrames } = routeFrames(route, pct(x), pct(size), sprite, cycles);
  const round = (value: number) => Number(value.toFixed(4));
  const rule = (offset: number, frame: (typeof frames)[number]) =>
    `${round(offset)}%{translate:${round(((frame.x - pct(x)) / pct(size)) * 100)}% ${round((((frame.y - pct(y)) * route.aspect) / pct(size)) * 100)}%;scale:${round(frame.scale)};animation-timing-function:step-end}`;
  const body = frames.map((frame, g) => rule((g / frames.length) * 100, frame)).join("") + rule(100, frames[frames.length - 1]);
  return { css: `@keyframes ${name}{${body}}`, split: runFrames / frames.length };
}

/** Splits a range such as "cover 52% cover 80%" at a fraction of its length. */
function splitRange(range: string, fraction: number) {
  const match = range.match(/^(\S+) ([\d.]+)% \1 ([\d.]+)%$/);
  if (!match) throw new Error(`Cannot split the scrub range "${range}"`);
  const [, name, from, to] = match;
  const at = Number((Number(from) + (Number(to) - Number(from)) * fraction).toFixed(3));
  return [`${name} ${from}% ${name} ${at}%`, `${name} ${at}% ${name} ${to}%`] as const;
}

/**
 * A route slot's keyframes (desktop and mobile) and the ranges of its two
 * strips: the run plays over the first part of the scrub range, the arrival
 * over the rest, each frame over the same share of scroll as its route step.
 */
function routeStyle(slot: MayoSlotId, anchor: MayoAnchor, sprite: MayoSprite | undefined) {
  if (!anchor.route || !sprite?.stride) return { css: "", style: {} };
  const { range, rangeMobile = range, cycles, cyclesMobile = cycles } = sprite.scrub;
  const desktop = routeKeyframes(`mayo-route-${slot}-d`, anchor.route, anchor.x, anchor.y, anchor.size, sprite, cycles);
  const mobile = routeKeyframes(
    `mayo-route-${slot}-m`,
    anchor.routeMobile ?? anchor.route,
    anchor.xMobile ?? anchor.x,
    anchor.yMobile ?? anchor.y,
    anchor.sizeMobile ?? anchor.size,
    sprite,
    cyclesMobile,
  );
  const [runD, arrivalD] = splitRange(range, desktop.split);
  const [runM, arrivalM] = splitRange(rangeMobile, mobile.split);
  return {
    css: desktop.css + mobile.css,
    style: {
      "--route-name-d": `mayo-route-${slot}-d`,
      "--route-name-m": `mayo-route-${slot}-m`,
      "--run-range-d": runD,
      "--run-range-m": runM,
      "--arrival-range-d": arrivalD,
      "--arrival-range-m": arrivalM,
    },
  };
}

/** Contact shadow lean and strength, away from the island's key light. */
function shadowStyle(anchor: MayoAnchor) {
  if (!anchor.shadow) return {};
  return { "--shadow-lean": anchor.shadow.lean, "--shadow-opacity": String(anchor.shadow.opacity) };
}

/**
 * Ground contact under a painted-in sprite: every ellipse becomes one
 * radial-gradient layer of a single still box behind the strip, so the
 * shadow never steps with the frames. Normal blending in the plate's own
 * shadow tint stands in for multiply: `.mayo--anchored` is transformed, an
 * isolated group in which multiply would only blend with transparency.
 */
function contactStyle(anchor: MayoAnchor) {
  if (!anchor.contact) return {};
  const { tint, layers } = anchor.contact;
  const ellipse = ({ x, y, w, h, opacity }: MayoContactLayer) =>
    `radial-gradient(${w} ${h} at ${x} ${y}, rgb(${tint} / ${opacity}), rgb(${tint} / ${(opacity * 0.5).toFixed(3)}) 50%, rgb(${tint} / 0))`;
  return { "--mayo-contact": layers.map(ellipse).join(", ") };
}

/**
 * The scroll range that steps the sprite (and drives the travel), read by
 * world.css: the slot's named timeline and its desktop and mobile ranges.
 */
function scrubStyle(sprite: MayoSprite | undefined) {
  if (!sprite) return {};
  const { timeline, range, rangeMobile, cycles, cyclesMobile = cycles } = sprite.scrub;
  return {
    "--scrub-timeline": timeline,
    "--scrub-range-d": range,
    "--scrub-range-m": rangeMobile ?? range,
    "--cycles-d": String(cycles),
    "--cycles-m": String(cyclesMobile),
  };
}

/**
 * Mayo's slot on an island. When the slot has a painted sprite strip
 * (`mayoSprites`) it renders that strip: a square window over an <img>
 * `frames` times wider, stepped by CSS one cell at a time as the page
 * scrolls (the slot's `scrub` timeline and range), so she only moves while
 * the reader scrolls and rewinds when they scroll back. Without scroll-driven
 * animations, in the reduced tier and with reduced motion she shows the
 * first frame.
 * Slots without a strip show the captured still of the slot's moment.
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
  const sprite = mayoSprites[slot];
  const loading = eager ? "eager" : "lazy";
  const anchor = mayoAnchors[slot];
  const route = anchor ? routeStyle(slot, anchor, sprite) : { css: "", style: {} };
  const style = (
    anchor
      ? ({
          "--mayo-size": size,
          "--feet-y": sprite?.feetY ?? "80%",
          "--anchor-x": anchor.x,
          "--anchor-y": anchor.y,
          "--anchor-size": anchor.size,
          "--anchor-x-m": anchor.xMobile ?? anchor.x,
          "--anchor-y-m": anchor.yMobile ?? anchor.y,
          "--anchor-size-m": anchor.sizeMobile ?? anchor.size,
          ...route.style,
          ...shadowStyle(anchor),
          ...contactStyle(anchor),
          ...scrubStyle(sprite),
        } as Record<string, string>)
      : ({ "--mayo-size": size, "--feet-y": sprite?.feetY ?? "100%", ...scrubStyle(sprite) } as Record<string, string>)
  ) as CSSProperties;

  return (
    <div
      className={[
        "mayo",
        `mayo--${slot}`,
        anchor ? "mayo--anchored" : "",
        anchor && anchor.shadow !== false ? "mayo--shadow" : "",
        anchor?.face === "right" ? "mayo--face-right" : "",
        anchor?.route ? "mayo--route" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-mayo-slot={slot}
      data-mayo-moment={moment}
      style={style}
    >
      {route.css ? <style>{route.css}</style> : null}
      {anchor?.contact ? <span className="mayo__contact" aria-hidden="true" /> : null}
      {sprite ? (
        <div
          className={sprite.arrival ? "mayo__sprite mayo__sprite--run" : "mayo__sprite"}
          style={{ "--frames": sprite.frames, "--loop": sprite.loop === "cycle" ? "normal" : "alternate" } as CSSProperties}
        >
          <picture>
            <source type="image/avif" srcSet={sprite.strip.avif} />
            <img
              src={sprite.strip.webp}
              alt={label}
              width={sprite.cell * sprite.frames}
              height={sprite.cell}
              loading={loading}
              decoding="async"
              fetchPriority={eager ? "high" : "auto"}
            />
          </picture>
        </div>
      ) : null}
      {sprite?.arrival ? (
        <div className="mayo__sprite mayo__sprite--arrival" style={{ "--frames": sprite.arrival.frames } as CSSProperties}>
          <picture>
            <source type="image/avif" srcSet={sprite.arrival.strip.avif} />
            <img
              src={sprite.arrival.strip.webp}
              alt=""
              width={sprite.cell * sprite.arrival.frames}
              height={sprite.cell}
              loading={loading}
              decoding="async"
            />
          </picture>
        </div>
      ) : null}
      {sprite ? null : (
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
      )}
    </div>
  );
}
