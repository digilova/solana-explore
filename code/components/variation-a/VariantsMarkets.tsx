import { useEffect, useRef, useState } from "react";
import Avatar from "@/components/Avatar";
import SegmentedControl from "@/components/SegmentedControl";
import Tooltip from "@/components/Tooltip";
import { venueMeta } from "@/lib/venues";
import { ACCESS_STYLES_A, getVariantDefsA, type AccessKindA, type VariantDefA } from "@/lib/dataA";

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

function SortIcon({ active }: { active?: boolean }) {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={active ? "var(--color-ink)" : "var(--color-ink-subtle)"} strokeWidth="2.6" strokeLinecap="round">
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
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
      setDisplay(to);
      displayRef.current = to;
      return;
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
                  <div className="reveal" style={{ padding: "0 24px 16px" }}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: gridCols,
                        columnGap: 12,
                        padding: "10px 0",
                        fontSize: 11,
                        fontWeight: 600,
                        color: "var(--color-ink-subtle)",
                      }}
                    >
                      <span>Venue</span>
                      <span>Pair</span>
                      <span style={{ textAlign: "right" }}>Price</span>
                      <span style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4 }}>
                        Liquidity <SortIcon />
                      </span>
                      <span style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4, color: "var(--color-ink)" }}>
                        24H Vol <SortIcon active />
                      </span>
                      <span style={{ textAlign: "right" }}>24H Trades</span>
                      <span style={{ textAlign: "right" }}>24H Wallets</span>
                    </div>
                    <div style={{ borderTop: "1px solid var(--color-line-faint)" }}>
                      {rows.map((m, i) => {
                        const meta = venueMeta(m.venue);
                        return (
                          <a
                            key={i}
                            href={m.href}
                            className="hv-market-row"
                            style={{
                              display: "grid",
                              gridTemplateColumns: gridCols,
                              columnGap: 12,
                              alignItems: "center",
                              padding: "12px 0",
                              borderBottom: i === rows.length - 1 ? "none" : "1px solid var(--color-line-faint)",
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
                      onClick={() => onToggle(v.sym)}
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
