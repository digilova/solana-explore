export default function IssuerFooter() {
  return (
    <footer data-screen-label="Issuer footer" style={{ background: "var(--color-dark)", color: "var(--color-surface-raised)" }}>
      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "36px 40px 32px",
          display: "flex",
          alignItems: "center",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: 300 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#FFA098", textTransform: "uppercase", letterSpacing: 0.4 }}>For issuers</div>
          <div style={{ fontSize: 20, fontWeight: 600, marginTop: 6 }}>Bring an asset to Solana</div>
          <p style={{ margin: "6px 0 0", fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.55, maxWidth: 480 }}>
            Your asset gets listed, compared, and discoverable exactly like this page.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a
            href="#"
            className="hv-footer-red"
            style={{ background: "var(--color-down)", color: "var(--color-surface-raised)", fontSize: 14, fontWeight: 500, padding: "10px 20px", borderRadius: 9999 }}
          >
            Talk to the team
          </a>
          <a
            href="#"
            className="hv-footer-outline"
            style={{
              background: "transparent",
              color: "rgba(255,255,255,0.75)",
              fontSize: 14,
              padding: "10px 20px",
              borderRadius: 9999,
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            Assets API docs
          </a>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div
          style={{
            maxWidth: 1160,
            margin: "0 auto",
            padding: "16px 40px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 12,
            color: "rgba(255,255,255,0.45)",
          }}
        >
          <span style={{ fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Tokens</span>
          <span>·</span>
          <span>Managed by the Solana Foundation</span>
        </div>
      </div>
    </footer>
  );
}
