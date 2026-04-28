# The Credit Card Pick — Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a deployable Next.js credit card hub at thecreditcardpick.com with full infrastructure (templates, components, data layer, tools, SEO, affiliate redirects) and minimum viable seed content (5 cards, 3 listicles, 5 pillars + 3 articles, 5 tools, glossary stub) — ready for content fill-in.

**Architecture:** Next.js 16 App Router + TypeScript + Tailwind v3 + MDX (next-mdx-remote), static export to Cloudflare Pages. JSON card database loaded at build time. Tool calculators are pure functions tested with Vitest. Affiliate links via internal `/go/[slug]` redirect endpoint. Schema.org markup for E-E-A-T.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind v3, next-mdx-remote, Vitest, Recharts, Lucide icons, Zod (card data validation), Cloudflare Pages.

**Out of scope (follow-on plans):**
- Content fill-in (cards 6-50, listicles 4-15, articles 4-15) — separate plan
- Ahrefs research scripts (5 scripts) — separate plan

---

## Phase 0 — Project scaffold and deploy pipeline

### Task 0.1: Initialize Next.js project

**Files:**
- Create: `~/thecreditcardpick/package.json`, `~/thecreditcardpick/tsconfig.json`, `~/thecreditcardpick/next.config.ts`, `~/thecreditcardpick/.gitignore`

- [ ] **Step 1: Run create-next-app**

```bash
cd ~/thecreditcardpick && npx create-next-app@latest . --typescript --tailwind --app --no-src-dir=false --import-alias "@/*" --no-eslint --use-npm --yes
```

Expected: scaffolded Next.js 16 project with src/ directory, Tailwind, TypeScript, App Router.

- [ ] **Step 2: Configure static export**

Edit `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
```

- [ ] **Step 3: Verify build works**

Run: `npm run build`
Expected: build succeeds, `out/` directory created with static HTML.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "chore: scaffold Next.js with static export"
```

### Task 0.2: Install foundation dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install runtime deps**

```bash
npm install next-mdx-remote zod recharts lucide-react clsx tailwind-merge
```

- [ ] **Step 2: Install dev deps**

```bash
npm install -D vitest @vitest/ui @types/node
```

- [ ] **Step 3: Add test script**

Edit `package.json` scripts block:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "test": "vitest",
  "test:run": "vitest run"
}
```

- [ ] **Step 4: Create vitest.config.ts**

```typescript
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: { environment: "node", globals: true },
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
```

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "chore: install foundation deps + vitest"
```

### Task 0.3: Configure Tailwind theme (design system tokens)

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace tailwind.config.ts**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}", "./content/**/*.{md,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: { 50: "#F1F4FA", 100: "#D5DEEF", 500: "#2A4178", 700: "#162A57", 900: "#0B1B3A" },
        green: { 500: "#00C46A", 600: "#00A85A" },
        amber: { 500: "#F59E0B" },
        slate: { 50: "#F8FAFC", 100: "#F1F5F9", 500: "#64748B", 900: "#0F172A" },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Geist", "Inter", "ui-sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
```

- [ ] **Step 2: Install typography plugin**

```bash
npm install -D @tailwindcss/typography
```

- [ ] **Step 3: Replace globals.css with font imports + base resets**

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Geist:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { font-family: "Inter", ui-sans-serif, system-ui; color: theme("colors.slate.900"); }
  h1, h2, h3, h4 { font-family: "Geist", "Inter", sans-serif; letter-spacing: -0.01em; }
  .font-num { font-family: "JetBrains Mono", ui-monospace, monospace; }
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`. Expected: succeeds.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: design system tokens (colors, fonts)"
```

### Task 0.4: Create cn() utility

**Files:**
- Create: `src/lib/cn.ts`
- Test: `src/lib/cn.test.ts`

- [ ] **Step 1: Write failing test**

```typescript
import { describe, it, expect } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("merges tailwind classes deduping conflicts", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
  it("handles falsy values", () => {
    expect(cn("p-2", false, undefined, "text-red-500")).toBe("p-2 text-red-500");
  });
});
```

- [ ] **Step 2: Run test, verify fail**

Run: `npm run test:run -- cn`. Expected: FAIL ("cn" not defined).

- [ ] **Step 3: Implement cn**

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4: Run test, verify pass**

Run: `npm run test:run -- cn`. Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: cn() class merge utility"
```

### Task 0.5: Site config + metadata helpers

**Files:**
- Create: `src/lib/site.ts`

- [ ] **Step 1: Write site constants**

```typescript
export const SITE = {
  name: "The Credit Card Pick",
  domain: "thecreditcardpick.com",
  url: "https://thecreditcardpick.com",
  tagline: "Find the card you actually need.",
  subhead: "Independent reviews, real math, no upsell games.",
  defaultOg: "/og-default.png",
  twitter: "@thecreditcardpick",
  author: "The Credit Card Pick Editorial",
};
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat: site config constants"
```

### Task 0.6: Root layout with global metadata + analytics placeholder

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/components/seo/Analytics.tsx`

- [ ] **Step 1: Create Analytics component (GA4 placeholder, swap real ID later)**

```tsx
const GA_ID = "G-PLACEHOLDER";
export function Analytics() {
  if (process.env.NODE_ENV !== "production") return null;
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`,
        }}
      />
    </>
  );
}
```

- [ ] **Step 2: Replace src/app/layout.tsx**

```tsx
import type { Metadata } from "next";
import { Analytics } from "@/components/seo/Analytics";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.subhead,
  openGraph: { type: "website", siteName: SITE.name, url: SITE.url, images: [SITE.defaultOg] },
  twitter: { card: "summary_large_image", site: SITE.twitter },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Build, verify no errors**

Run: `npm run build`. Expected: succeeds.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: root layout + analytics scaffold"
```

### Task 0.7: Header + Footer components

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Footer.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create Header**

```tsx
import Link from "next/link";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/best/cashback", label: "Best Cards" },
  { href: "/cards", label: "Reviews" },
  { href: "/tools", label: "Tools" },
  { href: "/learn", label: "Learn" },
  { href: "/compare", label: "Compare" },
];

