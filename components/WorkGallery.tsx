"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { CaseStudy } from "@/content/site";
import Slot from "./Slot";
import Spotlight from "./Spotlight";

const ALL = "All";

export default function WorkGallery({ studies }: { studies: CaseStudy[] }) {
  const tags = useMemo(
    () => [ALL, ...Array.from(new Set(studies.flatMap((s) => s.tags)))],
    [studies],
  );
  const [tag, setTag] = useState(ALL);
  const shown = tag === ALL ? studies : studies.filter((s) => s.tags.includes(tag));

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2">
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTag(t)}
            aria-pressed={tag === t}
            className={`relative rounded-full border px-3.5 py-1.5 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors ${
              tag === t
                ? "border-accent/60 text-accent"
                : "border-line text-muted hover:border-accent/30 hover:text-ink"
            }`}
          >
            {tag === t && (
              <motion.span
                layoutId="work-filter-pill"
                className="absolute inset-0 rounded-full bg-accent/10"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{t}</span>
          </button>
        ))}
      </div>

      <p className="eyebrow mt-5">
        {shown.length} {shown.length === 1 ? "study" : "studies"}
      </p>

      <motion.ul layout className="mt-8 grid gap-8 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {shown.map((s) => (
            <motion.li
              key={s.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/work/${s.slug}`} data-cursor="open study" className="group block">
                <Spotlight
                  className="rounded-2xl p-2 transition-transform duration-500 group-hover:-translate-y-1"
                  color={`${s.accent}22`}
                >
                  <Slot label={s.imageLabel} accent={s.accent} ratio="aspect-[16/10]" />
                  <div className="mt-5 flex items-baseline gap-3">
                    <span className="font-mono text-xs" style={{ color: s.accent }}>
                      {s.index}
                    </span>
                    <h2 className="text-lg font-medium tracking-tight transition-colors group-hover:text-accent md:text-xl">
                      {s.title}
                    </h2>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{s.summary}</p>
                  <p className="mt-4 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
                    {s.metric} · {s.year}
                  </p>
                </Spotlight>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
