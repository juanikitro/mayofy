import { afterEach, describe, expect, it, vi } from "vitest";

import { introAllowed, introScript } from "@/lib/intro";

const top = {
  reducedMotion: false, saveData: false, visible: true, hash: "", navigationType: "navigate",
};

describe("introAllowed", () => {
  it("plays on every entry or reload at the top", () => {
    expect(introAllowed(top)).toBe(true);
    expect(introAllowed({ ...top, hash: "#inicio" })).toBe(true);
    expect(introAllowed({ ...top, hash: "#" })).toBe(true);
    expect(introAllowed({ ...top, navigationType: "reload" })).toBe(true);
  });

  it("preserves motion, data, background-tab and scroll-restoration bypasses", () => {
    expect(introAllowed({ ...top, reducedMotion: true })).toBe(false);
    expect(introAllowed({ ...top, saveData: true })).toBe(false);
    expect(introAllowed({ ...top, visible: false })).toBe(false);
    expect(introAllowed({ ...top, hash: "#packs" })).toBe(false);
    expect(introAllowed({ ...top, navigationType: "back_forward" })).toBe(false);
  });
});

function openLanding({ hideCutout = false } = {}) {
  vi.useFakeTimers();
  const sky = new Map<string, string>();
  const plate = Promise.withResolvers<void>();
  const cutout = Promise.withResolvers<void>();
  let markupReady = false;
  let parsed = () => {};
  const landing = {
    setAttribute: (name: string, value: string) => sky.set(name, value),
    querySelector: () => markupReady ? {} : null,
    querySelectorAll: () => [
      { parentElement: { display: "block" }, decode: () => plate.promise },
      { parentElement: { display: hideCutout ? "none" : "block" }, decode: () => cutout.promise },
    ],
  };
  const browser = Object.assign(new EventTarget(), {
    matchMedia: () => Object.assign(new EventTarget(), { matches: false }),
    location: { hash: "" },
    getComputedStyle: (element: { display: string }) => element,
    setTimeout,
    clearTimeout,
    requestAnimationFrame: (callback: () => void) => setTimeout(callback, 0),
    cancelAnimationFrame: clearTimeout,
  });
  vi.stubGlobal("window", browser);
  vi.stubGlobal("document", Object.assign(new EventTarget(), {
    currentScript: { parentElement: landing }, documentElement: { dataset: {} }, visibilityState: "visible",
  }));
  vi.stubGlobal("navigator", {});
  vi.stubGlobal("MutationObserver", class {
    constructor(callback: () => void) { parsed = callback; }
    observe() {}
    disconnect() {}
  });
  new Function(introScript())();
  return {
    browser, plate, cutout,
    phase: () => sky.get("data-intro"),
    parseHero: () => { markupReady = true; parsed(); },
  };
}

describe("landing intro bootstrap", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("holds the night sky for 250 ms with cached art and keeps the light transition open for 1700 ms", async () => {
    const intro = openLanding();
    expect(intro.phase()).toBe("wait");
    intro.parseHero();
    intro.plate.resolve();
    intro.cutout.resolve();
    await vi.advanceTimersByTimeAsync(249);
    expect(intro.phase()).toBe("wait");
    await vi.advanceTimersByTimeAsync(1);
    expect(intro.phase()).toBe("play");
    await vi.advanceTimersByTimeAsync(1699);
    expect(intro.phase()).toBe("play");
    await vi.advanceTimersByTimeAsync(1);
    expect(intro.phase()).toBe("done");
  });

  it("starts as soon as the last hero picture decodes if loading takes longer than 250 ms", async () => {
    const intro = openLanding();
    intro.parseHero();
    intro.plate.resolve();
    await vi.advanceTimersByTimeAsync(400);
    expect(intro.phase()).toBe("wait");
    intro.cutout.resolve();
    await vi.advanceTimersByTimeAsync(0);
    expect(intro.phase()).toBe("play");
  });

  it("does not wait for the hidden desktop cutout on a narrow viewport", async () => {
    const intro = openLanding({ hideCutout: true });
    intro.parseHero();
    intro.plate.resolve();
    await vi.advanceTimersByTimeAsync(250);
    expect(intro.phase()).toBe("play");
  });

  it("reveals the landing on keyboard input without consuming it", async () => {
    const intro = openLanding();
    intro.parseHero();
    expect(intro.browser.dispatchEvent(new Event("keydown", { cancelable: true }))).toBe(true);
    expect(intro.phase()).toBe("done");
    intro.plate.resolve();
    intro.cutout.resolve();
    await vi.advanceTimersByTimeAsync(1000);
    expect(intro.phase()).toBe("done");
  });

  it("does not trap the user behind a broken or stalled hero image", async () => {
    const broken = openLanding();
    broken.parseHero();
    broken.cutout.reject(new Error("Missing image"));
    await vi.advanceTimersByTimeAsync(0);
    expect(broken.phase()).toBe("done");
    const stalled = openLanding();
    stalled.parseHero();
    await vi.advanceTimersByTimeAsync(8000);
    expect(stalled.phase()).toBe("done");
  });
});
