import { ExternalLink, Landmark, Truck } from 'lucide-react'

const ICON_MAP = {
  truck: Truck,
  bank: Landmark,
  external: ExternalLink,
}

export default function AdminUserKpiCard({ kpi }) {
  const Icon = ICON_MAP[kpi.icon] ?? Truck
  const isViolet = kpi.tone === 'violet'

  return (
    <article
      className={`relative overflow-hidden rounded-xl p-5 shadow-sm ring-1 ${
        isViolet
          ? 'bg-violet-100 ring-violet-200'
          : 'bg-white ring-gray-100'
      }`}
    >
      {isViolet ? (
        <button
          type="button"
          aria-label="Open wallet ledger"
          className="absolute right-4 top-4 rounded-md p-1 text-violet-700 transition-colors hover:bg-violet-200"
        >
          <Icon size={16} strokeWidth={2} />
        </button>
      ) : (
        <Icon
          size={56}
          strokeWidth={1.25}
          className="pointer-events-none absolute -bottom-1 -right-1 text-gray-200"
          aria-hidden
        />
      )}

      <p
        className={`text-[11px] font-bold uppercase tracking-wider ${
          isViolet ? 'text-violet-700' : 'text-gray-500'
        }`}
      >
        {kpi.label}
      </p>
      <p
        className={`mt-2 text-2xl font-bold tracking-tight ${
          isViolet ? 'text-violet-900' : 'text-gray-900'
        }`}
      >
        {kpi.value}
      </p>
    </article>
  )
}
