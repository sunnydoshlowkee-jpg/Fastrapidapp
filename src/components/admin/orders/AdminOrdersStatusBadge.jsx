import { Check } from 'lucide-react'

const styles = {
  preparing: 'bg-violet-100 text-violet-700',
  live: 'bg-violet-100 text-violet-700',
  dispatched: 'bg-gray-100 text-gray-600',
  delivered: 'bg-emerald-50 text-emerald-700',
  cancelled: 'bg-gray-100 text-gray-500',
  failed: 'bg-red-50 text-red-700',
  refunded: 'bg-amber-50 text-amber-800',
}

export default function AdminOrdersStatusBadge({ status, label }) {
  const showCheck = status === 'delivered'
  const showDot = status === 'preparing' || status === 'live'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[status] ?? styles.dispatched
      }`}
    >
      {showCheck ? <Check size={12} strokeWidth={2.5} aria-hidden /> : null}
      {showDot ? (
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" aria-hidden />
      ) : null}
      {label}
    </span>
  )
}
