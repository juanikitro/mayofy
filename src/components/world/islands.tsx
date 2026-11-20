import Link from "next/link";

import { AnimatedDetails } from "@/components/animated-details";
import { plateSceneStyle } from "@/components/world/island-plate";
import { IslandScene } from "@/components/world/island-scene";
import { IslandTitle } from "@/components/world/island-title";
import { MayoFigure } from "@/components/world/mayo-figure";
import { PlateObjects } from "@/components/world/plate-objects";
import { SceneGlow } from "@/components/world/scene-glow";
import { staggerStyle } from "@/components/world/stagger";
import { WorkCarousel } from "@/components/world/work-carousel";
import { DetailGroups } from "@/components/world/pack-groups";
import { FlipCard } from "@/components/world/flip-card";
import { maintenancePlan } from "@/content/commercial-plans";
import { islandCopy } from "@/content/islands";
import { islandPlates, plateObjects } from "@/content/stage";
import { type ProjectEntry, projects } from "@/content/projects";
import { siteContent } from "@/content/site";
import { getWhatsAppHref } from "@/lib/whatsapp";

/*
 * Islands 5 and 7 (2, 4 and 6 live in their own files). Titles and intros come from src/content/islands.ts
 * (approved by Juani on 2026-11-16). Mayo never speaks.
 */

/** Island 5: garden of works, sunset. Projects and the six-step steps. */
export function WorksIsland() {
  return (
    <section id="trabajos" className="isle isle--sunset" data-island="5" style={plateSceneStyle(islandPlates.works)} aria-labelledby="trabajos-title">
      <IslandScene variant="sunset" plate={islandPlates.works}>
        <MayoFigure slot="works" className="isle__mayo isle__mayo--run" />
      </IslandScene>
      <div className="isle__content world-shell">
        <h2 id="trabajos-title">
          <IslandTitle segments={islandCopy.works.title} />
        </h2>
        <p className="isle__body">{islandCopy.works.body}</p>

        <ul className="works" aria-label="Proyectos">
          {(projects as readonly ProjectEntry[]).map((project, index) => (
            <li className={`work${project.placeholder ? " work--placeholder" : ""}`} key={project.slug} style={staggerStyle(index % 3)}>
              <WorkCarousel images={project.images} title={project.title} index={project.index} />
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
                  <span className="link-label">Ver el caso</span>{" "}
                  <span className="link-arrow" aria-hidden="true">→</span>
                </Link>
                {project.url ? (
                  <a className="work__link" href={project.url} target="_blank" rel="noreferrer">
                    <span className="link-label">Visitar sitio</span>{" "}
                    <span className="link-arrow link-arrow--out" aria-hidden="true">↗</span>
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
              <li key={step} style={staggerStyle(index)}>
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
        {/* The lantern painted on the left rock. */}
        <SceneGlow kind="lantern" desktop={{ x: "36.5%", y: "45.6%", w: "7%" }} mobile={{ x: "26.9%", y: "70.5%", w: "16%" }} />
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

          <FlipCard
            className="upkeep panel"
            frontClassName="upkeep__front"
            backTitle="Mantenimiento mensual"
            flipLabel="¿Qué cambios incluye?"
            unflipLabel="Volver"
            front={
              <>
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
                  <ol className="upkeep__footnotes" aria-label="Límites del mantenimiento">
                    {maintenancePlan.footnotes.map((footnote, index) => (
                      <li key={footnote}>
                        <span aria-hidden="true">{index === 0 ? "(*) " : "(**) "}</span>
                        {footnote}
                      </li>
                    ))}
                  </ol>
                </div>
              </>
            }
            back={<DetailGroups groups={maintenancePlan.detailGroups} />}
          />
        </div>
      </div>
    </section>
  );
}
