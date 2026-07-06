const dayNames: Record<string, string> = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miercoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sabado",
  sunday: "Domingo",
};

const dayOrder = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export type ParsedHours = {
  day: string;
  text: string;
  isClosed: boolean;
  isOpen24Hours: boolean;
};

function normalizeTimeRange(value: string): string {
  return value
    .replace(/\u202f/g, " ")
    .replace(/\u2009/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\bOpen 24 hours\b/gi, "Abierto 24 horas")
    .replace(/\bClosed\b/gi, "Cerrado")
    .replace(/\bAM\b/g, "a. m.")
    .replace(/\bPM\b/g, "p. m.")
    .trim();
}

export function parseOpeningHours(raw: string | null): ParsedHours[] {
  if (!raw) {
    return [];
  }

  const entries = raw
    .split("|")
    .map((item) => item.trim())
    .map((item) => {
      const [day, ...rest] = item.split(":");
      const dayKey = day.trim().toLowerCase();
      const text = normalizeTimeRange(rest.join(":"));
      return {
        day: dayNames[dayKey] ?? day.trim(),
        dayKey,
        text,
        isClosed: text.toLowerCase() === "cerrado",
        isOpen24Hours: text.toLowerCase() === "abierto 24 horas",
      };
    })
    .filter((entry) => entry.day.length > 0 && entry.text.length > 0);

  return entries.sort((a, b) => {
    const left = dayOrder.indexOf(a.dayKey);
    const right = dayOrder.indexOf(b.dayKey);
    return (left === -1 ? 99 : left) - (right === -1 ? 99 : right);
  });
}

export function summarizeOpeningHours(raw: string | null): string {
  const parsed = parseOpeningHours(raw);
  if (parsed.length === 0) {
    return "Horario a confirmar";
  }

  if (parsed.every((entry) => entry.isOpen24Hours)) {
    return "Abierto 24 horas";
  }

  const closedDays = parsed.filter((entry) => entry.isClosed).map((entry) => entry.day);
  const openDays = parsed.filter((entry) => !entry.isClosed);
  const firstOpen = openDays[0];
  const lastOpen = openDays.at(-1);

  if (!firstOpen || !lastOpen) {
    return "Horario a confirmar";
  }

  if (firstOpen.text === lastOpen.text && closedDays.length === 0) {
    return `${firstOpen.day} a ${lastOpen.day}: ${firstOpen.text}`;
  }

  if (closedDays.length > 0) {
    return `${firstOpen.day} a ${lastOpen.day}; ${closedDays.join(", ")} cerrado`;
  }

  return `${firstOpen.day}: ${firstOpen.text}`;
}
