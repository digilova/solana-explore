"use client";

import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import InfoTip from "@/components/InfoTip";
import RollingPrice from "@/components/RollingPrice";
import SegmentedControl from "@/components/SegmentedControl";
import { useLiveLineChart } from "@/hooks/useLiveLineChart";
import { useLivePrice } from "@/hooks/useLivePrice";
import { PERIOD_MAP, STATS_BASE, CHART_TOOLTIPS, buildChart, formatChartScrubLabel, getChartAxisLabels, getChartScrubTime, type RangeKey } from "@/lib/dataA";

const RANGE_TABS: { key: RangeKey; label: string }[] = [
  { key: "LIVE", label: "Live" },
  { key: "1D", label: "24H" },
  { key: "1W", label: "1W" },
  { key: "30D", label: "30D" },
  { key: "ALL", label: "ALL" },
];

type ChartMode = "line" | "candle";

const PILL_BG = "var(--color-pill-track)";
const ACTIVE_COLOR = "var(--color-ink)";
const INACTIVE_COLOR = "var(--color-ink-muted)";
const UP_COLOR = "var(--color-up)";
const DOWN_COLOR = "var(--color-trend-down)";
const CANDLE_DOWN_COLOR = "var(--color-down)";
const PRICE_CHANGE_DOWN_COLOR = "var(--color-down)";

const CURRENT_PRICE = 188.87;
const PLOT_TOP = 8;
const PLOT_BOTTOM = 190;
const CHART_VIEW_HEIGHT = PLOT_BOTTOM + 4;
const PLOT_Y_INSET = 8;
const PLOT_RIGHT = 800;
const AXIS_GUTTER = 56;
const PLOT_AXIS_GAP = 10;
const PLOT_WIDTH = PLOT_RIGHT - AXIS_GUTTER;
const PLOT_LINE_WIDTH = PLOT_WIDTH - PLOT_AXIS_GAP;
const LIVE_BADGE_W = 68;
const LIVE_BADGE_H = 22;
const LIVE_BADGE_GAP = 10;
const MARKER_DOT_PX = 8;
const PRICE_SPAN = 30;
const Y_TICK_COUNT = 5;
const Y_DOMAIN_PAD = 0.1;

function LineIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "translateX(-1px)" }}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function pathFromPoints(points: [number, number][], cornerRadius = 2) {
  if (points.length < 3) {
    return "M" + points.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" L");
  }
  const fmt = (n: number) => n.toFixed(1);
  let d = `M${fmt(points[0][0])},${fmt(points[0][1])}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i - 1];
    const [x, y] = points[i];
    const [nx, ny] = points[i + 1];
    const distPrev = Math.hypot(x - px, y - py);
    const distNext = Math.hypot(nx - x, ny - y);
    const rIn = Math.min(cornerRadius, distPrev / 2);
    const rOut = Math.min(cornerRadius, distNext / 2);
    const inX = x + ((px - x) / (distPrev || 1)) * rIn;
    const inY = y + ((py - y) / (distPrev || 1)) * rIn;
    const outX = x + ((nx - x) / (distNext || 1)) * rOut;
    const outY = y + ((ny - y) / (distNext || 1)) * rOut;
    d += ` L${fmt(inX)},${fmt(inY)} Q${fmt(x)},${fmt(y)} ${fmt(outX)},${fmt(outY)}`;
  }
  const last = points[points.length - 1];
  d += ` L${fmt(last[0])},${fmt(last[1])}`;
  return d;
}

function niceStep(rawStep: number) {
  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const normalized = rawStep / magnitude;
  const niceNormalized = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return niceNormalized * magnitude;
}

function formatAxisPrice(price: number, precise = false) {
  if (precise) return "$" + price.toFixed(2);
  return "$" + price.toFixed(price >= 100 ? 0 : 2);
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

const LINE_ANIM_MS = 420;
const CHART_SCALE = PLOT_LINE_WIDTH / PLOT_RIGHT;

type PlottedCandle = { x: number; open: number; high: number; low: number; close: number };

type ChartHover = {
  viewX: number;
  dataX: number;
  dotY: number;
  price: number;
  timeLabel: string;
};

const MARKER_R = MARKER_DOT_PX / 2;

function interpolateLineAtX(points: [number, number][], x: number): [number, number] | null {
  if (points.length === 0) return null;
  if (x <= points[0][0]) return points[0];
  if (x >= points[points.length - 1][0]) return points[points.length - 1];
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    if (x >= x0 && x <= x1) {
      const t = (x - x0) / (x1 - x0 || 1);
      return [x, y0 + t * (y1 - y0)];
    }
  }
  return points[points.length - 1];
}

function priceFromPlotY(y: number, domainMin: number, domainMax: number) {
  const span = Math.max(domainMax - domainMin, 0.01);
  const innerTop = PLOT_TOP + PLOT_Y_INSET;
  const innerBottom = PLOT_BOTTOM - PLOT_Y_INSET;
  return domainMax - ((y - innerTop) / (innerBottom - innerTop)) * span;
}

function plotYForPrice(price: number, domainMin: number, domainMax: number) {
  const span = Math.max(domainMax - domainMin, 0.01);
  const innerTop = PLOT_TOP + PLOT_Y_INSET;
  const innerBottom = PLOT_BOTTOM - PLOT_Y_INSET;
  return innerTop + ((domainMax - price) / span) * (innerBottom - innerTop);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpLinePoints(from: [number, number][], to: [number, number][], t: number): [number, number][] {
  if (from.length !== to.length) return to;
  return to.map((p, i) => [p[0], lerp(from[i][1], p[1], t)]);
}

function lerpCandles(from: PlottedCandle[], to: PlottedCandle[], t: number): PlottedCandle[] {
  if (from.length !== to.length) return to;
  return to.map((c, i) => ({
    x: c.x,
    open: lerp(from[i].open, c.open, t),
    high: lerp(from[i].high, c.high, t),
    low: lerp(from[i].low, c.low, t),
    close: lerp(from[i].close, c.close, t),
  }));
}

function useChartMorph<T>(
  target: T,
  active: boolean,
  sessionKey: string,
  blend: (from: T, to: T, t: number) => T,
) {
  const targetRef = useRef(target);
  targetRef.current = target;

  const [value, setValue] = useState(target);
  const valueRef = useRef(target);

  useEffect(() => {
    const to = targetRef.current;

    if (!active) {
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(to);
      valueRef.current = to;
      return;
    }

    const from = valueRef.current;
    let raf = 0;
    const start = performance.now();

    const step = (now: number) => {
      const t = easeOutCubic(Math.min(1, (now - start) / LINE_ANIM_MS));
      const next = blend(from, to, t);
      setValue(next);
      valueRef.current = next;
      if (t < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [sessionKey, active]);

  return value;
}

interface ChartCardProps {
  range: RangeKey;
  onSelectRange: (r: RangeKey) => void;
}

export default function ChartCard({ range, onSelectRange }: ChartCardProps) {
  const [mode, setMode] = useState<ChartMode>("line");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const prevModeRef = useRef<ChartMode | null>(null);
  const [modeDropKey, setModeDropKey] = useState(0);
  const [hover, setHover] = useState<ChartHover | null>(null);
  const plotRef = useRef<HTMLDivElement>(null);
  const pointerXRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (prevModeRef.current !== null && prevModeRef.current !== mode) {
      setModeDropKey((k) => k + 1);
    }
    prevModeRef.current = mode;
  }, [mode]);

  const chart = useMemo(() => buildChart(range), [range]);
  const period = PERIOD_MAP[range];
  const ticks = useMemo(() => getChartAxisLabels(range), [range]);
  const stats = [
    { label: "Market Cap", value: STATS_BASE[0].value, tip: CHART_TOOLTIPS.marketCap },
    { label: "Liquidity", value: "$8.89M", tip: CHART_TOOLTIPS.liquidity },
    { label: period.volLabel, value: period.vol, tip: CHART_TOOLTIPS.volume(range) },
    { label: "Supply", value: STATS_BASE[1].value, tip: CHART_TOOLTIPS.supply },
    { label: "FDV", value: STATS_BASE[2].value, tip: CHART_TOOLTIPS.fdv },
  ];

  const isDown = period.chg.trim().startsWith("-");
  const trendColor = isDown ? DOWN_COLOR : UP_COLOR;
  const lineChartColor = DOWN_COLOR;
  const rangeLabel = RANGE_TABS.find((t) => t.key === range)?.label ?? range;
  const changeSource = range === "LIVE" ? PERIOD_MAP["1D"] : period;
  const displayChg = changeSource.chg.replace(/^[+-]/, "");
  const displayChgDown = changeSource.chg.trim().startsWith("-");
  const displayChangeColor = displayChgDown ? PRICE_CHANGE_DOWN_COLOR : UP_COLOR;
  const displayChangeLabel = range === "LIVE" ? "24H" : rangeLabel;

  const plotCenter = (PLOT_TOP + PLOT_BOTTOM) / 2;
  const pricePerPx = PRICE_SPAN / (PLOT_BOTTOM - PLOT_TOP);

  const priceFromValue = (value: number) => CURRENT_PRICE + (plotCenter - value) * pricePerPx;
  const linePrices = chart.points.map((point) => priceFromValue(point[1]));
  const candlePrices = chart.candles.flatMap((candle) => [priceFromValue(candle.high), priceFromValue(candle.low)]);
  const activePrices = mode === "line" ? linePrices : candlePrices;
  const priceMin = Math.min(...activePrices);
  const priceMax = Math.max(...activePrices);
  const priceStep = niceStep(Math.max(1, priceMax - priceMin) / (Y_TICK_COUNT - 1));
  const domainMinRaw = Math.max(0, Math.floor(priceMin / priceStep) * priceStep);
  const domainMaxRaw = Math.ceil(priceMax / priceStep) * priceStep;
  const yPad = (domainMaxRaw - domainMinRaw) * Y_DOMAIN_PAD;
  const domainMin = Math.max(0, domainMinRaw - yPad);
  const domainMax = domainMaxRaw + yPad;
  const domainSpan = Math.max(1, domainMax - domainMin);
  const mapY = (value: number) => plotYForPrice(priceFromValue(value), domainMin, domainMax);

  const linePoints = useMemo(
    () => chart.points.map(([x, y]) => [x, mapY(y)] as [number, number]),
    [chart.points, domainMax, domainMin, domainSpan],
  );
  const plottedCandles = useMemo(
    () =>
      chart.candles.map((candle) => ({
        x: candle.x,
        open: mapY(candle.open),
        high: mapY(candle.high),
        low: mapY(candle.low),
        close: mapY(candle.close),
      })),
    [chart.candles, domainMax, domainMin, domainSpan],
  );

  const lineSessionKey = `${range}-line`;
  const candleSessionKey = `${range}-candle`;
  const liveHeaderPrice = useLivePrice(CURRENT_PRICE, !prefersReducedMotion);
  const liveEnabled = range === "LIVE" && mode === "line" && !prefersReducedMotion;
  const { points: liveLinePoints, displayPrice, domainMin: liveDomainMin, domainMax: liveDomainMax } = useLiveLineChart(
    linePoints,
    {
      enabled: liveEnabled,
      sessionKey: lineSessionKey,
      plotTop: PLOT_TOP,
      plotBottom: PLOT_BOTTOM,
      anchorPrice: CURRENT_PRICE,
    },
  );
  const animatedLinePoints = useChartMorph(linePoints, mode === "line" && !liveEnabled, lineSessionKey, lerpLinePoints);
  const animatedCandles = useChartMorph(plottedCandles, mode === "candle", candleSessionKey, lerpCandles);

  const displayLinePoints = liveEnabled ? liveLinePoints : mode === "line" ? animatedLinePoints : linePoints;
  const displayCandles = mode === "candle" ? animatedCandles : plottedCandles;
  const headerPrice = liveHeaderPrice;
  const linePath = pathFromPoints(displayLinePoints);
  const viewLinePoints = useMemo(
    () => displayLinePoints.map(([x, y]) => [x * CHART_SCALE, y] as [number, number]),
    [displayLinePoints],
  );
  const viewAreaPath = pathFromPoints(viewLinePoints) + ` L${PLOT_LINE_WIDTH},${PLOT_BOTTOM} L0,${PLOT_BOTTOM} Z`;

  const lastPoint = displayLinePoints[displayLinePoints.length - 1];
  const lastCandle = displayCandles[displayCandles.length - 1];
  const markerX = mode === "candle" ? lastCandle.x : lastPoint[0];
  const markerY = mode === "candle" ? lastCandle.close : lastPoint[1];
  const markerViewX = markerX * CHART_SCALE;
  const markerViewY = markerY;
  const liveBadgeViewLeft = (() => {
    const preferRight = markerViewX + LIVE_BADGE_GAP;
    if (preferRight + LIVE_BADGE_W <= PLOT_LINE_WIDTH - 4) return preferRight;
    return Math.max(4, markerViewX - LIVE_BADGE_W - LIVE_BADGE_GAP);
  })();

  const yTicks = (() => {
    if (liveEnabled) {
      const span = Math.max(liveDomainMax - liveDomainMin, 0.05);
      const step = niceStep(span / (Y_TICK_COUNT - 1));
      return Array.from({ length: Y_TICK_COUNT }, (_, i) => {
        const price = liveDomainMax - i * step;
        const y = plotYForPrice(price, liveDomainMin, liveDomainMax);
        return { y, price };
      }).filter((tick) => tick.price >= liveDomainMin - step * 0.01);
    }

    return Array.from({ length: Y_TICK_COUNT }, (_, i) => {
      const price = domainMax - i * priceStep;
      const y = plotYForPrice(price, domainMin, domainMax);
      return { y, price };
    }).filter((tick) => tick.price >= domainMin);
  })();

  const candleWidth = PLOT_RIGHT / chart.candles.length - 4;

  const scrubDomainMin = liveEnabled ? liveDomainMin : domainMin;
  const scrubDomainMax = liveEnabled ? liveDomainMax : domainMax;

  const scrubAtClientX = useCallback(
    (clientX: number) => {
      const plot = plotRef.current;
      if (!plot) return;

      const rect = plot.getBoundingClientRect();
      const plotWidthPx = rect.width * (PLOT_LINE_WIDTH / PLOT_RIGHT);
      const offsetX = clientX - rect.left;
      if (offsetX < 0 || offsetX > plotWidthPx) {
        setHover(null);
        return;
      }

      const viewX = (offsetX / rect.width) * PLOT_RIGHT;
      const dataX = viewX / CHART_SCALE;
      const fraction = dataX / PLOT_RIGHT;
      const timeLabel = formatChartScrubLabel(range, getChartScrubTime(range, fraction));

      if (mode === "line") {
        const hit = interpolateLineAtX(displayLinePoints, dataX);
        if (!hit) return;
        setHover({
          viewX: hit[0] * CHART_SCALE,
          dataX: hit[0],
          dotY: hit[1],
          price: priceFromPlotY(hit[1], scrubDomainMin, scrubDomainMax),
          timeLabel,
        });
        return;
      }

      const nearest = displayCandles.reduce<(typeof displayCandles)[number] | null>((best, candle) => {
        if (!best) return candle;
        return Math.abs(candle.x - dataX) < Math.abs(best.x - dataX) ? candle : best;
      }, null);
      if (!nearest) return;

      setHover({
        viewX: nearest.x * CHART_SCALE,
        dataX: nearest.x,
        dotY: nearest.close,
        price: priceFromPlotY(nearest.close, scrubDomainMin, scrubDomainMax),
        timeLabel,
      });
    },
    [mode, displayLinePoints, displayCandles, range, scrubDomainMin, scrubDomainMax],
  );

  useEffect(() => {
    if (pointerXRef.current == null) return;
    scrubAtClientX(pointerXRef.current);
  }, [scrubAtClientX, displayLinePoints, displayCandles]);

  useEffect(() => {
    setHover(null);
  }, [range, mode, liveEnabled]);

  return (
    <section
      data-screen-label="Chart"
      style={{
        marginTop: 40,
        borderTop: "1px solid var(--color-line)",
        paddingTop: 40,
        paddingBottom: 8,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
            {prefersReducedMotion ? (
              <span className="num" style={{ fontSize: 34, fontWeight: 600, letterSpacing: -0.5 }}>
                ${headerPrice.toFixed(2)}
              </span>
            ) : (
              <RollingPrice
                value={headerPrice}
                className="num"
                style={{ fontSize: 34, fontWeight: 600, letterSpacing: -0.5 }}
              />
            )}
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: displayChangeColor, fontSize: 13, fontWeight: 600 }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style={{ transform: displayChgDown ? undefined : "rotate(180deg)" }}>
                <path d="M12 20l-8-10h16z"></path>
              </svg>
              {displayChg} ({displayChangeLabel})
            </span>
          </div>
          <InfoTip
            tip={CHART_TOOLTIPS.priceDisclaimer(rangeLabel)}
            label="Weighted reference price across 5 variants."
            style={{ fontSize: 12, color: "var(--color-ink-muted)", marginTop: 6 }}
          />
        </div>

        <div className="hv-chart-controls" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <SegmentedControl
            ariaLabel="Chart timeframe"
            value={range}
            onChange={onSelectRange}
            items={RANGE_TABS.map(({ key, label }) => ({ value: key, label }))}
            getSegmentStyle={(selected) => ({
              fontSize: 13,
              padding: "6px 14px",
              fontWeight: selected ? 600 : 400,
            })}
          />

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

      <div style={{ marginTop: 12 }}>
        <div
          ref={plotRef}
          style={{ position: "relative", cursor: "crosshair" }}
          onMouseMove={(e) => {
            pointerXRef.current = e.clientX;
            scrubAtClientX(e.clientX);
          }}
          onMouseLeave={() => {
            pointerXRef.current = null;
            setHover(null);
          }}
        >
        <svg className="hv-chart-svg" viewBox={`0 0 ${PLOT_RIGHT} ${CHART_VIEW_HEIGHT}`} style={{ width: "100%", height: "auto", display: "block", pointerEvents: "none", overflow: "hidden" }} preserveAspectRatio="none">
          <defs>
            <clipPath id="chartPlotClipA">
              <rect x="0" y={PLOT_TOP} width={PLOT_LINE_WIDTH} height={PLOT_BOTTOM - PLOT_TOP} />
            </clipPath>
            <pattern id="chartDotPatternA" width="2" height="2" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.5" fill={lineChartColor} opacity="0.42" />
            </pattern>
            <linearGradient id="chartFillFadeA" gradientUnits="userSpaceOnUse" x1="0" y1={PLOT_TOP} x2="0" y2={PLOT_BOTTOM}>
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="55%" stopColor="white" stopOpacity="0.32" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="chartFillMaskA">
              <rect x="0" y={PLOT_TOP} width={PLOT_LINE_WIDTH} height={PLOT_BOTTOM - PLOT_TOP} fill="url(#chartFillFadeA)" />
            </mask>
          </defs>
          {yTicks.map((t, i) => (
            <line key={i} x1={0} y1={t.y} x2={PLOT_LINE_WIDTH} y2={t.y} stroke="var(--color-line)" strokeWidth={1} strokeDasharray="2 4" vectorEffect="non-scaling-stroke"></line>
          ))}
          {hover && (
            <line x1={hover.viewX} y1={PLOT_TOP} x2={hover.viewX} y2={PLOT_BOTTOM} stroke="var(--color-line-strong)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
          )}
          <g clipPath="url(#chartPlotClipA)">
          {mode === "line" && (
            <path d={viewAreaPath} fill="url(#chartDotPatternA)" mask="url(#chartFillMaskA)" />
          )}
          <g transform={`scale(${CHART_SCALE} 1)`}>
            <g key={`${mode}-${modeDropKey}`} className={modeDropKey > 0 ? "chart-mode-enter" : undefined}>
              {mode === "line" ? (
                <>
                  <path d={linePath} fill="none" stroke={lineChartColor} strokeWidth={1.5} strokeLinejoin="round" vectorEffect="non-scaling-stroke"></path>
                </>
              ) : (
                displayCandles.map((c, i) => {
                  const up = c.close < c.open;
                  const color = up ? UP_COLOR : CANDLE_DOWN_COLOR;
                  const bodyTop = Math.min(c.open, c.close);
                  const bodyBottom = Math.max(c.open, c.close);
                  return (
                    <g key={i}>
                      <line x1={c.x} y1={c.high} x2={c.x} y2={c.low} stroke={color} strokeWidth={1.4} vectorEffect="non-scaling-stroke"></line>
                      <rect x={c.x - candleWidth / 2} y={bodyTop} width={candleWidth} height={Math.max(2, bodyBottom - bodyTop)} fill={color} rx={1}></rect>
                    </g>
                  );
                })
              )}
            </g>
          </g>
          </g>
          {!hover && (
            <line
              x1={0}
              y1={markerViewY}
              x2={PLOT_LINE_WIDTH}
              y2={markerViewY}
              stroke={mode === "line" ? lineChartColor : trendColor}
              strokeOpacity={0.35}
              strokeWidth={1}
              strokeDasharray="4 4"
              vectorEffect="non-scaling-stroke"
            />
          )}
          {hover && (
            <ellipse
              cx={hover.viewX}
              cy={hover.dotY}
              rx={MARKER_R}
              ry={MARKER_R}
              fill={lineChartColor}
              stroke="var(--color-surface-raised)"
              strokeWidth={2}
            />
          )}
          {mode === "line" && !hover && (
            <ellipse
              cx={markerViewX}
              cy={markerViewY}
              rx={MARKER_R}
              ry={MARKER_R}
              fill="var(--color-surface-raised)"
              stroke={lineChartColor}
              strokeWidth={2}
            />
          )}
          {mode === "line" && !hover && liveEnabled && (
            <g transform={`translate(${liveBadgeViewLeft}, ${markerViewY - LIVE_BADGE_H / 2})`}>
              <rect width={LIVE_BADGE_W} height={LIVE_BADGE_H} rx={11} fill={lineChartColor} />
              <text
                x={LIVE_BADGE_W / 2}
                y={15}
                textAnchor="middle"
                fill="white"
                fontSize={11}
                fontWeight={600}
                style={{ fontFamily: "inherit", fontVariantNumeric: "tabular-nums" }}
              >
                ${displayPrice.toFixed(2)}
              </text>
            </g>
          )}
        </svg>
        {hover && (
          <div
            style={{
              position: "absolute",
              left: `${(hover.viewX / PLOT_RIGHT) * 100}%`,
              top: `${(hover.dotY / CHART_VIEW_HEIGHT) * 100}%`,
              transform: "translate(-50%, calc(-100% - 10px))",
              display: "flex",
              alignItems: "center",
              gap: 6,
              pointerEvents: "none",
              whiteSpace: "nowrap",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            <span className="num" style={{ color: lineChartColor, fontWeight: 600 }}>
              ${hover.price.toFixed(2)}
            </span>
            <span style={{ color: "var(--color-ink-faint)" }}>·</span>
            <span style={{ color: "var(--color-ink-muted)" }}>{hover.timeLabel}</span>
          </div>
        )}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: `${(AXIS_GUTTER / PLOT_RIGHT) * 100}%`,
            pointerEvents: "none",
          }}
        >
          {yTicks.map((t, i) => (
            <span
              key={i}
              className="num"
              style={{
                position: "absolute",
                right: 0,
                top: `${(t.y / CHART_VIEW_HEIGHT) * 100}%`,
                transform: "translateY(-50%)",
                fontSize: 12,
                lineHeight: 1,
                color: "var(--color-ink-faint)",
                whiteSpace: "nowrap",
              }}
            >
              {formatAxisPrice(t.price, liveEnabled)}
            </span>
          ))}
        </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--color-ink-faint)", marginTop: 4 }}>
          {ticks.map((t, i) => (
            <span key={`${range}-${i}-${t}`}>{t}</span>
          ))}
        </div>
      </div>

      <div className="hv-stats-strip" style={{ display: "flex", alignItems: "stretch", marginTop: 30 }}>
        {stats.map((s, i) => (
          <Fragment key={s.label}>
            {i > 0 && <div className="hv-stats-divider" style={{ width: 1, alignSelf: "stretch", background: "var(--color-line)", margin: "0 24px" }} />}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, padding: "12px 0" }}>
              <div className="num" style={{ fontSize: 17, fontWeight: 600 }}>
                {s.value}
              </div>
              <InfoTip tip={s.tip} label={s.label} style={{ fontSize: 12, color: "var(--color-ink-muted)" }} />
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
