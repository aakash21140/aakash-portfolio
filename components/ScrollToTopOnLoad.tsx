"use client";

import { useLayoutEffect } from "react";

export default function ScrollToTopOnLoad() {
  useLayoutEffect(() => {
    const navigationEntry = performance.getEntriesByType("navigation").find(
      (entry): entry is PerformanceNavigationTiming => entry.entryType === "navigation",
    );
    const shouldStartAtTop = !window.location.hash || navigationEntry?.type === "reload";

    if ("scrollRestoration" in history) {
      history.scrollRestoration = shouldStartAtTop ? "manual" : "auto";
    }

    let userInteracted = false;
    const markInteraction = () => {
      userInteracted = true;
    };
    const resetScroll = () => {
      if (shouldStartAtTop) {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };
    const handleScroll = () => {
      if (shouldStartAtTop && !userInteracted && window.scrollY > 0) {
        resetScroll();
      }
    };
    for (const eventName of ["pointerdown", "keydown", "touchstart", "wheel"]) {
      window.addEventListener(eventName, markInteraction, {
        capture: true,
        once: true,
        passive: true,
      });
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    resetScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      for (const eventName of ["pointerdown", "keydown", "touchstart", "wheel"]) {
        window.removeEventListener(eventName, markInteraction, true);
      }
    };
  }, []);

  return null;
}
