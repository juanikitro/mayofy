import { commercialPlans } from "@/content/commercial-plans";

/**
 * Peso reference prices for the USD packs (Juani, 2026-11-23): the blue
 * dollar sell rate, rounded up to the next $5.000 so a peso payment never
 * falls below the USD price. USD stays the base price everywhere.
 *
 * The rate is fetched on the server and cached by Next for three hours
 * (`next.revalidate` turns the home page into ISR), so visitors never call
 * the quote APIs and the site needs no backend or paid service of its own.
 * A quote counts only when its rate is plausible and its date is recent.
 * When every source fails, the last good quote of this server process is
 * reused while it is recent; after that the cards fall back to USD only and
 * the build never breaks. See docs/plans/2026-11-23-comercial.md.
 */

const REVALIDATE_SECONDS = 3 * 60 * 60;
const TIMEOUT_MS = 5000;
const ROUNDING_STEP = 5000;
const DAY_MS = 24 * 60 * 60 * 1000;
/**
 * A quote older than this is stale, not today's rate. The blue rate does not
 * move on weekends and holidays, so four days covers a long weekend.
 */
const QUOTE_MAX_AGE_MS = 4 * DAY_MS;
/**
 * Anything outside this band is a broken answer, not a rate (the blue sell
 * rate was $1.690 on 24 November 2026). Out of band the cards show USD only,
 * which is safe: a wrong low rate would quote pesos below the USD price.
 * Widen it if the real rate ever leaves it.
 */
export const PLAUSIBLE_RATE = { min: 1000, max: 10_000 } as const;

/** A sell rate and when the source last updated it. */
export type Quote = { rate: number; updatedAt: number };

type RateSource = { url: string; read: (data: unknown) => { rate: unknown; updatedAt: unknown } };

/** Free public quotes with no key; the second one only answers when the first fails. */
export const rateSources: RateSource[] = [
  {
    url: "https://dolarapi.com/v1/dolares/blue",
    read: (data) => {
      const quote = data as { venta?: unknown; fechaActualizacion?: unknown } | null;
      return { rate: quote?.venta, updatedAt: quote?.fechaActualizacion };
    },
  },
  {
    url: "https://api.bluelytics.com.ar/v2/latest",
    read: (data) => {
      const quote = data as { blue?: { value_sell?: unknown }; last_update?: unknown } | null;
      return { rate: quote?.blue?.value_sell, updatedAt: quote?.last_update };
    },
  },
];

let lastGood: Quote | undefined;

/** Clears the remembered rate; only tests need it. */
export function resetLastGoodQuote() {
  lastGood = undefined;
}

/**
 * A usable quote from one source's answer, or undefined when the rate is
 * missing or out of band, or its date is missing, in the future or stale.
 */
export function readQuote(source: RateSource, data: unknown, now: number): Quote | undefined {
  const raw = source.read(data);
  const rate = typeof raw.rate === "string" ? Number(raw.rate) : raw.rate;
  if (typeof rate !== "number" || !Number.isFinite(rate) || rate < PLAUSIBLE_RATE.min || rate > PLAUSIBLE_RATE.max) {
    return undefined;
  }
  const updatedAt = typeof raw.updatedAt === "string" ? Date.parse(raw.updatedAt) : NaN;
  // A clock a few minutes ahead of ours is fine; a date days ahead is not.
  if (!Number.isFinite(updatedAt) || updatedAt > now + DAY_MS || now - updatedAt > QUOTE_MAX_AGE_MS) return undefined;
  return { rate, updatedAt };
}

async function fetchQuote(source: RateSource) {
  try {
    const response = await fetch(source.url, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) return undefined;
    return readQuote(source, await response.json(), Date.now());
  } catch {
    return undefined;
  }
}

/**
 * The blue dollar sell rate, or undefined when no source answers with a
 * fresh, plausible quote and the last good one of this process is stale too.
 */
export async function getBlueRate() {
  for (const source of rateSources) {
    const quote = await fetchQuote(source);
    if (quote) {
      lastGood = quote;
      return quote.rate;
    }
  }
  return lastGood && Date.now() - lastGood.updatedAt <= QUOTE_MAX_AGE_MS ? lastGood.rate : undefined;
}

/** "USD 85" -> 85. */
export function usdAmount(price: string) {
  const amount = Number(price.replace(/[^\d.]/g, ""));
  return Number.isFinite(amount) && amount > 0 ? amount : undefined;
}

/**
 * USD 85 at $1.675 -> 142.375 -> 145.000: always up, in steps of $5.000.
 * Works in whole cents: in floating point USD 35,20 at $1.562,50 gives
 * 55.000,00000000001 and would jump to 60.000.
 */
export function roundedPesos(usd: number, rate: number) {
  const centsProduct = Math.round(usd * 100) * Math.round(rate * 100); // pesos x 10.000
  const step = ROUNDING_STEP * 10_000;
  const remainder = centsProduct % step;
  const roundedUp = remainder === 0 ? centsProduct : centsProduct - remainder + step;
  return roundedUp / 10_000;
}

const pesoFormat = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 });

/** 145000 -> "$ 145.000", with a non-breaking space so the sign never wraps alone. */
export function formatPesos(amount: number) {
  return `$ ${pesoFormat.format(amount)}`;
}

/** Each pack's rounded peso price, keyed by plan id; undefined means show USD only. */
export type PesoPrices = Partial<Record<string, string>>;

export async function getPesoPrices(): Promise<PesoPrices | undefined> {
  const rate = await getBlueRate();
  if (!rate) return undefined;
  return Object.fromEntries(
    commercialPlans.flatMap((plan) => {
      const usd = usdAmount(plan.price);
      return usd ? [[plan.id, formatPesos(roundedPesos(usd, rate))]] : [];
    }),
  );
}
