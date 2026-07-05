import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Avatar from "@/components/Avatar";
import InfoTip from "@/components/InfoTip";
import SegmentedControl from "@/components/SegmentedControl";
import Tooltip from "@/components/Tooltip";
import { venueMeta } from "@/lib/venues";
import { verificationLogo } from "@/lib/verificationProviders";
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

function sortCellStyle(key: SortKey, sort: SortState): CSSProperties {
  const active = sort.key === key;
  return {
    textAlign: "right",
    fontSize: 12,
    fontWeight: active ? 600 : 400,
    color: active ? "var(--color-ink)" : "var(--color-ink-muted)",
  };
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
  className,
}: {
  label: string;
  sortKey: SortKey;
  sort: SortState;
  onSort: (key: SortKey) => void;
  className?: string;
}) {
  const active = sort.key === sortKey;

  return (
    <button
      type="button"
      className={className ? `hv-market-sort ${className}` : "hv-market-sort"}
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
    <div className="reveal hv-mkt-wrap" style={{ padding: "0 24px 16px" }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: "#2D2D2D", marginBottom: 16 }}>Markets</div>
      <div
        className="hv-mkt-grid"
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
        <SortHeader label="Liquidity" sortKey="liq" sort={sort} onSort={onSort} className="hv-col-liq" />
        <SortHeader label="24H Vol" sortKey="vol" sort={sort} onSort={onSort} />
        <SortHeader label="24H Trades" sortKey="trades" sort={sort} onSort={onSort} className="hv-col-trades" />
        <SortHeader label="24H Wallets" sortKey="wallets" sort={sort} onSort={onSort} className="hv-col-wallets" />
      </div>
      <div style={{ borderTop: "1px solid var(--color-line-faint)" }}>
        {sortedRows.map((m, i) => {
          const meta = venueMeta(m.venue);
          return (
            <a
              key={`${m.venue}-${m.pair}-${i}`}
              href={m.href}
              className="hv-market-row hv-mkt-grid"
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
              <div className="num" style={sortCellStyle("price", sort)}>
                {m.price}
              </div>
              <div className="num hv-col-liq" style={sortCellStyle("liq", sort)}>
                {m.liq}
              </div>
              <div className="num" style={sortCellStyle("vol", sort)}>
                {m.vol}
              </div>
              <div className="num hv-col-trades" style={sortCellStyle("trades", sort)}>
                {m.trades}
              </div>
              <div className="num hv-col-wallets" style={sortCellStyle("wallets", sort)}>
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
  const [broken, setBroken] = useState(false);
  const logoSrc = verificationLogo(label);
  const initials = (label === "CoinGecko" ? "CG" : label === "Jupiter" ? "JU" : label === "RugCheck" ? "RC" : label.slice(0, 2)).toUpperCase();
  const statusRing =
    status === "verified"
      ? "0 0 0 1.5px var(--color-up)"
      : status === "risk"
        ? "0 0 0 1.5px #C99A2E"
        : undefined;

  const shell: CSSProperties = {
    width: 26,
    height: 26,
    borderRadius: "50%",
    background: "var(--color-hover-soft)",
    flexShrink: 0,
    overflow: "hidden",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: statusRing,
    fontSize: 10,
    fontWeight: 600,
    color: "var(--color-ink-muted)",
    lineHeight: 1,
  };

  if (!logoSrc || broken) {
    return (
      <span aria-hidden="true" style={shell}>
        {initials}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      aria-hidden="true"
      src={logoSrc}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => setBroken(true)}
      style={{
        ...shell,
        objectFit: "cover",
      }}
    />
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
          target="_blank"
          rel="noopener noreferrer"
          className={index === 0 ? "hv-trade-btn" : "hv-f2f3f5"}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            height: 32,
            padding: "0 12px",
            borderRadius: 9999,
            border: index === 0 ? "1px solid var(--color-ink)" : "1px solid var(--color-line-strong)",
            background: index === 0 ? "var(--color-ink)" : "var(--color-surface-raised)",
            color: index === 0 ? "var(--color-surface-raised)" : "var(--color-ink-muted)",
            fontSize: 12,
            fontWeight: 400,
            lineHeight: "18px",
            whiteSpace: "nowrap",
          }}
        >
          {link.label}
          <span aria-hidden="true" style={{ fontSize: "inherit", fontWeight: "inherit", lineHeight: 1 }}>
            ↗
          </span>
        </a>
      ))}
    </div>
  );
}

