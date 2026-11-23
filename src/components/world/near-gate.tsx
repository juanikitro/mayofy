"use client";

import { useEffect, useRef } from "react";

import { afterLoadIdle } from "@/lib/after-load";

/**
 * Marks its section for world.css's loading rules:
 *
 * - `data-near`, once the reader comes within `ahead` viewport heights of it
 *   or once the page has loaded and the browser is idle, whichever comes
 *   first, so a jump straight to it (the hero's "Ver packs") usually finds
 *   its art already in. Until then the section's heavy art stays out of the
 *   first load.
 * - `data-onscreen`, while any of it is on screen, so its endless idle
 *   animations (which repaint their custom properties every frame on the
 *   main thread) pause while nobody can see them.
 *
 * The rules apply only when scripting is on: without JavaScript the art
 * loads with the page and the animations always run, as before.
 */
export function NearGate({ ahead = 2 }: { ahead?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = ref.current?.closest("section");
    if (!section) return;
    let cancelIdle = () => {};
    const near = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) open();
      },
      { rootMargin: `${ahead * 100}% 0px` },
    );
    function open() {
      section!.dataset.near = "";
      near.disconnect();
      cancelIdle();
    }
    const onscreen = new IntersectionObserver((entries) => {
      section.toggleAttribute("data-onscreen", entries[entries.length - 1].isIntersecting);
    });
    near.observe(section);
    onscreen.observe(section);
    cancelIdle = afterLoadIdle(open);
    return () => {
      near.disconnect();
      onscreen.disconnect();
      cancelIdle();
    };
  }, [ahead]);

  return <span ref={ref} hidden />;
}
