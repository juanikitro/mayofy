import type { CSSProperties } from "react";

import { AnimatedDetails } from "@/components/animated-details";
import { plateSceneStyle } from "@/components/world/island-plate";
import { IslandScene } from "@/components/world/island-scene";
import { IslandTitle } from "@/components/world/island-title";
import { MayoFigure } from "@/components/world/mayo-figure";
import { comingSoon, commercialPlans, extensions } from "@/content/commercial-plans";
import { islandCopy } from "@/content/islands";
import { islandPlates } from "@/content/stage";
import { workshopParts, workshopSpots } from "@/content/workshop";
import { getWhatsAppHref } from "@/lib/whatsapp";

const customPlan = commercialPlans.find((plan) => plan.id === "sistema");

const spotStyle = (point: readonly [number, number], mobile: readonly [number, number]) =>
  ({ "--x-d": `${point[0]}%`, "--y-d": `${point[1]}%`, "--x-m": `${mobile[0]}%`, "--y-m": `${mobile[1]}%` }) as CSSProperties;

/**
 * Island 4: the workshop, golden afternoon (Juani, 20 November 2026: option
 * B of docs/plans/2026-11-20-propuestas.md, "que el scroll vaya explicando y
 * animando los items"). The island is pinned for the whole section while the
 * four parts of the offer scroll past it; each part lights its painted
 * object (greenhouse, pot, toolbox, gear) and its pin while it is in the
 * reading zone, scrubbed by the scroll and reversible. With reduced motion
 * or without scroll-driven animations every part and pin stands still and
 * readable.
 */
export function SystemsIsland() {
  return (
    <section id="sistemas" className="isle isle--golden workshop" data-island="4" style={plateSceneStyle(islandPlates.systems)} aria-labelledby="sistemas-title">
      <div className="workshop__stage">
        <IslandScene variant="golden" plate={islandPlates.systems}>
          {workshopParts.map((part) => (
            <span className={`workshop__halo workshop__halo--${part.object}`} key={part.object} style={spotStyle(workshopSpots[part.object].d, workshopSpots[part.object].m)} />
          ))}
          <MayoFigure slot="systems" className="isle__mayo isle__mayo--dig" />
          {workshopParts.map((part) => (
            <span className={`workshop__pin workshop__pin--${part.object}`} key={part.object} style={spotStyle(workshopSpots[part.object].pinD, workshopSpots[part.object].pinM)}>
              {part.pin}
            </span>
          ))}
        </IslandScene>
      </div>

      <div className="world-shell workshop__content">
        <header className="workshop__intro">
          <h2 id="sistemas-title">
            <IslandTitle segments={islandCopy.systems.title} />
          </h2>
          <p className="isle__body">{islandCopy.systems.body}</p>
        </header>

        <ol className="workshop__parts">
          {workshopParts.map((part, index) => (
            <li className={`workshop__part workshop__part--${part.object} panel`} key={part.object}>
              <p className="workshop__object">
                {String(index + 1).padStart(2, "0")} · {part.objectName}
              </p>
              <h3>{part.title}</h3>
              <ul className="workshop__items">
                {part.items.map((item) => (
                  <li key={item}>{item.replace(/\.$/, "")}</li>
                ))}
              </ul>
              {part.object === "greenhouse" && customPlan ? (
                <a className="host-link workshop__link" href={`#pack-${customPlan.id}`}>
                  <span className="link-label">Ver el pack · desde {customPlan.price}</span>
                </a>
              ) : null}
              {part.object === "gear" ? (
                <div className="workshop__cta">
                  <p>{extensions.note}</p>
                  <a className="btn btn--moss" href={getWhatsAppHref(extensions.whatsappMessage)} target="_blank" rel="noreferrer">
                    {extensions.cta}
                  </a>
                </div>
              ) : null}
            </li>
          ))}
        </ol>

        <aside className="workshop__soon panel" aria-labelledby="bot-title">
          <p className="soon__label">{comingSoon.label}</p>
          <p className="workshop__soon-copy">
            <strong id="bot-title">{comingSoon.title}</strong> desde {comingSoon.tiers[0].price}. {comingSoon.description}
          </p>
          <AnimatedDetails className="pack-details workshop__tiers" summary={<span className="link-label">Ver los dos niveles</span>}>
            <dl className="soon__tiers">
              {comingSoon.tiers.map((tier) => (
                <div key={tier.name}>
                  <dt>{tier.name}</dt>
                  <dd>
                    <span className="soon__price">Desde {tier.price}</span>
                    <span className="soon__timeline">{tier.timeline}</span>
                    <span className="soon__includes">{tier.includes}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="soon__monthly">{comingSoon.monthly}</p>
            <p className="soon__note">{comingSoon.note}</p>
          </AnimatedDetails>
          <a className="btn btn--quiet" href={getWhatsAppHref(comingSoon.whatsappMessage)} target="_blank" rel="noreferrer">
            {comingSoon.cta}
          </a>
        </aside>
      </div>
    </section>
  );
}
