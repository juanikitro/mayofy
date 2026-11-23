"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode, type RefObject } from "react";

import { staggerStyle } from "@/components/world/stagger";

/**
 * The seven islands of the story, in page order. `short` is the word the
 * pill shows; `label` is the plain name the section list uses.
 */
const sections = [
  { id: "inicio", short: "Inicio", label: "Inicio" },
  { id: "problema", short: "Qué hacemos", label: "Qué hacemos" },
  { id: "packs", short: "Packs", label: "Packs y precios" },
  { id: "sistemas", short: "Sistemas", label: "Sistemas a medida" },
  { id: "trabajos", short: "Trabajos", label: "Trabajos" },
  { id: "contacto", short: "Quién soy", label: "Quién soy y agenda" },
  { id: "preguntas", short: "Preguntas", label: "Preguntas frecuentes" },
] as const;

type SectionId = (typeof sections)[number]["id"];

/** Anchors that belong to an island without being one in the list. */
const sectionOf: Record<string, SectionId> = { "packs-detalle": "packs" };

const observedIds = ["inicio", "problema", "packs", "packs-detalle", "sistemas", "trabajos", "contacto", "preguntas"];

/** The island whose top has passed this share of the screen is the current one. */
const readingLine = 0.35;

/**
 * Where the reader is: the current island (by which section has crossed
 * the reading line) and how far down the page they are, written as
 * `--story` (0 to 1) on the nav so the progress line follows the scroll
 * without a React render per frame. Only the home page has islands.
 */
