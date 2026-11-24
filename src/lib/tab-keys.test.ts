import { describe, expect, it } from "vitest";

import { tabIndexForKey } from "@/lib/tab-keys";

describe("tabIndexForKey", () => {
  it("moves right and left to the neighbouring tab", () => {
    expect(tabIndexForKey("ArrowRight", 0, 3)).toBe(1);
    expect(tabIndexForKey("ArrowLeft", 2, 3)).toBe(1);
  });

  it("wraps around at both ends", () => {
    expect(tabIndexForKey("ArrowRight", 2, 3)).toBe(0);
    expect(tabIndexForKey("ArrowLeft", 0, 3)).toBe(2);
  });

  it("jumps to the first and last tab with Home and End", () => {
    expect(tabIndexForKey("Home", 2, 3)).toBe(0);
    expect(tabIndexForKey("End", 0, 3)).toBe(2);
  });

  it("ignores every other key", () => {
    expect(tabIndexForKey("ArrowDown", 1, 3)).toBeNull();
    expect(tabIndexForKey("Enter", 1, 3)).toBeNull();
    expect(tabIndexForKey("a", 1, 3)).toBeNull();
  });
});
