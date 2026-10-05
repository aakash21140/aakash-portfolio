import { contact, profile } from "@/content/site";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden px-5 py-28 md:px-10 md:py-40">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(55% 60% at 50% 100%, rgba(56,225,207,0.16) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-[1240px] text-center">
        <Reveal>
          <p className="eyebrow">↳ {contact.eyebrow}</p>
          <h2 className="display mx-auto mt-6 max-w-3xl text-[clamp(2.2rem,6vw,4.6rem)]">
            {contact.heading}
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-sm text-muted md:text-base">{profile.tagline}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Magnetic strength={0.4}>
            <a
              href={`mailto:${profile.email}`}
              data-cursor="email"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
            >
              {profile.email}
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.4}>
            <a
              href={profile.resumeUrl}
              data-cursor="open"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm text-muted transition-colors hover:border-accent/50 hover:text-ink"
            >
              Résumé <span className="text-xs">↗</span>
            </a>
          </Magnetic>
        </Reveal>

        <Reveal
          delay={0.16}
          className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 font-mono text-[11px] tracking-[0.18em] text-muted uppercase"
        >
          {profile.socials.map((s) => (
            <a key={s.label} href={s.href} className="link-underline transition-colors hover:text-ink">
              {s.label} ↗
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
