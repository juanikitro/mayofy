"use client";

import { useId, useState } from "react";

import { ContactForm } from "@/components/contact-form";
import { WhatsAppIcon } from "@/components/world/whatsapp-icon";

type ContactAlternativesProps = {
  label: string;
  formToggle: string;
  formIntro: string;
  whatsappHref: string;
  formWhatsappHref: string;
};

/**
 * The quieter ways in, beside the agenda (island 6): WhatsApp and the form,
 * as one pair of equal secondary buttons under "¿Preferís escribirnos?". The
 * form button opens the form as a full-width panel under the section, so the
 * trigger can sit in the left column while the form takes the whole width.
 * Two grid items (the pair and the panel), placed by `.hearth__reach`.
 */
export function ContactAlternatives({ label, formToggle, formIntro, whatsappHref, formWhatsappHref }: ContactAlternativesProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <>
      <div className="hearth__alt">
        <p className="hearth__alt-label">{label}</p>
        <div className="hearth__alt-actions">
          <a className="btn btn--quiet" href={whatsappHref} target="_blank" rel="noreferrer">
            <WhatsAppIcon />
            Escribir por WhatsApp
          </a>
          <button
            className="btn btn--quiet hearth__form-toggle"
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="hearth__form-toggle-mark" aria-hidden="true" />
            {formToggle}
          </button>
        </div>
      </div>
      <div className="hearth__form" id={panelId} data-open={open ? "true" : undefined} inert={!open}>
        <div className="hearth__form-clip">
          <div className="hearth__form-panel">
            <p className="hearth__form-intro">{formIntro}</p>
            <ContactForm whatsappHref={formWhatsappHref} />
          </div>
        </div>
      </div>
    </>
  );
}
