// Provider logos — Jupiter from tokens.xyz CDN; others from issuer sites.
export const VERIFICATION_LOGOS: Record<string, string> = {
  CoinGecko: "https://www.coingecko.com/favicon.ico",
  Jupiter: "https://www.tokens.xyz/logos/popular/jupiter.png",
  RugCheck: "https://rugcheck.xyz/logo.png",
};

export function verificationLogo(label: string): string | undefined {
  return VERIFICATION_LOGOS[label];
}
