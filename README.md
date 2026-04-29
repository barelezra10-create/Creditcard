# The Credit Card Pick

Editorial credit card hub. Next.js 16 static export, deployed to Cloudflare Pages.

- **Domain:** thecreditcardpick.com
- **Stack:** Next.js 16 + Tailwind v3 + MDX + TypeScript
- **Build:** `npm run build` produces `out/`
- **Test:** `npm run test:run`

## Local development

```bash
npm install
npm run dev
```

## Project structure

```
src/
  app/         Next.js App Router pages
  components/  Shared UI components
  lib/         Card data, tools, utilities
data/
  cards/       JSON card database (one file per card)
content/
  best/        Listicle MDX
  learn/       Pillar guides + articles
  glossary/    Glossary terms
  reviews/     Per-card editorial overlays
scripts/       Build-time scripts (sitemap, redirects, IndexNow)
docs/superpowers/
  specs/       Design spec
  plans/       Implementation plan
```

## Deploy

Push to `main` triggers Cloudflare Pages auto-deploy.

## Affiliate redirects

All "Apply" CTAs route through `/go/<card-slug>`. A build-time script generates the Cloudflare `_redirects` file from card data so links stay swappable as affiliate networks approve.
