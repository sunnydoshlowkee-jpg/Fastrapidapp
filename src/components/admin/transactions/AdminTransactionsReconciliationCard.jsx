export default function AdminTransactionsReconciliationCard({ reconciliation }) {
  return (
    <article className="relative overflow-hidden rounded-xl bg-gradient-to-br from-violet-600 via-violet-600 to-indigo-700 p-6 text-white shadow-sm">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/90">
          {reconciliation.title}
        </p>
      </div>

      <p className="mt-4 text-4xl font-bold tracking-tight">{reconciliation.amount}</p>
      <p className="mt-1 text-sm text-white/80">{reconciliation.subtitle}</p>

      <div className="mt-8 flex items-center gap-3">
        <div className="flex -space-x-2">
          {Array.from({ length: reconciliation.nodeCount }).map((_, i) => (
            <span
              key={i}
              className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-violet-600 bg-white/20 text-[10px] font-bold backdrop-blur-sm"
              aria-hidden
            >
              {i + 1}
            </span>
          ))}
        </div>
        <p className="text-sm font-medium text-white/90">{reconciliation.nodesLabel}</p>
      </div>
    </article>
  )
}
