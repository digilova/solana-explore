import { seeded, fmt, fmtCount } from "./format";

export interface MarketRowA {
  venue: string;
  pair: string;
  price: string;
  liq: string;
  vol: string;
  trades: string;
  wallets: string;
  href: string;
}

export type AccessKindA = "kyc" | "restricted" | "check";

export interface VariantDefA {
  sym: string;
  title: string;
  name: string;
  issuer: string;
  type: string;
  avatar: string;
  avatarBg: string;
  img: string;
  price: string;
  liq: string;
  vol: string;
  access: string;
  accessKind: AccessKindA;
  accessHint: string;
  markets: number;
  spot: MarketRowA[];
  pools: MarketRowA[];
}

export const ACCESS_STYLES_A: Record<AccessKindA, { bg: string; color: string }> = {
  kyc: { bg: "rgba(255,160,152,0.28)", color: "#9E0016" },
  restricted: { bg: "rgba(255,160,152,0.28)", color: "#9E0016" },
  check: { bg: "rgba(14,14,14,0.06)", color: "#555555" },
};

export const ACCESS_KIND_TOOLTIPS: Record<AccessKindA, string> = {
  kyc: "The issuer requires identity verification to mint or redeem this token. On-chain trading may have different rules.",
  restricted: "Not available to all investors or in all regions. Confirm you qualify with the issuer before trading.",
  check: "Access rules are not published in a standard format here. Check the issuer's documentation before trading.",
};

function mkRow(venue: string, pair: string, liq: number, vol: number, trades: number, wallets: number, price: number): MarketRowA {
  return {
    venue,
    pair,
    price: fmt(price),
    liq: fmt(liq),
    vol: fmt(vol),
    trades: fmtCount(trades),
    wallets: fmtCount(wallets),
    href: "#" + venue.toLowerCase() + "-" + pair.toLowerCase().replace("/", "-"),
  };
}

function tail(sym: string, count: number, startLiq: number, startVol: number, seed: number, basePrice: number): MarketRowA[] {
  const venues = ["Orca", "Raydium", "Meteora", "Byreal", "Kamino", "Sunrise"];
  const quotes = ["USDC", "USDT", "SOL", "USDC", "JitoSOL", "USDC"];
  const rnd = seeded(seed);
  const rows: MarketRowA[] = [];
  let liq = startLiq;
  let vol = startVol;
  for (let i = 0; i < count; i++) {
    liq *= 0.45 + rnd() * 0.25;
    vol *= 0.4 + rnd() * 0.3;
    const price = basePrice * (0.985 + rnd() * 0.03);
    rows.push(mkRow(venues[i % 6], sym + "/" + quotes[i % 6], liq, vol, Math.max(2, vol / 900), Math.max(1, vol / 3200), price));
  }
  return rows;
}

