import Avatar from "@/components/Avatar";

export default function AssetHeader({
  onJump,
  showJump = true,
  inline = false,
}: {
  onJump: () => void;
  showJump?: boolean;
  inline?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: inline ? "nowrap" : "wrap" }}>
      <Avatar size={52} bg="var(--color-dark)" initials="SX" fontSize={18} src="/avatars/spacex-avatar.png" alt="SpaceX" />
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>SpaceX</h1>
        </div>
        <div style={{ fontSize: 12, color: "var(--color-ink-muted)", marginTop: 2 }}>
          Tokenized SpaceX exposure on Solana
        </div>
      </div>
      {showJump ? (
      <button
        onClick={onJump}
        className="hv-jump"
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "var(--color-surface-raised)",
          border: "1px solid var(--color-line-strong)",
          borderRadius: 9999,
          height: 38,
          padding: "8px 16px",
          fontSize: 14,
          color: "var(--color-ink-muted)",
          cursor: "pointer",
        }}
      >
        <span style={{ fontWeight: 600, color: "var(--color-ink)" }}>5 variants</span>
        <span style={{ color: "var(--color-ink-subtle)" }}>4 issuers</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M12 5v14M5 12l7 7 7-7"></path>
        </svg>
      </button>
      ) : null}
    </div>
  );
}
