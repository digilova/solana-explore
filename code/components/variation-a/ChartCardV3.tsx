"use client";

import RollingPrice from "@/components/RollingPrice";
import SegmentedControl from "@/components/SegmentedControl";
import AssetSparkPlot from "@/components/variation-a/AssetSparkPlot";
import { PERIOD_MAP, STATS_BASE, getVariantDefsA, type RangeKey } from "@/lib/dataA";
import { useMemo, type ReactNode } from "react";

const RANGE_TABS: { key: RangeKey; label: string }[] = [
  { key: "LIVE", label: "Live" },
  { key: "1D", label: "24H" },
  { key: "1W", label: "1W" },
  { key: "30D", label: "30D" },
  { key: "ALL", label: "ALL" },
];

const CURRENT_PRICE = 188.87;
const COMBINED_LIQUIDITY = "$8.89M";
const PILL_BG = "var(--color-pill-track)";

function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <circle cx="8" cy="8" r="6.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="8" cy="5" r="0.95" fill="currentColor" />
      <rect x="7.3" y="7.1" width="1.4" height="4.6" rx="0.7" fill="currentColor" />
    </svg>
  );
}

function StatCell({ value, label }: { value: string; label: string }) {
  return (
    <div className="hv-chartv3-stat-cell">
      <div className="num hv-chartv3-stat-value">{value}</div>
      <div className="hv-chartv3-stat-label">{label}</div>
    </div>
  );
}

interface ChartCardV3Props {
  range: RangeKey;
  onSelectRange: (range: RangeKey) => void;
  header?: ReactNode;
}

export default function ChartCardV3({ range, onSelectRange, header }: ChartCardV3Props) {
  const period = PERIOD_MAP[range];
  const rangeLabel = RANGE_TABS.find((tab) => tab.key === range)?.label ?? range;
  const changeSource = range === "LIVE" ? PERIOD_MAP["1D"] : period;
  const displayChg = changeSource.chg.replace(/^[+-]/, "");
  const displayChgDown = changeSource.chg.trim().startsWith("-");
  const displayChangeLabel = range === "LIVE" ? "24H" : rangeLabel;
  const displayChangeColor = displayChgDown ? "var(--color-down)" : "var(--color-up)";

  const ecosystemStats = useMemo(() => {
    const defs = getVariantDefsA();
    return {
      variants: String(defs.length),
      issuers: "4",
      markets: String(defs.reduce((sum, v) => sum + v.markets, 0)),
    };
  }, []);

  const volumeLabel = range === "1D" || range === "LIVE" ? "24h vol" : period.volLabel;

  const renderRangeControl = () => (
    <SegmentedControl
      ariaLabel="Chart timeframe"
      value={range}
      onChange={onSelectRange}
      items={RANGE_TABS.map(({ key, label }) => ({ value: key, label }))}
    />
  );

  return (
    <section
      className="hv-chartv3-section"
      data-screen-label="Chart v3"
      style={{
        marginTop: header ? 16 : 40,
        paddingTop: header ? 0 : 20,
      }}
    >
      <div
        className="hv-chart-controls hv-chartv3-controls"
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: header ? "space-between" : "flex-end",
          gap: 8,
          marginBottom: 20,
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        {header}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginLeft: header ? "auto" : undefined }}>
        <div className="hv-chartv3-range-controls hv-chartv3-range-controls--bar">
          {renderRangeControl()}
        </div>

        <button
          type="button"
          aria-label="Share"
          style={{
            border: "none",
            cursor: "pointer",
            width: 36,
            height: 36,
            borderRadius: 9999,
            background: PILL_BG,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ShareIcon />
        </button>
        </div>
      </div>

      <div className="hv-chartv3-markets-shell">
        <div className="hv-chartv3-range-controls hv-chartv3-range-controls--shell">{renderRangeControl()}</div>
        <div className="hv-chartv3-shell hv-variant-card">
          <div className="hv-chartv3-card">
            <div className="hv-chartv3-stats-panel">
            <div className="hv-chartv3-stats-grid">
              <StatCell value={ecosystemStats.variants} label="Variants" />
              <StatCell value={ecosystemStats.issuers} label="Independent issuers" />
              <StatCell value={ecosystemStats.markets} label="Tracked markets" />
              <StatCell value={COMBINED_LIQUIDITY} label="Combined liquidity" />
              <StatCell value={period.vol} label={volumeLabel} />
              <StatCell value={STATS_BASE[1].value} label="Supply" />
            </div>
          </div>

          <div className="hv-chartv3-price-panel">
            <div className="hv-chartv3-price-head">
              <div className="hv-chartv3-price-block">
                <RollingPrice value={CURRENT_PRICE} className="num hv-chartv3-price" />
                <div className="hv-chartv3-change" style={{ color: displayChangeColor }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ transform: displayChgDown ? undefined : "rotate(180deg)" }}>
                    <path d="M12 20l-8-10h16z" />
                  </svg>
                  {displayChg}%({displayChangeLabel})
                </div>
              </div>
              <button
                type="button"
                aria-label="Reference price info"
                className="hv-chartv3-info-btn"
                style={{
                  width: 16,
                  height: 16,
                  border: "none",
                  background: "transparent",
                  color: "var(--color-ink)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 2,
                  padding: 0,
                  cursor: "default",
                  lineHeight: 1,
                }}
              >
                <InfoIcon />
              </button>
            </div>
            <div className="hv-chartv3-spark-wrap">
              <AssetSparkPlot range={range} plotId="V3" />
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
