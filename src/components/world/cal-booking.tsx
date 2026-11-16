"use client";

import { useState } from "react";

/**
 * Cal.com booking embedded on demand. The iframe only loads after the
 * visitor asks for it, so the island stays light; the direct link works
 * without JavaScript and inside the iframe fallback.
 */
export function CalBooking({ url, label }: { url: string; label: string }) {
  const [open, setOpen] = useState(false);
  const embedUrl = `${url}?embed=true&theme=dark&layout=month_view`;

  return (
    <div className="booking" id="agenda">
      {open ? (
        <iframe
          className="booking__frame"
          src={embedUrl}
          title="Reservá tu reunión de diagnóstico en Cal.com"
          loading="lazy"
          allow="payment"
        />
      ) : (
        <button type="button" className="btn btn--moss btn--lg" onClick={() => setOpen(true)}>
          {label}
        </button>
      )}
      <a className="booking__link" href={url} target="_blank" rel="noreferrer">
        Abrir la agenda en Cal.com <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