function TokenDetailsCard({ v }: { v: VariantDefA }) {
  return (
    <div
      className="hv-detail-card"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#FAFAFA",
        border: "1px solid var(--color-line-faint)",
        borderRadius: 20,
        padding: 24,
        minWidth: 0,
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 600, color: "#2D2D2D", marginBottom: 16 }}>
        Details
      </div>

      <p
        style={{
          margin: "0 0 16px",
          width: "100%",
          color: "var(--color-ink)",
          fontWeight: 400,
          fontSize: 12,
          lineHeight: "18px",
        }}
      >
        {v.details.description}
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {v.details.facts.map((fact, index) => (
          <div
            key={fact.k}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(112px, 0.9fr) minmax(0, 1.35fr)",
              gap: 14,
              padding: "10px 0",
              borderTop: index === 0 ? "1px solid var(--color-line-faint)" : undefined,
              borderBottom: "1px solid var(--color-line-faint)",
              fontSize: 12,
              lineHeight: "18px",
            }}
          >
            <span style={{ color: "var(--color-ink-subtle)", display: "inline-flex", alignItems: "baseline", gap: 4 }}>
              {fact.k}
              {fact.tip && <InfoTip tip={fact.tip} />}
            </span>
            <span style={{ color: "var(--color-ink)", fontWeight: 400, textAlign: "right" }}>{fact.v}</span>
          </div>
        ))}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(112px, 0.9fr) minmax(0, 1.35fr)",
            gap: 14,
            padding: "10px 0",
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
                  style={{ display: "inline-flex", cursor: "default" }}
                >
                  <VerificationIcon label={item.label} status={item.status} />
                </span>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "auto", paddingTop: 16 }}>
        <DetailLinks links={v.details.links} />
      </div>
    </div>
  );
}

// Figma health palette (node 113:2054): green / amber / red
const HEALTH_GRADE_COLORS: Record<string, string> = {
  Healthy: "#009C62",
  Watch: "#C99A2E",
  Weak: "var(--color-down)",
};

function HealthMetricRow({ metric }: { metric: VariantDetailsA["health"]["metrics"][number] }) {
  const color = HEALTH_GRADE_COLORS[metric.grade] ?? "#009C62";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, fontSize: 12, fontWeight: 400, lineHeight: "18px" }}>
        <span
          title={`${metric.label}: ${metric.value}`}
          style={{ color: "var(--color-ink-muted)", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
        >
          {metric.label} ({metric.value})
        </span>
        <span style={{ color, whiteSpace: "nowrap" }}>{metric.grade}</span>
      </div>
      <div style={{ height: 4, borderRadius: 2, background: "#E8EAEB", overflow: "hidden" }}>
        <span style={{ display: "block", width: metric.width, height: "100%", borderRadius: 2, background: color }} />
      </div>
    </div>
  );
}

// Shield-with-check for established markets; warning triangle for lower tiers.
const HEALTH_WARNING_STATUSES = new Set(["Developing", "Speculative", "Thin market"]);

