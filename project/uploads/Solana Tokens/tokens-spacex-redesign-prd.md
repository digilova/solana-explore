# PRD: Redesign Tokens.xyz SpaceX Asset Detail Page

## Context

We are redesigning the Tokens.xyz SpaceX asset detail page.

The current page uses a familiar crypto token-detail pattern: asset name, price, chart, stats, markets, variants, where-to-buy modules, security/risk section, and latest updates.

This pattern works for simple crypto-native tokens, but SpaceX is different. SpaceX on Tokens.xyz is not one simple token. It is an umbrella asset with multiple tokenized variants/products issued or represented by different protocols, platforms, or issuers.

The redesign should preserve what works about the current page, but improve clarity around variants, issuers, market structure, access, legitimacy, ecosystem maturity, and investor discovery.

A separate `design.md` file will provide visual system guidance. Do not focus on colors, typography, or final visual styling in this task. Focus on information architecture, layout, hierarchy, interactions, and product logic.

---

## Primary User: Issuers

For this redesign, treat **issuers** as the primary user.

An issuer may be:
- An asset manager
- A tokenization platform
- A financial product team
- A company evaluating whether to bring assets on-chain through Solana

Their core question is:

> If we issue or tokenize an asset on Solana, will the ecosystem make that asset look credible, liquid, discoverable, and operationally safe?

This means the page should not be designed only as a trader dashboard.

Price, charts, volume, and market activity still matter because they show demand, discoverability, and market energy. But they should not dominate the entire experience.

For issuers, the page needs to answer:

1. Will my asset be understood by investors?
2. Will my issuer identity be visible?
3. Will my asset's legitimacy and trust signals be clear?
4. Will market activity and liquidity be represented accurately?
5. Will investors know the right next step to trade, verify, or access the asset?
6. Will the surrounding Solana ecosystem look healthy and credible?

The product framing should be:

**Issuer confidence + investor discoverability**

Not simply:

**Institutional investor analysis**

---

## Ecosystem Proof

For issuers, Tokens.xyz is not only an investor-facing discovery page. It is also ecosystem proof.

If an issuer can see that assets like tokenized SpaceX exposure, T-bills, and gold are already discoverable on Solana with visible liquidity, volume, venues, and market activity, it reduces the perceived risk of issuing, integrating, or distributing assets through the Solana ecosystem.

This means the page should make ecosystem maturity visible, not just individual token performance.

For issuers, the page should help answer:

1. Are serious assets already live on Solana?
2. Is there visible liquidity and trading activity?
3. Are there credible venues, aggregators, and market participants?
4. Are investors able to discover and evaluate these assets?
5. Would our asset look legitimate and understandable if listed here?
6. Does Solana look like credible infrastructure for tokenized asset distribution?

---

## Secondary Users

Although issuers are primary, the page still serves other audiences.

### Retail / Crypto-Native Investors

They care about:
- Price
- Chart movement
- Momentum
- Liquidity
- 24H volume
- Where to trade
- Whether the asset looks active and discoverable

### Sophisticated / Institutional Investors

They care about:
- Issuer identity
- Instrument type
- Market depth
- Liquidity fragmentation
- Access restrictions
- KYC or permissioning
- Trust signals
- Security/risk
- Whether the product is backed, synthetic, pre-IPO, or unclear

### Ecosystem / Protocol Teams

They care about:
- Whether Solana looks like credible infrastructure
- Whether venues and aggregators are visible
- Whether market activity appears healthy
- Whether assets can be discovered and compared

---

## Core Concepts / Nomenclature

Use this hierarchy when designing the page:

`Asset -> Variant / Issuer -> Market / Venue -> Pair`

### Asset

The umbrella asset being represented.

Example:
`SpaceX`

### Variant

A specific tokenized version, representation, or product related to the asset.

Examples:
- `SPCX`
- `SPCXx`
- `TSPX`
- `SPACEX`
- `SPCXon`

### Issuer

The company, protocol, or platform behind a variant.

Examples:
- Backpack Securities
- xStock
- Ondo
- PreStocks

### Market / Venue

The place or liquidity pool where a variant trades.

Examples:
- Orca
- Kamino
- Meteora
- Raydium
- Other liquidity venues or aggregators

### Pair

The specific trading pair inside a market.

Examples:
- `SPCX / USDC`
- `TSPX / USDC`
- `SPCXon / USDT`

The current page often mixes these concepts together. The redesign should make them easier to distinguish.

---

## Current Page Problems

### 1. Variants are repeated too many times

Variants currently appear:
- In the `5+ variants` dropdown near the asset title
- As grouped sections inside Markets
- As a standalone Variants section lower on the page
- Again after clicking into a selected variant page

This creates repetition and makes the page feel like it loops.

### 2. "View more markets" behaves unexpectedly

