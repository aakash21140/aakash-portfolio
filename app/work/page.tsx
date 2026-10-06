import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import WorkGallery from "@/components/WorkGallery";
import { caseStudies } from "@/content/site";

export const metadata: Metadata = {
  title: "Work & projects",
  description: "Software implementation experience and a hands-on network security lab.",
};

export default function WorkIndex() {
  return (
    <Section
      className="pt-36"
      eyebrow="Implementation & projects"
      title="A closer look at the work"
      aside={
        <Link
          href="/"
          data-cursor="home"
          className="link-underline font-mono text-[11px] tracking-[0.18em] text-muted uppercase hover:text-ink"
        >
          ← Home
        </Link>
      }
    >
      <WorkGallery studies={caseStudies} />
    </Section>
  );
}
