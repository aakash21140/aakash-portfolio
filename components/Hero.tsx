"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { assetPath, profile } from "@/content/site";
import Magnetic from "./Magnetic";

const rise = {
  hidden: { opacity: 0, y: 36 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.1 + i * 0.09, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="hero-sky relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
    >
      <div className="hero-portrait absolute inset-y-0 right-0 w-[82%] md:w-[59%]">
        <Image
          src={assetPath("/about/clouds-portrait.webp")}
          alt="Aakash relaxing above the clouds"
          fill
          priority
          sizes="(max-width: 768px) 82vw, 59vw"
          className="object-cover object-[50%_40%]"
        />
        <div className="hero-portrait-fade absolute inset-0" />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 top-[-20%] h-[60vh]"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(255,255,255,0.7) 0%, transparent 70%)",
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto w-full max-w-[1240px] px-5 pt-28 pb-16 md:px-10"
      >
        <div className="max-w-[640px] md:w-[58%]">
          <motion.p custom={0} variants={rise} initial="hidden" animate="show" className="eyebrow">
            ◆ {profile.name} · {profile.role}
          </motion.p>

          <h1 className="display mt-6 text-[clamp(2.6rem,7vw,6.4rem)]">
            {profile.headline.map((line, i) => (
              <motion.span
                key={line}
                custom={i + 1}
                variants={rise}
                initial="hidden"
                animate="show"
                className="block"
              >
                {line.split(/\{([^}]*)\}/).map((part, part_i) =>
                  part_i % 2 === 1 ? (
                    <span key={part} className="text-accent italic">
                      {part}
                    </span>
                  ) : (
                    part
                  ),
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            custom={3}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg"
          >
            {profile.subhead}
          </motion.p>

          <motion.div
            custom={4}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Link
                href="/#work"
                data-cursor="view"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
              >
                See the work
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/#contact"
                data-cursor="open"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-muted transition-colors hover:border-accent/50 hover:text-ink"
              >
                Get in touch <span className="text-xs">↗</span>
              </Link>
            </Magnetic>
          </motion.div>

          <motion.div
            custom={5}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.18em] text-muted uppercase"
          >
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {profile.available}
            </span>
            <span>{profile.location}</span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
      >
        <span className="eyebrow flex flex-col items-center gap-2">
          scroll
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="block h-6 w-px bg-linear-to-b from-accent to-transparent"
          />
        </span>
      </motion.div>
    </section>
  );
}
