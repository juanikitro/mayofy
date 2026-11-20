"use client";

/* eslint-disable @next/next/no-img-element -- project screenshots are dropped in as plain files; next/image would need sizes per card */
import { type KeyboardEvent, useEffect, useRef, useState } from "react";

import type { ProjectImage } from "@/content/projects";

/** Slides shown while a project has no screenshots yet. */
const placeholderSlides = 3;

/**
 * The image strip of a work card: a native horizontal scroller with snap
 * points (swipe on touch, trackpad and arrow keys when focused), arrows and
 * dots. It never moves by itself. With no images it shows placeholder slides
 * in the site's style; with one image it shows no controls.
 */
export function WorkCarousel({ images, title, index }: { images: readonly ProjectImage[]; title: string; index: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const count = images.length > 0 ? images.length : placeholderSlides;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setCurrent(Math.round(track.scrollLeft / Math.max(1, track.clientWidth)));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  function goTo(slide: number) {
    const track = trackRef.current;
    if (!track) return;
    const target = Math.min(count - 1, Math.max(0, slide));
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: target * track.clientWidth, behavior: smooth ? "smooth" : "instant" });
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(current + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(current - 1);
    }
  }

  return (
    <div className="carousel" role="region" aria-roledescription="carrusel" aria-label={`Imágenes de ${title}`}>
      <div className="carousel__track" ref={trackRef} tabIndex={0} onKeyDown={onKeyDown}>
        {Array.from({ length: count }, (_, slide) => {
          const image = images[slide];
          return (
            <div
              className="carousel__slide"
              key={image?.src ?? slide}
              role="group"
              aria-roledescription="imagen"
              aria-label={`${slide + 1} de ${count}`}
            >
              {image ? (
                <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />
              ) : (
                <div className="carousel__placeholder" role="img" aria-label="Captura pendiente">
                  <span className="carousel__placeholder-index" aria-hidden="true">
                    {index}
                  </span>
                  <span className="carousel__placeholder-label" aria-hidden="true">
                    Captura pendiente
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {count > 1 ? (
        <div className="carousel__controls">
          <button className="carousel__arrow" type="button" aria-label="Imagen anterior" disabled={current === 0} onClick={() => goTo(current - 1)}>
            <span aria-hidden="true">←</span>
          </button>
          <div className="carousel__dots">
            {Array.from({ length: count }, (_, slide) => (
              <button
                className="carousel__dot"
                type="button"
                key={slide}
                aria-label={`Ver imagen ${slide + 1}`}
                aria-current={slide === current ? "true" : undefined}
                onClick={() => goTo(slide)}
              />
            ))}
          </div>
          <button className="carousel__arrow" type="button" aria-label="Imagen siguiente" disabled={current === count - 1} onClick={() => goTo(current + 1)}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
