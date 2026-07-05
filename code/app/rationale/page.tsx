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
          Why the SpaceX page should change, what the redesign keeps, and what it removes.
        </p>

        {/* User assumptions */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ margin: "0 0 12px", fontSize: 21, fontWeight: 600 }}>1 · Who this is for</h2>
          <p style={{ margin: "0 0 16px", fontSize: 15, lineHeight: 1.65, color: "var(--color-ink-muted)" }}>
            The page still needs to work for traders, but it should make issuers and serious buyers feel oriented sooner.
          </p>
          <div className="hv-rationale-user-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 }}>
            <div style={cardStyle}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-ink-subtle)", textTransform: "uppercase", letterSpacing: 0.4 }}>
                Primary
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, marginTop: 6 }}>Asset issuers</div>
              <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--color-ink-muted)" }}>
                They need to see identity, access rules, liquidity, and market structure quickly. A chart alone does not make the asset
                feel credible.
              </p>
            </div>
            <div style={cardStyle}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-ink-subtle)", textTransform: "uppercase", letterSpacing: 0.4 }}>
                Active users
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, marginTop: 6 }}>Traders and crypto-native investors</div>
              <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--color-ink-muted)" }}>
                They need price, liquidity, venues, and a fast path to trade. The redesign adds context without hiding the familiar flow.
              </p>
            </div>
            <div style={cardStyle}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-ink-subtle)", textTransform: "uppercase", letterSpacing: 0.4 }}>
                Diligence users
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, marginTop: 6 }}>Sophisticated investors</div>
              <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--color-ink-muted)" }}>
                They compare issuer, backing, restrictions, depth, and activity. A ticker is not enough.
              </p>
            </div>
          </div>
        </section>

        {/* IA */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ margin: "0 0 12px", fontSize: 21, fontWeight: 600 }}>2 · Page structure</h2>
          <p style={{ margin: "0 0 16px", fontSize: 15, lineHeight: 1.65, color: "var(--color-ink-muted)" }}>
            The current page repeats the same ideas in different places. The redesign gives each level one clear home:
          </p>
          <div style={{ background: "var(--color-surface-raised)", border: "1px solid var(--color-line)", borderRadius: 16, padding: "20px 24px", fontSize: 14, lineHeight: 1.7 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div>
                <strong>Asset</strong>{" "}
                <span style={{ color: "var(--color-ink-muted)" }}>
                  — SpaceX. Shows the reference price, aggregate stats, and market health across all variants.
                </span>
              </div>
              <div style={{ paddingLeft: 20 }}>
                <strong>Variant / Issuer</strong>{" "}
                <span style={{ color: "var(--color-ink-muted)" }}>
                  — SPCX, SPCXx, TSPX, SPACEX, SPCXon. Each variant gets issuer, backing, access, and market details in one place.
                </span>
              </div>
              <div style={{ paddingLeft: 40 }}>
                <strong>Market / Venue</strong>{" "}
                <span style={{ color: "var(--color-ink-muted)" }}>
                  — Orca, Meteora, Raydium, Byreal, Kamino. Markets live inside the relevant variant.
                </span>
              </div>
              <div style={{ paddingLeft: 60 }}>
                <strong>Pair</strong> <span style={{ color: "var(--color-ink-muted)" }}>— SPCX/USDC and similar rows inside a market list.</span>
              </div>
            </div>
          </div>
          <p style={{ margin: "16px 0 0", fontSize: 15, lineHeight: 1.65, color: "var(--color-ink-muted)" }}>
            Main rule: <strong>show each variant once</strong>. The header chip becomes a jump link. Markets sit under the variant they
            belong to. The separate variant page becomes the expanded state.
          </p>
        </section>

        {/* Direction and audit */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ margin: "0 0 12px", fontSize: 21, fontWeight: 600 }}>3 · Direction</h2>
          <div className="hv-rationale-directions-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
            <Link href="/variation-a" className="hv-rationale-card" style={{ display: "block", ...cardStyle, color: "var(--color-ink)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-ink-subtle)", textTransform: "uppercase", letterSpacing: 0.4 }}>
                Product direction
              </div>
              <div style={{ fontSize: 17, fontWeight: 600, marginTop: 6 }}>Keep the familiar page shape</div>
              <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--color-ink-muted)" }}>
                Keep the chart, stats, and market flow. Add issuer names, access labels, inline market details, and a clearer health
                score.
              </p>
            </Link>
            <Link href="/current-audit" className="hv-rationale-card" style={{ display: "block", ...cardStyle, color: "var(--color-ink)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-ink-subtle)", textTransform: "uppercase", letterSpacing: 0.4 }}>
                Current audit
              </div>
              <div style={{ fontSize: 17, fontWeight: 600, marginTop: 6 }}>Current page audit</div>
              <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--color-ink-muted)" }}>
                The numbered pins call out what feels confusing, repetitive, or underspecified in the current page.
              </p>
            </Link>
          </div>
        </section>

        {/* Spot/Futures/Liquidity exploration */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ margin: "0 0 12px", fontSize: 21, fontWeight: 600 }}>4 · Market filters</h2>
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
                not a different product. <strong>Tradeoff:</strong> users need to filter before they see which variants have no pools.
              </p>
            </div>
            <div style={cardStyle}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>Alternative — Task-based labels (Trade / Hedge / Provide Liquidity)</span>
              <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--color-ink-muted)" }}>
                This is friendlier, but too action-heavy for an evaluation page. &quot;Hedge&quot; also breaks down when there are no futures
                markets.
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
                This makes availability scannable, but adds another row of chips to an already dense table.
              </p>
            </div>
          </div>
        </section>

        {/* Dropdown exploration */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ margin: "0 0 12px", fontSize: 21, fontWeight: 600 }}>5 · Variants chip</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>Alternative — Remove it</span>
                <span style={{ background: "rgba(81,193,72,0.15)", color: "#4AA651", fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6 }}>
                  Not included
                </span>
              </div>
              <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--color-ink-muted)" }}>
                Removing it hides an important signal: this asset has multiple versions. Since the chart comes first, the chip still has a job.
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
                The chip tells users the asset is plural, then sends them to the one comparison module. No duplicate dropdown needed.
              </p>
            </div>
            <div style={cardStyle}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>Alternative — Keep as quick switcher</span>
              <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--color-ink-muted)" }}>
                A switcher makes it unclear whether the page is showing the whole asset or one variant. That is the confusion this redesign
                is trying to remove.
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
          <h2 style={{ margin: "0 0 12px", fontSize: 21, fontWeight: 600 }}>7 · Audience fit</h2>
          <AudiencesList />
        </section>

        {/* Recommendation */}
        <section style={{ marginTop: 48, background: "var(--color-dark)", borderRadius: 22, padding: 32, color: "var(--color-surface-raised)" }}>
          <h2 style={{ margin: "0 0 16px", fontSize: 21, fontWeight: 600 }}>8 · Recommendation</h2>
          <div style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.85)", display: "flex", flexDirection: "column", gap: 14 }}>
            <p style={{ margin: 0 }}>
              <strong style={{ color: "var(--color-surface-raised)" }}>Ship the evolved current experience.</strong> It removes repetition,
              explains the variants, adds access context, and keeps the page recognizable.
            </p>
            <p style={{ margin: 0 }}>
              <strong style={{ color: "var(--color-surface-raised)" }}>Tradeoff:</strong> the chart still leads. That is good for traders,
              but the variant module has to do more work for issuers and diligence users.
            </p>
          </div>
        </section>

        <div style={{ marginTop: 40, fontSize: 13, color: "var(--color-ink-subtle)", lineHeight: 1.6 }}>
          Copy rule: keep claims specific. Say who the issuer is, what access requires, and where data comes from. Do not imply regulatory
          approval.
        </div>
      </main>
      </div>
    </PrototypeShell>
  );
}
