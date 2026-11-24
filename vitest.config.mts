import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/*
 * Unit tests for the small pure modules in src/lib (peso prices, the
 * analytics queue and consent gate, path parsing). Node environment, no
 * browser: tests that need `window` stub the parts they use.
 * See docs/plans/2026-11-24-calidad.md.
 */
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
