"use client";

import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export type SegmentItem = {
  value: string;
  label?: string;
  content?: ReactNode;
  ariaLabel?: string;
};

type SegmentedControlProps<T extends string = string> = {
  value: T;
  onChange: (value: T) => void;
  items: (SegmentItem & { value: T })[];
  ariaLabel: string;
  getSegmentStyle?: (selected: boolean) => CSSProperties;
  compact?: boolean;
  fullWidth?: boolean;
};

type IndicatorRect = { x: number; width: number; height: number };

const TRACK_STYLE: CSSProperties = {
  display: "flex",
  gap: 4,
  padding: 4,
  borderRadius: 9999,
  background: "var(--color-pill-track)",
  position: "relative",
  width: "fit-content",
};

const INDICATOR_STYLE: CSSProperties = {
  position: "absolute",
  top: 4,
  left: 0,
  borderRadius: 9999,
  background: "var(--color-pill-indicator)",
  boxShadow: "var(--shadow-pill-indicator)",
  pointerEvents: "none",
  willChange: "transform, width",
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

export default function SegmentedControl<T extends string = string>({
  value,
  onChange,
  items,
  ariaLabel,
  getSegmentStyle,
  compact = false,
  fullWidth = false,
}: SegmentedControlProps<T>) {
  const trackRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState<IndicatorRect | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const measure = useCallback(() => {
    const track = trackRef.current;
    const button = buttonRefs.current[value];
    if (!track || !button) return;

    const trackRect = track.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    setIndicator({
      x: buttonRect.left - trackRect.left,
      width: buttonRect.width,
      height: buttonRect.height,
    });
  }, [value]);

  useLayoutEffect(() => {
    measure();
  }, [measure, items]);

  useEffect(() => {
    measure();
    const track = trackRef.current;
    if (!track) return;

    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const indicatorTransition = reducedMotion
    ? "none"
    : "transform 250ms cubic-bezier(0.32, 0.72, 0, 1), width 250ms cubic-bezier(0.32, 0.72, 0, 1)";

  const compactStyle: CSSProperties = compact
    ? {
        width: 28,
        height: 28,
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }
    : {};

  const trackStyle: CSSProperties = fullWidth ? { ...TRACK_STYLE, width: "100%" } : TRACK_STYLE;
  const fullWidthSegmentStyle: CSSProperties = fullWidth ? { flex: 1, justifyContent: "center" } : {};

  return (
    <div ref={trackRef} role="group" aria-label={ariaLabel} style={trackStyle}>
      {indicator && (
        <span
          aria-hidden
          className="pill-indicator"
          style={{
            ...INDICATOR_STYLE,
            width: indicator.width,
            height: indicator.height,
            transform: `translateX(${indicator.x}px)`,
            transition: indicatorTransition,
          }}
        />
      )}
      {items.map((item) => {
        const selected = value === item.value;
        return (
          <button
            key={item.value}
            ref={(el) => {
              buttonRefs.current[item.value] = el;
            }}
            type="button"
            aria-label={item.ariaLabel}
            aria-pressed={selected}
            className="pill-segment"
            data-selected={selected}
            onClick={() => onChange(item.value)}
            style={{
              position: "relative",
              zIndex: 1,
              border: "none",
              borderRadius: 9999,
              cursor: "pointer",
              background: "transparent",
              color: selected ? "var(--color-ink)" : "var(--color-ink-subtle)",
              transition: "color 150ms ease",
              ...compactStyle,
              ...fullWidthSegmentStyle,
              ...getSegmentStyle?.(selected),
            }}
          >
            {item.content ?? item.label}
          </button>
        );
      })}
    </div>
  );
}
