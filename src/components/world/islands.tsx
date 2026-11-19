import Link from "next/link";

import { AnimatedDetails } from "@/components/animated-details";
import { ContactForm } from "@/components/contact-form";
import { plateSceneStyle } from "@/components/world/island-plate";
import { IslandScene } from "@/components/world/island-scene";
import { CalBooking } from "@/components/world/cal-booking";
import { IslandTitle } from "@/components/world/island-title";
import { MayoFigure } from "@/components/world/mayo-figure";
import { PlateObjects } from "@/components/world/plate-objects";
import { DetailGroups } from "@/components/world/pack-groups";
import {
  comingSoon,
  extensions,
  maintenancePlan,
} from "@/content/commercial-plans";
import { islandCopy } from "@/content/islands";
import { islandPlates, plateObjects } from "@/content/stage";
import { type ProjectEntry, projects } from "@/content/projects";
import { publicChannels, siteContent } from "@/content/site";
import { getWhatsAppHref } from "@/lib/whatsapp";

/*
 * Islands 2 and 4–7. Titles and intros come from src/content/islands.ts
 * (approved by Juani on 2026-11-16). Mayo never speaks.
 */

/** Island 2: loose rocks, morning. The problem: the business that gets attention but has no order. */
export function ProblemIsland() {
  return (
    <section id="problema" className="isle isle--morning" data-island="2" style={plateSceneStyle(islandPlates.problem)} aria-labelledby="problema-title">
      <IslandScene variant="morning" plate={islandPlates.problem}>
        <MayoFigure slot="problem" className="isle__mayo isle__mayo--play" />
      </IslandScene>
      <div className="isle__content world-shell">
        <div className="isle__channels" aria-label="Canales de atención existente">
          {siteContent.channels.map((channel) => (
            <span key={channel}>{channel}</span>
          ))}
        </div>
        <h2 id="problema-title">
          <IslandTitle segments={islandCopy.problem.title} />
        </h2>
        <p className="isle__body">{islandCopy.problem.body}</p>
      </div>
    </section>
  );
}

/** Island 4: workshop / greenhouse, golden afternoon. Custom systems, loose automations and the upcoming bot. */
export function SystemsIsland() {
  return (
    <section id="sistemas" className="isle isle--golden" data-island="4" style={plateSceneStyle(islandPlates.systems)} aria-labelledby="sistemas-title">
      <IslandScene variant="golden" plate={islandPlates.systems}>
        <PlateObjects objects={plateObjects.systems!} />
        <MayoFigure slot="systems" className="isle__mayo isle__mayo--dig" />
      </IslandScene>
      <div className="isle__content world-shell">
        <h2 id="sistemas-title">
          <IslandTitle segments={islandCopy.systems.title} />
        </h2>
        <p className="isle__body">{islandCopy.systems.body}</p>
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
              <a className="btn btn--moss" href={getWhatsAppHref(extensions.whatsappMessage)} target="_blank" rel="noreferrer">
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
            <a className="btn btn--quiet" href={getWhatsAppHref(comingSoon.whatsappMessage)} target="_blank" rel="noreferrer">
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
    <section id="trabajos" className="isle isle--sunset" data-island="5" style={plateSceneStyle(islandPlates.works)} aria-labelledby="trabajos-title">
      <IslandScene variant="sunset" plate={islandPlates.works}>
        <PlateObjects objects={plateObjects.works!} />
        <MayoFigure slot="works" className="isle__mayo isle__mayo--run" />
      </IslandScene>
      <div className="isle__content world-shell">
        <p className="isle__eyebrow">Trabajos seleccionados</p>
        <h2 id="trabajos-title">
          <IslandTitle segments={islandCopy.works.title} />
        </h2>
        <p className="isle__body">{islandCopy.works.body}</p>

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
              <div className="work__links">
                <Link className="work__link" href={`/proyectos/${project.slug}`}>
                  Ver el caso <span aria-hidden="true">→</span>
                </Link>
                {project.url ? (
                  <a className="work__link" href={project.url} target="_blank" rel="noreferrer">
                    Visitar sitio <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>

        <div className="steps panel">
          <h3>
            <IslandTitle segments={islandCopy.process.title} />
          </h3>
          <p>{islandCopy.process.body}</p>
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

/** Island 7: questions, starry night. FAQ and the monthly maintenance. Closes the journey. */
export function QuestionsIsland() {
  return (
    <section id="preguntas" className="isle isle--night isle--dark" data-island="7" style={plateSceneStyle(islandPlates.questions)} aria-labelledby="preguntas-title">
      <IslandScene variant="night" plate={islandPlates.questions}>
        <PlateObjects objects={plateObjects.questions!} />
        <MayoFigure slot="questions" className="isle__mayo isle__mayo--chase" />
      </IslandScene>
      <div className="isle__content world-shell">
        <h2 id="preguntas-title">
          <IslandTitle segments={islandCopy.questions.title} />
        </h2>
        <p className="isle__body">{islandCopy.questions.body}</p>

        <div className="isle__split">
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
              <a className="btn btn--quiet" href={getWhatsAppHref(maintenancePlan.whatsappMessage)} target="_blank" rel="noreferrer">
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
      </div>
    </section>
  );
}

/** Island 6: Juani's island, dusk. Who is behind, Cal.com booking and contact. */
export function JuaniIsland() {
  const whatsappHref = getWhatsAppHref();
  const heroWhatsAppHref = getWhatsAppHref(siteContent.hero.primaryMessage);

  return (
    <section id="contacto" className="isle isle--dusk isle--dark" data-island="6" style={plateSceneStyle(islandPlates.host)} aria-labelledby="contacto-title">
      <IslandScene variant="dusk" plate={islandPlates.host}>
        <MayoFigure slot="host" className="isle__mayo isle__mayo--rest" />
      </IslandScene>
      <div className="isle__content world-shell">
        <div className="host">
          <h2 id="contacto-title">
            <IslandTitle segments={islandCopy.host.title} />
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
            <CalBooking url={siteContent.scheduling.url} calLink={siteContent.scheduling.calLink} />
            <a className="host-link" href={heroWhatsAppHref} target="_blank" rel="noreferrer">
              Prefiero escribir por WhatsApp
            </a>
            <span>O completá estos datos y lo vemos por WhatsApp:</span>
          </div>
          <ContactForm whatsappHref={whatsappHref} />
        </div>
      </div>
    </section>
  );
}
