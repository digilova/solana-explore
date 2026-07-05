"use client";

import { useEffect, useRef, useState } from "react";

const LERP_SPEED = 0.06;
const TICK_MS = 1700;

export function useLivePrice(anchorPrice: number, enabled = true) {
  const targetRef = useRef(anchorPrice);
  const displayRef = useRef(anchorPrice);
  const [price, setPrice] = useState(anchorPrice);

  useEffect(() => {
    targetRef.current = anchorPrice;
    displayRef.current = anchorPrice;
    setPrice(anchorPrice);
  }, [anchorPrice]);

  useEffect(() => {
    if (!enabled) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const tick = () => {
      targetRef.current += (Math.random() - 0.5) * 0.38;
      targetRef.current = Math.max(
        anchorPrice - 1.2,
        Math.min(anchorPrice + 1.2, targetRef.current),
      );
    };

    tick();
    const interval = setInterval(tick, TICK_MS + Math.random() * 250);

    let raf = 0;
    const loop = () => {
      displayRef.current += (targetRef.current - displayRef.current) * LERP_SPEED;
      setPrice(displayRef.current);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(raf);
    };
  }, [enabled, anchorPrice]);

  return price;
}
