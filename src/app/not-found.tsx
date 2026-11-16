import Link from "next/link";

import { IslandNav } from "@/components/world/island-nav";
import { WorldFooter } from "@/components/world/world-footer";
import { getWhatsAppHref } from "@/lib/whatsapp";

export default function NotFound() {
  return (
    <div className="world">
      <IslandNav />
      <main className="lost world-shell">
        <p className="lost__code">404</p>
        <h1>Esta isla no existe.</h1>
        <p>El enlace está roto o la página se movió. Volvé al recorrido o escribinos.</p>
        <div className="lost__actions">
          <Link className="btn btn--moss btn--lg" href="/">
            Volver al inicio
          </Link>
          <a className="btn btn--quiet btn--lg" href={getWhatsAppHref()} target="_blank" rel="noreferrer">
            Escribir por WhatsApp
          </a>
        </div>
      </main>
      <WorldFooter />
    </div>
  );
}
