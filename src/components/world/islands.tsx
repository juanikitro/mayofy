import { AnimatedDetails } from "@/components/animated-details";
import { AmbientBackdrop, AmbientClouds } from "@/components/world/ambient-sky";
import { CanopyBreeze } from "@/components/world/canopy-breeze";
import { plateSceneStyle } from "@/components/world/island-plate";
import { IslandScene } from "@/components/world/island-scene";
import { IslandTitle } from "@/components/world/island-title";
import { MayoFigure } from "@/components/world/mayo-figure";
import { PlateObjects } from "@/components/world/plate-objects";
import { SceneGlow } from "@/components/world/scene-glow";
import { SceneLight } from "@/components/world/scene-light";
import { SixSteps } from "@/components/world/six-steps";
import { WorksIndex } from "@/components/world/works-index";
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
    <section id="trabajos" className="isle isle--sunset isle--sendero" data-island="5" aria-labelledby="trabajos-title">
      {/* The island itself is the six steps' path (SixSteps): the section keeps only its sunset sky. */}
      <div className="scene scene--sunset scene--sendero" aria-hidden="true">
        <div className="scene__sky" />
      </div>
      <div className="isle__content world-shell">
        <h2 id="trabajos-title">
          <IslandTitle segments={islandCopy.works.title} />
        </h2>
        <WorksIndex projects={projects as readonly ProjectEntry[]} />

        <SixSteps />
      </div>
    </section>
  );
}

/** Island 7: questions, starry night. FAQ and the monthly maintenance. Closes the journey. */
export function QuestionsIsland() {
  return (
    <section id="preguntas" className="isle isle--night isle--dark" data-island="7" style={plateSceneStyle(islandPlates.questions)} aria-labelledby="preguntas-title">
      <IslandScene variant="night" plate={islandPlates.questions} backdrop={<AmbientBackdrop island="questions" />}>
        {/* The lantern painted on the left rock. */}
        <SceneGlow kind="lantern" desktop={{ x: "36.5%", y: "45.6%", w: "7%" }} mobile={{ x: "26.9%", y: "70.5%", w: "16%" }} />
        <CanopyBreeze island="questions" />
        <SceneLight kind="lantern" plate={islandPlates.questions} />
        <PlateObjects objects={plateObjects.questions!} />
        <MayoFigure slot="questions" className="isle__mayo isle__mayo--chase" />
        <AmbientClouds island="questions" depth="near" />
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
