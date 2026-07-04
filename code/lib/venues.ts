export interface VenueMeta {
  venue: string;
  venueInitial: string;
  venueBg: string;
  logoSrc: string;
}

const VENUE_COLORS: Record<string, string> = {
  Meteora: "#B4451F",
  Orca: "#C99A2E",
  Raydium: "#3D6B99",
  Byreal: "#6B4E9E",
  Kamino: "#2E7D6B",
  Sunrise: "#A8552E",
  OMFG: "#555555",
  Titan: "#333333",
};

const VENUE_LOGOS: Record<string, string> = {
  Meteora: "https://www.meteora.ag/icons/v2.svg",
  Orca: "https://www.orca.so/favicon.ico",
  Raydium: "https://raydium.io/favicon.ico",
  Byreal: "https://www.byreal.io/favicon.ico",
  Kamino: "https://www.tokens.xyz/logos/popular/kamino.png",
  Sunrise: "https://www.tokens.xyz/logos/popular/sunrise.svg",
  OMFG: "https://www.tokens.xyz/logos/popular/omfg.svg",
  Titan: "https://www.tokens.xyz/logos/popular/titan.png",
};

export function venueMeta(name: string): VenueMeta {
  return {
    venue: name,
    venueInitial: name.slice(0, 2).toUpperCase(),
    venueBg: VENUE_COLORS[name] || "#555555",
    logoSrc: VENUE_LOGOS[name] || "",
  };
}
