import { useEffect, useMemo, useRef, useState } from "react";
import Avatar from "@/components/Avatar";
import InfoTip from "@/components/InfoTip";
import SegmentedControl from "@/components/SegmentedControl";
import Tooltip from "@/components/Tooltip";
import { venueMeta } from "@/lib/venues";
import { ACCESS_STYLES_A, getVariantDefsA, type AccessKindA, type MarketRowA, type VariantDefA, type VariantDetailsA } from "@/lib/dataA";
import { parseCount, parseMoney } from "@/lib/format";

export type FilterKey = "spot" | "liquidity" | "futures";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "spot", label: "Spot" },
  { key: "liquidity", label: "Liquidity" },
  { key: "futures", label: "Futures" },
];

interface VariantsMarketsProps {
  filter: FilterKey;
  onFilter: (f: FilterKey) => void;
  expanded: Record<string, boolean>;
  onToggle: (sym: string) => void;
}

// Shared across the aggregate row and the expanded market table so the
// Liquidity / 24H Vol columns line up exactly between the two.
const gridCols = "1.3fr 0.9fr 0.8fr 1fr 1fr 1fr 1fr";

type SortKey = "price" | "liq" | "vol" | "trades" | "wallets";
type SortDir = "asc" | "desc";
type SortState = { key: SortKey; dir: SortDir };

const DEFAULT_SORT: SortState = { key: "vol", dir: "desc" };

const SORT_ACCESSORS: Record<SortKey, (row: MarketRowA) => number> = {
  price: (row) => parseMoney(row.price),
  liq: (row) => parseMoney(row.liq),
  vol: (row) => parseMoney(row.vol),
  trades: (row) => parseCount(row.trades),
  wallets: (row) => parseCount(row.wallets),
};

function sortMarketRows(rows: MarketRowA[], sort: SortState) {
  const accessor = SORT_ACCESSORS[sort.key];
  const mult = sort.dir === "desc" ? -1 : 1;
  return [...rows].sort((a, b) => mult * (accessor(a) - accessor(b)));
}

/** Inactive sort — muted up/down chevrons (Figma 113:1462) */
function SortIconInactive() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M5 1.5L7.25 3.75H2.75L5 1.5Z" fill="var(--color-ink-faint)" />
      <path d="M5 8.5L2.75 6.25H7.25L5 8.5Z" fill="var(--color-ink-faint)" />
    </svg>
  );
}

/** Active sort — single chevron in sort direction (Figma 113:1457) */
function SortIconActive({ dir }: { dir: SortDir }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
      style={{ transform: dir === "asc" ? "rotate(180deg)" : undefined }}
    >
      <path d="M5 2.25L8 6.25H2L5 2.25Z" fill="var(--color-ink)" />
    </svg>
  );
}

function SortHeader({
  label,
  sortKey,
  sort,
  onSort,
}: {
  label: string;
  sortKey: SortKey;
  sort: SortState;
  onSort: (key: SortKey) => void;
}) {
  const active = sort.key === sortKey;

  return (
    <button
      type="button"
      className="hv-market-sort"
      onClick={() => onSort(sortKey)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 4,
        width: "100%",
        padding: 0,
        border: "none",
        background: "transparent",
        fontSize: 11,
        fontWeight: active ? 600 : 400,
        color: active ? "var(--color-ink)" : "var(--color-ink-subtle)",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      {label}
      {active ? <SortIconActive dir={sort.dir} /> : <SortIconInactive />}
    </button>
  );
}

function StaticHeader({ label }: { label: string }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 400, color: "var(--color-ink-subtle)" }}>
      {label}
    </span>
  );
}