function HealthWarningIcon({ color }: { color: string }) {
  return (
    <svg width={20} height={18} viewBox="0 0 20.8301 18.6621" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path
        d="M12.5098 1.33789L20.0879 14.541C20.332 14.9707 20.4688 15.4492 20.4688 15.9082C20.4688 17.4023 19.4629 18.5547 17.8027 18.5547L2.66602 18.5547C1.00586 18.5547 0 17.4023 0 15.9082C0 15.4492 0.117188 14.9805 0.380859 14.541L7.95898 1.33789C8.45703 0.449219 9.33594 0 10.2344 0C11.1328 0 12.002 0.449219 12.5098 1.33789ZM9.15039 14.2578C9.15039 14.834 9.6582 15.3027 10.2441 15.3027C10.8203 15.3027 11.3281 14.8438 11.3281 14.2578C11.3281 13.6621 10.8301 13.2031 10.2441 13.2031C9.64844 13.2031 9.15039 13.6719 9.15039 14.2578ZM9.31641 5.9082L9.44336 11.2207C9.45312 11.7383 9.73633 12.0312 10.2441 12.0312C10.7227 12.0312 11.0059 11.748 11.0156 11.2207L11.1621 5.91797C11.1719 5.40039 10.7617 5.01953 10.2344 5.01953C9.6875 5.01953 9.30664 5.39062 9.31641 5.9082Z"
        fill={color}
        fillOpacity={0.85}
      />
    </svg>
  );
}

function HealthShieldIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path
        d="M9.38968 0.401189C10.4054 0.757801 13.6804 1.97028 14.7049 2.39821C15.4405 2.71025 15.8258 3.00446 15.8258 3.92274V10.6449C15.8258 13.8455 14.2233 15.1739 9.24081 17.8306C9.0219 17.9465 8.80298 18 8.66288 18C8.52277 18 8.31262 17.9554 8.08494 17.8306C3.19002 15.0223 1.5 13.8455 1.5 10.6449V3.92274C1.5 3.00446 1.89405 2.70133 2.62084 2.39821C3.64536 1.9792 6.92032 0.73997 7.94484 0.401189C8.17251 0.329866 8.41769 0.276374 8.66288 0.276374C8.90806 0.276374 9.15325 0.32095 9.38968 0.401189ZM11.3862 5.26894L7.64712 11.3848L5.86953 9.04903C5.65062 8.75482 5.45797 8.66568 5.21278 8.66568C4.80999 8.66568 4.50351 8.99554 4.50351 9.40561C4.50351 9.6018 4.58231 9.80684 4.71366 9.98514L6.91157 12.731C7.13923 13.0431 7.38442 13.159 7.68214 13.159C7.97986 13.159 8.23381 13.0163 8.41769 12.731L12.5333 6.12481C12.6471 5.94651 12.7522 5.74145 12.7522 5.5364C12.7522 5.12629 12.3931 4.85884 12.0166 4.85884C11.7802 4.85884 11.5525 4.99257 11.3862 5.26894Z"
        fill={color}
      />
    </svg>
  );
}

function HealthStatusIcon({ status, color }: { status: string; color: string }) {
  if (HEALTH_WARNING_STATUSES.has(status)) {
    return <HealthWarningIcon color={color} />;
  }
  return <HealthShieldIcon color={color} />;
}

