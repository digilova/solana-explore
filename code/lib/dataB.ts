export interface MarketRow {
  venue: string;
  pair: string;
  liq: number;
  vol: number;
}

export interface Fact {
  k: string;
  v: string;
  tip?: string;
}

export type AccessKind = "kyc" | "restricted" | "check";

export interface VariantDef {
  sym: string;
  issuer: string;
  type: string;
  avatar: string;
  avatarBg: string;
  price: string;
  chg: string;
  chgUp: boolean;
  img: string;
  liq: string;
  vol: string;
  access: string;
  accessKind: AccessKind;
  accessHint: string;
  avail: { label: string; on: boolean }[];
  facts: Fact[];
  marketNote: string;
  rows: MarketRow[];
  extra?: MarketRow[];
}

export const ACCESS_STYLES: Record<AccessKind, { bg: string; color: string }> = {
  kyc: { bg: "var(--color-down-soft)", color: "var(--color-down)" },
  restricted: { bg: "var(--color-down-soft)", color: "var(--color-down)" },
  check: { bg: "#F2F3F5", color: "rgba(45,45,45,0.65)" },
};

function chip(label: string, on: boolean) {
  return { label, on };
}

const row = (venue: string, pair: string, liq: number, vol: number): MarketRow => ({ venue, pair, liq, vol });

