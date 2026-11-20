import type { CSSProperties } from "react";

/** The item's place in a staggered group, read by the CSS as `--i`. */
export function staggerStyle(index: number): CSSProperties {
  return { "--i": index } as CSSProperties;
}
