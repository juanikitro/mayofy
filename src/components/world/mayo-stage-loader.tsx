"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { detectMotionTier } from "@/components/world/world-motion";

const MayoStage = dynamic(
  () => import("@/components/world/mayo-stage").then((module) => module.MayoStage),
  { ssr: false },
);

type NavigatorWithHints = Navigator & {
  connection?: { saveData?: boolean; effectiveType?: string };
  deviceMemory?: number;
};

function supportsWebGL() {
  try {
    const probe = document.createElement("canvas");
    return Boolean(probe.getContext("webgl2") ?? probe.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Loads the real-time Mayo only in the full tier, after the page has
 * painted and the browser is idle, so the promise, the CTA and the still
 * image of the hero never wait for three.js or the GLB.
 */
export function MayoStageLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (detectMotionTier(navigator as NavigatorWithHints, reduced) !== "full") return;
    if (!supportsWebGL()) return;

    let cancelled = false;
    const schedule = () => {
      const idle = (window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number })
        .requestIdleCallback;
      if (idle) idle(() => !cancelled && setReady(true), { timeout: 2500 });
      else window.setTimeout(() => !cancelled && setReady(true), 1200);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
    };
  }, []);

  return ready ? <MayoStage /> : null;
}
