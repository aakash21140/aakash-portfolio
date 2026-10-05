"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; r: number; drift: number; phase: number };
type Edge = { a: number; b: number };
type Packet = { edge: number; t: number; speed: number; dir: 1 | -1 };

/**
 * Ambient background: a slowly breathing node graph with packets travelling
 * along the edges. Canvas keeps it to one composited layer.
 */
export default function SignalField({ density = 26 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let packets: Packet[] = [];
    let raf = 0;
    let running = true;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(10, Math.round((density * w) / 1280));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 1 + Math.random() * 1.8,
        drift: 6 + Math.random() * 14,
        phase: Math.random() * Math.PI * 2,
      }));

      edges = [];
      const maxDist = Math.min(w, h) * 0.34;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (Math.hypot(dx, dy) < maxDist) edges.push({ a: i, b: j });
        }
      }
      edges = edges.slice(0, 90);

      packets = edges.length
        ? Array.from({ length: Math.min(14, edges.length) }, () => ({
            edge: Math.floor(Math.random() * edges.length),
            t: Math.random(),
            speed: 0.0012 + Math.random() * 0.0026,
            dir: (Math.random() > 0.5 ? 1 : -1) as 1 | -1,
          }))
        : [];
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);

      const pos = nodes.map((n) => ({
        x: n.x + Math.sin(time / 3400 + n.phase) * n.drift,
        y: n.y + Math.cos(time / 4100 + n.phase) * n.drift * 0.6,
      }));

      ctx.lineWidth = 1;
      for (const e of edges) {
        const a = pos[e.a];
        const b = pos[e.b];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        const alpha = Math.max(0, 0.16 - d / (Math.min(w, h) * 2.6));
        ctx.strokeStyle = `rgba(120, 190, 210, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      for (const n of pos) {
        ctx.fillStyle = "rgba(190, 225, 235, 0.35)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const p of packets) {
        const e = edges[p.edge];
        if (!e) continue;
        const a = pos[e.a];
        const b = pos[e.b];
        const t = p.dir === 1 ? p.t : 1 - p.t;
        const x = a.x + (b.x - a.x) * t;
        const y = a.y + (b.y - a.y) * t;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 9);
        grad.addColorStop(0, "rgba(56, 225, 207, 0.9)");
        grad.addColorStop(1, "rgba(56, 225, 207, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, Math.PI * 2);
        ctx.fill();

        if (!reduced) {
          p.t += p.speed;
          if (p.t > 1) {
            p.t = 0;
            p.edge = Math.floor(Math.random() * edges.length);
            p.dir = (Math.random() > 0.5 ? 1 : -1) as 1 | -1;
          }
        }
      }
    };

    const loop = (time: number) => {
      if (!running) return;
      draw(time);
      raf = requestAnimationFrame(loop);
    };

    build();
    if (reduced) {
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onResize = () => {
      build();
      draw(performance.now());
    };
    window.addEventListener("resize", onResize);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduced) return;
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(loop);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      io.disconnect();
    };
  }, [density]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
