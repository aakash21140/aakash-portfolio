import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] flex-col items-center justify-center px-5 text-center">
      <p className="eyebrow">404 · no route to host</p>
      <h1 className="display mt-6 text-[clamp(2.4rem,7vw,4.5rem)]">This endpoint doesn&rsquo;t exist.</h1>
      <p className="mt-5 max-w-md text-sm text-muted">
        The page you asked for returned nothing. Retry against a known-good path.
      </p>
      <Link
        href="/"
        className="mt-9 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
      >
        Back home
      </Link>
    </section>
  );
}
