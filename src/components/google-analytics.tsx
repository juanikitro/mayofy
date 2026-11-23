"use client";

import { useEffect } from "react";

import { afterLoadIdle } from "@/lib/after-load";
import { markAnalyticsReady } from "@/lib/analytics";

type WindowWithGtag = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

/** Longest wait for an idle moment once the page has loaded. */
const idleTimeout = 3000;

/** Set on Juani's own browsers by opening any page with `?interno=1` (`?interno=0` clears it). */
const internalKey = "mayofy:internal";

/**
 * Juani's own visits, tagged `traffic_type: internal` so GA's internal
 * traffic filter drops them even when his home IP changes. Saved in the
 * browser; storage can be blocked, so every access is guarded.
 */
function internalTraffic() {
  try {
    const flag = new URLSearchParams(window.location.search).get("interno");
    if (flag === "1") window.localStorage.setItem(internalKey, "1");
    if (flag === "0") window.localStorage.removeItem(internalKey);
    return window.localStorage.getItem(internalKey) === "1";
  } catch {
    return false;
  }
}

/** `?ga_debug=1` sends this visit to GA's DebugView (Admin > DebugView). */
function debugMode() {
  return new URLSearchParams(window.location.search).has("ga_debug");
}

/*
 * Google Analytics 4, loaded after the page: gtag.js (~180 KB) waits for the
 * `load` event and then an idle moment, so it never competes with the hero on
 * a phone. Trade-off accepted by Juani (2026-11-22): visits that leave within
 * the first seconds are not counted.
 *
 * Not next/script's `lazyOnload`: it waits for an idle callback with no
 * timeout, which never fires in a background tab or a headless browser, so
 * some visits (and every lab measurement) would never load GA at all
 * (`afterLoadIdle` caps the wait).
 */
export function GoogleAnalytics({ gaId }: { gaId: string }) {
  useEffect(() => {
    const w = window as WindowWithGtag;
    const inject = () => {
      if (w.gtag) return;
      w.dataLayer = w.dataLayer ?? [];
      w.gtag = function gtag() {
        // gtag.js reads the `arguments` object itself, not an array.
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer!.push(arguments);
      };
      w.gtag("js", new Date());
      w.gtag("config", gaId, {
        ...(internalTraffic() ? { traffic_type: "internal" } : {}),
        ...(debugMode() ? { debug_mode: true } : {}),
      });
      markAnalyticsReady(w.gtag);
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      script.async = true;
      document.head.appendChild(script);
    };

    return afterLoadIdle(inject, idleTimeout);
  }, [gaId]);

  return null;
}
