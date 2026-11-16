import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { IslandNav } from "@/components/world/island-nav";
import { WorldFooter } from "@/components/world/world-footer";
import { getProject, projects } from "@/content/projects";
import { siteContent } from "@/content/site";
import { getWhatsAppHref } from "@/lib/whatsapp";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/proyectos/${project.slug}` },
    robots: { index: !project.placeholder, follow: !project.placeholder },
  };
}

/*
 * Case-study template. Every project, real or placeholder, follows the same
 * path: cover → facts → story (context, challenge, approach) → decisions →
 * conversion journey → gallery → next step. The content comes from
 * src/content/projects.ts; see docs/plans/2026-11-16-template-proyectos.md
 * for how to load a new project.
 */
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const whatsappHref = getWhatsAppHref(
    `Hola Juani, vi el caso ${project.title} y quiero contarte sobre mi negocio.`,
  );
  const gallery = ["Vista principal", "Vista secundaria", "Detalle de interfaz"];

  return (
    <div className="world">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <IslandNav />

      <main id="contenido" className="study">
        <header className="study__cover">
          <div className="world-shell study__cover-layout">
            <Link className="study__back" href="/#trabajos">
              <span aria-hidden="true">←</span> Volver a trabajos
            </Link>
            <p className="study__category">
              {project.placeholder ? "Proyecto placeholder" : project.category}
              <span aria-hidden="true"> · </span>
              {project.index} / {String(projects.length).padStart(2, "0")}
            </p>
            <h1>{project.title}</h1>
            <p className="study__summary">{project.summary}</p>
            {"url" in project && project.url ? (
              <a className="btn btn--moss" href={project.url} target="_blank" rel="noreferrer">
                Visitar sitio <span aria-hidden="true">↗</span>
              </a>
            ) : null}
          </div>
        </header>

        <section className="study__facts" aria-label="Ficha del proyecto">
          <dl className="world-shell study__facts-grid">
            <div>
              <dt>Tipo</dt>
              <dd>{project.category}</dd>
            </div>
            <div>
              <dt>Alcance</dt>
              <dd>{project.scope}</dd>
            </div>
            <div>
              <dt>Estado</dt>
              <dd>{project.placeholder ? "Contenido pendiente" : "Publicado y funcionando"}</dd>
            </div>
            <div>
              <dt>Resultado</dt>
              <dd>{project.outcome}</dd>
            </div>
          </dl>
        </section>

        <section className="study__story world-shell">
          <nav className="study__index" aria-label="Recorrido del caso">
            <a href="#contexto">Contexto</a>
            <a href="#desafio">Desafío</a>
            <a href="#enfoque">Enfoque</a>
            <a href="#decisiones">Decisiones</a>
            <a href="#recorrido">Recorrido</a>
            <a href="#galeria">Galería</a>
          </nav>
          <div className="study__chapters">
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
            <article id="decisiones">
              <h2>Las decisiones que sostienen la pieza.</h2>
              <ol className="study__decisions">
                {project.decisions.map((decision, index) => (
                  <li key={decision}>
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <p>{decision}</p>
                  </li>
                ))}
              </ol>
            </article>
            <article id="recorrido">
              <h2>El recorrido de conversión.</h2>
              <ol className="study__journey">
                {project.conversionSteps.map((step, index) => (
                  <li key={`${step}-${index}`}>
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <strong>{step}</strong>
                  </li>
                ))}
              </ol>
            </article>
            <article id="galeria">
              <h2>El proyecto, de cerca.</h2>
              <ul className="study__gallery" aria-label="Galería">
                {gallery.map((label) => (
                  <li key={label}>
                    <span>{label}</span>
                    <small>Captura pendiente</small>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="study__next world-shell">
          <h2>¿Tu negocio necesita algo parecido?</h2>
          <div className="study__actions">
            <Link className="btn btn--moss btn--lg" href="/#agenda">
              {siteContent.hero.primaryCta}
            </Link>
            <a className="btn btn--quiet btn--lg" href={whatsappHref} target="_blank" rel="noreferrer">
              Escribir por WhatsApp
            </a>
          </div>
        </section>
      </main>

      <WorldFooter />
    </div>
  );
}
