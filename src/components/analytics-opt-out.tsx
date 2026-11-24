"use client";

import { useSyncExternalStore } from "react";

import {
  type AnalyticsChoice,
  analyticsChoice,
  analyticsConsentEvent,
  setAnalyticsOptOut,
} from "@/lib/analytics-consent";

/** A choice made in another tab arrives as the same event (`followOtherTabs`). */
function subscribe(onChange: () => void) {
  window.addEventListener(analyticsConsentEvent, onChange);
  return () => window.removeEventListener(analyticsConsentEvent, onChange);
}

const status: Record<AnalyticsChoice, string> = {
  on: "Ahora medimos tus visitas en este navegador.",
  off: "No medimos tus visitas en este navegador.",
  gpc: "Tu navegador pide no ser rastreado (Global Privacy Control), así que no medimos tus visitas.",
};

/** The policy's off switch for Google Analytics, for this browser. */
export function AnalyticsOptOut() {
  // Unknown on the server: the choice lives in the visitor's browser.
  const choice = useSyncExternalStore<AnalyticsChoice | null>(subscribe, analyticsChoice, () => null);

  return (
    <div className="analytics-choice">
      <p className="analytics-choice__status" role="status">
        {choice ? status[choice] : " "}
      </p>
      {choice === "gpc" ? null : (
        <button
          type="button"
          className="btn btn--quiet"
          disabled={choice === null}
          onClick={() => setAnalyticsOptOut(choice === "on")}
        >
          {choice === "off" ? "Volver a medir mis visitas" : "No medir mis visitas"}
        </button>
      )}
    </div>
  );
}
