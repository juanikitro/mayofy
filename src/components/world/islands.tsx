import Link from "next/link";

import { AnimatedDetails } from "@/components/animated-details";
import { ContactForm } from "@/components/contact-form";
import {
  Campfire,
  Fireflies,
  Greenhouse,
  IslandScene,
  LooseRocks,
  PathStones,
} from "@/components/world/island-scene";
import { MayoFigure } from "@/components/world/mayo-figure";
import { DetailGroups } from "@/components/world/pack-groups";
import {
  comingSoon,
  extensions,
  maintenancePlan,
} from "@/content/commercial-plans";
import { type ProjectEntry, projects } from "@/content/projects";
import { publicChannels, siteContent } from "@/content/site";
import { getWhatsAppHref } from "@/lib/whatsapp";

/*
 * Islands 2 and 4–7. Titles and intros are the existing strings, kept
 * verbatim until Juani approves the proposed copy in
 * docs/plans/2026-11-16-texto-islas-propuesta.md. Mayo never speaks.
 */

/** Island 2: loose rocks, morning. The problem: the business that gets attention but has no order. */
export function ProblemIsland() {
  return (
    <section id="problema" className="isle isle--morning" data-island="2" aria-labelledby="problema-title">
      <IslandScene variant="morning">
        <LooseRocks />
        <MayoFigure pose="play" className="isle__mayo isle__mayo--play" />
      </IslandScene>
      <div className="isle__content world-shell">
        <div className="isle__channels" aria-label="Canales de atención existente">
          {siteContent.channels.map((channel) => (
            <span key={channel}>{channel}</span>
          ))}
        </div>
        <h2 id="problema-title">
          Ya te están <em>mirando</em>.
        </h2>
        <p className="isle__lead">La página decide qué pasa después.</p>
        <p className="isle__body">
          No inventamos demanda ni convertimos tu negocio en otra cosa. Tomamos
          la atención que ya existe, ordenamos la propuesta y construimos un
          lugar propio para que la consulta tenga por dónde entrar.
        </p>
      </div>
    </section>
  );
}

