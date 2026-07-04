"use client";

import { useEffect, useRef, useState } from "react";

const LERP_SPEED = 0.06;
const DOMAIN_LERP_SPEED = 0.09;
const SCROLL_PX_PER_SEC = 16;
const TICK_MS = 1700;
const MIN_POINTS = 48;
const MIN_DOMAIN_SPAN = 0.32;
const DOMAIN_WINDOW = 14;
const DOMAIN_PAD_RATIO = 0.06;

type LivePoint = { x: number; price: number; targetPrice: number };

function seedFromPoints(points: [number, number][], anchorPrice: number): LivePoint[] {
  return points.map(([x]) => ({ x, price: anchorPrice, targetPrice: anchorPrice }));
}

function toSvgPoints(
  points: LivePoint[],
  domainMin: number,
  domainMax: number,
  plotTop: number,
  plotBottom: number,
): [number, number][] {
  const span = Math.max(domainMax - domainMin, 0.01);
  return points.map((p) => [
    p.x,
    plotTop + ((domainMax - p.price) / span) * (plotBottom - plotTop),
  ]);
}

function pointSpacing(points: LivePoint[]) {
  if (points.length < 2) return 800 / 63;
  return (points[points.length - 1].x - points[0].x) / (points.length - 1);
}

function targetDomain(prices: number[]) {
  if (prices.length === 0) {
    return { min: 0, max: 1 };
  }

  const recent = prices.slice(-DOMAIN_WINDOW);
  let min = Math.min(...recent);
  let max = Math.max(...recent);
  const mid = (min + max) / 2;

  if (max - min < MIN_DOMAIN_SPAN) {
    min = mid - MIN_DOMAIN_SPAN / 2;
    max = mid + MIN_DOMAIN_SPAN / 2;
  }

  const pad = (max - min) * DOMAIN_PAD_RATIO;
  return { min: min - pad, max: max + pad };
}

export function useLiveLineChart(
  seedPoints: [number, number][],
  {
    enabled,
    sessionKey,
    plotTop,
    plotBottom,
    anchorPrice,
  }: {
    enabled: boolean;
    sessionKey: string;
    plotTop: number;
    plotBottom: number;
    anchorPrice: number;
  },
) {
  const seedRef = useRef(seedPoints);
  seedRef.current = seedPoints;

  const pointsRef = useRef<LivePoint[]>(seedFromPoints(seedPoints, anchorPrice));
  const targetPriceRef = useRef(anchorPrice);
  const displayPriceRef = useRef(anchorPrice);
  const domainMinRef = useRef(anchorPrice - MIN_DOMAIN_SPAN / 2);
  const domainMaxRef = useRef(anchorPrice + MIN_DOMAIN_SPAN / 2);
  const [frame, setFrame] = useState(() => ({
    points: toSvgPoints(pointsRef.current, domainMinRef.current, domainMaxRef.current, plotTop, plotBottom),
    price: anchorPrice,
    domainMin: domainMinRef.current,
    domainMax: domainMaxRef.current,
  }));

  useEffect(() => {
    pointsRef.current = seedFromPoints(seedRef.current, anchorPrice);
    targetPriceRef.current = anchorPrice;
    displayPriceRef.current = anchorPrice;
    domainMinRef.current = anchorPrice - MIN_DOMAIN_SPAN / 2;
    domainMaxRef.current = anchorPrice + MIN_DOMAIN_SPAN / 2;
    setFrame({
      points: toSvgPoints(pointsRef.current, domainMinRef.current, domainMaxRef.current, plotTop, plotBottom),
      price: anchorPrice,
      domainMin: domainMinRef.current,
      domainMax: domainMaxRef.current,
    });
  }, [sessionKey, anchorPrice, plotTop, plotBottom]);

  useEffect(() => {
    if (!enabled) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let lastTime = performance.now();
    let raf = 0;

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      const pts = pointsRef.current;
      const spacing = pointSpacing(pts);

      for (const p of pts) {
        p.x -= SCROLL_PX_PER_SEC * dt;
        p.price += (p.targetPrice - p.price) * LERP_SPEED;
      }

      while (pts.length > MIN_POINTS && pts[0].x < -spacing * 0.5) {
        pts.shift();
      }

      const last = pts[pts.length - 1];
      if (last && last.x < 800 - spacing * 0.85) {
        pts.push({ x: last.x + spacing, price: last.price, targetPrice: last.targetPrice });
      }

      displayPriceRef.current += (targetPriceRef.current - displayPriceRef.current) * LERP_SPEED;

      const nextDomain = targetDomain(pts.map((p) => p.price));
      domainMinRef.current += (nextDomain.min - domainMinRef.current) * DOMAIN_LERP_SPEED;
      domainMaxRef.current += (nextDomain.max - domainMaxRef.current) * DOMAIN_LERP_SPEED;

      setFrame({
        points: toSvgPoints(pts, domainMinRef.current, domainMaxRef.current, plotTop, plotBottom),
        price: displayPriceRef.current,
        domainMin: domainMinRef.current,
        domainMax: domainMaxRef.current,
      });
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [enabled, sessionKey, plotTop, plotBottom]);

  useEffect(() => {
    if (!enabled) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const tick = () => {
      targetPriceRef.current += (Math.random() - 0.5) * 0.38;
      targetPriceRef.current = Math.max(
        anchorPrice - 1.2,
        Math.min(anchorPrice + 1.2, targetPriceRef.current),
      );

      const pts = pointsRef.current;
      if (pts.length === 0) return;

      pts[pts.length - 1].targetPrice = targetPriceRef.current;
    };

    tick();
    const interval = setInterval(tick, TICK_MS + Math.random() * 250);
    return () => clearInterval(interval);
  }, [enabled, sessionKey, anchorPrice]);

  if (!enabled) {
    return {
      points: seedPoints,
      displayPrice: anchorPrice,
      domainMin: anchorPrice - MIN_DOMAIN_SPAN / 2,
      domainMax: anchorPrice + MIN_DOMAIN_SPAN / 2,
    };
  }

  return {
    points: frame.points,
    displayPrice: frame.price,
    domainMin: frame.domainMin,
    domainMax: frame.domainMax,
  };
}