export const VARIANT_DEFS: VariantDef[] = [
  {
    sym: "SPCX",
    issuer: "Backpack Securities",
    type: "Tokenized equity",
    avatar: "BP",
    avatarBg: "#171717",
    price: "$188.87",
    chg: "-3.07%",
    chgUp: false,
    img: "https://img.fotofolio.xyz/?url=https%3A%2F%2Fbackpack.exchange%2Fapi%2Fstock-logo%2FSPCX",
    liq: "$7.03M",
    vol: "$29.49M",
    access: "KYC required",
    accessKind: "kyc",
    accessHint: "Backpack Securities states KYC verification is required to mint or redeem. Verify with issuer.",
    avail: [chip("Spot", true), chip("LP", true), chip("Perps", false)],
    facts: [
      { k: "Instrument", v: "Tokenized equity" },
      {
        k: "Backing",
        v: "Backed 1:1 (issuer-stated)",
        tip: "Attested: independent accountant’s reserve report, monthly · last Jun 30, 2026 (illustrative in prototype).",
      },
      { k: "Redemption", v: "Via issuer, KYC required" },
      { k: "Domicile", v: "Not specified", tip: "No structured disclosure found — not necessarily that none exists. Check issuer docs." },
      { k: "Execution quality", v: "96 / 100" },
    ],
    marketNote: "20 markets total",
    rows: [row("Orca", "SPCX/USDC", 778010, 10620000), row("Meteora", "SPCX/USDC", 2800000, 6970000), row("Raydium", "SPCX/SOL", 412000, 1830000)],
    extra: [
      row("Orca", "SPCX/SOL", 388400, 1210000),
      row("Kamino", "SPCX/USDC", 341200, 904300),
      row("Meteora", "SPCX/SOL", 296800, 771500),
      row("Byreal", "SPCX/USDC", 233100, 618200),
      row("Raydium", "SPCX/USDC", 197400, 502900),
      row("Sunrise", "SPCX/USDC", 164800, 388100),
      row("Orca", "SPCX/USDT", 121500, 296400),
      row("Meteora", "SPCX/JitoSOL", 98200, 187300),
      row("Raydium", "SPCX/USDT", 76400, 141900),
      row("Kamino", "SPCX/SOL", 61800, 98700),
      row("Byreal", "SPCX/SOL", 44200, 71200),
      row("Meteora", "SPCX/USDT", 31600, 48400),
      row("Sunrise", "SPCX/SOL", 22900, 30100),
      row("Orca", "SPCX/mSOL", 15300, 18800),
      row("Raydium", "SPCX/JitoSOL", 9800, 11200),
      row("Meteora", "SPCX/bSOL", 6100, 5400),
      row("Byreal", "SPCX/USDT", 2700, 1900),
    ],
  },
  {
    sym: "SPCXx",
    issuer: "Backed (xStocks)",
    type: "Tokenized equity",
    avatar: "xS",
    avatarBg: "#3D6B99",
    price: "$189.42",
    chg: "-2.81%",
    chgUp: false,
    img: "https://xstocks-metadata.backed.fi/logos/tokens/SPCXx.png",
    liq: "$1.21M",
    vol: "$1.61M",
    access: "Restricted",
    accessKind: "restricted",
    accessHint: "Geo-restricted; not available to US persons per issuer documentation.",
    avail: [chip("Spot", true), chip("LP", true), chip("Perps", false)],
    facts: [
      { k: "Instrument", v: "Tokenized equity" },
      {
        k: "Backing",
        v: "Backed 1:1 (issuer-stated)",
        tip: "Attested: proof-of-reserve feed + auditor report · last Jun 2026 (illustrative in prototype).",
      },
      { k: "Redemption", v: "Via issuer, eligibility applies" },
      { k: "Domicile", v: "Switzerland (issuer-stated)" },
      { k: "Execution quality", v: "96 / 100" },
    ],
    marketNote: "20 markets total",
    rows: [row("Byreal", "SPCXx/USDC", 207410, 788900), row("Raydium", "SPCX/SPCXx", 108600, 424790), row("Meteora", "SPCXx/USDC", 88000, 210000)],
    extra: [
      row("Orca", "SPCXx/USDC", 74200, 168400),
      row("Meteora", "SPCXx/SOL", 61800, 132700),
      row("Raydium", "SPCXx/USDC", 52300, 104800),
      row("Kamino", "SPCXx/USDC", 44700, 88200),
      row("Byreal", "SPCXx/SOL", 37100, 69400),
      row("Orca", "SPCXx/SOL", 29800, 51200),
      row("Meteora", "SPCXx/USDT", 23400, 38600),
      row("Raydium", "SPCXx/SOL", 18200, 27100),
      row("Sunrise", "SPCXx/USDC", 13700, 18400),
      row("Kamino", "SPCXx/SOL", 9800, 11700),
      row("Byreal", "SPCXx/USDT", 6900, 7200),
      row("Orca", "SPCXx/USDT", 4400, 3800),
      row("Meteora", "SPCXx/mSOL", 2800, 1900),
      row("Raydium", "SPCXx/USDT", 1600, 800),
      row("Sunrise", "SPCXx/SOL", 900, 300),
      row("Meteora", "SPCXx/bSOL", 400, 100),
      row("Byreal", "SPCXx/JitoSOL", 200, 0),
    ],
  },
  {
    sym: "TSPX",
    issuer: "Tessera",
    type: "Pre-IPO exposure",
    avatar: "TS",
    avatarBg: "#6B4E9E",
    price: "$174.20",
    chg: "+1.36%",
    chgUp: true,
    img: "https://cdn.tesseralab.co/tessera/tokenicon_T-SpaceX.svg",
    liq: "$611.06K",
    vol: "$912.76K",
    access: "Check issuer",
    accessKind: "check",
    accessHint: "Access requirements not published in a structured format. Check issuer documentation.",
    avail: [chip("Spot", true), chip("LP", true), chip("Perps", false)],
    facts: [
      { k: "Instrument", v: "Pre-IPO exposure" },
      { k: "Backing", v: "Not specified", tip: "No reserve report or audit found — backing claim unverified. Check issuer docs." },
      { k: "Redemption", v: "Not specified", tip: "No structured disclosure found — not necessarily that none exists. Check issuer docs." },
      { k: "Domicile", v: "Not specified", tip: "No structured disclosure found — not necessarily that none exists. Check issuer docs." },
      { k: "24H trades", v: "7.3K" },
    ],
    marketNote: "11 markets total",
    rows: [row("Meteora", "TSPX/USDC", 632780, 712980), row("Meteora", "tSpaceX/USDC", 3750, 0)],
    extra: [
      row("Raydium", "TSPX/USDC", 3120, 4800),
      row("Orca", "TSPX/USDC", 2840, 3100),
      row("Meteora", "TSPX/SOL", 2210, 1700),
      row("Raydium", "TSPX/SOL", 1680, 900),
      row("Byreal", "TSPX/USDC", 1240, 600),
      row("Orca", "TSPX/SOL", 870, 300),
      row("Meteora", "TSPX/USDT", 520, 100),
      row("Kamino", "TSPX/USDC", 310, 0),
      row("Raydium", "TSPX/USDT", 140, 0),
    ],
  },
  {
    sym: "SPACEX",
    issuer: "PreStocks",
    type: "Pre-IPO exposure",
    avatar: "PS",
    avatarBg: "#A8552E",
    price: "$203.55",
    chg: "-4.92%",
    chgUp: false,
    img: "https://prestocks.com/logos/spacex.png",
    liq: "$33.62K",
    vol: "$80.82K",
    access: "Check issuer",
    accessKind: "check",
    accessHint: "Access requirements not published in a structured format. Check issuer documentation.",
    avail: [chip("Spot", true), chip("LP", true), chip("Perps", false)],
    facts: [
      { k: "Instrument", v: "Pre-IPO exposure" },
      { k: "Backing", v: "Not specified", tip: "No reserve report or audit found — backing claim unverified. Check issuer docs." },
      { k: "Redemption", v: "Not specified", tip: "No structured disclosure found — not necessarily that none exists. Check issuer docs." },
      { k: "Domicile", v: "Not specified", tip: "No structured disclosure found — not necessarily that none exists. Check issuer docs." },
      { k: "24H trades", v: "563" },
    ],
    marketNote: "20 markets total",
    rows: [row("Meteora", "SPACEX/USDC", 24310, 38700), row("Meteora", "SPACEX/SPCXx", 451170, 32070)],
    extra: [
      row("Raydium", "SPACEX/USDC", 19800, 24100),
      row("Orca", "SPACEX/USDC", 16200, 18800),
      row("Meteora", "SPACEX/SOL", 13400, 14200),
      row("Raydium", "SPACEX/SOL", 10800, 10600),
      row("Byreal", "SPACEX/USDC", 8600, 7800),
      row("Orca", "SPACEX/SOL", 6900, 5400),
      row("Kamino", "SPACEX/USDC", 5200, 3800),
      row("Meteora", "SPACEX/USDT", 3900, 2400),
      row("Raydium", "SPACEX/USDT", 2800, 1500),
      row("Sunrise", "SPACEX/USDC", 1900, 800),
      row("Byreal", "SPACEX/SOL", 1200, 400),
      row("Orca", "SPACEX/USDT", 780, 200),
      row("Kamino", "SPACEX/SOL", 460, 100),
      row("Meteora", "SPACEX/mSOL", 240, 0),
      row("Raydium", "SPACEX/JitoSOL", 120, 0),
      row("Sunrise", "SPACEX/SOL", 60, 0),
      row("Byreal", "SPACEX/USDT", 30, 0),
    ],
  },
  {
    sym: "SPCXon",
    issuer: "Ondo",
    type: "Tokenized equity",
    avatar: "ON",
    avatarBg: "#2E7D6B",
    price: "$187.90",
    chg: "-3.44%",
    chgUp: false,
    img: "https://cdn.ondo.finance/tokens/logos/spcxon_160x160.png",
    liq: "$132.77",
    vol: "$15.45K",
    access: "Restricted",
    accessKind: "restricted",
    accessHint: "Permissioned token; eligibility restrictions apply per issuer documentation.",
    avail: [chip("Spot", true), chip("LP", false), chip("Perps", false)],
    facts: [
      { k: "Instrument", v: "Tokenized equity" },
      { k: "Backing", v: "Backed (issuer-stated)", tip: "Issuer publishes backing verification · check report date before relying on it." },
      { k: "Redemption", v: "Via issuer, permissioned" },
      { k: "Domicile", v: "Not specified", tip: "No structured disclosure found — not necessarily that none exists. Check issuer docs." },
      { k: "24H trades", v: "19" },
    ],
    marketNote: "2 markets total",
    rows: [row("Meteora", "SPCXon/USDT", 143.71, 0), row("Meteora", "SPCXon/USDC", 7.25, 0)],
  },
];