function VariantMarketTable({
  rows,
  sort,
  onSort,
  onCollapse,
}: {
  rows: MarketRowA[];
  sort: SortState;
  onSort: (key: SortKey) => void;
  onCollapse: () => void;
}) {
  const sortedRows = useMemo(() => sortMarketRows(rows, sort), [rows, sort]);

  return (
    <div className="reveal" style={{ padding: "0 24px 16px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridCols,
          columnGap: 12,
          padding: "10px 0",
        }}
      >
        <StaticHeader label="Venue" />
        <StaticHeader label="Pair" />
        <SortHeader label="Price" sortKey="price" sort={sort} onSort={onSort} />
        <SortHeader label="Liquidity" sortKey="liq" sort={sort} onSort={onSort} />
        <SortHeader label="24H Vol" sortKey="vol" sort={sort} onSort={onSort} />
        <SortHeader label="24H Trades" sortKey="trades" sort={sort} onSort={onSort} />
        <SortHeader label="24H Wallets" sortKey="wallets" sort={sort} onSort={onSort} />
      </div>
      <div style={{ borderTop: "1px solid var(--color-line-faint)" }}>
        {sortedRows.map((m, i) => {
          const meta = venueMeta(m.venue);
          return (
            <a
              key={`${m.venue}-${m.pair}-${i}`}
              href={m.href}
              className="hv-market-row"
              style={{
                display: "grid",
                gridTemplateColumns: gridCols,
                columnGap: 12,
                alignItems: "center",
                padding: "12px 0",
                borderBottom: i === sortedRows.length - 1 ? "none" : "1px solid var(--color-line-faint)",
                color: "var(--color-ink)",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                <Avatar size={24} bg={meta.venueBg} initials={meta.venueInitial} fontSize={10} src={meta.logoSrc} alt={meta.venue} />
                <span style={{ fontSize: 12 }}>{meta.venue}</span>
              </div>
              <div style={{ fontSize: 12, fontWeight: 500, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {m.pair}
              </div>
              <div className="num" style={{ textAlign: "right", fontSize: 12, fontWeight: 600 }}>
                {m.price}
              </div>
              <div className="num" style={{ textAlign: "right", fontSize: 12, fontWeight: 600 }}>
                {m.liq}
              </div>
              <div className="num" style={{ textAlign: "right", fontSize: 12, color: "var(--color-ink-muted)" }}>
                {m.vol}
              </div>
              <div className="num" style={{ textAlign: "right", fontSize: 12, color: "var(--color-ink-muted)" }}>
                {m.trades}
              </div>
              <div className="num" style={{ textAlign: "right", fontSize: 12, color: "var(--color-ink-muted)" }}>
                {m.wallets}
              </div>
            </a>
          );
        })}
      </div>
      <button
        onClick={onCollapse}
        style={{
          width: "100%",
          height: 38,
          marginTop: 16,
          padding: "1px 6px",
          border: "none",
          background: "transparent",
          borderRadius: 9999,
          fontSize: 13,
          fontWeight: 600,
          color: "var(--color-ink-muted)",
          cursor: "pointer",
        }}
      >
        Show fewer markets
      </button>
    </div>
  );
}

function VerificationIcon({
  label,
  status,
}: {
  label: string;
  status: VariantDetailsA["verification"][number]["status"];
}) {
  const color = status === "verified" ? "var(--color-up)" : status === "risk" ? "#C99A2E" : "var(--color-ink-faint)";
  const initial = label === "CoinGecko" ? "C" : label === "Jupiter" ? "J" : label === "RugCheck" ? "R" : label.charAt(0);

  return (
    <span
      aria-hidden="true"
      style={{
        width: 24,
        height: 24,
        borderRadius: "50%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: color,
        color: "#fff",
        flexShrink: 0,
        fontSize: 11,
        fontWeight: 700,
        lineHeight: 1,
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.45)",
      }}
    >
      {status === "risk" ? (
        <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
          <path d="M6 1.2L10.8 10H1.2L6 1.2Z" fill="currentColor" opacity="0.95" />
          <path d="M6 4.3V6.7" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
          <path d="M6 8.4H6.01" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ) : initial === "J" ? (
        <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
          <path d="M9.8 3.3L5 8.1L2.6 5.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        initial
      )}
    </span>
  );
}

function DetailLinks({ links }: { links: VariantDetailsA["links"] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {links.map((link, index) => (
        <a
          key={link.label}
          href={link.href}
          title={link.title}
          className={index === 0 ? "hv-trade-btn" : "hv-f2f3f5"}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            height: 32,
            padding: "0 12px",
            borderRadius: 9999,
            border: index === 0 ? "1px solid var(--color-ink)" : "1px solid var(--color-line-strong)",
            background: index === 0 ? "var(--color-ink)" : "var(--color-surface-raised)",
            color: index === 0 ? "var(--color-surface-raised)" : "var(--color-ink-muted)",
            fontSize: 12,
            fontWeight: 500,
            fontFamily: link.label === "Mint" ? "monospace" : undefined,
            whiteSpace: "nowrap",
          }}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

function TokenDetailsCard({ v }: { v: VariantDefA }) {
  return (
    <div
      style={{
        background: "var(--color-surface-raised)",
        border: "1px solid var(--color-line)",
        borderRadius: 20,
        padding: 24,
        minWidth: 0,
        boxShadow: "0px 1px 1px rgba(23, 23, 23, 0.03)",
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-ink-subtle)", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 16 }}>
        Token variant detail
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid var(--color-line)",
          borderRadius: 14,
          overflow: "hidden",
          background: "var(--color-surface-raised)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(112px, 0.9fr) minmax(0, 1.35fr)",
            gap: 14,
            padding: "10px 12px",
            borderBottom: "1px solid var(--color-line-faint)",
            fontSize: 12,
            lineHeight: "18px",
          }}
        >
          <span style={{ color: "var(--color-ink-subtle)" }}>About</span>
          <span style={{ color: "var(--color-ink-muted)", fontWeight: 400 }}>{v.details.description}</span>
        </div>
        {v.details.facts.map((fact) => (
          <div
            key={fact.k}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(112px, 0.9fr) minmax(0, 1.35fr)",
              gap: 14,
              padding: "10px 12px",
              borderBottom: "1px solid var(--color-line-faint)",
              fontSize: 12,
              lineHeight: "18px",
            }}
          >
            <span style={{ color: "var(--color-ink-subtle)", display: "inline-flex", alignItems: "center", gap: 4 }}>
              {fact.k}
              {fact.tip && <InfoTip tip={fact.tip} />}
            </span>
            <span style={{ color: "var(--color-ink)", fontWeight: 500, textAlign: "right" }}>{fact.v}</span>
          </div>
        ))}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(112px, 0.9fr) minmax(0, 1.35fr)",
            gap: 14,
            padding: "10px 12px",
            fontSize: 12,
            lineHeight: "18px",
          }}
        >
          <span style={{ color: "var(--color-ink-subtle)" }}>Verification</span>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 6, flexWrap: "wrap" }}>
            {v.details.verification.map((item) => (
              <Tooltip key={item.label} content={item.note}>
                <span
                  title={`${item.label}: ${item.note}`}
                  aria-label={`${item.label}: ${item.note}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                  }}
                >
                  <VerificationIcon label={item.label} status={item.status} />
                </span>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HealthMetricRow({ metric }: { metric: VariantDetailsA["health"]["metrics"][number] }) {
  const color = metric.grade === "Healthy" ? "var(--color-up)" : metric.grade === "Watch" ? "#C99A2E" : "var(--color-down)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14, fontSize: 13, lineHeight: "18px" }}>
        <span style={{ color: "var(--color-ink-subtle)", minWidth: 0 }}>
          <span style={{ display: "block", color: "var(--color-ink-muted)" }}>{metric.label}</span>
          <span className="num" style={{ display: "block", marginTop: 1, fontSize: 12, color: "var(--color-ink-faint)" }}>
            {metric.value}
          </span>
        </span>
        <span style={{ color, fontWeight: 500, whiteSpace: "nowrap" }}>{metric.grade}</span>
      </div>
      <div style={{ height: 4, borderRadius: 9999, background: "#E8EAEB", overflow: "hidden" }}>
        <span style={{ display: "block", width: metric.width, height: "100%", borderRadius: 9999, background: color }} />
      </div>
    </div>
  );
}

function TokenHealthCard({ details }: { details: VariantDetailsA }) {
  const score = Math.max(0, Math.min(100, details.health.score));
  const scoreColor = score >= 65 ? "var(--color-up)" : score >= 40 ? "#C99A2E" : "var(--color-down)";
  const radius = 66;
  const circumference = 2 * Math.PI * radius;
  const arc = circumference * 0.78;
  const gap = circumference - arc;
  const offset = arc * (1 - score / 100);

  return (
    <div
      style={{
        background: "#FAFAFA",
        border: "1px solid var(--color-line-faint)",
        borderRadius: 20,
        padding: 24,
        minWidth: 0,
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-ink-subtle)", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 16 }}>
        Market health
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "220px minmax(0, 1fr)", gap: 24, alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ position: "relative", width: 176, height: 156 }}>
            <svg width="176" height="156" viewBox="0 0 176 156" aria-hidden="true">
              <circle
                cx="88"
                cy="82"
                r={radius}
                fill="none"
                stroke="#E8EAEB"
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={`${arc} ${gap}`}
                transform="rotate(142 88 82)"
              />
              <circle
                cx="88"
                cy="82"
                r={radius}
                fill="none"
                stroke={scoreColor}
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={`${arc} ${gap}`}
                strokeDashoffset={offset}
                transform="rotate(142 88 82)"
              />
            </svg>
            <div
              style={{
                position: "absolute",
                inset: "46px 0 auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                lineHeight: 1,
              }}
            >
              <span className="num" style={{ fontSize: 48, fontWeight: 300, color: "var(--color-ink)" }}>
                {score}
              </span>
              <span style={{ marginTop: 7, fontSize: 13, color: "#64748B" }}>of 100</span>
            </div>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--color-ink)", fontSize: 14 }}>
            <span
              aria-hidden="true"
              style={{
                width: 20,
                height: 20,
                borderRadius: 7,
                background: scoreColor,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                <path d="M9.8 3.3L5 8.1L2.6 5.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {details.health.status}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, minWidth: 0 }}>
          {details.health.metrics.map((metric) => (
            <HealthMetricRow key={metric.label} metric={metric} />
          ))}
        </div>
      </div>
    </div>
  );
}

function VariantDetailsBand({ v }: { v: VariantDefA }) {
  return (
    <div className="hv-token-detail-grid" style={{ padding: "0 24px 18px", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 18 }}>
      <TokenDetailsCard v={v} />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 0 }}>
        <TokenHealthCard details={v.details} />
        <DetailLinks links={v.details.links} />
      </div>
    </div>
  );
}

// Bespoke full-bleed marks per variant, sourced from the latest brand assets.
// Falls back to the generic Avatar (bg + CDN logo + initials) for variants
// without a dedicated mark.
const VARIANT_MARKS: Record<string, string> = {
  SPCX: "/avatars/spcx-mark.png",
  SPCXx: "/avatars/spcxx-mark.png",
  SPCXon: "/avatars/spcxon-mark.png",
  TSPX: "/avatars/tspx-mark.png",
  SPACEX: "/avatars/prestocks-mark.png",
};

function VariantAvatar({ v }: { v: VariantDefA }) {
  const mark = VARIANT_MARKS[v.sym];
  if (mark) {
    return (
      <span
        style={{
          position: "relative",
          width: 36,
          height: 36,
          borderRadius: 10,
          overflow: "hidden",
          // Marks are squircle app-icons with transparent corners; a dark fill
          // here would show as a ring around the light-background logos.
          background: "transparent",
          border: "0.5px solid var(--color-line)",
          flexShrink: 0,
        }}
      >
        <img src={mark} alt={v.sym} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      </span>
    );
  }
  return <Avatar size={36} bg={v.avatarBg} initials={v.avatar} fontSize={12} src={v.img} alt={v.sym} style={{ borderRadius: 10 }} />;
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function useAnimatedCount(target: number, duration = 320) {
  const [display, setDisplay] = useState(target);
  const displayRef = useRef(target);

  useEffect(() => {
    const from = displayRef.current;
    const to = target;
    if (from === to) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      displayRef.current = to;
      const frame = requestAnimationFrame(() => setDisplay(to));
      return () => cancelAnimationFrame(frame);
    }

    const animDuration = to < from ? 480 : duration;
    let raf = 0;
    const start = performance.now();

    const step = (now: number) => {
      const t = easeOutCubic(Math.min(1, (now - start) / animDuration));
      const next = Math.round(from + (to - from) * t);
      setDisplay(next);
      displayRef.current = next;
      if (t < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return display;
}

function MarketsCountBadge({ count, isExpanded }: { count: number; isExpanded: boolean }) {
  const display = useAnimatedCount(count);

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        height: 28,
        padding: "0 10px",
        background: "var(--color-surface-soft)",
        borderRadius: 9999,
        color: "var(--color-ink)",
        fontSize: 12,
        fontWeight: 400,
        textTransform: "none",
        whiteSpace: "nowrap",
      }}
    >
      <span className="num">{display}</span> {display === 1 ? "Market" : "Markets"}
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.18s ease" }}
      >
        <path d="M6 9l6 6 6-6"></path>
      </svg>
    </span>
  );
}

export default function VariantsMarkets({ filter, onFilter, expanded, onToggle }: VariantsMarketsProps) {
  const isFutures = filter === "futures";
  const defs = getVariantDefsA();
  const [sortByVariant, setSortByVariant] = useState<Record<string, SortState>>({});

  const toggleSort = (sym: string, key: SortKey) => {
    setSortByVariant((prev) => {
      const current = prev[sym] ?? DEFAULT_SORT;
      if (current.key === key) {
        return { ...prev, [sym]: { key, dir: current.dir === "desc" ? "asc" : "desc" } };
      }
      return { ...prev, [sym]: { key, dir: "desc" } };
    });
  };

  return (
    <section id="variants-section" data-screen-label="Variants and Markets" style={{ marginTop: 68 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 500, color: "var(--color-ink)" }}>Variants &amp; Markets</h2>
        <div style={{ marginLeft: "auto" }}>
          <SegmentedControl
            ariaLabel="Market filter"
            value={filter}
            onChange={onFilter}
            items={FILTERS.map(({ key, label }) => ({ value: key, label }))}
            getSegmentStyle={(selected) => ({
              fontSize: 13,
              padding: "7px 16px",
              fontWeight: selected ? 600 : 400,
            })}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: 28,
          // tokens.xyz markets shell: border-light at 30% opacity
          background: "rgba(31, 31, 33, 0.036)",
          border: "none",
          borderRadius: 28,
          padding: 16,
          boxShadow: "0px 1px 1px rgba(23, 23, 23, 0.04)",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {isFutures ? (
          <div style={{ background: "var(--color-surface-raised)", border: "1px solid var(--color-line-strong)", borderRadius: 20, padding: "48px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "var(--color-ink)" }}>No futures markets tracked</div>
            <div style={{ fontSize: 14, color: "var(--color-ink-muted)", marginTop: 6, lineHeight: 1.5 }}>
              No SpaceX variant currently has a tracked futures or perpetuals market on Solana.
              <br />
              Spot and liquidity-pool markets are available under the other filters.
            </div>
          </div>
        ) : (
          defs.map((v) => {
            const isExpanded = !!expanded[v.sym];
            const rows = filter === "liquidity" ? v.pools : v.spot;
            const access = ACCESS_STYLES_A[v.accessKind as AccessKindA];
            const sort = sortByVariant[v.sym] ?? DEFAULT_SORT;

            return (
              <div
                key={v.sym}
                className="hv-variant-card"
                style={{ background: "var(--color-surface-raised)", border: "1px solid var(--color-line)", borderRadius: 22, overflow: "hidden" }}
              >
                <div
                  onClick={() => onToggle(v.sym)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: gridCols,
                    columnGap: 12,
                    rowGap: 12,
                    alignItems: "center",
                    padding: 24,
                    cursor: "pointer",
                  }}
                >
                  <div style={{ gridColumn: "1 / 3", display: "flex", alignItems: "flex-start", gap: 12, minWidth: 0 }}>
                    <VariantAvatar v={v} />
                    <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, color: "var(--color-ink)", whiteSpace: "nowrap" }}>{v.title}</div>
                      <div style={{ fontSize: 12, fontWeight: 400, color: "var(--color-ink-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {v.sym} • {v.type}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, textAlign: "right" }}>
                    <div className="num" style={{ fontSize: 14, fontWeight: 600, color: "var(--color-ink)" }}>
                      {v.price}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 400, color: "var(--color-ink-muted)" }}>Price</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, textAlign: "right" }}>
                    <div className="num" style={{ fontSize: 14, fontWeight: 600, color: "var(--color-ink)" }}>
                      {v.liq}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 400, color: "var(--color-ink-muted)" }}>Liquidity</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, textAlign: "right" }}>
                    <div className="num" style={{ fontSize: 14, fontWeight: 600, color: "var(--color-ink)" }}>
                      {v.vol}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 400, color: "var(--color-ink-muted)" }}>24H Vol</div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Tooltip content={v.accessHint}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          height: 27,
                          padding: "0 10px",
                          background: access.bg,
                          color: access.color,
                          fontSize: 12,
                          fontWeight: 400,
                          textTransform: "none",
                          borderRadius: 9999,
                          cursor: "default",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {v.access}
                      </span>
                    </Tooltip>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <MarketsCountBadge count={rows.length} isExpanded={isExpanded} />
                  </div>
                </div>

                {isExpanded && (
                  <>
                    <VariantDetailsBand v={v} />
                    <VariantMarketTable
                      rows={rows}
                      sort={sort}
                      onSort={(key) => toggleSort(v.sym, key)}
                      onCollapse={() => onToggle(v.sym)}
                    />
                  </>
                )}
              </div>
            );
          })
        )}
        <div style={{ padding: "8px 16px", fontSize: 12, fontWeight: 400, color: "var(--color-ink-subtle)", lineHeight: "18px" }}>
          Access labels reflect issuer-stated requirements where published. Verify with the issuer before trading.
          <br />
          SpaceX-related tokenized variants may have different issuer, access, and regulatory characteristics.
        </div>
      </div>
      <div style={{ height: 36 }} />
    </section>
  );
}
