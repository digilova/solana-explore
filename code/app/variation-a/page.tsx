"use client";

import { useState } from "react";
import { PrototypeShell } from "@/components/PrototypeSidebar";
import SiteHeader from "@/components/SiteHeader";
import Breadcrumb from "@/components/Breadcrumb";
import AssetHeader from "@/components/variation-a/AssetHeader";
import ChartCard from "@/components/variation-a/ChartCard";
import ChartCardV2 from "@/components/variation-a/ChartCardV2";
import { useChartDisplay } from "@/lib/chartDisplayContext";
import VariantsMarkets, { type FilterKey } from "@/components/variation-a/VariantsMarkets";
import LiquidityStructureA from "@/components/variation-a/LiquidityStructureA";
import MarketFeed from "@/components/variation-a/MarketFeed";
import type { RangeKey } from "@/lib/dataA";

function VariationAPageContent() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState<FilterKey>("spot");
  const [range, setRange] = useState<RangeKey>("1D");
  const { chartVersion } = useChartDisplay();

  const toggle = (sym: string) => setExpanded((s) => ({ ...s, [sym]: !s[sym] }));

  const jumpToVariants = () => {
    const el = document.getElementById("variants-section");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: "smooth" });
  };

  return (
    <div data-screen-label="Variation A" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", flex: 1 }}>
      <SiteHeader />

      <main className="hv-page-main" style={{ width: "100%", maxWidth: 1160, margin: "0 auto", padding: "24px 40px 80px", flex: 1 }}>
        <Breadcrumb items={[{ label: "Tokens", href: "#" }, { label: "SpaceX" }]} />

        <AssetHeader onJump={jumpToVariants} />
        {chartVersion === "v1" ? (
          <ChartCard range={range} onSelectRange={setRange} />
        ) : (
          <ChartCardV2 range={range} onSelectRange={setRange} />
        )}
        <VariantsMarkets filter={filter} onFilter={setFilter} expanded={expanded} onToggle={toggle} />
        <LiquidityStructureA />

        <div style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid var(--color-line)", fontSize: 12, color: "var(--color-ink-subtle)", lineHeight: 1.6 }}>
          We use publicly available data from the blockchain, as well as data procured by our trusted data partners and related sources.
          Prototype note: headline figures are from tokens.xyz (Jul 2026); detail rows in expanded market lists are illustrative.
        </div>
      </main>

      <MarketFeed />
    </div>
  );
}

export default function VariationAPage() {
  return (
    <PrototypeShell active="a" note="Evolved current experience — familiar flow, issuer signals added">
      <VariationAPageContent />
    </PrototypeShell>
  );
}
