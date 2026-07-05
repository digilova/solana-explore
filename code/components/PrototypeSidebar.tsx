"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { ChartDisplayProvider, useChartDisplay, type ChartDisplayVersion } from "@/lib/chartDisplayContext";

export type PrototypeView = "a" | "b" | "rationale";

const NAV: { key: PrototypeView; href: string; label: string }[] = [
  { key: "a", href: "/variation-a", label: "A · Evolved" },
  { key: "b", href: "/variation-b", label: "B · Insto-first" },
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

function ChartDisplayControls() {
  const { chartVersion, setChartVersion } = useChartDisplay();

  return (
    <fieldset className="hv-prototype-sidebar-subnav">
      <legend className="hv-prototype-sidebar-subnav-heading">Chart display</legend>
      <div className="hv-prototype-sidebar-subnav-radios">
        {(["v1", "v2"] as ChartDisplayVersion[]).map((version) => (
          <label key={version} className="hv-prototype-sidebar-radio">
            <input
              type="radio"
              name="chart-display-version"
              value={version}
              checked={chartVersion === version}
              onChange={() => setChartVersion(version)}
            />
            <span>{version}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function PrototypeSidebarInner({
  active,
  note,
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

          <nav className="hv-prototype-sidebar-nav" aria-label="Prototype views">
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
                  {item.key === "a" && isActive ? <ChartDisplayControls /> : null}
                </div>
              );
            })}
          </nav>

          {note ? <p className="hv-prototype-sidebar-note">{note}</p> : null}

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
      <PrototypeSidebarInner active={active} note={note}>
        {children}
      </PrototypeSidebarInner>
    </ChartDisplayProvider>
  );
}
