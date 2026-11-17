/* eslint-disable @next/next/no-img-element -- already-optimised AVIF cutouts; next/image would re-encode them */
import { Fragment, type CSSProperties } from "react";

import { IslandPlate } from "@/components/world/island-plate";
import { MayoFigure } from "@/components/world/mayo-figure";
import { IslandTitle } from "@/components/world/island-title";
import { commercialPlans } from "@/content/commercial-plans";
import { islandCopy } from "@/content/islands";
import {
  islandPlates,
  PLATFORM_CANVAS,
  platforms,
  type PlatformPiece,
  type PlatformShadow,
} from "@/content/stage";

type RockKind = PlatformPiece["kind"];

type ScatterStyle = { "--sx": string; "--sy": string; "--sr": string };

/**
 * Scatter offsets per rock (where it floats before the scroll assembles it).
 * The assembled state is the default layout, so every fallback tier shows
 * the platforms already built without extra CSS.
 */
const scatter: Record<RockKind, ScatterStyle> = {
  base: { "--sx": "-26vw", "--sy": "-34vh", "--sr": "-28deg" },
  left: { "--sx": "-34vw", "--sy": "10vh", "--sr": "48deg" },
  right: { "--sx": "30vw", "--sy": "-18vh", "--sr": "-54deg" },
  top: { "--sx": "18vw", "--sy": "-46vh", "--sr": "76deg" },
};

const pct = (value: number) => `${(value / PLATFORM_CANVAS) * 100}%`;

function Rock({ piece }: { piece: PlatformPiece }) {
  return (
    <img
      className={`rock rock--${piece.kind}`}
      src={piece.src}
      alt=""
      width={piece.width}
      height={piece.height}
      loading="lazy"
      decoding="async"
      style={{ ...scatter[piece.kind], left: pct(piece.x), top: pct(piece.y), width: pct(piece.w) } as CSSProperties}
    />
  );
}

function Shadow({ shadow }: { shadow: PlatformShadow }) {
  return (
    <img
      className="rock-shadow"
      src={shadow.src}
      alt=""
      width={shadow.w}
      height={shadow.h}
      loading="lazy"
      decoding="async"
      style={{ left: pct(shadow.x), top: pct(shadow.y), width: pct(shadow.w) } as CSSProperties}
    />
  );
}

export function RockIsland() {
  return (
    <section id="packs" className="rocks" data-island="3" aria-labelledby="packs-title">
      <div className="rocks__stage">
        <div className="scene scene--noon scene--plated" aria-hidden="true">
          <div className="scene__sky" />
          <IslandPlate plate={islandPlates.packs}>
            <MayoFigure slot="packs" className="rocks__mayo" />
          </IslandPlate>
        </div>

        <header className="rocks__intro">
          <h2 id="packs-title">
            <IslandTitle segments={islandCopy.packs.title} />
          </h2>
          <p>{islandCopy.packs.body}</p>
        </header>

        <div className="platforms">
          {commercialPlans.map((plan, index) => (
            <div className={`platform platform--${index + 1}`} key={plan.id}>
              <div className="platform__rocks" aria-hidden="true">
                {/* Manifest rule: each contact shadow sits under its emitter and over the receivers. */}
                {platforms[index].pieces.map((piece) => (
                  <Fragment key={piece.kind}>
                    {platforms[index].shadows
                      .filter((shadow) => shadow.under === piece.kind)
                      .map((shadow) => (
                        <Shadow key={shadow.src} shadow={shadow} />
                      ))}
                    <Rock piece={piece} />
                  </Fragment>
                ))}
              </div>
              <a className="platform__card" href={`#pack-${plan.id}`}>
                <span className="platform__name">{plan.name}</span>
                <span className="platform__from">Desde</span>
                <span className="platform__price">{plan.price}</span>
                <span className="platform__timeline">{plan.timeline}</span>
                <span className="platform__link">Ver qué incluye</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
