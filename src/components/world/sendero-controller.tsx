"use client";

import { useEffect } from "react";

import {
  addMomentumStops,
  framesDuration,
  guideScrollTo,
  motionAllowed,
  onGestureEnd,
  type Gesture,
} from "@/components/world/guided-scroll";

/** Painted frames a second for a guided leg: about the pace her strips were drawn for. */
const FPS = 10;

/**
 * Behaviour of the six steps' pinned path (SixSteps), only while it is pinned
 * (motion allowed and scroll-driven animations supported; world.css decides,
 * this reads the stage's `position`):
 *
 * - Each step (and each segment of the phone bar) is a button that scrolls to
 *   its step's rest point: the middle of the stretch where Mayo stands on its
 *   stone (after the first `legShare` of the step's sixth of the pin).
 * - The current step's buttons carry `aria-current="step"`.
 * - Settle (Juani, 20 November 2026: "si me quedo en la mitad del scroll del
 *   punto 5 al 6, el scroll debe completarse"): when a gesture by the reader
 *   ends while Mayo is between two stones, the page finishes the leg in the
 *   gesture's direction: on to the next stone going down, back to the stone
 *   she left going up. It acts only once the gesture is over
 *   (guided-scroll.ts, `onGestureEnd`), never while the reader scrolls, and
 *   never outside the pin, so entering and leaving the section stay free.
 * - A touch fling stops on the next stone (`addMomentumStops`), so one flick
 *   never skips a step (the simulated user test, 20 November: a flick went
 *   from step 4 to 6).
 * - Both scrolls are guided (guided-scroll.ts), not the browser's fast smooth
 *   scroll ("mayo hace la animacion super apurada"): they last as long as the
 *   painted frames they cross need at about `FPS`, and any input stops them.
 */
export function SenderoController({
  legShare,
  legFrames,
}: {
  legShare: number;
  legFrames: { desktop: readonly number[]; mobile: readonly number[] } | null;
}) {
  useEffect(() => {
    const track = document.querySelector<HTMLElement>(".sendero");
    const stage = track?.querySelector<HTMLElement>(".sendero__stage");
    if (!track || !stage) return;
    const buttons = [...track.querySelectorAll<HTMLButtonElement>("button[data-step]")];
    const steps = new Set(buttons.map((button) => button.dataset.step)).size;
    if (!steps) return;
    const phone = window.matchMedia("(max-width: 48rem)");
    const pinned = () => getComputedStyle(stage).position === "sticky";
    const geometry = () => {
      const top = track.getBoundingClientRect().top + window.scrollY;
      return { top, length: track.offsetHeight - window.innerHeight };
    };
    /** Progress through the pin, 0 when it starts and 1 when it ends. */
    const progress = () => {
      const { top, length } = geometry();
      return length > 0 ? (window.scrollY - top) / length : 0;
    };
    const restOf = (step: number) => (step + legShare + (1 - legShare) / 2) / steps;
    /** Painted frames Mayo plays between two progress values. */
    const framesBetween = (from: number, to: number) => {
      const frames = (phone.matches ? legFrames?.mobile : legFrames?.desktop) ?? [];
      const [low, high] = [Math.min(from, to) * steps, Math.max(from, to) * steps];
      return frames.reduce((sum, count, step) => {
        const overlap = Math.max(0, Math.min(high, step + legShare) - Math.max(low, step));
        return sum + (overlap / legShare) * count;
      }, 0);
    };
    const scrollToProgress = (value: number, longest: number) => {
      const { top, length } = geometry();
      const target = Math.round(top + value * length);
      if (!motionAllowed()) {
        window.scrollTo({ top: target, behavior: "instant" });
        return;
      }
      void guideScrollTo(target, framesDuration(framesBetween(progress(), value), FPS, 500, longest));
    };

    let current = -1;
    const markCurrent = () => {
      const step = pinned() ? Math.min(steps - 1, Math.max(0, Math.floor(progress() * steps))) : -1;
      if (step === current) return;
      current = step;
      for (const button of buttons) {
        if (step >= 0 && Number(button.dataset.step) === step) button.setAttribute("aria-current", "step");
        else button.removeAttribute("aria-current");
      }
    };

    const settle = ({ direction }: Gesture) => {
      if (!pinned() || !motionAllowed()) return;
      const p = progress();
      if (p <= 0 || p >= 1) return;
      const step = Math.min(steps - 1, Math.floor(p * steps));
      const within = p * steps - step;
      // Standing on her stone: nothing to finish.
      if (within >= legShare) return;
      scrollToProgress(direction > 0 ? restOf(step) : step === 0 ? 0 : restOf(step - 1), 1400);
    };
    /** Each stone's rest point, in page pixels, while the path is pinned. */
    const stones = () => {
      if (!pinned() || !motionAllowed()) return [];
      const { top, length } = geometry();
      return Array.from({ length: steps }, (_, step) => Math.round(top + restOf(step) * length));
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        markCurrent();
      });
    };
    const onClick = (event: MouseEvent) => {
      const button = (event.target as Element).closest<HTMLButtonElement>("button[data-step]");
      if (!button || !pinned()) return;
      // A jump over several stones gets more time than a settle, still bounded.
      scrollToProgress(restOf(Number(button.dataset.step)), 3200);
    };
    const stopGestures = onGestureEnd(settle);
    const stopMomentum = addMomentumStops(stones);

    markCurrent();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", markCurrent);
    track.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(frame);
      stopGestures();
      stopMomentum();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", markCurrent);
      track.removeEventListener("click", onClick);
    };
  }, [legShare, legFrames]);

  return null;
}