export function getVariantDefsA(): VariantDefA[] {
  return [
    {
      sym: "SPCX",
      title: "SpaceX (Backpack Securities)",
      name: "SpaceX",
      issuer: "Backpack Securities",
      type: "Tokenized equity",
      avatar: "BP",
      avatarBg: "#171717",
      img: "https://img.fotofolio.xyz/?url=https%3A%2F%2Fbackpack.exchange%2Fapi%2Fstock-logo%2FSPCX",
      price: "$189.42",
      liq: "$7.03M",
      vol: "$29.49M",
      access: "KYC Required",
      accessKind: "kyc",
      markets: 20,
      accessHint: "Backpack Securities requires identity verification to mint or redeem. On-chain trading may have different rules.",
      spot: [mkRow("Orca", "SPCX/USDC", 778010, 10620000, 18200, 4400, 189.44), mkRow("Meteora", "SPCX/USDC", 2800000, 6970000, 12400, 3100, 189.4)].concat(
        tail("SPCX", 18, 620000, 3400000, 7, 189.42)
      ),
      pools: [
        mkRow("Meteora", "SPCX/USDC pool", 2800000, 6970000, 12400, 3100, 189.4),
        mkRow("Kamino", "SPCX/USDC vault", 1140000, 890000, 640, 210, 189.38),
      ].concat(tail("SPCX", 6, 500000, 700000, 17, 189.42)),
    },
    {
      sym: "SPCXx",
      title: "SpaceX xStock",
      name: "SpaceX",
      issuer: "Backed (xStocks)",
      type: "Tokenized equity",
      avatar: "xS",
      avatarBg: "#3D6B99",
      img: "https://xstocks-metadata.backed.fi/logos/tokens/SPCXx.png",
      price: "$188.10",
      liq: "$1.21M",
      vol: "$1.61M",
      access: "Restricted",
      accessKind: "restricted",
      markets: 20,
      accessHint: "Geo-restricted by the issuer — not available to US persons and other blocked regions.",
      spot: [mkRow("Byreal", "SPCXx/USDC", 207410, 788900, 2900, 860, 188.12), mkRow("Raydium", "SPCX/SPCXx", 108600, 424790, 1700, 420, 188.08)].concat(
        tail("SPCXx", 18, 95000, 300000, 23, 188.1)
      ),
      pools: [
        mkRow("Raydium", "SPCX/SPCXx pool", 108600, 424790, 1700, 420, 188.08),
        mkRow("Meteora", "SPCXx/USDC pool", 88000, 210000, 900, 260, 188.05),
      ].concat(tail("SPCXx", 5, 60000, 150000, 29, 188.1)),
    },
    {
      sym: "TSPX",
      title: "tSpaceX Tessera",
      name: "tSpaceX",
      issuer: "Tessera",
      type: "Pre-IPO exposure",
      avatar: "TS",
      avatarBg: "#6B4E9E",
      img: "https://cdn.tesseralab.co/tessera/tokenicon_T-SpaceX.svg",
      price: "$187.65",
      liq: "$611.06K",
      vol: "$912.76K",
      access: "Check Issuer",
      accessKind: "check",
      markets: 11,
      accessHint: "Tessera has not published clear access rules here. Check their documentation before trading.",
      spot: [mkRow("Meteora", "TSPX/USDC", 632780, 712980, 7300, 1900, 187.7), mkRow("Meteora", "tSpaceX/USDC", 3750, 0, 0, 0, 187.6)].concat(
        tail("TSPX", 9, 42000, 90000, 31, 187.65)
      ),
      pools: [mkRow("Meteora", "TSPX/USDC pool", 632780, 712980, 7300, 1900, 187.7)].concat(tail("TSPX", 4, 30000, 60000, 37, 187.65)),
    },
    {
      sym: "SPACEX",
      title: "SpaceX PreStocks",
      name: "SpaceX",
      issuer: "PreStocks",
      type: "Pre-IPO exposure",
      avatar: "PS",
      avatarBg: "#A8552E",
      img: "https://prestocks.com/logos/spacex.png",
      price: "$190.05",
      liq: "$33.62K",
      vol: "$80.82K",
      access: "Check Issuer",
      accessKind: "check",
      markets: 20,
      accessHint: "PreStocks has not published clear access rules here. Check their documentation before trading.",
      spot: [mkRow("Meteora", "SPACEX/USDC", 24310, 38700, 563, 180, 190.1), mkRow("Meteora", "SPACEX/SPCXx", 451170, 32070, 240, 96, 190.0)].concat(
        tail("SPACEX", 18, 18000, 22000, 41, 190.05)
      ),
      pools: [mkRow("Meteora", "SPACEX/SPCXx pool", 451170, 32070, 240, 96, 190.0)].concat(tail("SPACEX", 5, 15000, 14000, 43, 190.05)),
    },
    {
      sym: "SPCXon",
      title: "SpaceX Ondo Tokenized",
      name: "SpaceX",
      issuer: "Ondo",
      type: "Tokenized equity",
      avatar: "ON",
      avatarBg: "#2E7D6B",
      img: "https://cdn.ondo.finance/tokens/logos/spcxon_160x160.png",
      price: "$186.20",
      liq: "$132.77",
      vol: "$15.45K",
      access: "Restricted",
      accessKind: "restricted",
      markets: 2,
      accessHint: "Ondo's permissioned token — eligibility limits apply. Confirm you qualify before trading.",
      spot: [mkRow("Meteora", "SPCXon/USDT", 143.71, 0, 0, 0, 186.25), mkRow("Meteora", "SPCXon/USDC", 7.25, 0, 0, 0, 186.15)],
      pools: [],
    },
  ];
}

export type RangeKey = "LIVE" | "1D" | "1W" | "30D" | "ALL";

const CHART_SEEDS: Record<RangeKey, number> = { LIVE: 11, "1D": 42, "1W": 77, "30D": 123, ALL: 555 };
const CHART_DRIFTS: Record<RangeKey, number> = { LIVE: -0.15, "1D": -0.5, "1W": -0.3, "30D": 0.25, ALL: 0.9 };

