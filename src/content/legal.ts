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
  /** Data requests and legal notices; switches to hola@mayofy.dev once that mailbox works. */
  email: publicChannels.email,
} as const;

/** How long each kind of data is kept; the policy and the plan doc read them from here. */
export const retention = {
  inquiries: "12 meses desde el último contacto",
  clients: "mientras dure el trabajo y 5 años más",
  analytics: "14 meses",
} as const;

export const legalUpdated = {
  privacy: "23 de noviembre de 2026",
  terms: "23 de noviembre de 2026",
} as const;
