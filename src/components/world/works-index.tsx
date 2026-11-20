"use client";

/* eslint-disable @next/next/no-img-element -- project screenshots are plain files listed in src/content/projects.ts */
import Link from "next/link";
import { type FocusEvent, type MouseEvent, useEffect, useRef, useState } from "react";

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
 * docs/plans/2026-11-20-propuestas.md). Every 5 s the next project takes the
 * preview (a crossfade), with a bar filling under its row to mark the time.
 * Hovering or focusing a project selects it and holds the count at zero
 * until the pointer or focus leaves the index, when it starts again. The
 * count stops off screen, in a hidden tab and with the pause button; under
 * reduced motion and on phones (no preview there: each row carries its
 * screenshot) nothing advances by itself. On touch screens wide enough to
 * show the preview, the first tap shows it and the second opens the case.
 * Placeholder projects stay out until they have content.
 */
export function WorksIndex({ projects }: { projects: readonly ProjectEntry[] }) {
  const shown = projects.filter((project) => !project.placeholder);
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [hold, setHold] = useState(false);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabShown, setTabShown] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const running = allowed && visible && tabShown && !paused && !hold;

  useEffect(() => {
    const root = rootRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 48.01rem)");
    const onMedia = () => setAllowed(wide.matches && !motion.matches && document.documentElement.dataset.motionTier !== "reduced");
    const onTab = () => setTabShown(!document.hidden);
    onMedia();
    onTab();
    motion.addEventListener("change", onMedia);
    wide.addEventListener("change", onMedia);
    document.addEventListener("visibilitychange", onTab);
    const observer = root && "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 }) : null;
    if (root && observer) observer.observe(root);
    return () => {
      motion.removeEventListener("change", onMedia);
      wide.removeEventListener("change", onMedia);
      document.removeEventListener("visibilitychange", onTab);
      observer?.disconnect();
    };
  }, []);

  /** Selects a project and starts its 5 s count from zero. */
  function select(index: number) {
    setActive(index);
    setCycle((value) => value + 1);
  }

  function advance() {
    setActive((value) => (value + 1) % shown.length);
    setCycle((value) => value + 1);
  }

  function release() {
    setHold(false);
    setCycle((value) => value + 1);
  }

  function onBlurIndex(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) release();
  }

  function onCaseClick(event: MouseEvent<HTMLAnchorElement>, index: number) {
    const previewOnTouch = window.matchMedia("(hover: none) and (min-width: 48.01rem)").matches;
    if (previewOnTouch && index !== active) {
      event.preventDefault();
      select(index);
    }
  }

  return (
    <div
      className="works-index"
      ref={rootRef}
      data-autoplay={allowed ? "true" : undefined}
      data-running={running ? "true" : undefined}
      data-hold={hold ? "true" : undefined}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHold(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") release();
      }}
      onFocus={() => setHold(true)}
      onBlur={onBlurIndex}
    >
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
                  if (event.pointerType === "mouse" && index !== active) select(index);
                }}
                onFocus={() => {
                  if (index !== active) select(index);
                }}
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
                {allowed && index === active ? (
                  <span className="works-index__progress" key={`${active}-${cycle}`} aria-hidden="true" onAnimationEnd={advance} />
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="works-index__preview">
        <div className="works-index__float" aria-hidden="true">
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
        {allowed ? (
          <button
            className="motion-toggle works-index__toggle"
            type="button"
            aria-pressed={paused}
            aria-label="Pausar el recorrido de trabajos"
            onClick={() => setPaused((value) => !value)}
          >
            <span className={`motion-toggle__glyph${paused ? " motion-toggle__glyph--play" : ""}`} aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
