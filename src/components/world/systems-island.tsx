import type { CSSProperties } from "react";

import { ExtraControls, ExtrasSummary } from "@/components/world/extras-builder";
import { plateSceneStyle } from "@/components/world/island-plate";
import { AmbientBackdrop, AmbientClouds } from "@/components/world/ambient-sky";
import { IslandScene } from "@/components/world/island-scene";
import { IslandTitle } from "@/components/world/island-title";
import { MayoFigure } from "@/components/world/mayo-figure";
import { Toggletip } from "@/components/world/toggletip";
import { WorkshopController } from "@/components/world/workshop-controller";
import { chatBot, commercialPlans } from "@/content/commercial-plans";
import { type Extra, extraSealNotes, extraSealTags, extraSeals, extras, extrasCopy } from "@/content/extras";
import { islandCopy } from "@/content/islands";
import { islandPlates } from "@/content/stage";
import { type WorkshopPart, workshopParts, workshopSpots } from "@/content/workshop";
import { formatUsd, type PackOption } from "@/lib/extras-request";
import { getBlueRate, usdAmount } from "@/lib/peso-prices";
import { getWhatsAppHref } from "@/lib/whatsapp";

const customPlan = commercialPlans.find((plan) => plan.id === "sistema");

/** The packs the summary offers, priced from commercialPlans (one source of truth). */
const packOptions: PackOption[] = commercialPlans.flatMap((plan) => {
  const usd = usdAmount(plan.price);
  return usd ? [{ id: plan.id, name: plan.name, usd }] : [];
});

/** The panels of a painted object: its group of extras, or two when it is split (WorkshopPart.split). */
function panelsOf(part: WorkshopPart) {
  const group = extras.filter((extra) => extra.group === part.object);
  const split = part.split;
  if (!split) return [{ title: part.title, extras: group }];
  return [
    { title: part.title, extras: group.filter((extra) => !split.ids.includes(extra.id)) },
    { title: split.title, extras: group.filter((extra) => split.ids.includes(extra.id)) },
  ];
}

/**
 * One extra on one compact line: its title, its price with the seal under
 * it as a short tag (the whole seal, the limits and the provider's note open
 * from it) and a round "+" (ExtraControls).
 */
function ExtraRow({ extra }: { extra: Extra }) {
  const lines = [extraSealNotes[extra.kind], extra.detail, extra.service].filter((line): line is string => Boolean(line));
  return (
    <li className="extra">
      <p className="extra__title">{extra.title}</p>
      <div className="extra__price">
        <p>
          {extra.kind === "from" ? "desde " : null}
          <strong>{formatUsd(extra.price)}</strong>
          {extra.unit ? ` ${extra.unit}` : null}
        </p>
        <Toggletip
          className={`extra__tag extra__tag--${extra.kind === "fixed+service" ? "service" : extra.kind}`}
          title={
            <>
              {extraSealTags[extra.kind]}
              <span className="extras-sr">: {extra.title}</span>
            </>
          }
          items={lines}
        />
      </div>
      <ExtraControls extra={extra} />
    </li>
  );
}

const spotStyle = (point: readonly [number, number], mobile: readonly [number, number]) =>
  ({ "--x-d": `${point[0]}%`, "--y-d": `${point[1]}%`, "--x-m": `${mobile[0]}%`, "--y-m": `${mobile[1]}%` }) as CSSProperties;

/**
 * Island 4: the workshop, golden afternoon (Juani, 20 November 2026: option
 * B of docs/plans/2026-11-20-propuestas.md, "que el scroll vaya explicando y
 * animando los items"). The island is pinned for the whole section while the
 * four groups of priced extras scroll past it; each group lights its painted
 * object (pot, toolbox, gear, greenhouse) and its pin while it is in the
 * reading zone, scrubbed by the scroll and reversible. With reduced motion
 * or without scroll-driven animations every part and pin stands still and
 * readable. The title and lead belong to the pinned stage, so they stay with
 * the island instead of scrolling away (Juani, 20 November 2026: "el titulo
 * ... debe acompañar el paralax de la isla"), and every part ends centred
 * on the screen after a scroll (WorkshopController).
 *
 * Since 24 November 2026 every row is an extra with its price and a "Sumar"
 * toggle, "Tu consulta" adds them up at the end of the list (ExtrasSummary),
 * and the WhatsApp and Telegram bot is on sale below it
 * (docs/plans/2026-11-24-isla4-extras.md).
 */