export function Header() {
  return (
    <header className="border-b border-slate-100 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg font-bold text-navy-900">{SITE.name}</Link>
        <nav className="hidden gap-6 md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm font-medium text-slate-700 hover:text-navy-900">{n.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Create Footer**

```tsx
import Link from "next/link";
import { SITE } from "@/lib/site";

const COLS = [
  { title: "Site", links: [["Glossary", "/glossary"], ["Methodology", "/methodology"], ["How We Make Money", "/how-we-make-money"]] },
  { title: "Company", links: [["About", "/about"], ["Contact", "/contact"], ["Privacy", "/privacy"]] },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-100 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-base font-bold text-navy-900">{SITE.name}</div>
          <p className="mt-2 max-w-sm text-sm text-slate-600">{SITE.subhead}</p>
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <div className="text-sm font-semibold text-slate-900">{c.title}</div>
            <ul className="mt-3 space-y-2">
              {c.links.map(([label, href]) => (
                <li key={href}><Link href={href} className="text-sm text-slate-600 hover:text-navy-900">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200 px-6 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {SITE.name}. Editorial content; not financial advice.
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Wrap children with Header/Footer in layout.tsx**

Replace body block:

```tsx
<body className="bg-white text-slate-900 antialiased">
  <Header />
  <main>{children}</main>
  <Footer />
  <Analytics />
</body>
```

(Add imports for Header/Footer at top.)

- [ ] **Step 4: Build, verify**

Run: `npm run build`. Expected: succeeds.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: header and footer"
```

### Task 0.8: Homepage skeleton

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace homepage with placeholder hero + section grid**

```tsx
import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="py-20 text-center">
        <h1 className="font-display text-4xl font-bold text-navy-900 md:text-6xl">{SITE.tagline}</h1>
        <p className="mt-4 text-lg text-slate-600">{SITE.subhead}</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/tools/which-card" className="rounded-md bg-navy-900 px-5 py-3 text-sm font-semibold text-white">Take the 60-second quiz</Link>
          <Link href="/best/cashback" className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900">Browse top cards</Link>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Run dev server briefly to verify**

Run: `npm run dev` then ctrl-c after confirming it starts. (Visual review optional now; we'll polish later.)

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: homepage hero skeleton"
```

### Task 0.9: GitHub repo + Cloudflare Pages deploy

**Files:**
- Create: `.github/workflows/` (none — Cloudflare auto-detects)
- Create: `README.md`

- [ ] **Step 1: Create README**

```markdown
# The Credit Card Pick

Editorial credit card hub. Next.js static export, deployed to Cloudflare Pages.

- Domain: thecreditcardpick.com
- Stack: Next.js 16 + Tailwind v3 + MDX + TypeScript
- Build: `npm run build` → `out/`
```

- [ ] **Step 2: Create GitHub repo and push**

```bash
cd ~/thecreditcardpick && gh repo create barcoastal/thecreditcardpick --private --source=. --remote=origin --push
```

- [ ] **Step 3: Manually connect Cloudflare Pages (one-time setup, no code)**

Bar action item: in Cloudflare dashboard → Pages → Create → connect to `barcoastal/thecreditcardpick` repo, build command `npm run build`, output `out/`. Set custom domain `thecreditcardpick.com`.

- [ ] **Step 4: Verify auto-deploy after push**

After Bar connects: any future `git push origin main` should trigger build. Visit `thecreditcardpick.com` and confirm hero renders.

- [ ] **Step 5: Commit README**

```bash
git add README.md && git commit -m "docs: README" && git push
```

---

## Phase 1 — Card data layer

### Task 1.1: Card type + Zod schema

**Files:**
- Create: `src/lib/cards/types.ts`
- Test: `src/lib/cards/types.test.ts`

- [ ] **Step 1: Write failing test**

```typescript
import { describe, it, expect } from "vitest";
import { CardSchema } from "./types";

describe("CardSchema", () => {
  it("accepts a complete valid card", () => {
    const card = {
      slug: "chase-sapphire-preferred",
      issuer: "Chase",
      name: "Sapphire Preferred",
      network: "Visa",
      category: ["travel", "rewards"],
      apr_purchase: { min: 21.49, max: 28.49 },
      apr_intro: null,
      apr_intro_months: 0,
      apr_balance_transfer: { min: 21.49, max: 28.49 },
      apr_cash_advance: 29.99,
      annual_fee: 95,
      foreign_tx_fee: 0,
      balance_transfer_fee: 0.05,
      signup_bonus: "60,000 points",
      signup_bonus_spend: 4000,
      signup_bonus_value_usd: 750,
      rewards: { other: 1, dining: 3, travel_chase_portal: 5 },
      rewards_type: "points",
      points_value_cents: 1.25,
      credit_score_required: { min: 690, recommended: 720 },
      perks: ["Trip cancellation"],
      drawbacks: ["$95 annual fee"],
      application_url: "https://www.chase.com/...",
      last_updated: "2026-04-28",
    };
    expect(() => CardSchema.parse(card)).not.toThrow();
  });

  it("rejects card missing required fields", () => {
    expect(() => CardSchema.parse({ slug: "x" })).toThrow();
  });
});
```

- [ ] **Step 2: Run test, expect FAIL**

Run: `npm run test:run -- types`. Expected: FAIL.

- [ ] **Step 3: Implement schema**

```typescript
import { z } from "zod";

export const CARD_CATEGORIES = ["cashback", "travel", "rewards", "secured", "rebuilding", "business", "student", "no-credit", "balance-transfer"] as const;

const AprRange = z.object({ min: z.number(), max: z.number() });

export const CardSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  issuer: z.string(),
  name: z.string(),
  network: z.enum(["Visa", "Mastercard", "Amex", "Discover"]),
  category: z.array(z.enum(CARD_CATEGORIES)).min(1),
  apr_purchase: AprRange,
  apr_intro: z.number().nullable(),
  apr_intro_months: z.number().int().min(0),
  apr_balance_transfer: AprRange,
  apr_cash_advance: z.number(),
  annual_fee: z.number(),
  foreign_tx_fee: z.number().min(0).max(1),
  balance_transfer_fee: z.number().min(0).max(1),
  signup_bonus: z.string().nullable(),
  signup_bonus_spend: z.number().nullable(),
  signup_bonus_value_usd: z.number().nullable(),
  rewards: z.record(z.string(), z.number()),
  rewards_type: z.enum(["cashback", "points", "miles", "none"]),
  points_value_cents: z.number().nullable(),
  credit_score_required: z.object({ min: z.number(), recommended: z.number() }),
  perks: z.array(z.string()),
  drawbacks: z.array(z.string()),
  application_url: z.string().url(),
  last_updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export type Card = z.infer<typeof CardSchema>;
export type CardCategory = (typeof CARD_CATEGORIES)[number];
```

- [ ] **Step 4: Run test, expect PASS**

Run: `npm run test:run -- types`. Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: Card schema + type"
```

### Task 1.2: Card loader (reads JSON files at build time)

**Files:**
- Create: `src/lib/cards/loader.ts`
- Test: `src/lib/cards/loader.test.ts`
- Create: `data/cards/.gitkeep`

- [ ] **Step 1: Create data dir + sample fixture**

```bash
mkdir -p data/cards && cat > data/cards/_test-card.json <<'EOF'
{
  "slug": "_test-card",
  "issuer": "Test",
  "name": "Test Card",
  "network": "Visa",
  "category": ["cashback"],
  "apr_purchase": { "min": 18, "max": 25 },
  "apr_intro": null, "apr_intro_months": 0,
  "apr_balance_transfer": { "min": 18, "max": 25 },
  "apr_cash_advance": 29,
  "annual_fee": 0, "foreign_tx_fee": 0, "balance_transfer_fee": 0.03,
  "signup_bonus": null, "signup_bonus_spend": null, "signup_bonus_value_usd": null,
  "rewards": { "other": 1.5 },
  "rewards_type": "cashback", "points_value_cents": null,
  "credit_score_required": { "min": 670, "recommended": 700 },
  "perks": [], "drawbacks": [],
  "application_url": "https://example.com/apply",
  "last_updated": "2026-04-28"
}
EOF
```

- [ ] **Step 2: Write failing test**

```typescript
import { describe, it, expect } from "vitest";
import { loadAllCards, loadCardBySlug } from "./loader";

describe("loadAllCards", () => {
  it("loads test fixture card", () => {
    const cards = loadAllCards();
    expect(cards.find((c) => c.slug === "_test-card")).toBeDefined();
  });
});

describe("loadCardBySlug", () => {
  it("returns card by slug", () => {
    const c = loadCardBySlug("_test-card");
    expect(c?.name).toBe("Test Card");
  });
  it("returns null for missing slug", () => {
    expect(loadCardBySlug("nope")).toBeNull();
  });
});
```

- [ ] **Step 3: Run test, expect FAIL**

Run: `npm run test:run -- loader`. Expected: FAIL.

- [ ] **Step 4: Implement loader**

```typescript
import fs from "fs";
import path from "path";
import { CardSchema, type Card } from "./types";

const CARDS_DIR = path.join(process.cwd(), "data/cards");

let _cache: Card[] | null = null;

export function loadAllCards(): Card[] {
  if (_cache) return _cache;
  const files = fs.readdirSync(CARDS_DIR).filter((f) => f.endsWith(".json"));
  const cards = files.map((f) => {
    const raw = JSON.parse(fs.readFileSync(path.join(CARDS_DIR, f), "utf8"));
    return CardSchema.parse(raw);
  });
  _cache = cards;
  return cards;
}

export function loadCardBySlug(slug: string): Card | null {
  return loadAllCards().find((c) => c.slug === slug) ?? null;
}

export function loadCardsByCategory(category: string): Card[] {
  return loadAllCards().filter((c) => c.category.includes(category as any));
}
```

- [ ] **Step 5: Run test, expect PASS**

Run: `npm run test:run -- loader`. Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: card loader with build-time JSON ingest"
```

### Task 1.3: Seed 5 real cards (one per category)

**Files:**
- Create: `data/cards/citi-double-cash.json`, `data/cards/chase-sapphire-preferred.json`, `data/cards/discover-it-secured.json`, `data/cards/chase-ink-business-cash.json`, `data/cards/discover-it-student-cash.json`
- Delete: `data/cards/_test-card.json`

- [ ] **Step 1: Write all 5 card JSONs**

For each card, fill out the full schema using publicly documented terms (current as of April 2026). Use `seed-cards-source.md` to track sources. Example for Citi Double Cash:

```json
{
  "slug": "citi-double-cash",
  "issuer": "Citi",
  "name": "Double Cash Card",
  "network": "Mastercard",
  "category": ["cashback"],
  "apr_purchase": { "min": 19.24, "max": 29.24 },
  "apr_intro": 0,
  "apr_intro_months": 18,
  "apr_balance_transfer": { "min": 19.24, "max": 29.24 },
  "apr_cash_advance": 29.99,
  "annual_fee": 0,
  "foreign_tx_fee": 0.03,
  "balance_transfer_fee": 0.05,
  "signup_bonus": "$200 cash back",
  "signup_bonus_spend": 1500,
  "signup_bonus_value_usd": 200,
  "rewards": { "other": 2 },
  "rewards_type": "cashback",
  "points_value_cents": null,
  "credit_score_required": { "min": 670, "recommended": 720 },
  "perks": ["No annual fee", "2% on every purchase (1% buy + 1% pay)", "Citi Entertainment access"],
  "drawbacks": ["3% foreign transaction fee", "5% balance transfer fee"],
  "application_url": "https://www.citi.com/credit-cards/citi-double-cash-credit-card",
  "last_updated": "2026-04-28"
}
```

Repeat the same level of detail for the other 4 cards. Use exact terms from issuer pages.

- [ ] **Step 2: Delete test fixture, update test to use real card**

```bash
rm data/cards/_test-card.json
```

Edit `src/lib/cards/loader.test.ts`: replace `_test-card` references with `citi-double-cash` and `Test Card` with `Double Cash Card`.

- [ ] **Step 3: Run tests**

Run: `npm run test:run`. Expected: all PASS.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "data: seed 5 cards (one per category)"
```

### Task 1.4: CardVisual component (faux-3D card render)

**Files:**
- Create: `src/components/cards/CardVisual.tsx`

- [ ] **Step 1: Create component**

```tsx
import { cn } from "@/lib/cn";
import type { Card } from "@/lib/cards/types";

const ISSUER_GRADIENTS: Record<string, string> = {
  Chase: "from-blue-900 to-blue-700",
  Citi: "from-slate-900 to-slate-700",
  Discover: "from-orange-600 to-orange-400",
  Amex: "from-emerald-700 to-emerald-500",
  "Capital One": "from-rose-800 to-rose-600",
};

export function CardVisual({ card, size = "md" }: { card: Card; size?: "sm" | "md" | "lg" }) {
  const grad = ISSUER_GRADIENTS[card.issuer] ?? "from-slate-800 to-slate-600";
  const dims = { sm: "h-28 w-44", md: "h-44 w-72", lg: "h-56 w-96" }[size];
  return (
    <div className={cn("relative rounded-2xl bg-gradient-to-br p-5 text-white shadow-xl", grad, dims)}>
      <div className="text-xs font-semibold uppercase tracking-wider opacity-80">{card.issuer}</div>
      <div className="mt-2 font-display text-lg font-bold leading-tight">{card.name}</div>
      <div className="absolute bottom-4 left-5 text-xs opacity-70">{card.network}</div>
    </div>
  );
}
```

- [ ] **Step 2: Build to verify**

Run: `npm run build`. Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: CardVisual component"
```

### Task 1.5: DisclosureBox component

**Files:**
- Create: `src/components/seo/DisclosureBox.tsx`

- [ ] **Step 1: Create component**

```tsx
export function DisclosureBox() {
  return (
    <div className="my-6 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-slate-700">
      <strong className="font-semibold">Editorial disclosure:</strong> The Credit Card Pick is reader-supported. We may earn a commission when you apply for a card through links on our site, but our reviews and rankings are independent.{" "}
      <a href="/how-we-make-money" className="underline">How we make money</a>.
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat: DisclosureBox component"
```

### Task 1.6: Card review page template

**Files:**
- Create: `src/app/cards/[slug]/page.tsx`
- Create: `src/components/cards/RewardsTable.tsx`
- Create: `src/components/cards/ProsCons.tsx`
- Create: `src/components/cards/StatGrid.tsx`

- [ ] **Step 1: Create RewardsTable**

```tsx
import type { Card } from "@/lib/cards/types";

export function RewardsTable({ card }: { card: Card }) {
  const rows = Object.entries(card.rewards);
  if (rows.length === 0) return null;
  const unit = card.rewards_type === "cashback" ? "%" : "x";
  return (
    <table className="w-full border-collapse text-sm">
      <thead><tr className="border-b border-slate-200"><th className="py-2 text-left">Category</th><th className="py-2 text-right">Rate</th></tr></thead>
      <tbody>
        {rows.map(([k, v]) => (
          <tr key={k} className="border-b border-slate-100">
            <td className="py-2 capitalize text-slate-700">{k.replaceAll("_", " ")}</td>
            <td className="py-2 text-right font-num font-semibold">{v}{unit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

- [ ] **Step 2: Create ProsCons**

```tsx
export function ProsCons({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div className="my-6 grid gap-6 md:grid-cols-2">
      <div className="rounded-md border border-green-200 bg-green-50 p-5">
        <h3 className="font-display text-sm font-semibold text-green-700">Pros</h3>
        <ul className="mt-3 space-y-1.5 text-sm text-slate-800">
          {pros.map((p) => <li key={p}>+ {p}</li>)}
        </ul>
      </div>
      <div className="rounded-md border border-amber-200 bg-amber-50 p-5">
        <h3 className="font-display text-sm font-semibold text-amber-700">Cons</h3>
        <ul className="mt-3 space-y-1.5 text-sm text-slate-800">
          {cons.map((c) => <li key={c}>− {c}</li>)}
        </ul>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create StatGrid**

```tsx
import type { Card } from "@/lib/cards/types";

export function StatGrid({ card }: { card: Card }) {
  const stats = [
    { label: "Annual Fee", value: card.annual_fee === 0 ? "$0" : `$${card.annual_fee}` },
    { label: "Purchase APR", value: `${card.apr_purchase.min}% – ${card.apr_purchase.max}%` },
    { label: "Intro APR", value: card.apr_intro_months > 0 ? `${card.apr_intro}% for ${card.apr_intro_months} mo` : "None" },
    { label: "Foreign Tx Fee", value: card.foreign_tx_fee === 0 ? "$0" : `${(card.foreign_tx_fee * 100).toFixed(0)}%` },
    { label: "Recommended Score", value: `${card.credit_score_required.recommended}+` },
    { label: "Signup Bonus", value: card.signup_bonus ?? "None" },
  ];
  return (
    <dl className="my-6 grid grid-cols-2 gap-4 md:grid-cols-3">
      {stats.map((s) => (
        <div key={s.label} className="rounded-md border border-slate-200 p-4">
          <dt className="text-xs uppercase tracking-wider text-slate-500">{s.label}</dt>
          <dd className="mt-1 font-num font-semibold text-slate-900">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
```

- [ ] **Step 4: Create card review page**

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { loadAllCards, loadCardBySlug } from "@/lib/cards/loader";
import { CardVisual } from "@/components/cards/CardVisual";
import { StatGrid } from "@/components/cards/StatGrid";
import { ProsCons } from "@/components/cards/ProsCons";
import { RewardsTable } from "@/components/cards/RewardsTable";
import { DisclosureBox } from "@/components/seo/DisclosureBox";

export function generateStaticParams() {
  return loadAllCards().map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const card = loadCardBySlug(params.slug);
  if (!card) return {};
  return {
    title: `${card.issuer} ${card.name} Review`,
    description: `Independent review of the ${card.issuer} ${card.name}: APR, fees, rewards, who it's for, and alternatives.`,
  };
}

export default function CardPage({ params }: { params: { slug: string } }) {
  const card = loadCardBySlug(params.slug);
  if (!card) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <DisclosureBox />
      <header className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <div className="text-sm font-semibold text-slate-500">{card.issuer}</div>
          <h1 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">{card.name}</h1>
          <p className="mt-2 text-sm text-slate-600">Updated {card.last_updated}</p>
        </div>
        <CardVisual card={card} size="md" />
      </header>

      <Link href={`/go/${card.slug}`} className="mt-6 inline-block rounded-md bg-navy-900 px-5 py-3 text-sm font-semibold text-white">Apply on {card.issuer}'s site →</Link>

      <StatGrid card={card} />
      <h2 className="mt-10 font-display text-2xl font-bold text-navy-900">Rewards</h2>
      <RewardsTable card={card} />
      <ProsCons pros={card.perks} cons={card.drawbacks} />
    </article>
  );
}
```

- [ ] **Step 5: Build and visit /cards/citi-double-cash**

Run: `npm run build`. Expected: succeeds, generates 5 card pages in `out/cards/`.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: card review page template + 5 supporting components"
```

### Task 1.7: Affiliate redirect endpoint (Cloudflare _redirects)

**Files:**
- Create: `scripts/build-redirects.ts`
- Modify: `package.json`

Static export means runtime route handlers won't work. Cloudflare Pages `_redirects` file handles 302s at the edge. We generate it at build time from the card data.

- [ ] **Step 1: Install tsx**

```bash
npm install -D tsx
```

- [ ] **Step 2: Create build-redirects.ts**

```typescript
import fs from "fs";
import path from "path";
import { loadAllCards } from "../src/lib/cards/loader";

const lines = loadAllCards().map((c) => `/go/${c.slug} ${c.application_url} 302`);
const outPath = path.join(process.cwd(), "out/_redirects");
const existing = fs.existsSync(outPath) ? fs.readFileSync(outPath, "utf8") : "";
fs.writeFileSync(outPath, existing + (existing && !existing.endsWith("\n") ? "\n" : "") + lines.join("\n") + "\n");
console.log(`Wrote ${lines.length} affiliate redirects to _redirects`);
```

- [ ] **Step 3: Add to build script**

Edit `package.json` scripts block:

```json
"build": "next build && tsx scripts/build-redirects.ts"
```

- [ ] **Step 4: Run build, verify**

Run: `npm run build && cat out/_redirects`. Expected: lists `/go/citi-double-cash https://www.citi.com/... 302` and 4 more lines.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: affiliate /go/[slug] redirects via Cloudflare _redirects"
```

### Task 1.8: Cards index page (`/cards`)

**Files:**
- Create: `src/app/cards/page.tsx`

- [ ] **Step 1: Create index**

```tsx
import Link from "next/link";
import { loadAllCards } from "@/lib/cards/loader";
import { CardVisual } from "@/components/cards/CardVisual";

export const metadata = { title: "All Card Reviews", description: "Browse every credit card we've reviewed." };

export default function CardsIndex() {
  const cards = loadAllCards();
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-display text-3xl font-bold text-navy-900">All Reviews</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.slug} href={`/cards/${c.slug}`} className="block rounded-lg border border-slate-200 p-5 hover:border-navy-500">
            <CardVisual card={c} size="sm" />
            <div className="mt-3 font-display font-semibold text-navy-900">{c.name}</div>
            <div className="text-sm text-slate-600">{c.issuer}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Build, verify**

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: /cards index page"
```

---

## Phase 2 — Tools framework + 5 priority tools

### Task 2.1: ToolFrame layout component

**Files:**
- Create: `src/components/tools/ToolFrame.tsx`

- [ ] **Step 1: Create**

```tsx
export function ToolFrame({ title, intro, inputs, results }: { title: string; intro: string; inputs: React.ReactNode; results: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="font-display text-3xl font-bold text-navy-900">{title}</h1>
      <p className="mt-2 max-w-2xl text-slate-600">{intro}</p>
      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1.2fr]">
        <aside className="space-y-4 md:sticky md:top-6 md:self-start">{inputs}</aside>
        <section>{results}</section>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat: ToolFrame layout"
```

### Task 2.2: Pure calculator functions (TDD)

**Files:**
- Create: `src/lib/tools/balance-transfer.ts` + `.test.ts`
- Create: `src/lib/tools/payoff.ts` + `.test.ts`
- Create: `src/lib/tools/apr.ts` + `.test.ts`
- Create: `src/lib/tools/rewards-optimizer.ts` + `.test.ts`

- [ ] **Step 1: Test for balance-transfer**

```typescript
import { describe, it, expect } from "vitest";
import { balanceTransferSavings } from "./balance-transfer";

describe("balanceTransferSavings", () => {
  it("computes savings vs paying off at high APR", () => {
    const r = balanceTransferSavings({ balance: 5000, currentApr: 0.24, transferApr: 0, transferAprMonths: 18, transferFeePct: 0.03, monthlyPayment: 300 });
    expect(r.transferFee).toBe(150);
    expect(r.payoffMonths).toBeGreaterThan(0);
    expect(r.totalInterestSaved).toBeGreaterThan(500);
  });
});
```

- [ ] **Step 2: Run, expect FAIL**

- [ ] **Step 3: Implement**

```typescript
export function balanceTransferSavings(p: {
  balance: number; currentApr: number; transferApr: number; transferAprMonths: number; transferFeePct: number; monthlyPayment: number;
}) {
  const transferFee = +(p.balance * p.transferFeePct).toFixed(2);

  // Scenario A: stay on current card
  let bal = p.balance, mo = 0, totalInterestA = 0;
  while (bal > 0 && mo < 600) {
    const interest = bal * (p.currentApr / 12);
    totalInterestA += interest;
    bal = Math.max(0, bal + interest - p.monthlyPayment);
    mo++;
  }
  // Scenario B: transfer
  let balB = p.balance + transferFee, moB = 0, totalInterestB = 0;
  while (balB > 0 && moB < 600) {
    const apr = moB < p.transferAprMonths ? p.transferApr : p.currentApr;
    const interest = balB * (apr / 12);
    totalInterestB += interest;
    balB = Math.max(0, balB + interest - p.monthlyPayment);
    moB++;
  }
  return {
    transferFee,
    payoffMonths: moB,
    payoffMonthsCurrent: mo,
    totalInterestSaved: +(totalInterestA - totalInterestB).toFixed(2),
    totalCostCurrent: +(p.balance + totalInterestA).toFixed(2),
    totalCostTransfer: +(p.balance + transferFee + totalInterestB).toFixed(2),
  };
}
```

- [ ] **Step 4: Run, expect PASS**

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: balanceTransferSavings calc"
```

- [ ] **Step 6: Repeat the test → fail → impl → pass cycle for `payoff.ts`**

```typescript
// payoff.test.ts
import { describe, it, expect } from "vitest";
import { payoffTimeline } from "./payoff";

describe("payoffTimeline", () => {
  it("computes payoff months and total interest", () => {
    const r = payoffTimeline({ balance: 3000, apr: 0.22, monthlyPayment: 200 });
    expect(r.months).toBeGreaterThan(15);
    expect(r.months).toBeLessThan(24);
    expect(r.totalInterest).toBeGreaterThan(0);
  });
  it("returns infinite if payment doesn't cover interest", () => {
    const r = payoffTimeline({ balance: 10000, apr: 0.30, monthlyPayment: 50 });
    expect(r.months).toBe(Infinity);
  });
});
```

```typescript
// payoff.ts
export function payoffTimeline(p: { balance: number; apr: number; monthlyPayment: number }) {
  const monthlyRate = p.apr / 12;
  if (p.monthlyPayment <= p.balance * monthlyRate) {
    return { months: Infinity, totalInterest: Infinity, totalPaid: Infinity };
  }
  let bal = p.balance, totalInterest = 0, months = 0;
  while (bal > 0 && months < 600) {
    const interest = bal * monthlyRate;
    totalInterest += interest;
    bal = Math.max(0, bal + interest - p.monthlyPayment);
    months++;
  }
  return { months, totalInterest: +totalInterest.toFixed(2), totalPaid: +(p.balance + totalInterest).toFixed(2) };
}
```

Commit: `git add -A && git commit -m "feat: payoffTimeline calc"`

- [ ] **Step 7: Same cycle for `apr.ts`**

```typescript
// apr.test.ts
import { describe, it, expect } from "vitest";
import { dailyInterestCost, monthlyInterestCost } from "./apr";

describe("APR calcs", () => {
  it("daily cost", () => {
    expect(dailyInterestCost(1000, 0.2433)).toBeCloseTo(0.6666, 3);
  });
  it("monthly cost", () => {
    expect(monthlyInterestCost(1000, 0.24)).toBeCloseTo(20, 1);
  });
});
```

```typescript
// apr.ts
export function dailyInterestCost(balance: number, apr: number): number {
  return +(balance * (apr / 365)).toFixed(4);
}
export function monthlyInterestCost(balance: number, apr: number): number {
  return +(balance * (apr / 12)).toFixed(2);
}
```

Commit: `git add -A && git commit -m "feat: APR cost calcs"`

- [ ] **Step 8: Same cycle for `rewards-optimizer.ts`**

```typescript
// rewards-optimizer.test.ts
import { describe, it, expect } from "vitest";
import { yearlyRewardsValue } from "./rewards-optimizer";
import { loadCardBySlug } from "@/lib/cards/loader";

describe("yearlyRewardsValue", () => {
  it("computes yearly $ value for a cashback card", () => {
    const card = loadCardBySlug("citi-double-cash")!;
    const v = yearlyRewardsValue(card, { other: 2000 });
    // 2% on $2000/mo * 12 = $480
    expect(v).toBeCloseTo(480, 0);
  });
});
```

```typescript
// rewards-optimizer.ts
import type { Card } from "@/lib/cards/types";

export type SpendByCategory = Record<string, number>;

export function yearlyRewardsValue(card: Card, monthlySpend: SpendByCategory): number {
  let yearly = 0;
  for (const [cat, monthly] of Object.entries(monthlySpend)) {
    const rate = card.rewards[cat] ?? card.rewards.other ?? 0;
    const annual = monthly * 12;
    if (card.rewards_type === "cashback") {
      yearly += annual * (rate / 100);
    } else {
      const cents = card.points_value_cents ?? 1;
      yearly += annual * rate * (cents / 100);
    }
  }
  return +yearly.toFixed(2);
}
```

Commit: `git add -A && git commit -m "feat: rewards optimizer calc"`

### Task 2.3: Tool — Balance Transfer Calculator UI

**Files:**
- Create: `src/app/tools/balance-transfer/page.tsx`
- Create: `src/components/tools/NumberInput.tsx`

- [ ] **Step 1: NumberInput**

```tsx
"use client";
export function NumberInput({ label, value, onChange, prefix, suffix, step = 1 }: { label: string; value: number; onChange: (n: number) => void; prefix?: string; suffix?: string; step?: number }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="mt-1 flex items-center rounded-md border border-slate-300 px-3 py-2 focus-within:border-navy-500">
        {prefix && <span className="mr-1 text-sm text-slate-500">{prefix}</span>}
        <input type="number" value={value} step={step} onChange={(e) => onChange(parseFloat(e.target.value || "0"))} className="w-full bg-transparent font-num outline-none" />
        {suffix && <span className="ml-1 text-sm text-slate-500">{suffix}</span>}
      </div>
    </label>
  );
}
```

- [ ] **Step 2: Page**

```tsx
"use client";
import { useState, useMemo } from "react";
import { ToolFrame } from "@/components/tools/ToolFrame";
import { NumberInput } from "@/components/tools/NumberInput";
import { balanceTransferSavings } from "@/lib/tools/balance-transfer";

export default function BalanceTransferTool() {
  const [balance, setBalance] = useState(5000);
  const [currentApr, setCurrentApr] = useState(24);
  const [transferApr, setTransferApr] = useState(0);
  const [transferMonths, setTransferMonths] = useState(18);
  const [feePct, setFeePct] = useState(3);
  const [payment, setPayment] = useState(300);

  const r = useMemo(() => balanceTransferSavings({ balance, currentApr: currentApr / 100, transferApr: transferApr / 100, transferAprMonths: transferMonths, transferFeePct: feePct / 100, monthlyPayment: payment }), [balance, currentApr, transferApr, transferMonths, feePct, payment]);

  return (
    <ToolFrame
      title="Balance Transfer Calculator"
      intro="See how much you'd save (or pay) by moving your balance to a 0% intro APR card."
      inputs={
        <>
          <NumberInput label="Current balance" value={balance} onChange={setBalance} prefix="$" />
          <NumberInput label="Current APR" value={currentApr} onChange={setCurrentApr} suffix="%" step={0.1} />
          <NumberInput label="Transfer APR" value={transferApr} onChange={setTransferApr} suffix="%" step={0.1} />
          <NumberInput label="Intro period" value={transferMonths} onChange={setTransferMonths} suffix="months" />
          <NumberInput label="Transfer fee" value={feePct} onChange={setFeePct} suffix="%" step={0.5} />
          <NumberInput label="Monthly payment" value={payment} onChange={setPayment} prefix="$" />
        </>
      }
      results={
        <div className="space-y-4">
          <Stat label="Transfer fee" value={`$${r.transferFee.toFixed(2)}`} />
          <Stat label="Months to pay off (transfer)" value={`${r.payoffMonths}`} />
          <Stat label="Months to pay off (current)" value={`${r.payoffMonthsCurrent}`} />
          <Stat label="Total interest saved" value={`$${r.totalInterestSaved.toFixed(2)}`} highlight />
        </div>
      }
    />
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-md border p-4 ${highlight ? "border-green-300 bg-green-50" : "border-slate-200"}`}>
      <div className="text-xs uppercase tracking-wider text-slate-500">{label}</div>
      <div className="mt-1 font-num text-2xl font-semibold text-navy-900">{value}</div>
    </div>
  );
}
```

- [ ] **Step 3: Build, verify route exists**

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: balance transfer tool"
```

### Task 2.4: Tool — Payoff Calculator UI

**Files:**
- Create: `src/app/tools/payoff/page.tsx`

- [ ] **Step 1: Build the page following the same pattern as Task 2.3**

```tsx
"use client";
import { useState, useMemo } from "react";
import { ToolFrame } from "@/components/tools/ToolFrame";
import { NumberInput } from "@/components/tools/NumberInput";
import { payoffTimeline } from "@/lib/tools/payoff";

export default function PayoffTool() {
  const [balance, setBalance] = useState(3000);
  const [apr, setApr] = useState(22);
  const [payment, setPayment] = useState(150);
  const r = useMemo(() => payoffTimeline({ balance, apr: apr / 100, monthlyPayment: payment }), [balance, apr, payment]);

  return (
    <ToolFrame
      title="Credit Card Payoff Calculator"
      intro="See how long it'll take to pay off your card and how much interest you'll pay."
      inputs={<>
        <NumberInput label="Balance" value={balance} onChange={setBalance} prefix="$" />
        <NumberInput label="APR" value={apr} onChange={setApr} suffix="%" step={0.1} />
        <NumberInput label="Monthly payment" value={payment} onChange={setPayment} prefix="$" />
      </>}
      results={<div className="space-y-4">
        <div className="rounded-md border border-slate-200 p-4"><div className="text-xs uppercase text-slate-500">Months to payoff</div><div className="font-num text-2xl font-semibold">{r.months === Infinity ? "Never (raise payment)" : r.months}</div></div>
        <div className="rounded-md border border-slate-200 p-4"><div className="text-xs uppercase text-slate-500">Total interest</div><div className="font-num text-2xl font-semibold">{r.totalInterest === Infinity ? "—" : `$${r.totalInterest.toFixed(2)}`}</div></div>
        <div className="rounded-md border border-slate-200 p-4"><div className="text-xs uppercase text-slate-500">Total paid</div><div className="font-num text-2xl font-semibold">{r.totalPaid === Infinity ? "—" : `$${r.totalPaid.toFixed(2)}`}</div></div>
      </div>}
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat: payoff tool"
```

### Task 2.5: Tool — APR Calculator UI

**Files:**
- Create: `src/app/tools/apr/page.tsx`

- [ ] **Step 1: Build (uses dailyInterestCost + monthlyInterestCost)**

```tsx
"use client";
import { useState } from "react";
import { ToolFrame } from "@/components/tools/ToolFrame";
import { NumberInput } from "@/components/tools/NumberInput";
import { dailyInterestCost, monthlyInterestCost } from "@/lib/tools/apr";

export default function AprTool() {
  const [balance, setBalance] = useState(2000);
  const [apr, setApr] = useState(24.99);
  const daily = dailyInterestCost(balance, apr / 100);
  const monthly = monthlyInterestCost(balance, apr / 100);
  return (
    <ToolFrame
      title="APR Cost Calculator"
      intro="See exactly what your APR costs in real dollars per day and per month."
      inputs={<>
        <NumberInput label="Balance carried" value={balance} onChange={setBalance} prefix="$" />
        <NumberInput label="APR" value={apr} onChange={setApr} suffix="%" step={0.01} />
      </>}
      results={<div className="space-y-4">
        <div className="rounded-md border border-slate-200 p-4"><div className="text-xs uppercase text-slate-500">Daily interest</div><div className="font-num text-2xl font-semibold">${daily.toFixed(4)}</div></div>
        <div className="rounded-md border border-slate-200 p-4"><div className="text-xs uppercase text-slate-500">Monthly interest</div><div className="font-num text-2xl font-semibold">${monthly.toFixed(2)}</div></div>
      </div>}
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat: APR tool"
```

### Task 2.6: Tool — Rewards Optimizer UI

**Files:**
- Create: `src/app/tools/rewards-optimizer/page.tsx`

- [ ] **Step 1: Build (lists every card, ranked by yearlyRewardsValue)**

```tsx
"use client";
import { useState, useMemo } from "react";
import { ToolFrame } from "@/components/tools/ToolFrame";
import { NumberInput } from "@/components/tools/NumberInput";
import { yearlyRewardsValue } from "@/lib/tools/rewards-optimizer";
import type { Card } from "@/lib/cards/types";

export default function RewardsTool({ cards }: { cards: Card[] }) {
  const [groceries, setGroceries] = useState(500);
  const [dining, setDining] = useState(200);
  const [travel, setTravel] = useState(150);
  const [other, setOther] = useState(1000);

  const ranked = useMemo(() => {
    const spend = { groceries, dining, travel, other };
    return [...cards]
      .map((c) => ({ card: c, value: yearlyRewardsValue(c, spend) }))
      .sort((a, b) => b.value - a.value);
  }, [cards, groceries, dining, travel, other]);

  return (
    <ToolFrame
      title="Rewards Optimizer"
      intro="Tell us your monthly spend. We'll rank every card by yearly rewards value."
      inputs={<>
        <NumberInput label="Groceries / mo" value={groceries} onChange={setGroceries} prefix="$" />
        <NumberInput label="Dining / mo" value={dining} onChange={setDining} prefix="$" />
        <NumberInput label="Travel / mo" value={travel} onChange={setTravel} prefix="$" />
        <NumberInput label="Other / mo" value={other} onChange={setOther} prefix="$" />
      </>}
      results={<ol className="space-y-2">
        {ranked.map(({ card, value }, i) => (
          <li key={card.slug} className="flex items-center justify-between rounded-md border border-slate-200 p-3">
            <div><span className="font-num text-sm text-slate-500">#{i + 1}</span> <span className="font-semibold">{card.issuer} {card.name}</span></div>
            <div className="font-num font-semibold text-green-600">${value.toFixed(0)}/yr</div>
          </li>
        ))}
      </ol>}
    />
  );
}
```

This needs cards. Since this is "use client", create a server-component wrapper:

Edit `src/app/tools/rewards-optimizer/page.tsx` to be a server component that loads cards and passes to a client subcomponent. Move the above to `RewardsToolClient.tsx`:

```tsx
// page.tsx
import { loadAllCards } from "@/lib/cards/loader";
import RewardsToolClient from "./RewardsToolClient";
export const metadata = { title: "Rewards Optimizer" };
export default function Page() { return <RewardsToolClient cards={loadAllCards()} />; }
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat: rewards optimizer tool"
```

### Task 2.7: Tool — Which Card Should I Get? Quiz

**Files:**
- Create: `src/app/tools/which-card/page.tsx`
- Create: `src/app/tools/which-card/QuizClient.tsx`
- Create: `src/lib/tools/quiz.ts` + `.test.ts`

- [ ] **Step 1: Test quiz scoring logic**

```typescript
import { describe, it, expect } from "vitest";
import { recommendFromAnswers } from "./quiz";
import { loadAllCards } from "@/lib/cards/loader";

describe("recommendFromAnswers", () => {
  it("recommends cashback for low-spend simple-rewards user with good credit", () => {
    const recs = recommendFromAnswers(loadAllCards(), {
      goal: "cashback",
      creditScore: 720,
      annualFeeOk: false,
      monthlySpend: 1500,
      categories: ["other"],
    });
    expect(recs[0].category).toContain("cashback");
  });
});
```

- [ ] **Step 2: Implement scoring**

```typescript
import type { Card } from "@/lib/cards/types";

export type Answers = {
  goal: "cashback" | "travel" | "build" | "balance-transfer" | "business";
  creditScore: number;
  annualFeeOk: boolean;
  monthlySpend: number;
  categories: string[];
};

export function recommendFromAnswers(cards: Card[], a: Answers): Card[] {
  const goalToCategory: Record<Answers["goal"], string[]> = {
    cashback: ["cashback"],
    travel: ["travel", "rewards"],
    build: ["secured", "rebuilding"],
    "balance-transfer": ["balance-transfer", "cashback"],
    business: ["business"],
  };
  const wanted = goalToCategory[a.goal];
  return cards
    .filter((c) => c.category.some((cat) => wanted.includes(cat)))
    .filter((c) => c.credit_score_required.recommended <= a.creditScore + 30)
    .filter((c) => a.annualFeeOk || c.annual_fee === 0)
    .sort((a, b) => (b.signup_bonus_value_usd ?? 0) - (a.signup_bonus_value_usd ?? 0))
    .slice(0, 5);
}
```

- [ ] **Step 3: Run test, expect PASS**

- [ ] **Step 4: Build QuizClient (multi-step form, calls recommendFromAnswers, renders top 5 cards)**

```tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import type { Card } from "@/lib/cards/types";
import { recommendFromAnswers, type Answers } from "@/lib/tools/quiz";
import { CardVisual } from "@/components/cards/CardVisual";

const QUESTIONS = [
  { key: "goal", label: "What's your main goal?", options: [["cashback", "Earn cashback"], ["travel", "Earn travel rewards"], ["build", "Build / rebuild credit"], ["balance-transfer", "Pay down a balance"], ["business", "Get a business card"]] },
  { key: "creditScore", label: "What's your credit score?", options: [[500, "Below 580"], [620, "580–669"], [700, "670–739"], [760, "740–799"], [820, "800+"]] },
  { key: "annualFeeOk", label: "OK paying an annual fee?", options: [[false, "No"], [true, "Yes, if it pays for itself"]] },
] as const;

export default function QuizClient({ cards }: { cards: Card[] }) {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Partial<Answers>>({ monthlySpend: 1500, categories: ["other"] });

  if (step >= QUESTIONS.length) {
    const recs = recommendFromAnswers(cards, a as Answers);
    return (
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="font-display text-3xl font-bold text-navy-900">Your top picks</h1>
        <ol className="mt-8 space-y-4">
          {recs.map((c, i) => (
            <li key={c.slug} className="flex items-center gap-4 rounded-lg border border-slate-200 p-4">
              <CardVisual card={c} size="sm" />
              <div className="flex-1">
                <div className="font-num text-xs text-slate-500">#{i + 1}</div>
                <div className="font-display font-semibold text-navy-900">{c.issuer} {c.name}</div>
                <Link href={`/cards/${c.slug}`} className="text-sm text-navy-700 underline">Read review →</Link>
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  const q = QUESTIONS[step];
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      <div className="text-sm font-semibold text-slate-500">Step {step + 1} of {QUESTIONS.length}</div>
      <h2 className="mt-2 font-display text-2xl font-bold text-navy-900">{q.label}</h2>
      <div className="mt-6 grid gap-3">
        {q.options.map(([val, label]) => (
          <button key={String(val)} onClick={() => { setA({ ...a, [q.key]: val } as any); setStep(step + 1); }} className="rounded-md border border-slate-300 px-4 py-3 text-left hover:border-navy-500">{label}</button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Page wrapper**

```tsx
import { loadAllCards } from "@/lib/cards/loader";
import QuizClient from "./QuizClient";
export const metadata = { title: "Which Card Should I Get?" };
export default function Page() { return <QuizClient cards={loadAllCards()} />; }
```

- [ ] **Step 6: Build, commit**

```bash
git add -A && git commit -m "feat: which-card quiz tool"
```

### Task 2.8: Tools index page

**Files:**
- Create: `src/app/tools/page.tsx`

- [ ] **Step 1: List the 5 tools day-1**

```tsx
import Link from "next/link";

const TOOLS = [
  { href: "/tools/which-card", title: "Which Card Should I Get?", desc: "60-second quiz." },
  { href: "/tools/rewards-optimizer", title: "Rewards Optimizer", desc: "Rank every card by your spend." },
  { href: "/tools/balance-transfer", title: "Balance Transfer Calculator", desc: "See how much you'd save." },
  { href: "/tools/payoff", title: "Payoff Calculator", desc: "How long until you're free." },
  { href: "/tools/apr", title: "APR Cost Calculator", desc: "What APR really costs." },
];

export const metadata = { title: "Credit Card Tools" };

export default function ToolsIndex() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="font-display text-3xl font-bold text-navy-900">Tools</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {TOOLS.map((t) => (
          <Link key={t.href} href={t.href} className="rounded-lg border border-slate-200 p-5 hover:border-navy-500">
            <div className="font-display font-semibold text-navy-900">{t.title}</div>
            <div className="mt-1 text-sm text-slate-600">{t.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat: tools index"
```

---

## Phase 3 — Listicles + Comparison

### Task 3.1: Listicle data + ranking helpers

**Files:**
- Create: `src/lib/listicles/types.ts`
- Create: `src/lib/listicles/loader.ts`
- Create: `content/best/.gitkeep`

- [ ] **Step 1: Listicle frontmatter type**

```typescript
import { z } from "zod";

export const ListicleSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  intro: z.string(),
  picks: z.array(z.object({
    cardSlug: z.string(),
    bestFor: z.string(),
    blurb: z.string().min(50),
  })).min(3),
  methodology: z.string(),
  faqs: z.array(z.object({ q: z.string(), a: z.string() })),
  last_updated: z.string(),
});
export type Listicle = z.infer<typeof ListicleSchema>;
```

- [ ] **Step 2: Loader (parses MDX frontmatter)**

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ListicleSchema, type Listicle } from "./types";

const DIR = path.join(process.cwd(), "content/best");

export function loadAllListicles(): Listicle[] {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx")).map((f) => {
    const raw = fs.readFileSync(path.join(DIR, f), "utf8");
    const { data } = matter(raw);
    return ListicleSchema.parse({ ...data, slug: f.replace(/\.mdx$/, "") });
  });
}

export function loadListicleBySlug(slug: string): Listicle | null {
  return loadAllListicles().find((l) => l.slug === slug) ?? null;
}
```

Install gray-matter: `npm install gray-matter`

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: listicle schema and loader"
```

### Task 3.2: Listicle page template

**Files:**
- Create: `src/app/best/[slug]/page.tsx`
- Create: `src/components/listicles/PickBlock.tsx`
- Create: `src/components/listicles/FAQAccordion.tsx`
- Create: `src/components/listicles/MethodologyBlock.tsx`
- Create: `src/components/seo/StructuredData.tsx`

- [ ] **Step 1: PickBlock**

```tsx
import Link from "next/link";
import { CardVisual } from "@/components/cards/CardVisual";
import type { Card } from "@/lib/cards/types";

export function PickBlock({ rank, bestFor, blurb, card }: { rank: number; bestFor: string; blurb: string; card: Card }) {
  return (
    <article className="my-10 rounded-lg border border-slate-200 p-6">
      <div className="flex items-baseline gap-3">
        <div className="font-num text-sm font-semibold text-slate-500">#{rank}</div>
        <span className="rounded-full bg-navy-50 px-2 py-0.5 text-xs font-semibold text-navy-700">Best for {bestFor}</span>
      </div>
      <div className="mt-3 grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
        <CardVisual card={card} size="sm" />
        <div>
          <Link href={`/cards/${card.slug}`} className="font-display text-xl font-bold text-navy-900 hover:underline">{card.issuer} {card.name}</Link>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{blurb}</p>
          <Link href={`/go/${card.slug}`} className="mt-3 inline-block rounded-md bg-navy-900 px-4 py-2 text-sm font-semibold text-white">Apply on {card.issuer} →</Link>
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: FAQAccordion**

```tsx
"use client";
import { useState } from "react";

export function FAQAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <section className="my-10">
      <h2 className="font-display text-2xl font-bold text-navy-900">FAQ</h2>
      <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
        {faqs.map((f) => <FAQItem key={f.q} {...f} />)}
      </div>
    </section>
  );
}
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-4">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between text-left">
        <span className="font-medium text-slate-900">{q}</span>
        <span className="font-num text-slate-400">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="mt-3 text-sm leading-relaxed text-slate-700">{a}</p>}
    </div>
  );
}
```

- [ ] **Step 3: MethodologyBlock**

```tsx
export function MethodologyBlock({ text }: { text: string }) {
  return (
    <section className="my-10 rounded-md border-l-4 border-navy-500 bg-slate-50 p-5">
      <h3 className="font-display text-base font-semibold text-navy-900">How we ranked these cards</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">{text}</p>
    </section>
  );
}
```

- [ ] **Step 4: StructuredData helper**

```tsx
export function StructuredData({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
```

- [ ] **Step 5: Listicle page**

```tsx
import { notFound } from "next/navigation";
import { loadAllListicles, loadListicleBySlug } from "@/lib/listicles/loader";
import { loadCardBySlug } from "@/lib/cards/loader";
import { PickBlock } from "@/components/listicles/PickBlock";
import { FAQAccordion } from "@/components/listicles/FAQAccordion";
import { MethodologyBlock } from "@/components/listicles/MethodologyBlock";
import { DisclosureBox } from "@/components/seo/DisclosureBox";
import { StructuredData } from "@/components/seo/StructuredData";

export function generateStaticParams() {
  return loadAllListicles().map((l) => ({ slug: l.slug }));
}
export function generateMetadata({ params }: { params: { slug: string } }) {
  const l = loadListicleBySlug(params.slug);
  return l ? { title: l.title, description: l.description } : {};
}

export default function ListiclePage({ params }: { params: { slug: string } }) {
  const l = loadListicleBySlug(params.slug);
  if (!l) notFound();

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: l.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <StructuredData data={faqLd} />
      <DisclosureBox />
      <h1 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">{l.title}</h1>
      <p className="mt-2 text-sm text-slate-600">Updated {l.last_updated}</p>
      <p className="mt-6 text-base leading-relaxed text-slate-700">{l.intro}</p>
      {l.picks.map((p, i) => {
        const card = loadCardBySlug(p.cardSlug);
        if (!card) return null;
        return <PickBlock key={p.cardSlug} rank={i + 1} bestFor={p.bestFor} blurb={p.blurb} card={card} />;
      })}
      <MethodologyBlock text={l.methodology} />
      <FAQAccordion faqs={l.faqs} />
    </article>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: listicle template + supporting components"
```

### Task 3.3: Seed 3 listicles (cashback, travel, secured)

**Files:**
- Create: `content/best/cashback.mdx`, `content/best/travel.mdx`, `content/best/secured.mdx`

- [ ] **Step 1: Write content/best/cashback.mdx**

```mdx
---
title: "Best Cashback Credit Cards in 2026"
description: "Independent picks for the best cashback credit cards based on rewards rate, fees, and how they work for normal spending."
category: cashback
intro: "Cashback is the simplest credit card reward — earn a percentage of every dollar you spend, taken straight off your bill or sent to your bank. Here are our picks for the best cashback cards in 2026, ranked by real value at typical spending levels."
picks:
  - cardSlug: citi-double-cash
    bestFor: flat 2% on everything
    blurb: "The Citi Double Cash earns an unbeatable flat 2% on every purchase (1% when you buy, 1% when you pay it off) with no annual fee and no rotating categories to track. If you want one card that just works, this is it."
methodology: "We ranked cards by yearly rewards value at $2,000/month spending across mixed categories, weighted against annual fee and APR. We discounted cards with rotating categories or activation requirements unless the rewards rate justified the friction."
faqs:
  - q: "Is cashback better than points?"
    a: "For most people, yes. Cashback is worth exactly its face value, while points are only valuable if you redeem them well. Unless you'll spend time optimizing redemptions, cashback wins."
  - q: "Do I have to pay tax on cashback?"
    a: "No. The IRS treats credit card cashback as a rebate on a purchase, not income."
last_updated: 2026-04-28
---
```

(Add 4 more picks per listicle from the seed cards.)

- [ ] **Step 2: Repeat for travel.mdx and secured.mdx using the appropriate cards**

- [ ] **Step 3: Build, verify pages render**

Run: `npm run build`. Expected: 3 listicle pages generated.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "content: 3 seed listicles (cashback, travel, secured)"
```

### Task 3.4: Comparison tool (`/compare`)

**Files:**
- Create: `src/app/compare/page.tsx`
- Create: `src/app/compare/CompareClient.tsx`
- Create: `src/components/cards/CompareTable.tsx`

- [ ] **Step 1: CompareTable**

```tsx
import type { Card } from "@/lib/cards/types";

const ROWS: Array<{ label: string; render: (c: Card) => string }> = [
  { label: "Annual fee", render: (c) => c.annual_fee === 0 ? "$0" : `$${c.annual_fee}` },
  { label: "Purchase APR", render: (c) => `${c.apr_purchase.min}–${c.apr_purchase.max}%` },
  { label: "Intro APR", render: (c) => c.apr_intro_months > 0 ? `${c.apr_intro}% for ${c.apr_intro_months} mo` : "None" },
  { label: "Foreign tx fee", render: (c) => c.foreign_tx_fee === 0 ? "$0" : `${(c.foreign_tx_fee * 100).toFixed(0)}%` },
  { label: "Signup bonus", render: (c) => c.signup_bonus ?? "None" },
  { label: "Rec. credit score", render: (c) => `${c.credit_score_required.recommended}+` },
];

export function CompareTable({ cards }: { cards: Card[] }) {
  return (
    <table className="w-full text-sm">
      <thead><tr><th></th>{cards.map((c) => <th key={c.slug} className="px-4 py-3 text-left font-display">{c.issuer} {c.name}</th>)}</tr></thead>
      <tbody>
        {ROWS.map((r) => (
          <tr key={r.label} className="border-t border-slate-100">
            <td className="py-3 pr-4 font-medium text-slate-600">{r.label}</td>
            {cards.map((c) => <td key={c.slug} className="py-3 pr-4 font-num">{r.render(c)}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

- [ ] **Step 2: CompareClient (reads `?a=&b=&c=` from querystring)**

```tsx
"use client";
import { useSearchParams } from "next/navigation";
import type { Card } from "@/lib/cards/types";
import { CompareTable } from "@/components/cards/CompareTable";

export default function CompareClient({ allCards }: { allCards: Card[] }) {
  const sp = useSearchParams();
  const slugs = sp.getAll("c").length ? sp.getAll("c") : ["a", "b"].map((k) => sp.get(k)).filter(Boolean) as string[];
  const cards = slugs.map((s) => allCards.find((c) => c.slug === s)).filter(Boolean) as Card[];

  if (cards.length < 2) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="font-display text-3xl font-bold text-navy-900">Compare cards</h1>
        <p className="mt-4 text-slate-600">Pick at least two cards from the list below to compare.</p>
        <ul className="mt-6 grid gap-2 md:grid-cols-2">
          {allCards.map((c) => (
            <li key={c.slug}>
              <a href={`/compare?c=${c.slug}&c=${allCards[0].slug === c.slug ? allCards[1].slug : allCards[0].slug}`} className="block rounded-md border border-slate-200 p-3 hover:border-navy-500">{c.issuer} {c.name}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="font-display text-3xl font-bold text-navy-900">{cards.map((c) => c.name).join(" vs ")}</h1>
      <div className="mt-8 overflow-x-auto"><CompareTable cards={cards} /></div>
    </div>
  );
}
```

- [ ] **Step 3: page.tsx wraps it**

```tsx
import { loadAllCards } from "@/lib/cards/loader";
import CompareClient from "./CompareClient";
import { Suspense } from "react";
export const metadata = { title: "Compare Credit Cards" };
export default function Page() { return <Suspense><CompareClient allCards={loadAllCards()} /></Suspense>; }
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: comparison tool"
```

---

## Phase 4 — Pillar guides + articles + glossary

### Task 4.1: MDX content loader (shared for pillars/articles/glossary)

**Files:**
- Create: `src/lib/content/loader.ts`
- Create: `src/lib/content/types.ts`

- [ ] **Step 1: Types**

```typescript
import { z } from "zod";

export const ArticleFrontmatter = z.object({
  title: z.string(),
  description: z.string(),
  pillar: z.string().optional(),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  author: z.string().default("The Credit Card Pick Editorial"),
});
export type ArticleMeta = z.infer<typeof ArticleFrontmatter> & { slug: string; body: string };
```

- [ ] **Step 2: Loader**

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ArticleFrontmatter, type ArticleMeta } from "./types";

const ROOT = path.join(process.cwd(), "content");

export function loadArticles(subdir: string): ArticleMeta[] {
  const dir = path.join(ROOT, subdir);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.endsWith(".mdx"))
    .map((d) => {
      const raw = fs.readFileSync(path.join(dir, d.name), "utf8");
      const { data, content } = matter(raw);
      const fm = ArticleFrontmatter.parse(data);
      return { ...fm, slug: d.name.replace(/\.mdx$/, ""), body: content };
    });
}

export function loadArticle(subdir: string, slug: string): ArticleMeta | null {
  return loadArticles(subdir).find((a) => a.slug === slug) ?? null;
}
```

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: shared MDX content loader"
```

### Task 4.2: Pillar hub template

**Files:**
- Create: `src/app/learn/page.tsx`
- Create: `src/app/learn/[pillar]/page.tsx`
- Create: `src/app/learn/[pillar]/[slug]/page.tsx`
- Create: `src/lib/pillars.ts`

- [ ] **Step 1: Pillar registry**

```typescript
export const PILLARS = [
  { slug: "credit-card-basics", title: "Credit Card Basics", description: "What credit cards are, how interest works, grace periods, statements." },
  { slug: "choosing-a-card", title: "Choosing Your First or Next Card", description: "By goal, by credit score, by lifestyle." },
  { slug: "building-credit", title: "Building & Rebuilding Credit", description: "Secured cards, utilization, recovery after bankruptcy or collections." },
  { slug: "maximizing-rewards", title: "Maximizing Rewards", description: "Cashback math, point valuations, transfer partners, signup bonuses." },
  { slug: "business-credit", title: "Business Credit Cards", description: "LLC vs sole prop, building business credit, cards by industry." },
] as const;
```

- [ ] **Step 2: /learn index**

```tsx
import Link from "next/link";
import { PILLARS } from "@/lib/pillars";
export const metadata = { title: "Learn About Credit Cards" };
export default function LearnIndex() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="font-display text-3xl font-bold text-navy-900">Learn</h1>
      <div className="mt-8 grid gap-4">
        {PILLARS.map((p) => (
          <Link key={p.slug} href={`/learn/${p.slug}`} className="rounded-lg border border-slate-200 p-5 hover:border-navy-500">
            <div className="font-display font-semibold text-navy-900">{p.title}</div>
            <div className="mt-1 text-sm text-slate-600">{p.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: /learn/[pillar]/page.tsx**

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { PILLARS } from "@/lib/pillars";
import { loadArticles } from "@/lib/content/loader";

export function generateStaticParams() { return PILLARS.map((p) => ({ pillar: p.slug })); }
export function generateMetadata({ params }: { params: { pillar: string } }) {
  const p = PILLARS.find((x) => x.slug === params.pillar);
  return p ? { title: p.title, description: p.description } : {};
}
export default function PillarPage({ params }: { params: { pillar: string } }) {
  const p = PILLARS.find((x) => x.slug === params.pillar);
  if (!p) notFound();
  const articles = loadArticles(`learn/${p.slug}`);
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="font-display text-3xl font-bold text-navy-900">{p.title}</h1>
      <p className="mt-3 text-lg text-slate-600">{p.description}</p>
      <ul className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
        {articles.map((a) => (
          <li key={a.slug} className="py-4">
            <Link href={`/learn/${p.slug}/${a.slug}`} className="font-display text-lg font-semibold text-navy-900 hover:underline">{a.title}</Link>
            <p className="mt-1 text-sm text-slate-600">{a.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 4: /learn/[pillar]/[slug]/page.tsx**

```tsx
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PILLARS } from "@/lib/pillars";
import { loadArticles, loadArticle } from "@/lib/content/loader";

export function generateStaticParams() {
  const out: { pillar: string; slug: string }[] = [];
  for (const p of PILLARS) {
    for (const a of loadArticles(`learn/${p.slug}`)) out.push({ pillar: p.slug, slug: a.slug });
  }
  return out;
}
export function generateMetadata({ params }: { params: { pillar: string; slug: string } }) {
  const a = loadArticle(`learn/${params.pillar}`, params.slug);
  return a ? { title: a.title, description: a.description } : {};
}
export default function ArticlePage({ params }: { params: { pillar: string; slug: string } }) {
  const a = loadArticle(`learn/${params.pillar}`, params.slug);
  if (!a) notFound();
  return (
    <article className="prose prose-slate mx-auto max-w-3xl px-6 py-10">
      <h1>{a.title}</h1>
      <p className="text-sm text-slate-500">Updated {a.updatedAt ?? a.publishedAt}</p>
      <MDXRemote source={a.body} />
    </article>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: pillar + article templates"
```

### Task 4.3: Seed 3 cornerstone articles (one per top pillar)

**Files:**
- Create: `content/learn/credit-card-basics/how-credit-card-interest-works.mdx`
- Create: `content/learn/choosing-a-card/how-to-pick-your-first-credit-card.mdx`
- Create: `content/learn/building-credit/secured-vs-unsecured-cards.mdx`

- [ ] **Step 1: Write each ~1500 words**

Each MDX file: full frontmatter (title, description, pillar, publishedAt, updatedAt) + body. Cover the topic substantively, with internal links to relevant cards/tools, and zero em dashes.

- [ ] **Step 2: Build, verify all 3 articles render**

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "content: 3 cornerstone articles seeded"
```

### Task 4.4: Glossary

**Files:**
- Create: `src/app/glossary/page.tsx`
- Create: `src/app/glossary/[slug]/page.tsx`
- Create: `content/glossary/` (10+ entries)

- [ ] **Step 1: Glossary loader uses existing `loadArticles("glossary")`**

- [ ] **Step 2: Glossary index lists all terms alphabetically**

```tsx
import Link from "next/link";
import { loadArticles } from "@/lib/content/loader";
export const metadata = { title: "Credit Card Glossary" };
export default function GlossaryIndex() {
  const terms = loadArticles("glossary").sort((a, b) => a.title.localeCompare(b.title));
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="font-display text-3xl font-bold text-navy-900">Glossary</h1>
      <ul className="mt-8 grid gap-2 md:grid-cols-2">
        {terms.map((t) => <li key={t.slug}><Link href={`/glossary/${t.slug}`} className="text-navy-700 underline">{t.title}</Link></li>)}
      </ul>
    </div>
  );
}
```

- [ ] **Step 3: Per-term page (similar to article page)**

- [ ] **Step 4: Seed 10 glossary entries**

`apr.mdx`, `apy.mdx`, `balance-transfer.mdx`, `cash-advance.mdx`, `credit-utilization.mdx`, `grace-period.mdx`, `minimum-payment.mdx`, `secured-card.mdx`, `signup-bonus.mdx`, `transfer-fee.mdx`. Each ~150-300 words.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: glossary + 10 seed entries"
```

---

## Phase 5 — Transparency pages, sitemap, structured data, deploy polish

### Task 5.1: Static pages — methodology, how we make money, about, privacy, contact

**Files:**
- Create: `src/app/methodology/page.tsx`, `src/app/how-we-make-money/page.tsx`, `src/app/about/page.tsx`, `src/app/privacy/page.tsx`, `src/app/contact/page.tsx`

- [ ] **Step 1: Each page is a single TSX file with prose content (~300-500 words)**

Use the same `<article className="prose prose-slate mx-auto max-w-3xl px-6 py-10">` wrapper. Write substantive content for each; these pages signal trust to Google and users.

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat: methodology, how-we-make-money, about, privacy, contact pages"
```

### Task 5.2: Sitemap generator

**Files:**
- Create: `src/app/sitemap.ts`

- [ ] **Step 1: Implement**

```typescript
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { loadAllCards } from "@/lib/cards/loader";
import { loadAllListicles } from "@/lib/listicles/loader";
import { loadArticles } from "@/lib/content/loader";
import { PILLARS } from "@/lib/pillars";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date().toISOString();

  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, priority: 1 },
    { url: `${base}/cards/`, lastModified: now },
    { url: `${base}/tools/`, lastModified: now },
    { url: `${base}/learn/`, lastModified: now },
    { url: `${base}/compare/`, lastModified: now },
    { url: `${base}/glossary/`, lastModified: now },
    { url: `${base}/methodology/`, lastModified: now },
    { url: `${base}/how-we-make-money/`, lastModified: now },
    { url: `${base}/about/`, lastModified: now },
    { url: `${base}/privacy/`, lastModified: now },
    { url: `${base}/contact/`, lastModified: now },
  ];
  for (const c of loadAllCards()) entries.push({ url: `${base}/cards/${c.slug}/`, lastModified: c.last_updated });
  for (const l of loadAllListicles()) entries.push({ url: `${base}/best/${l.slug}/`, lastModified: l.last_updated, priority: 0.9 });
  for (const p of PILLARS) {
    entries.push({ url: `${base}/learn/${p.slug}/`, lastModified: now });
    for (const a of loadArticles(`learn/${p.slug}`)) entries.push({ url: `${base}/learn/${p.slug}/${a.slug}/`, lastModified: a.updatedAt ?? a.publishedAt });
  }
  for (const t of loadArticles("glossary")) entries.push({ url: `${base}/glossary/${t.slug}/`, lastModified: now, priority: 0.5 });
  for (const slug of ["which-card", "rewards-optimizer", "balance-transfer", "payoff", "apr"]) entries.push({ url: `${base}/tools/${slug}/`, lastModified: now });
  return entries;
}
```

- [ ] **Step 2: Build, verify out/sitemap.xml exists with all URLs**

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: sitemap generator"
```

### Task 5.3: robots.txt

**Files:**
- Create: `src/app/robots.ts`

- [ ] **Step 1: Allow all (including AI)**

```typescript
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat: robots.txt"
```

### Task 5.4: Structured data on card review and listicle pages

**Files:**
- Modify: `src/app/cards/[slug]/page.tsx`, `src/app/best/[slug]/page.tsx`

- [ ] **Step 1: Add `Product` + `Review` JSON-LD on card review pages**

In CardPage, after `<DisclosureBox />`:

```tsx
<StructuredData data={{
  "@context": "https://schema.org",
  "@type": "Product",
  name: `${card.issuer} ${card.name}`,
  brand: card.issuer,
  category: card.category.join(", "),
  review: {
    "@type": "Review",
    author: { "@type": "Organization", name: SITE.name },
    datePublished: card.last_updated,
  },
}} />
```

- [ ] **Step 2: Add BreadcrumbList on listicle pages**

```tsx
<StructuredData data={{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Best Cards", item: `${SITE.url}/best/` },
    { "@type": "ListItem", position: 3, name: l.title, item: `${SITE.url}/best/${l.slug}/` },
  ],
}} />
```

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: structured data on cards + listicles"
```

### Task 5.5: Email capture form (Klaviyo placeholder)

**Files:**
- Create: `src/components/marketing/EmailCapture.tsx`
- Modify: `src/app/page.tsx` (mount in homepage footer)

Spec calls for email capture as secondary monetization. Build the form now; wire to Klaviyo when API key available.

- [ ] **Step 1: Create EmailCapture component (no real backend yet — submits to /api/subscribe placeholder, captured client-side until Klaviyo wired)**

```tsx
"use client";
import { useState } from "react";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    // TODO: POST to /api/subscribe (Klaviyo) once API key is wired
    if (typeof window !== "undefined" && (window as any).gtag) (window as any).gtag("event", "newsletter_signup", { email });
    setStatus("submitted");
  }

  if (status === "submitted") {
    return <div className="rounded-lg bg-green-50 p-6 text-center text-sm text-green-800">Thanks! We'll let you know when better cards launch in your category.</div>;
  }

  return (
    <form onSubmit={submit} className="rounded-lg border border-slate-200 bg-slate-50 p-6">
      <div className="font-display text-lg font-semibold text-navy-900">Get notified about better cards</div>
      <p className="mt-1 text-sm text-slate-600">When a new card beats one of our top picks, we'll email you. No spam.</p>
      <div className="mt-4 flex gap-2">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm" />
        <button type="submit" className="rounded-md bg-navy-900 px-4 py-2 text-sm font-semibold text-white">Subscribe</button>
      </div>
    </form>
  );
}
```

- [ ] **Step 2: Mount on homepage (in Task 6.1)**

Add `<EmailCapture />` to homepage layout below content sections.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: email capture form (Klaviyo wiring deferred)"
```

### Task 5.6: IndexNow ping on deploy

**Files:**
- Create: `scripts/indexnow-ping.ts`

- [ ] **Step 1: Generate key file + ping script**

```typescript
import fs from "fs";
import path from "path";

const KEY = "thecreditcardpick-2026-04-28-indexnow-key";
const HOST = "thecreditcardpick.com";

fs.writeFileSync(path.join(process.cwd(), "out", `${KEY}.txt`), KEY);

// Read sitemap to get URL list
const sitemap = fs.readFileSync(path.join(process.cwd(), "out/sitemap.xml"), "utf8");
const urls = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]);

const body = { host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls };

fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
}).then((r) => console.log(`IndexNow ping: ${r.status} (${urls.length} urls)`));
```

- [ ] **Step 2: Add to build script (post-build, only on prod)**

Edit `package.json`:

```json
"build": "next build && tsx scripts/build-redirects.ts",
"postdeploy": "tsx scripts/indexnow-ping.ts"
```

(Cloudflare Pages build doesn't run postdeploy. Run it manually post-deploy or via GitHub Action — defer wiring; document in README.)

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: IndexNow ping script"
```

---

## Phase 6 — Final polish, deploy, and verify

### Task 6.1: Homepage upgrade with real content sections

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Build out homepage with: Hero, "Top Picks" grid (3 listicles), "Tools" featured (3 tools), "Learn" featured (3 pillar excerpts), Newsletter CTA placeholder**

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat: homepage with content sections"
```

### Task 6.2: 404 page

**Files:**
- Create: `src/app/not-found.tsx`

- [ ] **Step 1: Branded 404**

```tsx
import Link from "next/link";
export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className="font-display text-5xl font-bold text-navy-900">404</h1>
      <p className="mt-4 text-lg text-slate-600">We couldn't find that page. Try the homepage or our card index.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/" className="rounded-md bg-navy-900 px-4 py-2 text-sm font-semibold text-white">Home</Link>
        <Link href="/cards" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold">All cards</Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat: 404 page"
```

### Task 6.3: Final build + deploy + smoke test

- [ ] **Step 1: Full build**

Run: `npm run build`. Expected: succeeds, `out/` has all routes.

- [ ] **Step 2: Run all tests**

Run: `npm run test:run`. Expected: ALL PASS.

- [ ] **Step 3: Push to main**

```bash
git push origin main
```

Cloudflare Pages auto-deploys.

- [ ] **Step 4: Smoke test live URLs (Bar action)**

Verify in browser:
- `thecreditcardpick.com/` — homepage hero + sections
- `thecreditcardpick.com/cards/citi-double-cash` — card review renders, "Apply" button → `/go/citi-double-cash` → redirects to Citi
- `thecreditcardpick.com/best/cashback` — listicle renders with all picks + FAQ
- `thecreditcardpick.com/tools/which-card` — quiz works end-to-end
- `thecreditcardpick.com/sitemap.xml` — lists all URLs
- `thecreditcardpick.com/robots.txt` — allows all
- View page source: confirm `<script type="application/ld+json">` present on cards + listicles

- [ ] **Step 5: Submit to Google Search Console**

Bar action: verify domain via DNS TXT (Cloudflare DNS), submit `sitemap.xml`.

- [ ] **Step 6: Final commit**

```bash
git commit --allow-empty -m "chore: foundation complete, ready for content fill-in"
```

---

## Follow-on plans (not in this scope)

- **Plan B — Content fill-in:** cards 6-50 (45 more JSON records), card reviews 6-25 (20 MDX overlays), listicles 4-15 (12 more), pillar articles 4-15 (12 more), glossary 11-30 (20 more terms).
- **Plan C — Ahrefs research pipeline:** 5 scripts (opportunity-finder, competitor-gap, backlink-tracker, serp-monitor, content-gap), each with cron schedule and CSV outputs.
- **Plan D — Tools 6-15:** Cash advance, annual fee break-even, foreign tx, utilization, score impact, DTI, card matcher (score), card matcher (spending), cashback vs points, side-by-side variant.

These should each become their own spec → plan → implementation cycle.
