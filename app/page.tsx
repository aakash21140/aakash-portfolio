import Link from "next/link";
import About from "@/components/About";
import CaseStudies from "@/components/CaseStudies";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import PipelinePlayground from "@/components/PipelinePlayground";
import Process from "@/components/Process";
import Section from "@/components/Section";
import Stats from "@/components/Stats";
import Toolbox from "@/components/Toolbox";
import { caseStudies, marqueeTop, marqueeWarn } from "@/content/site";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee text={marqueeTop} tone="accent" duration={46} />
      <Stats />

      <Section
        id="work"
        eyebrow="Selected work"
        title={
          <>
            Selected <span className="text-accent italic">work</span>
          </>
        }
        aside={
          <Link
            href="/work"
            data-cursor="browse"
            className="link-underline font-mono text-[11px] tracking-[0.18em] text-muted uppercase hover:text-ink"
          >
            All work →
          </Link>
        }
      >
        <CaseStudies studies={caseStudies} />
      </Section>

      <Marquee text={marqueeWarn} tone="warn" dir="right" duration={38} />
      <Section
        id="playground"
        eyebrow="Try it yourself"
        title={
          <>
            Push an event through a <span className="text-accent italic">pipeline</span>.
          </>
        }
        aside={
          <p className="max-w-xs text-sm text-muted">
            Flip the guardrails off and watch the same payload break. This is the whole job in one
            widget.
          </p>
        }
      >
        <PipelinePlayground />
      </Section>
      <Process />
      <Toolbox />
      <About />

      <Contact />
    </>
  );
}
