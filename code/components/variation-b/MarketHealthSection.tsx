import { HEALTH_VARIANTS, SCORE_INPUTS } from "@/lib/dataB";

export default function MarketHealthSection() {
  return (
    <section
      data-screen-label="Market health"
      style={{
        marginTop: 40,
        background: "var(--color-surface-raised)",
        border: "1px solid var(--color-line)",
        borderRadius: 22,
        padding: 24,
        boxShadow: "rgba(23, 23, 23, 0.04) 0px 1px 2px",
      }}
    >
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ minWidth: 260, flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Market health</h2>
            <span style={{ background: "rgba(81,193,72,0.15)", color: "#4AA651", fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6 }}>
              72 · Healthy
            </span>
            <span style={{ background: "var(--color-surface-soft)", color: "var(--color-ink-muted)", fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 9999 }}>
              Asset-wide
            </span>
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 14, color: "var(--color-ink-muted)", lineHeight: 1.55, maxWidth: 460 }}>
            Answers one question: how safely can size move in and out of this asset today?{" "}
            <strong style={{ color: "var(--color-ink)" }}>Not a regulatory rating.</strong> Headline is asset-wide — per-variant scores on the right.
          </p>
        </div>
        <div style={{ flex: 1.2, minWidth: 320, display: "flex", flexDirection: "column", gap: 10 }}>
          {SCORE_INPUTS.map((si) => (
            <div key={si.label}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                <span style={{ color: "var(--color-ink-muted)" }}>{si.label}</span>
                <span style={{ fontWeight: 600, color: si.color }}>{si.grade}</span>
              </div>
              <div style={{ height: 6, background: "var(--color-line)", borderRadius: 9999, overflow: "hidden" }}>
                <div style={{ height: "100%", width: si.width, background: si.color, borderRadius: 9999 }}></div>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--color-line)", paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-ink-subtle)", textTransform: "uppercase", letterSpacing: 0.4 }}>
              Per-variant health
            </div>
            {HEALTH_VARIANTS.map((hv) => (
              <div key={hv.sym} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
                <span style={{ fontWeight: 600, width: 62 }}>{hv.sym}</span>
                <div style={{ flex: 1, height: 6, background: "var(--color-line)", borderRadius: 9999, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: hv.score + "%", background: hv.color, borderRadius: 9999 }}></div>
                </div>
                <span className="num" style={{ fontWeight: 600, width: 24, textAlign: "right" }}>
                  {hv.score}
                </span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "var(--color-ink-subtle)", lineHeight: 1.5 }}>
            &quot;Weak&quot; flags an input below the healthy threshold for assets of this size — it is not a judgment of any issuer.
          </div>
        </div>
      </div>
    </section>
  );
}
