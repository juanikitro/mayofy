/*
 * Draws the bird flocks off the main thread (docs/plans/2026-11-24-ambiente.md).
 * Each island's canvas is handed over once with transferControlToOffscreen;
 * the page then asks for a flock and hears back when it has crossed. Frames
 * drawn here reach the compositor without a main-thread frame, so a flock no
 * longer makes the whole page restyle 24 times a second.
 */

import { BIRD_FPS, type Drawn, type FlockLaunch, drawFlock, prepareFlock } from "@/lib/bird-draw";
import { type Flock, stepFlock } from "@/lib/bird-flock";

export type BirdWorkerMessage =
  | { type: "attach"; id: string; canvas: OffscreenCanvas }
  | { type: "launch"; id: string; launch: FlockLaunch }
  | { type: "stop"; id: string };

export type BirdWorkerReply = { type: "done"; id: string };

type Sky = { canvas: OffscreenCanvas; context: OffscreenCanvasRenderingContext2D; flight: { flock: Flock; launch: FlockLaunch; drawn: Drawn } | null };

const scope = self as unknown as {
  onmessage: ((event: MessageEvent<BirdWorkerMessage>) => void) | null;
  postMessage: (message: BirdWorkerReply) => void;
  requestAnimationFrame?: (callback: (time: number) => void) => number;
};

const skies = new Map<string, Sky>();
const INTERVAL = 1000 / BIRD_FPS;
/** Longest step: after a pause (hidden tab) nothing jumps. */
const MAX_STEP = 100;
let running = false;
let last = 0;

/** Shrinks a canvas to a pixel between flocks, so it holds no strip-sized buffer. */
function release(sky: Sky) {
  sky.flight = null;
  sky.canvas.width = 1;
  sky.canvas.height = 1;
}

function tick(time: number) {
  running = false;
  if (time - last >= INTERVAL - 8) {
    const seconds = Math.min(time - last, MAX_STEP) / 1000;
    last = time;
    for (const [id, sky] of skies) {
      const flight = sky.flight;
      if (!flight) continue;
      if (!stepFlock(flight.flock, seconds)) {
        release(sky);
        scope.postMessage({ type: "done", id });
        continue;
      }
      flight.drawn = drawFlock(sky.context, flight.flock, flight.launch, flight.drawn);
    }
  }
  schedule();
}

function schedule() {
  if (running || ![...skies.values()].some((sky) => sky.flight)) return;
  running = true;
  // Worker frames follow the display and pause with a hidden page; a timer is the fallback.
  if (scope.requestAnimationFrame) scope.requestAnimationFrame(tick);
  else setTimeout(() => tick(performance.now()), INTERVAL);
}

scope.onmessage = ({ data }) => {
  if (data.type === "attach") {
    const context = data.canvas.getContext("2d");
    if (context) skies.set(data.id, { canvas: data.canvas, context, flight: null });
    return;
  }
  const sky = skies.get(data.id);
  if (!sky) return;
  if (data.type === "stop") {
    release(sky);
    return;
  }
  const flock = prepareFlock(sky.canvas, sky.context, data.launch);
  sky.flight = { flock, launch: data.launch, drawn: null };
  if (!running) last = performance.now();
  schedule();
};
