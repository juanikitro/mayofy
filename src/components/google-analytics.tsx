import Script from "next/script";

/*
 * Google Analytics 4 loaded with `lazyOnload`: gtag.js (~180 KB) waits until
 * the page has finished loading and the browser is idle, so it never competes
 * with the hero on a phone. Trade-off accepted by Juani (2026-11-22): visits
 * that leave within the first seconds are not counted. It replaces
 * @next/third-parties' GoogleAnalytics, which only loads after hydration.
 */
export function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <>
      <Script id="ga-init" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
      </Script>
      <Script id="ga-gtag" strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
    </>
  );
}
