import { profile } from "@/content/site";
import SectionLink from "./SectionLink";

const footerLinks = [
  { label: "Home", href: "/#top", id: "top" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Work", href: "/#work", id: "work" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10 md:px-10">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-7">
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3">
          {footerLinks.map((link) => (
            <SectionLink
              key={link.href}
              href={link.href}
              sectionId={link.id}
              className="link-underline font-mono text-[11px] tracking-[0.16em] text-muted uppercase transition-colors hover:text-ink"
            >
              {link.label}
            </SectionLink>
          ))}
        </nav>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="hidden md:block">{profile.role}</p>
          <SectionLink
            href="/#top"
            sectionId="top"
            className="link-underline transition-colors hover:text-ink"
          >
            Back to top ↑
          </SectionLink>
        </div>
      </div>
    </footer>
  );
}
