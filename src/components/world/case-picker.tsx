"use client";

import { useState } from "react";

import { type CasePlanId, casePicker, planFor } from "@/content/case-picker";

/**
 * Island 2, option A: three situations, each marked by a painted plant
 * that grows with the size of the problem (a sprout, a plant, a bush).
 * Picking one recommends the pack to start with and links to its full card (`#pack-<id>`, island 3) and to the booking. Nothing is
 * picked until the visitor chooses; the result is announced politely.
 */
export function CasePicker() {
  const [picked, setPicked] = useState<CasePlanId | null>(null);
  const plan = picked ? planFor(picked) : null;

  return (
    <div className="cases">
      <p className="cases__prompt" id="cases-prompt">
        {casePicker.prompt}
      </p>
      <div className="cases__options" role="group" aria-labelledby="cases-prompt">
        {casePicker.options.map((option) => (
          <button
            className="case"
            type="button"
            key={option.planId}
            aria-pressed={picked === option.planId}
            aria-controls="cases-result"
            onClick={() => setPicked(option.planId)}
          >
            {/* The plant stands in a planter cut into the card and grows past its top edge. */}
            <span className="case__planter" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element -- small decorative cut-out */}
              <img className="case__plant" src={`/images/mundo-mayo/${option.plant}.webp`} alt="" width={240} height={140} loading="lazy" decoding="async" />
            </span>
            <span>{option.text}</span>
          </button>
        ))}
      </div>
      <div className="cases__result" id="cases-result" aria-live="polite">
        {plan ? (
          <div className="case-result panel" key={plan.id}>
            <p className="case-result__eyebrow">{casePicker.resultEyebrow}</p>
            <h3>{plan.name}</h3>
            <p className="case-result__price">
              Desde <strong>{plan.price}</strong> · {plan.timeline}
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
        ) : null}
      </div>
    </div>
  );
}
