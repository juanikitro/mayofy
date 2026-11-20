import type { CSSProperties } from "react";

import { IslandTitle } from "@/components/world/island-title";
import { MayoFigure } from "@/components/world/mayo-figure";
import { islandCopy } from "@/content/islands";
import { islandPlates, mayoAnchors } from "@/content/stage";
import { siteContent } from "@/content/site";

/**
 * "Seis pasos, sin sorpresas", option A (Juani, 20 November 2026): the path
 * of six stones. A pinned stage over ~3.4 screens of scroll: the six steps on
 * the left (on phones only the current one, under the island), island 5 on
 * the right with a number beside each stepping stone, and Mayo, who reaches
 * one stone per step and stands on it while that step opens. Everything
 * follows the scroll (`--sendero` in world.css) and rewinds with it; with
 * reduced motion, or without scroll-driven animations, all six steps are
 * open and Mayo stands on the last stone. The list stays a plain <ol> with
 * every step in the DOM: only the highlight changes.
 */
export function SixSteps() {
  const steps = siteContent.process;
  const details = islandCopy.process.details;
  const plate = islandPlates.works;
  const stones = mayoAnchors.works?.stops?.points.slice(1) ?? [];
  const stonesMobile = mayoAnchors.works?.stopsMobile?.points.slice(1) ?? stones;

  return (
    <div className="sendero">
      <div className="sendero__stage">
        <div className="sendero__copy">
          <h3 id="pasos-title" className="sendero__title">
            <IslandTitle segments={islandCopy.process.title} />
          </h3>
          <p className="sendero__lead">{islandCopy.process.body}</p>
          <ol className="sendero__steps" aria-labelledby="pasos-title">
            {steps.map((step, index) => (
              <li key={step} className="sendero__step" style={{ "--i": index } as CSSProperties}>
                <span className="sendero__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>{step}</strong>
                <p>{details[index]}</p>
              </li>
            ))}
          </ol>
          <div className="sendero__bar" aria-hidden="true">
            {steps.map((step, index) => (
              <i key={step} style={{ "--i": index } as CSSProperties} />
            ))}
          </div>
        </div>

        <div className="sendero__scene" aria-hidden="true">
          <div className="sendero__plate">
            <picture>
              {plate.mobileLayers ? <source media="(max-width: 48rem)" type="image/avif" srcSet={plate.mobileLayers.island.avif} /> : null}
              <source type="image/avif" srcSet={plate.layers.island.avif} />
              <img src={plate.layers.island.webp} alt="" width={plate.layers.island.width} height={plate.layers.island.height} loading="lazy" decoding="async" />
            </picture>
            {stones.map(([x, y], index) => (
              <span
                key={index}
                className="sendero__badge"
                style={
                  {
                    "--i": index,
                    "--x": `${x}%`,
                    "--y": `${y}%`,
                    "--x-m": `${stonesMobile[index][0]}%`,
                    "--y-m": `${stonesMobile[index][1]}%`,
                  } as CSSProperties
                }
              >
                {index + 1}
              </span>
            ))}
            <MayoFigure slot="works" className="sendero__mayo" />
          </div>
        </div>
      </div>
    </div>
  );
}
