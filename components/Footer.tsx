import Link from "next/link";
import { profile } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10 md:px-10">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="hidden md:block">{profile.role}</p>
        <Link href="/#top" className="link-underline transition-colors hover:text-ink">
          Back to top ↑
        </Link>
      </div>
    </footer>
  );
}
