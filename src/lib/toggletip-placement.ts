/**
 * Where a toggletip's panel opens (Toggletip, src/components/world/toggletip.tsx).
 * Coordinates are the viewport's, as getBoundingClientRect gives them.
 *
 * - `press` (a click, tap or key): above the (?) mark; when the panel does
 *   not fit between the ceiling (under the fixed header) and the mark,
 *   `scrollBy` is the page offset that brings the mark down just enough
 *   (Juani, 24 November 2026: "debe aparecer arriba del (?) o en un lugar
 *   donde el usuario lo vea").
 * - `hover`: never moves the page under the pointer: above when it fits, else
 *   below when it fits above the screen's bottom edge, else above anyway.
 * - `top` / `bottom`: following the mark while the page or the carousel
 *   scrolls, on the side it opened on, without moving the page.
 *
 * Sideways the panel is centred on the mark and kept `edge` px inside the
 * screen; `notch` is where the mark falls along the panel.
 */
export type ToggletipPlacement = {
  side: "top" | "bottom";
  top: number;
  left: number;
  notch: number;
  scrollBy: number;
};

export function placeToggletip({
  mark,
  panel,
  viewport,
  ceiling,
  gap,
  edge,
  mode,
}: {
  mark: { top: number; bottom: number; centre: number };
  panel: { width: number; height: number };
  viewport: { width: number; height: number };
  ceiling: number;
  gap: number;
  edge: number;
  mode: "press" | "hover" | "top" | "bottom";
}): ToggletipPlacement {
  const left = Math.max(edge, Math.min(mark.centre - panel.width / 2, viewport.width - edge - panel.width));
  const notch = mark.centre - left;
  const above = mark.top - gap - panel.height;
  const below = mark.bottom + gap;
  const at = (side: "top" | "bottom", top: number, scrollBy = 0) => ({ side, top, left, notch, scrollBy });
  if (mode === "top") return at("top", above);
  if (mode === "bottom") return at("bottom", below);
  if (above >= ceiling) return at("top", above);
  if (mode === "press") return at("top", ceiling, above - ceiling);
  if (below + panel.height <= viewport.height - gap) return at("bottom", below);
  return at("top", above);
}
