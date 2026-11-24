import { describe, expect, it } from "vitest";

import { seeded } from "@/lib/ambient";
import { createFlock, flockPoses, stepFlock } from "@/lib/bird-flock";

const options = { band: [14, 30] as const, aspect: 941 / 1672, span: 0.007 };

function fly(seed: number, seconds = 1 / 60) {
  const flock = createFlock(seeded(seed), options);
  const frames: ReturnType<typeof flockPoses>[] = [flockPoses(flock)];
  while (stepFlock(flock, seconds)) frames.push(flockPoses(flock));
  return { flock, frames };
}

describe("bird flock", () => {
  it("is a small flock of 4 to 8 birds", () => {
    for (let seed = 1; seed < 40; seed++) {
      const count = createFlock(seeded(seed), options).birds.length;
      expect(count).toBeGreaterThanOrEqual(4);
      expect(count).toBeLessThanOrEqual(8);
    }
  });

  it("crosses the plate from off one side to off the other, then reports it has left", () => {
    for (const seed of [3, 4, 5, 6]) {
      const { flock, frames } = fly(seed);
      const leaderXs = frames.map((poses) => poses[0].x);
      const first = leaderXs[0];
      const last = leaderXs[leaderXs.length - 1];
      if (flock.heading > 0) {
        expect(first).toBeLessThan(0);
        expect(last).toBeGreaterThan(1);
      } else {
        expect(first).toBeGreaterThan(1);
        expect(last).toBeLessThan(0);
      }
      // 12 to 18 s at 60 fps.
      expect(frames.length).toBeGreaterThan(12 * 60 - 2);
      expect(frames.length).toBeLessThan(18 * 60 + 2);
    }
  });

  it("starts inside the island's open-sky band", () => {
    for (let seed = 1; seed < 30; seed++) {
      const { y } = flockPoses(createFlock(seeded(seed), options))[0];
      expect(y).toBeGreaterThanOrEqual(0.14 - 0.03);
      expect(y).toBeLessThanOrEqual(0.3 + 0.03);
    }
  });

  it("keeps every bird at least a wingspan from its neighbours", () => {
    const { flock, frames } = fly(11);
    const spanX = flock.span;
    const spanY = flock.span / flock.aspect;
    for (const poses of frames) {
      for (let i = 0; i < poses.length; i++) {
        for (let j = i + 1; j < poses.length; j++) {
          const gap = Math.hypot((poses[i].x - poses[j].x) / spanX, ((poses[i].y - poses[j].y) / spanY) / 0.55);
          expect(gap).toBeGreaterThan(1);
        }
      }
    }
  });

  it("alternates flapping and gliding", () => {
    const { frames } = fly(8);
    const efforts = frames.flatMap((poses) => poses.map((pose) => pose.effort));
    expect(Math.min(...efforts)).toBeLessThan(0.2);
    expect(Math.max(...efforts)).toBeGreaterThan(0.9);
  });

  it("flies the same way for the same seed", () => {
    expect(fly(21).frames.at(-1)).toEqual(fly(21).frames.at(-1));
  });
});
