"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { track } from "@/lib/analytics";

type CalApi = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  failed?: boolean;
  ns?: Record<string, unknown>;
  q?: unknown[];
};

type WindowWithCal = Window & { Cal?: CalApi };

type BookingStatus = "idle" | "loading" | "ready" | "failed";

type BookingCopy = {
  url: string;
  calLink: string;
  heading: string;
  detail: string;
  open: string;
  opening: string;
  loading: string;
  failed: string;
  failedCta: string;
  fallback: string;
};

const embedScript = "https://app.cal.com/embed/embed.js";
const loaderFailedEvent = "mayofy:cal-loader-failed";

/** Wide enough for Cal.com's compact month view; narrower screens open the agenda from a button. */
const inlineQuery = "(min-width: 64rem)";

/** The inline agenda starts loading when it is this close to the screen (1.5 screens). */
const inlineRootMargin = "150% 0px 150% 0px";

/** After this long without Cal.com reporting ready, the panel offers the direct link. */
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
 * booking panel so the iframe and the panel around it share one surface.
 */
function islandCalTheme(panel: HTMLElement): Record<string, string> {
  const style = getComputedStyle(panel);
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

/*
 * Funnel events from Cal.com's embed (docs/plans/2026-11-23-analytics.md).
 * Cal.com fires no public event when a day or a time is picked; both change
 * its internal route (`__routeChanged`, observed 23 November 2026), so the
 * first one is reported as the visitor starting to book.
 */
let bookingStarted = false;
const calMode = () => (window.matchMedia(inlineQuery).matches ? "inline" : "popup");
const onBookerViewed = () => track("booking_view", { mode: calMode() });
const onRouteChanged = () => {
  if (bookingStarted) return;
  bookingStarted = true;
  track("booking_started", { mode: calMode() });
};
const onBookingSuccessful = () => track("booking_complete", { mode: calMode() });

/** Layout, theme and header shared by the inline agenda and the phone popup. */
const embedConfig = { layout: "month_view", theme: "dark" };

/**
 * Cal.com booking (decision 16), dressed as part of the dusk island: Cal.com's
 * own event header (an English title, "30m", the time zone picker) is hidden
 * in favour of a Spanish heading in the site's type, and the colours come from
 * the site's tokens.
 *
 * Wide screens (64rem and up) show the compact month view inline: the month
 * beside a short column of the chosen day's times. That column scrolls only
 * under the pointer and hands the wheel back to the page at its ends; the rest
 * of the panel scrolls the page (Juani, 22 November 2026: "en desktop me
 * gustaba la version anterior que era compacta"). Narrower screens keep the
 * page short: one button opens Cal.com's own full-screen popup ("menos en
 * mobile, que podria abrirse con un boton").
 *
 * Nothing loads with the page: the inline agenda boots when it comes within
 * 1.5 screens, the popup when its button is tapped (about 1 MB of Cal.com
 * code, fonts and requests stay off the first screen). The 15 s failure timer
 * starts with that load; on a failed loader or link, or silence, the panel
 * offers the direct link instead of an empty box.
 */
export function CalBooking({ url, calLink, heading, detail, open, opening, loading, failed, failedCta, fallback }: BookingCopy) {
  const panelRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const calRef = useRef<CalApi | null>(null);
  const timerRef = useRef(0);
  const [status, setStatus] = useState<BookingStatus>("idle");

  const markReady = useCallback(() => {
    window.clearTimeout(timerRef.current);
    setStatus("ready");
  }, []);
  const markFailed = useCallback(() => {
    setStatus((current) => (current === "ready" ? current : "failed"));
  }, []);

  /** Loads Cal.com once, wires its events and theme, and starts the failure timer. */
  const bootCal = useCallback(() => {
    if (calRef.current) return calRef.current;
    const panel = panelRef.current;
    const cal = ensureCalLoader();
    calRef.current = cal;
    setStatus("loading");
    timerRef.current = window.setTimeout(markFailed, readyTimeout);
    if (cal.failed) markFailed();
    window.addEventListener(loaderFailedEvent, markFailed);
    cal("on", { action: "linkReady", callback: markReady });
    cal("on", { action: "linkFailed", callback: markFailed });
    cal("on", { action: "bookerViewed", callback: onBookerViewed });
    cal("on", { action: "__routeChanged", callback: onRouteChanged });
    cal("on", { action: "bookingSuccessfulV2", callback: onBookingSuccessful });
    cal("ui", {
      ...embedConfig,
      hideEventTypeDetails: true,
      disableAutoScroll: true,
      ...(panel ? { cssVarsPerTheme: { dark: islandCalTheme(panel), light: islandCalTheme(panel) } } : {}),
    });
    return cal;
  }, [markFailed, markReady]);

  // Wide screens: boot the inline agenda when it comes within 1.5 screens.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const wide = window.matchMedia(inlineQuery);
    let observer: IntersectionObserver | null = null;
    let mounted = false;

    const mountInline = () => {
      if (mounted) return;
      mounted = true;
      bootCal()("inline", { elementOrSelector: host, calLink, config: embedConfig });
    };
    const watch = () => {
      observer?.disconnect();
      if (!wide.matches || mounted) return;
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer?.disconnect();
          mountInline();
        },
        { rootMargin: inlineRootMargin },
      );
      observer.observe(host);
    };

    watch();
    wide.addEventListener("change", watch);
    return () => {
      wide.removeEventListener("change", watch);
      observer?.disconnect();
    };
  }, [bootCal, calLink]);

  useEffect(
    () => () => {
      window.clearTimeout(timerRef.current);
      window.removeEventListener(loaderFailedEvent, markFailed);
      const cal = calRef.current;
      cal?.("off", { action: "linkReady", callback: markReady });
      cal?.("off", { action: "linkFailed", callback: markFailed });
      cal?.("off", { action: "bookerViewed", callback: onBookerViewed });
      cal?.("off", { action: "__routeChanged", callback: onRouteChanged });
      cal?.("off", { action: "bookingSuccessfulV2", callback: onBookingSuccessful });
      hostRef.current?.replaceChildren();
    },
    [markFailed, markReady],
  );

  /** Narrow screens: Cal.com's popup, loaded on the first tap. */
  function openPopup() {
    track("booking_open", { placement: "agenda" });
    bootCal()("modal", { calLink, config: embedConfig });
  }

  const busy = status === "loading";

  return (
    <div className="booking" id="agenda" data-status={status}>
      <div className="booking__panel" ref={panelRef}>
        <div className="booking__head">
          <p className="booking__heading">{heading}</p>
          <p className="booking__detail">{detail}</p>
        </div>
        <div className="booking__frame">
          <div className="booking__inline" ref={hostRef} role="region" aria-label="Agenda de Cal.com" aria-busy={busy} />
          <div className="booking__skeleton" aria-hidden="true">
            <span className="booking__skeleton-grid">
              {Array.from({ length: 35 }, (_, index) => (
                <span key={index} />
              ))}
            </span>
            <span className="booking__skeleton-times">
              {Array.from({ length: 7 }, (_, index) => (
                <span key={index} />
              ))}
            </span>
          </div>
          <p className="booking__state" role="status">
            {busy ? loading : null}
          </p>
        </div>
        <div className="booking__launch">
          <button className="btn btn--moss btn--lg booking__open" type="button" onClick={openPopup} aria-busy={busy} disabled={busy}>
            {busy ? (
              <>
                <span className="btn__spinner" aria-hidden="true" />
                {opening}
              </>
            ) : (
              open
            )}
          </button>
        </div>
        {status === "failed" ? (
          <div className="booking__failed" role="alert">
            <p>{failed}</p>
            <a className="btn btn--moss" href={url} target="_blank" rel="noreferrer">
              {failedCta}
            </a>
          </div>
        ) : null}
        <a className="booking__link" href={url} target="_blank" rel="noreferrer">
          <span className="link-label">{fallback}</span>{" "}
          <span className="link-arrow link-arrow--out" aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
