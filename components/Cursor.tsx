"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useFinePointer } from "@/hooks/useFinePointer";
import "./styles/Cursor.css";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const enabled = useFinePointer();

  useEffect(() => {
    if (!enabled) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.12, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.12, ease: "power3.out" });
    let activeTarget: HTMLElement | null = null;

    const onPointerMove = (event: PointerEvent) => {
      xTo(event.clientX);
      yTo(event.clientY);

      const target = (event.target as Element | null)?.closest<HTMLElement>(
        "a, button, [data-cursor]",
      ) ?? null;

      if (target === activeTarget) return;

      activeTarget = target;
      setActive(Boolean(target));
      setLabel(target?.dataset.cursor ?? null);
    };

    const onPointerLeave = () => {
      activeTarget = null;
      setActive(false);
      setLabel(null);
      xTo(-100);
      yTo(-100);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      gsap.killTweensOf(cursor);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className={`cursor-main${active ? " is-active" : ""}${label ? " has-label" : ""}`}
      ref={cursorRef}
    >
      {label && <span className="cursor-label">{label}</span>}
    </div>
  );
}
