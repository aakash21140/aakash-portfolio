import { SAMPLE_CONTENT } from "@/content/site";

/**
 * Placeholder for a real asset. Drop an <Image> in place of this component
 * once real screenshots/photos exist.
 */
export default function Slot({
  label,
  accent = "#38e1cf",
  className = "",
  ratio = "aspect-[16/10]",
}: {
  label: string;
  accent?: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-line bg-panel ${ratio} ${className}`}
      style={{
        backgroundImage: `radial-gradient(120% 90% at 20% 0%, ${accent}1f 0%, transparent 60%)`,
      }}
    >
      <div className="grid-bg absolute inset-0 opacity-60" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 250"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M20 200 C 110 200, 90 120, 180 120 S 280 50, 380 50"
          fill="none"
          stroke={accent}
          strokeOpacity="0.45"
          strokeWidth="1.5"
          className="dash-flow"
        />
        <path
          d="M20 60 C 120 60, 120 170, 220 170 S 320 210, 380 210"
          fill="none"
          stroke={accent}
          strokeOpacity="0.2"
          strokeWidth="1.5"
        />
        <circle cx="180" cy="120" r="4" fill={accent} fillOpacity="0.8" />
        <circle cx="220" cy="170" r="3" fill={accent} fillOpacity="0.5" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
        <span className="eyebrow">{label}</span>
        {SAMPLE_CONTENT && (
          <span className="rounded-full border border-line bg-bg/70 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
            sample · replace asset
          </span>
        )}
      </div>
    </div>
  );
}
