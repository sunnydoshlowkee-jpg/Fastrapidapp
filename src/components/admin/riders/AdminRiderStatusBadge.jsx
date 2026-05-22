const dotStyles = {
  on_trip: 'bg-rapid-orange',
  available: 'bg-teal-400',
  offline: 'bg-gray-400',
}

export default function AdminRiderStatusBadge({ status, label }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800">
      <span
        className={`h-2 w-2 shrink-0 rounded-full ${dotStyles[status] ?? dotStyles.offline}`}
        aria-hidden
      />
      {label}
    </span>
  )
}
