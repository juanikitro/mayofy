"use client";

import { useEffect, useRef } from "react";

type CalApi = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, unknown>;
  q?: unknown[];
};

type WindowWithCal = Window & { Cal?: CalApi };

const embedScript = "https://app.cal.com/embed/embed.js";

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
 * link stays as a no-JavaScript fallback.
 */
export function CalBooking({ url, calLink }: { url: string; calLink: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const cal = ensureCalLoader();
    cal("inline", {
      elementOrSelector: host,
      calLink,
      config: { layout: "month_view", theme: "dark" },
    });
    cal("ui", { theme: "dark", hideEventTypeDetails: false, layout: "month_view" });
    return () => {
      host.replaceChildren();
    };
  }, [calLink]);

  return (
    <div className="booking" id="agenda">
      <div className="booking__inline" ref={hostRef} aria-label="Agenda de Cal.com" />
      <a className="booking__link" href={url} target="_blank" rel="noreferrer">
        Si la agenda no carga, abrila en Cal.com <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
