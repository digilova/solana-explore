"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AUDIT_CROPPED_VARIANTS_STORAGE_VERSION,
  AUDIT_EXTENDED_STORAGE_VERSION,
  AUDIT_STORAGE_KEY,
  AUDIT_PREVIOUS_STORAGE_VERSION,
  AUDIT_STORAGE_VERSION,
  AUDIT_STORAGE_VERSION_KEY,
  TOKENS_XYZ_AUDIT_CROPPED_VARIANTS_HEIGHT,
  TOKENS_XYZ_AUDIT_EXTENDED_HEIGHT,
  TOKENS_XYZ_AUDIT_IMAGE_HEIGHT,
  TOKENS_XYZ_AUDIT_LEGACY_HEIGHT,
  TOKENS_XYZ_AUDIT_PREVIOUS_HEIGHT,
  cloneSeedAuditAnnotations,
  type AuditAnnotation,
} from "@/lib/tokensXyzAudit";

function isAnnotation(value: unknown): value is AuditAnnotation {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.xPct === "number" &&
    Number.isFinite(item.xPct) &&
    typeof item.yPct === "number" &&
    Number.isFinite(item.yPct) &&
    typeof item.author === "string" &&
    typeof item.text === "string" &&
    typeof item.createdAt === "string" &&
    typeof item.updatedAt === "string"
  );
}

function readStoredAnnotations() {
  if (typeof window === "undefined") return cloneSeedAuditAnnotations();

  try {
    const raw = window.localStorage.getItem(AUDIT_STORAGE_KEY);
    if (!raw) return cloneSeedAuditAnnotations();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every(isAnnotation)) return cloneSeedAuditAnnotations();
    const annotations = parsed.map((annotation) => ({ ...annotation }));
    const version = window.localStorage.getItem(AUDIT_STORAGE_VERSION_KEY);
    if (version === AUDIT_STORAGE_VERSION) return annotations;

    const sourceHeight =
      version === AUDIT_PREVIOUS_STORAGE_VERSION
        ? TOKENS_XYZ_AUDIT_PREVIOUS_HEIGHT
        : version === AUDIT_EXTENDED_STORAGE_VERSION
          ? TOKENS_XYZ_AUDIT_EXTENDED_HEIGHT
          : version === AUDIT_CROPPED_VARIANTS_STORAGE_VERSION
            ? TOKENS_XYZ_AUDIT_CROPPED_VARIANTS_HEIGHT
            : TOKENS_XYZ_AUDIT_LEGACY_HEIGHT;
    const yRatio = sourceHeight / TOKENS_XYZ_AUDIT_IMAGE_HEIGHT;
    return annotations.map((annotation) => ({
      ...annotation,
      yPct: clampPct(annotation.yPct * yRatio),
    }));
  } catch {
    return cloneSeedAuditAnnotations();
  }
}

function clampPct(value: number) {
  return Math.min(99, Math.max(1, value));
}

export function useAuditAnnotations(readOnly = false) {
  const [annotations, setAnnotations] = useState<AuditAnnotation[]>(() => (readOnly ? cloneSeedAuditAnnotations() : readStoredAnnotations()));

  useEffect(() => {
    if (readOnly) return;
    window.localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(annotations));
    window.localStorage.setItem(AUDIT_STORAGE_VERSION_KEY, AUDIT_STORAGE_VERSION);
  }, [annotations, readOnly]);

  const addAnnotation = useCallback((xPct: number, yPct: number) => {
    if (readOnly) return "";
    const now = new Date().toISOString();
    const id = `audit-${Date.now().toString(36)}`;
    const next: AuditAnnotation = {
      id,
      xPct: clampPct(xPct),
      yPct: clampPct(yPct),
      author: "Diana",
      text: "New audit note",
      createdAt: now,
      updatedAt: now,
    };
    setAnnotations((items) => [...items, next]);
    return id;
  }, [readOnly]);

  const updateAnnotation = useCallback((id: string, patch: Partial<Pick<AuditAnnotation, "text" | "xPct" | "yPct">>) => {
    if (readOnly) return;
    setAnnotations((items) =>
      items.map((annotation) =>
        annotation.id === id
          ? {
              ...annotation,
              ...patch,
              xPct: patch.xPct === undefined ? annotation.xPct : clampPct(patch.xPct),
              yPct: patch.yPct === undefined ? annotation.yPct : clampPct(patch.yPct),
              updatedAt: new Date().toISOString(),
            }
          : annotation,
      ),
    );
  }, [readOnly]);

  const deleteAnnotation = useCallback((id: string) => {
    if (readOnly) return;
    setAnnotations((items) => items.filter((annotation) => annotation.id !== id));
  }, [readOnly]);

  const resetAnnotations = useCallback(() => {
    if (readOnly) return;
    setAnnotations(cloneSeedAuditAnnotations());
  }, [readOnly]);

  const exportJson = useMemo(() => JSON.stringify(annotations, null, 2), [annotations]);

  return {
    annotations,
    addAnnotation,
    updateAnnotation,
    deleteAnnotation,
    resetAnnotations,
    exportJson,
  };
}
