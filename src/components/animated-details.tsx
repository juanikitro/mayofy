"use client";

import {
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type ReactNode,
  type TransitionEvent,
  useEffect,
  useRef,
} from "react";

type AnimatedDetailsProps = Omit<
  ComponentPropsWithoutRef<"details">,
  "children"
> & {
  children: ReactNode;
  summary: ReactNode;
};

const transitionFallbackDuration = 260;

export function AnimatedDetails({
  children,
  summary,
  ...detailsProps
}: AnimatedDetailsProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const targetOpenRef = useRef(false);
  const openFrameRef = useRef(0);
  const closeTimerRef = useRef(0);

  useEffect(() => {
    const details = detailsRef.current;
    targetOpenRef.current = details?.open ?? false;

    return () => {
      window.cancelAnimationFrame(openFrameRef.current);
      window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  function finishClosing(details: HTMLDetailsElement) {
    if (targetOpenRef.current) return;
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = 0;
    details.open = false;
    delete details.dataset.preparingOpen;
    delete details.dataset.collapsing;
  }

  function handleSummaryClick(event: MouseEvent<HTMLElement>) {
    event.preventDefault();

    const details = detailsRef.current;
    const content = contentRef.current;
    if (!details || !content) return;

    const shouldOpen = !targetOpenRef.current;
    targetOpenRef.current = shouldOpen;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      window.cancelAnimationFrame(openFrameRef.current);
      window.clearTimeout(closeTimerRef.current);
      openFrameRef.current = 0;
      closeTimerRef.current = 0;
      details.open = shouldOpen;
      delete details.dataset.preparingOpen;
      delete details.dataset.collapsing;
      return;
    }

    window.cancelAnimationFrame(openFrameRef.current);
    window.clearTimeout(closeTimerRef.current);
    openFrameRef.current = 0;
    closeTimerRef.current = 0;
    delete details.dataset.preparingOpen;

    if (shouldOpen) {
      if (details.open) {
        delete details.dataset.collapsing;
        return;
      }

      details.dataset.collapsing = "true";
      details.dataset.preparingOpen = "true";
      details.open = true;
      content.getBoundingClientRect();
      openFrameRef.current = window.requestAnimationFrame(() => {
        delete details.dataset.preparingOpen;
        content.getBoundingClientRect();
        openFrameRef.current = window.requestAnimationFrame(() => {
          openFrameRef.current = 0;
          if (targetOpenRef.current) delete details.dataset.collapsing;
        });
      });
      return;
    }

    details.dataset.collapsing = "true";
    closeTimerRef.current = window.setTimeout(
      () => finishClosing(details),
      transitionFallbackDuration,
    );
  }

  function handleTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    if (event.propertyName !== "grid-template-rows") return;
    const details = detailsRef.current;
    if (details) finishClosing(details);
  }

  return (
    <details ref={detailsRef} {...detailsProps}>
      <summary onClick={handleSummaryClick}>{summary}</summary>
      <div
        className="animated-details__content"
        onTransitionEnd={handleTransitionEnd}
        ref={contentRef}
      >
        <div className="animated-details__inner">{children}</div>
      </div>
    </details>
  );
}
