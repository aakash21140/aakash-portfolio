import { stats } from "@/content/site";
import Counter from "./Counter";
import Reveal from "./Reveal";

export default function Stats() {
  return (
    <div className="border-y border-line bg-panel/40">
      <dl className="mx-auto grid max-w-[1240px] grid-cols-2 gap-px px-5 md:grid-cols-3 md:px-10">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="py-10 md:py-14">
            <dt className="display text-[clamp(2rem,4.5vw,3.4rem)] text-ink">
              <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
            </dt>
            <dd className="eyebrow mt-3">{s.label}</dd>
          </Reveal>
        ))}
      </dl>
    </div>
  );
}
