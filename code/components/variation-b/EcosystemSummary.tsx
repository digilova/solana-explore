import { ECO_STATS, buildSparkPath } from "@/lib/dataB";
import Avatar from "@/components/Avatar";

export default function EcosystemSummary() {
  const sparkPath = buildSparkPath();
  return (
    <section
      data-screen-label="Ecosystem summary"
      style={{
        background: "var(--color-surface-raised)",
        border: "1px solid var(--color-line)",
        borderRadius: 22,
        padding: 28,
        boxShadow: "rgba(23, 23, 23, 0.04) 0px 1px 2px",
      }}
    >
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 340 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Avatar size={52} bg="var(--color-dark)" initials="SX" fontSize={18} src="https://www.tokens.xyz/logos/prestocks/spacex.png" alt="SpaceX" />
            <div>
              <h1 style={{ margin: 0, fontSize: 26, fontWeight: 600, lineHeight: 1.15 }}>SpaceX exposure on Solana</h1>
              <div style={{ fontSize: 14, color: "var(--color-ink-muted)", marginTop: 3 }}>
                Private-market asset · tokenized by 4 independent issuers
              </div>
            </div>
          </div>
          <p style={{ margin: "18px 0 0", fontSize: 15, lineHeight: 1.6, color: "var(--color-ink-muted)", maxWidth: 560 }}>
            4 issuers, 5 distinct products — compare structure, access, and liquidity below.
          </p>
        </div>
        <div style={{ minWidth: 220, background: "var(--color-surface-page)", border: "1px solid var(--color-line)", borderRadius: 16, padding: "16px 18px" }}>
          <div style={{ fontSize: 12, color: "var(--color-ink-muted)" }}>Reference price · volume-weighted</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 4 }}>
            <span className="num" style={{ fontSize: 24, fontWeight: 600 }}>
              $188.87
            </span>
            <span style={{ color: "var(--color-down)", fontSize: 13, fontWeight: 600 }}>−3.07% 24H</span>
          </div>
          <svg viewBox="0 0 200 44" style={{ width: "100%", height: 44, display: "block", marginTop: 8 }} preserveAspectRatio="none">
            <path d={sparkPath} fill="none" stroke="#F92434" strokeWidth={1.8} strokeLinejoin="round"></path>
          </svg>
          <a
            href="#"
            className="hv-muted-link"
            style={{
              display: "inline-block",
              marginTop: 8,
              fontSize: 12,
              color: "var(--color-ink-muted)",
              textDecoration: "underline",
            }}
          >
            Full chart &amp; per-variant prices
          </a>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 12,
          marginTop: 24,
          borderTop: "1px solid var(--color-line)",
          paddingTop: 20,
        }}
      >
        {ECO_STATS.map((s) => (
          <div key={s.label}>
            <div className="num" style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.3 }}>
              {s.value}
            </div>
            <div style={{ fontSize: 13, color: "var(--color-ink-muted)", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
