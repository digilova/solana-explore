# SpaceX (SPCX) Token Page — FE Prototype

A front-end-only prototype of a redesigned SpaceX asset page for a Solana token
aggregator, modeled on [tokens.xyz/spacex](https://www.tokens.xyz/spacex). It is
meant for internal design review — **not a working product**. There is no
backend: every price, chart, market row, and health score is mock data.

## Running it

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | What it shows |
|---|---|
| `/` | Landing / switcher between the variations |
| `/variation-a` | **Variation A — Evolved.** Familiar tokens.xyz flow with issuer signals added: reference-price chart, variants & markets table, buy module, market health, floating "Latest Updates" feed |
| `/variation-b` | Variation B — Issuer-first layout |
| `/rationale` | Design rationale notes for the redesign |

## Where things live

- `app/` — one folder per route (Next.js App Router)
- `components/variation-a/` — Variation A modules (`AssetHeader`, `ChartCard`, `VariantsMarkets`, `WhereToBuy`, `MarketHealthA`, `MarketFeed`)
- `components/variation-b/` — Variation B modules
- `lib/dataA.ts` / `lib/dataB.ts` — all mock data per variation (variants, market rows, chart series, health scores, feed items)
- `app/globals.css` — design tokens (CSS variables) and hover utilities
- `public/avatars/` — variant logo marks

## Data caveats

Headline figures were sampled from tokens.xyz in July 2026. Detail rows in
expanded market lists are generated with a seeded pseudo-random helper
(`lib/format.ts`) so they are stable across reloads, but they are illustrative
only.

## Design docs

The design-system references live one level up, in the repo root:
`../tokens.xyz-DESIGN.md` (canonical) and `../www.tokens.xyz-DESIGN.md`.
