import { Color } from "three";

import type { LightName } from "@/lib/mayo/moments";

/**
 * Light presets per island, ported from mayo-3d/preview/lighting.js (visual
 * bible §3). Directions are relative to the camera azimuth so the sun keeps
 * its screen side from any angle: offset 0 = from the camera, +90 = from
 * screen right, 180 = backlight. `el` is the elevation in degrees.
 */
export type LightSpec = { color: number | string; intensity: number; offset: number; el: number };

export type LightPreset = {
  exposure: number;
  env: number;
  key: LightSpec;
  fill: LightSpec;
  rim: LightSpec;
  hemi: { sky: number | string; ground: number | string; intensity: number };
  shadow: number;
};

export const LIGHT_PRESETS: Record<LightName, LightPreset> = {
  dawn: {
    exposure: 0.95, env: 0.16,
    key: { color: 0xffc29a, intensity: 2.6, offset: 70, el: 24 },
    fill: { color: 0xcdbcff, intensity: 0.7, offset: -60, el: 20 },
    rim: { color: 0xffd7b8, intensity: 2.2, offset: 160, el: 30 },
    hemi: { sky: 0xffdccc, ground: 0x8a7a6a, intensity: 0.32 },
    shadow: 0.2,
  },
  morning: {
    exposure: 0.9, env: 0.2,
    key: { color: 0xfff3e2, intensity: 2.7, offset: -35, el: 40 },
    fill: { color: 0xcfe3ff, intensity: 0.8, offset: 70, el: 18 },
    rim: { color: 0xe8f1ff, intensity: 1.9, offset: 165, el: 32 },
    hemi: { sky: 0xdcebff, ground: 0x9a8f78, intensity: 0.38 },
    shadow: 0.22,
  },
  noon: {
    exposure: 0.88, env: 0.22,
    key: { color: 0xffffff, intensity: 3.0, offset: -20, el: 76 },
    fill: { color: 0xd4e6ff, intensity: 0.7, offset: 80, el: 15 },
    rim: { color: 0xffffff, intensity: 1.6, offset: 170, el: 30 },
    hemi: { sky: 0xcde2ff, ground: 0xa49270, intensity: 0.42 },
    shadow: 0.26,
  },
  golden: {
    exposure: 0.92, env: 0.16,
    key: { color: 0xffb468, intensity: 2.6, offset: -75, el: 25 },
    fill: { color: 0xffe3bf, intensity: 0.5, offset: 60, el: 15 },
    rim: { color: 0xffbf73, intensity: 2.8, offset: 165, el: 22 },
    hemi: { sky: 0xffd8a2, ground: 0x6b5132, intensity: 0.32 },
    shadow: 0.22,
  },
  sunset: {
    exposure: 0.98, env: 0.14,
    key: { color: 0xff9c7c, intensity: 2.0, offset: 130, el: 22 },
    fill: { color: 0xb791ff, intensity: 0.9, offset: -20, el: 20 },
    rim: { color: 0xff9f7a, intensity: 2.8, offset: 175, el: 18 },
    hemi: { sky: 0xffa48f, ground: 0x5b4a7a, intensity: 0.45 },
    shadow: 0.18,
  },
  twilight: {
    exposure: 1.12, env: 0.12,
    key: { color: 0x8fa3ff, intensity: 1.2, offset: -30, el: 40 },
    fill: { color: 0x6f84d6, intensity: 0.5, offset: 70, el: 15 },
    rim: { color: 0x7dffd0, intensity: 2.0, offset: 150, el: 35 },
    hemi: { sky: 0x5463a6, ground: 0x1f2c3a, intensity: 0.5 },
    shadow: 0.2,
  },
  night: {
    exposure: 1.12, env: 0.1,
    key: { color: 0xffa65e, intensity: 2.3, offset: 70, el: 22 },
    fill: { color: 0x4c5c9e, intensity: 0.4, offset: -70, el: 25 },
    rim: { color: 0x8dffd8, intensity: 1.4, offset: 170, el: 30 },
    hemi: { sky: 0x2c3762, ground: 0x15151f, intensity: 0.38 },
    shadow: 0.22,
  },
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Blend two presets (t = 0..1); colors interpolate in linear RGB. */
export function blendPresets(a: LightPreset, b: LightPreset, t: number): LightPreset {
  if (t <= 0) return a;
  if (t >= 1) return b;
  const col = (x: number | string, y: number | string) =>
    "#" + new Color(x).lerp(new Color(y), t).getHexString();
  const light = (x: LightSpec, y: LightSpec): LightSpec => ({
    color: col(x.color, y.color),
    intensity: lerp(x.intensity, y.intensity, t),
    offset: lerp(x.offset, y.offset, t),
    el: lerp(x.el, y.el, t),
  });
  return {
    exposure: lerp(a.exposure, b.exposure, t),
    env: lerp(a.env, b.env, t),
    key: light(a.key, b.key),
    fill: light(a.fill, b.fill),
    rim: light(a.rim, b.rim),
    hemi: {
      sky: col(a.hemi.sky, b.hemi.sky),
      ground: col(a.hemi.ground, b.hemi.ground),
      intensity: lerp(a.hemi.intensity, b.hemi.intensity, t),
    },
    shadow: lerp(a.shadow, b.shadow, t),
  };
}
