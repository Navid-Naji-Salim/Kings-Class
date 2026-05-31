export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "brand-mark brand-mark--compact" : "brand-mark"} aria-hidden="true">
      <span className="brand-mark__k">K</span>
      <span className="brand-mark__gold" />
      <span className="brand-mark__burgundy" />
      <span className="brand-mark__steel" />
    </div>
  );
}
