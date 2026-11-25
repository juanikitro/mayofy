/*
 * Page intro "Amanecer" (docs/plans/2026-11-25-intro-amanecer.md): on the
 * first visit of the session the hero opens in the blue light before dawn
 * and warms into its painted dawn in about a second, while a bank of clouds
 * parts and the island rises a little. This module holds the decision
 * (pure, tested) and the runner the hero inlines as a script, so the intro
 * is decided while the HTML is parsed, before React hydrates.
 */

/** sessionStorage key: set as soon as the intro is chosen, so it never plays twice in a session. */
export const INTRO_KEY = "mayofy:intro-amanecer";

export const INTRO_TIMING = {
  /** ms after navigation start: hero art that arrives later skips the intro (a slow phone). */
  deadline: 1800,
  /** Longest wait in the pre-dawn pose for the rest of the art (desktop island cutout, curtain cloud). */
  hold: 140,
  /** The dawn itself (world.css, "Page intro"); hold + play stay within 1.2 s. */
  play: 900,
} as const;

export type IntroSignals = {
  /** `prefers-reduced-motion: reduce` or html[data-motion-tier="reduced"]. */
  reducedMotion: boolean;
  /** The browser's Save-Data hint. */
  saveData: boolean;
  /** The tab is on screen (not a background tab or a prerender). */
  visible: boolean;
  /** location.hash: a jump like /#packs lands below the hero. */
  hash: string;
  /**
   * PerformanceNavigationTiming.type: a reload or back/forward restores the scroll. The runner never
   * reads window.scrollY while the page is parsed: it forces a layout of the half-built page, and the
   * browser restores the scroll later anyway; a scroll after that skips the intro (see runIntro).
   */
  navigationType: string;
  /** The intro already ran (or was chosen) in this session. */
  seen: boolean;
};

/**
 * Whether the hero plays its dawn. Plain statements only: the runner
 * receives this function's source in the inline script.
 */
export function introAllowed(signals: IntroSignals): boolean {
  if (signals.reducedMotion || signals.saveData || !signals.visible || signals.seen) return false;
  if (signals.hash !== "" && signals.hash !== "#" && signals.hash !== "#inicio") return false;
  if (signals.navigationType === "reload" || signals.navigationType === "back_forward") return false;
  return true;
}

type Timing = { deadline: number; hold: number; play: number };

/**
 * Runs inside the hero while the page is parsed (`introScript`), so it may
 * use only its arguments and browser globals. It marks the hero section with
 * `data-intro`:
 *
 * - `wait`: the intro is on; the art is still coming. The page looks exactly
 *   like its final state (the copy simply stands, without its fade).
 * - `hold`: the first hero plate is decoded in time: the cool light appears
 *   over the scene (island low, clouds closed) and holds for `hold` ms
 *   after the hero art is decoded.
 * - `play`: the dawn runs (CSS animations, transform and opacity only).
 * - `done`: the final state, identical to a page without the intro.
 *
 * Late art skips the intro. Scroll, pointer and keyboard input end it
 * immediately without consuming the event. Without JavaScript none
 * of this exists and the page shows its final state.
 */
