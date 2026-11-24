import { describe, expect, it } from "vitest";

import { placeToggletip } from "@/lib/toggletip-placement";

const viewport = { width: 1440, height: 900 };
const panel = { width: 352, height: 160 };
const base = { panel, viewport, ceiling: 80, gap: 12, edge: 16 };
const nearHeader = { top: 150, bottom: 174, centre: 700 };

describe("placeToggletip", () => {
  it("opens above the mark, centred on it, when there is room under the header", () => {
    const place = placeToggletip({ ...base, mark: { top: 500, bottom: 524, centre: 700 }, mode: "press" });
    expect(place).toEqual({ side: "top", top: 500 - 12 - 160, left: 700 - 176, notch: 176, scrollBy: 0 });
  });

  it("opened by a press, moves the page just enough to open above when the header leaves no room", () => {
    // Above would start at 150 - 12 - 160 = -22, 102px over the ceiling: the page moves up 102px.
    const place = placeToggletip({ ...base, mark: nearHeader, mode: "press" });
    expect(place).toMatchObject({ side: "top", top: 80, scrollBy: -102 });
  });

  it("opened by hover, never moves the page: below when only below fits", () => {
    const place = placeToggletip({ ...base, mark: nearHeader, mode: "hover" });
    expect(place).toMatchObject({ side: "bottom", top: 174 + 12, scrollBy: 0 });
  });

  it("opened by hover with no room on either side, stays above without moving the page", () => {
    const place = placeToggletip({ ...base, viewport: { width: 390, height: 300 }, mark: { top: 150, bottom: 174, centre: 195 }, mode: "hover" });
    expect(place).toMatchObject({ side: "top", top: -22, scrollBy: 0 });
  });

  it("follows the mark on the side it opened on, without moving the page", () => {
    const below = placeToggletip({ ...base, mark: { top: 500, bottom: 524, centre: 700 }, mode: "bottom" });
    expect(below).toMatchObject({ side: "bottom", top: 536, scrollBy: 0 });
    const above = placeToggletip({ ...base, mark: nearHeader, mode: "top" });
    expect(above).toMatchObject({ side: "top", top: -22, scrollBy: 0 });
  });

  it("keeps the panel inside the screen's side edges and points the notch at the mark", () => {
    const nearLeft = placeToggletip({ ...base, mark: { top: 500, bottom: 524, centre: 40 }, mode: "press" });
    expect(nearLeft).toMatchObject({ left: 16, notch: 24 });
    const nearRight = placeToggletip({ ...base, mark: { top: 500, bottom: 524, centre: 1430 }, mode: "press" });
    expect(nearRight).toMatchObject({ left: 1440 - 16 - 352, notch: 1430 - (1440 - 16 - 352) });
  });
});
