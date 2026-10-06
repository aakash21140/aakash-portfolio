"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { CaseStudy } from "@/content/site";
import Slot from "./Slot";

function CaseCard({
  study,
  position,
  isLast,
}: {
  study: CaseStudy;
  position: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.2", "end 0.1"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0.35]);

  return (
    <div ref={ref} className={isLast ? "h-auto" : "h-auto lg:h-[104vh]"}>
      <motion.article
        style={{ scale, opacity, top: `calc(10vh + ${position * 14}px)` }}
        onPointerMove={(e) => {
          const node = e.currentTarget;
          const r = node.getBoundingClientRect();
          node.style.setProperty("--mx", `${e.clientX - r.left}px`);
          node.style.setProperty("--my", `${e.clientY - r.top}px`);
        }}
        className="spotlight relative overflow-hidden rounded-3xl border border-line bg-panel/90 backdrop-blur-sm transition-colors duration-500 hover:border-accent/30 lg:sticky"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${study.accent}, transparent)` }}
        />
        <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-12">
          <div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs tracking-[0.2em]" style={{ color: study.accent }}>
                {study.index}
              </span>
              <span className="h-px flex-1 bg-line" />
              <span className="eyebrow">{study.period}</span>
            </div>

            <h3 className="mt-6 text-2xl leading-tight font-medium tracking-tight md:text-3xl">
              {study.title}
            </h3>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted md:text-base">
              {study.summary}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {study.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-muted uppercase"
                >
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <span className="font-mono text-xs" style={{ color: study.accent }}>
                {study.metric}
              </span>
              <div className="flex flex-wrap items-center gap-5">
                {study.repositoryUrl && (
                  <a
                    href={study.repositoryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline text-sm text-muted hover:text-ink"
                  >
                    Source on GitHub ↗
                  </a>
                )}
                <Link
                  href={`/work/${study.slug}`}
                  data-cursor="read"
                  className="group inline-flex items-center gap-2 text-sm text-ink"
                >
                  <span className="link-underline">Read study</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>

          <Link
            href={`/work/${study.slug}`}
            data-cursor="open study"
            className="block transition-transform duration-500 hover:scale-[1.015]"
          >
            <Slot label={study.imageLabel} accent={study.accent} ratio="aspect-[4/3]" />
          </Link>
        </div>
      </motion.article>
    </div>
  );
}

export default function CaseStudies({ studies }: { studies: CaseStudy[] }) {
  return (
    <div className="mt-14 flex flex-col gap-6 lg:mt-20 lg:gap-0">
      {studies.map((s, i) => (
        <CaseCard key={s.slug} study={s} position={i} isLast={i === studies.length - 1} />
      ))}
    </div>
  );
}
