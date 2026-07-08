import type { Business } from "./business-schema.js";

const genericLocation = "la zona";

function cleanAddressCityPart(value: string): string | null {
  const cleaned = value
    .replace(/^[A-Z]?\d{4}[A-Z]{0,4}\s+/iu, "")
    .replace(/^\d{4}\s+/u, "")
    .trim();

  if (!cleaned || /^argentina$/iu.test(cleaned) || /^provincia de /iu.test(cleaned)) {
    return null;
  }

  return cleaned;
}

export function cityFromAddress(address: string): string | null {
  const parts = address
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  for (const part of parts.slice(1)) {
    const city = cleanAddressCityPart(part);
    if (city) {
      return city;
    }
  }

  return null;
}

export function businessCityLabel(business: Business): string {
  return business.city?.trim() || cityFromAddress(business.address) || genericLocation;
}

export function businessAreaLabel(business: Business): string {
  const city = businessCityLabel(business);
  const area = business.neighborhood_or_area?.trim();

  if (!area) {
    return city;
  }

  if (city === genericLocation) {
    return area;
  }

  if (area.toLocaleLowerCase("es-AR") === city.toLocaleLowerCase("es-AR")) {
    return city;
  }

  return `${area}, ${city}`;
}
