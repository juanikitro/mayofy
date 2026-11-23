/* eslint-disable @next/next/no-img-element -- the decor and the other cases' thumbnails are pre-sized files */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CaseShot } from "@/components/world/case-shot";
import { IslandNav } from "@/components/world/island-nav";
import { staggerStyle } from "@/components/world/stagger";
import { WorldFooter } from "@/components/world/world-footer";
import { JsonLd } from "@/components/json-ld";
import { commercialPlans } from "@/content/commercial-plans";
import { type ProjectEntry, getProject, projects, publishedProjects } from "@/content/projects";
import { siteContent } from "@/content/site";
import { shareMetadata } from "@/lib/share-metadata";
import { projectStructuredData } from "@/lib/structured-data";
import { getWhatsAppHref } from "@/lib/whatsapp";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

/*
 * Draft cases (`placeholder: true`) are only built in development, to preview
 * them; production never publishes them, so they cannot be indexed, shared or
 * reached by a stray link (they 404).
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
  const description = `${project.summary} Un caso de Mayofy, con capturas reales.`;
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
      image: {
        url: `/og/proyectos/${project.slug}.jpg`,
        width: 1200,
        height: 630,
        alt: `${project.title}: ${project.cover.alt}`,
      },
    }),
  };
}

/** The headline with its accent words set in the serif italic. */
function Headline({ text, accent }: { text: string; accent: string }) {
  const at = text.indexOf(accent);
  if (at === -1) return <h1 id="caso-titulo">{text}</h1>;
  return (
    <h1 id="caso-titulo">
      {text.slice(0, at)}
      <em>{accent}</em>
      {text.slice(at + accent.length)}
    </h1>
  );
}

function hostOf(url: string | undefined) {
  if (!url) return null;
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return null;
  }
}

