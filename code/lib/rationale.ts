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
    "Moved into the main comparison module. The old section repeated work users had already done."
  ),
  d(
    "Variant grouping inside Markets",
    "merged",
    "Merged",
    "Markets now sit under the variant they belong to."
  ),
  d(
    '"View 18 more" navigation',
    "changed",
    "Replaced",
    'Rows expand in place. Users do not have to leave the page to understand the market list.'
  ),
  d(
    'Top "5+ variants" dropdown',
    "changed",
    "Repurposed",
    "Kept as a jump link because variants sit below the chart."
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
    'Moved lower and capped. It shows activity without competing with the core market data.'
  ),
  d(
    "Security score",
    "changed",
    "Reframed",
    '"Market health" says what it measures and avoids sounding like a regulatory rating.'
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
      "They can see whether the page makes their asset look credible: issuer name, access, verification, liquidity, and market health are all visible.",
  },
  {
    who: "Retail / crypto-native investors",
    value:
      "They still get the chart, price, stats, venues, and trade paths first. The added context does not slow down the basic workflow.",
  },
  {
    who: "Sophisticated / institutional investors",
    value:
      "They get enough structure to compare variants: issuer, backing, access, depth, trades, wallets, and health signals.",
  },
];
