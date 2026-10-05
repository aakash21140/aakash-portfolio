"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useFinePointer } from "@/hooks/useFinePointer";

/**
 * A follower ring that trails the native cursor and reacts to interactive
 * elements. The native cursor is never hidden — this only adds feedback.
 * Elements can set `data-cursor="label"` to show a label inside the ring.
 */
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 450, damping: 36, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 450, damping: 36, mass: 0.35 });
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const enabled = useFinePointer();

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const hit = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, [data-cursor]",
      );
      setActive(Boolean(hit));
      setLabel(hit?.dataset.cursor ?? null);
    };
    const onLeave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y, enabled]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[70] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
    >
      <motion.div
        animate={{
          width: label ? 86 : active ? 44 : 26,
          height: label ? 32 : active ? 44 : 26,
          borderRadius: label ? 16 : 999,
          opacity: active || label ? 1 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        className="flex items-center justify-center border border-white/80"
      >
        {label && (
          <span className="font-mono text-[9px] tracking-[0.14em] text-white uppercase">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
