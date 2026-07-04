export default function SiteHeader() {
  return (
    <header
      style={{
        background: "var(--color-surface-raised)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "16px 24px",
      }}
    >
      <a href="#" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <svg width="24" height="24" viewBox="0 0 212 212" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M106 127.2C129.417 127.2 148.4 146.183 148.4 169.6C148.4 193.016 129.417 212 106 212C82.5831 212 63.5996 193.016 63.5996 169.6C63.5998 146.183 82.5833 127.2 106 127.2ZM42.4004 63.5996C65.8171 63.5998 84.7998 82.5833 84.7998 106C84.7998 129.417 65.8171 148.4 42.4004 148.4C18.9835 148.4 0 129.417 0 106C0 82.5831 18.9835 63.5996 42.4004 63.5996ZM169.6 63.5996C193.016 63.5996 212 82.5831 212 106C212 129.417 193.016 148.4 169.6 148.4C146.183 148.4 127.2 129.417 127.2 106C127.2 82.5833 146.183 63.5998 169.6 63.5996ZM106 0C129.417 0 148.4 18.9835 148.4 42.4004C148.4 65.8171 129.417 84.7998 106 84.7998C82.5833 84.7998 63.5998 65.8171 63.5996 42.4004C63.5996 18.9835 82.5831 0 106 0Z"
            fill="url(#tokensLogoGradient)"
          />
          <defs>
            <linearGradient id="tokensLogoGradient" x1="106" y1="0" x2="106" y2="212" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1C1C1D" />
              <stop offset="1" stopColor="#1C1C1D" stopOpacity="0.72" />
            </linearGradient>
          </defs>
        </svg>
        <span style={{ fontWeight: 600, fontSize: 24, color: "var(--color-ink)" }}>Tokens</span>
      </a>

      <button
        type="button"
        className="hv-search-pill"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          width: 320,
          height: 40,
          padding: "0 12px",
          borderRadius: 9999,
          border: "1px solid var(--color-line)",
          background: "var(--color-surface-raised)",
          color: "var(--color-ink-muted)",
          fontSize: 14,
          cursor: "pointer",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 19.4434 19.2676" fill="var(--color-ink-muted)">
            <path d="M0 7.79297C0 12.0898 3.49609 15.5859 7.79297 15.5859C9.49219 15.5859 11.0449 15.0391 12.3242 14.1211L17.1289 18.9355C17.3535 19.1602 17.6465 19.2676 17.959 19.2676C18.623 19.2676 19.082 18.7695 19.082 18.1152C19.082 17.8027 18.9648 17.5195 18.7598 17.3145L13.9844 12.5098C14.9902 11.2012 15.5859 9.57031 15.5859 7.79297C15.5859 3.49609 12.0898 0 7.79297 0C3.49609 0 0 3.49609 0 7.79297ZM1.66992 7.79297C1.66992 4.41406 4.41406 1.66992 7.79297 1.66992C11.1719 1.66992 13.916 4.41406 13.916 7.79297C13.916 11.1719 11.1719 13.916 7.79297 13.916C4.41406 13.916 1.66992 11.1719 1.66992 7.79297Z" />
          </svg>
          Find tokens...
        </span>
        <span style={{ display: "flex", gap: 4 }}>
          <kbd
            style={{
              background: "var(--color-surface-soft)",
              borderRadius: 4,
              padding: "2px 6px",
              fontSize: 12,
              fontFamily: "inherit",
              color: "var(--color-ink-muted)",
            }}
          >
            ⌘
          </kbd>
          <kbd
            style={{
              background: "var(--color-surface-soft)",
              borderRadius: 4,
              padding: "2px 6px",
              fontSize: 12,
              fontFamily: "inherit",
              color: "var(--color-ink-muted)",
            }}
          >
            K
          </kbd>
        </span>
      </button>

      <nav style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <a
          href="#"
          className="hv-docs-link"
          style={{
            display: "inline-flex",
            alignItems: "center",
            height: 40,
            padding: "0 8px",
            fontSize: 15,
            fontWeight: 600,
            color: "var(--color-ink-muted)",
            borderRadius: 8,
          }}
        >
          Docs
        </a>
        <a
          href="#"
          className="hv-assets-api"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            height: 36,
            padding: "0 14px",
            borderRadius: 9999,
            background: "var(--color-ink)",
            color: "var(--color-surface-raised)",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Assets API
        </a>
      </nav>
    </header>
  );
}
