import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function Section({
  id,
  eyebrow,
  title,
  aside,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative scroll-mt-24 px-5 py-24 md:px-10 md:py-32 ${className}`}>
      <div className="mx-auto max-w-[1240px]">
        {(eyebrow || title || aside) && (
          <Reveal className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
            <div>
              {eyebrow && <p className="eyebrow">↳ {eyebrow}</p>}
              {title && (
                <h2 className="display mt-4 max-w-2xl text-[clamp(1.9rem,4.2vw,3.2rem)]">{title}</h2>
              )}
            </div>
            {aside}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
