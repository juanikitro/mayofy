import { approach, onFrame } from "@/lib/ambient";

/*
 * Depth by parallax for the island scenes (docs/plans/2026-11-24-ambiente.md):
 * each layer of a plate shifts a few pixels against the pointer (or the
 * phone's tilt), the nearer the further, by the independent `translate`
 * property, which adds to the scroll animations' `transform` instead of
 * replacing it. The plate itself carries the island's shift, so everything
 * standing on the island (Mayo, objects, light, the breeze) goes with it;
 * the layers behind are moved back by the difference.
 */

/** Largest shift of each depth, in CSS pixels, at the edge of the screen (or full tilt). */
export const DEPTH_PX = {
  /** The painted sky and far islands. */
  background: 3,
  /** Far clouds, birds. */
  sky: 6,
  /** The island cutout and everything on it. */
  island: 10,
  /** Near clouds, in front of the roots. */
  near: 16,
} as const;

/** Vertical shifts are smaller: the eye moves sideways more than up and down. */
const VERTICAL = 0.6;
/** Half of the remaining distance is covered every HALF_LIFE ms: eased, and any new target interrupts it. */
const HALF_LIFE = 150;

type Layer = { element: HTMLElement; depth: number };

const MOBILE = "(max-width: 48rem)";

/** The layers of every plate in `section`, each with its depth relative to the plate. */
function layersOf(section: HTMLElement): Layer[] {
  const mobile = window.matchMedia(MOBILE).matches;
  const layers: Layer[] = [];
  for (const plate of section.querySelectorAll<HTMLElement>(".plate--layered, .sendero__plate")) {
    // A phone plate without a cutout is one flat picture, island included: it all sits at the background's depth.
    const flat = plate.classList.contains("plate--layered") && mobile && !plate.classList.contains("plate--layered-mobile");
    const own = flat ? DEPTH_PX.background : DEPTH_PX.island;
    layers.push({ element: plate, depth: own });
    if (flat) continue;
    const relative = (depth: number) => depth - own;
    for (const element of plate.querySelectorAll<HTMLElement>(":scope > .plate__picture--background, :scope > .ambient-night")) {
      layers.push({ element, depth: relative(DEPTH_PX.background) });
    }
    for (const element of plate.querySelectorAll<HTMLElement>(":scope > .ambient-clouds--far, :scope > .ambient-birds")) {
      layers.push({ element, depth: relative(DEPTH_PX.sky) });
    }
    for (const element of plate.querySelectorAll<HTMLElement>(":scope > .ambient-clouds--near")) {
      layers.push({ element, depth: relative(DEPTH_PX.near) });
    }
  }
  return layers;
}

export type SceneDepth = {
  /** Where to lean, -1..1 on each axis (0, 0 at rest). */
  aim: (x: number, y: number) => void;
  /** Back to rest and every inline shift removed. */
  dispose: () => void;
};

/**
 * Eases every on-screen island's layers toward the aimed shift on the shared
 * frame loop, and stops the loop once they arrive. Island 3 (the packs'
 * assembly) is left alone.
 */
export function createSceneDepth(): SceneDepth {
  const target = { x: 0, y: 0 };
  const current = { x: 0, y: 0 };
  const touched = new Set<HTMLElement>();
  let stop: (() => void) | null = null;
  // Layers per section, found once; a resize across the phone breakpoint changes which pictures show.
  let cache = new WeakMap<HTMLElement, Layer[]>();
  const media = window.matchMedia(MOBILE);
  const forget = () => {
    cache = new WeakMap();
  };
  media.addEventListener("change", forget);

  function sections() {
    return document.querySelectorAll<HTMLElement>("main section[data-island][data-ambient-live]:not([data-island='3'])");
  }

  function apply() {
    for (const section of sections()) {
      let layers = cache.get(section);
      if (!layers) cache.set(section, (layers = layersOf(section)));
      for (const { element, depth } of layers) {
        element.style.translate = `${(-current.x * depth).toFixed(2)}px ${(-current.y * depth * VERTICAL).toFixed(2)}px`;
        touched.add(element);
      }
      section.dataset.ambientDepth = "";
    }
  }

  function tick(_: number, delta: number) {
    current.x = approach(current.x, target.x, delta, HALF_LIFE);
    current.y = approach(current.y, target.y, delta, HALF_LIFE);
    const settled = Math.abs(current.x - target.x) < 0.002 && Math.abs(current.y - target.y) < 0.002;
    if (settled) {
      current.x = target.x;
      current.y = target.y;
    }
    apply();
    if (settled) {
      stop?.();
      stop = null;
    }
  }

  // A section scrolling into view takes the current shift at once, without waiting for the pointer.
  const watch = new MutationObserver(() => {
    if (!stop) apply();
  });
  watch.observe(document.querySelector("main") ?? document.body, { subtree: true, attributes: true, attributeFilter: ["data-ambient-live"] });

  return {
    aim(x, y) {
      target.x = x;
      target.y = y;
      if (!stop) stop = onFrame(tick);
    },
    dispose() {
      watch.disconnect();
      media.removeEventListener("change", forget);
      stop?.();
      stop = null;
      for (const element of touched) element.style.translate = "";
      touched.clear();
      for (const section of document.querySelectorAll<HTMLElement>("[data-ambient-depth]")) delete section.dataset.ambientDepth;
    },
  };
}