export interface CandlePoint {
  x: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export function buildChart(range: RangeKey): { points: [number, number][]; candles: CandlePoint[] } {
  const rnd = seeded(CHART_SEEDS[range] || 42);
  const n = 64;
  let y = 90;
  const pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    y += (rnd() - 0.5) * 22 + (CHART_DRIFTS[range] || 0);
    y = Math.max(20, Math.min(190, y));
    pts.push([(i / (n - 1)) * 800, y]);
  }

  const crnd = seeded((CHART_SEEDS[range] || 42) + 1000);
  const cn = 40;
  let value = 90;
  const candles: CandlePoint[] = [];
  for (let i = 0; i < cn; i++) {
    const open = value;
    value += (crnd() - 0.5) * 22 + (CHART_DRIFTS[range] || 0);
    value = Math.max(25, Math.min(185, value));
    const close = value;
    const high = Math.max(20, Math.min(open, close) - crnd() * 8);
    const low = Math.min(195, Math.max(open, close) + crnd() * 8);
    candles.push({ x: (i / (cn - 1)) * 800, open, high, low, close });
  }

  return { points: pts, candles };
}

export const PERIOD_MAP: Record<RangeKey, { volLabel: string; vol: string; chgLabel: string; chg: string }> = {
  LIVE: { volLabel: "Volume Today", vol: "$18.42M", chgLabel: "Change Today", chg: "-1.24%" },
  "1D": { volLabel: "24H Volume", vol: "$32.10M", chgLabel: "24H Change", chg: "-3.07%" },
  "1W": { volLabel: "1W Volume", vol: "$147.6M", chgLabel: "1W Change", chg: "-5.82%" },
  "30D": { volLabel: "30D Volume", vol: "$612.3M", chgLabel: "30D Change", chg: "+4.15%" },
  ALL: { volLabel: "Total Volume", vol: "$3.94B", chgLabel: "Change (All)", chg: "+61.4%" },
};

const DAY_MS = 24 * 60 * 60 * 1000;

