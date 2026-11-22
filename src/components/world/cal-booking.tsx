"use client";

import { useEffect, useRef, useState } from "react";

type CalApi = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  failed?: boolean;
  ns?: Record<string, unknown>;
  q?: unknown[];
};

type WindowWithCal = Window & { Cal?: CalApi };

type BookingStatus = "loading" | "ready" | "failed";

type BookingCopy = {
  url: string;
  calLink: string;
  heading: string;
  detail: string;
  loading: string;
  failed: string;
  failedCta: string;
  fallback: string;
};

const embedScript = "https://app.cal.com/embed/embed.js";
const loaderFailedEvent = "mayofy:cal-loader-failed";

/** After this long without Cal.com reporting ready, the frame offers the direct link. */
const readyTimeout = 15000;

/** Bootstraps the Cal.com embed loader once (the official snippet, written out). */
function ensureCalLoader(): CalApi {
  const w = window as WindowWithCal;
  if (w.Cal) return w.Cal;

  const cal: CalApi = function cal(...args: unknown[]) {
    const queue = (cal.q = cal.q ?? []);
    queue.push(args);
  };
  cal.loaded = false;
  cal.q = [];
  cal.ns = {};
  w.Cal = cal;

  const script = document.createElement("script");
  script.src = embedScript;
  script.async = true;
  script.addEventListener("error", () => {
    cal.failed = true;
    window.dispatchEvent(new Event(loaderFailedEvent));
  });
  document.head.appendChild(script);
  cal("init", { origin: "https://cal.com" });
  return cal;
}

/**
 * Cal.com's dark theme repainted with the island's own tokens, read from the
 * booking frame so the iframe and the panel around it share one surface.
 */
function islandCalTheme(frame: HTMLElement): Record<string, string> {
  const style = getComputedStyle(frame);
  const token = (name: string) => style.getPropertyValue(name).trim();
  const surface = token("--booking-surface");
  const ink = token("--night-ink");
  const inkSoft = token("--night-ink-soft");
  const mint = token("--mint");

  return {
    "cal-brand": mint,
    "cal-brand-emphasis": `color-mix(in oklab, ${mint} 82%, white)`,
    "cal-brand-text": token("--night-deep"),
    "cal-brand-subtle": `color-mix(in oklab, ${mint} 40%, ${surface})`,
    "cal-brand-accent": token("--night-deep"),
    "cal-text": inkSoft,
    "cal-text-emphasis": ink,
    "cal-text-subtle": `color-mix(in oklab, ${inkSoft} 82%, ${surface})`,
    "cal-text-muted": `color-mix(in oklab, ${inkSoft} 55%, ${surface})`,
    "cal-bg": surface,
    "cal-bg-emphasis": `color-mix(in oklab, ${mint} 16%, ${surface})`,
    "cal-bg-subtle": `color-mix(in oklab, ${ink} 7%, ${surface})`,
    // The booker's own container paints bg-muted: keep it the panel's surface.
    "cal-bg-muted": surface,
    "cal-border": `color-mix(in oklab, ${ink} 14%, ${surface})`,
    "cal-border-subtle": `color-mix(in oklab, ${ink} 12%, ${surface})`,
    "cal-border-muted": `color-mix(in oklab, ${ink} 8%, ${surface})`,
    "cal-border-emphasis": `color-mix(in oklab, ${mint} 60%, ${surface})`,
    "cal-border-booker": "transparent",
    "cal-border-booker-width": "0px",
    radius: "0.6rem",
  };
}

/**
 * Cal.com booking embedded inline (decision 16), dressed as part of the
 * dusk island: Cal.com's own event header (an English title, "30m", the
 * time zone picker) is hidden in favour of a Spanish heading in the site's
 * type, and the colours come from the site's tokens.
 *
 * The iframe grows to its content on every width and nothing inside it
 * scrolls on its own, so a flick or a wheel notch over the calendar always
 * moves the page (user test, finding A4). That decides the layout: the
 * column view lists the free times of two days at full length beside the
 * month, where the month view boxes them in a column that scrolls inside;
 * on a phone Cal.com stacks the month and the times in one column either
 * way. `useSlotsViewOnSmallScreen` stays off for the same reason: it opens
 * the times in a fixed overlay that scrolls inside the iframe. Cal.com's own
 * autoscroll is off too, so the page only moves when the reader moves it. Until Cal.com reports ready a still skeleton holds
 * the place with a visible "loading" line; if the loader or the link fails,
 * or nothing answers within 15 s, the frame offers the direct link instead
 * of an empty box.
 */
export function CalBooking({ url, calLink, heading, detail, loading, failed, failedCta, fallback }: BookingCopy) {
  const frameRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<BookingStatus>("loading");

  useEffect(() => {
    const frame = frameRef.current;
    const host = hostRef.current;
    if (!frame || !host) return;
    const cal = ensureCalLoader();
    const markReady = () => setStatus("ready");
    const markFailed = () => setStatus((current) => (current === "ready" ? current : "failed"));
    const timer = window.setTimeout(markFailed, readyTimeout);
    if (cal.failed) markFailed();
    window.addEventListener(loaderFailedEvent, markFailed);
    cal("on", { action: "linkReady", callback: markReady });
    cal("on", { action: "linkFailed", callback: markFailed });
    cal("inline", {
      elementOrSelector: host,
      calLink,
      config: {
        layout: "column_view",
        theme: "dark",
      },
    });
    cal("ui", {
      theme: "dark",
      layout: "column_view",
      hideEventTypeDetails: true,
      disableAutoScroll: true,
      cssVarsPerTheme: { dark: islandCalTheme(frame), light: islandCalTheme(frame) },
    });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(loaderFailedEvent, markFailed);
      cal("off", { action: "linkReady", callback: markReady });
      cal("off", { action: "linkFailed", callback: markFailed });
      host.replaceChildren();
    };
  }, [calLink]);

  return (
    <div className="booking" id="agenda">
      <div className="booking__panel">
        <div className="booking__head">
          <p className="booking__heading">{heading}</p>
          <p className="booking__detail">{detail}</p>
        </div>
        <div className="booking__frame" ref={frameRef} data-status={status}>
          <div className="booking__inline" ref={hostRef} aria-label="Agenda de Cal.com" aria-busy={status === "loading"} />
          <div className="booking__skeleton" aria-hidden="true">
            <span className="booking__skeleton-title" />
            <span className="booking__skeleton-grid">
              {Array.from({ length: 35 }, (_, index) => (
                <span key={index} />
              ))}
            </span>
          </div>
          <p className="booking__state" role="status">
            {status === "loading" ? loading : null}
          </p>
          {status === "failed" ? (
            <div className="booking__failed">
              <p>{failed}</p>
              <a className="btn btn--moss" href={url} target="_blank" rel="noreferrer">
                {failedCta}
              </a>
            </div>
          ) : null}
        </div>
      </div>
      <a className="booking__link" href={url} target="_blank" rel="noreferrer">
        <span className="link-label">{fallback}</span>{" "}
        <span className="link-arrow link-arrow--out" aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
