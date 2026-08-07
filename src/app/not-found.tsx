import Link from "next/link";
import { getWhatsAppHref } from "@/lib/whatsapp";

export default function NotFound() {
  return (
    <main className="not-found">
      <p>404</p>
      <h1>Este camino no abre ninguna conversación.</h1>
      <div>
        <Link className="button button--accent" href="/">
          Volver al inicio
        </Link>
        <a className="button button--quiet" href={getWhatsAppHref()}>
          Escribir por WhatsApp
        </a>
      </div>
    </main>
  );
}
