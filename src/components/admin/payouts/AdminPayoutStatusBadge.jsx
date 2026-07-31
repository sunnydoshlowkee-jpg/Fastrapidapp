const styles = {
  pending: 'bg-amber-50 text-amber-800',
  processing: 'bg-gray-100 text-gray-600',
  success: 'bg-emerald-50 text-emerald-800',
  failed: 'bg-red-50 text-red-600',
}

export default function AdminPayoutStatusBadge({ status, label }) {
  const text = label || (status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Pending')

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] ?? styles.processing
      }`}
    >
      {text}
    </span>
  )
}
