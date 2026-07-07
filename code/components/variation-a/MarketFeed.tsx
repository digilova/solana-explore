import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MARKET_UPDATES, getVariantDefsA } from "@/lib/dataA";

// Floating "Latest Updates" market feed, recreated from tokens.xyz:
// a fixed bottom-right pill that expands into a ticker + news panel.

function FeedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
      <path d="M13.5 11.5H25.5C26.8807 11.5 28 10.3807 28 9C28 7.61929 26.8807 6.5 25.5 6.5H13.5C12.1193 6.5 11 7.61929 11 9C11 10.3807 12.1193 11.5 13.5 11.5Z" fill="currentColor" />
      <path d="M6.5 6.5C5.11929 6.5 4 7.61929 4 9C4 10.3807 5.11929 11.5 6.5 11.5C7.88071 11.5 9 10.3807 9 9C9 7.61929 7.88071 6.5 6.5 6.5Z" fill="currentColor" />
      <path d="M6.5 13.5C5.11929 13.5 4 14.6193 4 16C4 17.3807 5.11929 18.5 6.5 18.5C7.88071 18.5 9 17.3807 9 16C9 14.6193 7.88071 13.5 6.5 13.5Z" fill="currentColor" />
      <path d="M6.5 20.5C5.11929 20.5 4 21.6193 4 23C4 24.3807 5.11929 25.5 6.5 25.5C7.88071 25.5 9 24.3807 9 23C9 21.6193 7.88071 20.5 6.5 20.5Z" fill="currentColor" />
      <path d="M13.5 18.5H25.5C26.8807 18.5 28 17.3807 28 16C28 14.6193 26.8807 13.5 25.5 13.5H13.5C12.1193 13.5 11 14.6193 11 16C11 17.3807 12.1193 18.5 13.5 18.5Z" fill="currentColor" />
      <path d="M13.5 25.5H25.5C26.8807 25.5 28 24.3807 28 23C28 21.6193 26.8807 20.5 25.5 20.5H13.5C12.1193 20.5 11 21.6193 11 23C11 24.3807 12.1193 25.5 13.5 25.5Z" fill="currentColor" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 7h-9" />
      <path d="M14 17H5" />
      <circle cx="17" cy="17" r="3" />
      <circle cx="7" cy="7" r="3" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function TickerPills() {
  const defs = getVariantDefsA();
  return (
    <>
      {defs.map((v) => (
        <span
          key={v.sym}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            height: 28,
            padding: "0 10px",
            borderRadius: 9999,
            background: "var(--color-surface-raised)",
            border: "1px solid var(--color-line)",
            fontSize: 12,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          <span style={{ fontWeight: 600 }}>{v.sym}</span>
          <span className="num" style={{ color: "var(--color-ink-muted)" }}>
            {v.price}
          </span>
        </span>
      ))}
    </>
  );
}

export default function MarketFeed() {
  const [open, setOpen] = useState(false);
  // Rendered into <body> so the page-content query container (which becomes a
  // containing block for fixed descendants) can't re-anchor this floating pill.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <div
      data-screen-label="Latest updates feed"
      className="mf-root"
      style={{
        position: "fixed",
        right: 32,
        bottom: 24,
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        maxWidth: "calc(100vw - 32px)",
      }}
    >
      <button
        type="button"
        aria-label={open ? "Collapse market feed" : "Expand market feed"}
        aria-expanded={open}
        className="mf-pill"
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          height: 40,
          width: open ? 40 : 156,
          padding: open ? 0 : "0 16px",
          borderRadius: 9999,
          border: "1px solid var(--color-line)",
          background: "rgba(45, 45, 45, 0.06)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          boxShadow: "0 14px 36px rgba(20, 20, 21, 0.12)",
          color: "var(--color-ink)",
          fontSize: 14,
          fontWeight: 500,
          cursor: "pointer",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {open ? <ChevronDownIcon /> : "Latest Updates"}
      </button>

      {open && (
        <aside
          aria-label="Market feed"
          className="mf-panel"
          style={{
            width: "min(calc(100vw - 32px), 384px)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginTop: 12,
            transformOrigin: "bottom right",
          }}
        >
          {/* Trending ticker */}
          <section
            aria-label="Trending market tickers"
            style={{
              overflow: "hidden",
              borderRadius: 19,
              border: "1px solid var(--color-line)",
              background: "rgba(243, 244, 246, 0.6)",
              boxShadow: "0 14px 36px rgba(20, 20, 21, 0.12)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              padding: "6px 0",
            }}
          >
            <div style={{ overflow: "hidden" }}>
              <div className="mf-ticker-track" style={{ display: "flex", alignItems: "center", gap: 8, width: "max-content", padding: "0 8px" }}>
                <TickerPills />
                <TickerPills />
              </div>
            </div>
          </section>

          {/* Latest updates */}
          <section
            aria-label="Market news"
            style={{
              overflow: "hidden",
              borderRadius: 27,
              border: "1px solid var(--color-line)",
              background: "rgba(243, 244, 246, 0.5)",
              boxShadow: "0 22px 60px rgba(20, 20, 21, 0.16)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "10px 14px 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
                <span style={{ display: "flex", flexShrink: 0, color: "var(--color-ink-subtle)" }}>
                  <FeedIcon />
                </span>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "var(--color-ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Latest Updates
                </h2>
              </div>
              <button
                type="button"
                aria-label="Feed settings"
                title="Feed settings"
                className="mf-settings"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  flexShrink: 0,
                  borderRadius: 9999,
                  border: "1px solid var(--color-line)",
                  background: "rgba(255, 255, 255, 0.7)",
                  color: "var(--color-ink-muted)",
                  boxShadow: "0 1px 2px rgba(20, 20, 21, 0.08)",
                  cursor: "pointer",
                }}
              >
                <SettingsIcon />
              </button>
            </div>
            <div
              style={{
                marginTop: 12,
                maxHeight: 320,
                overflow: "hidden",
                borderRadius: 29,
                border: "1px solid var(--color-line-strong)",
                background: "var(--color-surface-raised)",
                padding: 8,
              }}
            >
              <div style={{ maxHeight: 304, overflowY: "auto" }}>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {MARKET_UPDATES.map((u, i) => (
                    <li key={i} style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-line)" }}>
                      <div className="mf-item" style={{ display: "flex", gap: 12, minWidth: 0, borderRadius: 25, padding: 8 }}>
                        <span
                          style={{
                            width: 56,
                            height: 56,
                            flexShrink: 0,
                            borderRadius: 12,
                            overflow: "hidden",
                            background: "var(--color-dark)",
                            border: "0.5px solid var(--color-line)",
                          }}
                        >
                          <img src={u.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        </span>
                        <div style={{ minWidth: 0, flex: 1, paddingTop: 2 }}>
                          <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.4, color: "var(--color-ink)" }}>{u.text}</div>
                          <div style={{ marginTop: 6, fontSize: 12, color: "var(--color-ink-subtle)" }}>
                            {u.tag} · {u.time}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </aside>
      )}
    </div>,
    document.body,
  );
}
