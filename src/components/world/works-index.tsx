"use client";

/* eslint-disable @next/next/no-img-element -- project screenshots are plain files listed in src/content/projects.ts */
import Link from "next/link";
import { type MouseEvent, useState } from "react";

import { staggerStyle } from "@/components/world/stagger";
import type { ProjectEntry } from "@/content/projects";

/** The host of a project's URL, shown in the preview's address bar. */
function hostOf(url: string | undefined) {
  if (!url) return null;
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return null;
  }
}

/** A placeholder screen in the site's style, until the screenshot exists. */
function PendingShot({ index }: { index: string }) {
  return (
    <span className="works-index__pending" aria-hidden="true">
      <span className="works-index__pending-index">{index}</span>
      <span className="works-index__pending-label">Captura pendiente</span>
    </span>
  );
}

/**
 * Works as an index with a floating preview (option A of
 * docs/plans/2026-11-20-propuestas.md). Hovering or focusing a project shows
 * its screenshot in the browser frame beside the list (a crossfade); on
 * touch screens wide enough to show the preview, the first tap shows it and
 * the second opens the case. Phones show each screenshot above its title.
 * Placeholder projects stay out until they have content.
 */
export function WorksIndex({ projects }: { projects: readonly ProjectEntry[] }) {
  const shown = projects.filter((project) => !project.placeholder);
  const [active, setActive] = useState(0);

  function onCaseClick(event: MouseEvent<HTMLAnchorElement>, index: number) {
    const previewOnTouch = window.matchMedia("(hover: none) and (min-width: 48.01rem)").matches;
    if (previewOnTouch && index !== active) {
      event.preventDefault();
      setActive(index);
    }
  }

  return (
    <div className="works-index">
      <div className="works-index__list-wrap">
        {/* The island body above already says that more cases are coming. */}
        <ol className="works-index__list" aria-label="Proyectos">
          {shown.map((project, index) => {
            const shot = project.images[0];
            return (
              <li
                className="works-index__row"
                key={project.slug}
                data-active={index === active ? "true" : undefined}
                style={staggerStyle(index)}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setActive(index);
                }}
                onFocus={() => setActive(index)}
              >
                <span className="works-index__thumb" aria-hidden="true">
                  {shot ? <img src={shot.src} alt="" width={shot.width} height={shot.height} loading="lazy" decoding="async" /> : <PendingShot index={project.index} />}
                </span>
                <span className="works-index__number" aria-hidden="true">
                  {project.index}
                </span>
                <div className="works-index__text">
                  <h3>
                    <Link className="works-index__case" href={`/proyectos/${project.slug}`} onClick={(event) => onCaseClick(event, index)}>
                      {project.title}
                    </Link>
                  </h3>
                  <p className="works-index__meta">
                    <span>{project.category}</span>
                    {project.url ? (
                      <a className="works-index__site" href={project.url} target="_blank" rel="noreferrer">
                        <span className="link-label">Visitar sitio</span>{" "}
                        <span className="link-arrow link-arrow--out" aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    ) : null}
                  </p>
                </div>
                <span className="works-index__go" aria-hidden="true">
                  →
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="works-index__preview" aria-hidden="true">
        <div className="works-index__browser">
          <div className="works-index__bar">
            <i />
            <i />
            <i />
            <span className="works-index__url">
              {shown.map((project, index) => (
                <span key={project.slug} data-active={index === active ? "true" : undefined}>
                  {hostOf(project.url) ?? project.title}
                </span>
              ))}
            </span>
          </div>
          <div className="works-index__screen">
            {shown.map((project, index) => {
              const shot = project.images[0];
              return (
                <span className="works-index__shot" key={project.slug} data-active={index === active ? "true" : undefined}>
                  {shot ? <img src={shot.src} alt="" width={shot.width} height={shot.height} decoding="async" /> : <PendingShot index={project.index} />}
                </span>
              );
            })}
          </div>
        </div>
        <div className="works-index__phone">
          {shown.map((project, index) => (
            <span className="works-index__shot" key={project.slug} data-active={index === active ? "true" : undefined}>
              {project.phoneImage ? (
                <img src={project.phoneImage.src} alt="" width={project.phoneImage.width} height={project.phoneImage.height} decoding="async" />
              ) : (
                <PendingShot index={project.index} />
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
