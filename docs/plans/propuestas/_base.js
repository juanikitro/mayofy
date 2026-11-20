/*
 * Shared helpers for the proposal mockups.
 * ?opt=a        shows only that option (used by the captures).
 * ?p=0.5        freezes the scroll progress of every [data-track] block.
 * ?reduced      renders the reduced-motion state.
 * [data-track]  gets --p (0..1) from how far its sticky stage has scrolled,
 *               and a "progress" event other scripts listen to.
 */
(() => {
  const query = new URLSearchParams(location.search);
  const only = query.get("opt");
  if (only) {
    document.querySelectorAll(".opt").forEach((section) => {
      if (section.dataset.opt !== only) section.remove();
    });
  }

  const reduced = query.has("reduced") || matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) document.documentElement.classList.add("reduced");
  window.__reduced = reduced;

  const tracks = [...document.querySelectorAll("[data-track]")];
  let forced = query.has("p") ? parseFloat(query.get("p")) : null;

  function update() {
    for (const el of tracks) {
      let p;
      if (forced !== null) p = forced;
      else if (reduced) p = 1;
      else {
        const box = el.getBoundingClientRect();
        const travel = box.height - innerHeight;
        p = Math.min(1, Math.max(0, -box.top / Math.max(1, travel)));
      }
      el.style.setProperty("--p", p.toFixed(4));
      el.dispatchEvent(new CustomEvent("progress", { detail: p }));
    }
  }

  addEventListener("scroll", update, { passive: true });
  addEventListener("resize", update);
  addEventListener("load", update);
  update();

  window.__p = (value) => {
    forced = value;
    update();
  };
})();
