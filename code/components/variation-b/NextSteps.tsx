import Avatar from "@/components/Avatar";
import { AGGREGATORS } from "@/lib/dataB";

export default function NextSteps() {
  return (
    <section
      data-screen-label="Next steps"
      style={{
        marginTop: 40,
        background: "var(--color-surface-raised)",
        border: "1px solid var(--color-line)",
        borderRadius: 22,
        padding: 24,
        boxShadow: "rgba(23, 23, 23, 0.04) 0px 1px 2px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-ink-subtle)", textTransform: "uppercase", letterSpacing: 0.4 }}>
            For investors
          </div>
          <div style={{ fontSize: 17, fontWeight: 600, marginTop: 6 }}>Trade a variant via an aggregator</div>
          <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--color-ink-muted)", lineHeight: 1.55 }}>
            Pick a variant above and check its access — aggregators route the best price across all venues.
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {AGGREGATORS.map((g) => (
            <a
              key={g.name}
              href="#"
              title={g.note}
              className="hv-f2f3f5"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--color-surface-raised)",
                border: "1px solid var(--color-line-strong)",
                borderRadius: 9999,
                padding: "8px 16px 8px 10px",
                color: "var(--color-ink)",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              <Avatar size={24} bg={g.bg} initials={g.initial} fontSize={10} src={g.img} alt={g.name} />
              {g.name} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
