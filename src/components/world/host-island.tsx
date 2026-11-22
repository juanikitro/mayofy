import { AnimatedDetails } from "@/components/animated-details";
import { ContactForm } from "@/components/contact-form";
import { CalBooking } from "@/components/world/cal-booking";
import { plateSceneStyle } from "@/components/world/island-plate";
import { IslandScene } from "@/components/world/island-scene";
import { IslandTitle } from "@/components/world/island-title";
import { MayoFigure } from "@/components/world/mayo-figure";
import { SceneGlow } from "@/components/world/scene-glow";
import { WhatsAppIcon } from "@/components/world/whatsapp-icon";
import { islandCopy } from "@/content/islands";
import { publicChannels, siteContent } from "@/content/site";
import { islandPlates } from "@/content/stage";
import { getWhatsAppHref } from "@/lib/whatsapp";

/** Juani's portrait: 5rem on phones, 7rem from tablets up, at 1x to 3x. */
const portraitSizes = "(min-width: 48.01rem) 7rem, 5rem";

function portraitSrcSet(format: "avif" | "webp") {
  return [160, 240, 320].map((size) => `/images/juani/juani-retrato-${size}.${format} ${size}w`).join(", ");
}

/**
 * Island 6: Juani's island, dusk (Juani, 20 November 2026: option A of
 * docs/plans/2026-11-20-propuestas.md, "Junto al fuego"). The first screen
 * is the introduction beside the island, where Mayo rests by the fire, with
 * Juani's portrait beside "Soy Juani" (a photo until his avatar exists); the
 * invitation, the agenda and WhatsApp follow under it, and the contact form
 * folds behind "Prefiero completar un formulario".
 */
export function JuaniIsland() {
  const whatsappHref = getWhatsAppHref();
  const heroWhatsAppHref = getWhatsAppHref(siteContent.hero.primaryMessage);

  return (
    <section id="contacto" className="isle isle--dusk isle--dark hearth" data-island="6" style={plateSceneStyle(islandPlates.host)} aria-labelledby="contacto-title">
      <div className="hearth__intro">
        <IslandScene variant="dusk" plate={islandPlates.host}>
          {/* The campfire painted between Mayo and the bench. */}
          <SceneGlow kind="fire" desktop={{ x: "55.2%", y: "55.4%", w: "15%" }} mobile={{ x: "53.8%", y: "71.6%", w: "32%" }} />
          <MayoFigure slot="host" className="isle__mayo isle__mayo--rest" />
        </IslandScene>
        <div className="world-shell hearth__copy">
          <div className="host">
            <h2 id="contacto-title">
              <IslandTitle segments={islandCopy.host.title} />
            </h2>
            <div className="host__intro">
              <picture className="host__portrait">
                <source type="image/avif" srcSet={portraitSrcSet("avif")} sizes={portraitSizes} />
                <img
                  src="/images/juani/juani-retrato-240.webp"
                  srcSet={portraitSrcSet("webp")}
                  sizes={portraitSizes}
                  width={240}
                  height={240}
                  alt={siteContent.founder.portraitAlt}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <p className="isle__lead">{siteContent.founder.lead}</p>
            </div>
            <p className="isle__body">{siteContent.founder.body}</p>
            <a className="host-link" href={publicChannels.linkedin} target="_blank" rel="noreferrer">
              <span className="link-label">Ver experiencia en LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      <div className="world-shell hearth__reach">
        <div className="hearth__invite">
          <h3>
            <IslandTitle segments={islandCopy.reach.title} />
          </h3>
          <p>{islandCopy.reach.body}</p>
          <a className="btn btn--moss hearth__whatsapp" href={heroWhatsAppHref} target="_blank" rel="noreferrer">
            <WhatsAppIcon />
            Escribir por WhatsApp
          </a>
        </div>
        <CalBooking {...siteContent.scheduling} />
        <AnimatedDetails className="pack-details hearth__form" summary={<span className="link-label">Prefiero completar un formulario</span>}>
          <p className="hearth__form-intro">Completá estos datos y lo vemos por WhatsApp.</p>
          <ContactForm whatsappHref={whatsappHref} />
        </AnimatedDetails>
      </div>
    </section>
  );
}
