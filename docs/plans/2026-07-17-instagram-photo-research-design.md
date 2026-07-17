# Instagram photo research

## Goal

Prefer photographs from a verified Instagram profile when researching a local
business for a demo landing. Google Places remains the fallback source.

## Constraints

- The profile must be matched to the business using public evidence (business
  name plus city, address, phone, or a link from another verified source).
- This is a demo workflow: once the profile match is verified, its selected
  photos are recorded as `allowed` without a separate permission review.
- Keep the post/profile URLs and the capture date as dataset evidence.
- Do not add an automated scraper or depend on an unofficial Instagram API.
  An agent performs the public-profile research and supplies the explicit
  profile/post/media URLs it verified.
- Download selected media during enrichment and store it under the repository,
  so generated sites do not depend on expiring Instagram CDN URLs.

## Flow

1. `search` produces the existing Google Places intake dataset.
2. The research agent finds and verifies Instagram profiles, then writes a
   small manifest with the matched profile, identity evidence, and up to three
   explicit image URLs per business.
3. `research:instagram` validates that manifest, downloads those images into
   the intake assets directory, prepends them to `business.photos`, and adds
   Instagram source records plus `photos` field evidence.
4. `shortlist` and `promote` keep their existing contracts. Because Instagram
   photos are first and are `allowed`, the existing generator selects one of
   them before falling back to Google Places.
5. Missing, ambiguous, or failed Instagram research leaves the candidate
   unchanged; it never blocks a valid Google Places flow.

## Data contract

The manifest is deliberately explicit and auditable: a business slug, profile
URL, match evidence, and each selected post/media URL. Only images from a
verified match are written to the dataset. Local downloaded paths become the
photo `url`; the post or profile remains `source_url`.

## Validation

- Fixture covering verified enrichment; manifest validation rejects unknown or
  duplicate slugs and malformed source URLs before downloads start.
- `npm run typecheck`.
- Existing dataset validation on the fixture and a targeted command dry run.
