"use client";

import { useLayoutEffect } from "react";

export default function ScrollToTopOnLoad() {
  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "auto";
    }

    let userInteracted = false;
    const markInteraction = () => {
      userInteracted = true;
    };
    const resetScroll = () => {
      if (!window.location.hash) {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };
    const handleScroll = () => {
      if (!userInteracted && !window.location.hash && window.scrollY > 0) {
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
