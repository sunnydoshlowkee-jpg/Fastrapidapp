const styles = {
  active: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
  review: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
  suspended: 'bg-red-50 text-red-700 ring-1 ring-red-100',
  rejected: 'bg-gray-100 text-gray-600 ring-1 ring-gray-200',
  pending: 'bg-violet-50 text-violet-700 ring-1 ring-violet-100',
}

export default function AdminMerchantStatusBadge({ status, label }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
        styles[status] ?? styles.review
      }`}
    >
      {label}
    </span>
  )
}
