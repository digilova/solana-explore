"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type Side = "top" | "bottom";

const TOOLTIP_MS = 125;

interface TooltipProps {
  content: string;
  children: ReactNode;
  side?: Side;
}

function getSideOffset(side: Side) {
  return side === "top" ? -8 : 8;
}

export default function Tooltip({ content, children, side = "top" }: TooltipProps) {
  const id = useId();
  const triggerRef = useRef<HTMLSpanElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [resolvedSide, setResolvedSide] = useState<Side>(side);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (active || !shown) return;
    const t = window.setTimeout(() => setShown(false), TOOLTIP_MS);
    return () => clearTimeout(t);
  }, [active, shown]);

  const reposition = useCallback(() => {
    const trigger = triggerRef.current;
    const popup = popupRef.current;
    if (!trigger || !popup) return;

    const rect = trigger.getBoundingClientRect();
    const popupRect = popup.getBoundingClientRect();
    const margin = 8;
    let nextSide: Side = side;
    let top =
      nextSide === "top"
        ? rect.top - popupRect.height + getSideOffset("top")
        : rect.bottom + getSideOffset("bottom");

    if (nextSide === "top" && top < margin) {
      nextSide = "bottom";
      top = rect.bottom + getSideOffset("bottom");
    } else if (nextSide === "bottom" && top + popupRect.height > window.innerHeight - margin) {
      nextSide = "top";
      top = rect.top - popupRect.height + getSideOffset("top");
    }

    let left = rect.left + rect.width / 2 - popupRect.width / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - popupRect.width - margin));

    setResolvedSide(nextSide);
    setCoords({ top, left });
  }, [side]);

  useLayoutEffect(() => {
    if (!shown) return;
    reposition();
    const frame = requestAnimationFrame(reposition);
    return () => cancelAnimationFrame(frame);
  }, [shown, content, reposition]);

  useEffect(() => {
    if (!shown) return;
    const onLayout = () => reposition();
    window.addEventListener("scroll", onLayout, true);
    window.addEventListener("resize", onLayout);
    return () => {
      window.removeEventListener("scroll", onLayout, true);
      window.removeEventListener("resize", onLayout);
    };
  }, [shown, reposition]);

  const show = () => {
    setShown(true);
    requestAnimationFrame(() => setActive(true));
  };
  const hide = () => setActive(false);

  const popup =
    mounted &&
    shown &&
    createPortal(
      <div
        ref={popupRef}
        id={id}
        role="tooltip"
        data-open={active ? "true" : "false"}
        data-side={resolvedSide}
        className="hv-tooltip-popup"
        style={{ top: coords.top, left: coords.left }}
      >
        {content}
      </div>,
      document.body,
    );

  return (
    <>
      <span
        ref={triggerRef}
        className="hv-tooltip-trigger"
        aria-describedby={active ? id : undefined}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {children}
      </span>
      {popup}
    </>
  );
}
