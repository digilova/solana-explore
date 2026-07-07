"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { ChartDisplayProvider, useChartDisplay, type ChartDisplayVersion } from "@/lib/chartDisplayContext";
import {
  MarketsTableDisplayProvider,
  useMarketsTableDisplay,
  type MarketsTableDisplayVersion,
} from "@/lib/marketsTableDisplayContext";

export type PrototypeView = "a" | "current-audit" | "rationale";

const NAV: { key: PrototypeView; href: string; label: string }[] = [
  { key: "a", href: "/variation-a", label: "Redesign" },
  { key: "current-audit", href: "/current-audit", label: "Current audit" },
  { key: "rationale", href: "/rationale", label: "Rationale" },
];

const STORAGE_KEY = "spacex-prototype-sidebar-open";
const SIDEBAR_WIDTH = 260;

function PanelIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.75" y="2.25" width="12.5" height="11.5" rx="1.75" stroke="currentColor" strokeWidth="1.25" />
      <path d="M5.75 2.25V13.75" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function SidebarToggle({
  open,
  onClick,
  className,
  title,
}: {
  open: boolean;
  onClick: () => void;
  className?: string;
  title: string;
}) {
  return (
    <button type="button" className={className} onClick={onClick} aria-label={title} title={title}>
      <PanelIcon />
      {open && <span className="hv-prototype-sidebar-toggle-label">Collapse sidebar</span>}
    </button>
  );
}

const CHART_DISPLAY_OPTIONS: { version: ChartDisplayVersion; title: string }[] = [
  { version: "v1", title: "v1 - large chartline" },
  { version: "v2", title: "v2-sparkline" },
];

const MARKETS_TABLE_OPTIONS: { version: MarketsTableDisplayVersion; title: string }[] = [
  { version: "v1", title: "v1 - prioritize venue" },
  { version: "v2", title: "v2 - pair avatars, venue last" },
];

function SidebarRadioGroup<T extends string>({
  legend,
  name,
  value,
  options,
  onChange,
}: {
  legend: string;
  name: string;
  value: T;
  options: { version: T; title: string }[];
  onChange: (version: T) => void;
}) {
  return (
    <fieldset className="hv-prototype-sidebar-subnav">
      <legend className="hv-prototype-sidebar-subnav-heading">{legend}</legend>
      <div className="hv-prototype-sidebar-subnav-radios">
        {options.map(({ version, title }) => (
          <label key={version} className="hv-prototype-sidebar-radio">
            <input
              type="radio"
              name={name}
              value={version}
              checked={value === version}
              onChange={() => onChange(version)}
            />
            <span className="hv-prototype-sidebar-radio-copy">
              <span className="hv-prototype-sidebar-radio-title">{title}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function ChartDisplayControls() {
  const { chartVersion, setChartVersion } = useChartDisplay();

  return (
    <SidebarRadioGroup
      legend="Chart display"
      name="chart-display-version"
      value={chartVersion}
      options={CHART_DISPLAY_OPTIONS}
      onChange={setChartVersion}
    />
  );
}

function MarketsTableControls() {
  const { tableVersion, setTableVersion } = useMarketsTableDisplay();

  return (
    <SidebarRadioGroup
      legend="Markets table"
      name="markets-table-display-version"
      value={tableVersion}
      options={MARKETS_TABLE_OPTIONS}
      onChange={setTableVersion}
    />
  );
}

function getBreakpointLabel(width: number) {
  if (width >= 980) return "Desktop >= 980px";
  if (width >= 900) return "Narrow 900-979px";
  if (width >= 768) return "Tablet 768-899px";
  if (width >= 641) return "Compact 641-767px";
  if (width >= 561) return "Mobile 561-640px";
  return "Small mobile <= 560px";
}

function BreakpointIndicator() {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const main = document.querySelector(".hv-prototype-shell-main");
    const update = () => {
      const measuredWidth = main?.getBoundingClientRect().width ?? window.innerWidth;
      setWidth(Math.round(measuredWidth));
    };

    update();
    const observer = main ? new ResizeObserver(update) : null;
    if (main) observer?.observe(main);
    window.addEventListener("resize", update);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  if (width === null) return null;

  return (
    <p className="hv-prototype-sidebar-note" aria-live="polite">
      Breakpoint: {getBreakpointLabel(width)}
      <br />
      Content width: {width}px
    </p>
  );
}

function PrototypeSidebarInner({
  active,
  children,
}: {
  active: PrototypeView;
  note: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) setOpen(stored === "true");
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, String(open));
  }, [open, ready]);

  const toggle = () => setOpen((value) => !value);

  return (
    <div className="hv-prototype-shell">
      <aside className="hv-prototype-sidebar" data-open={open ? "true" : "false"} aria-hidden={!open}>
        <div className="hv-prototype-sidebar-inner" style={{ width: SIDEBAR_WIDTH }}>
          <div className="hv-prototype-sidebar-header">
            <div className="hv-prototype-sidebar-title">SpaceX Page Redesign</div>
            <div className="hv-prototype-sidebar-subtitle">
              Prepared for Solana Foundation
              <br />
              By Diana Simakhov
            </div>
          </div>

          <nav className="hv-prototype-sidebar-nav" aria-label="Product views">
            {NAV.map((item) => {
              const isActive = item.key === active;
              return (
                <div key={item.key} className="hv-prototype-sidebar-nav-group">
                  <Link
                    href={item.href}
                    className={`hv-prototype-sidebar-link${isActive ? " is-active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                  {item.key === "a" && isActive ? (
                    <>
                      <ChartDisplayControls />
                      <MarketsTableControls />
                    </>
                  ) : null}
                </div>
              );
            })}
          </nav>

          <BreakpointIndicator />

          <div className="hv-prototype-sidebar-footer">
            <SidebarToggle open={open} onClick={toggle} className="hv-prototype-sidebar-toggle" title="Collapse sidebar" />
          </div>
        </div>
      </aside>

      {!open && (
        <SidebarToggle
          open={false}
          onClick={toggle}
          className="hv-prototype-sidebar-fab"
          title="Open sidebar"
        />
      )}

      <div className="hv-prototype-shell-main">{children}</div>
    </div>
  );
}

export function PrototypeShell({
  active,
  note,
  children,
}: {
  active: PrototypeView;
  note: string;
  children: ReactNode;
}) {
  return (
    <ChartDisplayProvider>
      <MarketsTableDisplayProvider>
        <PrototypeSidebarInner active={active} note={note}>
          {children}
        </PrototypeSidebarInner>
      </MarketsTableDisplayProvider>
    </ChartDisplayProvider>
  );
}