export async function SystemsIsland() {
  const rate = await getBlueRate();
  return (
    <section id="sistemas" className="isle isle--golden workshop" data-island="4" style={plateSceneStyle(islandPlates.systems)} aria-labelledby="sistemas-title">
      <div className="workshop__stage">
        <IslandScene variant="golden" plate={islandPlates.systems} backdrop={<AmbientBackdrop island="systems" />}>
          {workshopParts.map((part) => (
            <span className={`workshop__halo workshop__halo--${part.object}`} key={part.object} style={spotStyle(workshopSpots[part.object].d, workshopSpots[part.object].m)} />
          ))}
          <MayoFigure slot="systems" className="isle__mayo isle__mayo--dig" />
          <AmbientClouds island="systems" depth="near" />
          {workshopParts.map((part) => (
            <span className={`workshop__pin workshop__pin--${part.object}`} key={part.object} style={spotStyle(workshopSpots[part.object].pinD, workshopSpots[part.object].pinM)}>
              {part.pin}
            </span>
          ))}
        </IslandScene>
        <header className="world-shell workshop__intro">
          <h2 id="sistemas-title">
            <IslandTitle segments={islandCopy.systems.title} />
          </h2>
          <p className="isle__body">{islandCopy.systems.body}</p>
        </header>
      </div>

      <div className="world-shell workshop__content">
        <div className="workshop__flow">
          <ol className="workshop__parts">
            {workshopParts.map((part) => (
              <li className={`workshop__group workshop__group--${part.object}`} key={part.object}>
                {panelsOf(part).map((panel) => (
                  <div className={`workshop__part workshop__part--${part.object} panel`} key={panel.title}>
                    <h3>{panel.title}</h3>
                    <ul className="workshop__items">
                      {panel.extras.map((extra) => (
                        <ExtraRow extra={extra} key={extra.id} />
                      ))}
                    </ul>
                    {part.object === "greenhouse" && customPlan ? (
                      <p className="workshop__custom">
                        {extrasCopy.customPrompt}{" "}
                        <a className="host-link workshop__link" href={`#pack-${customPlan.id}`}>
                          <span className="link-label">
                            Ver {customPlan.name} · desde {customPlan.price}
                          </span>
                        </a>
                      </p>
                    ) : null}
                  </div>
                ))}
              </li>
            ))}
          </ol>
          <ExtrasSummary packs={packOptions} rate={rate} />
        </div>

        {/* A section, not an aside: a complementary landmark may not sit inside main. */}
        <section className="workshop__bot panel" id="bot" aria-labelledby="bot-title">
          <h3 id="bot-title">{chatBot.title}</h3>
          <p className="workshop__bot-copy">{chatBot.description}</p>
          <ul className="bot-tiers">
            {chatBot.tiers.map((tier) => (
              <li className="bot-tier" key={tier.id}>
                <p className="bot-tier__name">{tier.name}</p>
                <p className="bot-tier__price">
                  <strong>{formatUsd(tier.usd)}</strong>
                  <span className="bot-tier__timeline">{tier.timeline}</span>
                </p>
                <p className="bot-tier__includes">{tier.includes}</p>
                <a className="btn btn--moss bot-tier__cta" href={getWhatsAppHref(tier.whatsappMessage)} target="_blank" rel="noreferrer">
                  {chatBot.cta}
                  <span className="extras-sr"> el {tier.name}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="extra__seal extra__seal--service">{extraSeals["fixed+service"]}</p>
          <p className="workshop__bot-note">
            {chatBot.monthly} {chatBot.note}
          </p>
        </section>
      </div>
      <WorkshopController />
    </section>
  );
}