The current `View 18 more` interaction sounds like it will expand the current section, but it navigates to a variant-specific page.

This breaks context and feels misleading.

Preferred behavior:
- Keep the user on the page.
- Expand markets inline.
- Change the button to `Show fewer markets`.

### 3. The overview hides useful data

The selected variant page exposes richer market data than the overview page.

The overview should surface enough market data to be useful, then progressively disclose deeper information.

### 4. Variant comparison is not scannable enough

Cards are visually digestible, but they are not ideal for comparing variants.

Users need to compare variants by:
- Issuer
- Type
- Liquidity
- 24H volume
- Access / restriction state

### 5. Access and legitimacy context is missing

For tokenized private-market or RWA-like assets, users need more than price and liquidity.

They need to understand:
- Who issued the variant
- What type of instrument it is
- Whether it is open, restricted, KYC-gated, or unclear
- Whether it is backed, synthetic, pre-IPO exposure, or not specified
- Whether regulatory/compliance details are available

Do not overclaim compliance. Avoid saying something is "compliant" unless the specific claim is verified.

### 6. Spot / Futures / Liquidity competes with variants

The current module can be confusing because it is unclear whether it changes the asset type, market type, product type, or user action.

This should likely become a filter inside the Markets area rather than a separate competing module.

### 7. Security/risk section needs explanation

The security score is potentially useful but unclear.

Users need to know:
- Is the score asset-wide or variant-specific?
- Is it current or historical?
- What inputs determine it?
- What does "Weak Metrics" mean?
- Is this a market-health score, not a regulatory rating?

### 8. Latest Updates module needs clearer purpose

Latest Updates may be useful for proof of activity, but for issuer-first design it should not compete with the main asset/variant/market structure.

Consider whether it should be:
- Market Updates
- Issuer Updates
- On-chain Activity
- Disclosures

---

## Product Goals

The redesign should help users:

1. Understand what SpaceX exposure is being shown.
2. Understand that there are multiple variants/products.
3. Compare variants without reading repetitive sections.
4. See issuer identity clearly.
5. See whether each variant has meaningful liquidity and activity.
6. Understand whether each variant is open, restricted, KYC-gated, or unclear.
7. Inspect markets inline without losing context.
8. Understand Solana ecosystem legitimacy around the asset.
9. Help issuers imagine how their own asset would be discovered and evaluated.
10. Make Solana ecosystem maturity visible through liquidity, volume, venues, asset diversity, and market activity.

---

## Design Principles

### 1. Preserve familiarity where useful

The page should still feel like a recognizable asset detail page, especially in Variation A.

### 2. Separate asset-level and variant-level information

Do not make users guess whether a price, chart, stat, risk score, or market table is aggregate or variant-specific.

### 3. Progressive disclosure over data overload

Show only the critical information first. Move deeper details into expanded rows, drawers, tooltips, or detail states.

### 4. Treat variants as financial products, not just ticker symbols

Variants should expose issuer, type, access, and trust context.

### 5. Avoid compliance overclaims

Use careful labels:
- `Open`
- `Restricted`
- `KYC required`
- `Check issuer`
- `Unknown`

Avoid generic `Compliant` unless specific regulatory basis is shown.

---

## Critical Overview Data

For the main comparison view, avoid overloading the table.

Most critical columns:

| Column | Why it matters |
|---|---|
| Variant | What version of SpaceX exposure is this? |
| Issuer | Who created or manages it? |
| Type | What kind of product is it? |
| Liquidity | Can users realistically enter/exit? |
| 24H Volume | Is there active demand/trading? |
| Access | Can users access it openly or is it restricted? |

Everything else should be secondary.

Secondary details:
- Market count
- Top venue
- Top pair
- 24H trades
- 24H wallets
- Execution quality
- Domicile
- Regulatory framework
- Backing model
- Redemption terms
- Contract/mint address

---

## Required Interaction: Inline Market Expansion

Replace confusing navigation with inline expansion.

Current:
`View 18 more` navigates to another page.

New:
`Show all 20 markets` expands inline.

Default state:
- Show variant summary.
- Optionally show top 1-2 markets.
- Show button: `Show all X markets`.

Expanded state:
- Show full market list inline.
- Include richer market columns:
  - Venue
  - Pair
  - Liquidity
  - 24H Volume
  - 24H Trades
  - 24H Wallets
- Button changes to `Show fewer markets`.
- User remains on the same page.

---

## Required Exploration: Spot / Futures / Liquidity

Do not assume the current module is correct.

Explore at least 2 solutions.

### Option A: Market Filter Tabs

Move `Spot`, `Futures`, and `Liquidity` inside the Markets section as filters.

### Option B: Task-Based Labels

Replace or supplement them with clearer user-intent labels:
- `Trade`
- `Hedge`
- `Provide Liquidity`

### Option C: Variant Table Metadata

