import { AnimatedDetails } from "@/components/animated-details";
import {
  commercialBenefits,
  commercialPlans,
  extensions,
  maintenancePlan,
} from "@/content/commercial-plans";
import { getWhatsAppHref } from "@/lib/whatsapp";

type DetailGroup = {
  title: string;
  items: readonly string[];
};

function DetailGroups({ groups }: { groups: readonly DetailGroup[] }) {
  return (
    <div className="commercial-details__groups">
      {groups.map((group) => (
        <section key={group.title} className="commercial-details__group">
          <h4>{group.title}</h4>
          <ul className="commercial-list">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export function CommercialPlans() {
  return (
    <section id="planes" className="commercial kinetic-section" aria-labelledby="planes-title">
      <div className="page-shell">
        <header className="commercial__intro section-intro" data-reveal>
          <h2 id="planes-title">Elegí la landing que necesita tu negocio</h2>
          <p>
            Desde una presencia digital profesional hasta una herramienta comercial
            completa para generar y medir consultas.
          </p>
        </header>

        <ul className="commercial-benefits" aria-label="Incluido en todos los planes">
          {commercialBenefits.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>

        <div className="commercial-plans">
          {commercialPlans.map((plan) => {
            return (
              <article
                className={`commercial-plan${plan.eyebrow ? " commercial-plan--featured" : ""}`}
                key={plan.id}
                data-reveal
              >
                <header className="commercial-plan__header">
                  {plan.eyebrow ? <p className="commercial-plan__eyebrow">{plan.eyebrow}</p> : null}
                  <h3>{plan.name}</h3>
                  <p className="commercial-plan__price">{plan.price}</p>
                  <p className="commercial-plan__payment">{plan.payment}</p>
                  <p className="commercial-plan__maintenance">{plan.maintenance}</p>
                  <p className="commercial-plan__description">{plan.description}</p>
                </header>

                <div className="commercial-plan__ideal">
                  <p>Ideal para</p>
                  <span>{plan.idealFor}</span>
                </div>

                <a
                  className="button button--accent commercial-plan__cta"
                  href={getWhatsAppHref(plan.whatsappMessage)}
                  data-magnetic
                >
                  {plan.cta}
                </a>

                <AnimatedDetails
                  className="commercial-details"
                  summary="Ver todo lo que incluye"
                >
                  <DetailGroups groups={plan.detailGroups} />
                  <p className="commercial-details__note">{plan.note}</p>
                </AnimatedDetails>
              </article>
            );
          })}
        </div>

        <article className="maintenance" data-reveal>
          <header className="maintenance__intro">
            <h3>Mantenimiento mensual</h3>
            <p className="maintenance__price">{maintenancePlan.price}</p>
            <p>{maintenancePlan.description}</p>
          </header>
          <div className="maintenance__content">
            <a
              className="button button--quiet maintenance__cta"
              href={getWhatsAppHref(maintenancePlan.whatsappMessage)}
              data-magnetic
            >
              {maintenancePlan.cta}
            </a>
            <AnimatedDetails className="commercial-details" summary="¿Qué cambios incluye?">
              <DetailGroups groups={maintenancePlan.detailGroups} />
            </AnimatedDetails>
            <p className="commercial-details__note">{maintenancePlan.note}</p>
          </div>
        </article>

        <section className="extensions" aria-labelledby="ampliaciones-title" data-reveal>
          <header className="extensions__intro">
            <h3 id="ampliaciones-title">¿Necesitás algo más?</h3>
            <p>
              Tu landing puede crecer junto con tu negocio. Agregamos únicamente las
              funcionalidades que necesitás, sin obligarte a contratar un sistema
              complejo desde el comienzo.
            </p>
          </header>
          <div className="extensions__grid">
            {extensions.categories.map((category) => (
              <section key={category.title}>
                <h4>{category.title}</h4>
                <ul className="commercial-list">
                  {category.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <footer className="extensions__footer">
            <p>{extensions.note}</p>
            <a
              className="button button--accent"
              href={getWhatsAppHref(extensions.whatsappMessage)}
              data-magnetic
            >
              {extensions.cta}
            </a>
          </footer>
        </section>
      </div>
    </section>
  );
}
