import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Plus } from 'lucide-react'
import {
  ADMIN_DELIVERY_ZONES,
  cloneZones,
} from '../../../services/data/adminDeliveryZones.mock'
import { ADMIN_NOTIFICATIONS_PATH } from '../../../services/data/adminNotifications.mock'
import AdminDeliveryZoneCard from './AdminDeliveryZoneCard'
import AdminDeliveryZoneEditPanel from './AdminDeliveryZoneEditPanel'
import AdminSettingsBreadcrumbs from './AdminSettingsBreadcrumbs'

export default function AdminDeliveryZonesPage() {
  const data = ADMIN_DELIVERY_ZONES
  const [zones, setZones] = useState(() => cloneZones(data.zones))
  const defaultZone = data.zones[0]
  const [editingId, setEditingId] = useState(defaultZone?.id ?? null)
  const [draft, setDraft] = useState(() =>
    defaultZone ? { ...defaultZone } : null,
  )

  const editingZone = useMemo(
    () => zones.find((z) => z.id === editingId) ?? null,
    [zones, editingId],
  )

  const openEdit = (id) => {
    const zone = zones.find((z) => z.id === id)
    if (!zone) return
    setEditingId(id)
    setDraft({ ...zone })
  }

  const closeEdit = () => {
    setEditingId(null)
    setDraft(null)
  }

  const handleDraftChange = (patch) => {
    setDraft((prev) => (prev ? { ...prev, ...patch } : prev))
  }

  const handleDiscard = () => {
    if (editingZone) setDraft({ ...editingZone })
    else closeEdit()
  }

  const handleUpdate = () => {
    if (!draft) return
    setZones((prev) => prev.map((z) => (z.id === draft.id ? { ...draft } : z)))
    closeEdit()
  }

  const toggleActive = (id) => {
    setZones((prev) =>
      prev.map((z) => (z.id === id ? { ...z, active: !z.active } : z)),
    )
    if (editingId === id && draft) {
      setDraft((prev) => (prev ? { ...prev, active: !prev.active } : prev))
    }
  }

  return (
    <div className="relative min-h-full">
      <div className={`p-6 transition-[margin] ${editingId ? 'lg:mr-96' : ''}`}>
        <header className="mb-4 flex items-start justify-between gap-4">
          <AdminSettingsBreadcrumbs items={data.breadcrumbs} />
          <Link
            to={ADMIN_NOTIFICATIONS_PATH}
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50"
            aria-label="Notifications"
          >
            <Bell size={18} strokeWidth={1.75} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </Link>
        </header>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-xl text-sm text-gray-600">{data.intro}</p>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-rapid-orange px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#E84A15]"
          >
            {data.addZoneLabel}
            <Plus size={16} strokeWidth={2.5} aria-hidden />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {zones.map((zone) => (
            <AdminDeliveryZoneCard
              key={zone.id}
              zone={zone}
              onEdit={openEdit}
              onToggleActive={toggleActive}
            />
          ))}
        </div>
      </div>

      {editingId && draft ? (
        <AdminDeliveryZoneEditPanel
          panelCopy={data.editPanel}
          zone={editingZone}
          draft={draft}
          onChange={handleDraftChange}
          onClose={closeEdit}
          onDiscard={handleDiscard}
          onUpdate={handleUpdate}
        />
      ) : null}
    </div>
  )
}
