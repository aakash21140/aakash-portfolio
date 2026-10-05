import { toolbox } from "@/content/site";
import Reveal from "./Reveal";
import Section from "./Section";
import Spotlight from "./Spotlight";

export default function Toolbox() {
  return (
    <Section
      id="stack"
      eyebrow="What I reach for"
      title="The toolbox"
      aside={
        <p className="max-w-xs text-sm text-muted">
          Tools are interchangeable; the failure modes are not. These are the ones I&rsquo;ve broken
          and fixed in production.
        </p>
      }
    >
      <div className="mt-12 grid gap-px md:grid-cols-2 lg:grid-cols-3">
        {toolbox.map((group, i) => (
          <Reveal key={group.group} delay={i * 0.05}>
            <Spotlight className="h-full rounded-2xl border border-line bg-panel/40 p-6 transition-colors duration-500 hover:border-accent/25 md:p-8">
              <h3 className="eyebrow text-ink">{group.group}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="cursor-default rounded-md border border-line px-2.5 py-1 font-mono text-[11px] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Spotlight>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
