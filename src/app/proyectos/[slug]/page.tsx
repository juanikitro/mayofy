import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { IslandNav } from "@/components/world/island-nav";
import { staggerStyle } from "@/components/world/stagger";
import { StudyIndex } from "@/components/world/study-index";
import { WorldFooter } from "@/components/world/world-footer";
import { JsonLd } from "@/components/json-ld";
import { getProject, projects, publishedProjects } from "@/content/projects";
import { siteContent } from "@/content/site";
import { shareMetadata } from "@/lib/share-metadata";
import { projectStructuredData } from "@/lib/structured-data";
import { getWhatsAppHref } from "@/lib/whatsapp";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

/*
 * Placeholder case studies ("Nombre del proyecto 04") are only built in
 * development, to preview the template; production never publishes them, so
 * they cannot be indexed, shared or reached by a stray link (they 404).
 */
export function generateStaticParams() {
  const listed = process.env.NODE_ENV === "production" ? publishedProjects : projects;
  return listed.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const path = `/proyectos/${project.slug}`;
  const capture = project.images[0];
  // The summary alone runs 85-105 characters; the tail fills the snippet Google shows.
  const description = `${project.summary} Caso de Mayofy: qué necesitaba y cómo lo construimos.`;
  return {
    title: project.title,
    description,
    alternates: { canonical: path },
    robots: { index: !project.placeholder, follow: !project.placeholder },
    ...shareMetadata({
      title: `${project.title} — Mayofy`,
      description,
      path,
      type: "article",
      ...(capture
        ? {
            image: {
              url: `/og/proyectos/${project.slug}.jpg`,
              width: 1200,
              height: 630,
              alt: `${project.title}: ${capture.alt}`,
            },
          }
        : {}),
    }),
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
      {project.placeholder ? null : <JsonLd data={projectStructuredData(project)} />}
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <IslandNav />

      <main id="contenido" className="study">
        <header className="study__cover">
          <div className="world-shell study__cover-layout">
            <Link className="study__back" href="/#trabajos">
              <span className="link-arrow link-arrow--back" aria-hidden="true">←</span>{" "}
              <span className="link-label">Volver a trabajos</span>
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
                Visitar sitio <span className="link-arrow link-arrow--out" aria-hidden="true">↗</span>
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
          <StudyIndex />
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
                  <li key={decision} style={staggerStyle(index)}>
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
                  <li key={`${step}-${index}`} style={staggerStyle(index)}>
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
