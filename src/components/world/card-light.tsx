"use client";

import { useEffect, useRef } from "react";

/**
 * A soft light that follows the pointer across a pack card (Juani, 24
 * November 2026: "me gustaria aplicar un efecto hover mas interesante a las
 * cards"). Pointer devices only: the card's pointer moves set `--x` and `--y`
 * on this layer alone, once a frame, and its glow moves by `translate`, so
 * nothing is laid out or repainted while it follows. The CSS shows it only
 * under hover-capable pointers and without reduced motion (world.css,
 * "Pack card hover").
 */
export function CardLight() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const light = ref.current;
    const card = light?.closest<HTMLElement>(".pack");
    if (!light || !card) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const box = light.getBoundingClientRect();
        light.style.setProperty("--x", `${Math.round(x - box.left)}px`);
        light.style.setProperty("--y", `${Math.round(y - box.top)}px`);
      });
    };
    card.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      card.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <span className="pack__light" ref={ref} aria-hidden="true" />;
}
