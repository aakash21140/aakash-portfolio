"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/content/site";
import SectionLink from "./SectionLink";

const links = [
  { label: "Home", href: "/#top", id: "top" },
  { label: "About me", href: "/#about", id: "about" },
  { label: "My work", href: "/#work", id: "work" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (sections.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.6] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "border-b border-line bg-bg/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4 md:px-10">
        <SectionLink href="/#top" sectionId="top" className="group flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent/70" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-xs tracking-[0.18em] uppercase">
            {profile.name.split(" ")[0]}
            <span className="text-muted">.{profile.name.split(" ")[1]?.toLowerCase()}</span>
          </span>
        </SectionLink>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((l) => (
            <SectionLink
              key={l.href}
              href={l.href}
              sectionId={l.id}
              aria-current={active === l.id ? "true" : undefined}
              data-cursor={l.id === "contact" ? "say hi" : undefined}
              className={
                l.id === "contact"
                  ? "ml-4 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 font-mono text-[11px] tracking-[0.18em] text-accent uppercase transition-colors hover:bg-accent/20"
                  : `relative rounded-full px-3 py-1.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors ${
                      active === l.id ? "text-ink" : "text-muted hover:text-ink"
                    }`
              }
            >
              {l.id !== "contact" && active === l.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full border border-line bg-white/5"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{l.label}</span>
            </SectionLink>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line md:hidden"
        >
          <span className="flex flex-col gap-1">
            <span
              className={`block h-px w-4 bg-ink transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-4 bg-ink transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-4 px-5 py-4">
              {links.map((l) => (
                <SectionLink
                  key={l.href}
                  href={l.href}
                  sectionId={l.id}
                  onClick={() => setOpen(false)}
                  className={`font-mono text-xs tracking-[0.18em] uppercase ${
                    active === l.id ? "text-accent" : "text-muted"
                  }`}
                >
                  {l.label}
                </SectionLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
