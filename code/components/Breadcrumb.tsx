interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 14,
        color: "var(--color-ink-muted)",
        padding: "8px 0 20px",
      }}
    >
      {items.map((item, i) => (
        <span key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {i > 0 && <span style={{ color: "var(--color-line-strong)" }}>/</span>}
          {item.href ? (
            <a href={item.href} className="hv-breadcrumb" style={{ color: "var(--color-ink-muted)" }}>
              {item.label}
            </a>
          ) : (
            <span style={{ color: "var(--color-dark)", fontWeight: 600 }}>{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
