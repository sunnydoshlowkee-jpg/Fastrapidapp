import { Pencil, X } from 'lucide-react'
import { AdminSettingsFormField } from './AdminSettingsFormField'

function GeofenceMapPlaceholder() {
  return (
    <div className="relative h-48 overflow-hidden rounded-lg border border-gray-200 bg-[#e8e4df]">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />
      <svg
        viewBox="0 0 320 192"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <polygon
          points="80,40 240,50 260,140 120,160 60,100"
          fill="rgba(255,107,44,0.35)"
          stroke="#FF6B2C"
          strokeWidth="2"
        />
      </svg>
    </div>
  )
}

export default function AdminDeliveryZoneEditPanel({
  panelCopy,
  zone,
  draft,
  onChange,
  onClose,
  onDiscard,
  onUpdate,
}) {
  if (!zone || !draft) return null

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-30 bg-black/30 lg:left-60 xl:left-64"
        aria-label="Close panel"
        onClick={onClose}
      />

      <aside
        className="fixed bottom-0 right-0 top-0 z-40 flex w-full max-w-md flex-col border-l border-gray-200 bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="zone-edit-title"
      >
        <header className="flex items-start justify-between gap-3 border-b border-gray-100 px-5 py-4">
          <div>
            <h2 id="zone-edit-title" className="text-lg font-bold text-gray-900">
              {panelCopy.title}
            </h2>
            <p className="mt-0.5 text-xs font-medium text-gray-400">{zone.id}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="mb-6">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              {panelCopy.statusLabel}
            </p>
            <span
              className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                draft.active
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {draft.active ? panelCopy.activeBadge : panelCopy.inactiveBadge}
            </span>
          </div>

          <div className="space-y-5">
            <AdminSettingsFormField
              id="zoneName"
              label={panelCopy.fields.name}
              value={draft.name}
              onChange={(e) => onChange({ name: e.target.value })}
            />
            <AdminSettingsFormField
              id="zoneBaseFee"
              label={panelCopy.fields.baseFee}
              value={draft.baseFee}
              onChange={(e) => onChange({ baseFee: e.target.value })}
            />
            <AdminSettingsFormField
              id="zoneSurge"
              label={panelCopy.fields.surge}
              value={draft.surge}
              onChange={(e) => onChange({ surge: e.target.value })}
            />
          </div>

          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-bold text-gray-900">{panelCopy.geofence.title}</p>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-sm font-semibold text-rapid-orange transition-colors hover:text-[#E84A15]"
              >
                <Pencil size={14} strokeWidth={2} aria-hidden />
                {panelCopy.geofence.redrawLabel}
              </button>
            </div>
            <GeofenceMapPlaceholder />
          </div>
        </div>

        <footer className="flex gap-3 border-t border-gray-100 px-5 py-4">
          <button
            type="button"
            onClick={onDiscard}
            className="flex-1 rounded-lg bg-gray-200 py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-300"
          >
            {panelCopy.discardLabel}
          </button>
          <button
            type="button"
            onClick={onUpdate}
            className="flex-1 rounded-lg bg-rapid-orange py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#E84A15]"
          >
            {panelCopy.updateLabel}
          </button>
        </footer>
      </aside>
    </>
  )
}
