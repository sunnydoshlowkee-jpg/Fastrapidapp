const STATUS_STYLES = {
  delivered: 'bg-emerald-100 text-emerald-700',
  canceled: 'bg-gray-100 text-gray-600',
  pending: 'bg-amber-100 text-amber-700',
  failed: 'bg-red-100 text-red-700',
}

export default function AdminUserOrderStatusBadge({ status, label }) {
  const tone = STATUS_STYLES[status] ?? STATUS_STYLES.pending
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tone}`}
    >
      {label}
    </span>
  )
}
