"use client";

import { type ReactNode, useEffect, useId, useRef, useState } from "react";

type FlipCardProps = {
  className?: string;
  id?: string;
  /** Layout class of the front face (its own grid, a subgrid, ...). */
  frontClassName?: string;
  front: ReactNode;
  back: ReactNode;
  /** Heading of the back face; focus lands on it when the card turns. */
  backTitle: ReactNode;
  flipLabel: ReactNode;
  unflipLabel: ReactNode;
};

/**
 * A card with its details on the reverse: a button turns it over in 3D (a
 * crossfade under reduced motion). The hidden face is `inert`, so neither
 * keyboard nor screen reader reaches it; turning moves focus to the back's
 * heading, turning back returns it to the front button. The back takes the
 * front's height and scrolls when its content is longer.
 */
export function FlipCard({ className, id, frontClassName, front, back, backTitle, flipLabel, unflipLabel }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const backId = useId();
  const titleId = useId();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const flipRef = useRef<HTMLButtonElement>(null);
  const turned = useRef(false);

  useEffect(() => {
    if (!turned.current) return;
    if (flipped) titleRef.current?.focus({ preventScroll: true });
    else flipRef.current?.focus({ preventScroll: true });
  }, [flipped]);

  function turn(next: boolean) {
    turned.current = true;
    setFlipped(next);
  }

  return (
    <article className={`flip${className ? ` ${className}` : ""}`} id={id} data-flipped={flipped ? "true" : undefined}>
      <div className="flip__faces">
        <div className={`flip__face flip__face--front${frontClassName ? ` ${frontClassName}` : ""}`} inert={flipped}>
          {front}
          <button
            ref={flipRef}
            className="flip__toggle"
            type="button"
            aria-expanded={flipped}
            aria-controls={backId}
            onClick={() => turn(true)}
          >
            <span className="link-label">{flipLabel}</span>
            <span className="flip__toggle-icon" aria-hidden="true" />
          </button>
        </div>
        <section className="flip__face flip__face--back" id={backId} aria-labelledby={titleId} inert={!flipped}>
          <h4 className="flip__title" id={titleId} ref={titleRef} tabIndex={-1}>
            {backTitle}
          </h4>
          <div className="flip__scroll">{back}</div>
          <button className="flip__toggle flip__toggle--back" type="button" aria-expanded={flipped} aria-controls={backId} onClick={() => turn(false)}>
            <span className="flip__toggle-icon" aria-hidden="true" />
            <span className="link-label">{unflipLabel}</span>
          </button>
        </section>
      </div>
    </article>
  );
}
