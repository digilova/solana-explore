export function fmt(n: number): string {
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M";
  if (n >= 1e3) return "$" + (n / 1e3).toFixed(2) + "K";
  return "$" + n.toFixed(2);
}

export function fmtCount(n: number): string {
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return String(Math.round(n));
}

function parseSuffixedNumber(value: string): number {
  const cleaned = value.replace(/[$,]/g, "").trim();
  const match = cleaned.match(/^([\d.]+)\s*([KMB])?$/i);
  if (!match) return 0;
  const num = parseFloat(match[1]);
  if (Number.isNaN(num)) return 0;
  const suffix = match[2]?.toUpperCase();
  if (suffix === "K") return num * 1e3;
  if (suffix === "M") return num * 1e6;
  if (suffix === "B") return num * 1e9;
  return num;
}

export function parseMoney(value: string): number {
  return parseSuffixedNumber(value);
}

export function parseCount(value: string): number {
  return parseSuffixedNumber(value);
}

export function seeded(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
