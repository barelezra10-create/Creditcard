# The Credit Card Pick — Design Spec

**Date:** 2026-04-28
**Domain:** thecreditcardpick.com (registered on GoDaddy 2026-04-28)
**Status:** Approved by Bar

## Mission

Build an editorial credit card hub that competes with creditcards.com, NerdWallet, and Bankrate. Win on tools-first differentiation, niche depth (small business + credit rebuilders + newcomers + rewards/travel), and editorial trust (no upsell games). Affiliate-ready from day-1, monetized as networks approve.

## Positioning

- **Tagline (hero):** "Find the card you actually need."
- **Subhead:** "Independent reviews, real math, no upsell games."
- **Voice:** Authoritative but human. Writes for someone confused who needs help, not someone who already knows the jargon. No em dashes anywhere.
- **Affiliate posture:** Built day-1 (CTA infrastructure, disclosure boxes, ranking methodology). Active links wired as affiliate networks approve. Launch is not blocked on affiliate approval.

## Stack

- Next.js 16 + Tailwind CSS v3 + MDX (next-mdx-remote) + TypeScript
- Static export (`output: 'export'`)
- Cloudflare Pages (auto-deploy from GitHub main)
- Recharts for tool visualizations
- Lucide icons

Same stack as themcaguide.com — lift the article loader, sitemap generator, MDX components, and Ahrefs scripts where reusable.

## Information Architecture

### Top nav (5 items)
1. **Best Cards** — `/best/<use-case>`
2. **Reviews** — `/cards/<issuer-card-slug>`
3. **Tools** — `/tools/<tool-slug>`
4. **Learn** — `/learn/<pillar>` and `/learn/<pillar>/<article-slug>`
5. **Compare** — `/compare?a=<slug>&b=<slug>`

### Footer
Glossary, How We Make Money (transparency), About, Methodology (ranking), Privacy, Contact.

### URL conventions
- `/best/<use-case>` — listicles
- `/cards/<slug>` — individual card reviews
- `/tools/<slug>` — calculators and quizzes
- `/learn/<pillar>` — pillar hub pages
- `/learn/<pillar>/<slug>` — articles nested under pillars (SEO siloing)
- `/glossary/<term-slug>`
- `/compare` — querystring-driven comparison tool
- `/go/<card-slug>` — affiliate redirect endpoint (302 to issuer URL today, swap to affiliate URL when networks approve)

## Phase 1 Scope (~60-70 pages day-1)

### 5 pillar guides (cornerstone hubs)
1. **Credit Card Basics** — what cards are, how interest works, grace periods, statements
2. **Choosing Your First or Next Card** — by goal, by credit score, by lifestyle
3. **Building & Rebuilding Credit** — secured cards, utilization, recovery after bankruptcy/collections (cross-link to Coastal Debt)
4. **Maximizing Rewards** — cashback math, points valuations, transfer partners, signup bonuses
5. **Business Credit Cards** — LLC vs sole prop, building business credit, cards by industry (cross-link to MCA Guide)

### 15 articles (3 per pillar)
Original explainers, ~1500 words each, internal-linked into the pillar hubs.

### 25 card reviews (with MDX editorial overlay)
Distribution: 5 cashback, 5 travel/rewards, 5 secured/rebuilding, 5 business, 5 student/no-credit.

### 15 tools

**Decision tools (3):**
1. "Which Card Should I Get?" quiz (8 questions → recommendation)
2. Card matcher by credit score
3. Card matcher by spending profile

**Money math tools (7):**
4. Rewards optimizer (monthly spend by category → yearly rewards $ for top cards)
5. Balance transfer calculator
6. Credit card payoff calculator
7. APR / interest cost calculator
8. Cash advance true cost calculator
9. Annual fee break-even calculator
10. Foreign transaction fee calculator

**Credit health tools (3):**
11. Credit utilization calculator (multi-card)
12. Credit score impact estimator
13. Debt-to-income calculator

**Comparison tools (2):**
14. Side-by-side card comparison (2-4 cards)
15. Cashback vs points value comparison

All tools render server-side with client JS for inputs. Schema.org `WebApplication` markup. Sticky table-of-contents. Share button serializes state to URL querystring (backlink magnet).

### 15 listicles ("Best X Cards")
`/best/cashback`, `/best/travel`, `/best/business`, `/best/secured`, `/best/no-credit`, `/best/students`, `/best/balance-transfer`, `/best/0-apr`, `/best/no-annual-fee`, `/best/dining`, `/best/groceries`, `/best/gas`, `/best/bad-credit`, `/best/fair-credit`, `/best/first-time`.

Each ~2,000 words, ranks 8-12 cards from the database with editorial commentary.

### Card database (50 records day-1, 25 with MDX reviews)
Distribution: 10 cashback, 10 travel/rewards, 10 secured/rebuilding, 10 business, 10 student/no-credit.

