export default function AdminAuditLogStateChip({ state }) {
  const isNull = state.tone === 'null'
  const isSuccess = state.tone === 'success'

  return (
    <span
      className={`inline-block rounded-md px-2.5 py-1 text-xs font-medium ${
        isSuccess
          ? 'bg-emerald-500 text-white'
          : isNull
            ? 'italic text-gray-400'
            : 'bg-gray-100 text-gray-700'
      }`}
    >
      {state.label}
    </span>
  )
}
