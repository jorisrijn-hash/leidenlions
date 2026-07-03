# Leiden Lions

Website for ijshockeyclub Leiden Lions. Next.js (App Router) + TypeScript + Tailwind, fully static, Vercel-ready.

## Stack

- Next.js 14 (App Router), React 18, TypeScript
- Tailwind CSS 3
- Self-hosted variable fonts (Archivo + JetBrains Mono) via `next/font/local`, no external font CDN at runtime (GDPR-friendly)
- Motion is CSS + Canvas + IntersectionObserver only. No animation library, no runtime dependency beyond `clsx`
- Every page prerenders to static HTML (SSG)

## Getting started

```bash
npm install
npm run dev
# open http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

Lint / typecheck:

```bash
npm run lint
npx tsc --noEmit
```

## Deploy to Vercel

Push to a Git repo and import it in Vercel, or:

```bash
npm i -g vercel
vercel
```

No environment variables are required. Framework preset: Next.js (auto-detected).

## Project structure

```
app/
  layout.tsx            root layout: fonts, SEO metadata, JSON-LD, header/footer
  page.tsx              home page
  jeugd/page.tsx        jeugd overview
  jeugd/[team]/         jeugd team pages (static, one per team)
  senioren/page.tsx     senioren overview
  senioren/[team]/      senioren team pages (static)
  ijshockeyschool/
  inschrijven/
  fonts/                self-hosted Archivo + JetBrains Mono (woff2)
  globals.css           design tokens, base styles, motion, reduced-motion
components/
  Header.tsx            sticky nav, accessible dropdowns, mobile drawer
  Footer.tsx
  home/Hero.tsx         home hero
  IceRink.tsx           animated ice-rink canvas
  Reveal.tsx            scroll reveal (reduced-motion + no-JS safe)
  Bits.tsx              RinkLine divider, PhotoSlot, faceoff motif
  PageHeader.tsx        interior page header band
  TeamDetail.tsx        shared team page template
lib/
  site.ts               single source of truth: teams, nav, contact
  utils.ts              cn() class helper
public/
  logo.png, icon.png    club crest
  photos/               optimized webp images (see below)
```

## Editing content

All club data lives in `lib/site.ts`:

- `site` - name, rink address, season, email
- `jeugdTeams` / `seniorenTeams` - teams, slugs, levels, age ranges, blurbs
- `nav` - top navigation (derived from the teams)

Add or rename a team there and the nav, overview lists, footer, and team pages update automatically. Team pages are generated from the slugs via `generateStaticParams`.

Placeholder content to verify before launch:
- Team `level` tags and `blurb` text are safe placeholders. Replace with real divisions and descriptions.
- Training times, schedules and team contacts are noted as "coming soon" on team pages. Wire these in when available.

## Photos

Optimized webp images live in `public/photos/`. Current set mixes real club photos and free Pexels stock (Pexels license allows commercial use).

To swap an image, drop a new file in `public/photos/` and update the `src` on the matching `<PhotoSlot />` (in `app/page.tsx` and the section pages). A `PhotoSlot` with no `src` renders a branded placeholder, so the layout never breaks while you gather photography.

To use remote image URLs (a CMS or asset host) instead of local files, add the hostname to `images.remotePatterns` in `next.config.mjs`. `images.unsplash.com` is already allowed.

Keep source files small: the originals were resized to max ~1900px wide and saved as webp (q~82). Do the same for new photos to keep the site fast.

## Adding real React Bits components

Motion here is hand-written (CSS/Canvas) so the build has no unverified dependencies. If you want specific React Bits components, install them with the shadcn registry as documented on reactbits.dev. This project is TypeScript + Tailwind, so use the `-TS-TW` variant:

```bash
npx shadcn@latest add "https://reactbits.dev/r/<ComponentName>-TS-TW"
```

Check reactbits.dev for the exact per-component URL and any peer dependencies (some backgrounds need `three`, `ogl` or `gsap`). Components land in your components folder; import and use them like any local component.

## Design system

- Palette derived from the crest: royal navy, club red, ice white. All text/background pairs verified at WCAG AA. Tokens are CSS variables in `globals.css`, mapped to Tailwind utilities in `tailwind.config.ts`.
- Type: Archivo (display + body), JetBrains Mono (data labels, times, tags).
- Signature: the "rink line" motif (blue lines flanking a red center dot) as a divider, plus the animated ice-rink hero and faceoff-circle geometry in placeholders.
- Motion: custom ease-out curves, UI transitions under ~200ms, prefers-reduced-motion respected everywhere, hover effects gated to fine pointers, canvas pauses on hidden tabs.

## Not in this iteration

- EN / i18n. The header shows an NL/EN indicator; the EN route is not built yet. Add it with next-intl or the App Router [locale] pattern when needed.
- A submit-to-server signup form. inschrijven currently uses a mail-based flow. A hosted form (for example Web3Forms) can replace the mail CTA later.
# leidenlions
