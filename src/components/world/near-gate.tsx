"use client";

import { useEffect, useRef } from "react";

import { afterLoadIdle } from "@/lib/after-load";

/**
 * Marks its section `data-near` once the reader comes within `ahead`
 * viewport heights of it, or once the page has loaded and the browser is
 * idle, whichever comes first, so a jump straight to it (the hero's "Ver
 * packs") usually finds its art already in. world.css keeps the section's
 * heavy art out of the first load until then, only when scripting is on:
 * without JavaScript it loads with the page as before.
 */
export function NearGate({ ahead = 2 }: { ahead?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = ref.current?.closest("section");
    if (!section) return;
    let cancelIdle = () => {};
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) open();
      },
      { rootMargin: `${ahead * 100}% 0px` },
    );
    function open() {
      section!.dataset.near = "";
      observer.disconnect();
      cancelIdle();
    }
    observer.observe(section);
    cancelIdle = afterLoadIdle(open);
    return () => {
      observer.disconnect();
      cancelIdle();
    };
  }, [ahead]);

  return <span ref={ref} hidden />;
}
