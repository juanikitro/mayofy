"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

import { guarantees } from "@/content/commercial-plans";

type SealIcon = (typeof guarantees.seals)[number]["icon"];

/*
 * One icon set for the seals: 24px grid, 1.7px round strokes in the seal's
 * ink, one moving part each (`gi__move`), drawn at rest in its final state so
 * the strip reads the same with no script and under reduced motion.
 */
const icons: Record<SealIcon, ReactNode> = {
  // A phone with a bolt that charges in.
  speed: (
    <>
      <rect x="7" y="2.75" width="10" height="18.5" rx="2.4" />
      <path d="M10.5 18.25h3" />
      <path className="gi__move gi__fill" d="M12.9 6.6 9.9 12h2.5l-.9 4.4 3.1-5.6h-2.5z" />
    </>
  ),
  // A key that turns in its lock.
  ownership: (
    <g className="gi__move">
      <circle cx="7.6" cy="12" r="3.6" />
      <path d="M11.2 12H20.5M17.2 12v3M19.8 12v2.2" />
    </g>
  ),
  // A clock whose minute hand sweeps a full turn.
  reply: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 12V7.6" />
      <path className="gi__move" d="M12 12l3.4 2" />
    </>
  ),
  // A magnifier over a rising line.
  seo: (
    <>
      <circle cx="10.4" cy="10.4" r="6" />
      <path d="M14.8 14.8 20.4 20.4" />
      <path className="gi__move gi__draw" d="M7.4 12.2l1.9-2 1.6 1.3 2.3-2.8" pathLength={1} />
    </>
  ),
  // A screen with a phone sliding in beside it.
  screens: (
    <>
      <rect x="2.75" y="4.5" width="13.5" height="10" rx="1.6" />
      <path d="M7 18.5h5M9.5 14.5v4" />
      <rect className="gi__move gi__cover" x="15" y="9" width="6.25" height="11" rx="1.5" />
    </>
  ),
  // A calendar with a beating heart: a week of support.
  support: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.2" />
      <path d="M8 3v3.5M16 3v3.5M3.5 9.5h17" />
      <path className="gi__move gi__fill" d="M12 18s-3.1-1.9-3.1-3.9a1.6 1.6 0 0 1 3.1-.7 1.6 1.6 0 0 1 3.1.7C15.1 16.1 12 18 12 18z" />
    </>
  ),
  // Two arrows chasing each other: agreed revision rounds.
  revisions: (
    <g className="gi__move">
      <path d="M19 12a7 7 0 0 1-12.1 4.8" />
      <path d="M5 12a7 7 0 0 1 12.1-4.8" />
      <path d="M17.6 3.9v3.4h-3.4M6.4 20.1v-3.4h3.4" />
    </g>
  ),
};

/** One icon plays every this many milliseconds, in turn. */
const cadence = 1000;

/**
 * The guarantees as one strip under the pack cards (option B of
 * docs/plans/2026-11-20-propuestas.md), the speed guarantee first and every
 * seal alike. While the strip is on screen, one icon plays its small motion
 * every second, in turn. It stops off screen, in a hidden tab and under
 * reduced motion. (No pause button, at the client's request.)
 */
export function GuaranteesStrip() {
  const listRef = useRef<HTMLUListElement>(null);
  const [visible, setVisible] = useState(false);
  const [tabShown, setTabShown] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(-1);
  const running = visible && tabShown && !reduced;

  useEffect(() => {
    const list = listRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReduced(motion.matches || document.documentElement.dataset.motionTier === "reduced");
    const onTab = () => setTabShown(!document.hidden);
    onMotion();
    onTab();
    motion.addEventListener("change", onMotion);
    document.addEventListener("visibilitychange", onTab);
    const observer = list && "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.5 }) : null;
    if (list && observer) observer.observe(list);
    return () => {
      motion.removeEventListener("change", onMotion);
      document.removeEventListener("visibilitychange", onTab);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const count = guarantees.seals.length;
    const next = () => setPlaying((current) => (current + 1) % count);
    // The first icon plays shortly after the strip settles on screen.
    const first = window.setTimeout(next, 400);
    const timer = window.setInterval(next, cadence);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(timer);
    };
  }, [running]);

  return (
    <section className="guarantees" aria-labelledby="garantias-title">
      <h3 id="garantias-title">{guarantees.stripTitle}</h3>
      <ul className="guarantees__seals" ref={listRef}>
        {guarantees.seals.map((seal, index) => (
          <li className={`seal seal--${seal.icon}`} key={seal.icon} data-playing={running && index === playing ? "true" : undefined}>
            <span className="seal__badge" aria-hidden="true">
              <svg className="gi" viewBox="0 0 24 24" focusable="false">
                {icons[seal.icon]}
              </svg>
            </span>
            {seal.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
