# Aakash Kumar — portfolio

Next.js 16 (App Router, Turbopack) + Tailwind v4 + Framer Motion. Airy, editorial
portfolio with a cloudscape hero, personal photo gallery, and case-study detail routes
for integration/implementation work.

```bash
npm run dev     # http://localhost:3000
npm run build   # static export of / , /work , /work/[slug]
npm run lint
```

## GitHub Pages deployment

The included GitHub Actions workflow builds and deploys this repository to GitHub
Pages. In the repository settings, set **Pages → Build and deployment → Source** to
**GitHub Actions**. The build uses the repository name as the URL base path, disables
the server-only Next.js image optimizer for static hosting, and exports the site to
`out/`.

## Editing content

**All portfolio copy lives in `content/site.ts`.** Profile, work history, education,
skills, and project details are based on Aakash's résumé and linked public GitHub
repositories. The work archive distinguishes professional implementation experience
from personal projects and does not claim client results or metrics that are not documented.

- `profile` — name, headline (wrap a word in `{braces}` to accent it), location, socials,
  and the public résumé download.
- `stats`, `marqueeTop`, `marqueeWarn`, `contact` — homepage summary and CTA copy.
- `caseStudies[]` — each entry generates a card on `/`, a tile on `/work`, and a static
  page at `/work/<slug>` (`generateStaticParams`).
- `process`, `toolbox`, `timeline`, `education`, `about`, and `aboutPhotos` — lower
  sections and About content. `aboutPhotos` points to the local About gallery images in
  `public/about/`.

## Images

Case studies use clearly labelled placeholders in `components/Slot.tsx`. About photos are
stored in `public/about/`; replace or add optimized images there and update `aboutPhotos` in
`content/site.ts`, for example:

```ts
export const aboutPhotos: AboutPhoto[] = [
  {
    src: "/about/my-photo.webp",
    alt: "A descriptive sentence about the photo",
    caption: "Optional short caption",
    ratio: "portrait",
  },
];
```

The image paths in `aboutPhotos` are automatically prefixed for GitHub Pages project
URLs; keep them relative to `public/` as in the example above.

Supported gallery ratios are `portrait`, `landscape`, and `square`. The responsive gallery
uses local images, descriptive alt text, lazy loading, and a keyboard-accessible enlarge
dialog. No upload service or backend is required.

The Contact section links to the email and profiles in `profile`. There is no form because
this project does not have a configured form submission service.

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
