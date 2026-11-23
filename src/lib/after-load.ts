type IdleWindow = Window & Partial<Pick<Window, "requestIdleCallback" | "cancelIdleCallback">>;

/**
 * Runs `callback` once the page has loaded and the browser has an idle
 * moment, waiting at most `timeout` ms for that moment. Returns a cancel.
 *
 * Not a bare `requestIdleCallback` without a timeout (next/script's
 * `lazyOnload`): it never fires in a background tab or a headless browser.
 * Safari has no `requestIdleCallback`; it gets a plain timeout instead.
 */
export function afterLoadIdle(callback: () => void, timeout = 3000) {
  const w = window as IdleWindow;
  let idleHandle: number | undefined;
  let timer: number | undefined;

  const schedule = () => {
    if (w.requestIdleCallback) idleHandle = w.requestIdleCallback.call(window, callback, { timeout });
    else timer = window.setTimeout(callback, 1);
  };

  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });

  return () => {
    window.removeEventListener("load", schedule);
    if (idleHandle !== undefined) w.cancelIdleCallback?.call(window, idleHandle);
    if (timer !== undefined) window.clearTimeout(timer);
  };
}
