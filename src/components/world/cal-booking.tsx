"use client";

import { useEffect, useRef, useState } from "react";

type CalApi = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, unknown>;
  q?: unknown[];
};

type WindowWithCal = Window & { Cal?: CalApi };

const embedScript = "https://app.cal.com/embed/embed.js";

/** After this long the skeleton gives way even if Cal.com never reports ready. */
const skeletonTimeout = 15000;

/** Bootstraps the Cal.com embed loader once (the official snippet, written out). */
function ensureCalLoader(): CalApi {
  const w = window as WindowWithCal;
  if (w.Cal) return w.Cal;

  const cal: CalApi = function cal(...args: unknown[]) {
    const queue = (cal.q = cal.q ?? []);
    if (args[0] === "init") {
      queue.push(args);
      return;
    }
    queue.push(args);
  };
  cal.loaded = false;
  cal.q = [];
  cal.ns = {};
  w.Cal = cal;

  const script = document.createElement("script");
  script.src = embedScript;
  script.async = true;
  document.head.appendChild(script);
  cal("init", { origin: "https://cal.com" });
  return cal;
}

/**
 * Cal.com booking embedded inline (decision 16). The official loader renders
 * the calendar inside this block and resizes it to its content; the direct
 * link stays as a no-JavaScript fallback. Until Cal.com reports the calendar
 * ready, a still skeleton of the month view holds its place.
 */
export function CalBooking({ url, calLink }: { url: string; calLink: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const cal = ensureCalLoader();
    const markReady = () => setReady(true);
    const timer = window.setTimeout(markReady, skeletonTimeout);
    cal("on", { action: "linkReady", callback: markReady });
    cal("on", { action: "linkFailed", callback: markReady });
    cal("inline", {
      elementOrSelector: host,
      calLink,
      config: { layout: "month_view", theme: "dark" },
    });
    cal("ui", { theme: "dark", hideEventTypeDetails: false, layout: "month_view" });
    return () => {
      window.clearTimeout(timer);
      cal("off", { action: "linkReady", callback: markReady });
      cal("off", { action: "linkFailed", callback: markReady });
      host.replaceChildren();
    };
  }, [calLink]);

  return (
    <div className="booking" id="agenda">
      <div className="booking__frame" data-ready={ready ? "true" : undefined}>
        <div className="booking__inline" ref={hostRef} aria-label="Agenda de Cal.com" aria-busy={!ready} />
        <div className="booking__skeleton" aria-hidden="true">
          <span className="booking__skeleton-title" />
          <span className="booking__skeleton-grid">
            {Array.from({ length: 35 }, (_, index) => (
              <span key={index} />
            ))}
          </span>
        </div>
      </div>
      <a className="booking__link" href={url} target="_blank" rel="noreferrer">
        <span className="link-label">Si la agenda no carga, abrila en Cal.com</span>{" "}
        <span className="link-arrow link-arrow--out" aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
