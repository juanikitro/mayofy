import Link from "next/link";

import { AnimatedDetails } from "@/components/animated-details";
import { ProjectVisual } from "@/components/project-visual";
import { projects } from "@/content/projects";

const featuredProjects = projects.slice(0, 3);
const additionalProjects = projects.slice(3);

export function ProjectsShowcase() {
  return (
    <section id="trabajos" className="projects kinetic-section">
      <div className="page-shell">
        <header className="projects__intro" data-reveal>
          <div>
            <p>Selección provisional · 03 visibles de 06</p>
            <h2>Primero, el trabajo.</h2>
          </div>
          <p>
            Esta estructura está lista para recibir casos reales. Por ahora, cada
            entrada señala con claridad qué contenido falta reemplazar.
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
                <p className="project-placeholder">Placeholder de contenido</p>
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
                <Link className="project-link" href={`/proyectos/${project.slug}`}>
                  Ver detalle <span aria-hidden="true">→</span>
                </Link>
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
