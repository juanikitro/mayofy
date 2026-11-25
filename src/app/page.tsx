import { AmbientFilters } from "@/components/world/ambient-filters";
import { AmbientMotion } from "@/components/world/ambient-motion";
import { CloudFall } from "@/components/world/cloud-fall";
import { HeroIsland } from "@/components/world/hero-island";
import { IslandNav } from "@/components/world/island-nav";
import { JuaniIsland } from "@/components/world/host-island";
import { QuestionsIsland, WorksIsland } from "@/components/world/islands";
import { PackDetails } from "@/components/world/pack-details";
import { ProblemIsland } from "@/components/world/problem-island";
import { RockIsland } from "@/components/world/rock-island";
import { SectionSnap } from "@/components/world/section-snap";
import { SystemsIsland } from "@/components/world/systems-island";
import { WhatsAppFloat } from "@/components/world/whatsapp-float";
import { WhatsAppIcon } from "@/components/world/whatsapp-icon";
import { WorldFooter } from "@/components/world/world-footer";
import { WorldMotion } from "@/components/world/world-motion";
import { JsonLd } from "@/components/json-ld";
import { siteContent } from "@/content/site";
import { homeStructuredData } from "@/lib/structured-data";
import { getWhatsAppHref } from "@/lib/whatsapp";

/** Splits "Webs que venden." into ["Webs que", "venden", "."] for the serif keyword. */
function splitKeyword(line: string) {
  const match = line.match(/^(.*\s)(\S+?)([.!?]?)$/);
  if (!match) return { lead: line, keyword: "", tail: "" };
  return { lead: match[1], keyword: match[2], tail: match[3] };
}

export default function Home() {
  const heroWhatsAppHref = getWhatsAppHref(siteContent.hero.primaryMessage);

  return (
    <div className="world">
      <JsonLd data={homeStructuredData()} />
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <IslandNav />

      <main id="contenido">
        {/* suppressHydrationWarning: the intro script (hero-island.tsx) marks the section before React hydrates it. */}
        <section id="inicio" className="dawn" data-island="1" aria-labelledby="dawn-title" suppressHydrationWarning>
          <HeroIsland />
          <div className="dawn__content world-shell">
            <h1 id="dawn-title">
              {siteContent.hero.titleLines.map((line) => {
                const { lead, keyword, tail } = splitKeyword(line);
                return (
                  <span className="dawn__line" key={line}>
                    {lead}
                    <em>{keyword}</em>
                    {tail}
                  </span>
                );
              })}
            </h1>
            <div className="dawn__actions">
              <a className="btn btn--moss btn--lg" href="#agenda">
                {siteContent.hero.primaryCta}
              </a>
              <a className="btn btn--quiet btn--lg" href="#packs">
                {siteContent.hero.secondaryCta}
              </a>
              <a
                className="btn btn--ghost btn--lg btn--icon dawn__whatsapp"
                href={heroWhatsAppHref}
                target="_blank"
                rel="noreferrer"
                aria-label="Escribinos por WhatsApp"
                data-tip="Escribinos por WhatsApp"
              >
                <span className="btn__glyph">
                  <WhatsAppIcon />
                </span>
              </a>
            </div>
          </div>
        </section>

        <CloudFall />
        <ProblemIsland />
        <RockIsland />
        <PackDetails />
        <SystemsIsland />
        <WorksIsland />
        <JuaniIsland />
        <QuestionsIsland />
      </main>

      <WorldFooter />

      <WhatsAppFloat />

      <WorldMotion />
      <AmbientMotion />
      <AmbientFilters />
      <SectionSnap />
    </div>
  );
}
