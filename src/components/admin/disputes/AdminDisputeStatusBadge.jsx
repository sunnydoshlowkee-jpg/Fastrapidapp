const styles = {
  escalated: 'bg-red-50 text-red-700',
  reviewing: 'bg-gray-100 text-gray-600',
  action_required: 'bg-red-50 text-red-700',
}

export default function AdminDisputeStatusBadge({ label, status }) {
  return (
    <span
      className={`inline-flex rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
        styles[status] ?? styles.reviewing
      }`}
    >
      {label}
    </span>
  )
}
