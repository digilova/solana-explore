"use client";

import { useState } from "react";
import { PrototypeShell } from "@/components/PrototypeSidebar";
import SiteHeader from "@/components/SiteHeader";
import Breadcrumb from "@/components/Breadcrumb";
import AssetHeader from "@/components/variation-a/AssetHeader";
import ChartCard from "@/components/variation-a/ChartCard";
import ChartCardV3 from "@/components/variation-a/ChartCardV3";
import { useChartDisplay } from "@/lib/chartDisplayContext";
import VariantsMarkets, { type FilterKey } from "@/components/variation-a/VariantsMarkets";
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

        {chartVersion !== "v2" ? (
          <AssetHeader onJump={jumpToVariants} />
        ) : null}
        {chartVersion === "v1" ? (
          <ChartCard range={range} onSelectRange={setRange} />
        ) : (
          <ChartCardV3
            range={range}
            onSelectRange={setRange}
            header={<AssetHeader onJump={jumpToVariants} showJump={false} inline />}
          />
        )}
        <VariantsMarkets filter={filter} onFilter={setFilter} expanded={expanded} onToggle={toggle} />
      </main>

      <MarketFeed />
    </div>
  );
}

export default function VariationAPage() {
  return (
    <PrototypeShell active="a" note="Familiar flow with issuer and market signals added">
      <VariationAPageContent />
    </PrototypeShell>
  );
}
