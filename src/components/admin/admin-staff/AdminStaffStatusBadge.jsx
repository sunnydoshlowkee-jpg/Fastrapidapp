const TONES = {
  active: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  suspended: 'bg-red-50 text-red-700 ring-red-600/20',
  deactivated: 'bg-gray-100 text-gray-600 ring-gray-500/20',
}

export default function AdminStaffStatusBadge({ status, label }) {
  const tone = TONES[status] || 'bg-gray-100 text-gray-600 ring-gray-500/20'
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${tone}`}
    >
      {label}
    </span>
  )
}
