import { AUDIENCES } from "@/lib/rationale";

export default function AudiencesList() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {AUDIENCES.map((au) => (
        <div key={au.who} style={{ background: "var(--color-surface-raised)", border: "1px solid var(--color-line)", borderRadius: 16, padding: "18px 22px" }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>{au.who}</div>
          <p style={{ margin: "10px 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--color-ink-muted)" }}>{au.value}</p>
        </div>
      ))}
    </div>
  );
}
