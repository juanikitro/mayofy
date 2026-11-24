/**
 * Gradient maps that relight the fall's dawn-painted puffs for each island's
 * hour (docs/plans/2026-11-24-ambiente.md): luminance in, the island's own
 * sky colours out, from shadow to sunlit rim. Referenced by world.css as
 * `filter: url(#amb-tint-<hour>)` on the cloud images, which do not move
 * themselves (their <picture> does), so each filter is painted once.
 */
const tints: Record<string, readonly string[]> = {
  // Luminance 0 → 1. The puffs live between ~0.55 (shadow) and 1 (sunlit), so most stops sit high.
  morning: ["#93a9c8", "#93a9c8", "#93a9c8", "#a3b8d4", "#b4c7e0", "#c7d7ec", "#d8e4f4", "#e8eff9", "#f4f7fc", "#fdfdfd", "#ffffff"],
  golden: ["#c98e74", "#c98e74", "#c98e74", "#d29c80", "#dcab8f", "#e6bb9f", "#efcbaf", "#f6dabf", "#fbe6cd", "#fff0db", "#fff7e8"],
  sunset: ["#9c6a9c", "#9c6a9c", "#9c6a9c", "#ad77a4", "#bf86aa", "#d197ae", "#e2a9b0", "#efbcb2", "#f8cfb6", "#fde0bf", "#fff0d2"],
  dusk: ["#2b3168", "#2b3168", "#2b3168", "#343a74", "#434780", "#58558b", "#716594", "#8d779c", "#ad8ba3", "#cda0a6", "#e8b6ab"],
  night: ["#0c1a3c", "#0c1a3c", "#0c1a3c", "#10224a", "#152b58", "#1c3768", "#264579", "#33578b", "#456d9e", "#5f8ab3", "#86b2cb"],
};

function channel(colors: readonly string[], offset: number) {
  return colors.map((hex) => (Number.parseInt(hex.slice(offset, offset + 2), 16) / 255).toFixed(3)).join(" ");
}

export function AmbientFilters() {
  return (
    <svg className="ambient-filters" width="0" height="0" aria-hidden="true" focusable="false">
      {Object.entries(tints).map(([hour, colors]) => (
        <filter key={hour} id={`amb-tint-${hour}`} colorInterpolationFilters="sRGB">
          {/* Luminance into every channel, alpha untouched. */}
          <feColorMatrix type="matrix" values="0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0" />
          <feComponentTransfer>
            <feFuncR type="table" tableValues={channel(colors, 1)} />
            <feFuncG type="table" tableValues={channel(colors, 3)} />
            <feFuncB type="table" tableValues={channel(colors, 5)} />
          </feComponentTransfer>
        </filter>
      ))}
    </svg>
  );
}
