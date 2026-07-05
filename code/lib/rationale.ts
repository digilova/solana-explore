type DecisionKind = "removed" | "merged" | "demoted" | "changed";

const TAG_STYLES: Record<DecisionKind, { bg: string; color: string }> = {
  removed: { bg: "var(--color-down-soft)", color: "var(--color-down)" },
  merged: { bg: "var(--color-down-soft)", color: "var(--color-down)" },
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
    "Kept as a jump link because the chart pushes variants below the fold."
  ),
  d(
    "Spot / Futures / Liquidity module",
    "merged",
    "Merged",
    "Filter tabs now live inside Markets. No longer a competing module."
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
  value: string;
}

export const AUDIENCES: Audience[] = [
  {
    who: "Issuers (primary)",
    value:
      "Sees issuer identity surfaced in a familiar retail context: issuer name, access labels, verification signals, and market-health context. Answers “would my asset look credible in the existing format?” without forcing a separate issuer-first page.",
  },
  {
    who: "Retail / crypto-native investors",
    value:
      "Nothing is taken away: chart, price, stats, and buy paths stay on top. Access labels and inline market expansion add context without burying the fast trading workflow.",
  },
  {
    who: "Sophisticated / institutional investors",
    value:
      "Gains issuer, type, access, backing, verification, market depth, trades, wallets, and health-score explanation in one expandable comparison module.",
  },
];
