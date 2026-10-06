import { about, aboutPhotos, education, profile, timeline } from "@/content/site";
import Reveal from "./Reveal";
import Section from "./Section";
import AboutPhotoGallery from "./AboutPhotoGallery";

export default function About() {
  return (
    <Section id="about" eyebrow="About me" title={about.heading}>
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

          <Reveal className="mt-12">
            <h3 className="eyebrow">Education</h3>
            <ol className="mt-6 border-l border-line">
              {education.map((item) => (
                <li key={item.qualification} className="relative pb-7 pl-6 last:pb-0">
                  <span className="absolute -left-[3px] top-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
                    {item.period}
                  </p>
                  <p className="mt-2 text-base text-ink">{item.qualification}</p>
                  <p className="mt-1 text-sm text-muted">
                    {item.institution}
                    {item.detail && <span> · {item.detail}</span>}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <div className="self-start">
          <Reveal>
            <p className="eyebrow">A little beyond the day job</p>
            <h3 className="mt-3 text-xl font-medium tracking-tight md:text-2xl">
              A few frames from my world.
            </h3>
          </Reveal>
          <AboutPhotoGallery photos={aboutPhotos} />
          <Reveal className="mt-5 rounded-2xl border border-line bg-panel/40 p-5">
            <p className="eyebrow">Based in</p>
            <p className="mt-2 text-lg">{profile.location}</p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
