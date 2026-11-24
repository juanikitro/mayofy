"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { track } from "@/lib/analytics";
import { caseStudyProject } from "@/lib/case-study-path";

/** Page areas a tap is reported from, nearest first. */
const areaIds = ["agenda", "packs-detalle", "inicio", "problema", "packs", "sistemas", "trabajos", "contacto", "preguntas"];
const areaSelector = areaIds.map((id) => `#${id}`).join(", ");

const socialDomains = ["instagram.com", "linkedin.com", "facebook.com", "x.com", "twitter.com", "github.com", "tiktok.com", "youtube.com"];

/** An island counts as reached when it holds the upper half of the screen... */
const reachedMargin = "0px 0px -50% 0px";
/** ...for this long, so islands flown past on a jump to #agenda do not count. */
const reachedDwell = 1000;

/** Short, visible text of a link or its label: static page copy, never visitor input. */
function linkText(element: Element) {
  const text = (element.textContent ?? "").replace(/\s+/g, " ").trim() || element.getAttribute("aria-label") || "";
  return text.slice(0, 60) || undefined;
}

function placementOf(element: Element, pathname: string) {
  if (element.closest(".island-nav")) return "nav";
  if (element.closest(".wa-float")) return "float";
  if (element.closest("footer")) return "footer";
  const area = element.closest(areaSelector);
  if (area) return area.id;
  if (pathname.startsWith("/proyectos/")) return "case_study";
  if (pathname === "/privacidad") return "privacy";
  if (pathname === "/terminos") return "terms";
  return pathname === "/" ? "home" : "other";
}

/** The pack a tap belongs to, from the pack card around it. */
function packOf(element: Element) {
  const card = element.closest('[id^="pack-"]');
  return card ? card.id.slice("pack-".length) : undefined;
}

function domainOf(url: URL) {
  return url.hostname.replace(/^www\./, "");
}

function isWhatsApp(url: URL) {
  return url.protocol === "whatsapp:" || url.hostname === "wa.me" || url.hostname.endsWith("whatsapp.com");
}

/** Reports what a tapped link means for the funnel; ignores everything else. */
function trackLink(link: HTMLAnchorElement, pathname: string) {
  const url = new URL(link.href, window.location.href);
  const placement = placementOf(link, pathname);

  if (isWhatsApp(url)) {
    track("whatsapp_click", { placement, pack: packOf(link), link_text: linkText(link) });
    return;
  }
  if (url.protocol === "mailto:") {
    track("outbound_click", { placement, link_domain: url.pathname.split("@")[1] ?? "", link_type: "email" });
    return;
  }
  if (url.origin !== window.location.origin) {
    const domain = domainOf(url);
    if (domain === "cal.com" || domain.endsWith(".cal.com")) {
      track("booking_link_click", { placement });
      return;
    }
    const social = socialDomains.some((name) => domain === name || domain.endsWith(`.${name}`));
    track("outbound_click", { placement, link_domain: domain, link_type: social ? "social" : "client_site", link_text: linkText(link) });
    return;
  }

  const section = decodeURIComponent(url.hash.slice(1));
  if (!section || url.pathname !== "/") return;

  if (placement === "nav") {
    const item = link.classList.contains("island-nav__brand")
      ? "brand"
      : link.classList.contains("island-nav__cta")
        ? "cta"
        : link.closest(".island-nav__sheet")
          ? "sheet"
          : "link";
    track("nav_click", { section, item });
  }
  if (section === "agenda") track("cta_click", { placement, cta: "agenda", link_text: linkText(link) });
  else if (section === "packs") track("cta_click", { placement, cta: "packs", link_text: linkText(link) });
  else if (section.startsWith("pack-")) track("cta_click", { placement, cta: "pack", pack: section.slice("pack-".length), link_text: linkText(link) });
}

/**
 * The funnel events that need no component of their own: one click listener
 * for every link on the site (WhatsApp, calls to action, outbound links, the
 * navigation) and the pack cards' "see everything" buttons, the islands a reader reaches, and case study visits. It reads
 * the page's own ids and links, so a new button is reported without new code.
 *
 * The listener runs in the capture phase and only reads: it never cancels a
 * click or waits for analytics. Clicks made by code (not the visitor) are
 * ignored; the contact form reports its own.
 */
export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!event.isTrusted) return;
      try {
        const target = event.target as Element | null;
        const link = target?.closest?.("a[href]");
        if (link instanceof HTMLAnchorElement) trackLink(link, pathname);
        const flip = target?.closest?.(".flip__toggle:not(.flip__toggle--back)");
        const pack = flip ? packOf(flip) : undefined;
        if (pack) track("pack_details_open", { pack });
      } catch {
        // Analytics never breaks a click.
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [pathname]);

  useEffect(() => {
    const project = caseStudyProject(pathname);
    if (project) track("case_study_view", { project });
  }, [pathname]);

  // One `section_reached` per island while this page is open.
  useEffect(() => {
    if (pathname !== "/" || !("IntersectionObserver" in window)) return;
    const islands = Array.from(document.querySelectorAll<HTMLElement>("section[data-island][id]"));
    if (islands.length === 0) return;
    const timers = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const island = entry.target as HTMLElement;
          window.clearTimeout(timers.get(island));
          timers.delete(island);
          if (!entry.isIntersecting) continue;
          const timer = window.setTimeout(() => {
            timers.delete(island);
            observer.unobserve(island);
            track("section_reached", { section: island.id, island: Number(island.dataset.island) || 0 });
          }, reachedDwell);
          timers.set(island, timer);
        }
      },
      { rootMargin: reachedMargin },
    );
    islands.forEach((island) => observer.observe(island));
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [pathname]);

  return null;
}