Do not use them as tabs. Instead show availability as small indicators in the variant comparison table:
- Spot available
- Futures available
- Liquidity pools available

For each option, explain:
- What problem it solves
- What it makes clearer
- What tradeoff it introduces

---

## Required Exploration: Top Variants Dropdown

Explore at least 2 solutions.

### Option A: Remove it

Remove the top `5+ variants` dropdown and rely on the main Variant Comparison section.

### Option B: Keep as jump link

Keep `5+ variants`, but clicking it scrolls to Variant Comparison instead of opening a redundant dropdown.

### Option C: Keep as quick switcher

Keep it as a compact quick switcher, but avoid duplicating the same variant cards elsewhere.

Explain which option is best for each variation.

---

## Required Design Variations

Create two distinct redesign directions.

Do not merge the two concepts too early. They should feel meaningfully different so we can evaluate the strategic tradeoff.

---

# Variation A: Evolved Current Experience

## Strategic Goal

Stay close to the current Tokens.xyz page pattern.

Keep the page familiar to retail and crypto-native users, while adding enough issuer and ecosystem legitimacy signals to make it more credible for asset issuers evaluating Solana.

## Preserve

- Asset header
- Price chart
- Key stats
- Markets section
- Familiar token page flow
- Discoverability and market momentum

## Improve

- Variant repetition
- Inline `Show all markets`
- Clearer issuer identity
- Access / KYC / restriction labels
- Better explanation of variants
- Clearer distinction between variant, issuer, market, venue, and pair
- More visible ecosystem legitimacy signals

## Primary Question

> If my asset appeared in this familiar Tokens.xyz format, would investors understand it and would it look credible enough?

## Design Emphasis

- Retail discoverability
- Market activity
- Familiar crypto UX
- Issuer credibility added into the existing flow

---

# Variation B: Institutional / Issuer-First Reframe

## Strategic Goal

Substantially rethink the page as a serious evaluation surface for issuers, asset managers, and institutional users assessing whether Solana is credible infrastructure for tokenized assets.

This version does not need to preserve the current layout if a better hierarchy exists.

## Primary Question

> Should we issue, tokenize, or distribute assets on Solana, and will the ecosystem make those assets look legitimate, liquid, and accessible?

## Prioritize

- Issuer identity
- Instrument type
- Trust / access / compliance context
- Liquidity depth
- Market fragmentation
- Ecosystem health
- Investor discovery path
- Operational credibility
- Clear next steps
- Ecosystem proof across tokenized asset categories such as private-market exposure, T-bills, commodities, and other real-world assets

Price and chart can still exist, but should not dominate the page.

## Suggested Structure To Explore

1. Asset / ecosystem summary
2. Issuer and variant comparison
3. Trust and access indicators
4. Liquidity and market depth
5. Venue / aggregator ecosystem
6. Security / risk explanation
7. Investor next-step paths

## Design Emphasis

- Issuer confidence
- Institutional trust
- Market structure clarity
- Ecosystem legitimacy
- Investor access and discoverability

---

## What To Remove, Merge, Or Demote

Please evaluate whether to:

- Remove the standalone lower Variants section.
- Merge variant data into the main comparison table.
- Demote Latest Updates if it competes with higher-priority content.
- Remove or repurpose the top variants dropdown.
- Replace `View more` navigation with inline expansion.
- Move Spot/Futures/Liquidity into Markets as filters or indicators.

---

## Copy Guidance

Avoid:
`Token representations of SpaceX on Solana`

Prefer:
`Compare available SpaceX variants by issuer, liquidity, activity, and access.`

Or:
`Different issuers offer separate SpaceX-related markets on Solana. Compare them before choosing where to trade or investigate further.`

Use careful access labels:
- `Open`
- `Restricted`
- `KYC required`
- `Check issuer`
- `Unknown`

Do not say:
`SpaceX is regulated`

Say:
`SpaceX-related tokenized variants may have different issuer, access, and regulatory characteristics.`

---

## Deliverables

Please provide:

1. Revised information architecture.
2. Two distinct page layout concepts:
   - Variation A: Evolved Current Experience
   - Variation B: Institutional / Issuer-First Reframe
3. Wireframe-level structure for both variations.
4. Simplified variant comparison module.
5. Inline market expansion pattern.
6. At least 2 alternate solutions for Spot / Futures / Liquidity.
7. At least 2 alternate solutions for the top `5+ variants` dropdown.
8. Recommendation for what to remove, merge, or demote.
9. Explanation of how each variation supports:
   - Issuers
   - Retail users
   - Sophisticated / institutional users
10. A final recommendation:
   - Which direction should ship first?
   - Which direction is the stronger long-term product vision?
   - What tradeoffs should the team consider?

Prioritize clarity, scanability, issuer confidence, ecosystem proof, and investor discoverability.
