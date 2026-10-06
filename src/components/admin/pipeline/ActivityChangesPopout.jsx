function displayVal(val) {
  if (Array.isArray(val)) {
    if (val.length === 0) return '(none)'
    return val.join(', ')
  }
  if (val === null || val === undefined || val === '') return '(none)'
  if (typeof val === 'string') return val.trim() || '(none)'
  return String(val)
}

export function hasActivityDetails(entry) {
  if (!entry?.metadata) return false
  if (entry.action === 'updated' && entry.metadata.changes && Object.keys(entry.metadata.changes).length > 0) return true
  return Boolean(entry.metadata.from || entry.metadata.to)
}

export default function ActivityChangesCallout({ entry }) {
  const metadata = entry?.metadata
  if (!metadata) return null

  if (entry.action === 'updated' && metadata.changes && Object.keys(metadata.changes).length > 0) {
    return (
      <div className="mt-2 space-y-2.5 rounded-lg bg-gray-50 ring-1 ring-gray-100 p-3">
        {Object.entries(metadata.changes).map(([key, change]) => (
          <div key={key}>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">{change.label || key}</p>
            <p className="mt-0.5 text-xs text-gray-600 break-words">
              <span className="line-through text-gray-400">{displayVal(change.old)}</span>
              <span className="mx-1 text-gray-300">→</span>
              <span className="font-medium text-gray-900">{displayVal(change.new)}</span>
            </p>
          </div>
        ))}
      </div>
    )
  }

  if (metadata.from || metadata.to) {
    return (
      <div className="mt-2 rounded-lg bg-gray-50 ring-1 ring-gray-100 p-3">
        <p className="text-xs text-gray-600 break-words">
          <span className="line-through text-gray-400">{displayVal(metadata.from)}</span>
          <span className="mx-1 text-gray-300">→</span>
          <span className="font-medium text-gray-900">{displayVal(metadata.to)}</span>
        </p>
      </div>
    )
  }

  return null
}