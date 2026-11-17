"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

import { mayoModelUrl } from "@/content/stage";
import { LIGHT_PRESETS, blendPresets } from "@/lib/mayo/lighting";
import { getMoment, type Moment } from "@/lib/mayo/moments";
import { createMayoScene, type CameraPose, type MayoScene } from "@/lib/mayo/scene";

/**
 * Full tier: one square, transparent, fixed canvas that travels between the
 * Mayo slots of the page. Each slot is the square its images occupy, so the
 * canvas inherits position and size from the slot and the camera of the
 * slot's moment; between two slots it holds the first for 55% of the
 * distance and travels in the last 45%, blending camera, model rotation
 * and island light like mayo-3d/preview/journey.html.
 */

/** Moment played while leaving a slot (first half of the travel). */
const EXIT_MOMENTS: Record<string, string> = { hero: "02-jump-void" };

type Slot = { element: HTMLElement; moment: Moment; exit?: Moment };

type SphericalPose = CameraPose & { sph: THREE.Spherical };

const smooth = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpAngle = (a: number, b: number, t: number) =>
  a + (((b - a + Math.PI * 3) % (Math.PI * 2)) - Math.PI) * t;

function withSpherical(pose: CameraPose): SphericalPose {
  return { ...pose, sph: new THREE.Spherical().setFromVector3(pose.position.clone().sub(pose.target)) };
}

function mixPoses(a: SphericalPose, b: SphericalPose, t: number): SphericalPose {
  const sph = new THREE.Spherical(
    lerp(a.sph.radius, b.sph.radius, t),
    lerp(a.sph.phi, b.sph.phi, t),
    lerpAngle(a.sph.theta, b.sph.theta, t),
  );
  const target = a.target.clone().lerp(b.target, t);
  return {
    position: target.clone().add(new THREE.Vector3().setFromSpherical(sph)),
    target,
    fov: lerp(a.fov, b.fov, t),
    azimuth: THREE.MathUtils.radToDeg(sph.theta),
    sph,
  };
}

