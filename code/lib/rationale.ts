type DecisionKind = "removed" | "merged" | "demoted" | "changed";

const TAG_STYLES: Record<DecisionKind, { bg: string; color: string }> = {
  removed: { bg: "rgba(249,36,52,0.1)", color: "#CF4040" },
  merged: { bg: "rgba(255,160,152,0.28)", color: "#9E0016" },
  demoted: { bg: "#F2F3F5", color: "rgba(45,45,45,0.65)" },
  changed: { bg: "rgba(81,193,72,0.15)", color: "#4AA651" },
};

export interface Decision {
  module: string;
  decision: string;
  why: string;
  bg: string;
  color: string;
}

function d(module: string, kind: DecisionKind, label: string, why: string): Decision {
  return { module, decision: label, why, bg: TAG_STYLES[kind].bg, color: TAG_STYLES[kind].color };
}

export const DECISIONS: Decision[] = [
  d(
    "Standalone lower Variants section",
    "removed",
    "Removed",
    "Fully absorbed by the single comparison module; it was the main source of repetition."
  ),
  d(
    "Variant grouping inside Markets",
    "merged",
    "Merged",
    "Markets now nest inside each variant’s expanded row — the hierarchy renders itself."
  ),
  d(
    '"View 18 more" navigation',
    "changed",
    "Replaced",
    'Inline expansion with "Show all X markets" ↔ "Show fewer markets"; user never loses page context.'
  ),
  d(
    'Top "5+ variants" dropdown',
    "changed",
    "Repurposed",
    "Jump link in A (chart pushes variants below fold); removed in B (comparison is the second section)."
  ),
  d(
    "Spot / Futures / Liquidity module",
    "merged",
    "Merged",
    "Filter tabs inside Markets in A; per-variant availability chips in B. No longer a competing module."
  ),
  d(
    "Latest Updates",
    "demoted",
    "Demoted",
    'Renamed "Market updates", moved to page bottom, capped at three items with typed tags (Listing / Activity / Issuer). Proof of activity without competing with structure.'
  ),
  d(
    "Security score",
    "changed",
    "Reframed",
    '"Market health" with scope label (asset-wide, daily), input breakdown, and explicit "not a regulatory rating" framing.'
  ),
];

export interface Audience {
  who: string;
  a: string;
  b: string;
}

export const AUDIENCES: Audience[] = [
  {
    who: "Issuers (primary)",
    a: "Sees their identity surfaced in a familiar retail context: issuer column, access labels, exec-quality badge. Answers “would my asset look credible in the existing format?”",
    b: "The page is built around their evaluation: product-sheet cards, structure disclosures, fragmentation honesty, ecosystem proof, and a direct “bring an asset to Solana” path.",
  },
  {
    who: "Retail / crypto-native investors",
    a: "Nothing is taken away — chart, price, stats, and buy paths stay on top; access labels prevent surprise KYC walls at the venue.",
    b: "Price is one click deeper but compare-then-trade is arguably safer: access and structure are visible before venue selection.",
  },
  {
    who: "Sophisticated / institutional investors",
    a: "Gains issuer, type, and access columns plus richer expanded market data (trades, wallets) that the overview previously hid.",
    b: "Best fit: instrument type, backing, redemption, domicile, concentration analysis, and per-venue depth — the diligence checklist in page form.",
  },
];