function useStoryPosition(enabled: boolean, navRef: RefObject<HTMLElement | null>) {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const anchors = observedIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (anchors.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * readingLine;
      let current = anchors[0].id;
      for (const anchor of anchors) {
        if (anchor.getBoundingClientRect().top <= line) current = anchor.id;
      }
      setActive((sectionOf[current] ?? current) as SectionId);
      const room = document.documentElement.scrollHeight - window.innerHeight;
      const story = room > 0 ? Math.min(1, Math.max(0, window.scrollY / room)) : 0;
      navRef.current?.style.setProperty("--story", story.toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [enabled, navRef]);

  return active;
}

/**
 * On the home page a plain `#id` link (HashLinkHistory keeps Back working);
 * on any other route a router link to the island on the home page.
 */
function NavLink({ onHome, id, className, current, onClick, children }: {
  onHome: boolean;
  id: string;
  className: string;
  current?: boolean;
  onClick?: () => void;
  children: ReactNode;
}) {
  const shared = { className, onClick, "aria-current": current ? ("location" as const) : undefined };
  return onHome ? (
    <a href={`#${id}`} {...shared}>
      {children}
    </a>
  ) : (
    <Link href={`/#${id}`} {...shared}>
      {children}
    </Link>
  );
}

function Chevron() {
  return (
    <svg className="island-nav__chevron" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

/**
 * Floating pill navigation (decision 15, round 11). It carries what the paw
 * rail used to: where the reader is in the story and a jump to every island.
 *
 * - Wide screens: Mayofy, the six islands and "Agendá". A soft moss chip
 *   glides behind the island in view and a hairline along the pill's lower
 *   edge fills as the page goes by.
 * - Phones and tablets: Mayofy, a button with the current island's number
 *   and name, and "Agendá". The button opens the full list of islands under
 *   the pill; Escape, a tap outside, leaving it with Tab or choosing an
 *   island closes it, and Escape returns focus to the button.
 */
export function IslandNav() {
  const onHome = usePathname() === "/";
  const navRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const active = useStoryPosition(onHome, navRef);

  const activeIndex = active ? sections.findIndex((section) => section.id === active) : -1;
  const current = activeIndex >= 0 ? sections[activeIndex] : null;

  // The glow chip sits on the link of the island in view; it is measured,
  // not computed, so it follows the real word widths at every size.
  useLayoutEffect(() => {
    const track = trackRef.current;
    const glow = glowRef.current;
    if (!track || !glow) return;
    const place = () => {
      const link = active ? track.querySelector<HTMLElement>(`[data-section="${active}"]`) : null;
      if (!link) {
        glow.removeAttribute("data-on");
        return;
      }
      glow.style.setProperty("--glow-x", `${link.offsetLeft}px`);
      glow.style.setProperty("--glow-w", `${link.offsetWidth}px`);
      glow.setAttribute("data-on", "");
    };
    place();
    const resize = new ResizeObserver(place);
    resize.observe(track);
    return () => resize.disconnect();
  }, [active]);

  useEffect(() => {
    if (!open) return;
    const nav = navRef.current;
    const first = sheetRef.current?.querySelector<HTMLElement>('[aria-current="location"]') ?? sheetRef.current?.querySelector<HTMLElement>("a");
    first?.focus({ preventScroll: true });

    const onPointerDown = (event: PointerEvent) => {
      if (nav && !nav.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  /** Up and down arrows, Home and End move through the list. */
  const onSheetKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(sheetRef.current?.querySelectorAll<HTMLElement>("a") ?? []);
    const index = items.indexOf(document.activeElement as HTMLElement);
    const next = { ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: items.length - 1 }[event.key];
    if (next === undefined || items.length === 0) return;
    event.preventDefault();
    items[(next + items.length) % items.length].focus();
  };

  const close = () => setOpen(false);

  return (
    <header className="island-nav-wrap">
      <nav
        ref={navRef}
        className="island-nav"
        aria-label="Navegación principal"
        data-story={onHome ? "" : undefined}
        data-open={open ? "" : undefined}
        onBlur={(event) => {
          if (open && !event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
        }}
      >
        <span className="island-nav__glass" aria-hidden="true" />

        <NavLink onHome={onHome} id="inicio" className="island-nav__brand" onClick={close}>
          Mayofy
        </NavLink>

        <div className="island-nav__track" ref={trackRef}>
          <span className="island-nav__glow" ref={glowRef} aria-hidden="true" />
          <ul className="island-nav__links">
            {sections.slice(1).map((section) => (
              <li key={section.id} data-section={section.id}>
                <NavLink onHome={onHome} id={section.id} className="island-nav__link" current={active === section.id}>
                  {section.short}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="island-nav__where"
          aria-expanded={open}
          aria-controls="island-nav-sheet"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="island-nav__sr">Secciones. {current ? "Estás en: " : ""}</span>
          {current ? (
            <span className="island-nav__step" aria-hidden="true">
              {activeIndex + 1}
            </span>
          ) : null}
          <span className="island-nav__where-label">{current ? current.short : "Secciones"}</span>
          <Chevron />
        </button>

        <NavLink onHome={onHome} id="agenda" className="btn btn--moss island-nav__cta" onClick={close}>
          Agendá
        </NavLink>

        <span className="island-nav__story" aria-hidden="true" />

        <div
          ref={sheetRef}
          id="island-nav-sheet"
          className="island-nav__sheet"
          inert={!open}
          onKeyDown={onSheetKeyDown}
        >
          <p className="island-nav__sheet-head">
            <span>El recorrido</span>
            {current ? (
              <span className="island-nav__sheet-count">
                {activeIndex + 1} de {sections.length}
              </span>
            ) : null}
          </p>
          <ol className="island-nav__items">
            {sections.map((section, index) => (
              <li key={section.id} style={staggerStyle(index)}>
                <NavLink
                  onHome={onHome}
                  id={section.id}
                  className="island-nav__item"
                  current={active === section.id}
                  onClick={close}
                >
                  <span
                    className="island-nav__item-step"
                    aria-hidden="true"
                    data-passed={activeIndex > index ? "" : undefined}
                  >
                    {index + 1}
                  </span>
                  <span className="island-nav__item-label">{section.label}</span>
                  {active === section.id ? (
                    <span className="island-nav__here" aria-hidden="true">
                      Estás acá
                    </span>
                  ) : null}
                </NavLink>
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </header>
  );
}
