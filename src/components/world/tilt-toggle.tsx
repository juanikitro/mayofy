"use client";

import { useEffect, useState } from "react";

import { createSceneDepth } from "@/components/world/scene-depth";
import { approach, normalisedTilt, tiltOnScreen } from "@/lib/ambient";

type OrientationEventWithPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

/** Phones only, and only where the ambient motion runs in full. */
const PHONE = "(hover: none) and (pointer: coarse)";
/** The tilt reaches full depth at 18 degrees, then only 70 % of the desktop depth: calm on a moving hand. */
const RANGE = 18;
const STRENGTH = 0.7;
/** The rest pose follows the hand slowly (half-life), so a new grip or posture re-centres the scene. */
const RECENTRE = 4000;
/** Smaller changes than this are hand tremor: they do not wake the frame loop. */
const DEAD_ZONE = 0.03;
/** If no usable reading arrives in this time, the phone has no gyroscope: the switch goes away. */
const NO_SENSOR = 1500;

/**
 * Opt-in tilt depth for phones (docs/plans/2026-11-24-ambiente.md, "Giroscopio"):
 * a small switch on the first screen. Tapping it asks iOS for motion access
 * (it must come from a tap) and then the island layers lean with the
 * phone's tilt, the same parallax as the desktop pointer at 70 %. Nothing
 * listens to the sensor until the reader turns it on, it turns off with
 * the switch, and it never shows under reduced motion, on the lite tier,
 * on desktops or where the browser has no orientation events.
 */
export function TiltToggle() {
  const [available, setAvailable] = useState(false);
  const [on, setOn] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const phone = window.matchMedia(PHONE);
    function check() {
      const ok = "DeviceOrientationEvent" in window && phone.matches && root.dataset.ambient === "full";
      setAvailable(ok);
      if (!ok) setOn(false);
    }
    check();
    const watch = new MutationObserver(check);
    watch.observe(root, { attributes: true, attributeFilter: ["data-ambient"] });
    phone.addEventListener("change", check);
    return () => {
      watch.disconnect();
      phone.removeEventListener("change", check);
    };
  }, []);

  useEffect(() => {
    if (!on) return;
    const scene = createSceneDepth();
    let rest: { beta: number; gamma: number } | null = null;
    let last = performance.now();
    let aimed = { x: 0, y: 0 };
    const noSensor = window.setTimeout(() => {
      // Never a usable reading: this phone has no gyroscope.
      setOn(false);
      setAvailable(false);
    }, NO_SENSOR);

    function onOrientation(event: DeviceOrientationEvent) {
      if (event.beta === null || event.gamma === null) return;
      window.clearTimeout(noSensor);
      const angle = screen.orientation?.angle ?? 0;
      const pose = tiltOnScreen(event.beta, event.gamma, angle);
      const now = performance.now();
      if (!rest) rest = { ...pose };
      rest.beta = approach(rest.beta, pose.beta, now - last, RECENTRE);
      rest.gamma = approach(rest.gamma, pose.gamma, now - last, RECENTRE);
      last = now;
      const tilt = normalisedTilt(pose.beta, pose.gamma, rest, RANGE);
      const next = { x: tilt.x * STRENGTH, y: tilt.y * STRENGTH };
      if (Math.abs(next.x - aimed.x) < DEAD_ZONE && Math.abs(next.y - aimed.y) < DEAD_ZONE) return;
      aimed = next;
      scene.aim(next.x, next.y);
    }
    window.addEventListener("deviceorientation", onOrientation);

    return () => {
      window.clearTimeout(noSensor);
      window.removeEventListener("deviceorientation", onOrientation);
      scene.dispose();
    };
  }, [on]);

  async function toggle() {
    if (on) {
      setOn(false);
      return;
    }
    const request = (window.DeviceOrientationEvent as OrientationEventWithPermission).requestPermission;
    if (typeof request === "function") {
      try {
        if ((await request()) !== "granted") {
          setDenied(true);
          return;
        }
      } catch {
        setDenied(true);
        return;
      }
    }
    setDenied(false);
    setOn(true);
  }

  if (!available) return null;
  return (
    <button type="button" className="tilt-toggle" aria-pressed={on} onClick={toggle}>
      <svg className="tilt-toggle__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="7" y="3" width="10" height="18" rx="2.2" transform="rotate(-14 12 12)" />
        <path d="M3.5 9.5a9 9 0 0 0 0 5M20.5 9.5a9 9 0 0 1 0 5" />
      </svg>
      <span>{on ? "Dejar quieto" : denied ? "Sin permiso de movimiento" : "Mover con el celular"}</span>
    </button>
  );
}
