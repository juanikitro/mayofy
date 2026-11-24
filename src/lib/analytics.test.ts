import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type AnalyticsModule = typeof import("@/lib/analytics");

/** A fresh copy of the module for each test: the queue and the gate are module state. */
async function loadAnalytics(): Promise<AnalyticsModule> {
  vi.resetModules();
  return import("@/lib/analytics");
}

describe("track", () => {
  beforeEach(() => {
    vi.stubGlobal("window", {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("queues events until GA is ready, then sends them in order", async () => {
    const { markAnalyticsReady, track } = await loadAnalytics();
    track("nav_click", { section: "inicio", item: "brand" });
    track("booking_open", { placement: "nav" });
    const gtag = vi.fn();
    markAnalyticsReady(gtag);
    expect(gtag.mock.calls).toEqual([
      ["event", "nav_click", { section: "inicio", item: "brand" }],
      ["event", "booking_open", { placement: "nav" }],
    ]);
  });

  it("sends at once after GA is ready", async () => {
    const { markAnalyticsReady, track } = await loadAnalytics();
    const gtag = vi.fn();
    markAnalyticsReady(gtag);
    track("pack_details_open", { pack: "web" });
    expect(gtag).toHaveBeenCalledWith("event", "pack_details_open", { pack: "web" });
  });

  it("keeps only the 40 newest events while GA loads", async () => {
    const { markAnalyticsReady, track } = await loadAnalytics();
    for (let i = 0; i < 45; i += 1) track("section_reached", { section: `s${i}`, island: i });
    const gtag = vi.fn();
    markAnalyticsReady(gtag);
    expect(gtag).toHaveBeenCalledTimes(40);
    expect(gtag.mock.calls[0][2]).toEqual({ section: "s5", island: 5 });
    expect(gtag.mock.calls[39][2]).toEqual({ section: "s44", island: 44 });
  });

  it("drops events, queued and new, while measuring is off", async () => {
    const { markAnalyticsReady, setAnalyticsConsent, track } = await loadAnalytics();
    track("nav_click", { section: "inicio", item: "link" });
    let allowed = false;
    setAnalyticsConsent(() => allowed);
    track("nav_click", { section: "packs", item: "link" });
    const gtag = vi.fn();
    markAnalyticsReady(gtag);
    expect(gtag).not.toHaveBeenCalled();
    allowed = true;
    track("nav_click", { section: "contacto", item: "cta" });
    expect(gtag).toHaveBeenCalledOnce();
    expect(gtag).toHaveBeenCalledWith("event", "nav_click", { section: "contacto", item: "cta" });
  });

  it("does not send what waited when consent is withdrawn before GA is ready", async () => {
    const { markAnalyticsReady, setAnalyticsConsent, track } = await loadAnalytics();
    let allowed = true;
    setAnalyticsConsent(() => allowed);
    track("booking_open", { placement: "nav" });
    allowed = false;
    const gtag = vi.fn();
    markAnalyticsReady(gtag);
    expect(gtag).not.toHaveBeenCalled();
  });

  it("treats a consent check that throws as off", async () => {
    const { markAnalyticsReady, setAnalyticsConsent, track } = await loadAnalytics();
    setAnalyticsConsent(() => {
      throw new Error("storage blocked");
    });
    const gtag = vi.fn();
    markAnalyticsReady(gtag);
    track("booking_open", { placement: "nav" });
    expect(gtag).not.toHaveBeenCalled();
  });

  it("never throws when gtag itself throws", async () => {
    const { markAnalyticsReady, track } = await loadAnalytics();
    markAnalyticsReady(() => {
      throw new Error("gtag broke");
    });
    expect(() => track("booking_open", { placement: "nav" })).not.toThrow();
  });

  it("does nothing on the server", async () => {
    vi.unstubAllGlobals();
    const { markAnalyticsReady, track } = await loadAnalytics();
    track("booking_open", { placement: "nav" });
    const gtag = vi.fn();
    markAnalyticsReady(gtag);
    expect(gtag).not.toHaveBeenCalled();
  });
});
