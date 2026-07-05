"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const CYCLE = 10;
const STRIP_CYCLES = 5;
const STRIP = Array.from({ length: CYCLE * STRIP_CYCLES }, (_, i) => i % 10);
const MIDDLE_BASE = CYCLE * 2;

function shortestDigitDiff(from: number, to: number) {
  let diff = to - from;
  if (diff > 5) diff -= 10;
  if (diff < -5) diff += 10;
  return diff;
}

function RollingDigit({ digit }: { digit: number }) {
  const prevDigit = useRef(digit);
  const indexRef = useRef(MIDDLE_BASE + digit);
  const innerRef = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(MIDDLE_BASE + digit);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const from = prevDigit.current;
    const to = digit;
    if (from === to) return;

    const diff = shortestDigitDiff(from, to);
    prevDigit.current = to;
    const next = indexRef.current + diff;
    indexRef.current = next;
    setAnimate(true);
    setIndex(next);
  }, [digit]);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const onEnd = (e: TransitionEvent) => {
      if (e.propertyName !== "transform") return;
      const i = indexRef.current;
      if (i >= MIDDLE_BASE - 5 && i <= MIDDLE_BASE + 14) return;

      setAnimate(false);
      const reset = MIDDLE_BASE + prevDigit.current;
      indexRef.current = reset;
      setIndex(reset);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
    };

    el.addEventListener("transitionend", onEnd);
    return () => el.removeEventListener("transitionend", onEnd);
  }, []);

  return (
    <span className="rolling-digit" aria-hidden="true">
      <span
        ref={innerRef}
        className="rolling-digit-inner"
        style={{
          transform: `translateY(-${index}em)`,
          transition: animate ? "transform 380ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
        }}
      >
        {STRIP.map((d, i) => (
          <span key={i} className="rolling-digit-row">
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

type RollingPriceProps = {
  value: number;
  className?: string;
  style?: CSSProperties;
};

export default function RollingPrice({ value, className, style }: RollingPriceProps) {
  const formatted = value.toFixed(2);
  const text = `$${formatted}`;

  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "baseline", fontVariantNumeric: "tabular-nums", ...style }}
      aria-label={text}
    >
      {text.split("").map((char, i) =>
        /\d/.test(char) ? (
          <RollingDigit key={i} digit={parseInt(char, 10)} />
        ) : (
          <span key={i} className="rolling-digit-static">
            {char}
          </span>
        ),
      )}
    </span>
  );
}
