import Image from "next/image";

import { CanopyConvergence } from "@/components/canopy-convergence";
import { CommercialPlans } from "@/components/commercial-plans";
import { AnimatedDetails } from "@/components/animated-details";
import { ContactForm } from "@/components/contact-form";
import { ForestRift } from "@/components/forest-rift";
import { HeroArt } from "@/components/hero-art";
import { HeroForeground } from "@/components/hero-foreground";
import { MotionController } from "@/components/motion-controller";
import { NatureCurrent } from "@/components/nature-current";
import { ParticleField } from "@/components/particle-field";
import { ProjectsShowcase } from "@/components/projects-showcase";
import { SectionBridge } from "@/components/section-bridge";
import { publicChannels, siteContent } from "@/content/site";
import { getWhatsAppHref } from "@/lib/whatsapp";

export default function Home() {
  const whatsappHref = getWhatsAppHref();
  const heroWhatsAppHref = getWhatsAppHref(
    "Hola Juani, vi la propuesta de Mayofy y quiero contarte sobre mi negocio.",
  );

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <header className="site-header">
        <nav className="site-nav" aria-label="Navegación principal">
          <a className="site-nav__wordmark" href="#inicio" aria-label="Mayofy, inicio">
            <Image
              src="/images/mayofy-wordmark.png"
              alt="Mayofy"
              width={1321}
              height={305}
              preload
            />
          </a>
          <div className="site-nav__links">
            <a href="#trabajos">Trabajos</a>
            <a href="#servicio">Qué hacemos</a>
            <a href="#sobre-mayofy">Quién está detrás</a>
          </div>
          <a className="site-nav__action" href={heroWhatsAppHref} data-magnetic>
            WhatsApp
          </a>
        </nav>
      </header>

      <main id="contenido" className="site-main">
        <NatureCurrent />
        <ParticleField />

        <section id="inicio" className="hero kinetic-section" data-scene>
          <HeroArt />
          <HeroForeground />
          <div className="hero__veil" aria-hidden="true" />
          <div className="hero__light-breath" aria-hidden="true" />
          <div className="hero__content page-shell">
            <p className="hero__descriptor">{siteContent.descriptor}</p>
            <h1>{siteContent.hero.title}</h1>
            <p className="hero__body">{siteContent.hero.body}</p>
            <div className="hero__actions">
              <a
                className="button button--accent"
                href={heroWhatsAppHref}
                data-magnetic
              >
                Escribinos por WhatsApp
              </a>
              <a className="button button--quiet" href="#trabajos" data-magnetic>
                Ver trabajos
              </a>
            </div>
          </div>
          <p className="hero__signal">
            Atención <span aria-hidden="true">→</span> claridad{" "}
            <span aria-hidden="true">→</span> conversación
          </p>
        </section>

        <SectionBridge variant="water" />

        <section className="attention section-light kinetic-section" data-reveal>
          <div className="page-shell attention__layout">
            <div className="attention__channels" aria-label="Canales de atención existente">
              {siteContent.channels.map((channel) => (
                <span key={channel}>{channel}</span>
              ))}
            </div>
            <div className="attention__statement">
              <h2>Ya te están mirando.</h2>
              <p>La página decide qué pasa después.</p>
            </div>
            <p className="attention__body">
              No inventamos demanda ni convertimos tu negocio en otra cosa.
              Tomamos la atención que ya existe, ordenamos la propuesta y
              construimos un lugar propio para que la consulta tenga por dónde entrar.
            </p>
          </div>
        </section>

        <SectionBridge variant="roots" />

        <ProjectsShowcase />

        <section id="servicio" className="offer section-night kinetic-section">
          <ForestRift />
          <div className="page-shell">
            <header className="section-intro offer__intro" data-reveal>
              <h2>No vendemos una página suelta.</h2>
              <p>
                Construimos un lanzamiento integral: mensaje, experiencia,
                tecnología y contacto trabajando como una sola pieza.
              </p>
            </header>

            <div className="offer-path">
              {siteContent.offerPath.map((item) => (
                <article className="offer-step" key={item.step} data-reveal>
                  <p className="offer-step__number" aria-hidden="true">
                    {item.step}
                  </p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <SectionBridge variant="water" reverse />

        <CommercialPlans />

        <SectionBridge variant="mist" />

        <section
          id="proceso"
          className="process section-paper kinetic-section"
          data-reveal
        >
          <div className="page-shell process__layout">
            <div className="process__statement">
              <h2>Una idea clara. Seis movimientos.</h2>
              <p>
                Vas a saber qué estamos resolviendo, por qué tomamos cada decisión
                y qué falta para publicar.
              </p>
            </div>
            <ol className="process__list">
              {siteContent.process.map((step, index) => (
                <li key={step} data-flow-node>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <SectionBridge variant="water" reverse />

        <section
          className="capabilities section-accent-ink kinetic-section"
          data-reveal
        >
          <div className="page-shell capabilities__layout">
            <div>
              <h2>La página es la base. No el límite.</h2>
              <p>
                Cuando el problema lo pide, podemos extender la solución sin
                convertir la tecnología en protagonista.
              </p>
            </div>
            <ul>
              {siteContent.capabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
          </div>
        </section>

        <SectionBridge variant="mist" />

        <section
          id="sobre-mayofy"
          className="founder section-light kinetic-section"
          data-reveal
        >
          <div className="page-shell founder__layout">
            <div className="founder__mark" aria-hidden="true">
              <span>J</span>
              <small>dirección directa</small>
            </div>
            <div className="founder__copy">
              <h2>Mayofy es la marca. Detrás estoy yo.</h2>
              <p className="founder__lead">
                Soy Juani. Combino dirección creativa con experiencia construyendo
                productos web, APIs, integraciones y automatizaciones.
              </p>
              <p>
                Vas a hablar conmigo desde la primera conversación hasta la
                publicación. Sin capas comerciales, sin un equipo ficticio y sin
                perder el contexto de tu negocio entre etapas.
              </p>
              <a
                className="text-link"
                href={publicChannels.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                Ver experiencia en LinkedIn
              </a>
            </div>
          </div>
        </section>

        <SectionBridge variant="roots" reverse />

        <section className="faq section-paper kinetic-section">
          <div className="page-shell faq__layout">
            <div className="faq__intro" data-reveal>
              <h2 className="typewriter-title" aria-label="Antes de escribir.">
                <span className="typewriter-title__text" aria-hidden="true">
                  Antes de escribir.
                </span>
              </h2>
              <p>Lo importante, sin letra chica ni respuestas de agencia.</p>
            </div>
            <div className="faq__items">
              {siteContent.faq.map((item) => (
                <AnimatedDetails
                  key={item.question}
                  data-reveal
                  summary={item.question}
                >
                  <p>{item.answer}</p>
                </AnimatedDetails>
              ))}
            </div>
          </div>
        </section>

        <CanopyConvergence />

        <section id="contacto" className="contact section-night kinetic-section">
          <div className="page-shell contact__layout">
            <div className="contact__intro" data-reveal>
              <h2>Contanos dónde está trabada la conversación.</h2>
              <p>
                Si ya te encuentran pero tu presencia digital no acompaña, podemos
                empezar por ahí.
              </p>
              <a className="button button--accent" href={whatsappHref} data-magnetic>
                Abrir WhatsApp
              </a>
              <span>O explicanos mejor tu necesidad:</span>
            </div>
            <div data-reveal>
              <ContactForm whatsappHref={whatsappHref} />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-shell site-footer__layout">
          <p>Una presencia propia para que la atención no se pierda.</p>
          <div className="site-footer__links">
            <a href={whatsappHref}>WhatsApp</a>
            <a href={publicChannels.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={publicChannels.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
          <small>Mayofy · Estudio digital unipersonal · LATAM</small>
        </div>
      </footer>

      <MotionController />
    </>
  );
}
