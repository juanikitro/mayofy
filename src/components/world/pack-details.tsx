import { AnimatedDetails } from "@/components/animated-details";
import {
  comingSoon,
  commercialIntro,
  commercialPlans,
  extensions,
  guarantees,
  maintenancePlan,
} from "@/content/commercial-plans";
import { getWhatsAppHref } from "@/lib/whatsapp";

type DetailGroup = {
  title: string;
  items: readonly string[];
};

function DetailGroups({ groups }: { groups: readonly DetailGroup[] }) {
  return (
    <div className="pack-groups">
      {groups.map((group) => (
        <section key={group.title} className="pack-group">
          <h4>{group.title}</h4>
          <ul className="pack-list">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

/**
 * Full commercial substance of island 3, rendered below the rock stage.
 * Content comes verbatim from src/content/commercial-plans.ts.
 */
export function PackDetails() {
  return (
    <div className="packs world-shell" id="packs-detalle">
      <div className="packs__grid">
        {commercialPlans.map((plan) => (
          <article
            className={`pack${plan.eyebrow ? " pack--featured" : ""}`}
            id={`pack-${plan.id}`}
            key={plan.id}
          >
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

            <a className="btn btn--moss pack__cta" href={getWhatsAppHref(plan.whatsappMessage)}>
              {plan.cta}
            </a>

            {plan.footnote ? (
              <p className="pack__footnote">
                <span aria-hidden="true">(*) </span>
                {plan.footnote}
              </p>
            ) : null}

            <AnimatedDetails className="pack-details" summary="Ver todo lo que incluye">
              <DetailGroups groups={plan.detailGroups} />
              <p className="pack-details__note">{plan.note}</p>
            </AnimatedDetails>
          </article>
        ))}
      </div>

      <p className="packs__payment">{commercialIntro.payment}</p>

      <article className="soon">
        <p className="soon__label">{comingSoon.label}</p>
        <div className="soon__copy">
          <h3>{comingSoon.title}</h3>
          <p>{comingSoon.description}</p>
        </div>
        <a className="btn btn--quiet" href={getWhatsAppHref(comingSoon.whatsappMessage)}>
          {comingSoon.cta}
        </a>
      </article>

      <section className="promises" aria-labelledby="garantias-title">
        <h3 id="garantias-title">{guarantees.title}</h3>
        <ul className="pack-list promises__list">
          {guarantees.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <article className="upkeep">
        <header className="upkeep__intro">
          <h3>Mantenimiento mensual</h3>
          <dl className="upkeep__prices">
            {maintenancePlan.prices.map((tier) => (
              <div key={tier.label}>
                <dt>{tier.label}</dt>
                <dd className="upkeep__price">
                  {tier.price}
                  <span aria-hidden="true">{tier.asterisk ? " (**)" : " (*)"}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p>{maintenancePlan.description}</p>
        </header>
        <div className="upkeep__content">
          <a className="btn btn--quiet" href={getWhatsAppHref(maintenancePlan.whatsappMessage)}>
            {maintenancePlan.cta}
          </a>
          <AnimatedDetails className="pack-details" summary="¿Qué cambios incluye?">
            <DetailGroups groups={maintenancePlan.detailGroups} />
          </AnimatedDetails>
          <ol className="upkeep__footnotes" aria-label="Límites del mantenimiento">
            {maintenancePlan.footnotes.map((footnote, index) => (
              <li key={footnote}>
                <span aria-hidden="true">{index === 0 ? "(*) " : "(**) "}</span>
                {footnote}
              </li>
            ))}
          </ol>
        </div>
      </article>

      <section className="addons" aria-labelledby="ampliaciones-title">
        <header className="addons__intro">
          <h3 id="ampliaciones-title">{extensions.title}</h3>
          <p>{extensions.body}</p>
        </header>
        <div className="addons__grid">
          {extensions.categories.map((category) => (
            <section key={category.title}>
              <h4>{category.title}</h4>
              <ul className="pack-list">
                {category.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <footer className="addons__footer">
          <p>{extensions.note}</p>
          <a className="btn btn--moss" href={getWhatsAppHref(extensions.whatsappMessage)}>
            {extensions.cta}
          </a>
        </footer>
      </section>
    </div>
  );
}
