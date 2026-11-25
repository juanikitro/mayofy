"use client";

import { useId, type CSSProperties, type MouseEvent } from "react";

export type PlatformMarker = { id: string; name: string; price: string; style: CSSProperties };

/** How long the destination card keeps its ring after a marker is followed (ms). */
const TARGET_RING_MS = 1400;

const prefersReducedMotion = () =>
  document.documentElement.dataset.motionTier === "reduced" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Composites the wood and lettering in a single graphic, using the same copy as the link. */
function PlankArt({ name, price, compact }: { name: string; price: string; compact?: boolean }) {
  const lettering = `#${useId()}`;
  const letteringId = lettering.slice(1);
  const longName = name.length > 13;
  const width = compact ? 104 : longName ? 238 : 176;
  const height = compact ? 52 : 55;
  return (
    <svg
      className={`platform__marker-plank platform__marker-plank--${compact ? "compact" : "wide"}`}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
    >
      <image href="/images/pack-sign-rendered-plank.webp" width={width} height={height} preserveAspectRatio="none" />
      <defs>
        {compact ? (
          <text id={letteringId} x={width / 2} y="25" textAnchor="middle" fontSize="13">
            <tspan x={width / 2} textLength={longName ? 87 : undefined} lengthAdjust="spacingAndGlyphs">
              {name}
            </tspan>
            <tspan x={width / 2} dy="14">{price}</tspan>
          </text>
        ) : (
          <text id={letteringId} x={width / 2} y="37" textAnchor="middle" fontSize="18">
            {name}{"\u2002"}{price}
          </text>
        )}
      </defs>
      {/* The engraved edges are SVG paint, so they rotate with the grain and glyphs. */}
      <use href={lettering} y={0.8} fill="rgb(255 225 179 / 75%)" />
      <use href={lettering} y={-0.55} fill="rgb(51 23 8 / 62%)" />
      <use href={lettering} fill="rgb(65 33 13 / 90%)" />
    </svg>
  );
}

/** Pack sign links keep their accessible name, independent of the decorative artwork. */
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
        <div className="platform__marker-flight" key={marker.id} style={marker.style}>
          <a
            className={`platform__marker platform__marker--${index + 1}`}
            href={`#pack-${marker.id}`}
            aria-label={`${marker.name} ${marker.price}, ver qué incluye`}
            onClick={(event) => follow(event, marker.id)}
          >
            <PlankArt name={marker.name} price={marker.price} />
            <PlankArt name={marker.name} price={marker.price} compact />
          </a>
        </div>
      ))}
    </div>
  );
}
