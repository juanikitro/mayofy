export const INTRO_TIMING = { minimum: 250, play: 1700, safetyTimeout: 8000 } as const;

type IntroSignals = {
  reducedMotion: boolean;
  saveData: boolean;
  visible: boolean;
  hash: string;
  navigationType: string;
};

export function introAllowed(signals: IntroSignals): boolean {
  if (signals.reducedMotion || signals.saveData || !signals.visible) return false;
  if (signals.hash !== "" && signals.hash !== "#" && signals.hash !== "#inicio") return false;
  return signals.navigationType !== "back_forward";
}

type Timing = { minimum: number; play: number; safetyTimeout: number };

/** Runs before the first landing content is parsed. The inline copy has no module dependencies. */
export function runIntro(world: HTMLElement | null, allowed: typeof introAllowed, timing: Timing, clientEntry = false) {
  if (!world) return;
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  if (!allowed({
    reducedMotion: motion.matches || document.documentElement.dataset.motionTier === "reduced",
    saveData: Boolean(connection?.saveData),
    visible: document.visibilityState === "visible",
    hash: window.location.hash,
    navigationType: clientEntry ? "navigate" : navigation?.type ?? "navigate",
  })) {
    world.setAttribute("data-intro", "done");
    return;
  }

  const landing = world;
  const inputs = ["wheel", "touchstart", "pointerdown", "keydown", "pagehide"];
  let phase = "wait";
  let minimumElapsed = false;
  let artReady = false;
  let frame = 0;
  let holdTimer = 0;
  let endTimer = 0;
  const observer = new MutationObserver(findArt);
  const safetyTimer = window.setTimeout(finish, timing.safetyTimeout);

  function finish() {
    if (phase === "done") return;
    phase = "done";
    landing.setAttribute("data-intro", phase);
    observer.disconnect();
    window.cancelAnimationFrame(frame);
    window.clearTimeout(holdTimer);
    window.clearTimeout(endTimer);
    window.clearTimeout(safetyTimer);
    for (const event of inputs) window.removeEventListener(event, finish, true);
    window.removeEventListener("scroll", onScroll, true);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    motion.removeEventListener("change", finish);
  }

  function onScroll() {
    if (window.scrollY > 0) finish();
  }

  function onVisibilityChange() {
    if (document.visibilityState !== "visible") finish();
  }

  function playWhenReady() {
    if (phase !== "wait" || !minimumElapsed || !artReady) return;
    phase = "play";
    landing.setAttribute("data-intro", phase);
    window.clearTimeout(safetyTimer);
    endTimer = window.setTimeout(finish, timing.play);
  }

  function findArt() {
    // Buttons follow both pictures in the server HTML: do not start from a partially parsed hero.
    if (!landing.querySelector(".dawn__actions")) return;
    observer.disconnect();
    // The desktop-only cutout's mobile source is a hidden placeholder, not hero art.
    const images = Array.from(landing.querySelectorAll<HTMLImageElement>(".dawn .plate__picture img"))
      .filter((image) => image.parentElement && window.getComputedStyle(image.parentElement).display !== "none");
    if (images.length === 0) return finish();
    Promise.all(images.map((image) => image.decode())).then(() => {
      artReady = true;
      playWhenReady();
    }, finish);
  }

  landing.setAttribute("data-intro", phase);
  for (const event of inputs) window.addEventListener(event, finish, { capture: true, passive: true });
  window.addEventListener("scroll", onScroll, { capture: true, passive: true });
  document.addEventListener("visibilitychange", onVisibilityChange);
  motion.addEventListener("change", finish);
  observer.observe(landing, { childList: true, subtree: true });
  findArt();
  // Count from the first frame opportunity rather than navigation/network time.
  frame = window.requestAnimationFrame(() => {
    holdTimer = window.setTimeout(() => {
      minimumElapsed = true;
      playWhenReady();
    }, timing.minimum);
  });
  return finish;
}

export function introScript() {
  return `(${runIntro.toString()})(document.currentScript?.parentElement,${introAllowed.toString()},${JSON.stringify(INTRO_TIMING)});`;
}
