/**
 * The tab a key moves to in a horizontal tab list (ARIA tabs pattern):
 * Left/Right step to the neighbour and wrap around, Home/End jump to the ends.
 * Any other key returns null and is left to the browser.
 */
export function tabIndexForKey(key: string, open: number, count: number): number | null {
  switch (key) {
    case "ArrowRight":
      return (open + 1) % count;
    case "ArrowLeft":
      return (open - 1 + count) % count;
    case "Home":
      return 0;
    case "End":
      return count - 1;
    default:
      return null;
  }
}
