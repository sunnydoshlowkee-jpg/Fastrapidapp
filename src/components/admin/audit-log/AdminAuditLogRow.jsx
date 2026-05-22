import { ArrowRight, ExternalLink } from 'lucide-react'
import AdminAuditLogStateChip from './AdminAuditLogStateChip'

const accentBar = {
  modified: 'bg-rapid-orange',
  deleted: 'bg-red-500',
  created: 'bg-emerald-500',
}

const actionBadge = {
  modified: 'bg-orange-50 text-rapid-orange',
  deleted: 'bg-red-50 text-red-700',
  created: 'bg-emerald-50 text-emerald-700',
}

export default function AdminAuditLogRow({ entry }) {
  return (
    <tr className="border-b border-gray-100 bg-white last:border-0">
      <td className="w-1 p-0">
        <span className={`block h-full min-h-[5.5rem] w-1 ${accentBar[entry.accent]}`} aria-hidden />
      </td>
      <td className="px-4 py-4 align-top">
        <div className="flex items-center gap-3">
          {entry.admin.avatar ? (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-600">
              {entry.admin.initials}
            </span>
          ) : (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
              {entry.admin.initials}
            </span>
          )}
          <div>
            <p className="text-sm font-semibold text-gray-900">{entry.admin.name}</p>
            <p className="text-xs text-gray-500">ID: {entry.admin.id}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 align-top">
        <span
          className={`inline-flex rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${actionBadge[entry.actionType]}`}
        >
          {entry.actionLabel}
        </span>
        <p className="mt-1.5 text-sm text-gray-700">{entry.actionDescription}</p>
      </td>
      <td className="px-4 py-4 align-top">
        <a
          href={`#${entry.entityId}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-800"
        >
          {entry.entityId}
          <ExternalLink size={14} strokeWidth={2} aria-hidden />
        </a>
      </td>
      <td className="px-4 py-4 align-top">
        <div className="flex flex-wrap items-center gap-2">
          <AdminAuditLogStateChip state={entry.before} />
          <ArrowRight size={14} className="shrink-0 text-gray-300" aria-hidden />
          <AdminAuditLogStateChip state={entry.after} />
        </div>
      </td>
      <td className="px-4 py-4 align-top text-right">
        <p className="text-sm font-medium text-gray-800">{entry.ip}</p>
        <p className="mt-0.5 text-xs text-gray-500">{entry.time}</p>
      </td>
    </tr>
  )
}
