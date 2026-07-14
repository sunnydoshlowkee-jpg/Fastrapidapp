const styles = {
  superAdmin: 'bg-violet-100 text-violet-800',
  operations: 'bg-gray-100 text-gray-600',
  finance: 'bg-gray-100 text-gray-600',
  support: 'bg-gray-100 text-gray-600',
}

export default function AdminTeamClearanceBadge({ clearance, label }) {
  return (
    <span
      className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
        styles[clearance] ?? styles.operations
      }`}
    >
      {label}
    </span>
  )
}
