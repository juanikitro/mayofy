import type { CSSProperties } from "react";

import { getMayoSlot, mayoAnchors, mayoPoseSources, mayoSprites, type MayoAnchor, type MayoContactLayer, type MayoSlotId, type MayoSprite, type MayoStops, type RoutePoint } from "@/content/stage";

const pct = (value: string) => Number.parseFloat(value);

type Pose = { strip: "run" | "arrival" | "hop"; frame: number; x: number; y: number; scale: number; mirror: boolean };

/**
 * A short leg as a hop: she crouches where she stands, the steps into the
 * flight frames share the whole way (descent and depth included), and she
 * lands, settles and stands on the stop without moving again, so her planted
 * paws never slide. She faces the way she goes, like the gallop.
 */
function hopPoses(from: RoutePoint, to: RoutePoint, hop: NonNullable<MayoSprite["hop"]>): Pose[] {
  const flight = new Set(hop.flight);
  const share = 1 / hop.flight.length;
  let travelled = 0;
  return Array.from({ length: hop.frames }, (_, frame) => {
    if (flight.has(frame)) travelled += share;
    const t = Math.min(1, travelled);
    return {
      strip: "hop" as const,
      frame,
      x: from[0] + (to[0] - from[0]) * t,
      y: from[1] + (to[1] - from[1]) * t,
      scale: from[2] + (to[2] - from[2]) * t,
      mirror: to[0] - from[0] > 0,
    };
  });
}

/**
 * Gallop frames (0-based) a leg may take before the arrival lands it: none,
 * a single leap (the extended suspension), half a stride from the rear
 * stance, then whole and half strides. Every option ends on a suspension
 * (f6 or f12), so the arrival's f1 (a front-stance start) follows as the
 * gallop's next frame would.
 */
const legOptions: readonly (readonly number[])[] = [
  [],
  [5],
  [3, 4, 5],
  [0, 1, 2, 3, 4, 5],
  [3, 4, 5, 6, 7, 8, 9, 10, 11],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  [3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5],
];
const suspensions = new Set([2, 5, 8, 11]);

/**
 * One leg, from a stop to the next: the gallop frames that fit its length,
 * then the arrival's frames, its last standing on the stop. During a stance
 * step (a planted paw, `stride.stance`) she moves only sideways and exactly
 * by the paw's painted advance, scaled by depth, so the paw never slides;
 * every other step in the air shares the rest of the way, the path's descent
 * included. Of the options that fit (stance never longer than the leg's
 * sideways run), the one whose airborne steps come closest to the gallop's
 * own wins. She faces the way she goes (the strips face left).
 */