function formatChartTime(date: Date) {
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

function formatChartDay(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatChartMonth(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function labelsFromWindow(end: Date, spanMs: number, stepMs: number, format: (date: Date) => string) {
  const startMs = end.getTime() - spanMs;
  const labels: string[] = [];

  for (let t = startMs; t <= end.getTime(); t += stepMs) {
    labels.push(format(new Date(t)));
  }

  if (labels.length === 0) {
    return ["Now"];
  }

  labels[labels.length - 1] = "Now";
  return labels;
}

/** X-axis labels derived from the active chart window (end = now). */
export function getChartAxisLabels(range: RangeKey, end = new Date()): string[] {
  switch (range) {
    case "LIVE":
      return labelsFromWindow(end, 6 * 60 * 60 * 1000, 60 * 60 * 1000, formatChartTime);
    case "1D":
      return labelsFromWindow(end, DAY_MS, DAY_MS / 4, formatChartTime);
    case "1W":
      return labelsFromWindow(end, 7 * DAY_MS, DAY_MS, formatChartDay);
    case "30D":
      return labelsFromWindow(end, 30 * DAY_MS, 6 * DAY_MS, formatChartDay);
    case "ALL": {
      const start = new Date(2025, 11, 1);
      const labels: string[] = [];
      const cursor = new Date(start);
      while (cursor.getTime() <= end.getTime()) {
        labels.push(formatChartMonth(cursor));
        cursor.setMonth(cursor.getMonth() + 2);
      }
      if (labels.length === 0) {
        return ["Now"];
      }
      labels[labels.length - 1] = "Now";
      return labels;
    }
  }
}

const RANGE_SPAN_MS: Record<Exclude<RangeKey, "ALL">, number> = {
  LIVE: 6 * 60 * 60 * 1000,
  "1D": DAY_MS,
  "1W": 7 * DAY_MS,
  "30D": 30 * DAY_MS,
};

/** Map a horizontal fraction (0 = window start, 1 = now) to a timestamp. */
export function getChartScrubTime(range: RangeKey, fraction: number, end = new Date()): Date {
  const t = Math.max(0, Math.min(1, fraction));
  if (range === "ALL") {
    const start = new Date(2025, 11, 1).getTime();
    return new Date(start + t * (end.getTime() - start));
  }
  const span = RANGE_SPAN_MS[range];
  return new Date(end.getTime() - span + t * span);
}

export function formatChartScrubLabel(range: RangeKey, date: Date): string {
  if (range === "LIVE" || range === "1D") return formatChartTime(date);
  if (range === "1W") return `${formatChartDay(date)}, ${formatChartTime(date)}`;
  if (range === "30D") return formatChartDay(date);
  return formatChartMonth(date);
}

export const AGGREGATORS_A = [
  { rank: "1", name: "Titan", initial: "TI", bg: "#333333", img: "https://www.tokens.xyz/logos/popular/titan.png", note: "Best route across 4 venues" },
  { rank: "2", name: "Jupiter", initial: "JU", bg: "#2E7D6B", img: "https://www.tokens.xyz/logos/popular/jupiter.png", note: "Routes all variants" },
  { rank: "3", name: "DFlow", initial: "DF", bg: "#3D6B99", img: "https://www.tokens.xyz/logos/popular/dflow.png", note: "Spot routing" },
];

export const VENUES_A = [
  { name: "Sunrise", initial: "SU", bg: "#A8552E", img: "https://www.tokens.xyz/logos/popular/sunrise.svg" },
  { name: "OMFG", initial: "OM", bg: "#555555", img: "https://www.tokens.xyz/logos/popular/omfg.svg" },
  { name: "Kamino", initial: "KA", bg: "#2E7D6B", img: "https://www.tokens.xyz/logos/popular/kamino.png" },
  { name: "Orca", initial: "OR", bg: "#C99A2E", img: "https://www.orca.so/favicon.ico" },
];

export const SCORE_INPUTS_A = [
  { label: "Liquidity depth", value: "$8.9M", grade: "Healthy", width: "78%", color: "var(--color-up)" },
  { label: "Volume consistency", value: "$5.2M", grade: "Healthy", width: "82%", color: "var(--color-up)" },
  { label: "Venue diversity", value: "7 venues", grade: "Healthy", width: "70%", color: "var(--color-up)" },
  { label: "Liquidity concentration", value: "61% top venue", grade: "Weak", width: "34%", color: "var(--color-down)" },
];

export const MARKET_HEALTH_SCORE_A = 72;
export const MARKET_HEALTH_CLASS_A = "Speculative";

export const MARKET_UPDATES = [
  { tag: "Listing", time: "2h ago", text: "SPCXx/USDC pool launched on Byreal with $200K+ seeded liquidity.", img: "/avatars/spcxx-mark.png" },
  { tag: "Activity", time: "6h ago", text: "24H volume across SpaceX variants crossed $32M, led by SPCX on Backpack.", img: "/avatars/spcx-mark.png" },
  { tag: "Issuer", time: "1d ago", text: "Tessera published updated redemption terms for TSPX holders.", img: "/avatars/tspx-mark.png" },
];

export const STATS_BASE = [
  { label: "Market Cap", value: "$104.78M" },
  { label: "Supply", value: "678.05K" },
  { label: "FDV", value: "$104.78M" },
];

const ON_CHAIN_FALLBACK = "Uses on-chain data across all variants; CoinGecko when unavailable.";

export const CHART_TOOLTIPS = {
  priceDisclaimer: (periodLabel: string) =>
    `Average price across all five SpaceX variants, weighted by each variant's 24h trading volume. The ${periodLabel} change above shows how that price moved over the selected period. ${ON_CHAIN_FALLBACK}`,
  marketCap: `Total value of all circulating tokens across every SpaceX variant, at the current price. ${ON_CHAIN_FALLBACK}`,
  liquidity: "Total funds in pools and markets for all SpaceX variants on Solana.",
  supply: `Tokens currently in circulation, summed across all SpaceX variants. ${ON_CHAIN_FALLBACK}`,
  fdv: `Total value if every token were issued and priced at the current reference price. ${ON_CHAIN_FALLBACK}`,
  volume: (range: RangeKey) => {
    switch (range) {
      case "LIVE":
        return "Total trading volume across all SpaceX variants and venues so far today.";
      case "1D":
        return "Total trading volume across all SpaceX variants and venues in the last 24 hours.";
      case "1W":
        return "Total trading volume across all SpaceX variants and venues in the past week.";
      case "30D":
        return "Total trading volume across all SpaceX variants and venues in the past 30 days.";
      case "ALL":
        return "Total trading volume across all SpaceX variants and venues since launch.";
    }
  },
};
