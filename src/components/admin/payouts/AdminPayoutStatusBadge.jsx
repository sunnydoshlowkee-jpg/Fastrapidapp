const styles = {
  pending: 'bg-emerald-50 text-emerald-800',
  processing: 'bg-gray-100 text-gray-600',
  failed: 'bg-red-50 text-red-600',
}

export default function AdminPayoutStatusBadge({ status, label }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] ?? styles.processing
      }`}
    >
      {label}
    </span>
  )
}
