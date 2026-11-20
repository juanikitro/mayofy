import { CloudFall } from "@/components/world/cloud-fall";
import { HeroIsland } from "@/components/world/hero-island";
import { IslandNav } from "@/components/world/island-nav";
import { IslandProgress } from "@/components/world/island-progress";
import { JuaniIsland } from "@/components/world/host-island";
import { QuestionsIsland, WorksIsland } from "@/components/world/islands";
import { PackDetails } from "@/components/world/pack-details";
import { ProblemIsland } from "@/components/world/problem-island";
import { RockIsland } from "@/components/world/rock-island";
import { SystemsIsland } from "@/components/world/systems-island";
import { WhatsAppIcon } from "@/components/world/whatsapp-icon";
import { WorldFooter } from "@/components/world/world-footer";
import { WorldMotion } from "@/components/world/world-motion";
import { siteContent } from "@/content/site";
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
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <IslandNav />
      <IslandProgress />

      <main id="contenido">
        <section id="inicio" className="dawn" data-island="1" aria-labelledby="dawn-title">
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
              <a className="btn btn--ghost btn--lg dawn__whatsapp" href={heroWhatsAppHref} target="_blank" rel="noreferrer">
                <span className="btn__glyph">
                  <WhatsAppIcon />
                </span>
                Escribinos por WhatsApp
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

      <WorldMotion />
    </div>
  );
}
