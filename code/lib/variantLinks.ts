// Real on-chain mint addresses and issuer sites for each SpaceX variant,
// sourced from tokens.xyz/spacex (mints verified against Tokens/CoinGecko/Jupiter).
const VARIANT_LINK_INFO: Record<string, { mint: string; issuerUrl: string; issuerName: string }> = {
  SPCX: { mint: "SPCXxcqXj6e5dJDVNovHN8744zkbhM2bYudU45BimGb", issuerUrl: "https://backpack.exchange", issuerName: "Backpack Securities" },
  SPCXx: { mint: "Xs3oZwbHvqis4NYcf4YKWmEia2eC84wSiVrcYcTqpH8", issuerUrl: "https://xstocks.com", issuerName: "Backed (xStocks)" },
  TSPX: { mint: "TSPXcLV76s6V2zDiZQ18kBfcbnjaE2ZzNT3ga2Pd99v", issuerUrl: "https://tesseras.xyz", issuerName: "Tessera" },
  SPACEX: { mint: "PreANxuXjsy2pvisWWMNB6YaJNzr7681wJJr2rHsfTh", issuerUrl: "https://prestocks.com", issuerName: "PreStocks" },
  SPCXon: { mint: "wzAyQTorWyoVXuJKj2x8EqKEGJpS13z6EWE9z5Aondo", issuerUrl: "https://ondo.finance", issuerName: "Ondo" },
};

export type VariantLink = { label: string; href: string; title: string };

export function variantMint(sym: string): string | undefined {
  const normalized = sym === "tSpaceX" ? "TSPX" : sym;
  return VARIANT_LINK_INFO[normalized]?.mint;
}

export function jupiterSwapUrl(mint: string): string {
  return `https://jup.ag/swap/USDC-${mint}`;
}

export function variantLinks(sym: string): VariantLink[] {
  const info = VARIANT_LINK_INFO[sym];
  if (!info) return [];
  const { mint, issuerUrl, issuerName } = info;
  return [
    { label: "Explorer", href: `https://tokens.solana.com/token/${mint}`, title: `View ${sym} on Tokens` },
    { label: "Orb", href: `https://orb.helius.dev/account/${mint}`, title: `View ${sym} on Orb explorer` },
    { label: "Issuer docs", href: issuerUrl, title: `Open ${issuerName}` },
    { label: "Mint", href: `https://explorer.solana.com/address/${mint}`, title: mint },
  ];
}

export function variantExternalLinks(sym: string) {
  const info = VARIANT_LINK_INFO[sym];
  if (!info) return null;
  const { mint, issuerUrl, issuerName } = info;
  return {
    jupiter: {
      href: jupiterSwapUrl(mint),
      title: `Opens Jupiter with ${sym} preselected — the aggregator routes the best price across venues`,
    },
    issuer: { href: issuerUrl, title: `Open ${issuerName}` },
    mint: { href: `https://explorer.solana.com/address/${mint}`, title: mint },
  };
}
