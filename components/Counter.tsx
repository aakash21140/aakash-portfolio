"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Counts up to `value` when scrolled into view. The number is written straight
 * to the DOM node rather than through state, so the roll does not re-render the
 * section on every frame. SSR renders the final value, which is also what a
 * no-JS or reduced-motion visitor sees.
 */
export default function Counter({
  value,
  suffix = "",
  decimals = 0,
  duration = 1.6,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;
    if (!inView) {
      node.textContent = `${(0).toFixed(decimals)}${suffix}`;
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = `${v.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduced, value, decimals, suffix, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
