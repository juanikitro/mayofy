import path from "node:path";
import { slugify } from "./research/slug.js";

export function flagValue(argv: string[], flag: string, fallback: string | null = null): string | null {
  const index = argv.indexOf(flag);
  if (index < 0) {
    return fallback;
  }
  const value = argv[index + 1];
  if (!value) {
    throw new Error(`${flag} requires a value.`);
  }
  return value;
}

export function positionalValue(argv: string[], index: number): string | null {
  const value = argv[index];
  return value && !value.startsWith("--") ? value : null;
}

export function sessionNameFromDataset(datasetPath: string, fallback = "session"): string {
  const basename = path.basename(datasetPath).replace(/\.[^.]+$/u, "");
  const withoutSuffix = basename.replace(/(?:-)?businesses$/u, "").replace(/(?:-)?dataset$/u, "");
  return slugify(withoutSuffix) || fallback;
}

export function sessionNameFromCityAndDate(city: string, date: Date): string {
  const citySlug = slugify(city);
  if (!citySlug) {
    throw new Error("City must contain at least one alphanumeric character.");
  }
  return `${citySlug}-${date.toISOString().slice(0, 10)}`;
}

export function generatedSessionDir(sessionName: string): string {
  const slug = slugify(sessionName);
  if (!slug) {
    throw new Error("Session name must contain at least one alphanumeric character.");
  }
  return path.join("generated", slug);
}

export function resolveGeneratedDir(
  argv: string[],
  options: { positionalIndex?: number; datasetPath?: string; fallbackSession?: string; outFlag?: string | null; city?: string | null } = {},
): string {
  const outFlag = options.outFlag === undefined ? "--out" : options.outFlag;
  if (outFlag) {
    const explicitOut = flagValue(argv, outFlag);
    if (explicitOut) {
      return explicitOut;
    }
  }

  const positional = options.positionalIndex == null ? null : positionalValue(argv, options.positionalIndex);
  if (positional) {
    return positional;
  }

  const explicitSession = flagValue(argv, "--session") ?? flagValue(argv, "--run");
  if (explicitSession) {
    return generatedSessionDir(explicitSession);
  }

  const city = options.city ?? flagValue(argv, "--city");
  if (city) {
    return generatedSessionDir(sessionNameFromCityAndDate(city, new Date()));
  }

  const session =
    options.datasetPath ? sessionNameFromDataset(options.datasetPath, options.fallbackSession) : options.fallbackSession ?? "session";

  return generatedSessionDir(session);
}