/** Island 4: workshop / greenhouse, golden afternoon. Custom systems, loose automations and the upcoming bot. */
export function SystemsIsland() {
  return (
    <section id="sistemas" className="isle isle--golden" data-island="4" aria-labelledby="sistemas-title">
      <IslandScene variant="golden">
        <Greenhouse />
        <MayoFigure pose="dig" className="isle__mayo isle__mayo--dig" />
      </IslandScene>
      <div className="isle__content world-shell">
        <h2 id="sistemas-title">
          Cuando una planilla ya no <em>alcanza</em>.
        </h2>
        <p className="isle__body">{siteContent.systems.body}</p>
        <ul className="isle__chips" aria-label="Qué construimos a medida">
          {siteContent.systems.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="isle__panels">
          <section className="addons panel" aria-labelledby="ampliaciones-title">
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

          <article className="soon panel">
            <p className="soon__label">{comingSoon.label}</p>
            <div className="soon__copy">
              <h3>{comingSoon.title}</h3>
              <p>{comingSoon.description}</p>
            </div>
            <a className="btn btn--quiet" href={getWhatsAppHref(comingSoon.whatsappMessage)}>
              {comingSoon.cta}
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}

/** Island 5: garden of works, sunset. Projects and the six-step steps. */
export function WorksIsland() {
  return (
    <section id="trabajos" className="isle isle--sunset" data-island="5" aria-labelledby="trabajos-title">
      <IslandScene variant="sunset">
        <PathStones />
        <MayoFigure pose="run" className="isle__mayo isle__mayo--run" />
      </IslandScene>
      <div className="isle__content world-shell">
        <p className="isle__eyebrow">Trabajos seleccionados</p>
        <h2 id="trabajos-title">
          Primero, el <em>trabajo</em>.
        </h2>
        <p className="isle__body">
          Un sistema a medida, una landing y una web personal, publicados y
          funcionando. Los casos completos se suman a medida que avanzan.
        </p>

        <ul className="works" aria-label="Proyectos">
          {(projects as readonly ProjectEntry[]).map((project) => (
            <li className={`work${project.placeholder ? " work--placeholder" : ""}`} key={project.slug}>
              <p className="work__category">
                {project.placeholder ? "Placeholder de contenido" : project.category}
              </p>
              <h3>
                <span aria-hidden="true">{project.index} </span>
                {project.title}
              </h3>
              <p>{project.summary}</p>
              {project.url ? (
                <a className="work__link" href={project.url} target="_blank" rel="noreferrer">
                  Visitar sitio <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <Link className="work__link" href={`/proyectos/${project.slug}`}>
                  Ver detalle <span aria-hidden="true">→</span>
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="steps panel">
          <h3>Un proceso claro. Seis movimientos.</h3>
          <p>
            Vas a saber en qué etapa está tu proyecto, por qué tomamos cada
            decisión y qué falta para publicar. Y después no te dejamos solo.
          </p>
          <ol className="steps__steps">
            {siteContent.process.map((step, index) => (
              <li key={step}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** Island 6: questions, dusk. FAQ and the monthly maintenance. */
export function QuestionsIsland() {
  return (
    <section id="preguntas" className="isle isle--dusk isle--dark" data-island="6" aria-labelledby="preguntas-title">
      <IslandScene variant="dusk">
        <Fireflies />
        <MayoFigure pose="chase" className="isle__mayo isle__mayo--chase" />
      </IslandScene>
      <div className="isle__content world-shell">
        <h2 id="preguntas-title">
          Antes de <em>escribir</em>.
        </h2>
        <p className="isle__body">Lo importante, sin letra chica ni respuestas de agencia.</p>

        <div className="questions">
          {siteContent.faq.map((item) => (
            <AnimatedDetails key={item.question} className="questions__item" summary={item.question}>
              <p>{item.answer}</p>
            </AnimatedDetails>
          ))}
        </div>

        <article className="upkeep panel">
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
      </div>
    </section>
  );
}

/** Island 7: Juani's island, starry night. Who is behind, scheduling and contact. */
export function JuaniIsland() {
  const whatsappHref = getWhatsAppHref();
  const heroWhatsAppHref = getWhatsAppHref(siteContent.hero.primaryMessage);

  return (
    <section id="contacto" className="isle isle--night isle--dark" data-island="7" aria-labelledby="contacto-title">
      <IslandScene variant="night">
        <Campfire />
        <MayoFigure pose="rest" className="isle__mayo isle__mayo--rest" />
      </IslandScene>
      <div className="isle__content world-shell">
        <div className="host">
          <h2 id="contacto-title">
            Mayofy es la marca. Detrás <em>estoy yo</em>.
          </h2>
          <p className="isle__lead">{siteContent.founder.lead}</p>
          <p className="isle__body">{siteContent.founder.body}</p>
          <a className="host-link" href={publicChannels.linkedin} target="_blank" rel="noreferrer">
            Ver experiencia en LinkedIn
          </a>
        </div>

        <div className="reach">
          <div className="reach__intro">
            <h3>Empecemos por una reunión de diagnóstico gratis.</h3>
            <p>
              Contanos qué necesitás: una web que convierta, turnos online o un
              sistema para ordenar tu operación. Te respondemos en menos de 24
              horas hábiles.
            </p>
            {/* Scheduling slot: Cal.com embed goes here once Juani shares the booking link. */}
            <a className="btn btn--moss btn--lg" href={heroWhatsAppHref} data-scheduling-slot>
              {siteContent.hero.primaryCta}
            </a>
            <span>O completá estos datos y lo vemos por WhatsApp:</span>
          </div>
          <ContactForm whatsappHref={whatsappHref} />
        </div>
      </div>
    </section>
  );
}
