import { AlertCircle, Check, Clock } from 'lucide-react'

const styles = {
  success: 'bg-emerald-50 text-emerald-700',
  failed: 'bg-red-50 text-red-600',
  pending: 'bg-gray-100 text-gray-600',
}

const icons = {
  success: Check,
  failed: AlertCircle,
  pending: Clock,
}

export default function AdminTransactionStatusBadge({ status, label }) {
  const Icon = icons[status] ?? Clock

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[status] ?? styles.pending
      }`}
    >
      <Icon size={12} strokeWidth={2.5} aria-hidden />
      {label}
    </span>
  )
}
