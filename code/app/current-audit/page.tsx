import { PrototypeShell } from "@/components/PrototypeSidebar";
import TokensXyzAuditView from "@/components/current-audit/TokensXyzAuditView";

export default function CurrentAuditPage() {
  return (
    <PrototypeShell active="current-audit" note="Audit of live tokens.xyz/spacex — Jul 2026">
      <TokensXyzAuditView />
    </PrototypeShell>
  );
}
