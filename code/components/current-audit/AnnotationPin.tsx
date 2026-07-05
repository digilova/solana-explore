import type { PointerEvent } from "react";
import type { AuditAnnotation } from "@/lib/tokensXyzAudit";

type AnnotationPinProps = {
  annotation: AuditAnnotation;
  index: number;
  active: boolean;
  readOnly: boolean;
  onOpen: (id: string) => void;
  onDragStart: (event: PointerEvent<HTMLButtonElement>, id: string) => void;
};

export default function AnnotationPin({ annotation, index, active, readOnly, onOpen, onDragStart }: AnnotationPinProps) {
  return (
    <button
      type="button"
      className="hv-annotation-pin"
      data-active={active}
      style={{ left: `${annotation.xPct}%`, top: `${annotation.yPct}%` }}
      aria-label={`Open annotation ${index + 1}`}
      title={annotation.text}
      onClick={(event) => {
        event.stopPropagation();
        onOpen(annotation.id);
      }}
      onPointerDown={readOnly ? undefined : (event) => onDragStart(event, annotation.id)}
    >
      {index + 1}
    </button>
  );
}
