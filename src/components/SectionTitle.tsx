
export default function SectionTitle({label, className}: {label: string; className?: string}) {
  return (
    <>
    <div className="mb-4 text-center">
      <p className={`text-xs font-medium uppercase tracking-[0.32em] text-foreground/60 ${className ?? ""}`}>
        {label}
      </p>
    </div>
  </>
  )
}
