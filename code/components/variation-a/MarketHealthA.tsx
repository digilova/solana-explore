import { MARKET_HEALTH_CLASS_A, MARKET_HEALTH_SCORE_A, SCORE_INPUTS_A } from "@/lib/dataA";

const GAUGE_R = 80;
const GAUGE_CX = 90;
const GAUGE_CY = 92;
const GAUGE_STROKE = 14;
const GAUGE_WIDTH = 180;
const GAUGE_HEIGHT = 104;
const GAUGE_CIRCUMFERENCE = Math.PI * GAUGE_R;
const GAUGE_ARC = `M${GAUGE_CX - GAUGE_R},${GAUGE_CY} A${GAUGE_R},${GAUGE_R} 0 0 1 ${GAUGE_CX + GAUGE_R},${GAUGE_CY}`;

export default function MarketHealthA() {
  const scoreOffset = GAUGE_CIRCUMFERENCE * (1 - MARKET_HEALTH_SCORE_A / 100);

  return (
    <section
      data-screen-label="Market health"
      style={{
        background: "var(--color-surface-raised)",
        border: "1px solid var(--color-line)",
        borderRadius: 22,
        padding: 24,
        boxShadow: "rgba(23, 23, 23, 0.04) 0px 1px 2px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 500 }}>Market health</h2>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
        <div style={{ position: "relative", width: GAUGE_WIDTH, height: GAUGE_HEIGHT }}>
          <svg width={GAUGE_WIDTH} height={GAUGE_HEIGHT} viewBox={`0 0 ${GAUGE_WIDTH} ${GAUGE_HEIGHT}`}>
            <path d={GAUGE_ARC} fill="none" stroke="var(--color-line)" strokeWidth={GAUGE_STROKE} strokeLinecap="round"></path>
            <path
              d={GAUGE_ARC}
              fill="none"
              stroke="var(--color-up)"
              strokeWidth={GAUGE_STROKE}
              strokeLinecap="round"
              strokeDasharray={GAUGE_CIRCUMFERENCE}
              strokeDashoffset={scoreOffset}
            ></path>
          </svg>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingBottom: 4,
            }}
          >
            <span className="num" style={{ fontSize: 36, fontWeight: 600, lineHeight: 1 }}>
              {MARKET_HEALTH_SCORE_A}
              <span style={{ fontSize: 18, fontWeight: 500, color: "var(--color-ink-subtle)" }}>/100</span>
            </span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-ink-muted)", marginTop: 4 }}>{MARKET_HEALTH_CLASS_A}</span>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        {SCORE_INPUTS_A.map((si) => (
          <div key={si.label}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: si.color }}>{si.grade}</span>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, textAlign: "right" }}>
                <div className="num" style={{ fontSize: 14, fontWeight: 600, color: "var(--color-ink)" }}>
                  {si.value}
                </div>
                <div style={{ fontSize: 12, fontWeight: 400, color: "var(--color-ink-muted)" }}>{si.label}</div>
              </div>
            </div>
            <div style={{ height: 6, background: "var(--color-line)", borderRadius: 9999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: si.width, background: si.color, borderRadius: 9999 }}></div>
            </div>
          </div>
        ))}
        <div
          style={{
            marginTop: "auto",
            fontSize: 12,
            color: "var(--color-ink-subtle)",
            lineHeight: 1.5,
            borderTop: "1px solid var(--color-line)",
            paddingTop: 12,
          }}
        >
          Market Health measures how safely capital can move in and out of an asset using on-chain data. Signals reflect market conditions,
          not issuer or regulatory ratings. Updated daily.
        </div>
      </div>
    </section>
  );
}
