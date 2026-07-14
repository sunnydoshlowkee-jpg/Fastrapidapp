const STATUS_STYLES = {
  active: 'bg-emerald-100 text-emerald-700',
  inactive: 'bg-gray-100 text-gray-600',
  suspended: 'bg-red-100 text-red-600',
  banned: 'bg-gray-900 text-white',
}

export default function AdminUserStatusBadge({ status, label }) {
  const tone = STATUS_STYLES[status] ?? STATUS_STYLES.inactive
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tone}`}
    >
      {label}
    </span>
  )
}
