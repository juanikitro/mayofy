/*
 * Drawing for the bird flocks (docs/plans/2026-11-24-ambiente.md), shared by
 * the worker that normally draws them and the main-thread fallback.
 */

import { type BirdPose, type Flock, createFlock, flockPoses } from "@/lib/bird-flock";

type Context = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

/** What a canvas needs to draw one flock: the plate's box and the strip of it the canvas covers. */
export type FlockLaunch = {
  /** Plate size in CSS pixels. */
  width: number;
  height: number;
  /** The canvas strip: its top and height in plate CSS pixels. */
  top: number;
  strip: number;
  /** Canvas pixels per CSS pixel. */
  scale: number;
  /** Sky band in percent of the plate height, wingspan as a fraction of the plate width. */
  band: readonly [number, number];
  span: number;
  /** Bird colour as "r g b". */
  ink: string;
};

/** Where the birds were drawn, in plate CSS pixels: the only area the next frame clears. */
export type Drawn = { x: number; y: number; w: number; h: number } | null;

/** Frames drawn per second: distant birds flap 3 to 4 times a second, 6 to 8 frames a beat read as smooth. */
export const BIRD_FPS = 24;

/** One distant bird: two curved wings from the body, like the birds painted on a landscape. */
function drawBird(context: Context, pose: BirdPose, width: number, height: number, hairline: number) {
  const span = pose.span * width;
  const half = span / 2;
  const x = pose.x * width;
  const y = pose.y * height;
  // Wings swing from down (-1) to up (1); in a glide they rest in a shallow V.
  const lift = pose.wing * pose.effort + 0.35 * (1 - pose.effort);
  const tip = -lift * half * 0.62;
  const elbow = -lift * half * 0.3 - half * 0.08;
  context.lineWidth = Math.max(hairline, span * 0.1);
  context.beginPath();
  context.moveTo(x - half, y + tip);
  context.quadraticCurveTo(x - half * 0.45, y + elbow, x, y);
  context.quadraticCurveTo(x + half * 0.45, y + elbow, x + half, y + tip);
  context.stroke();
  context.beginPath();
  context.ellipse(x, y + span * 0.03, span * 0.07, span * 0.05, 0, 0, Math.PI * 2);
  context.fill();
}

/** Sizes the canvas to its strip, sets the pen and returns a new flock for it. */
export function prepareFlock(canvas: HTMLCanvasElement | OffscreenCanvas, context: Context, launch: FlockLaunch): Flock {
  canvas.width = Math.round(launch.width * launch.scale);
  canvas.height = Math.round(launch.strip * launch.scale);
  // Draw in plate CSS pixels; the strip starts `top` pixels down the plate.
  context.setTransform(launch.scale, 0, 0, launch.scale, 0, -launch.top * launch.scale);
  context.strokeStyle = `rgb(${launch.ink} / 0.62)`;
  context.fillStyle = `rgb(${launch.ink} / 0.62)`;
  context.lineCap = "round";
  context.lineJoin = "round";
  return createFlock(Math.random, { band: launch.band, aspect: launch.height / launch.width, span: launch.span });
}

/** Clears where the flock was and draws it where it is now. */
export function drawFlock(context: Context, flock: Flock, launch: FlockLaunch, drawn: Drawn): Drawn {
  if (drawn) context.clearRect(drawn.x, drawn.y, drawn.w, drawn.h);
  const { width, height } = launch;
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const pose of flockPoses(flock)) {
    drawBird(context, pose, width, height, 1 / launch.scale);
    const reach = pose.span * width;
    x0 = Math.min(x0, pose.x * width - reach);
    x1 = Math.max(x1, pose.x * width + reach);
    y0 = Math.min(y0, pose.y * height - reach);
    y1 = Math.max(y1, pose.y * height + reach);
  }
  return x1 > x0 ? { x: x0, y: y0, w: x1 - x0, h: y1 - y0 } : null;
}
