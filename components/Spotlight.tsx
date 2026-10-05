"use client";

import { useRef, type ReactNode } from "react";

/**
 * Tracks the pointer inside the element and exposes it as `--mx` / `--my`
 * so a CSS radial highlight can follow it. One CSS variable write per move,
 * no React re-render.
 */
export default function Spotlight({
  children,
  className = "",
  color = "rgba(56,225,207,0.14)",
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={`spotlight ${className}`}
      style={{ ["--spot-color" as string]: color }}
      onPointerMove={(e) => {
        const node = ref.current;
        if (!node) return;
        const r = node.getBoundingClientRect();
        node.style.setProperty("--mx", `${e.clientX - r.left}px`);
        node.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </div>
  );
}
