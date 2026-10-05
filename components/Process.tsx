import { process } from "@/content/site";
import Reveal from "./Reveal";
import Section from "./Section";
import Spotlight from "./Spotlight";

export default function Process() {
  return (
    <Section
      id="process"
      eyebrow="How I work"
      title={
        <>
          My <span className="text-accent italic">process</span> isn&rsquo;t a checklist. It&rsquo;s a
          way of <span className="italic">de-risking</span>.
        </>
      }
    >
      <ol className="mt-14 grid gap-px md:grid-cols-2">
        {process.map((p, i) => (
          <Reveal key={p.title} as="li" delay={i * 0.06}>
            <Spotlight className="h-full rounded-2xl border border-line bg-panel/40 p-7 transition-colors duration-500 hover:border-accent/35 md:p-9">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <h3 className="mt-5 text-lg font-medium tracking-tight md:text-xl">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
            </Spotlight>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
