import { describe, expect, it } from "vitest";

import { caseStudyProject } from "@/lib/case-study-path";

describe("caseStudyProject", () => {
  it("returns the decoded slug of a case study path", () => {
    expect(caseStudyProject("/proyectos/shineapp")).toBe("shineapp");
    expect(caseStudyProject("/proyectos/caf%C3%A9")).toBe("café");
  });

  it("keeps the raw slug when the escape is malformed instead of throwing", () => {
    expect(() => caseStudyProject("/proyectos/%E0%A4%A")).not.toThrow();
    expect(caseStudyProject("/proyectos/%E0%A4%A")).toBe("%E0%A4%A");
  });

  it("ignores other pages and the bare section path", () => {
    expect(caseStudyProject("/")).toBeUndefined();
    expect(caseStudyProject("/privacidad")).toBeUndefined();
    expect(caseStudyProject("/proyectos/")).toBeUndefined();
  });
});
