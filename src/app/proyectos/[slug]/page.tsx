import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MotionController } from "@/components/motion-controller";
import { ProjectVisual } from "@/components/project-visual";
import {
  getProject,
  projects,
  type ProjectVisualVariant,
} from "@/content/projects";
import { getWhatsAppHref } from "@/lib/whatsapp";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const galleryVariants: readonly ProjectVisualVariant[] = [
  "threshold",
  "current",
  "canopy",
  "monolith",
  "delta",
  "grove",
];

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: `${project.title} | Mayofy`,
    description: project.summary,
    robots: {
      index: !project.placeholder,
      follow: !project.placeholder,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const whatsappHref = getWhatsAppHref(
    `Hola Juani, vi el detalle de ${project.title} y quiero contarte sobre mi negocio.`,
  );
  const galleryStart = Number(project.index) - 1;
  const gallery = Array.from({ length: 3 }, (_, index) => ({
    label: ["Vista principal", "Vista secundaria", "Detalle de interfaz"][index],
    variant: galleryVariants[(galleryStart + index) % galleryVariants.length],
  }));

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <header className="case-header">
        <nav className="case-nav page-shell" aria-label="Navegación del proyecto">
          <Link className="case-nav__wordmark" href="/">
            <Image
              src="/images/mayofy-wordmark.png"
              alt="Mayofy"
              width={1321}
              height={305}
            />
          </Link>
          <a className="case-nav__action" href={whatsappHref} data-magnetic>
            WhatsApp
          </a>
        </nav>
      </header>

      <main id="contenido" className="case-main">
        <section className="case-hero">
          <div className="page-shell case-hero__layout" data-reveal>
            <div className="case-hero__copy">
              <Link className="case-back-link" href="/#trabajos">
                <span aria-hidden="true">←</span> Volver a trabajos
              </Link>
              <p className="project-placeholder">Proyecto placeholder · noindex</p>
              <span>{project.index} / 06</span>
              <h1>{project.title}</h1>
              <p>{project.summary}</p>
            </div>
            <div className="case-hero__visual">
              <ProjectVisual label={project.title} variant={project.visual} />
            </div>
          </div>
        </section>

        <section className="case-facts" aria-label="Ficha del proyecto">
          <dl className="page-shell">
            <div>
              <dt>Estado</dt>
              <dd>Contenido pendiente</dd>
            </div>
            <div>
              <dt>Categoría</dt>
              <dd>{project.category}</dd>
            </div>
            <div>
              <dt>Alcance</dt>
              <dd>{project.scope}</dd>
            </div>
            <div>
              <dt>Resultado</dt>
              <dd>A completar</dd>
            </div>
          </dl>
        </section>

        <section className="case-story">
          <div className="page-shell case-story__layout">
            <aside className="case-story__index" aria-label="Índice del caso">
              <p>Recorrido del caso</p>
              <a href="#contexto">Contexto</a>
              <a href="#desafio">Desafío</a>
              <a href="#enfoque">Enfoque</a>
              <a href="#decisiones">Decisiones</a>
              <a href="#resultado">Resultado</a>
            </aside>

            <div className="case-story__content">
              <article id="contexto">
                <h2>Qué estaba pasando.</h2>
                <p>{project.context}</p>
              </article>
              <article id="desafio">
                <h2>Qué necesitaba cambiar.</h2>
                <p>{project.challenge}</p>
              </article>
              <article id="enfoque">
                <h2>Cómo lo encaramos.</h2>
                <p>{project.approach}</p>
              </article>
            </div>
          </div>
        </section>

        <section id="decisiones" className="case-decisions">
          <div className="page-shell case-decisions__layout">
            <header>
              <h2>Las decisiones que sostienen la pieza.</h2>
              <p>
                Este bloque mostrará criterio y trade-offs, no una lista decorativa
                de tecnologías.
              </p>
            </header>
            <ol>
              {project.decisions.map((decision, index) => (
                <li key={decision}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{decision}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="case-conversion">
          <div className="page-shell">
            <header>
              <h2>El recorrido de conversión.</h2>
              <p>Cada etapa se reemplazará por el flujo real del proyecto.</p>
            </header>
            <ol>
              {project.conversionSteps.map((step, index) => (
                <li key={`${step}-${index}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="case-gallery">
          <div className="page-shell">
            <header>
              <h2>El proyecto, de cerca.</h2>
              <p>Capturas, video o detalles reales ocuparán estos tres espacios.</p>
            </header>
            <div className="case-gallery__grid">
              {gallery.map((item) => (
                <div key={item.label}>
                  <ProjectVisual label={item.label} variant={item.variant} compact />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="resultado" className="case-outcome">
          <div className="page-shell case-outcome__layout">
            <p>Resultado a completar</p>
            <h2>{project.outcome}</h2>
            <span>
              Acá solo aparecerán métricas, señales o aprendizajes verificables.
            </span>
          </div>
        </section>

        <section className="case-contact">
          <div className="page-shell case-contact__layout">
            <h2>Tu proyecto no tiene que parecerse a este.</h2>
            <p>Tiene que resolver con claridad el problema de tu negocio.</p>
            <a className="button button--accent" href={whatsappHref} data-magnetic>
              Contanos qué necesitás
            </a>
          </div>
        </section>
      </main>

      <footer className="case-footer">
        <div className="page-shell">
          <p>El detalle cambia. El criterio se mantiene.</p>
          <div>
            <Link href="/">Mayofy</Link>
            <Link href="/#trabajos">Todos los proyectos</Link>
          </div>
        </div>
      </footer>

      <MotionController />
    </>
  );
}
