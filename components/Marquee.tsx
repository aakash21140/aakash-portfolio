type Props = {
  text: string;
  duration?: number;
  dir?: "left" | "right";
  className?: string;
  tone?: "default" | "warn" | "accent";
};

const tones = {
  default: "text-muted border-line",
  warn: "text-warn border-warn/25 bg-warn/[0.04]",
  accent: "text-accent border-accent/25 bg-accent/[0.04]",
} as const;

export default function Marquee({
  text,
  duration = 32,
  dir = "left",
  className = "",
  tone = "default",
}: Props) {
  const chunk = text.repeat(4);
  return (
    <div
      className={`relative overflow-hidden border-y py-3 ${tones[tone]} ${className}`}
      aria-hidden
    >
      <div
        className="marquee-track flex w-max whitespace-nowrap font-mono text-[11px] tracking-[0.22em] uppercase"
        data-dir={dir}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <span className="px-2">{chunk}</span>
        <span className="px-2">{chunk}</span>
      </div>
    </div>
  );
}
