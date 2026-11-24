import { describe, expect, it } from "vitest";

import { approach, detectAmbientTier, normalisedPointer, normalisedTilt, seeded, tiltOnScreen } from "@/lib/ambient";

describe("detectAmbientTier", () => {
  it("turns everything off under reduced motion, whatever the device", () => {
    expect(detectAmbientTier({ reducedMotion: true, deviceMemory: 8, cores: 8 })).toBe("off");
    expect(detectAmbientTier({ reducedMotion: true, saveData: true })).toBe("off");
  });

  it("keeps only the compositor effects with Save-Data or on a low-end device", () => {
    expect(detectAmbientTier({ reducedMotion: false, saveData: true })).toBe("lite");
    expect(detectAmbientTier({ reducedMotion: false, deviceMemory: 2 })).toBe("lite");
    expect(detectAmbientTier({ reducedMotion: false, cores: 2 })).toBe("lite");
  });

  it("runs every effect otherwise, also when the browser hides its hints", () => {
    expect(detectAmbientTier({ reducedMotion: false, saveData: false, deviceMemory: 4, cores: 4 })).toBe("full");
    expect(detectAmbientTier({ reducedMotion: false })).toBe("full");
    expect(detectAmbientTier({ reducedMotion: false, saveData: null, deviceMemory: null, cores: null })).toBe("full");
  });
});

describe("approach", () => {
  it("covers half the distance after one half-life, at any frame rate", () => {
    expect(approach(0, 10, 120, 120)).toBeCloseTo(5);
    let value = 0;
    for (let i = 0; i < 8; i++) value = approach(value, 10, 15, 120);
    expect(value).toBeCloseTo(5);
  });

  it("stays put with no time elapsed", () => {
    expect(approach(3, 10, 0, 120)).toBe(3);
  });
});

describe("normalisedPointer", () => {
  it("maps the viewport to -1..1 with 0 at the centre", () => {
    expect(normalisedPointer(720, 450, 1440, 900)).toEqual({ x: 0, y: 0 });
    expect(normalisedPointer(0, 900, 1440, 900)).toEqual({ x: -1, y: 1 });
    expect(normalisedPointer(2000, -50, 1440, 900)).toEqual({ x: 1, y: -1 });
  });
});

describe("normalisedTilt", () => {
  it("measures tilt from the pose the phone had when depth was switched on", () => {
    const rest = { beta: 50, gamma: -5 };
    expect(normalisedTilt(50, -5, rest)).toEqual({ x: 0, y: 0 });
    expect(normalisedTilt(59, 4, rest)).toEqual({ x: 0.5, y: 0.5 });
  });

  it("clamps a strong tilt to the full depth", () => {
    expect(normalisedTilt(120, -90, { beta: 50, gamma: 0 })).toEqual({ x: -1, y: 1 });
  });
});

describe("seeded", () => {
  it("repeats the same sequence for the same seed", () => {
    const a = seeded(7);
    const b = seeded(7);
    const first = [a(), a(), a()];
    expect([b(), b(), b()]).toEqual(first);
    for (const value of first) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});

describe("tiltOnScreen", () => {
  it("keeps the device axes in portrait", () => {
    expect(tiltOnScreen(40, 10, 0)).toEqual({ beta: 40, gamma: 10 });
  });

  it("swaps them in landscape, so tilting toward the screen's right still reads as right", () => {
    // Turned counter-clockwise: raising the device's top drops the screen's right edge.
    expect(tiltOnScreen(40, 10, 90)).toEqual({ beta: 10, gamma: 40 });
    // Turned clockwise: the device's top is the screen's right edge.
    expect(tiltOnScreen(40, 10, 270)).toEqual({ beta: -10, gamma: -40 });
    expect(tiltOnScreen(40, 10, 180)).toEqual({ beta: -40, gamma: -10 });
  });
});
