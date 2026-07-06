"use client";

import Avatar from "@/components/Avatar";
import InfoTip from "@/components/InfoTip";
import RollingPrice from "@/components/RollingPrice";
import SegmentedControl from "@/components/SegmentedControl";
import { AGGREGATORS_A, VENUES_A, PERIOD_MAP, STATS_BASE, CHART_TOOLTIPS, type RangeKey } from "@/lib/dataA";
import { Fragment, useState } from "react";
import {
  AssetChartAxisLabels,
  AssetChartPlot,
  useChartModeDropKey,
  type ChartPlotMode,
} from "@/components/variation-a/AssetChartPlot";

const RANGE_TABS: { key: RangeKey; label: string }[] = [
  { key: "LIVE", label: "Live" },
  { key: "1D", label: "24H" },
  { key: "1W", label: "1W" },
  { key: "30D", label: "30D" },
  { key: "ALL", label: "ALL" },
];

const CURRENT_PRICE = 188.87;
const ACTIVE_COLOR = "var(--color-ink)";
const INACTIVE_COLOR = "var(--color-ink-muted)";
const CHANGE_DOWN_COLOR = "var(--color-down)";
const UP_COLOR = "var(--color-up)";
const PILL_BG = "var(--color-pill-track)";

function LineIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M14.6667 5.33333L9.11113 10.6667L4.66667 6.4L1.33333 9.6"
        stroke={active ? ACTIVE_COLOR : INACTIVE_COLOR}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CandleIcon({ active }: { active: boolean }) {
  const stroke = active ? ACTIVE_COLOR : INACTIVE_COLOR;
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4.44446 3.55556V7.11114" stroke={stroke} strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M5.33333 7.11112H3.55555C3.06463 7.11112 2.66667 7.50906 2.66667 7.99999V11.5556C2.66667 12.0465 3.06463 12.4445 3.55555 12.4445H5.33333C5.82425 12.4445 6.22222 12.0465 6.22222 11.5556V7.99999C6.22222 7.50906 5.82425 7.11112 5.33333 7.11112Z"
        stroke={stroke}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4.44446 12.4445V14.2223" stroke={stroke} strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.5555 1.77777V3.55554" stroke={stroke} strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M12.4445 3.55556H10.6667C10.1757 3.55556 9.77779 3.95354 9.77779 4.44446V9.7778C9.77779 10.2687 10.1757 10.6667 10.6667 10.6667H12.4445C12.9354 10.6667 13.3333 10.2687 13.3333 9.7778V4.44446C13.3333 3.95354 12.9354 3.55556 12.4445 3.55556Z"
        stroke={stroke}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11.5555 10.6667V13.3333" stroke={stroke} strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
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

function BuyPanel() {
  return (
    <aside
      style={{
        flex: 1,
        minHeight: 0,
        background: "var(--color-surface-raised)",
        border: "1px solid var(--color-line)",
        borderRadius: 20,
        padding: 20,
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
      }}
    >
      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "var(--color-ink)" }}>Buy SpaceX</h2>
      <p style={{ margin: "8px 0 0", fontSize: 14, color: "var(--color-ink-muted)", lineHeight: 1.5 }}>
        Aggregators route to the best available market automatically. Exchanges list specific pairs.
      </p>

      <div style={{ marginTop: 20, fontSize: 14, fontWeight: 500, color: "var(--color-ink-muted)" }}>Aggregators</div>
      <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 4 }}>
        {AGGREGATORS_A.map((item) => (
          <button
            key={item.name}
            type="button"
            className="hv-buy-row"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: "100%",
              padding: "10px 0",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <ProviderLogo name={item.name} bg={item.bg} initial={item.initial} img={item.img} />
            <span style={{ fontSize: 14, fontWeight: 500, color: "var(--color-ink)", flexShrink: 0 }}>{item.name}</span>
            <span style={{ marginLeft: "auto", color: "var(--color-ink-faint)", flexShrink: 0 }}>
              <ExternalLinkIcon />
            </span>
          </button>
        ))}
      </div>

      <div style={{ marginTop: 20, fontSize: 14, fontWeight: 500, color: "var(--color-ink-muted)" }}>Top trading exchanges</div>
      <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {VENUES_A.map((venue) => (
          <button
            key={venue.name}
            type="button"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 14px",
              border: "1px solid var(--color-line-faint)",
              borderRadius: 12,
              background: "var(--color-surface-raised)",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <ProviderLogo name={venue.name} bg={venue.bg} initial={venue.initial} img={venue.img} />
            <span style={{ fontSize: 14, fontWeight: 500, color: "var(--color-ink)" }}>{venue.name}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

interface ChartCardV2Props {
  range: RangeKey;
  onSelectRange: (range: RangeKey) => void;
}

export default function ChartCardV2({ range, onSelectRange }: ChartCardV2Props) {
  const [mode, setMode] = useState<ChartPlotMode>("line");
  const modeDropKey = useChartModeDropKey(mode);

  const period = PERIOD_MAP[range];
  const rangeLabel = RANGE_TABS.find((tab) => tab.key === range)?.label ?? range;
  const changeSource = range === "LIVE" ? PERIOD_MAP["1D"] : period;
  const displayChg = changeSource.chg.replace(/^[+-]/, "");
  const displayChgDown = changeSource.chg.trim().startsWith("-");
  const displayChangeLabel = range === "LIVE" ? "24H" : rangeLabel;
  const displayChangeColor = displayChgDown ? CHANGE_DOWN_COLOR : UP_COLOR;

  const stats = [
    { label: "Market Cap", value: STATS_BASE[0].value, tip: CHART_TOOLTIPS.marketCap },
    { label: "Liquidity", value: "$8.89M", tip: CHART_TOOLTIPS.liquidity },
    { label: period.volLabel, value: period.vol, tip: CHART_TOOLTIPS.volume(range) },
    { label: "Supply", value: STATS_BASE[1].value, tip: CHART_TOOLTIPS.supply },
    { label: "FDV", value: STATS_BASE[2].value, tip: CHART_TOOLTIPS.fdv },
  ];

  return (
    <section
      className="hv-chartv2-section"
      data-screen-label="Chart v2"
      style={{
        marginTop: 40,
        borderTop: "1px solid var(--color-line)",
        paddingTop: 40,
        paddingBottom: 8,
      }}
    >
      <div className="hv-chartv2-grid">
        <div className="hv-chartv2-head">
          <div className="hv-chartv2-head-price">
            <RollingPrice
              value={CURRENT_PRICE}
              className="num"
              style={{ fontSize: 34, fontWeight: 600, letterSpacing: -0.5 }}
            />
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                color: displayChangeColor,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style={{ transform: displayChgDown ? undefined : "rotate(180deg)" }}>
                <path d="M12 20l-8-10h16z" />
              </svg>
              {displayChg} ({displayChangeLabel})
            </div>
          </div>

          <InfoTip
            tip={CHART_TOOLTIPS.priceDisclaimer(rangeLabel)}
            label="Reference price weighted across all 5 variants."
            style={{
              fontSize: 12,
              color: "var(--color-ink-muted)",
            }}
          />
        </div>

        <div className="hv-chartv2-main">
          <div className="hv-stats-strip" style={{ display: "flex", alignItems: "stretch", flexShrink: 0 }}>
            {stats.map((stat, index) => (
              <Fragment key={stat.label}>
                {index > 0 && <div className="hv-stats-divider" style={{ width: 1, alignSelf: "stretch", background: "var(--color-line)", margin: "0 20px" }} />}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, padding: "4px 0" }}>
                  <div className="num" style={{ fontSize: 17, fontWeight: 600 }}>
                    {stat.value}
                  </div>
                  <InfoTip tip={stat.tip} label={stat.label} style={{ fontSize: 12, color: "var(--color-ink-muted)" }} />
                </div>
              </Fragment>
            ))}
          </div>

          <div
            className="hv-chartv2-plot-wrap"
            style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, marginTop: 12 }}
          >
            <AssetChartPlot range={range} mode={mode} modeDropKey={modeDropKey} plotId="V2" fillHeight />
            <AssetChartAxisLabels range={range} />
          </div>

          <div
            className="hv-chart-controls"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              marginTop: 20,
              flexShrink: 0,
            }}
          >
            <SegmentedControl
              ariaLabel="Chart timeframe"
              value={range}
              onChange={onSelectRange}
              items={RANGE_TABS.map(({ key, label }) => ({ value: key, label }))}
            />

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: "auto" }}>
              <SegmentedControl
                ariaLabel="Chart type"
                compact
                value={mode}
                onChange={setMode}
                items={[
                  { value: "line", content: <LineIcon active={mode === "line"} />, ariaLabel: "Line chart" },
                  { value: "candle", content: <CandleIcon active={mode === "candle"} />, ariaLabel: "Candlestick chart" },
                ]}
              />

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
        </div>

        <div className="hv-chartv2-buy">
          <BuyPanel />
        </div>
      </div>
    </section>
  );
}