function legPoses(from: RoutePoint, to: RoutePoint, aspect: number, size: number, sprite: MayoSprite): Pose[] {
  const run = sprite.stride!;
  const arrival = sprite.arrival!;
  const dx = to[0] - from[0];
  const dyWidths = (to[1] - from[1]) * aspect;
  const direction = dx > 0 ? 1 : -1;
  const meanScale = (from[2] + to[2]) / 2;
  const cell = (advance: number) => (advance / 100) * size * meanScale;
  // A leg shorter than `hop.maxCells` cells is a hop, not a run.
  if (sprite.hop && Math.hypot(dx, dyWidths) < cell(100) * sprite.hop.maxCells) return hopPoses(from, to, sprite.hop);
  const steps = (gallop: readonly number[]) => {
    const frames = [
      ...gallop.map((frame) => ({ strip: "run" as const, frame })),
      ...Array.from({ length: arrival.frames }, (_, frame) => ({ strip: "arrival" as const, frame })),
    ];
    return frames.map((pose, k) => {
      let kind: "stance" | "air" | "still" = "still";
      let advance = 0;
      if (pose.strip === "run") {
        const previous = k > 0 ? gallop[k - 1] : undefined;
        const stance = run.stance[pose.frame];
        if (previous === undefined) kind = suspensions.has(pose.frame) ? "air" : "still";
        else if (stance !== undefined && previous === pose.frame - 1) [kind, advance] = ["stance", stance];
        else kind = "air";
      } else if (pose.frame === 0) kind = "air";
      else if (arrival.stride.stance[pose.frame] !== undefined) [kind, advance] = ["stance", arrival.stride.stance[pose.frame]];
      return { ...pose, kind, advance };
    });
  };
  let best: { gallop: readonly number[]; score: number } | undefined;
  for (const gallop of legOptions) {
    const list = steps(gallop);
    const stanceX = list.reduce((sum, step) => sum + cell(step.advance), 0);
    const airborne = list.filter((step) => step.kind === "air").length;
    if (stanceX > Math.abs(dx) + 1e-6 || airborne === 0) continue;
    const rest = Math.hypot(Math.abs(dx) - stanceX, dyWidths) / airborne;
    const score = Math.abs(rest / cell(run.airborne) - 1);
    if (!best || score < best.score) best = { gallop, score };
  }
  // A leg that runs almost straight down the path (shorter sideways than one
  // planted step) has no option that fits: she leaps it, and only then does
  // the landing's planted step shrink to the sideways run.
  const list = steps(best?.gallop ?? [5]);
  const stanceTotal = list.reduce((sum, step) => sum + cell(step.advance), 0);
  const stanceScale = stanceTotal > Math.abs(dx) ? Math.abs(dx) / stanceTotal : 1;
  const airborne = Math.max(1, list.filter((step) => step.kind === "air").length);
  const airX = (dx - direction * stanceTotal * stanceScale) / airborne;
  const airY = (to[1] - from[1]) / airborne;
  const length = Math.hypot(dx, dyWidths) || 1;
  let [x, y] = from;
  return list.map((step) => {
    if (step.kind === "stance") x += direction * cell(step.advance) * stanceScale;
    if (step.kind === "air") [x, y] = [x + airX, y + airY];
    const t = Math.min(1, Math.hypot(x - from[0], (y - from[1]) * aspect) / length);
    return { strip: step.strip, frame: step.frame, x, y, scale: from[2] + (to[2] - from[2]) * t, mirror: direction > 0 };
  });
}

/**
 * The walk as keyframes on the slot's range: before it she stands on the
 * first stop; each later stop has an equal slice, whose first `legShare`
 * plays the leg (one keyframe per painted frame, each held until the next by
 * the animation's `step-end`) and whose rest holds her standing on the stop.
 * Three animations share the offsets: the box (`translate` from the anchor in
 * Mayo's own widths, a y in % of the plate's height turned into widths
 * through the plate's aspect, and a depth `scale` that mirrors her when she
 * heads right) and the two strips (the visible cell, or hidden).
 */
function stopsKeyframes(name: string, stops: MayoStops, x: string, y: string, size: string, sprite: MayoSprite) {
  const points = stops.points;
  const share = sprite.legShare ?? 0.5;
  const slice = 100 / (points.length - 1);
  const legs = points.slice(1).map((to, leg) => legPoses(points[leg], to, stops.aspect, pct(size), sprite));
  const [x0, y0, s0] = points[0];
  const timeline: { offset: number; pose: Pose }[] = [
    { offset: 0, pose: { strip: "arrival", frame: sprite.arrival!.frames - 1, x: x0, y: y0, scale: s0, mirror: legs[0][0]?.mirror ?? false } },
  ];
  legs.forEach((poses, leg) => {
    poses.forEach((pose, k) => timeline.push({ offset: leg * slice + ((k + 1) / poses.length) * share * slice, pose }));
  });
  const round = (value: number) => Number(value.toFixed(3));
  const frameShift = (frames: number, frame: number) => `translateX(${round((-100 * frame) / frames)}%)`;
  const box: string[] = [];
  const strips = { run: [] as string[], arrival: [] as string[], hop: [] as string[] };
  const frameCount = { run: sprite.frames, arrival: sprite.arrival!.frames, hop: sprite.hop?.frames ?? 1 };
  const add = (offset: number, pose: Pose) => {
    const at = `${round(offset)}%`;
    const scale = round(pose.scale);
    box.push(`${at}{translate:${round(((pose.x - pct(x)) / pct(size)) * 100)}% ${round((((pose.y - pct(y)) * stops.aspect) / pct(size)) * 100)}%;scale:${pose.mirror ? -scale : scale} ${scale}}`);
    for (const strip of ["run", "arrival", "hop"] as const) {
      const shown = pose.strip === strip;
      strips[strip].push(`${at}{opacity:${shown ? 1 : 0};transform:${frameShift(frameCount[strip], shown ? pose.frame : 0)}}`);
    }
  };
  timeline.forEach(({ offset, pose }) => add(offset, pose));
  add(100, timeline[timeline.length - 1].pose);
  return (
    `@keyframes ${name}{${box.join("")}}` +
    (["run", "arrival", "hop"] as const).map((strip) => `@keyframes ${name}-${strip}{${strips[strip].join("")}}`).join("")
  );
}

