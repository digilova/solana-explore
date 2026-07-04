"use client";

import Tooltip from "@/components/Tooltip";
import type { CSSProperties, ReactNode } from "react";

function InfoIcon() {
  return (
    <span className="hv-infotip-icon" aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="6.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="8" cy="5" r="0.95" fill="currentColor" />
        <rect x="7.3" y="7.1" width="1.4" height="4.6" rx="0.7" fill="currentColor" />
      </svg>
    </span>
  );
}

interface InfoTipProps {
  tip: string;
  label?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export default function InfoTip({ tip, label, style, className }: InfoTipProps) {
  if (label !== undefined) {
    return (
      <Tooltip content={tip}>
        <span className={className ? `hv-infotip-label ${className}` : "hv-infotip-label"} style={style}>
          {label}
          <InfoIcon />
        </span>
      </Tooltip>
    );
  }

  return (
    <Tooltip content={tip}>
      <button type="button" className="hv-infotip-trigger" aria-label="More info">
        <InfoIcon />
      </button>
    </Tooltip>
  );
}
