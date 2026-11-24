"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * "Cómo se paga" under the guarantees strip, folded into a toggletip (Juani,
 * 24 November 2026: "Quiero debajo de 'Cómo se paga' este en un (?) que abra
 * un tooltip con la explicacion"). The heading is a button with a (?) mark;
 * a tap, click, Enter or Space opens the four lines under it and the same
 * again closes them. Escape closes it and leaves focus on the button; a tap
 * or click outside, or Tab moving focus elsewhere, closes it too. The lines
 * stay in the HTML while closed (`hidden`), and /terminos keeps them in full.
 */
export function PaymentTip({ title, items }: { title: string; items: readonly string[] }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const root = rootRef.current;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (root && !root.contains(event.target as Node)) setOpen(false);
    };
    const onFocusIn = (event: FocusEvent) => {
      if (root && !root.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
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
      <div className="packs__payment-panel" id={panelId} hidden={!open}>
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
