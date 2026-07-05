import { variantMint } from "./variantLinks";
import { venueUrl } from "./venues";

const QUOTE_MINTS: Record<string, string> = {
  USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  USDT: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
  SOL: "So11111111111111111111111111111111111111112",
  JitoSOL: "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn",
  mSOL: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
  bSOL: "bSo13r4TkiE4KumL71LsHTPpL2euBYLx5CaGktNm69EX",
};

type TradeUrlBuilder = (inputMint: string, outputMint: string) => string;

const VENUE_TRADE_URL: Record<string, TradeUrlBuilder> = {
  Orca: (input, output) => `https://www.orca.so/?tokenIn=${input}&tokenOut=${output}`,
  Raydium: (input, output) => `https://raydium.io/swap/?inputMint=${input}&outputMint=${output}`,
  Meteora: (input, output) => `https://app.meteora.ag/?inputMint=${input}&outputMint=${output}`,
  Kamino: (input, output) => `https://kamino.com/swap?inputMint=${input}&outputMint=${output}`,
  Sunrise: (input, output) => `https://sunrise.xyz/?inputMint=${input}&outputMint=${output}`,
  Byreal: (input, output) => `https://www.byreal.io/swap?inputMint=${input}&outputMint=${output}`,
};

function mintForSymbol(symbol: string): string | undefined {
  return variantMint(symbol) ?? QUOTE_MINTS[symbol];
}

function parsePair(pair: string): { base: string; quote: string } | null {
  const cleaned = pair.replace(/\s+(pool|vault)$/i, "");
  const slash = cleaned.indexOf("/");
  if (slash === -1) return null;
  return { base: cleaned.slice(0, slash), quote: cleaned.slice(slash + 1) };
}

function jupiterTradeUrl(inputMint: string, outputMint: string, dexes?: string): string {
  const params = new URLSearchParams({ inputMint, outputMint });
  if (dexes) params.set("dexes", dexes);
  return `https://jup.ag/swap?${params.toString()}`;
}

export function marketTradeUrl(venue: string, pair: string): string {
  const parsed = parsePair(pair);
  if (!parsed) return venueUrl(venue);

  const baseMint = mintForSymbol(parsed.base);
  const quoteMint = mintForSymbol(parsed.quote);
  if (!baseMint || !quoteMint) return venueUrl(venue);

  const build = VENUE_TRADE_URL[venue];
  if (build) return build(quoteMint, baseMint);

  return jupiterTradeUrl(quoteMint, baseMint);
}

export function marketTradeTitle(venue: string, pair: string): string {
  const parsed = parsePair(pair);
  if (!parsed) return `Open ${venue}`;
  return `Buy ${parsed.base} on ${venue} · ${parsed.quote} → ${parsed.base}`;
}
