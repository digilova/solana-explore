"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AUDIT_2047_CROP_STORAGE_VERSION,
  AUDIT_CROPPED_VARIANTS_STORAGE_VERSION,
  AUDIT_EXTENDED_STORAGE_VERSION,
  AUDIT_PROVIDED_FULLPAGE_STORAGE_VERSION,
  AUDIT_STORAGE_KEY,
  AUDIT_PREVIOUS_STORAGE_VERSION,
  AUDIT_STORAGE_VERSION,
  AUDIT_STORAGE_VERSION_KEY,
  TOKENS_XYZ_AUDIT_2047_CROP_HEIGHT,
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
    if (version === AUDIT_STORAGE_VERSION) return mergeMissingSeedAnnotations(annotations);

    const sourceHeight =
      version === AUDIT_PREVIOUS_STORAGE_VERSION
        ? TOKENS_XYZ_AUDIT_PREVIOUS_HEIGHT
        : version === AUDIT_EXTENDED_STORAGE_VERSION
          ? TOKENS_XYZ_AUDIT_EXTENDED_HEIGHT
          : version === AUDIT_CROPPED_VARIANTS_STORAGE_VERSION
            ? TOKENS_XYZ_AUDIT_CROPPED_VARIANTS_HEIGHT
            : version === AUDIT_2047_CROP_STORAGE_VERSION
              ? TOKENS_XYZ_AUDIT_2047_CROP_HEIGHT
              : version === AUDIT_PROVIDED_FULLPAGE_STORAGE_VERSION
                ? TOKENS_XYZ_AUDIT_IMAGE_HEIGHT
              : TOKENS_XYZ_AUDIT_LEGACY_HEIGHT;
    const yRatio = sourceHeight / TOKENS_XYZ_AUDIT_IMAGE_HEIGHT;
    const migrated = annotations.map((annotation) => ({
      ...annotation,
      yPct: clampPct(annotation.yPct * yRatio),
    }));
    return mergeMissingSeedAnnotations(migrated);
  } catch {
    return cloneSeedAuditAnnotations();
  }
}

function mergeMissingSeedAnnotations(annotations: AuditAnnotation[]) {
  const deduped = dedupeAnnotations(annotations);
  const seenIds = new Set(deduped.map((annotation) => annotation.id));
  const seenText = new Set(deduped.map((annotation) => normalizeAnnotationText(annotation.text)));
  const missingSeeds = cloneSeedAuditAnnotations().filter((annotation) => {
    return !seenIds.has(annotation.id) && !seenText.has(normalizeAnnotationText(annotation.text));
  });
  return missingSeeds.length > 0 ? [...deduped, ...missingSeeds] : deduped;
}

function dedupeAnnotations(annotations: AuditAnnotation[]) {
  const seenIds = new Set<string>();
  const seenText = new Set<string>();
  return annotations.filter((annotation) => {
    const textKey = normalizeAnnotationText(annotation.text);
    if (seenIds.has(annotation.id) || seenText.has(textKey)) return false;
    seenIds.add(annotation.id);
    seenText.add(textKey);
    return true;
  });
}

function normalizeAnnotationText(text: string) {
  return text.trim().replace(/\s+/g, " ").toLowerCase();
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
