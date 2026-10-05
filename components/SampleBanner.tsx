import { SAMPLE_CONTENT } from "@/content/site";

export default function SampleBanner() {
  if (!SAMPLE_CONTENT) return null;
  return (
    <div className="fixed right-4 bottom-4 z-50">
      <p className="rounded-full border border-warn/30 bg-warn/10 px-4 py-2 text-center font-mono text-[10px] tracking-[0.18em] text-warn uppercase backdrop-blur-md">
        sample content — edit <span className="text-ink">content/site.ts</span>
      </p>
    </div>
  );
}
