"use client";

import { useEffect, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import Breadcrumb from "@/components/Breadcrumb";
import { AUDIT_READ_ONLY, TOKENS_XYZ_AUDIT_IMAGE } from "@/lib/tokensXyzAudit";
import { useAuditAnnotations } from "@/hooks/useAuditAnnotations";
import AnnotationCanvas from "./AnnotationCanvas";
import AnnotationToolbar from "./AnnotationToolbar";

export default function TokensXyzAuditView() {
  const { annotations, addAnnotation, updateAnnotation, deleteAnnotation, resetAnnotations, exportJson } = useAuditAnnotations(AUDIT_READ_ONLY);
  const [adding, setAdding] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setAdding(false);
      setActiveId(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(exportJson);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const setActiveAndExitAdd = (id: string | null) => {
    setActiveId(id);
    if (id) setAdding(false);
  };

  return (
    <div data-screen-label="Current Audit" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", flex: 1 }}>
      <SiteHeader />
      <main className="hv-page-main hv-audit-page">
        <Breadcrumb items={[{ label: "Tokens", href: "#" }, { label: "SpaceX", href: "#" }, { label: "Current audit" }]} />

        <header className="hv-audit-header">
          <div>
            <div className="hv-audit-kicker">Current audit</div>
            <h1>tokens.xyz/spacex annotation canvas</h1>
            <p>
              A snapshot of the live SpaceX token page with local, editable critique pins. Use it to mark UX issues before comparing the
              redesign direction against the current experience.
            </p>
          </div>
          <a href="https://www.tokens.xyz/spacex" target="_blank" rel="noopener noreferrer" className="hv-audit-source-link">
            Source: tokens.xyz/spacex
          </a>
        </header>

        <AnnotationToolbar
          adding={adding}
          count={annotations.length}
          copied={copied}
          readOnly={AUDIT_READ_ONLY}
          onToggleAdding={() => {
            if (AUDIT_READ_ONLY) return;
            setAdding((value) => !value);
            setActiveId(null);
          }}
          onReset={() => {
            resetAnnotations();
            setActiveId(null);
            setAdding(false);
          }}
          onCopy={copyJson}
        />

        <AnnotationCanvas
          imageSrc={TOKENS_XYZ_AUDIT_IMAGE}
          annotations={annotations}
          adding={adding}
          readOnly={AUDIT_READ_ONLY}
          activeId={activeId}
          onAdd={addAnnotation}
          onActiveChange={setActiveAndExitAdd}
          onUpdate={updateAnnotation}
          onDelete={deleteAnnotation}
        />
      </main>
    </div>
  );
}