export const HEALTH_MAP: Record<string, number> = {
  SPCX: 84,
  SPCXx: 76,
  TSPX: 58,
  SPACEX: 31,
  SPCXon: 12,
};

export function healthColor(n: number): string {
  return n >= 65 ? "#51C148" : n >= 40 ? "#C99A2E" : "var(--color-down)";
}

export const ECO_STATS = [
  { value: "5", label: "Variants live" },
  { value: "4", label: "Independent issuers" },
  { value: "$8.89M", label: "Combined liquidity" },
  { value: "$32.10M", label: "24H volume" },
  { value: "73", label: "Tracked markets" },
];

export const LIQ_SHARES = [
  { sym: "SPCX", issuer: "Backpack Securities", liq: "$7.03M", pct: "79.1%", w: 79.1, color: "#171717" },
  { sym: "SPCXx", issuer: "Backed (xStocks)", liq: "$1.21M", pct: "13.6%", w: 13.6, color: "#3D6B99" },
  { sym: "TSPX", issuer: "Tessera", liq: "$611K", pct: "6.9%", w: 6.9, color: "#6B4E9E" },
  { sym: "SPACEX", issuer: "PreStocks", liq: "$33.6K", pct: "0.4%", w: 0.4, color: "#A8552E" },
  { sym: "SPCXon", issuer: "Ondo", liq: "$133", pct: "<0.1%", w: 0.1, color: "#2E7D6B" },
];

