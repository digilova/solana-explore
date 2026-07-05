"use client";

import { useLiveLineChart } from "@/hooks/useLiveLineChart";
import { buildChart, formatChartScrubLabel, getChartAxisLabels, getChartScrubTime, PERIOD_MAP, type RangeKey } from "@/lib/dataA";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type RefObject } from "react";

export type ChartPlotMode = "line" | "candle";

const CURRENT_PRICE = 188.87;
const PLOT_TOP = 8;
const PLOT_BOTTOM = 190;
const PLOT_Y_INSET = 8;
const PLOT_RIGHT = 800;
const CHART_VIEW_HEIGHT = PLOT_BOTTOM + 4;
const AXIS_GUTTER = 56;
const PLOT_AXIS_GAP = 10;
const PLOT_LINE_WIDTH = PLOT_RIGHT - AXIS_GUTTER - PLOT_AXIS_GAP;
const LIVE_BADGE_W = 68;
const LIVE_BADGE_H = 22;
const LIVE_BADGE_GAP = 10;
const MARKER_DOT_PX = 8;
const PRICE_SPAN = 30;
const Y_TICK_COUNT = 5;
const Y_DOMAIN_PAD = 0.1;
const LINE_ANIM_MS = 420;
const CHART_SCALE = PLOT_LINE_WIDTH / PLOT_RIGHT;

const UP_COLOR = "var(--color-up)";
const DOWN_COLOR = "var(--color-trend-down)";
const CANDLE_DOWN_COLOR = "var(--color-down)";

type PlottedCandle = { x: number; open: number; high: number; low: number; close: number };

type ChartHover = {
  viewX: number;
  dataX: number;
  dotY: number;
  price: number;
  timeLabel: string;
};

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

type ChartFrameLayout = {
  width: number;
  height: number;
  scale: number;
  offsetX: number;
  offsetY: number;
};

function measureChartFrameLayout(width: number, height: number, fillHeight: boolean): ChartFrameLayout {
  const scale = fillHeight
    ? Math.max(width / PLOT_RIGHT, height / CHART_VIEW_HEIGHT)
    : Math.min(width / PLOT_RIGHT, height / CHART_VIEW_HEIGHT);
  const contentWidth = PLOT_RIGHT * scale;
  const contentHeight = CHART_VIEW_HEIGHT * scale;

  return {
    width,
    height,
    scale,
    offsetX: (width - contentWidth) / 2,
    offsetY: (height - contentHeight) / 2,
  };
}

function viewPointToOverlayPosition(viewX: number, viewY: number, layout: ChartFrameLayout) {
  const x = layout.offsetX + viewX * layout.scale;
  const y = layout.offsetY + viewY * layout.scale;

  return {
    left: `${(x / layout.width) * 100}%`,
    top: `${(y / layout.height) * 100}%`,
  };
}

function clientXToViewX(clientX: number, frameRect: DOMRect, layout: ChartFrameLayout) {
  const localX = clientX - frameRect.left - layout.offsetX;
  const contentWidth = PLOT_RIGHT * layout.scale;

  if (localX < 0 || localX > contentWidth) return null;

  return (localX / contentWidth) * PLOT_RIGHT;
}

function chartMarkerStyle(viewX: number, viewY: number, layout: ChartFrameLayout | null): CSSProperties {
  const position = layout
    ? viewPointToOverlayPosition(viewX, viewY, layout)
    : {
        left: `${(viewX / PLOT_RIGHT) * 100}%`,
        top: `${(viewY / CHART_VIEW_HEIGHT) * 100}%`,
      };

  return {
    position: "absolute",
    ...position,
    transform: "translate(-50%, -50%)",
    width: MARKER_DOT_PX,
    height: MARKER_DOT_PX,
    borderRadius: "50%",
    boxSizing: "border-box",
    pointerEvents: "none",
  };
}

function useChartFrameLayout(frameRef: RefObject<HTMLDivElement | null>, fillHeight: boolean) {
  const [layout, setLayout] = useState<ChartFrameLayout | null>(null);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;

      setLayout((prev) => {
        const next = measureChartFrameLayout(width, height, fillHeight);
        if (
          prev &&
          prev.width === next.width &&
          prev.height === next.height &&
          prev.scale === next.scale &&
          prev.offsetX === next.offsetX &&
          prev.offsetY === next.offsetY
        ) {
          return prev;
        }
        return next;
      });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [frameRef, fillHeight]);

  return layout;
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
    if (!active) return;

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
      if (t < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [sessionKey, active]);

  return value;
}

