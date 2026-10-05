"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(pointer: fine) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/**
 * True for mouse/trackpad visitors who have not asked for reduced motion.
 * Server and first client render return false, so pointer-only flourishes
 * never appear in the SSR output or for touch users.
 */
export function useFinePointer() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
