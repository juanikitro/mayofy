import { describe, expect, it } from "vitest";

import { approach, autoTiltAllowed, createTiltReader, detectAmbientTier, normalisedPointer, normalisedTilt, seeded, tiltOnScreen } from "@/lib/ambient";

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
  it("measures tilt from the pose the phone rests in", () => {
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

describe("autoTiltAllowed", () => {
  const phone = { tier: "full" as const, phone: true, hasOrientation: true };

  it("starts by itself on a phone with orientation events, whether or not the browser has requestPermission", () => {
    expect(autoTiltAllowed(phone)).toBe(true);
  });

  it("never starts with reduced motion or Save-Data, off phones or without the events", () => {
    expect(autoTiltAllowed({ ...phone, tier: "off" })).toBe(false);
    expect(autoTiltAllowed({ ...phone, tier: "lite" })).toBe(false);
    expect(autoTiltAllowed({ ...phone, phone: false })).toBe(false);
    expect(autoTiltAllowed({ ...phone, hasOrientation: false })).toBe(false);
  });
});

describe("createTiltReader", () => {
  const options = { range: 18, strength: 0.7, recentre: 4000, deadZone: 0.03, calibration: 5 };
  /** Feeds readings 16 ms apart and returns every aim the reader asked for. */
  function feed(readings: [number, number][], reader = createTiltReader(options), start = 0) {
    const aims: { x: number; y: number }[] = [];
    readings.forEach(([beta, gamma], index) => {
      const aim = reader.read(beta, gamma, 0, start + index * 16);
      if (aim) aims.push(aim);
    });
    return aims;
  }

  it("calibrates its rest pose on the first readings before moving anything", () => {
    const reader = createTiltReader(options);
    expect(feed([[40, 2], [41, 3], [39, 1], [40, 2]], reader)).toEqual([]);
    // The fifth reading closes the calibration at the average pose: no tilt yet.
    expect(feed([[40, 2]], reader, 64)).toEqual([]);
    const [aim] = feed([[49, 11]], reader, 80);
    expect(aim.x).toBeCloseTo(0.35, 2);
    expect(aim.y).toBeCloseTo(0.35, 2);
  });

  it("keeps a phone lying flat still: sensor noise never reaches the scene", () => {
    const noise: [number, number][] = Array.from({ length: 300 }, (_, index) => [Math.sin(index) * 0.6, Math.cos(index * 1.3) * 0.6]);
    expect(feed(noise)).toEqual([]);
  });

  it("caps the lean at the calm strength however far the phone turns", () => {
    const aims = feed([[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [60, -60]]);
    expect(aims.at(-1)).toEqual({ x: -0.7, y: 0.7 });
  });

  it("starts over, back at rest, when a reading jumps (the axes flip near upright or the phone is turned over)", () => {
    const reader = createTiltReader(options);
    feed([[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [10, 10]], reader);
    expect(reader.read(10, 170, 0, 200)).toEqual({ x: 0, y: 0 });
    // A new calibration follows: nothing moves until it is done.
    expect(reader.read(10, 170, 0, 216)).toBeNull();
  });

  it("ignores readings near upright, where gamma is unreliable", () => {
    expect(feed([[80, 0], [82, 20], [85, -30], [88, 40], [80, 0], [84, 25]])).toEqual([]);
  });

  it("recentres on a pose held for a while, so the reader can settle into any grip", () => {
    const reader = createTiltReader(options);
    feed([[30, 0], [30, 0], [30, 0], [30, 0], [30, 0]], reader);
    const lean = reader.read(39, 0, 0, 100);
    expect(lean?.y).toBeGreaterThan(0.3);
    let last = lean;
    for (let time = 116; time < 30000; time += 16) last = reader.read(39, 0, 0, time) ?? last;
    expect(Math.abs(last?.y ?? 1)).toBeLessThan(0.05);
  });
});