export const VENUE_DEPTH = [
  { name: "Meteora", liq: "$4.62M", width: "100%" },
  { name: "Kamino", liq: "$1.51M", width: "33%" },
  { name: "Orca", liq: "$1.24M", width: "27%" },
  { name: "Raydium", liq: "$0.86M", width: "19%" },
  { name: "Byreal", liq: "$0.42M", width: "9%" },
];

export const AGGREGATORS = [
  { name: "Titan", initial: "TI", bg: "#333333", img: "https://www.tokens.xyz/logos/popular/titan.png", note: "Best route across 4 venues" },
  { name: "Jupiter", initial: "JU", bg: "#2E7D6B", img: "https://www.tokens.xyz/logos/popular/jupiter.png", note: "Routes all variants" },
  { name: "DFlow", initial: "DF", bg: "#3D6B99", img: "https://www.tokens.xyz/logos/popular/dflow.png", note: "Spot routing" },
];

export const HEALTH_VARIANTS = [
  { sym: "SPCX", score: 84, color: "#51C148" },
  { sym: "SPCXx", score: 76, color: "#51C148" },
  { sym: "TSPX", score: 58, color: "#C99A2E" },
  { sym: "SPACEX", score: 31, color: "var(--color-down)" },
  { sym: "SPCXon", score: 12, color: "var(--color-down)" },
];

export const SCORE_INPUTS = [
  { label: "Liquidity depth", grade: "Healthy", width: "78%", color: "#51C148" },
  { label: "Volume consistency", grade: "Healthy", width: "82%", color: "#51C148" },
  { label: "Venue diversity", grade: "Healthy", width: "70%", color: "#51C148" },
  { label: "Liquidity concentration", grade: "Weak", width: "34%", color: "var(--color-down)" },
];

export function buildSparkPath(): string {
  let s = 33;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  let y = 16;
  const pts: [number, number][] = [];
  for (let i = 0; i < 40; i++) {
    y += (rand() - 0.48) * 6;
    y = Math.max(4, Math.min(40, y));
    pts.push([(i / 39) * 200, y]);
  }
  return "M" + pts.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" L");
}
