"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ChartDisplayVersion = "v1" | "v2";

const STORAGE_KEY = "spacex-prototype-chart-display";

type ChartDisplayContextValue = {
  chartVersion: ChartDisplayVersion;
  setChartVersion: (version: ChartDisplayVersion) => void;
};

const ChartDisplayContext = createContext<ChartDisplayContextValue | null>(null);

export function ChartDisplayProvider({ children }: { children: ReactNode }) {
  const [chartVersion, setChartVersionState] = useState<ChartDisplayVersion>("v1");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "v1" || stored === "v2") setChartVersionState(stored);
    else if (stored === "v3") setChartVersionState("v2");
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, chartVersion);
  }, [chartVersion, ready]);

  const setChartVersion = (version: ChartDisplayVersion) => setChartVersionState(version);

  return <ChartDisplayContext.Provider value={{ chartVersion, setChartVersion }}>{children}</ChartDisplayContext.Provider>;
}

export function useChartDisplay() {
  const ctx = useContext(ChartDisplayContext);
  if (!ctx) throw new Error("useChartDisplay must be used within ChartDisplayProvider");
  return ctx;
}
