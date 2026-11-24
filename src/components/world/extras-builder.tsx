"use client";

import { useId, useMemo, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { flushSync } from "react-dom";

import { commercialIntro } from "@/content/commercial-plans";
import { extras, extrasCopy, type Extra } from "@/content/extras";
import { track } from "@/lib/analytics";
import {
  emptySelection,
  formatUsd,
  requestMessage,
  setQuantity,
  summarize,
  toggleExtra,
  totalLabel,
  type PackOption,
  type Selection,
} from "@/lib/extras-request";
import { formatPesos, roundedPesos } from "@/lib/peso-prices";
import { getWhatsAppHref } from "@/lib/whatsapp";

/**
 * Island 4's "Sumar" builder (docs/plans/2026-11-24-isla4-extras.md). Each
 * extra row gets a toggle (and a stepper where it has a quantity); the
 * summary at the end of the list ("Tu consulta") picks the pack, adds up
 * Mayofy's work in USD and pesos, lists the services the client will have
 * in their name and writes the WhatsApp message. It is not a cart and takes
 * no payment. Selections last for the browser tab only (sessionStorage,
 * optional: the builder works without it).
 */

const storageKey = "mayofy:extras";

/** A stored selection, or the empty one when there is none or it is not ours. */
function readStored(): Selection {
  try {
    const stored = JSON.parse(window.sessionStorage.getItem(storageKey) ?? "null") as unknown;
    if (!stored || typeof stored !== "object") return emptySelection;
    const { pack, extras: chosen } = stored as { pack?: unknown; extras?: unknown };
    const picked: Record<string, number> = {};
    if (chosen && typeof chosen === "object") {
      for (const [id, quantity] of Object.entries(chosen)) if (typeof quantity === "number") picked[id] = quantity;
    }
    return { pack: typeof pack === "string" ? pack : undefined, extras: picked };
  } catch {
    return emptySelection;
  }
}

/**
 * One selection for the page, shared by every "Sumar" and the summary. The
 * server and the hydrating render see the empty selection; the stored one
 * arrives right after, so both markups agree. `changed` turns true on the
 * reader's first change, so a restored selection is never read out.
 */
const store = {
  selection: null as Selection | null,
  changed: false,
  listeners: new Set<() => void>(),
};

function snapshot() {
  store.selection ??= readStored();
  return store.selection;
}

function serverSnapshot() {
  return emptySelection;
}

function subscribe(listener: () => void) {
  store.listeners.add(listener);
  return () => {
    store.listeners.delete(listener);
  };
}

function update(change: (selection: Selection) => Selection) {
  store.selection = change(snapshot());
  store.changed = true;
  try {
    window.sessionStorage.setItem(storageKey, JSON.stringify(store.selection));
  } catch {
    // Private windows and blocked storage: the builder still works for this view.
  }
  for (const listener of store.listeners) listener();
}

function useExtras() {
  const selection = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  return { selection, update, changed: store.changed };
}

/** "Sumar" and, once added, the stepper of an extra with a quantity. */
export function ExtraControls({ extra }: { extra: Extra }) {
  const { selection } = useExtras();
  const quantity = selection.extras[extra.id] ?? 0;
  const added = quantity > 0;
  const max = extra.quantity?.max ?? 1;

  // aria-disabled, not disabled: a button that disables itself under the keyboard would drop the focus.
  const step = (delta: number) => {
    const next = quantity + delta;
    if (next < 1 || next > max) return;
    update((current) => setQuantity(current, extra, next));
  };

  return (
    <div className="extra__controls">
      {extra.quantity && added ? (
        <div className="extra__stepper" role="group" aria-label={`Cantidad de ${extra.title}`}>
          <button type="button" aria-label="Restar uno" aria-disabled={quantity <= 1} onClick={() => step(-1)}>
            <span aria-hidden="true">−</span>
          </button>
          <output>{quantity}</output>
          <button type="button" aria-label="Sumar uno" aria-disabled={quantity >= max} onClick={() => step(1)}>
            <span aria-hidden="true">+</span>
          </button>
        </div>
      ) : null}
      <button type="button" className="extra__add" aria-pressed={added} onClick={() => update((current) => toggleExtra(current, extra, extras))}>
        <span className="extra__mark" aria-hidden="true" />
        {extrasCopy.add}
        <span className="extras-sr"> {extra.title}</span>
      </button>
    </div>
  );
}

/**
 * "Tu consulta". Empty, it rests at the end of the list with the pack
 * choice. Once something is added it becomes a compact bar held at the
 * bottom of the screen while the list is in view (CSS sticky, so it never
 * leaves island 4), and opens in place: a panel on wide screens, a bottom
 * sheet on phones. It never locks the page's scroll; Escape closes it.
 */
export function ExtrasSummary({ packs, rate }: { packs: readonly PackOption[]; rate?: number }) {
  const { selection, changed } = useExtras();
  const summary = useMemo(() => summarize(selection, extras, packs), [selection, packs]);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const linesRef = useRef<HTMLUListElement>(null);
  const ids = useId();
  const bodyId = `${ids}-body`;

  const active = summary.lines.length > 0 || summary.pack !== undefined;
  const count = summary.lines.length;
  const countLabel = count === 1 ? "1 extra" : `${count} extras`;
  const pesos = rate ? formatPesos(roundedPesos(summary.totalUsd, rate)) : undefined;

  // Emptied, the summary folds back, so the next "Sumar" starts from the bar.
  const [wasActive, setWasActive] = useState(active);
  if (wasActive !== active) {
    setWasActive(active);
    if (!active) setOpen(false);
  }

  // The live region speaks after the reader's own changes, never on the restore.
  const announcement = !changed
    ? ""
    : summary.ready
      ? `${summary.pack ? `Pack ${summary.pack.name}, ` : ""}${countLabel}. ${extrasCopy.workLabel}: ${totalLabel(summary)}.`
      : "Tu consulta está vacía.";

  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape" && open) {
      event.stopPropagation();
      close();
    }
  };

  const clear = () => {
    update(() => emptySelection);
    titleRef.current?.focus();
  };

  // The removed line takes its button with it: the focus moves to the line that
  // took its place (or the one before), or to the title once none is left.
  const remove = (extra: Extra, index: number) => {
    flushSync(() => update((current) => setQuantity(current, extra, 0)));
    const buttons = linesRef.current?.querySelectorAll<HTMLButtonElement>(".extras-summary__remove");
    const next = buttons?.[Math.min(index, buttons.length - 1)];
    (next ?? titleRef.current)?.focus();
  };

  const send = () => {
    track("extras_request", {
      pack: summary.pack?.id ?? (summary.unsure ? "unsure" : "none"),
      extras: count,
      total_usd: summary.totalUsd,
      from: summary.from,
    });
  };

  const showBody = !active || open;

  return (
    <section
      className={`extras-summary panel${active ? " extras-summary--active" : ""}${open ? " extras-summary--open" : ""}`}
      aria-labelledby={`${ids}-title`}
      onKeyDown={onKeyDown}
    >
      <div className="extras-summary__bar">
        <h3 id={`${ids}-title`} ref={titleRef} tabIndex={-1}>
          {extrasCopy.summaryTitle}
        </h3>
        {active ? (
          <>
            <p className="extras-summary__glance">
              {summary.pack ? `${summary.pack.name}${count ? " + " : ""}` : ""}
              {count ? countLabel : ""} · <strong>{totalLabel(summary)}</strong>
            </p>
            <button type="button" className="extras-summary__toggle" ref={toggleRef} aria-expanded={open} aria-controls={bodyId} onClick={() => setOpen((value) => !value)}>
              {open ? extrasCopy.close : extrasCopy.open}
            </button>
          </>
        ) : null}
      </div>

      <div className="extras-summary__body" id={bodyId} hidden={!showBody}>
        <fieldset className="extras-summary__packs">
          <legend>{extrasCopy.packLegend}</legend>
          {[...packs, { id: "unsure", name: extrasCopy.packUnsure, usd: 0 }].map((pack) => (
            <label className="extras-pack" key={pack.id}>
              <input
                type="radio"
                name={`${ids}-pack`}
                value={pack.id}
                checked={selection.pack === pack.id}
                onChange={() => update((current) => ({ ...current, pack: pack.id }))}
              />
              <span>
                {pack.name}
                {pack.usd ? <small> desde {formatUsd(pack.usd)}</small> : null}
              </span>
            </label>
          ))}
        </fieldset>

        {count ? (
          <ul className="extras-summary__lines" ref={linesRef}>
            {summary.lines.map((line, index) => {
              const extra = extras.find((item) => item.id === line.id)!;
              return (
                <li key={line.id}>
                  <span>{line.label}</span>
                  <span className="extras-summary__usd">
                    {extra.kind === "from" ? "desde " : ""}
                    {formatUsd(line.usd)}
                  </span>
                  <button type="button" className="extras-summary__remove" onClick={() => remove(extra, index)}>
                    Quitar<span className="extras-sr"> {line.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="extras-summary__empty">{extrasCopy.empty}</p>
        )}

        {summary.ready ? (
          <div className="extras-summary__total">
            <p>
              {extrasCopy.workLabel}: <strong>{totalLabel(summary)}</strong>
            </p>
            {pesos ? (
              <p className="extras-summary__pesos">
                ≈ {summary.from ? "desde " : ""}
                <strong>{pesos}</strong> {commercialIntro.pesoRateLabel}
              </p>
            ) : (
              <p className="extras-summary__pesos">{commercialIntro.priceNote}</p>
            )}
          </div>
        ) : null}

        {summary.services.length ? (
          <div className="extras-summary__services">
            <p>{extrasCopy.servicesLabel}:</p>
            <ul>
              {summary.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <p className="extras-summary__note">
          {extrasCopy.servicesNote}
          {summary.from ? ` ${extrasCopy.fromNote}` : ""}
        </p>

        {summary.ready ? (
          <div className="extras-summary__actions">
            <a className="btn btn--moss" href={getWhatsAppHref(requestMessage(summary))} target="_blank" rel="noreferrer" onClick={send}>
              {extrasCopy.cta}
            </a>
            <button type="button" className="extras-summary__clear" onClick={clear}>
              {extrasCopy.clear}
            </button>
          </div>
        ) : null}
      </div>

      <p className="extras-sr" aria-live="polite">
        {announcement}
      </p>
    </section>
  );
}