/**
 * How many painted frames each leg of a slot's walk plays (desktop, mobile),
 * so a guided scroll can give a leg time for all of them.
 */
export function stopsLegFrames(slot: MayoSlotId) {
  const anchor = mayoAnchors[slot];
  const sprite = mayoSprites[slot];
  if (!anchor?.stops || !sprite?.stride || !sprite.arrival) return null;
  const count = (stops: MayoStops, size: string) =>
    stops.points.slice(1).map((to, leg) => legPoses(stops.points[leg], to, stops.aspect, pct(size), sprite).length);
  return {
    desktop: count(anchor.stops, anchor.size),
    mobile: count(anchor.stopsMobile ?? anchor.stops, anchor.sizeMobile ?? anchor.size),
  };
}

/** A slot's walk between stops as keyframes (desktop and mobile), named for world.css. */
function stopsStyle(slot: MayoSlotId, anchor: MayoAnchor, sprite: MayoSprite | undefined) {
  if (!anchor.stops || !sprite?.stride || !sprite.arrival) return { css: "", style: {} };
  const desktop = `mayo-stops-${slot}-d`;
  const mobile = `mayo-stops-${slot}-m`;
  return {
    css:
      stopsKeyframes(desktop, anchor.stops, anchor.x, anchor.y, anchor.size, sprite) +
      stopsKeyframes(mobile, anchor.stopsMobile ?? anchor.stops, anchor.xMobile ?? anchor.x, anchor.yMobile ?? anchor.y, anchor.sizeMobile ?? anchor.size, sprite),
    style: {
      "--stops-d": desktop,
      "--stops-m": mobile,
      "--stops-run-d": `${desktop}-run`,
      "--stops-run-m": `${mobile}-run`,
      "--stops-arrival-d": `${desktop}-arrival`,
      "--stops-arrival-m": `${mobile}-arrival`,
      "--stops-hop-d": `${desktop}-hop`,
      "--stops-hop-m": `${mobile}-hop`,
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
  // The box reaches one cell past hers on every side (world.css), so a long
  // cast shadow fits; layers stay authored in % of her cell.
  const at = (value: string) => `${((parseFloat(value) + 100) / 3).toFixed(3)}%`;
  const radius = (value: string) => `${(parseFloat(value) / 3).toFixed(3)}%`;
  const ellipse = ({ x, y, w, h, opacity }: MayoContactLayer) =>
    `radial-gradient(${radius(w)} ${radius(h)} at ${at(x)} ${at(y)}, rgb(${tint} / ${opacity}), rgb(${tint} / ${(opacity * 0.5).toFixed(3)}) 50%, rgb(${tint} / 0))`;
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
  const walk = anchor ? stopsStyle(slot, anchor, sprite) : { css: "", style: {} };
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
          ...walk.style,
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
        anchor?.stops ? "mayo--stops" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-mayo-slot={slot}
      data-mayo-moment={moment}
      style={style}
    >
      {walk.css ? <style>{walk.css}</style> : null}
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
      {sprite?.hop ? (
        <div className="mayo__sprite mayo__sprite--hop" style={{ "--frames": sprite.hop.frames } as CSSProperties}>
          <picture>
            <source type="image/avif" srcSet={sprite.hop.strip.avif} />
            <img src={sprite.hop.strip.webp} alt="" width={sprite.cell * sprite.hop.frames} height={sprite.cell} loading={loading} decoding="async" />
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
