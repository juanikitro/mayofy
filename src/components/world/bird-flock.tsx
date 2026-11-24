"use client";

import { useEffect, useRef } from "react";

import { type AmbientIsland, BIRD_FIRST_DELAY, BIRD_INTERVAL, ambientBirds } from "@/content/ambient";
import { onFrame } from "@/lib/ambient";
import { type BirdPose, createFlock, flockPoses, stepFlock } from "@/lib/bird-flock";

const MOBILE = "(max-width: 48rem)";

const between = ([min, max]: readonly [number, number]) => min + Math.random() * (max - min);

/** One distant bird: two curved wings from the body, like the birds painted on a landscape. */
function drawBird(context: CanvasRenderingContext2D, pose: BirdPose, width: number, height: number) {
  const span = pose.span * width;
  const half = span / 2;
  const x = pose.x * width;
  const y = pose.y * height;
  // Wings swing from down (-1) to up (1); in a glide they rest in a shallow V.
  const lift = pose.wing * pose.effort + 0.35 * (1 - pose.effort);
  const tip = -lift * half * 0.62;
  const elbow = -lift * half * 0.3 - half * 0.08;
  context.lineWidth = Math.max(1, span * 0.1);
  context.beginPath();
  context.moveTo(x - half, y + tip);
  context.quadraticCurveTo(x - half * 0.45, y + elbow, x, y);
  context.quadraticCurveTo(x + half * 0.45, y + elbow, x + half, y + tip);
  context.stroke();
  context.beginPath();
  context.ellipse(x, y + span * 0.03, span * 0.07, span * 0.05, 0, 0, Math.PI * 2);
  context.fill();
}

/**
 * Now and then a flock of distant birds crosses a day island's sky
 * (docs/plans/2026-11-24-ambiente.md): the first one a few seconds after the
 * island comes on screen, then one every 24 to 48 s while it stays there.
 * A canvas between the plate's background and its island cutout, so birds
 * pass behind the island. It draws only while a flock is crossing a visible
 * island (on the shared frame loop) and only on the `full` ambient tier.
 */
export function BirdFlock({ island }: { island: AmbientIsland }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const sky = ambientBirds[island];
    const section = canvas?.closest("section");
    const context = canvas?.getContext("2d");
    if (!canvas || !sky || !section || !context) return;

    let timer: number | undefined;
    let stop: (() => void) | null = null;

    function clear() {
      context!.clearRect(0, 0, canvas!.width, canvas!.height);
    }

    /** Between flocks the canvas shrinks to a pixel, so it holds no plate-sized buffer. */
    function release() {
      canvas!.width = 1;
      canvas!.height = 1;
    }

    function launch() {
      timer = undefined;
      const box = canvas!.getBoundingClientRect();
      if (box.width === 0 || box.height === 0) return schedule(BIRD_INTERVAL);
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(box.width * scale);
      canvas!.height = Math.round(box.height * scale);
      const mobile = window.matchMedia(MOBILE).matches;
      // About 10 px wide on a 1440 px desktop plate, 8 px on a phone.
      const span = Math.min(Math.max(box.width * 0.0068, 7), 13) / box.width;
      const flock = createFlock(Math.random, { band: mobile ? sky!.bandMobile : sky!.band, aspect: box.height / box.width, span });
      const width = canvas!.width;
      const height = canvas!.height;
      context!.strokeStyle = `rgb(${sky!.ink} / 0.62)`;
      context!.fillStyle = `rgb(${sky!.ink} / 0.62)`;
      context!.lineCap = "round";
      context!.lineJoin = "round";
      // 24 drawings a second: distant birds flap 3 to 4 times a second, 6 to 8 frames a beat
      // read as smooth, and every frame the page draws costs a style pass for each animation on screen.
      stop = onFrame((_, delta) => {
        const flying = stepFlock(flock, delta / 1000);
        clear();
        if (!flying) {
          stop?.();
          stop = null;
          release();
          schedule(BIRD_INTERVAL);
          return;
        }
        for (const pose of flockPoses(flock)) drawBird(context!, pose, width, height);
      }, { fps: 24 });
    }

    function schedule(range: readonly [number, number]) {
      window.clearTimeout(timer);
      timer = window.setTimeout(launch, between(range) * 1000);
    }

    function update() {
      const live = section!.hasAttribute("data-ambient-live") && document.documentElement.dataset.ambient === "full";
      if (live && timer === undefined && !stop) schedule(BIRD_FIRST_DELAY);
      if (!live) {
        // Off screen nothing runs: a flock in the air is dropped, the next one waits for the island.
        window.clearTimeout(timer);
        timer = undefined;
        stop?.();
        stop = null;
        release();
      }
    }

    const watch = new MutationObserver(update);
    watch.observe(section, { attributes: true, attributeFilter: ["data-ambient-live"] });
    watch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-ambient"] });
    update();

    return () => {
      watch.disconnect();
      window.clearTimeout(timer);
      stop?.();
    };
  }, [island]);

  return <canvas ref={ref} className="ambient-birds" aria-hidden="true" />;
}