/*
 * Case-study template (docs/plans/2026-11-23-casos.md). Every case follows
 * the same path, with the real product shown big: cover with the main
 * capture → facts → where it started → what was built, capture by capture →
 * decisions → result → the matching pack, the next step and the other cases.
 * The content lives in src/content/projects.ts.
 */
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { before, result }: Pick<ProjectEntry, "before" | "result"> = project;
  const host = hostOf(project.url);
  const plan = commercialPlans.find((candidate) => candidate.id === project.pack);
  const others = (process.env.NODE_ENV === "production" ? publishedProjects : projects).filter((other) => other.slug !== project.slug);
  const whatsappHref = getWhatsAppHref(`Hola Juani, vi el caso ${project.title} y quiero contarte sobre mi negocio.`);

  return (
    <div className="world">
      {project.placeholder ? null : <JsonLd data={projectStructuredData(project)} />}
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <IslandNav />

      <main id="contenido" className="caso-study">
        <header className="caso-cover" aria-labelledby="caso-titulo">
          <div className="caso-cover__decor" aria-hidden="true">
            <picture className="caso-cover__cloud caso-cover__cloud--a">
              <source type="image/avif" srcSet="/images/mundo-mayo/62-nube-suelta-1.avif" />
              <img src="/images/mundo-mayo/62-nube-suelta-1.webp" alt="" width={812} height={471} decoding="async" />
            </picture>
            <picture className="caso-cover__cloud caso-cover__cloud--b">
              <source type="image/avif" srcSet="/images/mundo-mayo/62-nube-suelta-3.avif" />
              <img src="/images/mundo-mayo/62-nube-suelta-3.webp" alt="" width={1024} height={813} decoding="async" />
            </picture>
          </div>

          <div className="world-shell caso-cover__text">
            <Link className="caso-back" href="/#trabajos">
              <span className="link-arrow link-arrow--back" aria-hidden="true">←</span>{" "}
              <span className="link-label">Volver a trabajos</span>
            </Link>
            <p className="caso-eyebrow">Caso · {project.category}</p>
            <Headline text={project.headline} accent={project.accent} />
            <p className="caso-cover__intro">{project.intro}</p>
            {project.url ? (
              <a className="btn btn--moss" href={project.url} target="_blank" rel="noreferrer">
                Visitar {host} <span className="link-arrow link-arrow--out" aria-hidden="true">↗</span>
              </a>
            ) : null}
          </div>

          <div className="world-shell caso-cover__stage">
            <picture className="caso-cover__rock">
              <source type="image/avif" srcSet="/images/mundo-mayo/20-roca-suelta-1.avif" />
              <img src="/images/mundo-mayo/20-roca-suelta-1.webp" alt="" width={861} height={699} decoding="async" />
            </picture>
            <div className="caso-cover__shot">
              <CaseShot shot={project.cover} sizes="(min-width: 90rem) 76rem, (min-width: 48rem) 88vw, 100vw" priority />
            </div>
          </div>
        </header>

        <section className="world-shell caso-facts" aria-label="Ficha del proyecto">
          <dl>
            {project.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={`world-shell caso-before${before.changes ? "" : " caso-before--solo"}`} aria-labelledby="punto-de-partida">
          <div className="caso-before__copy">
            <p className="caso-eyebrow">El punto de partida</p>
            <h2 id="punto-de-partida">{before.title}</h2>
            {before.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {before.changes ? (
            <table className="caso-changes">
              <thead>
                <tr>
                  <th scope="col">Antes</th>
                  <th scope="col">Ahora</th>
                </tr>
              </thead>
              <tbody>
                {before.changes.map((change) => (
                  <tr key={change.before}>
                    <td>{change.before}</td>
                    <td>{change.now}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </section>

        <section className="caso-build" aria-labelledby="lo-que-hice">
          <div className="world-shell caso-build__head">
            <p className="caso-eyebrow">Lo que hice</p>
            <h2 id="lo-que-hice">Pantalla por pantalla.</h2>
          </div>
          <div className="world-shell caso-build__list">
            {project.features.map((feature) => (
              <article key={feature.title} className={`caso-feature caso-feature--${feature.shot.device}`}>
                <div className="caso-feature__shot">
                  <CaseShot
                    shot={feature.shot}
                    sizes={feature.shot.device === "phone" ? "(min-width: 48rem) 18rem, 70vw" : "(min-width: 90rem) 48rem, (min-width: 48rem) 56vw, 100vw"}
                  />
                </div>
                <div className="caso-feature__copy">
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="world-shell caso-decisions" aria-labelledby="decisiones">
          <p className="caso-eyebrow">Decisiones</p>
          <h2 id="decisiones">Por qué está hecho así.</h2>
          <ul>
            {project.decisions.map((decision, index) => (
              <li key={decision.title} style={staggerStyle(index)}>
                <h3>{decision.title}</h3>
                <p>{decision.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="caso-result" aria-labelledby="resultado">
          <div className="world-shell caso-result__inner">
            <p className="caso-eyebrow">Resultado</p>
            <h2 id="resultado">{result.title}</h2>
            {result.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {result.quote ? (
              <figure className="caso-quote">
                <blockquote>
                  <p>{result.quote.text}</p>
                </blockquote>
                <figcaption>
                  <strong>{result.quote.author}</strong>, {result.quote.role}
                </figcaption>
              </figure>
            ) : null}
          </div>
        </section>

        <section className="caso-next" aria-labelledby="siguiente-paso">
          <div className="world-shell caso-next__inner">
            <div className="caso-next__offer">
              <h2 id="siguiente-paso">¿Tu negocio necesita algo parecido?</h2>
              {plan ? (
                <p>
                  Un trabajo así entra en el pack <strong>{plan.name}</strong>: desde {plan.price}, en {plan.timeline}.{" "}
                  <Link href="/#packs">Ver los packs</Link>
                </p>
              ) : null}
              <div className="caso-next__actions">
                <Link className="btn btn--moss btn--lg" href="/#agenda">
                  {siteContent.hero.primaryCta}
                </Link>
                <a className="btn btn--quiet btn--lg" href={whatsappHref} target="_blank" rel="noreferrer">
                  Escribir por WhatsApp
                </a>
              </div>
            </div>
            {others.length ? (
              <nav className="caso-others" aria-labelledby="otros-casos">
                <h2 id="otros-casos">Otros casos</h2>
                <ul>
                  {others.map((other) => (
                    <li key={other.slug}>
                      <Link href={`/proyectos/${other.slug}`}>
                        <span className="caso-others__thumb">
                          <img src={`${other.cover.src}-800.webp`} alt="" width={other.cover.width} height={other.cover.height} loading="lazy" decoding="async" />
                        </span>
                        <span className="caso-others__text">
                          <small>{other.category}</small>
                          <strong>{other.title}</strong>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>
        </section>
      </main>

      <WorldFooter />
    </div>
  );
}
