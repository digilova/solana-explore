"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type MarketsTableDisplayVersion = "v1" | "v2";

const STORAGE_KEY = "spacex-prototype-markets-table-display";

type MarketsTableDisplayContextValue = {
  tableVersion: MarketsTableDisplayVersion;
  setTableVersion: (version: MarketsTableDisplayVersion) => void;
};

const MarketsTableDisplayContext = createContext<MarketsTableDisplayContextValue | null>(null);

export function MarketsTableDisplayProvider({ children }: { children: ReactNode }) {
  const [tableVersion, setTableVersionState] = useState<MarketsTableDisplayVersion>("v1");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "v1" || stored === "v2") setTableVersionState(stored);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, tableVersion);
  }, [tableVersion, ready]);

  const setTableVersion = (version: MarketsTableDisplayVersion) => setTableVersionState(version);

  return (
    <MarketsTableDisplayContext.Provider value={{ tableVersion, setTableVersion }}>{children}</MarketsTableDisplayContext.Provider>
  );
}

export function useMarketsTableDisplay() {
  const ctx = useContext(MarketsTableDisplayContext);
  if (!ctx) throw new Error("useMarketsTableDisplay must be used within MarketsTableDisplayProvider");
  return ctx;
}