function TokenHealthCard({ details }: { details: VariantDetailsA }) {
  const score = Math.max(0, Math.min(100, details.health.score));
  const scoreColor = score >= 65 ? "#009C62" : score >= 40 ? "#C99A2E" : "var(--color-down)";
  // Figma gauge (node 113:2055): 198.5px ring, 10px stroke, 260° arc with a
  // 100° gap centered at the bottom (arc runs 140° → 40°).
  const size = 198.5;
  const center = size / 2;
  const radius = 94.25;
  const circumference = 2 * Math.PI * radius;
  const arc = circumference * (260 / 360);
  // Fill is its own dash from the arc start — never offset-wrapped, so no
  // stray tail can bleed into the bottom gap.
  const filled = arc * (score / 100);

  return (
    <div
      className="hv-detail-card"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#FAFAFA",
        border: "1px solid var(--color-line-faint)",
        borderRadius: 20,
        padding: 24,
        minWidth: 0,
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-ink)", marginBottom: 16 }}>Market health</div>
      <div
        className="hv-health-grid"
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: `${size}px minmax(0, 1fr)`,
          gap: 20,
          alignItems: "center",
          minHeight: 0,
        }}
      >
        <div style={{ position: "relative", width: size, height: 210 }}>
          <svg width={size} height={166} viewBox={`0 0 ${size} 166`} aria-hidden="true" style={{ display: "block", overflow: "visible" }}>
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#E8EAEB"
              strokeWidth={10}
              strokeLinecap="round"
              strokeDasharray={`${arc} ${circumference}`}
              transform={`rotate(140 ${center} ${center})`}
            />
            {filled > 0 && (
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={scoreColor}
                strokeWidth={10}
                strokeLinecap="round"
                strokeDasharray={`${filled} ${circumference}`}
                transform={`rotate(140 ${center} ${center})`}
              />
            )}
          </svg>
          <div
            style={{
              position: "absolute",
              top: 65,
              left: 0,
              right: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span className="num" style={{ fontSize: 48, fontWeight: 300, color: "#0A0A0A", lineHeight: "normal" }}>
              {score}
            </span>
            <span style={{ fontSize: 13, color: "#64748B", lineHeight: "normal" }}>of 100</span>
          </div>
          <div
            style={{
              position: "absolute",
              top: 189,
              left: 0,
              right: 0,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: 8,
              color: "#2D2D2D",
              fontSize: 14,
              lineHeight: "21px",
            }}
          >
            <HealthStatusIcon status={details.health.status} color={scoreColor} />
            {details.health.status}
          </div>
        </div>
        <div className="hv-health-details" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0, height: "100%", minHeight: 210, padding: "6px 0" }}>
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
    <div className="reveal hv-token-detail-grid" style={{ padding: "20px 24px 40px", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 18, alignItems: "stretch" }}>
      <TokenDetailsCard v={v} />
      <div style={{ display: "flex", flexDirection: "column", minWidth: 0, height: "100%" }}>
        <TokenHealthCard details={v.details} />
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
                  className="hv-vrow"
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
                  <div className="hv-vrow-id" style={{ gridColumn: "1 / 3", display: "flex", alignItems: "flex-start", gap: 12, minWidth: 0 }}>
                    <VariantAvatar v={v} />
                    <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, color: "var(--color-ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {v.title}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 400, color: "var(--color-ink-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {v.sym} • {v.type}
                      </div>
                    </div>
                  </div>
                  {/* display:contents keeps these as direct grid cells on desktop;
                      below 980px the wrapper becomes the second (stats) row. */}
                  <div className="hv-vrow-stats" style={{ display: "contents" }}>
                    <div className="hv-vrow-stat" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, textAlign: "right" }}>
                      <div className="num" style={{ fontSize: 14, fontWeight: 600, color: "var(--color-ink)" }}>
                        {v.price}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 400, color: "var(--color-ink-muted)" }}>Price</div>
                    </div>
                    <div className="hv-vrow-stat" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, textAlign: "right" }}>
                      <div className="num" style={{ fontSize: 14, fontWeight: 600, color: "var(--color-ink)" }}>
                        {v.liq}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 400, color: "var(--color-ink-muted)" }}>Liquidity</div>
                    </div>
                    <div className="hv-vrow-stat" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, textAlign: "right" }}>
                      <div className="num" style={{ fontSize: 14, fontWeight: 600, color: "var(--color-ink)" }}>
                        {v.vol}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 400, color: "var(--color-ink-muted)" }}>24H Vol</div>
                    </div>
                    <div className="hv-vrow-access" style={{ display: "flex", justifyContent: "flex-end" }}>
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
                  </div>
                  <div className="hv-vrow-markets" style={{ display: "flex", justifyContent: "flex-end" }}>
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
