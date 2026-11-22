"use client";

import { type CSSProperties, type FocusEvent, useEffect, useRef, useState } from "react";

import { type CaseArt, casePicker, planFor } from "@/content/case-picker";

/** The painted art of a case: a still cut-out, or a strip that flutters back and forth. */
function CaseArtwork({ art }: { art: CaseArt }) {
  const src = `/images/mundo-mayo/${art.src}.webp`;
  if (art.frames && art.frames > 1) {
    return <span className="case__plant case__plant--strip" style={{ "--strip": `url("${src}")`, "--frames": art.frames } as CSSProperties} />;
  }
  // eslint-disable-next-line @next/next/no-img-element -- small decorative cut-out
  return <img className="case__plant" src={src} alt="" width={512} height={512} loading="lazy" decoding="async" />;
}

/**
 * Island 2, option A: three situations, each marked by a painted piece of
 * the island (a flower, a small plant, a butterfly) that grows out of its
 * card. The first is selected from the start and, like the works index,
 * the selection moves to the next one every 12 s (time for a slow reader), with a bar filling along
 * the selected card; the recommendation under them follows it. Hovering,
 * focusing or clicking a case selects it and holds the count at zero until
 * the pointer or focus leaves the list, when it starts again. The count
 * stops off screen and in a hidden tab (no pause button, at the client's
 * request); with reduced motion nothing advances by itself. A choice made by the visitor is
 * announced; the automatic tour is not.
 */
export function CasePicker() {
  const { options } = casePicker;
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [hold, setHold] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabShown, setTabShown] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [announced, setAnnounced] = useState("");
  const running = allowed && visible && tabShown && !hold;

  useEffect(() => {
    const root = rootRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMedia = () => setAllowed(!motion.matches && document.documentElement.dataset.motionTier !== "reduced");
    const onTab = () => setTabShown(!document.hidden);
    onMedia();
    onTab();
    motion.addEventListener("change", onMedia);
    document.addEventListener("visibilitychange", onTab);
    const observer = root && "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 }) : null;
    if (root && observer) observer.observe(root);
    return () => {
      motion.removeEventListener("change", onMedia);
      document.removeEventListener("visibilitychange", onTab);
      observer?.disconnect();
    };
  }, []);

  /** Selects a case and starts its 12 s count from zero. */
  function select(index: number) {
    setActive(index);
    setCycle((value) => value + 1);
  }

  function choose(index: number) {
    select(index);
    setAnnounced(`${casePicker.resultEyebrow}: ${planFor(options[index].planId).name}`);
  }

  function advance() {
    setActive((value) => (value + 1) % options.length);
    setCycle((value) => value + 1);
  }

  function release() {
    setHold(false);
    setCycle((value) => value + 1);
  }

  function onBlurList(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) release();
  }

  return (
    <div
      className="cases"
      ref={rootRef}
      data-autoplay={allowed ? "true" : undefined}
      data-running={running ? "true" : undefined}
      data-hold={hold ? "true" : undefined}
    >
      <div className="cases__head">
        <p className="cases__prompt" id="cases-prompt">
          {casePicker.prompt}
        </p>
      </div>
      <div
        className="cases__options"
        role="group"
        aria-labelledby="cases-prompt"
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setHold(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") release();
        }}
        onFocus={() => setHold(true)}
        onBlur={onBlurList}
      >
        {options.map((option, index) => (
          <button
            className="case"
            type="button"
            key={option.planId}
            aria-pressed={index === active}
            aria-controls="cases-result"
            onClick={() => choose(index)}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse" && index !== active) select(index);
            }}
            onFocus={() => {
              if (index !== active) select(index);
            }}
          >
            {/* The art stands in a planter cut into the card and grows past its top edge. */}
            <span className="case__planter" aria-hidden="true">
              <CaseArtwork art={option.art} />
            </span>
            <span>{option.text}</span>
            {allowed && index === active ? <span className="case__progress" key={`${active}-${cycle}`} aria-hidden="true" onAnimationEnd={advance} /> : null}
          </button>
        ))}
      </div>
      {/* Every recommendation shares one grid cell, so the list never jumps when the selection moves. */}
      <div className="cases__result" id="cases-result">
        {options.map((option, index) => {
          const plan = planFor(option.planId);
          const current = index === active;
          return (
            <div className="case-result panel" key={plan.id} data-active={current ? "true" : undefined} aria-hidden={!current} inert={!current}>
              <p className="case-result__eyebrow">{casePicker.resultEyebrow}</p>
              <h3>{plan.name}</h3>
              <p className="case-result__price">
                Desde <strong>{plan.price}</strong> · Plazo: {plan.timeline}
              </p>
              <p className="case-result__why">{plan.description}</p>
              <div className="case-result__actions">
                <a className="btn btn--moss" href={`#pack-${plan.id}`}>
                  {casePicker.detailsCta}
                </a>
                <a className="btn btn--quiet" href="#agenda">
                  {casePicker.bookingCta}
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <p className="cases__status" aria-live="polite">
        {announced}
      </p>
    </div>
  );
}
