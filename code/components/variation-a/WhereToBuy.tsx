"use client";

import { useState, type ReactNode } from "react";
import Avatar from "@/components/Avatar";
import SegmentedControl from "@/components/SegmentedControl";
import { AGGREGATORS_A, VENUES_A } from "@/lib/dataA";

type BuyTab = "spot" | "liquidity";

const BUY_TABS: { key: BuyTab; label: string }[] = [
  { key: "spot", label: "Spot" },
  { key: "liquidity", label: "Liquidity" },
];

function ArrowUpRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-ink-faint)", flexShrink: 0 }}>
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-ink-muted)", marginBottom: 12, padding: "0 16px" }}>{children}</div>
  );
}

function ProviderLogo({ name, bg, initial, img }: { name: string; bg: string; initial: string; img: string }) {
  return (
    <Avatar
      size={26}
      bg={bg}
      initials={initial}
      fontSize={11}
      src={img}
      alt={name}
      style={{ border: "1px solid var(--color-line)", background: "var(--color-hover-soft)", flexShrink: 0 }}
    />
  );
}

function BuyProviderRow({
  rank,
  name,
  note,
  avatar,
  onClick,
}: {
  rank: number;
  name: string;
  note?: string;
  avatar: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="hv-buy-row"
      style={{
        display: "block",
        width: "100%",
        border: "none",
        background: "transparent",
        padding: "12px 16px 12px 8px",
        borderRadius: 24,
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
        <span className="num" style={{ width: 20, flexShrink: 0, fontSize: 12, color: "var(--color-ink-faint)", textAlign: "center" }}>
          {rank}
        </span>
        {avatar}
        <span style={{ fontSize: 14, fontWeight: 500, color: "var(--color-ink)" }}>{name}</span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
          {note && (
            <span style={{ fontSize: 14, color: "var(--color-ink-subtle)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {note}
            </span>
          )}
          <ArrowUpRightIcon />
        </span>
      </span>
    </button>
  );
}

export default function WhereToBuy() {
  const [tab, setTab] = useState<BuyTab>("spot");

  return (
    <section
      data-screen-label="Where to buy"
      style={{
        background: "var(--color-surface-raised)",
        border: "1px solid var(--color-line)",
        borderRadius: 26,
        padding: 12,
        boxShadow: "0 8px 40px rgba(0, 0, 0, 0.03)",
      }}
    >
      <div style={{ padding: "12px 12px 0" }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "var(--color-ink)" }}>Buy SpaceX</h2>
        <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--color-ink-muted)", lineHeight: 1.5 }}>
          Aggregators route to the best available market automatically. Exchanges list specific pairs.
        </p>
      </div>

      <div style={{ marginTop: 16 }}>
        <SegmentedControl
          ariaLabel="Trade type"
          fullWidth
          value={tab}
          onChange={setTab}
          items={BUY_TABS.map(({ key, label }) => ({ value: key, label }))}
          getSegmentStyle={() => ({
            fontSize: 13,
            padding: "8px 12px",
            fontWeight: 500,
          })}
        />
      </div>

      {tab === "spot" ? (
        <div style={{ marginTop: 20 }}>
          <SectionLabel>Aggregators</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {AGGREGATORS_A.map((g) => (
              <BuyProviderRow
                key={g.name}
                rank={Number(g.rank)}
                name={g.name}
                note={g.note}
                avatar={<ProviderLogo name={g.name} bg={g.bg} initial={g.initial} img={g.img} />}
              />
            ))}
          </div>

          <div style={{ marginTop: 20 }}>
            <SectionLabel>Individual Venues</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {VENUES_A.map((g, i) => (
                <BuyProviderRow
                  key={g.name}
                  rank={i + 1}
                  name={g.name}
                  avatar={<ProviderLogo name={g.name} bg={g.bg} initial={g.initial} img={g.img} />}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, padding: "0 16px" }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-ink-muted)" }}>Pools</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-ink-faint)" }}>24h Volume</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {VENUES_A.map((g, i) => (
              <BuyProviderRow
                key={g.name}
                rank={i + 1}
                name={g.name}
                avatar={<ProviderLogo name={g.name} bg={g.bg} initial={g.initial} img={g.img} />}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
