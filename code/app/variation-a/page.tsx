"use client";

import { useState } from "react";
import SwitcherBar from "@/components/SwitcherBar";
import SiteHeader from "@/components/SiteHeader";
import Breadcrumb from "@/components/Breadcrumb";
import AssetHeader from "@/components/variation-a/AssetHeader";
import ChartCard from "@/components/variation-a/ChartCard";
import VariantsMarkets, { type FilterKey } from "@/components/variation-a/VariantsMarkets";
import WhereToBuy from "@/components/variation-a/WhereToBuy";
import MarketHealthA from "@/components/variation-a/MarketHealthA";
import MarketFeed from "@/components/variation-a/MarketFeed";
import type { RangeKey } from "@/lib/dataA";

export default function VariationAPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState<FilterKey>("spot");
  const [range, setRange] = useState<RangeKey>("1D");

  const toggle = (sym: string) => setExpanded((s) => ({ ...s, [sym]: !s[sym] }));

  const jumpToVariants = () => {
    const el = document.getElementById("variants-section");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: "smooth" });
  };

  return (
    <div data-screen-label="Variation A" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SwitcherBar active="a" note="Evolved current experience — familiar flow, issuer signals added" />
      <SiteHeader />

      <main style={{ width: "100%", maxWidth: 1160, margin: "0 auto", padding: "24px 40px 80px", flex: 1 }}>
        <Breadcrumb items={[{ label: "Tokens", href: "#" }, { label: "SpaceX" }]} />

        <AssetHeader onJump={jumpToVariants} />
        <ChartCard range={range} onSelectRange={setRange} />
        <VariantsMarkets filter={filter} onFilter={setFilter} expanded={expanded} onToggle={toggle} />

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24, marginTop: 32, alignItems: "stretch" }}>
          <WhereToBuy />
          <MarketHealthA />
        </div>

        <div style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid var(--color-line)", fontSize: 12, color: "var(--color-ink-subtle)", lineHeight: 1.6 }}>
          We use publicly available data from the blockchain, as well as data procured by our trusted data partners and related sources.
          Prototype note: headline figures are from tokens.xyz (Jul 2026); detail rows in expanded market lists are illustrative.
        </div>
      </main>

      <MarketFeed />
    </div>
  );
}
