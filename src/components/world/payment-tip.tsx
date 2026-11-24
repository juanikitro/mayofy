"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";

import { POPOVER_OPEN } from "@/components/world/guided-scroll";

/** Space kept between the panel and the toggle, the fixed header and the screen's bottom edge (px). */
const GAP = 12;

/**
 * "Cómo se paga" under the guarantees strip, folded into a toggletip (Juani,
 * 24 November 2026: "Quiero debajo de 'Cómo se paga' este en un (?) que abra
 * un tooltip con la explicacion"). The heading is a button with a (?) mark;
 * a tap, click, Enter or Space opens the four lines and the same again closes
 * them. Escape closes it and leaves focus on the button; a tap or click
 * outside, or Tab moving focus elsewhere, closes it too. The lines stay in
 * the HTML while closed (`hidden`), and /terminos keeps them in full.
 *
 * Where it opens (Juani, 24 November: "aparece abajo y por el scroll
 * automatico no llego nunca a leerlo comodo, debe aparecer arriba del (?) o
 * en un lugar donde el usuario lo vea"): above the toggle when it fits
 * between the fixed header and the toggle, else below it when it fits above
 * the screen's bottom edge; when neither fits, the page moves just enough
 * for it to fit above. While it is open, `POPOVER_OPEN` on <html> keeps the
 * guided scroll from settling the page away (guided-scroll.ts).
 */
export function PaymentTip({ title, items }: { title: string; items: readonly string[] }) {
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState<"top" | "bottom">("top");
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useLayoutEffect(() => {
    if (!open) return;
    const place = () => {
      const button = buttonRef.current;
      const panel = panelRef.current;
      if (!button || !panel) return;
      const header = document.querySelector(".island-nav-wrap nav")?.getBoundingClientRect().bottom ?? 0;
      const ceiling = Math.max(0, header) + GAP;
      const floor = window.innerHeight - GAP;
      const toggle = button.getBoundingClientRect();
      const height = panel.offsetHeight;
      const top = toggle.top - GAP - height;
      if (top >= ceiling) setSide("top");
      else if (toggle.bottom + GAP + height <= floor) setSide("bottom");
      else {
        // Neither side fits as the page stands: bring the toggle down until the panel fits above it.
        window.scrollBy({ top: top - ceiling, behavior: "instant" });
        setSide("top");
      }
      // The notch points at the (?) mark, wherever the centred panel sits.
      const mark = button.querySelector(".packs__payment-mark")?.getBoundingClientRect();
      if (mark) panel.style.setProperty("--notch", `${mark.left + mark.width / 2 - panel.getBoundingClientRect().left}px`);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const root = rootRef.current;
    const html = document.documentElement;
    html.setAttribute(POPOVER_OPEN, "");
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus({ preventScroll: true });
    };
    // A tap or click outside, not a pointer down: a swipe to scroll while reading must leave it open.
    const onClick = (event: MouseEvent) => {
      if (root && !root.contains(event.target as Node)) setOpen(false);
    };
    const onFocusIn = (event: FocusEvent) => {
      if (root && !root.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick, true);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      html.removeAttribute(POPOVER_OPEN);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [open]);

  return (
    <div className="packs__payment" ref={rootRef}>
      <h3 className="packs__payment-title">
        <button
          ref={buttonRef}
          type="button"
          className="packs__payment-toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="link-label">{title}</span>
          <span className="packs__payment-mark" aria-hidden="true">
            ?
          </span>
        </button>
      </h3>
      <div className="packs__payment-panel" id={panelId} ref={panelRef} data-side={side} hidden={!open}>
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
