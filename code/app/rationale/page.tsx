import type { CSSProperties } from "react";
import Link from "next/link";
import { PrototypeShell } from "@/components/PrototypeSidebar";
import DecisionsTable from "@/components/rationale/DecisionsTable";
import AudiencesList from "@/components/rationale/AudiencesList";

const cardStyle: CSSProperties = {
  background: "var(--color-surface-raised)",
  border: "1px solid var(--color-line)",
  borderRadius: 16,
  padding: "18px 22px",
};

export default function RationalePage() {
  return (
    <PrototypeShell active="rationale" note="">
      <div data-screen-label="Design Rationale" style={{ minHeight: "100vh", background: "var(--color-surface-page)" }}>

      <main style={{ maxWidth: 860, margin: "0 auto", padding: "48px 40px 96px" }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 600, letterSpacing: -0.5, lineHeight: 1.2 }}>Design rationale</h1>
        <p style={{ margin: "12px 0 0", fontSize: 16, lineHeight: 1.6, color: "var(--color-ink-muted)" }}>
          Tokens.xyz SpaceX asset detail page redesign — information architecture, required explorations, and recommendation. Companion to
          the evolved product direction and live-page audit.
        </p>

        {/* User assumptions */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ margin: "0 0 12px", fontSize: 21, fontWeight: 600 }}>1 · User assumptions</h2>
          <p style={{ margin: "0 0 16px", fontSize: 15, lineHeight: 1.65, color: "var(--color-ink-muted)" }}>
            The redesign assumes this page has to serve three audiences at once, with issuers as the most important audience for the
            product strategy.
          </p>
          <div className="hv-rationale-user-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 }}>
            <div style={cardStyle}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-ink-subtle)", textTransform: "uppercase", letterSpacing: 0.4 }}>
                Primary
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, marginTop: 6 }}>Asset issuers</div>
              <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--color-ink-muted)" }}>
                They are evaluating whether Solana can make their tokenized asset look credible: issuer identity, structure, access rules,
                liquidity depth, and market fragmentation need to be legible before price action.
              </p>
            </div>
            <div style={cardStyle}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-ink-subtle)", textTransform: "uppercase", letterSpacing: 0.4 }}>
                Active users
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, marginTop: 6 }}>Traders and crypto-native investors</div>
              <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--color-ink-muted)" }}>
                They still need fast answers: reference price, liquidity, venues, and a clean route to trade. The redesign should add
                context without burying the familiar chart-and-market workflow.
              </p>
            </div>
            <div style={cardStyle}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-ink-subtle)", textTransform: "uppercase", letterSpacing: 0.4 }}>
                Diligence users
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, marginTop: 6 }}>Sophisticated investors</div>
              <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--color-ink-muted)" }}>
                They compare issuers, redemption terms, backing claims, trading depth, and holder activity. For them, a token ticker is
                not enough; each variant has to read like a financial product.
              </p>
            </div>
          </div>
        </section>

        {/* IA */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ margin: "0 0 12px", fontSize: 21, fontWeight: 600 }}>2 · Revised information architecture</h2>
          <p style={{ margin: "0 0 16px", fontSize: 15, lineHeight: 1.65, color: "var(--color-ink-muted)" }}>
            The current page mixes four concepts. The redesign enforces one canonical hierarchy and renders each level exactly once:
          </p>
          <div style={{ background: "var(--color-surface-raised)", border: "1px solid var(--color-line)", borderRadius: 16, padding: "20px 24px", fontSize: 14, lineHeight: 1.7 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div>
                <strong>Asset</strong>{" "}
                <span style={{ color: "var(--color-ink-muted)" }}>
                  — SpaceX. Owns the reference price, aggregate stats, and market-health score. Everything asset-level is explicitly
                  labeled &quot;across all variants&quot;.
                </span>
              </div>
              <div style={{ paddingLeft: 20 }}>
                <strong>Variant / Issuer</strong>{" "}
                <span style={{ color: "var(--color-ink-muted)" }}>
                  — SPCX, SPCXx, TSPX, SPACEX, SPCXon. A financial product with issuer, type, backing, and access — not just a ticker.
                  Rendered once, in one comparison module.
                </span>
              </div>
              <div style={{ paddingLeft: 40 }}>
                <strong>Market / Venue</strong>{" "}
                <span style={{ color: "var(--color-ink-muted)" }}>
                  — Orca, Meteora, Raydium, Byreal, Kamino… Lives inside the variant&apos;s expanded row; never a competing page section.
                </span>
              </div>
              <div style={{ paddingLeft: 60 }}>
                <strong>Pair</strong> <span style={{ color: "var(--color-ink-muted)" }}>— SPCX/USDC etc. A row inside a market list.</span>
              </div>
            </div>
          </div>
          <p style={{ margin: "16px 0 0", fontSize: 15, lineHeight: 1.65, color: "var(--color-ink-muted)" }}>
            The structural fix behind most of the PRD&apos;s problems: <strong>variants appear exactly once per page</strong>. The former
            four appearances (header dropdown, markets groupings, standalone Variants section, variant sub-page) collapse into a single
            expandable comparison module. The header chip becomes a jump link into it; markets nest inside it; the sub-page becomes its
            expanded state.
          </p>
        </section>

        {/* Direction and audit */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ margin: "0 0 12px", fontSize: 21, fontWeight: 600 }}>3 · Direction and audit</h2>
          <div className="hv-rationale-directions-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
            <Link href="/variation-a" className="hv-rationale-card" style={{ display: "block", ...cardStyle, color: "var(--color-ink)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-ink-subtle)", textTransform: "uppercase", letterSpacing: 0.4 }}>
                Product direction
              </div>
              <div style={{ fontSize: 17, fontWeight: 600, marginTop: 6 }}>Evolved current experience</div>
              <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--color-ink-muted)" }}>
                Keeps the token-page shape: chart on top, stats, then one Variants &amp; Markets module. Adds issuer identity, access
                labels, inline market expansion, and an explained health score. Retail users lose nothing; issuers gain legibility.
              </p>
            </Link>
            <Link href="/current-audit" className="hv-rationale-card" style={{ display: "block", ...cardStyle, color: "var(--color-ink)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-ink-subtle)", textTransform: "uppercase", letterSpacing: 0.4 }}>
                Current audit
              </div>
              <div style={{ fontSize: 17, fontWeight: 600, marginTop: 6 }}>Live-page annotation canvas</div>
              <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--color-ink-muted)" }}>
                Captures the current tokens.xyz SpaceX page as an editable critique surface. Use the numbered pins to document what the
                redesign directions are solving and where the live experience still needs context.
              </p>
            </Link>
          </div>
        </section>

        {/* Spot/Futures/Liquidity exploration */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ margin: "0 0 12px", fontSize: 21, fontWeight: 600 }}>4 · Exploration: Spot / Futures / Liquidity</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>Selected — Market filter tabs</span>
                <span style={{ background: "rgba(81,193,72,0.15)", color: "#4AA651", fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6 }}>
                  Selected
                </span>
              </div>
              <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--color-ink-muted)" }}>
                <strong>Solves:</strong> the module no longer competes with variants for attention; it&apos;s clearly a lens on markets,
                not a different product. <strong>Clearer:</strong> what the toggle changes (the market list, nothing else). Futures
                shows an honest empty state instead of vanishing. <strong>Tradeoff:</strong> availability per variant isn&apos;t visible
                until you filter — you can&apos;t see at a glance that SPCXon has no pools.
              </p>
            </div>
            <div style={cardStyle}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>Alternative — Task-based labels (Trade / Hedge / Provide Liquidity)</span>
              <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--color-ink-muted)" }}>
                <strong>Solves:</strong> maps to user intent rather than market jargon; friendliest for retail. <strong>Clearer:</strong>{" "}
                what the user will accomplish. <strong>Tradeoff:</strong> intent labels are actions, and this page is an evaluation
                surface — &quot;Hedge&quot; with zero futures markets is a broken promise, and institutional users distrust marketing
                verbs on data pages. Rejected for this surface.
              </p>
            </div>
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>Alternative — Availability metadata in the variant table</span>
                <span style={{ background: "rgba(81,193,72,0.15)", color: "#4AA651", fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6 }}>
                  Not included
                </span>
              </div>
              <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--color-ink-muted)" }}>
                <strong>Solves:</strong> market-type availability becomes a comparison attribute (Spot ✓ · LP ✓ · Perps —), visible per
                variant without any interaction. <strong>Clearer:</strong> the shape of each product&apos;s market structure at a glance.
                <strong>Tradeoff:</strong> chips add density to each row and duplicate the market filters already available in the chosen
                direction.
              </p>
            </div>
          </div>
        </section>

        {/* Dropdown exploration */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ margin: "0 0 12px", fontSize: 21, fontWeight: 600 }}>5 · Exploration: the &quot;5+ variants&quot; dropdown</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>Alternative — Remove it</span>
                <span style={{ background: "rgba(81,193,72,0.15)", color: "#4AA651", fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6 }}>
                  Not included
                </span>
              </div>
              <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--color-ink-muted)" }}>
                Removing it is only safe when the comparison module is already visible near the top. In the chosen direction, the chart
                still leads the page, so the chip remains useful as a jump link.
              </p>
            </div>
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>Selected — Keep as jump link</span>
                <span style={{ background: "rgba(81,193,72,0.15)", color: "#4AA651", fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6 }}>
                  Selected
                </span>
              </div>
              <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--color-ink-muted)" }}>
                The page keeps the chart on top, so variants sit below the fold; the header chip (&quot;5 variants · 4 issuers ↓&quot;)
                preserves the current page&apos;s scent — you learn immediately that this asset is plural — but clicking scrolls to the
                single comparison module instead of opening a redundant card list. Zero duplication, familiar affordance.
              </p>
            </div>
            <div style={cardStyle}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>Alternative — Keep as quick switcher</span>
              <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--color-ink-muted)" }}>
                A compact switcher implies the page re-renders per variant — which recreates the old &quot;am I looking at asset or
                variant data?&quot; ambiguity the IA just fixed. Worth revisiting only if per-variant sub-pages return (e.g. deep-linked
                variant views). Rejected for now.
              </p>
            </div>
          </div>
        </section>

        {/* Removed / merged / demoted */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ margin: "0 0 12px", fontSize: 21, fontWeight: 600 }}>6 · Removed, merged, demoted</h2>
          <DecisionsTable />
        </section>

        {/* Audiences */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ margin: "0 0 12px", fontSize: 21, fontWeight: 600 }}>7 · How the direction serves each audience</h2>
          <AudiencesList />
        </section>

        {/* Recommendation */}
        <section style={{ marginTop: 48, background: "var(--color-dark)", borderRadius: 22, padding: 32, color: "var(--color-surface-raised)" }}>
          <h2 style={{ margin: "0 0 16px", fontSize: 21, fontWeight: 600 }}>8 · Recommendation</h2>
          <div style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.85)", display: "flex", flexDirection: "column", gap: 14 }}>
            <p style={{ margin: 0 }}>
              <strong style={{ color: "var(--color-surface-raised)" }}>Ship the evolved current experience.</strong> It fixes every named defect — variant repetition, the
              misleading &quot;View 18 more&quot;, hidden overview data, missing access context, the competing Spot/Futures module, the
              unexplained score — while staying recognizable to the existing audience. Low regression risk, incremental engineering,
              immediately testable against the live page.
            </p>
            <p style={{ margin: 0 }}>
              <strong style={{ color: "var(--color-surface-raised)" }}>Tradeoffs to weigh:</strong> the page still leads with price and chart,
              so issuer credibility has to be carried by the variant comparison module, access labels, verification signals, and market
              health explanation. That keeps the experience familiar, but the product must be disciplined about reducing repetition below
              the fold.
            </p>
          </div>
        </section>

        <div style={{ marginTop: 40, fontSize: 13, color: "var(--color-ink-subtle)", lineHeight: 1.6 }}>
          Copy rules applied throughout: no &quot;compliant&quot; claims; access labels limited to Open / Restricted / KYC required /
          Check issuer / Unknown; issuer statements attributed (&quot;issuer-stated&quot;); market-health score explicitly framed as not
          a regulatory rating.
        </div>
      </main>
      </div>
    </PrototypeShell>
  );
}
