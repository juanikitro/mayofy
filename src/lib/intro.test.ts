import { describe, expect, it, vi } from "vitest";

import { INTRO_KEY, INTRO_TIMING, type IntroSignals, introAllowed, introScript, runIntro } from "@/lib/intro";

const firstVisit: IntroSignals = {
  reducedMotion: false,
  saveData: false,
  visible: true,
  hash: "",
  navigationType: "navigate",
  seen: false,
};

describe("introAllowed", () => {
  it("plays on the first visit of the session, at the top of the page", () => {
    expect(introAllowed(firstVisit)).toBe(true);
    expect(introAllowed({ ...firstVisit, hash: "#inicio" })).toBe(true);
    expect(introAllowed({ ...firstVisit, hash: "#" })).toBe(true);
  });

  it("never plays twice in a session", () => {
    expect(introAllowed({ ...firstVisit, seen: true })).toBe(false);
  });

  it("stays off with reduced motion and with Save-Data", () => {
    expect(introAllowed({ ...firstVisit, reducedMotion: true })).toBe(false);
    expect(introAllowed({ ...firstVisit, saveData: true })).toBe(false);
  });

  it("skips pages that open below the hero", () => {
    expect(introAllowed({ ...firstVisit, hash: "#packs" })).toBe(false);
    expect(introAllowed({ ...firstVisit, navigationType: "reload" })).toBe(false);
    expect(introAllowed({ ...firstVisit, navigationType: "back_forward" })).toBe(false);
  });

  it("skips a tab opened in the background", () => {
    expect(introAllowed({ ...firstVisit, visible: false })).toBe(false);
  });
});

describe("introScript", () => {
  it("is standalone JavaScript: the runner and the decision travel as source", () => {
    const script = introScript();
    expect(() => new Function(script)).not.toThrow();
    expect(script).toContain('"mayofy:intro-amanecer"');
  });

  it("keeps the pre-dawn hold and the dawn within 1.2 s", () => {
    expect(INTRO_TIMING.hold + INTRO_TIMING.play).toBeLessThanOrEqual(1200);
  });
});

describe("runIntro", () => {
  it("ends the visible entrance immediately on keyboard input without consuming it", async () => {
    vi.useFakeTimers();
    try {
      const browser = Object.assign(new EventTarget(), {
        sessionStorage: { getItem: () => null, setItem: () => {} },
        matchMedia: () => ({ matches: false }),
        location: { hash: "" },
        setTimeout,
        clearTimeout,
      });
      vi.stubGlobal("window", browser);
      vi.stubGlobal("document", { documentElement: { dataset: {} }, visibilityState: "visible" });
      vi.stubGlobal("navigator", {});
      const image = Object.assign(new EventTarget(), {
        complete: true, naturalWidth: 600, currentSrc: "/hero.avif", decode: async () => {},
      });
      const attributes = new Map<string, string>();
      const section = Object.assign(new EventTarget(), {
        querySelectorAll: (selector: string) => selector.startsWith(".scene") ? [image] : [],
        setAttribute: (name: string, value: string) => attributes.set(name, value),
        removeAttribute: (name: string) => attributes.delete(name),
      });
      runIntro(section as unknown as HTMLElement, introAllowed, INTRO_KEY, INTRO_TIMING);
      await vi.advanceTimersByTimeAsync(INTRO_TIMING.hold);
      expect(attributes.get("data-intro")).toBe("play");
      expect(browser.dispatchEvent(new Event("keydown", { cancelable: true }))).toBe(true);
      expect(attributes.get("data-intro")).toBe("done");
    } finally {
      vi.unstubAllGlobals();
      vi.useRealTimers();
    }
  });
});
