import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  formatPesos,
  getBlueRate,
  getPesoPrices,
  readQuote,
  rateSources,
  resetLastGoodQuote,
  roundedPesos,
} from "@/lib/peso-prices";

const now = Date.parse("2026-11-24T15:00:00.000Z");
const dolarApi = rateSources[0];
const bluelytics = rateSources[1];

const dolarApiAnswer = (venta: unknown, fechaActualizacion: unknown = "2026-11-24T14:58:00.000Z") => ({
  moneda: "USD",
  casa: "blue",
  venta,
  fechaActualizacion,
});

describe("roundedPesos", () => {
  it("rounds up to the next $5.000", () => {
    expect(roundedPesos(85, 1675)).toBe(145_000);
    expect(roundedPesos(120, 1690)).toBe(205_000);
  });

  it("keeps an exact multiple of $5.000 as it is", () => {
    expect(roundedPesos(100, 1450)).toBe(145_000);
  });

  it("does not jump a step on a floating point error", () => {
    // 35.2 * 1562.5 is 55000.00000000001 in floating point.
    expect(roundedPesos(35.2, 1562.5)).toBe(55_000);
    expect(roundedPesos(8.8, 6250)).toBe(55_000);
  });

  it("never quotes pesos below the USD price", () => {
    for (const usd of [30, 85, 120, 250]) {
      for (const rate of [1001.37, 1690, 2333.33]) {
        expect(roundedPesos(usd, rate)).toBeGreaterThanOrEqual(usd * rate);
      }
    }
  });
});

describe("formatPesos", () => {
  it("formats with the Argentine thousands separator and a non-breaking space", () => {
    // A non-breaking space keeps the sign with the amount.
    expect(formatPesos(145_000)).toBe("$ 145.000");
  });
});

describe("readQuote", () => {
  it("reads both sources' answers", () => {
    expect(readQuote(dolarApi, dolarApiAnswer(1690), now)).toEqual({
      rate: 1690,
      updatedAt: Date.parse("2026-11-24T14:58:00.000Z"),
    });
    const blue = { blue: { value_sell: 1690.0 }, last_update: "2026-11-24T12:45:12.572-03:00" };
    expect(readQuote(bluelytics, blue, now)?.rate).toBe(1690);
  });

  it("accepts a rate sent as a string", () => {
    expect(readQuote(dolarApi, dolarApiAnswer("1690"), now)?.rate).toBe(1690);
  });

  it("rejects an absurd rate", () => {
    expect(readQuote(dolarApi, dolarApiAnswer(16.9), now)).toBeUndefined();
    expect(readQuote(dolarApi, dolarApiAnswer(169_000), now)).toBeUndefined();
    expect(readQuote(dolarApi, dolarApiAnswer("n/a"), now)).toBeUndefined();
    expect(readQuote(dolarApi, null, now)).toBeUndefined();
  });

  it("rejects a stale, future or missing date", () => {
    expect(readQuote(dolarApi, dolarApiAnswer(1690, "2026-11-19T15:00:00.000Z"), now)).toBeUndefined();
    expect(readQuote(dolarApi, dolarApiAnswer(1690, "2026-11-27T15:00:00.000Z"), now)).toBeUndefined();
    expect(readQuote(dolarApi, dolarApiAnswer(1690, null), now)).toBeUndefined();
  });

  it("accepts a quote from the last working day of a long weekend", () => {
    expect(readQuote(dolarApi, dolarApiAnswer(1690, "2026-11-21T15:00:00.000Z"), now)?.rate).toBe(1690);
  });
});

describe("getBlueRate and getPesoPrices", () => {
  const answers = new Map<string, () => Promise<Response>>();

  beforeEach(() => {
    vi.useFakeTimers({ now, toFake: ["Date"] });
    resetLastGoodQuote();
    answers.clear();
    vi.stubGlobal(
      "fetch",
      vi.fn((url: string) => (answers.get(url) ?? (() => Promise.reject(new TypeError("offline"))))()),
    );
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  const answer = (url: string, body: unknown, status = 200) =>
    answers.set(url, () => Promise.resolve(new Response(JSON.stringify(body), { status })));

  it("uses the first source when it answers", async () => {
    answer(dolarApi.url, dolarApiAnswer(1690));
    expect(await getBlueRate()).toBe(1690);
  });

  it("falls back to the second source when the first fails or is absurd", async () => {
    answer(dolarApi.url, dolarApiAnswer(1.69));
    answer(bluelytics.url, { blue: { value_sell: 1700 }, last_update: "2026-11-24T12:45:12.572-03:00" });
    expect(await getBlueRate()).toBe(1700);
  });

  it("shows USD only when no source answers and nothing recent is remembered", async () => {
    expect(await getBlueRate()).toBeUndefined();
    expect(await getPesoPrices()).toBeUndefined();
  });

  it("reuses the last good quote while it is recent, then drops it", async () => {
    answer(dolarApi.url, dolarApiAnswer(1690));
    expect(await getBlueRate()).toBe(1690);
    answers.clear();
    expect(await getBlueRate()).toBe(1690);
    vi.setSystemTime(now + 5 * 24 * 60 * 60 * 1000);
    expect(await getBlueRate()).toBeUndefined();
  });

  it("prices every pack in rounded pesos", async () => {
    answer(dolarApi.url, dolarApiAnswer(1690));
    const prices = await getPesoPrices();
    expect(prices).toBeDefined();
    for (const value of Object.values(prices ?? {})) expect(value).toMatch(/^\$ \d{1,3}(\.\d{3})*$/);
  });
});
