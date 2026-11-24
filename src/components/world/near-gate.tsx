"use client";

import { useEffect, useRef } from "react";

import { afterLoadIdle } from "@/lib/after-load";

type Gate = { section: HTMLElement; open: () => void };

/** Every mounted gate, for the after-load prefetch. */
const gates = new Set<Gate>();
let prefetching = false;

/** Longest wait for one section's images before the prefetch moves on. */
const SECTION_TIMEOUT = 10000;

/**
 * Resolves once every image of the section the browser has started has
 * loaded or failed (or after SECTION_TIMEOUT). Lazy images still beyond the
 * browser's lazy-load distance have no `currentSrc` yet: they are left to
 * load as the reader nears them. Neither do images that are not rendered
 * (`display: none`, such as the ambient clouds before their island is near):
 * a lazy one never starts, so waiting for it would stall the queue.
 */
function startedImagesIn(section: HTMLElement) {
  const pending = [...section.querySelectorAll("img")].filter((img) => img.currentSrc && !img.complete && img.getClientRects().length > 0);
  const loaded = Promise.all(
    pending.map(
      (img) =>
        new Promise<void>((resolve) => {
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        }),
    ),
  );
  return Promise.race([loaded, new Promise((resolve) => setTimeout(resolve, SECTION_TIMEOUT))]);
}

/**
 * Once the page has loaded and the browser is idle, opens the gates one at a
 * time in page order, each after the images of the one before have arrived,
 * so a far island never competes with the art right below the hero. Not
 * with Save-Data on: then each island loads only as the reader nears it.
 */
async function prefetchInOrder() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (prefetching || connection?.saveData) return;
  prefetching = true;
  const ordered = [...gates].sort((a, b) =>
    a.section.compareDocumentPosition(b.section) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
  );
  for (const gate of ordered) {
    gate.open();
    // A frame for the shown images to start, then wait for them.
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await startedImagesIn(gate.section);
  }
}

/**
 * Marks its section for world.css's loading rules:
 *
 * - `data-near`, once the reader comes within `ahead` viewport heights of it
 *   or, after the page has loaded, when its turn in the prefetch comes (in
 *   page order, each island after the art of the one before), so a jump
 *   straight to it (the hero's "Ver packs") usually finds its art already
 *   in. Until then the section's heavy art stays out of the first load.
 * - `data-onscreen`, while any of it is on screen, so its endless idle
 *   animations (which repaint their custom properties every frame on the
 *   main thread) pause while nobody can see them.
 *
 * The rules apply only when scripting is on: without JavaScript the art
 * loads with the page and the animations always run, as before.
 */
export function NearGate({ ahead = 2, early = false }: { ahead?: number; early?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = ref.current?.closest("section");
    if (!section) return;
    const near = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) open();
      },
      { rootMargin: `${ahead * 100}% 0px` },
    );
    function open() {
      section!.dataset.near = "";
      near.disconnect();
    }
    const onscreen = new IntersectionObserver((entries) => {
      section.toggleAttribute("data-onscreen", entries[entries.length - 1].isIntersecting);
    });
    const gate: Gate = { section, open };
    gates.add(gate);
    near.observe(section);
    onscreen.observe(section);
    const cancelIdle = afterLoadIdle(prefetchInOrder);
    return () => {
      gates.delete(gate);
      near.disconnect();
      onscreen.disconnect();
      cancelIdle();
    };
  }, [ahead]);

  return (
    <>
      <span ref={ref} hidden />
      {early ? <script dangerouslySetInnerHTML={{ __html: earlyNear(ahead) }} /> : null}
    </>
  );
}

/**
 * `early`: the same `data-near` observer as an inline script, running while
 * the HTML is parsed instead of after hydration, so the art right below the
 * hero starts as soon as the first paint is done rather than seconds later
 * on a slow phone. The section needs `suppressHydrationWarning`: the
 * attribute is already there when React hydrates it.
 */
function earlyNear(ahead: number) {
  return `(function(s){if(!s||!window.IntersectionObserver)return;var o=new IntersectionObserver(function(e){for(var i=0;i<e.length;i++)if(e[i].isIntersecting){s.setAttribute("data-near","");o.disconnect();}},{rootMargin:"${ahead * 100}% 0px"});o.observe(s);})(document.currentScript&&document.currentScript.closest("section"));`;
}
