"use client";

import type { CSSProperties, MouseEvent } from "react";

export type PlatformMarker = { id: string; name: string; price: string; style: CSSProperties };

/** How long the destination card keeps its ring after a marker is followed (ms). */
const TARGET_RING_MS = 1400;

const prefersReducedMotion = () =>
  document.documentElement.dataset.motionTier === "reduced" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * One-line markers on island 3's platforms (Juani, 20 November 2026, option A:
 * "los marcadores de una linea derivan alli"): each names its pack and price
 * and leads to the full pack card below (`#pack-<id>`). Following one scrolls
 * smoothly to the card (instantly under reduced motion), moves focus to it so
 * the next Tab continues inside it, and rings it for a moment. Without
 * JavaScript the plain anchor still lands on the card.
 */
export function PlatformMarkers({ markers }: { markers: readonly PlatformMarker[] }) {
  function follow(event: MouseEvent<HTMLAnchorElement>, id: string) {
    const card = document.getElementById(`pack-${id}`);
    if (!card || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    card.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    // Keep the router's state on the entry, or Back after a case study would be ignored (HashLinkHistory).
    window.history.pushState(window.history.state, "", `#pack-${id}`);
    card.setAttribute("tabindex", "-1");
    card.focus({ preventScroll: true });
    card.classList.remove("is-target");
    // Restart the ring if the same marker is followed twice in a row.
    void card.offsetWidth;
    card.classList.add("is-target");
    window.setTimeout(() => card.classList.remove("is-target"), TARGET_RING_MS);
  }

  return (
    <div className="platforms">
      {markers.map((marker, index) => (
        <a
          className={`platform__marker platform__marker--${index + 1}`}
          href={`#pack-${marker.id}`}
          style={marker.style}
          key={marker.id}
          onClick={(event) => follow(event, marker.id)}
        >
          {/* Spaces between the parts keep the accessible name "Landing USD 85, ver qué incluye"; the flex gap does the visual spacing. */}
          <span className="platform__marker-dot" aria-hidden="true" />
          <span className="platform__marker-name">{marker.name}</span>{" "}
          <span className="platform__marker-price">{marker.price}</span>{" "}
          <span className="platform__marker-arrow" aria-hidden="true">
            ↓
          </span>
          <span className="platform__marker-hint">, ver qué incluye</span>
        </a>
      ))}
    </div>
  );
}
