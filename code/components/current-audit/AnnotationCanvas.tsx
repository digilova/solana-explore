"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { TOKENS_XYZ_AUDIT_IMAGE_HEIGHT, TOKENS_XYZ_AUDIT_IMAGE_WIDTH, type AuditAnnotation } from "@/lib/tokensXyzAudit";
import AnnotationBubble from "./AnnotationBubble";
import AnnotationPin from "./AnnotationPin";

type AnnotationCanvasProps = {
  imageSrc: string;
  annotations: AuditAnnotation[];
  adding: boolean;
  readOnly: boolean;
  activeId: string | null;
  onAdd: (xPct: number, yPct: number) => string;
  onActiveChange: (id: string | null) => void;
  onUpdate: (id: string, patch: Partial<Pick<AuditAnnotation, "text" | "xPct" | "yPct">>) => void;
  onDelete: (id: string) => void;
};

function pointToPct(clientX: number, clientY: number, element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return {
    xPct: ((clientX - rect.left) / rect.width) * 100,
    yPct: ((clientY - rect.top) / rect.height) * 100,
  };
}

export default function AnnotationCanvas({
  imageSrc,
  annotations,
  adding,
  readOnly,
  activeId,
  onAdd,
  onActiveChange,
  onUpdate,
  onDelete,
}: AnnotationCanvasProps) {
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ id: string; moved: boolean } | null>(null);
  const suppressOpenRef = useRef<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onActiveChange(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onActiveChange]);

  const activeAnnotation = annotations.find((annotation) => annotation.id === activeId) ?? null;
  const activeIndex = activeAnnotation ? annotations.findIndex((annotation) => annotation.id === activeAnnotation.id) : -1;

  const handleCanvasClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget && event.target !== surfaceRef.current) return;
    if (readOnly) {
      onActiveChange(null);
      return;
    }
    if (!adding || !surfaceRef.current) {
      onActiveChange(null);
      return;
    }
    const { xPct, yPct } = pointToPct(event.clientX, event.clientY, surfaceRef.current);
    onActiveChange(onAdd(xPct, yPct));
  };

  const handleDragStart = (event: PointerEvent<HTMLButtonElement>, id: string) => {
    if (readOnly) return;
    if (!surfaceRef.current) return;
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { id, moved: false };
    setDraggingId(id);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || !surfaceRef.current) return;
    const { xPct, yPct } = pointToPct(event.clientX, event.clientY, surfaceRef.current);
    dragRef.current.moved = true;
    onUpdate(dragRef.current.id, { xPct, yPct });
  };

  const handlePointerUp = () => {
    if (dragRef.current?.moved) {
      suppressOpenRef.current = dragRef.current.id;
      onActiveChange(dragRef.current.id);
    }
    dragRef.current = null;
    setDraggingId(null);
  };

  const handleOpen = (id: string) => {
    if (suppressOpenRef.current === id) {
      suppressOpenRef.current = null;
      return;
    }
    onActiveChange(id);
  };

  return (
    <div className="hv-annotation-scroll">
      <div
        ref={surfaceRef}
        className="hv-annotation-surface"
        data-adding={adding}
        data-dragging={draggingId ? "true" : "false"}
        onClick={handleCanvasClick}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <Image
          src={imageSrc}
          alt="Screenshot of the current tokens.xyz SpaceX page for audit annotations"
          width={TOKENS_XYZ_AUDIT_IMAGE_WIDTH}
          height={TOKENS_XYZ_AUDIT_IMAGE_HEIGHT}
          priority
          unoptimized
          className="hv-annotation-image"
        />

        {annotations.map((annotation, index) => (
          <AnnotationPin
            key={annotation.id}
            annotation={annotation}
            index={index}
            active={annotation.id === activeId}
            readOnly={readOnly}
            onOpen={handleOpen}
            onDragStart={handleDragStart}
          />
        ))}

        {activeAnnotation ? (
          <AnnotationBubble
            key={activeAnnotation.id}
            annotation={activeAnnotation}
            index={activeIndex}
            readOnly={readOnly}
            onSave={(text) => onUpdate(activeAnnotation.id, { text })}
            onDelete={() => {
              onDelete(activeAnnotation.id);
              onActiveChange(null);
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
