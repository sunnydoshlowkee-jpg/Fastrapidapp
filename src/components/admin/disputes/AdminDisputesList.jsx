import { SlidersHorizontal } from 'lucide-react'
import AdminDisputeStatusBadge from './AdminDisputeStatusBadge'

export default function AdminDisputesList({ title, disputes, selectedId, onSelect }) {
  return (
    <aside className="flex w-full max-w-sm shrink-0 flex-col border-r border-gray-200 bg-white lg:w-80 xl:w-[22rem]">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">{title}</h2>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-700"
          aria-label="Filter disputes"
        >
          <SlidersHorizontal size={16} strokeWidth={2} />
        </button>
      </div>

      <ul className="flex-1 overflow-y-auto">
        {disputes.map((dispute) => {
          const isSelected = dispute.id === selectedId
          return (
            <li key={dispute.id}>
              <button
                type="button"
                onClick={() => onSelect(dispute.id)}
                className={`relative w-full border-b border-gray-50 px-4 py-4 text-left transition-colors hover:bg-gray-50 ${
                  isSelected ? 'bg-orange-50/50' : 'bg-white'
                }`}
              >
                {isSelected ? (
                  <span
                    className="absolute left-0 top-0 h-full w-1 bg-rapid-orange"
                    aria-hidden
                  />
                ) : null}
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-bold text-gray-900">#{dispute.id}</span>
                  <AdminDisputeStatusBadge label={dispute.statusLabel} status={dispute.status} />
                </div>
                <p className="mt-2 text-sm text-gray-700">{dispute.parties}</p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-red-600">{dispute.amount}</span>
                  <span className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                    {dispute.openTime}
                  </span>
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