export function MayoStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let mayo: MayoScene | null = null;

    const slotElements = Array.from(document.querySelectorAll<HTMLElement>("[data-mayo-slot]"));
    const slots: Slot[] = slotElements.map((element) => {
      const id = element.dataset.mayoSlot ?? "";
      const exitId = EXIT_MOMENTS[id];
      return {
        element,
        moment: getMoment(element.dataset.mayoMoment ?? ""),
        exit: exitId ? getMoment(exitId) : undefined,
      };
    });
    if (slots.length === 0) return;

    async function start() {
      const scene = await createMayoScene({ canvas: canvas!, modelUrl: mayoModelUrl });
      if (disposed) {
        scene.dispose();
        return;
      }
      mayo = scene;
      scene.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

      // Framing sphere and camera poses per moment (square viewport: aspect 1).
      const momentIds = new Set<string>();
      for (const slot of slots) {
        momentIds.add(slot.moment.id);
        if (slot.exit) momentIds.add(slot.exit.id);
      }
      const poses = new Map<string, { start: SphericalPose; end: SphericalPose }>();
      for (const id of momentIds) {
        const moment = getMoment(id);
        const sphere = scene.frameOf(moment);
        const start = withSpherical(scene.cameraPose(sphere, 1, moment.camera));
        const end = moment.cameraEnd
          ? withSpherical(scene.cameraPose(sphere, 1, moment.cameraEnd))
          : start;
        poses.set(id, { start, end });
      }

      let active: Moment | null = null;
      let pendingMain: Moment | null = null;
      scene.mixer.addEventListener("finished", () => {
        if (pendingMain) {
          const next = pendingMain;
          pendingMain = null;
          scene.play(next.clip, { loop: next.loop, fade: 0.3 });
        }
      });

      function enter(moment: Moment, forward: boolean) {
        if (active === moment) return;
        active = moment;
        scene.applyMoment(moment);
        if (moment.intro && forward) {
          scene.play(moment.intro, { loop: false, fade: 0.3 });
          pendingMain = moment;
        } else {
          pendingMain = null;
          scene.play(moment.clip, { loop: moment.loop, fade: 0.4 });
        }
      }

      /** Camera of a moment, easing to cameraEnd over a one-shot clip. */
      function holdPose(moment: Moment) {
        const pose = poses.get(moment.id)!;
        if (!moment.cameraEnd) return pose.start;
        const action = scene.actions[moment.clip];
        const duration = action?.getClip().duration ?? 1;
        const u = action && (action.isRunning() || action.time > 0) ? Math.min(1, action.time / duration) : 0;
        return mixPoses(pose.start, pose.end, smooth(u));
      }

      let side = 0;
      const timer = new THREE.Timer();
      const pointerHandler = (event: PointerEvent) => {
        if (event.pointerType === "touch") return;
        const rect = canvas!.getBoundingClientRect();
        if (rect.width === 0) return;
        scene.setPointer(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -((event.clientY - rect.top) / rect.height) * 2 + 1,
        );
      };
      window.addEventListener("pointermove", pointerHandler, { passive: true });

      scene.renderer.setAnimationLoop((time) => {
        timer.update(time);
        const rects = slots.map((slot) => slot.element.getBoundingClientRect());
        const centers = rects.map((rect) => rect.top + window.scrollY + rect.height / 2);
        const focus = window.scrollY + window.innerHeight * 0.55;

        let i = 0;
        while (i < slots.length - 1 && focus >= centers[i + 1]) i += 1;
        const j = Math.min(i + 1, slots.length - 1);
        const span = Math.max(1, centers[j] - centers[i]);
        const fraction = i === j ? 0 : Math.min(1, Math.max(0, (focus - centers[i]) / span));
        const t = smooth(Math.max(0, (fraction - 0.55) / 0.45));

        const from = slots[i];
        const to = slots[j];
        const leaving = t > 0 && t < 0.5 && from.exit ? from.exit : null;
        const target = t < 0.5 ? (leaving ?? from.moment) : to.moment;
        enter(target, true);

        const fromPose = active === from.moment || active === from.exit ? holdPose(active!) : poses.get(from.moment.id)!.end;
        const camera = mixPoses(fromPose, poses.get(to.moment.id)!.start, t);
        scene.holder.rotation.set(
          THREE.MathUtils.degToRad(lerp(from.moment.pitch, to.moment.pitch, t)),
          THREE.MathUtils.degToRad(lerp(from.moment.yaw, to.moment.yaw, t)),
          0,
        );
        scene.setCamera(camera);
        scene.setLight(blendPresets(LIGHT_PRESETS[from.moment.light], LIGHT_PRESETS[to.moment.light], t));

        // Place and size the canvas on the blended slot square.
        const x = lerp(rects[i].left, rects[j].left, t);
        const y = lerp(rects[i].top, rects[j].top, t);
        const nextSide = Math.round(lerp(rects[i].width, rects[j].width, t));
        if (nextSide !== side && nextSide > 0) {
          side = nextSide;
          scene.renderer.setSize(side, side, false);
          canvas!.style.width = `${side}px`;
          canvas!.style.height = `${side}px`;
        }
        canvas!.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;

        const offscreen = y > window.innerHeight || y + side < 0;
        const dt = timer.getDelta();
        if (!offscreen) scene.render(dt);
        else scene.mixer.update(dt);
      });

      document.documentElement.dataset.mayo3d = "ready";
      canvas!.classList.add("mayo-stage--ready");

      cleanup = () => {
        window.removeEventListener("pointermove", pointerHandler);
      };
    }

    let cleanup = () => {};
    start().catch((error: unknown) => {
      // The images stay in place; the page never depends on WebGL.
      console.warn("Mayo 3D unavailable", error);
    });

    return () => {
      disposed = true;
      cleanup();
      mayo?.dispose();
      delete document.documentElement.dataset.mayo3d;
    };
  }, []);

  return <canvas ref={canvasRef} className="mayo-stage" aria-hidden="true" />;
}