### Glossary
~30 terms day-1 (APR, grace period, balance transfer, secured card, charge card, signup bonus, etc.).

## Card Data Model

One JSON record per card at `data/cards/<slug>.json`:

```json
{
  "slug": "chase-sapphire-preferred",
  "issuer": "Chase",
  "name": "Sapphire Preferred",
  "network": "Visa",
  "category": ["travel", "rewards"],
  "apr_purchase": { "min": 21.49, "max": 28.49 },
  "apr_intro": null,
  "apr_intro_months": 0,
  "apr_balance_transfer": { "min": 21.49, "max": 28.49 },
  "apr_cash_advance": 29.99,
  "annual_fee": 95,
  "foreign_tx_fee": 0,
  "balance_transfer_fee": 0.05,
  "signup_bonus": "60,000 points",
  "signup_bonus_spend": 4000,
  "signup_bonus_value_usd": 750,
  "rewards": {
    "travel_chase_portal": 5,
    "dining": 3,
    "online_groceries": 3,
    "streaming": 3,
    "other": 1
  },
  "rewards_type": "points",
  "points_value_cents": 1.25,
  "credit_score_required": { "min": 690, "recommended": 720 },
  "perks": ["Trip cancellation", "Primary rental car insurance", "..."],
  "drawbacks": ["$95 annual fee", "Foreign transfer fees on some redemptions"],
  "application_url": "https://www.chase.com/...",
  "last_updated": "2026-04-28"
}
```

## Card Review Pages

Auto-generated from JSON: hero card visual + name + key stats + "best for" badges + structured pros/cons + rewards breakdown table.

MDX overlay at `content/reviews/<slug>.mdx` (optional, ~300-500 words original commentary): "who this card is for", "the catch nobody mentions", "alternatives to consider".

Schema.org `Review` + `Product` markup with aggregateRating. "Compare to similar" widget at bottom (2-3 alternatives auto-suggested via category overlap).

## Listicle Pages

- Hero with TL;DR table (top 3 picks with one-line "best for X")
- Full ranked list with card cards, "Why we picked it" 100-word blurb, affiliate CTA
- Methodology section (E-E-A-T trust signal)
- "Who shouldn't get this kind of card" section (honesty signal)
- FAQ accordion (8-10 PAA Qs, schema.org `FAQPage`)
- Last-updated date prominent

Auto-pulls from JSON database. Reranking = re-running a script + tweaking blurbs.

## Ahrefs Research Pipeline

Scripts at `scripts/ahrefs/`. `.env.local` stores `AHREFS_API_KEY=bldAb-4QInmVjjFRldH6r-32VeDrIDnJQVReJhpw`. Auth: `Authorization: Bearer <key>`. Endpoint base: `https://api.ahrefs.com/v3/`.

1. **`opportunity-finder.js`** — seed keywords → `/keywords-explorer` → KD<30 + volume>500 → `data/keywords-opportunities.csv` (weekly cron)
2. **`competitor-gap.js`** — creditcards.com, nerdwallet.com/credit-cards, bankrate.com/credit-cards → `/site-explorer/keywords` → keywords they rank, we don't → `data/gap-keywords.csv`
3. **`backlink-tracker.js`** — `/site-explorer/backlinks` for our domain weekly, alerts on new/lost links, tracks DR growth
4. **`serp-monitor.js`** — target keywords → `/serp-overview` → top 10 + our position → `data/serp-rankings.csv`
5. **`content-gap.js`** — per pillar, find subtopics competitors cover that we don't (suggests new article ideas)

## Design System

**Type:**
- Headings: Geist (clean, modern, financial)
- Body: Inter (proven readability)
- Numbers/data: JetBrains Mono (signals precision in tools/calculators)

**Color:**
- Primary: deep navy `#0B1B3A` (trust, financial gravitas)
- Accent: bright green `#00C46A` (approval, money positive)
- Warning: amber `#F59E0B` (high APR, caution boxes)
- Neutral: slate gray scale `#0F172A` to `#F8FAFC`
- Background: pure white `#FFFFFF` (max contrast for tabular data)

**Components (Tailwind v3 + shadcn-style primitives):**
- `CardVisual` — issuer logo + faux-3D card render + key stats overlay
- `CardReviewBlock` — used in listicles
- `ComparisonTable` — sticky header, mobile-collapsible columns
- `ToolFrame` — sticky inputs left, results right (mobile stacks)
- `DisclosureBox` — top of every review/listicle (FTC compliant)
- `ProsCons` — two-column block
- `BestForBadge` — pill component
- `TLDRCallout`
- `FAQAccordion` — with schema.org `FAQPage` markup

## Affiliate & Monetization

