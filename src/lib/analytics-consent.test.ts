import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type ConsentModule = typeof import("@/lib/analytics-consent");

const optOutKey = "mayofy:analytics-off";

/**
 * A minimal browser: storage shared by "tabs", an event target for `window`
 * and a cookie jar. Enough for the consent module, which only touches these.
 */
function fakeBrowser(storage: Map<string, string>) {
  const target = new EventTarget();
  const win = Object.assign(target, {
    localStorage: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => void storage.set(key, value),
      removeItem: (key: string) => void storage.delete(key),
    },
    location: { hostname: "mayofy.dev" },
  });
  vi.stubGlobal("window", win);
  vi.stubGlobal("navigator", {});
  vi.stubGlobal("document", { cookie: "" });
  return win;
}

async function loadConsent(): Promise<ConsentModule> {
  vi.resetModules();
  return import("@/lib/analytics-consent");
}

/** The event another tab's write fires here (the writing tab never gets it). */
function storageEvent(key: string | null) {
  return Object.assign(new Event("storage"), { key });
}

describe("analytics consent", () => {
  let storage: Map<string, string>;

  beforeEach(() => {
    storage = new Map();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("measures by default and stops after the visitor opts out", async () => {
    fakeBrowser(storage);
    const consent = await loadConsent();
    expect(consent.analyticsChoice()).toBe("on");
    consent.setAnalyticsOptOut(true);
    expect(consent.analyticsChoice()).toBe("off");
    expect(storage.get(optOutKey)).toBe("1");
  });

  it("never measures a browser that sends Global Privacy Control", async () => {
    fakeBrowser(storage);
    vi.stubGlobal("navigator", { globalPrivacyControl: true });
    const consent = await loadConsent();
    expect(consent.analyticsChoice()).toBe("gpc");
    expect(consent.analyticsAllowed()).toBe(false);
  });

  it("follows an opt-out made in another tab, even after a choice in this one", async () => {
    const win = fakeBrowser(storage);
    const consent = await loadConsent();
    consent.setAnalyticsOptOut(false);
    const stop = consent.followOtherTabs();
    const changed = vi.fn();
    win.addEventListener(consent.analyticsConsentEvent, changed);

    storage.set(optOutKey, "1");
    win.dispatchEvent(storageEvent(optOutKey));

    expect(consent.analyticsAllowed()).toBe(false);
    expect((win as unknown as Record<string, unknown>)[`ga-disable-${consent.googleAnalyticsId}`]).toBe(true);
    expect(changed).toHaveBeenCalledOnce();

    storage.delete(optOutKey);
    win.dispatchEvent(storageEvent(optOutKey));
    expect(consent.analyticsAllowed()).toBe(true);
    stop();
  });

  it("ignores other keys and stops listening when asked", async () => {
    const win = fakeBrowser(storage);
    const consent = await loadConsent();
    const stop = consent.followOtherTabs();
    const changed = vi.fn();
    win.addEventListener(consent.analyticsConsentEvent, changed);

    win.dispatchEvent(storageEvent("mayofy:internal"));
    expect(changed).not.toHaveBeenCalled();

    stop();
    storage.set(optOutKey, "1");
    win.dispatchEvent(storageEvent(optOutKey));
    expect(changed).not.toHaveBeenCalled();
  });
});
