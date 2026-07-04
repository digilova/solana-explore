import Link from "next/link";

type Active = "a" | "b" | "rationale";

const TABS: { key: Active; href: string; label: string }[] = [
  { key: "a", href: "/variation-a", label: "A · Evolved" },
  { key: "b", href: "/variation-b", label: "B · Insto-first" },
  { key: "rationale", href: "/rationale", label: "Rationale" },
];

export default function SwitcherBar({ active, note }: { active: Active; note: string }) {
  return (
    <div
      style={{
        background: "var(--color-dark)",
        color: "var(--color-surface-raised)",
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "0 24px",
        height: 44,
        fontSize: 13,
        position: "sticky",
        top: 0,
        zIndex: 60,
      }}
    >
      <span style={{ fontWeight: 600, opacity: 0.9 }}>SpaceX Page Redesign</span>
      <span style={{ opacity: 0.35 }}>·</span>
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Link
            key={tab.key}
            href={tab.href}
            className={isActive ? undefined : "hv-switcher-tab"}
            style={{
              color: isActive ? "var(--color-surface-raised)" : "rgba(255,255,255,0.65)",
              background: isActive ? "rgba(255,255,255,0.16)" : undefined,
              padding: "5px 12px",
              borderRadius: 9999,
              fontWeight: isActive ? 600 : 400,
            }}
          >
            {tab.label}
          </Link>
        );
      })}
      <span style={{ marginLeft: "auto", color: "rgba(255,255,255,0.45)", fontSize: 12 }}>{note}</span>
    </div>
  );
}
