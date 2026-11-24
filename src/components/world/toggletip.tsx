"use client";

import { type PointerEvent as ReactPointerEvent, type ReactNode, useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";

import { POPOVER_OPEN } from "@/components/world/guided-scroll";
import { placeToggletip } from "@/lib/toggletip-placement";

/** Space kept between the panel and the mark, the fixed header and the screen's edges (px). */
const GAP = 12;
const EDGE = 16;
/** Hover intent: the pointer rests this long on the (?) before the panel opens (ms). */
const OPEN_DELAY = 120;
/** Grace to travel from the (?) into the panel, or back, before it closes (ms). */
const CLOSE_DELAY = 220;

const canHover = () => window.matchMedia("(hover: hover)").matches;

// Several tips may overlap for a moment (one closing while the next opens):
// <html> keeps POPOVER_OPEN until the last one closes.
let openTips = 0;

/**
 * A (?) toggletip: "Cómo se paga" under the guarantees strip and the small
 * print beside each pack's price (Juani, 24 November 2026: "Ese (?) y el de
 * 'Como se paga' deben ser accesibles por hover, no solo por click").
 *
 * - Pointer devices: resting on the (?) opens it after a short intent delay;
 *   the panel stays open while the pointer travels into it and closes a moment
 *   after the pointer leaves both. A click pins it open; a second click closes it.
 * - Touch: a tap opens it and another tap closes it.
 * - Keyboard: focusing the (?) opens it; Enter or Space closes and reopens it.
 * - Escape closes it (and leaves focus on the (?) when focus was inside); a
 *   tap or click outside, or focus moving elsewhere, closes it too.
 *
 * The panel is a manual popover, so it sits in the top layer: no card clip,
 * carousel overflow or 3D face cuts it. It opens above the (?) and inside the
 * screen (placeToggletip) and follows the (?) while the page or the carousel
 * scrolls. While it is open, `POPOVER_OPEN` on <html> keeps the guided scroll
 * from settling the page away (guided-scroll.ts). The lines stay in the HTML
 * while closed.
 */
export function Toggletip({
  items,
  title,
  label,
  heading = false,
  className,
}: {
  items: readonly ReactNode[];
  /** Visible text before the (?) mark; without it the mark stands alone and `label` names it. */
  title?: ReactNode;
  label?: string;
  /** Wraps the toggle in an h3 (a titled tip that heads its own block). */
  heading?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState<"top" | "bottom">("top");
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  /** Opened by a click or tap: stays until a click, Escape or the outside closes it. */
  const pinned = useRef(false);
  /** Closed by a click or Escape while the pointer rests on it: no hover reopening until it leaves. */
  const resting = useRef(false);
  /** Opened by hover: placing it never moves the page (placeToggletip). */
  const hovered = useRef(false);
  const timer = useRef<number | undefined>(undefined);

  const clear = () => window.clearTimeout(timer.current);
  const close = useCallback(() => {
    window.clearTimeout(timer.current);
    pinned.current = false;
    setOpen(false);
  }, []);

  const onPointerEnter = (event: ReactPointerEvent) => {
    if (event.pointerType === "touch" || !canHover() || resting.current) return;
    clear();
    if (!open)
      timer.current = window.setTimeout(() => {
        hovered.current = true;
        setOpen(true);
      }, OPEN_DELAY);
  };

  const onPointerLeave = (event: ReactPointerEvent) => {
    if (event.pointerType === "touch") return;
    resting.current = false;
    clear();
    if (!pinned.current) timer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY);
  };

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!open || !panel) return;
    if (typeof panel.showPopover === "function" && !panel.matches(":popover-open")) panel.showPopover();
    let frame = 0;
    // Opened by a press or by hover, then following on the side it opened on.
    let mode: "press" | "hover" | "top" | "bottom" = hovered.current ? "hover" : "press";
    const place = () => {
      const mark = markRef.current?.getBoundingClientRect();
      if (!mark) return;
      // Swiped out of sight in the carousel: nothing left to point at.
      if (mark.right < 0 || mark.left > window.innerWidth) {
        close();
        return;
      }
      const header = document.querySelector(".island-nav-wrap nav")?.getBoundingClientRect().bottom ?? 0;
      const placement = placeToggletip({
        mark: { top: mark.top, bottom: mark.bottom, centre: mark.left + mark.width / 2 },
        panel: { width: panel.offsetWidth, height: panel.offsetHeight },
        viewport: { width: window.innerWidth, height: window.innerHeight },
        ceiling: Math.max(0, header) + GAP,
        gap: GAP,
        edge: EDGE,
        mode,
      });
      if (placement.scrollBy) window.scrollBy({ top: placement.scrollBy, behavior: "instant" });
      panel.style.top = `${placement.top}px`;
      panel.style.left = `${placement.left}px`;
      panel.style.setProperty("--notch", `${placement.notch}px`);
      mode = placement.side;
      setSide(placement.side);
    };
    const follow = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(place);
    };
    place();
    window.addEventListener("resize", follow);
    // Capture: the carousel's own sideways scroll moves the (?) too.
    document.addEventListener("scroll", follow, { capture: true, passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", follow);
      document.removeEventListener("scroll", follow, { capture: true });
      if (typeof panel.hidePopover === "function" && panel.matches(":popover-open")) panel.hidePopover();
    };
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const root = rootRef.current;
    const html = document.documentElement;
    openTips += 1;
    html.setAttribute(POPOVER_OPEN, "");
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const focusInside = root?.contains(document.activeElement);
      resting.current = true;
      close();
      if (focusInside) buttonRef.current?.focus({ preventScroll: true });
    };
    // A tap or click outside, not a pointer down: a swipe to scroll while
    // reading must leave it open. Pointer events, not click: iOS Safari sends
    // no click for a tap on something that is not clickable.
    let down: { x: number; y: number } | null = null;
    const onPointerDown = (event: PointerEvent) => {
      down = root && !root.contains(event.target as Node) ? { x: event.clientX, y: event.clientY } : null;
    };
    const onPointerCancel = () => {
      down = null;
    };
    const onPointerUp = (event: PointerEvent) => {
      if (down && Math.hypot(event.clientX - down.x, event.clientY - down.y) < 10) close();
      down = null;
    };
    const onFocusIn = (event: FocusEvent) => {
      if (root && !root.contains(event.target as Node)) close();
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("pointerup", onPointerUp, true);
    document.addEventListener("pointercancel", onPointerCancel, true);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      openTips -= 1;
      if (openTips === 0) html.removeAttribute(POPOVER_OPEN);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("pointerup", onPointerUp, true);
      document.removeEventListener("pointercancel", onPointerCancel, true);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [open, close]);

  useEffect(() => clear, []);

  const toggle = (
    <button
      ref={buttonRef}
      type="button"
      className="tip__toggle"
      aria-expanded={open}
      aria-controls={panelId}
      aria-label={title ? undefined : label}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onFocus={(event) => {
        if (event.currentTarget.matches(":focus-visible")) {
          clear();
          hovered.current = false;
          setOpen(true);
        }
      }}
      onClick={(event) => {
        clear();
        // A pinned tip, or a keyboard press (detail 0) on a focus-opened one, closes; a click on a hovered one pins it.
        if (open && (pinned.current || event.detail === 0)) {
          resting.current = event.detail !== 0;
          close();
        } else {
          pinned.current = true;
          if (!open) hovered.current = false;
          setOpen(true);
        }
      }}
    >
      {title ? <span className="link-label">{title}</span> : null}
      <span className="tip__mark" ref={markRef} aria-hidden="true">
        ?
      </span>
    </button>
  );

  return (
    <div className={`tip${className ? ` ${className}` : ""}`} ref={rootRef}>
      {heading ? <h3 className="tip__title">{toggle}</h3> : toggle}
      <div
        className="tip__panel"
        id={panelId}
        ref={panelRef}
        popover="manual"
        data-side={side}
        hidden={!open}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      >
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