export function runIntro(section: HTMLElement | null, allowed: (signals: IntroSignals) => boolean, key: string, timing: Timing) {
  if (!section) return;
  const root = document.documentElement;
  let seen = false;
  try {
    seen = window.sessionStorage.getItem(key) === "1";
  } catch {
    // No storage (privacy mode, blocked): once per page load.
  }
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const navigation = performance.getEntriesByType ? (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined) : undefined;
  const on = allowed({
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches || root.dataset.motionTier === "reduced",
    saveData: Boolean(connection && connection.saveData),
    visible: document.visibilityState === "visible",
    hash: window.location.hash,
    navigationType: navigation ? navigation.type : "navigate",
    seen,
  });
  if (!on) return;
  try {
    window.sessionStorage.setItem(key, "1");
  } catch {
    // Ignored, see above.
  }

  const plates = Array.from(section.querySelectorAll<HTMLImageElement>(".scene .plate__picture img"));
  const clouds = Array.from(section.querySelectorAll<HTMLImageElement>(".intro-curtain img"));
  // Loaded is not enough: an image paints once it is decoded, and the pre-dawn light over a sky
  // still waiting for its art would be a blue flash. Each image counts once `decode()` settles.
  const decoded = new Set<HTMLImageElement>();
  const decoding = new Set<HTMLImageElement>();
  const ready = (img: HTMLImageElement) => decoded.has(img);
  // The hero's phone cutout is a blank pixel (island-plate.tsx): it never starts the dawn.
  const art = (img: HTMLImageElement) => decoded.has(img) && !img.currentSrc.startsWith("data:");
  const inputs = ["wheel", "touchstart", "pointerdown", "keydown"];
  let state = "wait";
  let holdTimer = 0;
  let endTimer = 0;

  function set(next: string) {
    state = next;
    section!.setAttribute("data-intro", next);
  }
  function finish() {
    if (state === "done") return;
    window.clearTimeout(holdTimer);
    window.clearTimeout(endTimer);
    window.clearTimeout(deadlineTimer);
    for (const type of inputs) window.removeEventListener(type, finish, true);
    window.removeEventListener("scroll", onScroll, true);
    for (const img of plates.concat(clouds)) {
      img.removeEventListener("load", check);
      img.removeEventListener("error", skip);
    }
    section!.removeEventListener("animationend", onEnd);
    section!.removeAttribute("data-intro-curtain");
    set("done");
  }
  function skip() {
    if (state === "wait") finish();
  }
  // Phones fire `scroll` at offset 0 while the page settles: only a real offset counts.
  function onScroll() {
    if (window.scrollY > 0) finish();
  }
  function play() {
    if (state !== "hold") return;
    window.clearTimeout(holdTimer);
    // A cloud that is still loading stays out: popping in while the bank parts would read as a glitch.
    if (!clouds.some(ready)) section!.removeAttribute("data-intro-curtain");
    set("play");
    endTimer = window.setTimeout(finish, timing.play + 400);
  }
  function check() {
    for (const img of plates.concat(clouds)) {
      if (decoding.has(img) || !img.complete || img.naturalWidth === 0) continue;
      decoding.add(img);
      const settle = () => {
        decoded.add(img);
        update();
      };
      img.decode().then(settle, () => {});
    }
  }
  function update() {
    if (state === "wait") {
      if (!plates.some(art)) return;
      if (performance.now() > timing.deadline || document.visibilityState !== "visible") return finish();
      set("hold");
      holdTimer = window.setTimeout(play, timing.hold);
    }
    if (state !== "hold") return;
    // Every cloud is the same file: one decoded copy covers them all (the desktop-only one never
    // loads on a phone, where it is not shown).
    if (clouds.some(ready)) section!.setAttribute("data-intro-curtain", "");
  }
  function onEnd(event: AnimationEvent) {
    if (event.animationName === "intro-rise") finish();
  }

  set("wait");
  const deadlineTimer = window.setTimeout(skip, Math.max(0, timing.deadline - performance.now()));
  for (const type of inputs) window.addEventListener(type, finish, { capture: true, passive: true });
  window.addEventListener("scroll", onScroll, { capture: true, passive: true });
  for (const img of plates.concat(clouds)) {
    img.addEventListener("load", check);
    // A broken file skips the intro before it starts; later, a missing cloud just leaves the bank out.
    img.addEventListener("error", skip);
  }
  section.addEventListener("animationend", onEnd);
  check();
}

/** The inline script: the runner and the decision, with the hero section it sits in. */
export function introScript() {
  return `(${runIntro.toString()})(document.currentScript&&document.currentScript.closest("section"),${introAllowed.toString()},${JSON.stringify(INTRO_KEY)},${JSON.stringify(INTRO_TIMING)});`;
}
