export type TokenAvatarMeta = {
  bg: string;
  initials: string;
  src?: string;
};

const TOKEN_AVATARS: Record<string, TokenAvatarMeta> = {
  SPCX: { bg: "#171717", initials: "SP", src: "/avatars/spcx-mark.png" },
  SPCXx: { bg: "#3D6B99", initials: "Sx", src: "/avatars/spcxx-mark.png" },
  SPCXon: { bg: "#2E7D6B", initials: "ON", src: "/avatars/spcxon-mark.png" },
  TSPX: { bg: "#6B4E9E", initials: "TS", src: "/avatars/tspx-mark.png" },
  tSpaceX: { bg: "#6B4E9E", initials: "tS", src: "https://cdn.tesseralab.co/tessera/tokenicon_T-SpaceX.svg" },
  SPACEX: { bg: "#A8552E", initials: "PS", src: "/avatars/prestocks-mark.png" },
  USDC: { bg: "#2775CA", initials: "US", src: "https://www.tokens.xyz/logos/tokens/usdc.png" },
  USDT: {
    bg: "#26A17B",
    initials: "UT",
    src: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg",
  },
  SOL: {
    bg: "#9945FF",
    initials: "SO",
    src: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
  },
  mSOL: {
    bg: "#84CC16",
    initials: "mS",
    src: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png",
  },
  JitoSOL: { bg: "#22C55E", initials: "Ji", src: "https://storage.googleapis.com/token-metadata/JitoSOL-256.png" },
  bSOL: {
    bg: "#6366F1",
    initials: "bS",
    src: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1/logo.png",
  },
};

export function tokenAvatarMeta(symbol: string): TokenAvatarMeta {
  return TOKEN_AVATARS[symbol] ?? { bg: "#555555", initials: symbol.slice(0, 2).toUpperCase() };
}
