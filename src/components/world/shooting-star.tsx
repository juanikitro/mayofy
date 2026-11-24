"use client";

import { useEffect, useRef } from "react";

import { SHOOTING_STAR_INTERVAL } from "@/content/ambient";

const between = (min: number, max: number) => min + Math.random() * (max - min);

/**
 * Now and then a shooting star crosses island 7's sky: the first one 5 to
 * 12 s after the island comes on screen, then one every 14 to 32 s while it
 * stays there. One streak element replayed with the Web Animations API
 * (transform and opacity only, on the compositor), at a new place and angle
 * each time. Nothing is scheduled while the island is off screen or the
 * ambient tier is off.
 */
export function ShootingStar() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const streak = ref.current;
    const section = streak?.closest("section");
    if (!streak || !section || typeof streak.animate !== "function") return;

    let timer: number | undefined;
    let flight: Animation | null = null;

    function fly() {
      timer = undefined;
      // In the upper half of the part of the sky that is on screen (the plate is
      // taller than the viewport), falling left or right at 16 to 32 degrees.
      const sky = streak!.parentElement!.getBoundingClientRect();
      const shownFrom = Math.max(0, -sky.top) / sky.height;
      const shownTo = Math.min(sky.height, window.innerHeight - sky.top) / sky.height;
      if (shownTo - shownFrom < 0.15) return schedule(SHOOTING_STAR_INTERVAL);
      const leftward = Math.random() < 0.5;
      const angle = between(16, 32) * (leftward ? -1 : 1);
      streak!.style.left = `${between(18, 82)}%`;
      streak!.style.top = `${(shownFrom + between(0.06, 0.4) * (shownTo - shownFrom)) * 100}%`;
      const travel = leftward ? -1 : 1;
      flight = streak!.animate(
        [
          { opacity: 0, transform: `rotate(${angle}deg) translateX(0) scaleX(0.3)` },
          { opacity: 1, transform: `rotate(${angle}deg) translateX(${travel * 90}%) scaleX(1)`, offset: 0.25 },
          { opacity: 0.85, transform: `rotate(${angle}deg) translateX(${travel * 260}%) scaleX(1)`, offset: 0.7 },
          { opacity: 0, transform: `rotate(${angle}deg) translateX(${travel * 360}%) scaleX(0.6)` },
        ],
        { duration: between(900, 1300), easing: "cubic-bezier(0.3, 0.6, 0.5, 1)" },
      );
      streak!.classList.toggle("ambient-meteor--left", leftward);
      flight.finished.then(() => schedule(SHOOTING_STAR_INTERVAL), () => {});
    }

    function schedule([min, max]: readonly [number, number]) {
      window.clearTimeout(timer);
      if (!running()) return;
      timer = window.setTimeout(fly, between(min, max) * 1000);
    }

    function running() {
      const tier = document.documentElement.dataset.ambient;
      return section!.hasAttribute("data-ambient-live") && (tier === "full" || tier === "lite");
    }

    function update() {
      if (running()) {
        if (timer === undefined && flight?.playState !== "running") schedule([5, 12]);
      } else {
        window.clearTimeout(timer);
        timer = undefined;
        flight?.cancel();
      }
    }

    const watch = new MutationObserver(update);
    watch.observe(section, { attributes: true, attributeFilter: ["data-ambient-live"] });
    watch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-ambient"] });
    update();

    return () => {
      watch.disconnect();
      window.clearTimeout(timer);
      flight?.cancel();
    };
  }, []);

  return <span ref={ref} className="ambient-meteor" />;
}
