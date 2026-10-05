# Aakash Kumar — portfolio

Next.js 16 (App Router, Turbopack) + Tailwind v4 + Framer Motion. Dark, motion-heavy
single-page portfolio with case-study detail routes, styled after sameerkapil.com but
themed for integration/implementation work.

```bash
npm run dev     # http://localhost:3000
npm run build   # static export of / , /work , /work/[slug]
npm run lint
```

## Editing content

**All copy lives in `content/site.ts`.** Nothing is hardcoded in components except
structural labels. The file currently holds **sample content** — every company name,
metric and link is invented.

- `SAMPLE_CONTENT = true` renders the bottom-right "sample content" badge and the
  "replace asset" labels on image placeholders. Flip it to `false` once real content is in.
- `profile` — name, headline (wrap a word in `{braces}` to accent it), résumé URL, socials.
- `stats`, `marqueeTop`, `marqueeWarn`, `contact` — strips and CTA copy.
- `caseStudies[]` — each entry generates a card on `/`, a tile on `/work`, and a static
  page at `/work/<slug>` (`generateStaticParams`).
- `process`, `toolbox`, `timeline`, `gallery`, `about` — lower sections.

## Images

There are no real assets yet. `components/Slot.tsx` draws a labelled placeholder panel;
replace each `<Slot …/>` with `next/image` once screenshots and photos exist.

## Motion & interaction

- `PipelinePlayground.tsx` — the live demo on `/#playground`: pick a payload (clean,
  duplicate, downstream 500s, missing field), toggle retries/idempotency, and watch the
  stages light up with a streaming console and a verdict. Pure state machine, no network.
- `Cursor.tsx` — ring follower that grows on interactive elements and shows the label from
  `data-cursor="…"`. The native cursor stays visible.
- `Magnetic.tsx` — pointer-attracted CTAs. `Spotlight.tsx` — pointer-following card glow
  (writes `--mx`/`--my`, no re-render). `ScrollProgress.tsx` — top progress bar.
- `Nav.tsx` — IntersectionObserver active-section pill plus an animated mobile sheet.
- `WorkGallery.tsx` — tag filtering on `/work`, shared-layout pill, enter/exit animations.
- `SignalField.tsx` — hero canvas node-graph (pauses off-screen). `Reveal.tsx` — scroll-in
  wrapper. `CaseStudies.tsx` — sticky card stack.
- Pointer flourishes are gated by `hooks/useFinePointer.ts` (`pointer: fine` +
  `prefers-reduced-motion: no-preference`); touch and reduced-motion visitors get the
  static layout.
