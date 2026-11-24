import type { Extra } from "@/content/extras";

/**
 * The extras builder's arithmetic and its WhatsApp message, kept pure so it
 * is tested without a browser (docs/plans/2026-11-24-isla4-extras.md).
 * Mayofy's work only: external services never enter the total.
 */

/** A pack a reader can start from; "unsure" is "Todavía no sé". */
export type PackOption = { id: string; name: string; usd: number };

export type Selection = {
  /** A pack id, "unsure", or nothing picked. */
  pack?: string;
  /** Extra id -> quantity (1 for an extra without a stepper). */
  extras: Readonly<Record<string, number>>;
};

export type SummaryLine = { id: string; label: string; usd: number };

export type Summary = {
  pack?: PackOption;
  unsure: boolean;
  lines: SummaryLine[];
  totalUsd: number;
  /** True when a pack (a "desde" price) or a "desde" extra is in the total. */
  from: boolean;
  /** The external services the client will have in their name, once each. */
  services: string[];
  /** Something worth sending: a pack or at least one extra. */
  ready: boolean;
};

export const emptySelection: Selection = { extras: {} };

const usdFormat = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 });

/** 1250 -> "USD 1.250". */
export function formatUsd(amount: number) {
  return `USD ${usdFormat.format(amount)}`;
}

/** "USD 290" or "desde USD 290". */
export function totalLabel(summary: Pick<Summary, "totalUsd" | "from">) {
  return `${summary.from ? "desde " : ""}${formatUsd(summary.totalUsd)}`;
}

function clampQuantity(extra: Extra, quantity: number) {
  const max = extra.quantity?.max ?? 1;
  return Math.min(max, Math.max(0, Math.floor(Number.isFinite(quantity) ? quantity : 0)));
}

/** "Cobro de señas con link de pago", "2 páginas extra por servicio o zona". */
export function extraLabel(extra: Extra, quantity: number) {
  if (!extra.quantity || quantity <= 1) return extra.title;
  return `${quantity} ${extra.quantity.many}`;
}

/**
 * Turns a selection on or off. Turning on an extra that belongs to a choice
 * (the two bots) drops the others of that choice.
 */
export function toggleExtra(selection: Selection, extra: Extra, all: readonly Extra[]): Selection {
  const next = { ...selection.extras };
  if (next[extra.id]) {
    delete next[extra.id];
  } else {
    if (extra.choice) for (const other of all) if (other.choice === extra.choice) delete next[other.id];
    next[extra.id] = 1;
  }
  return { ...selection, extras: next };
}

/** Sets an extra's quantity within its stepper's range; 0 removes it. */
export function setQuantity(selection: Selection, extra: Extra, quantity: number): Selection {
  const next = { ...selection.extras };
  const clamped = clampQuantity(extra, quantity);
  if (clamped === 0) delete next[extra.id];
  else next[extra.id] = clamped;
  return { ...selection, extras: next };
}

/**
 * The summary of a selection. Unknown ids (an extra renamed since the
 * selection was stored) are skipped; lines keep the order of `all`.
 */
export function summarize(selection: Selection, all: readonly Extra[], packs: readonly PackOption[]): Summary {
  const pack = packs.find((option) => option.id === selection.pack);
  const lines: SummaryLine[] = [];
  const services: string[] = [];
  let from = Boolean(pack);
  for (const extra of all) {
    const quantity = clampQuantity(extra, selection.extras[extra.id] ?? 0);
    if (quantity === 0) continue;
    lines.push({ id: extra.id, label: extraLabel(extra, quantity), usd: extra.price * quantity });
    if (extra.kind === "from") from = true;
    if (extra.service && !services.includes(extra.service)) services.push(extra.service);
  }
  const totalUsd = (pack?.usd ?? 0) + lines.reduce((sum, line) => sum + line.usd, 0);
  return { pack, unsure: selection.pack === "unsure", lines, totalUsd, from, services, ready: Boolean(pack) || lines.length > 0 };
}

/**
 * The WhatsApp text: "Hola, quiero consultar por: pack Gestión + Cobro de
 * señas con link de pago + 2 páginas extra por servicio o zona. Trabajo de
 * Mayofy estimado: desde USD 240."
 */
export function requestMessage(summary: Summary) {
  const parts = [...(summary.pack ? [`pack ${summary.pack.name}`] : []), ...summary.lines.map((line) => line.label)];
  const unsure = summary.unsure ? " Todavía no sé qué pack me conviene." : "";
  return `Hola, quiero consultar por: ${parts.join(" + ")}.${unsure} Trabajo de Mayofy estimado: ${totalLabel(summary)}.`;
}
