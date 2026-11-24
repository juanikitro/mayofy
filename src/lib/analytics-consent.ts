/*
 * Whether this browser may be measured by Google Analytics.
 *
 * No consent banner (Juani, 23 November 2026: "no pongamos banners y pone la
 * politica clara"): measuring is on by default and the privacy policy says
 * so. A visitor turns it off from /privacidad, and a browser that sends the
 * Global Privacy Control signal is never measured. Rationale and sources:
 * docs/plans/2026-11-23-privacidad-legales.md.
 */

export const googleAnalyticsId =
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? "G-F2DHJCS51K";

/** Saved when a visitor turns measuring off; strictly necessary to honor the choice. */
const optOutKey = "mayofy:analytics-off";

/** Fired on `window` whenever the choice changes, so the GA loader can follow it. */
export const analyticsConsentEvent = "mayofy:analytics-consent";

type NavigatorWithGpc = Navigator & { globalPrivacyControl?: boolean };

export type AnalyticsChoice = "on" | "off" | "gpc";

/** The browser's own "do not sell or share" signal (https://globalprivacycontrol.org). */
export function hasGlobalPrivacyControl() {
  return (navigator as NavigatorWithGpc).globalPrivacyControl === true;
}

/** The choice made on this page, so it holds even when storage is blocked. */
let pageChoice: boolean | null = null;

function optedOut() {
  if (pageChoice !== null) return pageChoice;
  try {
    return window.localStorage.getItem(optOutKey) === "1";
  } catch {
    return false;
  }
}

export function analyticsChoice(): AnalyticsChoice {
  if (hasGlobalPrivacyControl()) return "gpc";
  return optedOut() ? "off" : "on";
}

export function analyticsAllowed() {
  return analyticsChoice() === "on";
}

/**
 * GA's own off switch: with `window['ga-disable-<id>']` set, gtag.js sends
 * nothing (https://developers.google.com/analytics/devguides/collection/ga4/disable-analytics).
 */
export function applyGaDisableFlag() {
  Object.assign(window, { [`ga-disable-${googleAnalyticsId}`]: !analyticsAllowed() });
}

/** GA's cookies (`_ga`, `_ga_<id>`) live on the widest domain it could set; try each level. */
function removeGaCookies() {
  const names = document.cookie
    .split(";")
    .map((pair) => pair.split("=")[0].trim())
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));
  const labels = window.location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < labels.length - 1; i += 1) domains.push(`; domain=.${labels.slice(i).join(".")}`);
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  }
}

/** Turns measuring off (and deletes GA's cookies) or back on for this browser. */
export function setAnalyticsOptOut(off: boolean) {
  pageChoice = off;
  try {
    if (off) window.localStorage.setItem(optOutKey, "1");
    else window.localStorage.removeItem(optOutKey);
  } catch {
    // Storage blocked: `pageChoice` keeps the choice until the page closes.
  }
  applyGaDisableFlag();
  if (off) removeGaCookies();
  window.dispatchEvent(new Event(analyticsConsentEvent));
}
