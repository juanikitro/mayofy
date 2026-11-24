import type { CSSProperties } from "react";

import { AmbientClouds } from "@/components/world/ambient-sky";
import { IslandTitle } from "@/components/world/island-title";
import { MayoFigure, stopsLegFrames } from "@/components/world/mayo-figure";
import { SenderoController } from "@/components/world/sendero-controller";
import { islandCopy } from "@/content/islands";
import { islandPlates, mayoSprites } from "@/content/stage";
import { siteContent } from "@/content/site";

/**
 * Where each stone's number sits, in % of the plate (desktop, mobile). Never
 * on a stone, so Mayo never stands on one (Juani, 20 November 2026: "mayo no
 * debe pisarlos"): beside its stone on the grass, on the side she does not
 * occupy while standing on any stone, read against her rest boxes on the
 * 1 % grid of the `-v2-isla` cutouts. They are drawn above her.
 */
const badges: readonly { desktop: readonly [number, number]; mobile: readonly [number, number] }[] = [
  { desktop: [61, 56.2], mobile: [71, 67] },
  { desktop: [60.6, 60], mobile: [66, 69.2] },
  { desktop: [52, 59.8], mobile: [39.6, 64.4] },
  { desktop: [39.8, 66.8], mobile: [31.5, 71.8] },
  { desktop: [43, 70.2], mobile: [35.5, 74.6] },
  { desktop: [57.2, 72.4], mobile: [63.6, 75.6] },
];

/**
 * "Seis pasos, sin sorpresas", option A (Juani, 20 November 2026): the path
 * of six stones. A pinned stage over ~3.4 screens of scroll: the six steps on
 * the left (on phones only the current one, under the island), island 5 on
 * the right with a number beside each stepping stone, and Mayo, who reaches
 * one stone per step and stands on it while that step opens. Everything
 * follows the scroll (`--sendero` in world.css) and rewinds with it; each
 * step is a button that scrolls to it, and a scroll that stops mid-leg is
 * finished (SenderoController). With reduced motion, or without scroll-driven
 * animations, all six steps are open and Mayo stands on the last stone. The
 * list stays a plain <ol> with every step in the DOM: only the highlight
 * changes.
 */
export function SixSteps() {
  const steps = siteContent.process;
  const details = islandCopy.process.details;
  const plate = islandPlates.works;

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
                <button type="button" className="sendero__go" data-step={index}>
                  <span className="sendero__number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{step}</strong>
                </button>
                <p>{details[index]}</p>
              </li>
            ))}
          </ol>
          <div className="sendero__bar" role="group" aria-label="Pasos">
            {steps.map((step, index) => (
              <button key={step} type="button" data-step={index} aria-label={`Paso ${index + 1}: ${step}`}>
                <i style={{ "--i": index } as CSSProperties} />
              </button>
            ))}
          </div>
        </div>

        <div className="sendero__scene" aria-hidden="true">
          <div className="sendero__plate">
            <AmbientClouds island="works" depth="far" />
            <picture>
              {plate.mobileLayers ? <source media="(max-width: 48rem)" type="image/avif" srcSet={plate.mobileLayers.island.avif} /> : null}
              {plate.mobileLayers ? <source media="(max-width: 48rem)" type="image/webp" srcSet={plate.mobileLayers.island.webp} /> : null}
              <source type="image/avif" srcSet={plate.layers.island.avif} />
              <img src={plate.layers.island.webp} alt="" width={plate.layers.island.width} height={plate.layers.island.height} loading="lazy" decoding="async" />
            </picture>
            <MayoFigure slot="works" className="sendero__mayo" />
            <AmbientClouds island="works" depth="near" />
            {badges.map(({ desktop, mobile }, index) => (
              <span
                key={index}
                className="sendero__badge"
                style={
                  {
                    "--i": index,
                    "--x": `${desktop[0]}%`,
                    "--y": `${desktop[1]}%`,
                    "--x-m": `${mobile[0]}%`,
                    "--y-m": `${mobile[1]}%`,
                  } as CSSProperties
                }
              >
                {index + 1}
              </span>
            ))}
          </div>
        </div>
      </div>
      <SenderoController legShare={mayoSprites.works?.legShare ?? 0.5} legFrames={stopsLegFrames("works")} />
    </div>
  );
}
