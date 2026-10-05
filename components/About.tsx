import { about, gallery, profile, timeline } from "@/content/site";
import Reveal from "./Reveal";
import Section from "./Section";
import Slot from "./Slot";

export default function About() {
  return (
    <Section id="about" eyebrow="Beyond the integrations" title={about.heading}>
      <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <div className="space-y-5 text-sm leading-relaxed text-muted md:text-base">
            {about.paragraphs.map((p) => (
              <Reveal key={p.slice(0, 24)} as="span" className="block">
                {p}
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 font-mono text-xs text-accent">{about.ps}</Reveal>

          <Reveal className="mt-12">
            <h3 className="eyebrow">Track record</h3>
            <ol className="mt-6 border-l border-line">
              {timeline.map((t) => (
                <li key={t.period} className="relative pb-8 pl-6 last:pb-0">
                  <span className="absolute -left-[3px] top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
                    {t.period}
                  </p>
                  <p className="mt-2 text-base text-ink">
                    {t.role} <span className="text-muted">· {t.org}</span>
                  </p>
                  <p className="mt-1 text-sm text-muted">{t.note}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4 self-start">
          {gallery.map((g, i) => (
            <Reveal key={g.caption} delay={i * 0.07} className={i % 3 === 0 ? "col-span-2" : ""}>
              <Slot
                label={g.label}
                ratio={i % 3 === 0 ? "aspect-[16/9]" : "aspect-square"}
                accent={i % 2 ? "#7b8cff" : "#38e1cf"}
              />
              <p className="mt-2 flex items-baseline justify-between font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                <span className="text-ink">{g.caption}</span>
                <span>{g.sub}</span>
              </p>
            </Reveal>
          ))}
          <Reveal className="col-span-2 rounded-2xl border border-line bg-panel/40 p-5">
            <p className="eyebrow">Based in</p>
            <p className="mt-2 text-lg">{profile.location}</p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
