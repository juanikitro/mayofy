# Portfolio Mayofy

Portfolio comercial de Mayofy basado en la dirección visual **Umbral Vivo**. La V1 está construida con Next.js, TypeScript y contenido versionado en el repositorio.

## Desarrollo local

```bash
npm install
copy .env.example .env.local
npm run dev
```

La aplicación queda disponible en `http://localhost:3000`.

## Configuración

- `NEXT_PUBLIC_WHATSAPP_NUMBER`: número completo con código de país, solo dígitos.
- `NEXT_PUBLIC_SITE_URL`: origen canónico del sitio.
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`: permite reemplazar el ID de Google Analytics 4 predeterminado (`G-F2DHJCS51K`). Un valor vacío desactiva Analytics.
- `CONTACT_FORM_ENDPOINT`: opcional. Sin valor, las consultas van por FormSubmit a `jpkitro@gmail.com` (constante del servidor en `src/app/api/contact/route.ts`). Acepta otra dirección de correo, la URL de FormSubmit (`https://formsubmit.co/ajax/<correo>`) o cualquier endpoint HTTPS que reciba el formulario como JSON. Con FormSubmit, la primera consulta dispara un correo de activación que hay que confirmar una vez; ver `docs/plans/2026-11-22-contacto-agenda.md`.
- `CONTACT_FORM_TOKEN`: bearer token opcional enviado únicamente desde el servidor.

Si WhatsApp no está configurado, los CTA llevan a la sección de contacto. Si el envío del formulario falla o tarda más de 55 s, la interfaz lo dice con honestidad y ofrece continuar por WhatsApp.

## Comandos

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Contenido y diseño

- `BRIEF.md`: decisiones comerciales y de marca.
- `CONTEXT.md`: lenguaje canónico.
- `docs/plans/`: diseño aprobado y plan de implementación.
- `src/content/site.ts`: copy estructurado de la home.
- `src/content/commercial-plans.ts`: packs, garantías, mantenimiento y automatizaciones.
- `src/content/contact-options.ts`: opciones del formulario calificador, compartidas entre el formulario y `/api/contact`.
- `src/app/privacidad/page.tsx`: política de privacidad (borrador basado en la Ley 25.326).
- `tokens.css`: sistema visual portable.
- `.hallmark/log.json`: registro de la dirección estructural.

No deben publicarse clientes, métricas, testimonios o resultados sin autorización y verificación.
