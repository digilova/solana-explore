"use client";

import { useState } from "react";
import { PrototypeShell } from "@/components/PrototypeSidebar";
import SiteHeader from "@/components/SiteHeader";
import Breadcrumb from "@/components/Breadcrumb";
import EcosystemSummary from "@/components/variation-b/EcosystemSummary";
import VariantCard from "@/components/variation-b/VariantCard";
import MarketsPanel from "@/components/variation-b/MarketsPanel";
import LiquidityStructure from "@/components/variation-b/LiquidityStructure";
import MarketHealthSection from "@/components/variation-b/MarketHealthSection";
import NextSteps from "@/components/variation-b/NextSteps";
import IssuerFooter from "@/components/variation-b/IssuerFooter";
import { VARIANT_DEFS } from "@/lib/dataB";

export default function VariationBPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ SPCX: true });
  const [panelSym, setPanelSym] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const toggle = (sym: string) => setExpanded((s) => ({ ...s, [sym]: !s[sym] }));

  const openPanel = (sym: string) => {
    setPanelSym(sym);
    setPanelOpen(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setPanelOpen(true)));
  };

  const closePanel = () => {
    setPanelOpen(false);
    setTimeout(() => setPanelSym(null), 300);
  };

  const panelDef = panelSym ? VARIANT_DEFS.find((v) => v.sym === panelSym) : null;
  const panelRows = panelDef ? panelDef.rows.concat(panelDef.extra ?? []) : [];

  return (
    <PrototypeShell active="b" note="Insto-first reframe — evaluation surface for tokenized assets">
      <div data-screen-label="Variation B" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", flex: 1 }}>
      <SiteHeader />

      <main style={{ width: "100%", maxWidth: 1160, margin: "0 auto", padding: "24px 40px 80px", flex: 1 }}>
        <Breadcrumb items={[{ label: "Tokens", href: "#" }, { label: "Private markets", href: "#" }, { label: "SpaceX" }]} />

        <EcosystemSummary />

        <section data-screen-label="Issuers and variants" style={{ marginTop: 40 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>Issuers &amp; variants</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 18 }}>
            {VARIANT_DEFS.map((v) => (
              <VariantCard
                key={v.sym}
                v={v}
                expanded={!!expanded[v.sym]}
                onToggle={() => toggle(v.sym)}
                onOpenPanel={() => openPanel(v.sym)}
              />
            ))}
          </div>
          <div style={{ fontSize: 12, color: "var(--color-ink-subtle)", marginTop: 10, lineHeight: 1.5 }}>
            Spot / LP / Perps show tracked market types. Verify access requirements with the issuer before trading.
          </div>
        </section>

        <LiquidityStructure />
        <MarketHealthSection />
        <NextSteps />

        <div style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid var(--color-line)", fontSize: 12, color: "var(--color-ink-subtle)", lineHeight: 1.6 }}>
          We use publicly available data from the blockchain, as well as data procured by our trusted data partners and related sources.
          Prototype note: headline figures are from tokens.xyz (Jul 2026); structure facts and category counts are illustrative where marked.
        </div>
      </main>

      {panelSym && <MarketsPanel sym={panelSym} rows={panelRows} open={panelOpen} onClose={closePanel} />}

      <IssuerFooter />
      </div>
    </PrototypeShell>
  );
}
