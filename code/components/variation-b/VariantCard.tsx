import Avatar from "@/components/Avatar";
import InfoTip from "@/components/InfoTip";
import { venueMeta } from "@/lib/venues";
import { fmt } from "@/lib/format";
import { ACCESS_STYLES, HEALTH_MAP, healthColor, type VariantDef } from "@/lib/dataB";

interface VariantCardProps {
  v: VariantDef;
  expanded: boolean;
  onToggle: () => void;
  onOpenPanel: () => void;
}

export default function VariantCard({ v, expanded, onToggle, onOpenPanel }: VariantCardProps) {
  const access = ACCESS_STYLES[v.accessKind];
  const health = HEALTH_MAP[v.sym];
  const hColor = healthColor(health);
  const totalMarkets = v.rows.length + (v.extra?.length ?? 0);
  const hasMore = (v.extra?.length ?? 0) > 0;

  return (
    <div
      style={{
        background: "var(--color-surface-raised)",
        border: "1px solid var(--color-line)",
        borderRadius: 22,
        overflow: "hidden",
        boxShadow: "rgba(23, 23, 23, 0.04) 0px 1px 2px",
      }}
    >
      <div
        onClick={onToggle}
        className="hv-row"
        style={{
          display: "grid",
          gridTemplateColumns: "2.1fr 1fr 1.3fr 1.1fr 1.1fr 1.5fr 44px",
          gap: 14,
          alignItems: "center",
          padding: "18px 24px",
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
          <Avatar size={40} bg={v.avatarBg} initials={v.avatar} fontSize={13} src={v.img} alt={v.sym} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 16 }}>{v.issuer}</div>
            <div style={{ fontSize: 13, color: "var(--color-ink-muted)", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontWeight: 600, color: "var(--color-ink-muted)" }}>{v.sym}</span>
              <span>·</span>
              <span>{v.type}</span>
            </div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: "var(--color-ink-subtle)" }}>Price</div>
          <div className="num" style={{ fontSize: 15, fontWeight: 600 }}>
            {v.price}
          </div>
          <div className="num" style={{ fontSize: 12, fontWeight: 600, color: v.chgUp ? "#4AA651" : "#CF4040" }}>
            {v.chg}
          </div>
        </div>
        <div>
          <span
            title={v.accessHint}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              background: access.bg,
              color: access.color,
              fontSize: 12,
              fontWeight: 600,
              padding: "4px 10px",
              borderRadius: 6,
              cursor: "help",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: 9999, background: access.color }}></span>
            {v.access}
          </span>
        </div>
        <div>
          <div style={{ fontSize: 12, color: "var(--color-ink-subtle)" }}>Liquidity</div>
          <div className="num" style={{ fontSize: 15, fontWeight: 600 }}>
            {v.liq}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: "var(--color-ink-subtle)" }}>24H Volume</div>
          <div className="num" style={{ fontSize: 15, fontWeight: 600 }}>
            {v.vol}
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {v.avail.map((ch) => (
            <span
              key={ch.label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontSize: 11,
                fontWeight: 600,
                padding: "3px 8px",
                borderRadius: 9999,
                background: ch.on ? "rgba(81,193,72,0.15)" : "var(--color-line)",
                color: ch.on ? "#4AA651" : "var(--color-ink-subtle)",
              }}
            >
              {ch.on ? "✓" : "—"} {ch.label}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 9999,
              background: "var(--color-surface-soft)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-ink-muted)",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.18s ease",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </span>
        </div>
      </div>

      {expanded && (
        <div className="reveal" style={{ borderTop: "1px solid var(--color-line)", background: "var(--color-surface-page)", padding: "20px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1.6fr", gap: 24, alignItems: "start" }}>
            {/* Trust & structure */}
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--color-ink-subtle)",
                  textTransform: "uppercase",
                  letterSpacing: 0.4,
                  marginBottom: 10,
                }}
              >
                Structure &amp; trust
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "var(--color-surface-raised)",
                  border: "1px solid var(--color-line)",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                {v.facts.map((fx) => (
                  <div
                    key={fx.k}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                      padding: "10px 14px",
                      borderBottom: "1px solid var(--color-line)",
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: "var(--color-ink-muted)", display: "flex", alignItems: "center", gap: 6 }}>
                      {fx.k}
                      {fx.tip && <InfoTip tip={fx.tip} />}
                    </span>
                    <span style={{ fontWeight: 500, textAlign: "right" }}>{fx.v}</span>
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 14px",
                    fontSize: 13,
                  }}
                >
                  <span style={{ color: "var(--color-ink-muted)" }}>Market health</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 60, height: 6, background: "var(--color-line)", borderRadius: 9999, overflow: "hidden" }}>
                      <span style={{ display: "block", height: "100%", width: health + "%", background: hColor, borderRadius: 9999 }}></span>
                    </span>
                    <span style={{ fontWeight: 600, color: hColor }}>{health}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Markets */}
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-ink-subtle)", textTransform: "uppercase", letterSpacing: 0.4 }}>
                  Top markets
                </span>
                <span style={{ fontSize: 12, color: "var(--color-ink-subtle)" }}>{v.marketNote}</span>
                {hasMore && (
                  <button
                    onClick={onOpenPanel}
                    className="hv-f2f3f5"
                    style={{
                      marginLeft: "auto",
                      background: "var(--color-surface-raised)",
                      border: "1px solid var(--color-line-strong)",
                      color: "var(--color-ink-muted)",
                      fontSize: 12,
                      fontWeight: 500,
                      padding: "4px 12px",
                      borderRadius: 9999,
                      cursor: "pointer",
                    }}
                  >
                    See all {totalMarkets}
                  </button>
                )}
              </div>
              <div style={{ background: "var(--color-surface-raised)", border: "1px solid var(--color-line)", borderRadius: 12, overflow: "hidden" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr",
                    gap: 12,
                    padding: "9px 14px",
                    borderBottom: "1px solid var(--color-line)",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--color-ink-subtle)",
                    textTransform: "uppercase",
                    letterSpacing: 0.4,
                  }}
                >
                  <span>Venue · Pair</span>
                  <span style={{ textAlign: "right" }}>Liquidity</span>
                  <span style={{ textAlign: "right" }}>24H Vol</span>
                </div>
                {v.rows.map((m, i) => {
                  const meta = venueMeta(m.venue);
                  return (
                    <div
                      key={i}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr 1fr",
                        gap: 12,
                        alignItems: "center",
                        padding: "11px 14px",
                        borderBottom: "1px solid var(--color-line)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Avatar size={22} bg={meta.venueBg} initials={meta.venueInitial} fontSize={9} src={meta.logoSrc} alt={meta.venue} />
                        <span style={{ fontSize: 13, fontWeight: 500 }}>{m.pair}</span>
                        <span style={{ fontSize: 12, color: "var(--color-ink-subtle)" }}>{m.venue}</span>
                      </div>
                      <div className="num" style={{ textAlign: "right", fontSize: 13, fontWeight: 600 }}>
                        {fmt(m.liq)}
                      </div>
                      <div className="num" style={{ textAlign: "right", fontSize: 13, color: "var(--color-ink-muted)" }}>
                        {fmt(m.vol)}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <a
                  href="#"
                  title={`Opens Jupiter with ${v.sym} preselected — the aggregator routes the best price across venues`}
                  className="hv-trade-btn"
                  style={{
                    background: "var(--color-ink)",
                    color: "var(--color-surface-raised)",
                    border: "1px solid #1F1F1F",
                    fontSize: 13,
                    fontWeight: 500,
                    padding: "8px 16px",
                    borderRadius: 9999,
                  }}
                >
                  Trade {v.sym} on Jupiter ↗
                </a>
                <a
                  href="#"
                  className="hv-f2f3f5"
                  style={{
                    background: "var(--color-surface-raised)",
                    color: "var(--color-ink-muted)",
                    border: "1px solid var(--color-line-strong)",
                    fontSize: 13,
                    padding: "8px 16px",
                    borderRadius: 9999,
                  }}
                >
                  Issuer docs
                </a>
                <a
                  href="#"
                  className="hv-f2f3f5"
                  style={{
                    background: "var(--color-surface-raised)",
                    color: "var(--color-ink-muted)",
                    border: "1px solid var(--color-line-strong)",
                    fontSize: 13,
                    padding: "8px 16px",
                    borderRadius: 9999,
                    fontFamily: "monospace",
                  }}
                >
                  Mint address ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
