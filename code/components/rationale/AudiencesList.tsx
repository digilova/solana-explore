import { AUDIENCES } from "@/lib/rationale";

export default function AudiencesList() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {AUDIENCES.map((au) => (
        <div key={au.who} style={{ background: "var(--color-surface-raised)", border: "1px solid var(--color-line)", borderRadius: 16, padding: "18px 22px" }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>{au.who}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 10, fontSize: 14, lineHeight: 1.6, color: "var(--color-ink-muted)" }}>
            <div>
              <span style={{ fontWeight: 600, color: "var(--color-ink)" }}>A:</span> {au.a}
            </div>
            <div>
              <span style={{ fontWeight: 600, color: "var(--color-down)" }}>B:</span> {au.b}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