export function useChartModeDropKey(mode: ChartPlotMode) {
  const prevModeRef = useRef<ChartPlotMode | null>(null);
  const [modeDropKey, setModeDropKey] = useState(0);

  useEffect(() => {
    if (prevModeRef.current !== null && prevModeRef.current !== mode) {
      setModeDropKey((key) => key + 1);
    }
    prevModeRef.current = mode;
  }, [mode]);

  return modeDropKey;
}

export function AssetChartAxisLabels({
  range,
  style,
}: {
  range: RangeKey;
  style?: CSSProperties;
}) {
  const ticks = useMemo(() => getChartAxisLabels(range), [range]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexShrink: 0,
        fontSize: 12,
        color: "var(--color-ink-faint)",
        marginTop: 4,
        ...style,
      }}
    >
      {ticks.map((tick, index) => (
        <span key={`${range}-${index}-${tick}`}>{tick}</span>
      ))}
    </div>
  );
}

export function AssetChartPlot({
  range,
  mode,
  modeDropKey,
  plotId,
  fillHeight = false,
}: {
  range: RangeKey;
  mode: ChartPlotMode;
  modeDropKey: number;
  plotId: string;
  fillHeight?: boolean;
}) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hover, setHover] = useState<ChartHover | null>(null);
  const plotRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const pointerXRef = useRef<number | null>(null);
  const frameLayout = useChartFrameLayout(frameRef, fillHeight);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const chart = useMemo(() => buildChart(range), [range]);
  const period = PERIOD_MAP[range];
  const isDown = period.chg.trim().startsWith("-");
  const lineChartColor = DOWN_COLOR;
  const trendColor = isDown ? DOWN_COLOR : UP_COLOR;

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
      const frame = frameRef.current;
      if (!frame) return;

      const rect = frame.getBoundingClientRect();
      const layout =
        frameLayout ?? measureChartFrameLayout(rect.width, rect.height, fillHeight);
      const viewX = clientXToViewX(clientX, rect, layout);

      if (viewX == null) {
        setHover(null);
        return;
      }

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

      const nearest = displayCandles.reduce<PlottedCandle | null>((best, candle) => {
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
    [mode, displayLinePoints, displayCandles, range, scrubDomainMin, scrubDomainMax, frameLayout, fillHeight],
  );

  useEffect(() => {
    if (pointerXRef.current == null) return;
    scrubAtClientX(pointerXRef.current);
  }, [scrubAtClientX, displayLinePoints, displayCandles]);

  useEffect(() => {
    setHover(null);
  }, [range, mode, liveEnabled]);

  const clipId = `chartPlotClip${plotId}`;
  const patternId = `chartDotPattern${plotId}`;
  const fadeId = `chartFillFade${plotId}`;
  const maskId = `chartFillMask${plotId}`;

  const frameStyle: CSSProperties = fillHeight
    ? { position: "relative", width: "100%", height: "100%", flex: 1, minHeight: 0 }
    : {
        position: "relative",
        width: "100%",
        aspectRatio: `${PLOT_RIGHT} / ${CHART_VIEW_HEIGHT}`,
      };

  const overlayPosition = (viewX: number, viewY: number) =>
    frameLayout
      ? viewPointToOverlayPosition(viewX, viewY, frameLayout)
      : {
          left: `${(viewX / PLOT_RIGHT) * 100}%`,
          top: `${(viewY / CHART_VIEW_HEIGHT) * 100}%`,
        };

  return (
    <div
      ref={plotRef}
      style={{
        position: "relative",
        cursor: "crosshair",
        flex: fillHeight ? 1 : undefined,
        minHeight: fillHeight ? 180 : undefined,
        width: "100%",
        display: fillHeight ? "flex" : undefined,
        flexDirection: fillHeight ? "column" : undefined,
      }}
      onMouseMove={(event) => {
        pointerXRef.current = event.clientX;
        scrubAtClientX(event.clientX);
      }}
      onMouseLeave={() => {
        pointerXRef.current = null;
        setHover(null);
      }}
    >
      <div ref={frameRef} style={frameStyle}>
      <svg
        className="hv-chart-svg"
        viewBox={`0 0 ${PLOT_RIGHT} ${CHART_VIEW_HEIGHT}`}
        style={{ width: "100%", height: "100%", display: "block", pointerEvents: "none" }}
        preserveAspectRatio={fillHeight ? "xMidYMid slice" : "xMidYMid meet"}
      >
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y={PLOT_TOP} width={PLOT_LINE_WIDTH} height={PLOT_BOTTOM - PLOT_TOP} />
          </clipPath>
          <pattern id={patternId} width="2" height="2" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" fill={lineChartColor} opacity="0.42" />
          </pattern>
          <linearGradient id={fadeId} gradientUnits="userSpaceOnUse" x1="0" y1={PLOT_TOP} x2="0" y2={PLOT_BOTTOM}>
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="55%" stopColor="white" stopOpacity="0.32" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id={maskId}>
            <rect x="0" y={PLOT_TOP} width={PLOT_LINE_WIDTH} height={PLOT_BOTTOM - PLOT_TOP} fill={`url(#${fadeId})`} />
          </mask>
        </defs>
        {yTicks.map((tick, index) => (
          <line key={index} x1={0} y1={tick.y} x2={PLOT_LINE_WIDTH} y2={tick.y} stroke="var(--color-line)" strokeWidth={1} strokeDasharray="2 4" />
        ))}
        {hover && (
          <line x1={hover.viewX} y1={PLOT_TOP} x2={hover.viewX} y2={PLOT_BOTTOM} stroke="var(--color-line-strong)" strokeWidth={1} />
        )}
        <g clipPath={`url(#${clipId})`}>
          {mode === "line" && <path d={viewAreaPath} fill={`url(#${patternId})`} mask={`url(#${maskId})`} />}
          <g transform={`scale(${CHART_SCALE} 1)`}>
            <g key={`${mode}-${modeDropKey}`} className={modeDropKey > 0 ? "chart-mode-enter" : undefined}>
              {mode === "line" ? (
                <path d={linePath} fill="none" stroke={lineChartColor} strokeWidth={1.5} strokeLinejoin="round" />
              ) : (
                displayCandles.map((candle, index) => {
                  const up = candle.close < candle.open;
                  const color = up ? UP_COLOR : CANDLE_DOWN_COLOR;
                  const bodyTop = Math.min(candle.open, candle.close);
                  const bodyBottom = Math.max(candle.open, candle.close);
                  return (
                    <g key={index}>
                      <line x1={candle.x} y1={candle.high} x2={candle.x} y2={candle.low} stroke={color} strokeWidth={1.4} />
                      <rect x={candle.x - candleWidth / 2} y={bodyTop} width={candleWidth} height={Math.max(2, bodyBottom - bodyTop)} fill={color} rx={1} />
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
          />
        )}
      </svg>
      {hover && (
        <div
          style={{
            ...chartMarkerStyle(hover.viewX, hover.dotY, frameLayout),
            background: lineChartColor,
            border: "2px solid var(--color-surface-raised)",
          }}
        />
      )}
      {mode === "line" && !hover && (
        <div
          style={{
            ...chartMarkerStyle(markerViewX, markerViewY, frameLayout),
            background: "var(--color-surface-raised)",
            border: `2px solid ${lineChartColor}`,
          }}
        />
      )}
      {mode === "line" && !hover && liveEnabled && (
        <div
          className="num"
          style={{
            position: "absolute",
            ...overlayPosition(liveBadgeViewLeft, markerViewY),
            transform: "translateY(-50%)",
            width: LIVE_BADGE_W,
            height: LIVE_BADGE_H,
            borderRadius: LIVE_BADGE_H / 2,
            background: lineChartColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 11,
            fontWeight: 600,
            fontVariantNumeric: "tabular-nums",
            pointerEvents: "none",
          }}
        >
          ${displayPrice.toFixed(2)}
        </div>
      )}
      {hover && (
        <div
          style={{
            position: "absolute",
            ...overlayPosition(hover.viewX, hover.dotY),
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
        {yTicks.map((tick, index) => {
          const tickPosition = overlayPosition(PLOT_RIGHT, tick.y);

          return (
          <span
            key={index}
            className="num"
            style={{
              position: "absolute",
              right: 0,
              top: tickPosition.top,
              transform: "translateY(-50%)",
              fontSize: 12,
              lineHeight: 1,
              color: "var(--color-ink-faint)",
              whiteSpace: "nowrap",
            }}
          >
            {formatAxisPrice(tick.price, liveEnabled)}
          </span>
          );
        })}
      </div>
      </div>
    </div>
  );
}
