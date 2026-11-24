import { publicChannels } from "@/content/site";

/*
 * Who stands behind the site, for the privacy policy, the terms and the
 * footer. Confirmed by Juani on 23 November 2026
 * (docs/plans/2026-11-23-privacidad-legales.md).
 */
export const legalEntity = {
  name: "Juan Ignacio Portilla Kitroser",
  cuit: "20-44535030-4",
  taxStatus: "Monotributista",
  locality: "25 de Mayo, provincia de Buenos Aires, Argentina",
  /**
   * ARCA's Data Fiscal page (F. 960/D), decoded from the QR of the form Juani
   * generated on 23 November 2026; it opens the public record of this CUIT.
   * Plain http on purpose: it is the URL ARCA issues, and qr.afip.gob.ar did
   * not answer over https when checked.
   */
  dataFiscalUrl: "http://qr.afip.gob.ar/?qr=4wtmhXFACizt8znuUknxHw,,",
  /** Data requests and legal notices go to the site's public address. */
  email: publicChannels.email,
} as const;

/** How long each kind of data is kept; the policy and the plan doc read them from here. */
export const retention = {
  inquiries: "3 meses desde el último contacto",
  /** Proposal, invoices and payment receipts: the proof for any claim (art. 2560 CCyC). */
  clientRecords: "5 años después de terminado el trabajo",
  /** Chats, materials, access details and project files. */
  clientProject: "1 año después de terminado el trabajo",
  analytics: "14 meses",
} as const;

/**
 * When each legal page last changed, as an ISO date. The pages print it in
 * words and the sitemap reads it as `lastModified`, so there is one date to bump.
 */
export const legalUpdated = {
  privacy: "2026-11-23",
  terms: "2026-11-23",
} as const;

const longDate = new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** "2026-11-23" → "23 de noviembre de 2026". */
export function legalDateText(isoDate: string) {
  return longDate.format(new Date(`${isoDate}T00:00:00Z`));
}