**Day-1 infrastructure:**
- All "Apply Now" CTAs route through `/go/<card-slug>` — internal redirect
- Today: 302 to issuer page. When affiliate links land: swap redirect target. Zero page edits needed.
- `DisclosureBox` on every review/listicle/best-of page
- `/how-we-make-money` page (transparency, like MCA Guide)
- `/methodology` page (ranking criteria)

**Affiliate networks to apply (parallel, not blocking launch):**
- CardRatings (largest US issuer aggregator)
- Bankrate Credit Cards (partner program)
- FlexOffers (broad financial network)
- Direct issuer programs: Capital One, Discover, Chase, Amex

**Secondary:**
- Email capture: "Get notified when better cards launch in your category" → Klaviyo
- Cross-links: Coastal Debt funnel (rebuilders), themcaguide.com (business owners), businessdebtinsider (small business)

## Analytics, SEO Ops, Success Metrics

**Analytics:**
- GA4 (new property, hardcoded `G-` ID in `Analytics.tsx`)
- Google Search Console (DNS TXT verification)
- Cloudflare Web Analytics (no cookie banner needed)
- Klaviyo for email capture

**SEO ops:**
- Auto-generated sitemap via `scripts/build-sitemap.ts`
- robots.txt allows all (including AI crawlers — LLM citation = future traffic)
- IndexNow ping on every deploy
- Structured data: `Article`, `Review`, `Product`, `FAQPage`, `BreadcrumbList`, `WebApplication`, `Organization`
- Open Graph + Twitter card per page (auto-generated via OG image worker)

**Success metrics (review at 30/60/90 days):**
- D30: 200 impressions/day, 1+ click/day
- D60: 1,000 impressions/day, 20+ clicks/day, 5 keywords on page 1
- D90: 5,000 impressions/day, 100+ clicks/day, 25 keywords on page 1, 10 affiliate-network approvals

## Repository Structure

```
~/thecreditcardpick/
├── src/
│   ├── app/
│   │   ├── page.tsx                  # homepage
│   │   ├── best/[slug]/page.tsx      # listicle template
│   │   ├── cards/[slug]/page.tsx     # card review template
│   │   ├── tools/[slug]/page.tsx     # tool template
│   │   ├── learn/[pillar]/page.tsx   # pillar hub
│   │   ├── learn/[pillar]/[slug]/page.tsx
│   │   ├── compare/page.tsx
│   │   ├── glossary/[slug]/page.tsx
│   │   └── go/[slug]/route.ts        # affiliate redirect
│   ├── components/
│   │   ├── cards/CardVisual.tsx
│   │   ├── cards/CardReviewBlock.tsx
│   │   ├── tools/ToolFrame.tsx
│   │   ├── seo/Analytics.tsx
│   │   ├── seo/StructuredData.tsx
│   │   └── ui/...
│   └── lib/
│       ├── cards.ts                  # JSON loader
│       ├── articles.ts               # MDX loader
│       └── tools/                    # calc functions
├── data/
│   ├── cards/*.json                  # 50 day-1 records
│   ├── keywords-opportunities.csv
│   ├── gap-keywords.csv
│   └── serp-rankings.csv
├── content/
│   ├── reviews/*.mdx                 # 25 day-1 reviews
│   ├── learn/<pillar>/*.mdx          # 5 pillars + 15 articles
│   ├── best/*.mdx                    # 15 listicles
│   └── glossary/*.mdx
├── scripts/
│   ├── ahrefs/                       # 5 research scripts
│   ├── build-sitemap.ts
│   ├── seed-cards.ts
│   └── indexnow-ping.ts
├── public/
│   ├── images/cards/                 # WebP card art
│   └── images/issuers/               # logos
├── .env.local                        # AHREFS_API_KEY, etc.
└── next.config.js                    # output: 'export'
```

## Out of Scope (deferred)

- Database backend (D1/Postgres) — JSON-on-disk is sufficient for ~500 cards
- User accounts / saved comparisons (cookies + querystring sharing covers MVP)
- Card application APIs (manual JSON updates quarterly until automation justified)
- Mobile app
- Spanish translation (defer until US English ranks)
- Programmatic SEO blast (defer until Google trusts the domain)
- Travel-specific deep tooling (transfer partner calculators, etc.) — covered lightly day-1, expand if /best/travel ranks

## Risks & Mitigations

- **Affiliate network rejection** — mitigated by launching tools-first; site has standalone value without affiliate revenue
- **creditcards.com / NerdWallet domain authority** — mitigated by niche depth (rebuilders, business, newcomers underserved by them)
- **Card data freshness drift** — mitigated by `last_updated` field on every card + quarterly review cadence + Ahrefs alerts on issuer URLs
- **Thin-content penalty on listicles** — mitigated by 2,000-word target with original methodology + FAQs, not just card cards
- **Google sandbox on new domain** — expected; success metrics calibrated to D30/60/90 ramp, not week-1
