"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

const PHONE = "(max-width: 48rem)";

const reducedMotion = () =>
  document.documentElement.dataset.motionTier === "reduced" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * The three pack cards. From tablet up they are the plain grid of
 * `.packs__grid`; on phones (Juani, 24 November 2026: "En mobile, quiero que
 * los packs se hagan con un carrusel (infinito)") the grid becomes a
 * horizontal scroll-snap row with one card centred and its neighbours
 * peeking, and this component makes it endless and adds the controls:
 *
 * - PackDetails renders `clones` inert copies of the last cards before
 *   the real ones and of the first cards after them. When a swipe or an arrow
 *   comes to rest on a copy, the row jumps, without animation, to the real
 *   card it copies, so the row loops both ways. `scroll-snap-stop: always`
 *   keeps a fling to one card, so it never runs past the copies.
 * - Arrows and one dot per pack; the current dot carries `aria-current`.
 *   The highlight over the dots follows the row's scroll position frame by
 *   frame (Juani, 24 November: "mejora la animacion de movimiento del
 *   packs__dots"): between two cards it stretches towards the next dot and
 *   then lets go of the last one; at the loop's seam it slides out past one
 *   end while a copy slides in at the other, so the jump from a copy to its
 *   real card never shows. It has no timing of its own, so with reduced motion
 *   (instant scrolls) it moves at once.
 * - A card that takes focus (Tab, island 3's markers) or a `#pack-<id>` link
 *   (island 2's recommendation, the workshop link, a shared URL) centres that
 *   card. Vertical page scrolling is untouched: the row scrolls only sideways
 *   and the browser locks each touch to one axis.
 */
export function PackCarousel({
  labels,
  clones,
  children,
}: {
  labels: readonly string[];
  /** How many copies PackDetails renders on each side of the real cards. */
  clones: number;
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // Filled by the effect: the buttons call into the same state as the swipes.
  const controls = useRef<{ go: (plan: number) => void; step: (direction: 1 | -1) => void }>({ go: () => {}, step: () => {} });
  const count = labels.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const phone = window.matchMedia(PHONE);
    const slides = () => [...track.children] as HTMLElement[];
    const planOf = (index: number) => (((index - clones) % count) + count) % count;
    const realIndex = (plan: number) => plan + clones;
    const isClone = (index: number) => index < clones || index >= clones + count;

    const leftOf = (slide: HTMLElement) => slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2;
    /** The slide whose centre is nearest the row's centre. */
    const nearest = () => {
      const centre = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let distance = Infinity;
      slides().forEach((slide, index) => {
        const d = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - centre);
        if (d < distance) [best, distance] = [index, d];
      });
      return best;
    };

    let current = -1;
    const mark = (plan: number) => {
      if (plan === current) return;
      current = plan;
      setActive(plan);
      // Copies and their real card share the highlight, so the jump between them never flickers.
      slides().forEach((slide, index) => slide.classList.toggle("is-current", planOf(index) === plan));
    };

    const scrollToIndex = (index: number, smooth: boolean) => {
      const slide = slides()[index];
      if (slide) track.scrollTo({ left: leftOf(slide), behavior: smooth ? "smooth" : "instant" });
    };
    const go = (plan: number, smooth = true) => {
      if (!phone.matches) return;
      mark(((plan % count) + count) % count);
      scrollToIndex(realIndex(current), smooth && !reducedMotion());
    };
    /** One card along, through the copy on the far side when the row wraps. */
    const step = (direction: 1 | -1) => {
      if (!phone.matches) return;
      const from = nearest();
      const to = from + direction;
      if (reducedMotion() || to < 0 || to >= slides().length) {
        go(planOf(from) + direction, false);
        return;
      }
      mark(planOf(to));
      scrollToIndex(to, true);
    };
    controls.current = { go, step };

    const dots = track.parentElement?.querySelector<HTMLElement>(".packs__dots");
    const worms = [...(dots?.querySelectorAll<HTMLElement>(".packs__worm") ?? [])];
    const smoothstep = (t: number) => t * t * (3 - 2 * t);
    /** Moves the highlight to the row's position, in dots (0 on the first real card). */
    const paint = () => {
      const all = slides();
      if (!phone.matches || !dots || all.length < 2) return;
      const pitch = all[1].offsetLeft - all[0].offsetLeft;
      const centre = track.scrollLeft + track.clientWidth / 2;
      const position = (centre - (all[0].offsetLeft + all[0].offsetWidth / 2)) / pitch - clones;
      const slot = dots.clientWidth / count;
      const pill = slot * 0.7;
      // One highlight per lap (the previous, this and the next); the dots' box clips the ones outside it.
      worms.forEach((worm, lap) => {
        const at = position + (lap - 1) * count;
        const from = Math.floor(at);
        const t = at - from;
        const tail = from + smoothstep(Math.max(0, 2 * t - 1));
        const head = from + smoothstep(Math.min(1, 2 * t));
        const left = (tail + 0.5) * slot - pill / 2;
        worm.style.transform = `translateX(${left}px)`;
        worm.style.width = `${(head - tail) * slot + pill}px`;
      });
    };

    let touching = false;
    /** At rest on a copy: stand on the real card instead, without animation. */
    const settle = () => {
      if (!phone.matches || touching) return;
      const index = nearest();
      if (isClone(index)) scrollToIndex(realIndex(planOf(index)), false);
    };

    let frame = 0;
    let idle = 0;
    const hasScrollEnd = "onscrollend" in window;
    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          if (!phone.matches) return;
          mark(planOf(nearest()));
          paint();
        });
      }
      if (!hasScrollEnd) {
        window.clearTimeout(idle);
        idle = window.setTimeout(settle, 160);
      }
    };
    const onTouchStart = () => {
      touching = true;
    };
    const onTouchEnd = () => {
      touching = false;
      if (!hasScrollEnd) {
        window.clearTimeout(idle);
        idle = window.setTimeout(settle, 160);
      }
    };

    const planOfHash = (hash: string) => {
      if (!hash.startsWith("#pack-")) return -1;
      const card = document.getElementById(hash.slice(1));
      const index = card ? slides().indexOf(card) : -1;
      return index >= 0 ? planOf(index) : -1;
    };
    const onFocusIn = (event: FocusEvent) => {
      const index = slides().findIndex((slide) => slide.contains(event.target as Node));
      if (index >= 0 && !isClone(index) && planOf(index) !== planOf(nearest())) go(planOf(index));
    };
    const onLinkClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="#pack-"]');
      const plan = link ? planOfHash(link.getAttribute("href") ?? "") : -1;
      if (plan >= 0) go(plan);
    };
    const onHashChange = () => {
      const plan = planOfHash(window.location.hash);
      if (plan >= 0) go(plan, false);
    };

    const start = () => {
      current = -1;
      if (!phone.matches) {
        slides().forEach((slide) => slide.classList.remove("is-current"));
        return;
      }
      const fromHash = planOfHash(window.location.hash);
      go(fromHash >= 0 ? fromHash : 0, false);
      paint();
    };
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (phone.matches && current >= 0) scrollToIndex(realIndex(current), false);
        paint();
      }, 120);
    };

    start();
    phone.addEventListener("change", start);
    track.addEventListener("scroll", onScroll, { passive: true });
    if (hasScrollEnd) track.addEventListener("scrollend", settle);
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchend", onTouchEnd, { passive: true });
    track.addEventListener("touchcancel", onTouchEnd, { passive: true });
    track.addEventListener("focusin", onFocusIn);
    document.addEventListener("click", onLinkClick);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(idle);
      window.clearTimeout(resizeTimer);
      phone.removeEventListener("change", start);
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("scrollend", settle);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchend", onTouchEnd);
      track.removeEventListener("touchcancel", onTouchEnd);
      track.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("click", onLinkClick);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("resize", onResize);
    };
  }, [count, clones]);

  return (
    <div className="packs__carousel" role="region" aria-label="Los tres packs">
      <div className="packs__grid" ref={trackRef}>
        {children}
      </div>
      <div className="packs__controls">
        <button type="button" className="packs__arrow packs__arrow--prev" aria-label="Pack anterior" onClick={() => controls.current.step(-1)} />
        <div className="packs__dots">
          <span className="packs__worms" aria-hidden="true">
            <span className="packs__worm" />
            <span className="packs__worm" />
            <span className="packs__worm" />
          </span>
          {labels.map((label, index) => (
            <button
              key={label}
              type="button"
              className="packs__dot"
              aria-label={`Ver el pack ${label}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => controls.current.go(index)}
            />
          ))}
        </div>
        <button type="button" className="packs__arrow packs__arrow--next" aria-label="Pack siguiente" onClick={() => controls.current.step(1)} />
      </div>
    </div>
  );
}
