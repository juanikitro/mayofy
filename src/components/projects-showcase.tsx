import Link from "next/link";

import { AnimatedDetails } from "@/components/animated-details";
import { ProjectVisual } from "@/components/project-visual";
import { type ProjectEntry, projects } from "@/content/projects";

const featuredProjects: readonly ProjectEntry[] = projects.slice(0, 3);
const additionalProjects = projects.slice(3);

export function ProjectsShowcase() {
  return (
    <section id="trabajos" className="projects kinetic-section">
      <div className="page-shell">
        <header className="projects__intro" data-reveal>
          <div>
            <p>Trabajos seleccionados</p>
            <h2>Primero, el trabajo.</h2>
          </div>
          <p>
            Un sistema a medida, una landing y una web personal, publicados y
            funcionando. Los casos completos se suman a medida que avanzan.
          </p>
        </header>

        <div className="projects__featured">
          {featuredProjects.map((project) => (
            <article
              className={`project-portal project-portal--${project.layout}`}
              key={project.slug}
            >
              <div className="project-portal__visual">
                <ProjectVisual label={project.title} variant={project.visual} />
              </div>
              <div className="project-portal__copy">
                <p className="project-placeholder">
                  {project.placeholder ? "Placeholder de contenido" : project.category}
                </p>
                <div className="project-portal__heading">
                  <span>{project.index}</span>
                  <h3>{project.title}</h3>
                </div>
                <p>{project.summary}</p>
                <dl>
                  <div>
                    <dt>Tipo</dt>
                    <dd>{project.category}</dd>
                  </div>
                  <div>
                    <dt>Alcance</dt>
                    <dd>{project.scope}</dd>
                  </div>
                </dl>
                {project.url ? (
                  <a
                    className="project-link"
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visitar sitio <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <Link className="project-link" href={`/proyectos/${project.slug}`}>
                    Ver detalle <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>

        <AnimatedDetails
          className="projects-more"
          summary={
            <>
              <span>Ver más proyectos</span>
              <small>{additionalProjects.length} adicionales</small>
            </>
          }
        >
          <div className="projects-more__list">
            {additionalProjects.map((project) => (
              <article className="project-index" key={project.slug}>
                <span>{project.index}</span>
                <div>
                  <p className="project-placeholder">Placeholder</p>
                  <h3>{project.title}</h3>
                </div>
                <p>{project.summary}</p>
                <Link className="project-link" href={`/proyectos/${project.slug}`}>
                  Ver detalle <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </AnimatedDetails>
      </div>
    </section>
  );
}
