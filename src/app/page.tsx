import Link from "next/link";

import { CloudFall } from "@/components/world/cloud-fall";
import { HeroIsland } from "@/components/world/hero-island";
import { IslandNav } from "@/components/world/island-nav";
import { IslandProgress } from "@/components/world/island-progress";
import {
  JuaniIsland,
  ProblemIsland,
  QuestionsIsland,
  SystemsIsland,
  WorksIsland,
} from "@/components/world/islands";
import { PackDetails } from "@/components/world/pack-details";
import { RockIsland } from "@/components/world/rock-island";
import { WorldMotion } from "@/components/world/world-motion";
import { publicChannels, siteContent } from "@/content/site";
import { getWhatsAppHref } from "@/lib/whatsapp";

import "./world.css";

/** Splits "Webs que venden." into ["Webs que", "venden", "."] for the serif keyword. */
function splitKeyword(line: string) {
  const match = line.match(/^(.*\s)(\S+?)([.!?]?)$/);
  if (!match) return { lead: line, keyword: "", tail: "" };
  return { lead: match[1], keyword: match[2], tail: match[3] };
}

export default function Home() {
  const whatsappHref = getWhatsAppHref();
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
            <p className="dawn__descriptor">{siteContent.descriptor}</p>
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
            <p className="dawn__body">{siteContent.hero.body}</p>
            <div className="dawn__actions">
              <a className="btn btn--moss btn--lg" href="#agenda">
                {siteContent.hero.primaryCta}
              </a>
              <a className="btn btn--quiet btn--lg" href="#packs">
                {siteContent.hero.secondaryCta}
              </a>
              <a className="dawn__alt" href={heroWhatsAppHref}>
                o escribinos por WhatsApp
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
        <QuestionsIsland />
        <JuaniIsland />
      </main>

      <footer className="world-footer">
        <div className="world-shell world-footer__layout">
          <p>{siteContent.hero.title}</p>
          <div className="world-footer__links">
            <a href={whatsappHref}>WhatsApp</a>
            <a href={publicChannels.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={publicChannels.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <Link href="/privacidad">Privacidad</Link>
          </div>
          <small>Mayofy · Webs y software a medida · Argentina y LATAM</small>
        </div>
      </footer>

      <WorldMotion />
    </div>
  );
}
