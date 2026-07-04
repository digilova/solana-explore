import { LIQ_SHARES, VENUE_DEPTH } from "@/lib/dataB";

const cardStyle = {
  background: "var(--color-surface-raised)",
  border: "1px solid var(--color-line)",
  borderRadius: 22,
  padding: 24,
  boxShadow: "rgba(23, 23, 23, 0.04) 0px 1px 2px",
} as const;

export default function LiquidityStructureA() {
  return (
    <section data-screen-label="Liquidity and depth" style={{ marginTop: 40 }}>
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>Liquidity &amp; market structure</h2>
      <div
        className="hv-liquidity-structure-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 24,
          marginTop: 18,
          alignItems: "stretch",
        }}
      >
        <div style={cardStyle}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Liquidity share by variant</div>
          <div style={{ display: "flex", height: 14, borderRadius: 9999, overflow: "hidden", gap: 2 }}>
            {LIQ_SHARES.map((ls) => (
              <div
                key={ls.sym}
                title={`${ls.sym} — ${ls.liq} (${ls.pct})`}
                style={{ width: Math.max(ls.w, 0.6) + "%", background: ls.color, cursor: "help" }}
              />
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
            {LIQ_SHARES.map((ls) => (
              <div
                key={ls.sym}
                style={{
                  display: "grid",
                  gridTemplateColumns: "10px 64px minmax(0, 1fr) auto 44px",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 13,
                }}
              >
                <span style={{ width: 10, height: 10, borderRadius: 3, background: ls.color }} />
                <span style={{ fontWeight: 600 }}>{ls.sym}</span>
                <span style={{ color: "var(--color-ink-muted)", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {ls.issuer}
                </span>
                <span className="num" style={{ fontWeight: 500, whiteSpace: "nowrap" }}>
                  {ls.liq}
                </span>
                <span className="num" style={{ color: "var(--color-ink-subtle)", textAlign: "right" }}>
                  {ls.pct}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 16,
              padding: "12px 14px",
              background: "rgba(255,160,152,0.14)",
              borderRadius: 12,
              fontSize: 13,
              lineHeight: 1.5,
              color: "var(--color-ink-muted)",
            }}
          >
            <strong style={{ color: "#9E0016" }}>Concentration note:</strong> 79% of liquidity sits in one variant (SPCX). Deep liquidity
            exists, but it is not evenly distributed — relevant for execution on smaller variants.
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Top trading exchanges</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {VENUE_DEPTH.map((vd) => (
              <div key={vd.name}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16, fontSize: 13, marginBottom: 4 }}>
                  <span style={{ fontWeight: 500 }}>{vd.name}</span>
                  <span className="num" style={{ color: "var(--color-ink-muted)", whiteSpace: "nowrap" }}>
                    {vd.liq}
                  </span>
                </div>
                <div style={{ height: 8, background: "var(--color-line)", borderRadius: 9999, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: vd.width, background: "var(--color-ink)", borderRadius: 9999 }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "var(--color-ink-subtle)", marginTop: 14, lineHeight: 1.5 }}>
            73 tracked markets across 7 venues. Aggregators (Titan, Jupiter, DFlow) route across all of them.
          </div>
        </div>
      </div>
    </section>
  );
}
