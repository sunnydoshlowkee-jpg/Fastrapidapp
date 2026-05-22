import { User } from 'lucide-react'

const priorityStyles = {
  high: 'bg-gray-100 text-gray-600',
  normal: 'bg-gray-100 text-gray-600',
  urgent: 'bg-red-50 text-red-600',
}

export default function AdminSupportTicketCard({ ticket, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-xl border bg-white p-5 text-left shadow-sm transition-colors hover:border-orange-200 ${
        isSelected ? 'border-orange-300 ring-1 ring-orange-200' : 'border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`text-sm font-bold ${isSelected ? 'text-rapid-orange' : 'text-gray-900'}`}
        >
          #{ticket.id}
        </span>
        <span
          className={`shrink-0 rounded-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
            priorityStyles[ticket.priority] ?? priorityStyles.normal
          }`}
        >
          {ticket.priorityLabel}
        </span>
      </div>

      <h3 className="mt-3 text-base font-bold text-gray-900">{ticket.title}</h3>
      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-gray-600">
        {ticket.description}
      </p>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
        {ticket.assignee ? (
          <div className="flex items-center gap-2">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${ticket.assignee.avatarTone}`}
            >
              {ticket.assignee.initials}
            </span>
            <span className="text-sm font-medium text-gray-700">{ticket.assignee.name}</span>
          </div>
        ) : (
          <span className="inline-flex items-center gap-2 text-sm text-gray-500">
            <User size={16} strokeWidth={1.75} className="text-gray-400" aria-hidden />
            Unassigned
          </span>
        )}
        <span className="text-xs text-gray-400">{ticket.time}</span>
      </div>
    </button>
  )
}
