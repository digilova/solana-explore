"use client";

import { useState } from "react";
import type { AuditAnnotation } from "@/lib/tokensXyzAudit";

type AnnotationBubbleProps = {
  annotation: AuditAnnotation;
  index: number;
  readOnly: boolean;
  onSave: (text: string) => void;
  onDelete: () => void;
};

export default function AnnotationBubble({ annotation, index, readOnly, onSave, onDelete }: AnnotationBubbleProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(annotation.text);

  const save = () => {
    const text = draft.trim();
    if (!text) return;
    onSave(text);
    setEditing(false);
  };

  return (
    <div
      className="hv-annotation-bubble"
      data-side={annotation.xPct > 68 ? "left" : "right"}
      style={{ left: `${annotation.xPct}%`, top: `${annotation.yPct}%` }}
      role="dialog"
      aria-label={`Annotation ${index + 1}`}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="hv-annotation-bubble-kicker">Annotation {index + 1}</div>
      <div className="hv-annotation-bubble-meta">
        <strong>{annotation.author}</strong>
        <span>{new Date(annotation.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
      </div>

      {editing ? (
        <textarea
          className="hv-annotation-textarea"
          value={draft}
          rows={5}
          autoFocus
          aria-label={`Edit annotation ${index + 1}`}
          onChange={(event) => setDraft(event.target.value)}
        />
      ) : (
        <p className="hv-annotation-bubble-text">{annotation.text}</p>
      )}

      {!readOnly ? (
        <div className="hv-annotation-bubble-actions">
          {editing ? (
            <>
              <button type="button" onClick={save} disabled={!draft.trim()}>
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setDraft(annotation.text);
                  setEditing(false);
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button type="button" onClick={() => setEditing(true)}>
              Edit
            </button>
          )}
          {editing ? (
            <button type="button" onClick={onDelete}>
              Delete
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
