import { FlipCard } from "@/components/world/flip-card";
import { DetailGroups } from "@/components/world/pack-groups";
import {
  commercialIntro,
  commercialPlans,
  guarantees,
} from "@/content/commercial-plans";
import { getWhatsAppHref } from "@/lib/whatsapp";

/**
 * Commercial substance of island 3, rendered below the rock stage: the three
 * packs, the payment line and the guarantees. The bot and the loose
 * automations live on island 4; maintenance lives on island 6.
 * Content comes verbatim from src/content/commercial-plans.ts.
 */
export function PackDetails() {
  return (
    <div className="packs world-shell" id="packs-detalle">
      <div className="packs__grid">
        {commercialPlans.map((plan) => (
          <FlipCard
            className={`pack${plan.eyebrow ? " pack--featured" : ""}`}
            id={`pack-${plan.id}`}
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
        ))}
      </div>

      <p className="packs__payment">{commercialIntro.payment}</p>

      <section className="promises" aria-labelledby="garantias-title">
        <h3 id="garantias-title">{guarantees.title}</h3>
        <ul className="pack-list promises__list">
          {guarantees.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
