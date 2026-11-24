import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type AmbientModule = typeof import("@/lib/ambient");

/** A display refreshing at 60 Hz on fake timers, counting how often the page is woken. */
let wakes = 0;

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "performance"] });
  wakes = 0;
  vi.stubGlobal("window", globalThis);
  vi.stubGlobal("document", { hidden: false, addEventListener: () => {} });
  vi.stubGlobal("requestAnimationFrame", (callback: (time: number) => void) => {
    wakes++;
    return setTimeout(() => callback(performance.now()), 16) as unknown as number;
  });
  vi.stubGlobal("cancelAnimationFrame", (id: number) => clearTimeout(id));
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

async function loadLoop(): Promise<AmbientModule> {
  vi.resetModules();
  return import("@/lib/ambient");
}

describe("onFrame", () => {
  it("runs a full-rate callback on every display frame", async () => {
    const { onFrame } = await loadLoop();
    const calls: number[] = [];
    const stop = onFrame((_, delta) => calls.push(delta));
    vi.advanceTimersByTime(1000);
    stop();
    expect(calls.length).toBeGreaterThanOrEqual(58);
    expect(calls.length).toBeLessThanOrEqual(63);
  });

  it("runs a 20 fps callback 20 times a second and lets the page sleep in between", async () => {
    const { onFrame } = await loadLoop();
    let calls = 0;
    const stop = onFrame(() => calls++, { fps: 20 });
    vi.advanceTimersByTime(1000);
    stop();
    expect(calls).toBeGreaterThanOrEqual(18);
    expect(calls).toBeLessThanOrEqual(21);
    // One wake per drawn frame, not one per display refresh.
    expect(wakes).toBeLessThanOrEqual(22);
  });

  it("wakes on every frame again while a full-rate callback joins, and stops when nothing is left", async () => {
    const { onFrame } = await loadLoop();
    const slow = onFrame(() => {}, { fps: 20 });
    const fast = onFrame(() => {});
    vi.advanceTimersByTime(500);
    expect(wakes).toBeGreaterThanOrEqual(29);
    fast();
    slow();
    const before = wakes;
    vi.advanceTimersByTime(500);
    expect(wakes - before).toBeLessThanOrEqual(1);
  });
});
