import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Slot from "@/components/Slot";
import { caseStudies } from "@/content/site";

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return { title: "Not found" };
  return { title: study.title, description: study.summary };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) notFound();

  const position = caseStudies.indexOf(study);
  const next = caseStudies[(position + 1) % caseStudies.length];

  return (
    <article className="px-5 pt-36 pb-24 md:px-10">
      <div className="mx-auto max-w-[900px]">
        <Reveal>
          <Link
            href="/work"
            className="link-underline font-mono text-[11px] tracking-[0.18em] text-muted uppercase hover:text-ink"
          >
            ← All work
          </Link>
          <p className="eyebrow mt-10">
            {study.index} · {study.period}
          </p>
          <h1 className="display mt-5 text-[clamp(2rem,5.5vw,3.8rem)]">{study.title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {study.summary}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10 grid gap-px border-y border-line py-6 sm:grid-cols-3">
          {[
            { k: "Role", v: study.role },
            { k: "Setting", v: study.setting },
            { k: "Focus", v: study.metric },
          ].map((row) => (
            <div key={row.k}>
              <p className="eyebrow">{row.k}</p>
              <p className="mt-2 text-sm text-ink">{row.v}</p>
            </div>
          ))}
        </Reveal>

        {study.repositoryUrl && (
          <Reveal delay={0.1} className="mt-5">
            <a
              href={study.repositoryUrl}
              target="_blank"
              rel="noreferrer"
              className="link-underline font-mono text-[11px] tracking-[0.18em] text-muted uppercase hover:text-ink"
            >
              View source on GitHub ↗
            </a>
          </Reveal>
        )}

        <Reveal delay={0.12} className="mt-12">
          <Slot label={study.imageLabel} accent={study.accent} ratio="aspect-[16/9]" />
        </Reveal>

        <Reveal className="mt-16">
          <h2 className="eyebrow">Context</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{study.context}</p>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="eyebrow">The problem</h2>
          <ul className="mt-5 space-y-3">
            {study.problem.map((p) => (
              <li key={p} className="flex gap-3 text-base leading-relaxed text-muted">
                <span style={{ color: study.accent }}>—</span>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-16">
          <h2 className="eyebrow">The setup</h2>
          <ol className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-3">
            {study.flow.map((step, i) => (
              <li key={step} className="flex items-center gap-3">
                <span className="rounded-lg border border-line bg-panel px-3 py-2 font-mono text-[11px] tracking-[0.12em] text-ink uppercase">
                  {step}
                </span>
                {i < study.flow.length - 1 && (
                  <span style={{ color: study.accent }} aria-hidden>
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-16 space-y-10">
          <h2 className="eyebrow">What I did</h2>
          {study.approach.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.04} className="border-t border-line pt-7">
              <div className="flex gap-5">
                <span className="font-mono text-xs" style={{ color: study.accent }}>
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-medium tracking-tight md:text-xl">{a.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">{a.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 rounded-3xl border border-line bg-panel/50 p-7 md:p-10">
          <h2 className="eyebrow">Areas covered</h2>
          <dl className="mt-7 grid gap-8 sm:grid-cols-3">
            {study.outcome.map((o) => (
              <div key={o.label}>
                <dt className="display text-[clamp(1.6rem,3.4vw,2.4rem)]" style={{ color: study.accent }}>
                  {o.value}
                </dt>
                <dd className="mt-2 text-sm text-muted">{o.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="eyebrow">Stack</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {study.stack.map((t) => (
              <li
                key={t}
                className="rounded-md border border-line px-2.5 py-1 font-mono text-[11px] text-muted"
              >
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-14 border-l-2 pl-6" >
          <h2 className="eyebrow">What it taught me</h2>
          <p className="mt-4 text-base leading-relaxed text-ink italic">{study.learned}</p>
        </Reveal>

        <Reveal className="mt-20 flex items-center justify-between border-t border-line pt-8">
          <span className="eyebrow">Next study</span>
          <Link href={`/work/${next.slug}`} className="group inline-flex items-center gap-3 text-right">
            <span className="link-underline text-base md:text-lg">{next.title}</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
