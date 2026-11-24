import { getBlueRate } from "@/lib/peso-prices";

/*
 * GET /api/health: what the uptime monitor polls (docs/plans/2026-11-24-monitoreo.md).
 * A 200 means the Node server answers requests. The peso rate is reported but
 * never fails the check: without it the packs simply show USD only. The route
 * never calls FormSubmit, so polling it sends no email and spends no quota.
 */
export const dynamic = "force-dynamic";

const startedAt = Date.now();

export async function GET() {
  // getBlueRate reuses the three-hour cached quote, so polling every few
  // minutes does not reach the quote APIs more often than the home page does.
  const rate = await getBlueRate();

  return Response.json(
    {
      ok: true,
      pesoRate: rate ? "ok" : "unavailable",
      uptimeSeconds: Math.round((Date.now() - startedAt) / 1000),
      // Railway sets this on every deploy; it tells which commit is live.
      commit: process.env.RAILWAY_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
