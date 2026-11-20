"use client";

import { useEffect } from "react";

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
 *   punto 5 al 6, el scroll debe completarse"): when a scroll ends while Mayo
 *   is between two stones, the page finishes the leg in the direction of
 *   travel, or goes back to the stone she left, with a smooth scroll. It acts
 *   only after the scroll has ended (`scrollend`, or a short pause where that
 *   event is missing), never while the reader scrolls, and never outside the
 *   pin, so entering and leaving the section stay free.
 */
export function SenderoController({ legShare }: { legShare: number }) {
  useEffect(() => {
    const track = document.querySelector<HTMLElement>(".sendero");
    const stage = track?.querySelector<HTMLElement>(".sendero__stage");
    if (!track || !stage) return;
    const buttons = [...track.querySelectorAll<HTMLButtonElement>("button[data-step]")];
    const steps = new Set(buttons.map((button) => button.dataset.step)).size;
    if (!steps) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
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
    const scrollToProgress = (value: number) => {
      const { top, length } = geometry();
      window.scrollTo({ top: Math.round(top + value * length), behavior: reduced.matches ? "instant" : "smooth" });
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

    let restingY = window.scrollY;
    const settle = () => {
      const travel = window.scrollY - restingY;
      restingY = window.scrollY;
      if (!pinned()) return;
      const p = progress();
      if (p <= 0 || p >= 1) return;
      const step = Math.min(steps - 1, Math.floor(p * steps));
      const within = p * steps - step;
      // Standing on her stone: nothing to finish.
      if (within >= legShare) return;
      scrollToProgress(travel >= 0 ? restOf(step) : step === 0 ? 0 : restOf(step - 1));
    };

    let frame = 0;
    let pause = 0;
    const hasScrollEnd = "onscrollend" in window;
    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          markCurrent();
        });
      }
      if (!hasScrollEnd) {
        window.clearTimeout(pause);
        pause = window.setTimeout(settle, 160);
      }
    };
    const onClick = (event: MouseEvent) => {
      const button = (event.target as Element).closest<HTMLButtonElement>("button[data-step]");
      if (!button || !pinned()) return;
      scrollToProgress(restOf(Number(button.dataset.step)));
    };

    markCurrent();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (hasScrollEnd) window.addEventListener("scrollend", settle);
    window.addEventListener("resize", markCurrent);
    track.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(pause);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", settle);
      window.removeEventListener("resize", markCurrent);
      track.removeEventListener("click", onClick);
    };
  }, [legShare]);

  return null;
}
