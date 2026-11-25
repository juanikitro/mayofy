import type { SceneDepth } from "@/components/world/scene-depth";
import { createTiltReader } from "@/lib/ambient";

/*
 * Tilt depth on phones (docs/plans/2026-11-24-ambiente.md, "Giroscopio"):
 * the island layers lean with the phone's tilt, the same parallax as the
 * desktop pointer at 70 %. It starts by itself on phones (AmbientMotion,
 * autoTiltAllowed); there is no button and it never asks for permission.
 */

/** Full depth at 18 degrees of tilt, and then only 70 % of the pointer depth: calm on a moving hand. */
const RANGE = 18;
const STRENGTH = 0.7;
/** The rest pose follows the hand slowly (half-life), so a new grip or posture re-centres the scene. */
const RECENTRE = 4000;
/** Smaller changes than this are hand tremor or sensor noise: they do not wake the frame loop. */
const DEAD_ZONE = 0.03;
/** Readings averaged into the first rest pose. */
const CALIBRATION = 5;
/** If no usable reading arrives in this time (no gyroscope, or iOS without permission), stop listening. */
const NO_SENSOR = 1500;

/** The scenes the depth moves (createSceneDepth leaves island 3's assembly alone). */
const LIVE_SCENE = "main section[data-island][data-ambient-live]:not([data-island='3'])";

/**
 * Listens to `deviceorientation` and aims `depth` with it. Readings are
 * dropped while the tab is hidden or no island scene is on screen. Calls
 * `onNoSensor` (after stopping) when no usable reading arrives. Returns the
 * function that stops listening.
 */
export function startTiltDepth(depth: SceneDepth, onNoSensor: () => void) {
  const reader = createTiltReader({ range: RANGE, strength: STRENGTH, recentre: RECENTRE, deadZone: DEAD_ZONE, calibration: CALIBRATION });
  let sensed = false;

  function onOrientation(event: DeviceOrientationEvent) {
    if (event.beta === null || event.gamma === null) return;
    if (!sensed) {
      sensed = true;
      window.clearTimeout(noSensor);
    }
    if (document.hidden || !document.querySelector(LIVE_SCENE)) return;
    const aim = reader.read(event.beta, event.gamma, screen.orientation?.angle ?? 0, performance.now());
    if (aim) depth.aim(aim.x, aim.y);
  }

  function stop() {
    window.clearTimeout(noSensor);
    window.removeEventListener("deviceorientation", onOrientation);
  }

  const noSensor = window.setTimeout(() => {
    stop();
    onNoSensor();
  }, NO_SENSOR);
  window.addEventListener("deviceorientation", onOrientation);
  return stop;
}
