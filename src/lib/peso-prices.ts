import { commercialPlans } from "@/content/commercial-plans";

/**
 * Peso reference prices for the USD packs (Juani, 2026-11-23): the blue
 * dollar sell rate, rounded up to the next $5.000 so a peso payment never
 * falls below the USD price. USD stays the base price everywhere.
 *
 * The rate is fetched on the server and cached by Next for three hours
 * (`next.revalidate` turns the home page into ISR), so visitors never call
 * the quote APIs and the site needs no backend or paid service of its own.
 * When every source fails, the last good rate of this server process is
 * reused for up to a day; after that the cards fall back to USD only and
 * the build never breaks. See docs/plans/2026-11-23-comercial.md.
 */

const REVALIDATE_SECONDS = 3 * 60 * 60;
const TIMEOUT_MS = 5000;
const ROUNDING_STEP = 5000;
const LAST_GOOD_MAX_AGE_MS = 24 * 60 * 60 * 1000;
/** Anything outside this band is treated as a broken answer, not a rate. */
const PLAUSIBLE_RATE = { min: 100, max: 100_000 } as const;

type RateSource = { url: string; read: (data: unknown) => unknown };

/** Free public quotes with no key; the second one only answers when the first fails. */
const sources: RateSource[] = [
  { url: "https://dolarapi.com/v1/dolares/blue", read: (data) => (data as { venta?: unknown } | null)?.venta },
  {
    url: "https://api.bluelytics.com.ar/v2/latest",
    read: (data) => (data as { blue?: { value_sell?: unknown } } | null)?.blue?.value_sell,
  },
];

let lastGood: { rate: number; at: number } | undefined;

function plausibleRate(value: unknown) {
  const rate = typeof value === "string" ? Number(value) : value;
  return typeof rate === "number" && Number.isFinite(rate) && rate >= PLAUSIBLE_RATE.min && rate <= PLAUSIBLE_RATE.max
    ? rate
    : undefined;
}

async function readSource(source: RateSource) {
  try {
    const response = await fetch(source.url, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) return undefined;
    return plausibleRate(source.read(await response.json()));
  } catch {
    return undefined;
  }
}

/** The blue dollar sell rate, or undefined when no source answers and no recent rate is known. */
export async function getBlueRate() {
  for (const source of sources) {
    const rate = await readSource(source);
    if (rate) {
      lastGood = { rate, at: Date.now() };
      return rate;
    }
  }
  return lastGood && Date.now() - lastGood.at < LAST_GOOD_MAX_AGE_MS ? lastGood.rate : undefined;
}

/** "USD 85" -> 85. */
export function usdAmount(price: string) {
  const amount = Number(price.replace(/[^\d.]/g, ""));
  return Number.isFinite(amount) && amount > 0 ? amount : undefined;
}

/** USD 85 at $1.675 -> 142.375 -> 145.000: always up, in steps of $5.000. */
export function roundedPesos(usd: number, rate: number) {
  return Math.ceil((usd * rate) / ROUNDING_STEP) * ROUNDING_STEP;
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
