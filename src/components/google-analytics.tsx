"use client";

import { useEffect } from "react";

type WindowWithGtag = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

/** Longest wait for an idle moment once the page has loaded. */
const idleTimeout = 3000;

/*
 * Google Analytics 4, loaded after the page: gtag.js (~180 KB) waits for the
 * `load` event and then an idle moment, so it never competes with the hero on
 * a phone. Trade-off accepted by Juani (2026-11-22): visits that leave within
 * the first seconds are not counted.
 *
 * Not next/script's `lazyOnload`: it waits for an idle callback with no
 * timeout, which never fires in a background tab or a headless browser, so
 * some visits (and every lab measurement) would never load GA at all.
 */
export function GoogleAnalytics({ gaId }: { gaId: string }) {
  useEffect(() => {
    const w = window as WindowWithGtag;
    let idleHandle: number | undefined;
    let timer: number | undefined;

    const inject = () => {
      if (w.gtag) return;
      w.dataLayer = w.dataLayer ?? [];
      w.gtag = function gtag() {
        // gtag.js reads the `arguments` object itself, not an array.
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer!.push(arguments);
      };
      w.gtag("js", new Date());
      w.gtag("config", gaId);
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      script.async = true;
      document.head.appendChild(script);
    };

    // Safari has no requestIdleCallback; it gets a plain timeout instead.
    const idle = (window as Partial<Pick<Window, "requestIdleCallback" | "cancelIdleCallback">>);

    const schedule = () => {
      if (idle.requestIdleCallback) {
        idleHandle = idle.requestIdleCallback.call(window, inject, { timeout: idleTimeout });
      } else {
        timer = window.setTimeout(inject, 1);
      }
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      window.removeEventListener("load", schedule);
      if (idleHandle !== undefined) idle.cancelIdleCallback?.call(window, idleHandle);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [gaId]);

  return null;
}
