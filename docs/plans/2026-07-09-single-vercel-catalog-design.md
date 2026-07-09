# Single Vercel Catalog Design

## Goal

Deploy every generated landing under one Vercel project named `ia-landing-generator` instead of creating one Vercel project per business.

## Architecture

- Regenerate deployable runs in CI from versioned sources: `data/*-businesses.json`, `data/site-specs/*.json`, and `data/frontends/**`.
- Build a static bundle in `dist/vercel-catalog/`.
- Keep `/` as a simple hardcoded catalog login.
- Keep `/catalog/` and `/catalog/<run>/` as internal browsing pages.
- Keep `/<run>/<slug>/` public as the URL sent to each business.

## Generated Output

`generated/` is a reproducible artifact, not source. It stays local or in CI and is ignored by Git.

## Risks

The catalog login is a client-side convenience gate, not real authentication. Direct landing URLs remain public by design. CI now depends on all deployable runs in the selected deploy set still passing generation and QA.
