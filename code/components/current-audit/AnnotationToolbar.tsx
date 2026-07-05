type AnnotationToolbarProps = {
  adding: boolean;
  count: number;
  copied: boolean;
  readOnly: boolean;
  onToggleAdding: () => void;
  onReset: () => void;
  onCopy: () => void;
};

export default function AnnotationToolbar({
  adding,
  count,
  copied,
  readOnly,
  onToggleAdding,
  onReset,
  onCopy,
}: AnnotationToolbarProps) {
  return (
    <div className="hv-annotation-toolbar" aria-label="Audit annotation tools">
      {readOnly ? (
        <span className="hv-annotation-status">Published snapshot</span>
      ) : (
        <>
          <button type="button" className="hv-annotation-tool" aria-pressed={adding} data-active={adding} onClick={onToggleAdding}>
            Add comment
          </button>
          <button type="button" className="hv-annotation-tool" onClick={onReset}>
            Reset to seed
          </button>
        </>
      )}
      <span className="hv-annotation-count">{count} annotations</span>
      <button type="button" className="hv-annotation-tool" onClick={onCopy}>
        {copied ? "Copied JSON" : "Copy JSON"}
      </button>
    </div>
  );
}
