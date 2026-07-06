import Avatar from "@/components/Avatar";
import { venueMeta } from "@/lib/venues";
import { fmt } from "@/lib/format";
import type { MarketRow } from "@/lib/dataB";

interface MarketsPanelProps {
  sym: string;
  rows: MarketRow[];
  open: boolean;
  onClose: () => void;
}

export default function MarketsPanel({ sym, rows, open, onClose }: MarketsPanelProps) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100 }}>
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(23, 23, 23, 0.4)",
          opacity: open ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      ></div>
      <div
        data-screen-label="All markets panel"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: 440,
          maxWidth: "92vw",
          background: "var(--color-surface-raised)",
          boxShadow: "rgba(0,0,0,0.18) -12px 0px 40px",
          display: "flex",
          flexDirection: "column",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.28s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "20px 24px", borderBottom: "1px solid var(--color-line)" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 600 }}>All markets · {sym}</div>
            <div style={{ fontSize: 12, color: "var(--color-ink-subtle)", marginTop: 2 }}>{rows.length} markets, sorted by 24h volume</div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="hv-f2f3f5"
            style={{
              width: 32,
              height: 32,
              borderRadius: 9999,
              border: "1px solid var(--color-line)",
              background: "var(--color-surface-raised)",
              color: "var(--color-ink-muted)",
              fontSize: 14,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: 12,
            padding: "10px 24px",
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
          <span style={{ textAlign: "right" }}>24h vol</span>
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {rows.map((m, i) => {
            const meta = venueMeta(m.venue);
            return (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr",
                  gap: 12,
                  alignItems: "center",
                  padding: "11px 24px",
                  borderBottom: "1px solid var(--color-line)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                  <Avatar size={22} bg={meta.venueBg} initials={meta.venueInitial} fontSize={9} src={meta.logoSrc} alt={meta.venue} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.pair}</div>
                    <div style={{ fontSize: 11, color: "var(--color-ink-subtle)" }}>{m.venue}</div>
                  </div>
                </div>
                <div className="num" style={{ textAlign: "right", fontSize: 13 }}>
                  {fmt(m.liq)}
                </div>
                <div className="num" style={{ textAlign: "right", fontSize: 13, color: "var(--color-ink-muted)" }}>
                  {fmt(m.vol)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
