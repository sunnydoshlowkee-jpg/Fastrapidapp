import { Pencil } from 'lucide-react'

export default function AdminDeliveryZoneCard({ zone, onEdit, onToggleActive }) {
  const isActive = zone.active

  return (
    <article
      className={`relative overflow-hidden rounded-xl border bg-white shadow-sm ${
        isActive ? 'border-gray-200' : 'border-gray-200 opacity-90'
      }`}
    >
      <div
        className={`h-1 ${isActive ? 'bg-emerald-500' : 'bg-gray-300'}`}
        aria-hidden
      />

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3
              className={`text-base font-bold ${isActive ? 'text-gray-900' : 'text-gray-500'}`}
            >
              {zone.name}
            </h3>
            <p className="mt-0.5 text-xs font-medium text-gray-400">{zone.id}</p>
          </div>
          <button
            type="button"
            onClick={() => onEdit(zone.id)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label={`Edit ${zone.name}`}
          >
            <Pencil size={16} strokeWidth={2} />
          </button>
        </div>

        <dl className="mt-5 space-y-3">
          <div className="flex items-center justify-between">
            <dt className="text-xs font-medium text-gray-500">Base Fee</dt>
            <dd
              className={`text-sm font-bold ${
                isActive ? 'text-rapid-orange' : 'text-gray-400'
              }`}
            >
              ₦{zone.baseFee}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-xs font-medium text-gray-500">Surge</dt>
            <dd className={`text-sm font-bold ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
              {zone.surge}x
            </dd>
          </div>
        </dl>

        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
          <span
            className={`text-xs font-bold uppercase tracking-wide ${
              isActive ? 'text-emerald-600' : 'text-gray-400'
            }`}
          >
            {isActive ? 'Active' : 'Inactive'}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={isActive}
            onClick={() => onToggleActive(zone.id)}
            className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
              isActive ? 'bg-emerald-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                isActive ? 'left-[1.35rem]' : 'left-0.5'
              }`}
            />
          </button>
        </div>
      </div>
    </article>
  )
}
