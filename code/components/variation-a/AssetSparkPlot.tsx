"use client";

import { buildChart, type RangeKey } from "@/lib/dataA";
import { useMemo } from "react";

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 168;
const SPARK_PAD = 6;
const LINE_COLOR = "var(--color-trend-down)";

function pathFromPoints(points: [number, number][]) {
  if (points.length === 0) return "";
  return (
    "M" +
    points
      .map((point, index) => `${index === 0 ? "" : " L"}${point[0].toFixed(1)},${point[1].toFixed(1)}`)
      .join("")
  );
}

function mapSparkPoints(points: [number, number][], width: number, height: number, pad = SPARK_PAD) {
  if (points.length === 0) return [];

  const ys = points.map((point) => point[1]);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const span = Math.max(maxY - minY, 1);
  const innerHeight = height - pad * 2;
  const sourceWidth = points[points.length - 1]?.[0] || width;

  return points.map(([x, y]) => {
    const px = sourceWidth > 0 ? (x / sourceWidth) * width : x;
    const py = pad + ((maxY - y) / span) * innerHeight;
    return [px, py] as [number, number];
  });
}

export interface AssetSparkPlotProps {
  range: RangeKey;
  plotId: string;
  seed?: number;
  width?: number;
  height?: number;
  showFill?: boolean;
  className?: string;
  strokeWidth?: number;
}

export default function AssetSparkPlot({
  range,
  plotId,
  seed,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  showFill = true,
  className,
  strokeWidth = 1.5,
}: AssetSparkPlotProps) {
  const chart = useMemo(() => buildChart(range, seed), [range, seed]);
  const sparkPoints = useMemo(() => mapSparkPoints(chart.points, width, height), [chart.points, width, height]);
  const linePath = useMemo(() => pathFromPoints(sparkPoints), [sparkPoints]);
  const areaPath = useMemo(
    () => `${linePath} L${width},${height - SPARK_PAD} L0,${height - SPARK_PAD} Z`,
    [linePath, width, height],
  );
  const fillId = `sparkFill${plotId}`;

  return (
    <div className={className ?? "hv-chartv3-spark-frame"}>
      <svg
        className="hv-chartv3-spark-svg"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {showFill ? (
          <defs>
            <linearGradient id={fillId} x1="0" y1={SPARK_PAD} x2="0" y2={height - SPARK_PAD} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={LINE_COLOR} stopOpacity="0.14" />
              <stop offset="100%" stopColor={LINE_COLOR} stopOpacity="0" />
            </linearGradient>
          </defs>
        ) : null}
        {showFill ? <path d={areaPath} fill={`url(#${fillId})`} /> : null}
        <path
          d={linePath}
          fill="none"
          stroke={LINE_COLOR}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
