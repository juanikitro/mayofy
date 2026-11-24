import { describe, expect, it } from "vitest";

import { extras } from "@/content/extras";
import {
  emptySelection,
  formatUsd,
  requestMessage,
  setQuantity,
  summarize,
  toggleExtra,
  type PackOption,
  type Selection,
} from "@/lib/extras-request";

const packs: PackOption[] = [
  { id: "landing", name: "Landing", usd: 85 },
  { id: "gestion", name: "Gestión", usd: 150 },
];

const extra = (id: string) => {
  const found = extras.find((item) => item.id === id);
  if (!found) throw new Error(`No extra ${id}`);
  return found;
};

const pick = (...steps: Array<(selection: Selection) => Selection>) => steps.reduce((selection, step) => step(selection), emptySelection);
const add = (id: string) => (selection: Selection) => toggleExtra(selection, extra(id), extras);
const quantity = (id: string, value: number) => (selection: Selection) => setQuantity(selection, extra(id), value);

describe("summarize", () => {
  it("adds a pack and fixed extras, quantities included", () => {
    const selection = { ...pick(add("cobro-senas"), add("pagina-extra"), quantity("pagina-extra", 2)), pack: "gestion" };
    const summary = summarize(selection, extras, packs);
    expect(summary.lines.map((line) => [line.label, line.usd])).toEqual([
      ["2 páginas extra por servicio o zona", 40],
      ["Cobro de señas con link de pago", 50],
    ]);
    expect(summary.totalUsd).toBe(240);
    // A pack is a "desde" price, so the total is one too.
    expect(summary.from).toBe(true);
    expect(summary.ready).toBe(true);
  });

  it("is a closed total with only fixed extras and no pack", () => {
    const summary = summarize(pick(add("formulario"), add("aviso-mail")), extras, packs);
    expect(summary.totalUsd).toBe(40);
    expect(summary.from).toBe(false);
  });

  it("turns into a desde total when a desde extra is added", () => {
    const summary = summarize(pick(add("formulario"), add("conectar")), extras, packs);
    expect(summary.totalUsd).toBe(65);
    expect(summary.from).toBe(true);
  });

  it("lists each external service once and never adds it to the total", () => {
    const summary = summarize(pick(add("cobro-senas"), add("cobro-integrado"), add("bot-esencial")), extras, packs);
    expect(summary.services).toEqual(["Mercado Pago cobra una comisión por cada cobro.", "Meta cobra cada mensaje de WhatsApp."]);
    expect(summary.totalUsd).toBe(50 + 90 + 120);
  });

  it("counts Todavía no sé as no pack", () => {
    const summary = summarize({ ...emptySelection, pack: "unsure" }, extras, packs);
    expect(summary.unsure).toBe(true);
    expect(summary.pack).toBeUndefined();
    expect(summary.ready).toBe(false);
  });

  it("skips unknown ids and clamps stored quantities", () => {
    const summary = summarize({ extras: { "ya-no-existe": 3, "pagina-extra": 99, formulario: 4 } }, extras, packs);
    expect(summary.lines.map((line) => line.usd)).toEqual([200, 25]);
  });
});

describe("toggleExtra and setQuantity", () => {
  it("removes an extra on a second toggle", () => {
    expect(pick(add("formulario"), add("formulario")).extras).toEqual({});
  });

  it("keeps only one bot", () => {
    expect(pick(add("bot-esencial"), add("bot-integrado")).extras).toEqual({ "bot-integrado": 1 });
  });

  it("keeps the stepper between 1 and its maximum, and 0 removes", () => {
    expect(pick(add("pagina-extra"), quantity("pagina-extra", 12)).extras).toEqual({ "pagina-extra": 10 });
    expect(pick(add("pagina-extra"), quantity("pagina-extra", 0)).extras).toEqual({});
  });
});

describe("requestMessage", () => {
  it("writes the pack, the extras and the estimate", () => {
    const selection = { ...pick(add("cobro-senas"), add("pagina-extra"), quantity("pagina-extra", 2)), pack: "gestion" };
    expect(requestMessage(summarize(selection, extras, packs))).toBe(
      "Hola, quiero consultar por: pack Gestión + 2 páginas extra por servicio o zona + Cobro de señas con link de pago. Trabajo de Mayofy estimado: desde USD 240.",
    );
  });

  it("says when the reader does not know the pack yet", () => {
    const selection = { ...pick(add("presupuesto")), pack: "unsure" };
    expect(requestMessage(summarize(selection, extras, packs))).toBe(
      "Hola, quiero consultar por: Presupuesto que se calcula solo. Todavía no sé qué pack me conviene. Trabajo de Mayofy estimado: USD 60.",
    );
  });
});

describe("formatUsd", () => {
  it("uses the Argentine thousands separator", () => {
    expect(formatUsd(1250)).toBe("USD 1.250");
    expect(formatUsd(85)).toBe("USD 85");
  });
});
