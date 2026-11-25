"use client";

import { useLayoutEffect, useRef } from "react";

import { INTRO_TIMING, introAllowed, runIntro } from "@/lib/intro";

export function IntroRouteEntry({ source }: { source: string }) {
  const script = useRef<HTMLScriptElement>(null);

  useLayoutEffect(() => {
    // React inserts, but does not execute, a script on a client-side route entry.
    // On document loads the parser already handled this world, including skips.
    const world = script.current?.parentElement;
    if (world && !world.hasAttribute("data-intro")) {
      return runIntro(world, introAllowed, INTRO_TIMING, true);
    }
  }, []);

  return <script ref={script} dangerouslySetInnerHTML={{ __html: source }} />;
}
