import { DECISIONS } from "@/lib/rationale";

export default function DecisionsTable() {
  return (
    <div style={{ background: "var(--color-surface-raised)", border: "1px solid var(--color-line)", borderRadius: 16, overflow: "hidden" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 0.8fr 2fr",
          gap: 12,
          padding: "12px 22px",
          borderBottom: "1px solid var(--color-line)",
          fontSize: 12,
          fontWeight: 600,
          color: "var(--color-ink-subtle)",
          textTransform: "uppercase",
          letterSpacing: 0.4,
        }}
      >
        <span>Module</span>
        <span>Decision</span>
        <span>Why</span>
      </div>
      {DECISIONS.map((d, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 0.8fr 2fr",
            gap: 12,
            padding: "14px 22px",
            borderBottom: "1px solid var(--color-line)",
            fontSize: 14,
            lineHeight: 1.5,
          }}
        >
          <span style={{ fontWeight: 500 }}>{d.module}</span>
          <span>
            <span style={{ background: d.bg, color: d.color, fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6 }}>{d.decision}</span>
          </span>
          <span style={{ color: "var(--color-ink-muted)" }}>{d.why}</span>
        </div>
      ))}
    </div>
  );
}
