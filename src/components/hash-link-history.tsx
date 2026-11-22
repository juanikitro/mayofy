"use client";

import { useEffect } from "react";

/**
 * Keeps the browser's Back button working after in-page links.
 *
 * A plain `<a href="#packs">` adds a history entry with no state. The App
 * Router ignores a `popstate` without its state, so after following one,
 * opening a case study and pressing Back changed the address to the landing
 * but left the case study on screen (user test, 20 November 2026). This
 * takes over same-page hash links: it scrolls to the target the way the
 * anchor would (smooth, or instant under reduced motion, through the page's
 * own `scroll-behavior`), moves focus there, and pushes the entry with the
 * router's current state, so Back and Forward keep working.
 */
export function HashLinkHistory() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement) || (link.target && link.target !== "_self") || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (!url.hash || url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "auto", block: "start" });
      if (url.hash !== window.location.hash) window.history.pushState(window.history.state, "", url.hash);
      if (!target.matches("a[href], button, input, select, textarea, [tabindex]")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
