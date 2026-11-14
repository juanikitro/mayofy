# Domains

The site is hosted on **Railway** (project `mayofy`, environment `production`, service `web`).
Vercel is used only as the **registrar and DNS provider** for `mayofy.dev`; it does not host the site.

## Active domains

| Domain | Registrar / DNS | Points to |
| --- | --- | --- |
| `mayofy.dev` (primary, canonical) | Vercel (nameservers `ns1/ns2.vercel-dns.com`) | Railway service `web` |
| `www.mayofy.dev` | Vercel DNS | Railway service `web` |
| `mayofy.juanikitro.com` (legacy) | Existing custom domain | Railway service `web` |

`mayofy.dev` was purchased on 2026-11-14 and expires on 2027-11-14 (renewal managed in Vercel).

## How `mayofy.dev` is wired

1. The custom domain was added to the Railway service:

   ```sh
   railway domain mayofy.dev --service web
   ```

   Railway returned the records it requires (domain ID `2d67c319-0235-4f2e-bef6-c6cc959f7a99`).

2. The records were created in Vercel DNS:

   | Name | Type | Value |
   | --- | --- | --- |
   | `@` (apex) | `ALIAS` | `k6pio74j.up.railway.app` |
   | `_railway-verify` | `TXT` | `railway-verify=9c728acc…0036` (full value in Railway) |

   Railway asks for a `CNAME` on `@`, but a CNAME is not allowed on the zone apex.
   Vercel's `ALIAS` record flattens to the same target, which is the equivalent.

   ```sh
   vercel dns add mayofy.dev '' ALIAS k6pio74j.up.railway.app
   vercel dns add mayofy.dev _railway-verify TXT "railway-verify=<value from Railway>"
   ```

3. `www.mayofy.dev` follows the same flow with a regular CNAME:

   | Name | Type | Value |
   | --- | --- | --- |
   | `www` | `CNAME` | `d81hu1iu.up.railway.app` |
   | `_railway-verify.www` | `TXT` | `railway-verify=341a8198…f684` (full value in Railway) |

4. Railway verifies the TXT record and issues the TLS certificate automatically.

## Redirects to the canonical domain

`www.mayofy.dev` and `mayofy.juanikitro.com` answer with a permanent redirect (308) to
`https://mayofy.dev`, preserving path and query string. This is done in `next.config.ts`
(`redirects()` with a `has: [{ type: "host" }]` match), so it ships with the app and needs no
Railway or DNS change. The DNS records stay in place because those hosts must still reach the app
in order to redirect.

Local check after `npm run build`:

```sh
PORT=3123 node .next/standalone/server.js
curl -sI -H "Host: www.mayofy.dev" http://localhost:3123/privacidad   # 308 → https://mayofy.dev/privacidad
curl -sI -H "Host: mayofy.dev" http://localhost:3123/                 # 200
```

## Verification

```sh
railway domain status 2d67c319-0235-4f2e-bef6-c6cc959f7a99   # expect Verified: yes, certificate valid
vercel dns ls mayofy.dev                                   # expect the ALIAS and TXT records above
curl -I https://mayofy.dev                                 # expect a response from the Railway app
```

On 2026-11-14 Railway reported `Verified: yes` with the certificate being issued.

## Notes and limitations

- Canonical URLs, sitemap and robots use `NEXT_PUBLIC_SITE_URL` (`src/lib/site-url.ts`).
  On 2026-11-14 it was changed in Railway from `https://mayofy.juanikitro.com` to `https://mayofy.dev`.
  It is inlined at build time, so any change requires a redeploy.
- The contact email is still `jpkitro@gmail.com`; there is no mailbox on `mayofy.dev` yet.
- Do not deploy to Vercel; deploys happen on push to `master` via Railway.
