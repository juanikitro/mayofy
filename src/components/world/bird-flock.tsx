"use client";

import { useEffect, useRef } from "react";

import { type AmbientIsland, BIRD_FIRST_DELAY, BIRD_INTERVAL, ambientBirds } from "@/content/ambient";
import { onFrame } from "@/lib/ambient";
import { BIRD_FPS, type Drawn, type FlockLaunch, drawFlock, prepareFlock } from "@/lib/bird-draw";
import { stepFlock } from "@/lib/bird-flock";
import type { BirdWorkerMessage, BirdWorkerReply } from "@/lib/bird-flock.worker";

const MOBILE = "(max-width: 48rem)";

const between = ([min, max]: readonly [number, number]) => min + Math.random() * (max - min);

/**
 * Room around the sky band, as a fraction of the plate height plus CSS
 * pixels: the flock climbs or sinks up to 3 % and swells up to 3 % more,
 * and its birds spread a few wingspans around the leader.
 */
const STRIP_PAD = 0.06;
const STRIP_PAD_PX = 48;

/** Draws one island's flocks: in the shared worker, or on the main thread where that is not available. */
type Painter = { launch: (launch: FlockLaunch) => void; stop: () => void };

/** One worker draws every island's flocks; `null` once it could not start. */
let worker: Worker | null | undefined;
const onDone = new Map<string, () => void>();
/** A canvas can hand its drawing to a worker only once (React may run the effect twice). */
const handedOver = new WeakSet<HTMLCanvasElement>();

function birdWorker() {
  if (worker !== undefined) return worker;
  try {
    worker = new Worker(new URL("../../lib/bird-flock.worker.ts", import.meta.url), { type: "module" });
    worker.onmessage = ({ data }: MessageEvent<BirdWorkerReply>) => onDone.get(data.id)?.();
  } catch {
    worker = null;
  }
  return worker;
}

function workerPainter(canvas: HTMLCanvasElement, id: string, done: () => void): Painter | null {
  if (!("transferControlToOffscreen" in canvas) || typeof Worker === "undefined") return null;
  const target = birdWorker();
  if (!target) return null;
  const post = (message: BirdWorkerMessage, transfer: Transferable[] = []) => target.postMessage(message, transfer);
  if (!handedOver.has(canvas)) {
    const offscreen = canvas.transferControlToOffscreen();
    handedOver.add(canvas);
    post({ type: "attach", id, canvas: offscreen }, [offscreen]);
  }
  onDone.set(id, done);
  return { launch: (launch) => post({ type: "launch", id, launch }), stop: () => post({ type: "stop", id }) };
}

function mainPainter(canvas: HTMLCanvasElement, done: () => void): Painter | null {
  const context = canvas.getContext("2d");
  if (!context) return null;
  let stop: (() => void) | null = null;
  /** Between flocks the canvas shrinks to a pixel, so it holds no strip-sized buffer. */
  const release = () => {
    stop?.();
    stop = null;
    canvas.width = 1;
    canvas.height = 1;
  };
  return {
    launch(launch) {
      const flock = prepareFlock(canvas, context, launch);
      let drawn: Drawn = null;
      stop = onFrame(
        (_, delta) => {
          if (!stepFlock(flock, delta / 1000)) {
            release();
            done();
            return;
          }
          drawn = drawFlock(context, flock, launch, drawn);
        },
        { fps: BIRD_FPS },
      );
    },
    stop: release,
  };
}

/**
 * Now and then a flock of distant birds crosses a day island's sky
 * (docs/plans/2026-11-24-ambiente.md): the first one a few seconds after the
 * island comes on screen, then one every 24 to 48 s while it stays there.
 * A canvas between the plate's background and its island cutout, so birds
 * pass behind the island; it covers only the strip of sky the flock can
 * reach. The flock is drawn in a worker (OffscreenCanvas), so it never makes
 * the page draw a main-thread frame, which costs a style pass over every
 * running animation; without OffscreenCanvas it falls back to the shared
 * frame loop. Only on the `full` ambient tier, only while the island is on
 * screen and the tab is visible.
 */
export function BirdFlock({ island }: { island: AmbientIsland }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const sky = ambientBirds[island];
    const section = canvas?.closest("section");
    if (!canvas || !sky || !section) return;

    let timer: number | undefined;
    let flying = false;
    let painter: Painter | null | undefined;

    const isLive = () => section!.hasAttribute("data-ambient-live") && document.documentElement.dataset.ambient === "full" && !document.hidden;

    function landed() {
      if (!flying) return;
      flying = false;
      if (isLive()) schedule(BIRD_INTERVAL);
    }

    function launch() {
      timer = undefined;
      // The plate is the canvas's positioned parent: its box is the flock's frame.
      const plate = canvas!.offsetParent?.getBoundingClientRect();
      if (!plate || plate.width === 0 || plate.height === 0) return schedule(BIRD_INTERVAL);
      // Chosen on the first flock, so nothing loads before a bird flies.
      painter ??= workerPainter(canvas!, island, landed) ?? mainPainter(canvas!, landed);
      if (!painter) return;
      const { width, height } = plate;
      const band = window.matchMedia(MOBILE).matches ? sky!.bandMobile : sky!.band;
      const top = Math.max(0, (band[0] / 100 - STRIP_PAD) * height - STRIP_PAD_PX);
      const bottom = Math.min(height, (band[1] / 100 + STRIP_PAD) * height + STRIP_PAD_PX);
      canvas!.style.top = `${top}px`;
      canvas!.style.height = `${bottom - top}px`;
      flying = true;
      painter.launch({
        width,
        height,
        top,
        strip: bottom - top,
        scale: Math.min(window.devicePixelRatio || 1, 2),
        band,
        // About 10 px wide on a 1440 px desktop plate, 8 px on a phone.
        span: Math.min(Math.max(width * 0.0068, 7), 13) / width,
        ink: sky!.ink,
      });
    }

    function schedule(range: readonly [number, number]) {
      window.clearTimeout(timer);
      timer = window.setTimeout(launch, between(range) * 1000);
    }

    function update() {
      if (isLive()) {
        if (timer === undefined && !flying) schedule(BIRD_FIRST_DELAY);
        return;
      }
      // Off screen or in a hidden tab nothing runs: a flock in the air is dropped, the next one waits.
      window.clearTimeout(timer);
      timer = undefined;
      if (flying) painter?.stop();
      flying = false;
    }

    const watch = new MutationObserver(update);
    watch.observe(section, { attributes: true, attributeFilter: ["data-ambient-live"] });
    watch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-ambient"] });
    document.addEventListener("visibilitychange", update);
    update();

    return () => {
      watch.disconnect();
      document.removeEventListener("visibilitychange", update);
      window.clearTimeout(timer);
      if (flying) painter?.stop();
      onDone.delete(island);
    };
  }, [island]);

  return <canvas ref={ref} className="ambient-birds" aria-hidden="true" />;
}
