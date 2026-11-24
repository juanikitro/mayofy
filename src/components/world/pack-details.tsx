import { FlipCard } from "@/components/world/flip-card";
import { DetailGroups } from "@/components/world/pack-groups";
import { GuaranteesStrip } from "@/components/world/guarantees-strip";
import { PackCarousel } from "@/components/world/pack-carousel";
import { PaymentTip } from "@/components/world/payment-tip";
import { commercialIntro, commercialPlans } from "@/content/commercial-plans";
import { getPesoPrices } from "@/lib/peso-prices";
import { getWhatsAppHref } from "@/lib/whatsapp";

/**
 * Commercial substance of island 3, rendered below the rock stage: the three
 * packs (a carousel on phones, PackCarousel), the guarantees strip and how to
 * pay (a toggletip, PaymentTip). The bot and the loose
 * automations live on island 4; maintenance lives on island 6.
 * Content comes verbatim from src/content/commercial-plans.ts; the peso
 * reference under each price comes from the cached blue rate and is left out
 * when no rate is available (src/lib/peso-prices.ts).
 */
type Plan = (typeof commercialPlans)[number];

/** Copies of the last and first cards on each side of the phone carousel. */
const PACK_CLONES = 2;

export async function PackDetails() {
  const pesoPrices = await getPesoPrices();
  const { payment } = commercialIntro;

  function card(plan: Plan, copy: boolean) {
    const pesos = pesoPrices?.[plan.id];
    return (
      <FlipCard
        className={`pack${plan.eyebrow ? " pack--featured" : ""}`}
        id={copy ? undefined : `pack-${plan.id}`}
        key={plan.id}
        frontClassName="pack__front"
        backTitle={plan.name}
        flipLabel="Ver todo lo que incluye"
        unflipLabel="Volver"
        front={
          <>
            <header className="pack__header">
              {plan.eyebrow ? <p className="pack__eyebrow">{plan.eyebrow}</p> : null}
              <h3>{plan.name}</h3>
              <p className="pack__from">Desde</p>
              <p className="pack__price">{plan.price}</p>
              {pesos ? (
                <p className="pack__pesos">
                  ≈ <strong>{pesos}</strong> {commercialIntro.pesoRateLabel}
                </p>
              ) : null}
              <p className="pack__price-note">{pesos ? commercialIntro.priceNoteWithPesos : commercialIntro.priceNote}</p>
              <p className="pack__timeline">
                Plazo estimado: <strong>{plan.timeline}</strong>
              </p>
              <p className="pack__description">{plan.description}</p>
            </header>

            <div className="pack__ideal">
              <p>Ideal para</p>
              <span>{plan.idealFor}</span>
            </div>

            <a className="btn btn--moss pack__cta" href={getWhatsAppHref(plan.whatsappMessage)} target="_blank" rel="noreferrer">
              {plan.cta}
            </a>

            {plan.footnote ? (
              <p className="pack__footnote">
                <span aria-hidden="true">(*) </span>
                {plan.footnote}
              </p>
            ) : null}
          </>
        }
        back={
          <>
            <DetailGroups groups={plan.detailGroups} />
            <p className="pack-details__note">{plan.note}</p>
          </>
        }
      />
    );
  }

  // The phone carousel's copies: the last cards before the real ones, the first after (PackCarousel).
  const clone = (plan: Plan, side: string) => (
    <div className="packs__clone" aria-hidden="true" inert key={`${side}-${plan.id}`}>
      {card(plan, true)}
    </div>
  );

  return (
    <div className="packs world-shell" id="packs-detalle">
      <PackCarousel labels={commercialPlans.map((plan) => plan.name)} clones={PACK_CLONES}>
        {commercialPlans.slice(-PACK_CLONES).map((plan) => clone(plan, "before"))}
        {commercialPlans.map((plan) => card(plan, false))}
        {commercialPlans.slice(0, PACK_CLONES).map((plan) => clone(plan, "after"))}
      </PackCarousel>

      <GuaranteesStrip />

      <PaymentTip title={payment.title} items={payment.items} />
    </div>
  );
}
