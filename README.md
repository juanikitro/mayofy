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
- `CONTACT_FORM_ENDPOINT`: endpoint HTTPS que recibe el formulario como JSON.
- `CONTACT_FORM_TOKEN`: bearer token opcional enviado únicamente desde el servidor.

Si WhatsApp no está configurado, los CTA llevan a la sección de contacto. Si el endpoint del formulario falta, la interfaz muestra un error honesto y ofrece continuar por WhatsApp.

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
- `tokens.css`: sistema visual portable.
- `.hallmark/log.json`: registro de la dirección estructural.

No deben publicarse clientes, métricas, testimonios o resultados sin autorización y verificación.
