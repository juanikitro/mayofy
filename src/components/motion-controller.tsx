"use client";

import { useEffect } from "react";

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

type PointerOffset = {
  x: number;
  y: number;
};

const pointerDamping = 0.18;
const pointerSettleThreshold = 0.02;

export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const saveData = (navigator as NavigatorWithConnection).connection?.saveData;
    const motionTier = reducedMotion ? "reduced" : saveData ? "lite" : "full";
    const supportsObserver = "IntersectionObserver" in window;
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const bridgeElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-bridge]"),
    );
    const magneticElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-magnetic]"),
    );
    const scene = document.querySelector<HTMLElement>("[data-scene]");
    const heroImage = scene?.querySelector<HTMLElement>(".hero-art__image");
    const heroForeground = scene?.querySelector<SVGSVGElement>(
      ".hero__foreground",
    );
    let sceneFrame = 0;
    let sceneVisible = false;
    const pointerOffset: PointerOffset = { x: 0, y: 0 };
    const pointerTarget: PointerOffset = { x: 0, y: 0 };

    root.dataset.motionReady = "true";
    root.dataset.motionTier = motionTier;

    function showStaticExperience() {
      revealElements.forEach((element) => {
        element.dataset.revealed = "true";
      });
      bridgeElements.forEach((element) => {
        element.dataset.bridgeVisible = "true";
      });
      scene?.classList.add("is-scene-active");
    }

    if (motionTier !== "full" || !supportsObserver) {
      showStaticExperience();
      return () => {
        delete root.dataset.motionReady;
        delete root.dataset.motionTier;
      };
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.revealed = "true";
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    const bridgeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.bridgeVisible = "true";
          bridgeObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "8% 0px 8% 0px", threshold: 0.08 },
    );

    revealElements.forEach((element) => revealObserver.observe(element));
    bridgeElements.forEach((element) => bridgeObserver.observe(element));

    function updateScene() {
      sceneFrame = 0;
      if (!scene || !sceneVisible) return;

      const rect = scene.getBoundingClientRect();
      const heroProgress = Math.min(
        1,
        Math.max(0, -rect.top / Math.max(1, rect.height)),
      );
      const heroShiftY = heroProgress * 16;
      const foregroundShiftY = heroProgress * -6;
      const pointerDeltaX = pointerTarget.x - pointerOffset.x;
      const pointerDeltaY = pointerTarget.y - pointerOffset.y;

      pointerOffset.x += pointerDeltaX * pointerDamping;
      pointerOffset.y += pointerDeltaY * pointerDamping;

      if (Math.abs(pointerDeltaX) < pointerSettleThreshold) {
        pointerOffset.x = pointerTarget.x;
      }
      if (Math.abs(pointerDeltaY) < pointerSettleThreshold) {
        pointerOffset.y = pointerTarget.y;
      }

      if (heroImage) {
        heroImage.style.transform = `translate3d(0, ${heroShiftY.toFixed(2)}px, 0) scale(1.05)`;
      }
      if (heroForeground) {
        heroForeground.style.transform = `translate3d(${pointerOffset.x.toFixed(2)}px, ${(foregroundShiftY + pointerOffset.y).toFixed(2)}px, 0)`;
      }

      if (
        pointerOffset.x !== pointerTarget.x ||
        pointerOffset.y !== pointerTarget.y
      ) {
        scheduleScene();
      }
    }

    function scheduleScene() {
      if (!sceneVisible || sceneFrame) return;
      sceneFrame = window.requestAnimationFrame(updateScene);
    }

    const sceneObserver = scene
      ? new IntersectionObserver(
          ([entry]) => {
            sceneVisible = entry.isIntersecting;
            scene.classList.toggle("is-scene-active", sceneVisible);
            if (sceneVisible) {
              scheduleScene();
            } else {
              pointerOffset.x = 0;
              pointerOffset.y = 0;
              pointerTarget.x = 0;
              pointerTarget.y = 0;
            }
          },
          { threshold: 0.04 },
        )
      : null;

    if (scene && sceneObserver) sceneObserver.observe(scene);

    function handleScenePointer(event: PointerEvent) {
      if (event.pointerType === "touch" || !scene) return;
      const rect = scene.getBoundingClientRect();
      const pointerX = Math.min(
        1,
        Math.max(0, (event.clientX - rect.left) / rect.width),
      );
      const pointerY = Math.min(
        1,
        Math.max(0, (event.clientY - rect.top) / rect.height),
      );
      pointerTarget.x = (pointerX - 0.5) * 6;
      pointerTarget.y = (pointerY - 0.5) * 4;
      scheduleScene();
    }

    function resetScenePointer() {
      pointerTarget.x = 0;
      pointerTarget.y = 0;
      scheduleScene();
    }

    scene?.addEventListener("pointermove", handleScenePointer, { passive: true });
    scene?.addEventListener("pointerleave", resetScenePointer);
    window.addEventListener("scroll", scheduleScene, { passive: true });
    window.addEventListener("resize", scheduleScene, { passive: true });

    const magneticCleanup = magneticElements.map((element) => {
      function move(event: PointerEvent) {
        if (event.pointerType === "touch") return;
        const rect = element.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
        element.style.setProperty("--magnet-x", `${x.toFixed(2)}px`);
        element.style.setProperty("--magnet-y", `${y.toFixed(2)}px`);
      }

      function reset() {
        element.style.setProperty("--magnet-x", "0px");
        element.style.setProperty("--magnet-y", "0px");
      }

      element.addEventListener("pointermove", move, { passive: true });
      element.addEventListener("pointerleave", reset);
      return () => {
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", reset);
      };
    });

    return () => {
      window.cancelAnimationFrame(sceneFrame);
      window.removeEventListener("scroll", scheduleScene);
      window.removeEventListener("resize", scheduleScene);
      scene?.removeEventListener("pointermove", handleScenePointer);
      scene?.removeEventListener("pointerleave", resetScenePointer);
      magneticCleanup.forEach((cleanup) => cleanup());
      revealObserver.disconnect();
      bridgeObserver.disconnect();
      sceneObserver?.disconnect();
      heroImage?.style.removeProperty("transform");
      heroForeground?.style.removeProperty("transform");
      delete root.dataset.motionReady;
      delete root.dataset.motionTier;
    };
  }, []);

  return null;
}
