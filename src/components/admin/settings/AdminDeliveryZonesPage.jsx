import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Plus } from 'lucide-react'
import { ADMIN_DELIVERY_ZONES } from '../../../services/data/adminDeliveryZones.mock'
import { ADMIN_NOTIFICATIONS_PATH } from '../../../services/data/adminNotifications.mock'
import {
  fetchAdminSettingsGroup,
  saveAdminSettingsGroup,
} from '../../../services/adminSettingsService'
import AdminDeliveryZoneCard from './AdminDeliveryZoneCard'
import AdminDeliveryZoneEditPanel from './AdminDeliveryZoneEditPanel'
import AdminSettingsBreadcrumbs from './AdminSettingsBreadcrumbs'

function fromApiZone(z) {
  return {
    id: z.id,
    name: z.name,
    baseFee: String(z.base_fee ?? z.baseFee ?? ''),
    surge: String(z.surge ?? '1'),
    active: Boolean(z.active),
  }
}

function toApiZone(z) {
  return {
    id: z.id,
    name: z.name,
    base_fee: Number(z.baseFee) || 0,
    surge: Number(z.surge) || 1,
    active: Boolean(z.active),
  }
}

export default function AdminDeliveryZonesPage() {
  const data = ADMIN_DELIVERY_ZONES
  const [zones, setZones] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [draft, setDraft] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const persist = async (nextZones) => {
    setSaving(true)
    setError('')
    try {
      const result = await saveAdminSettingsGroup('delivery_zones', {
        zones: nextZones.map(toApiZone),
      })
      const saved = (result.data?.zones || []).map(fromApiZone)
      setZones(saved)
      setMessage('Delivery zones saved.')
      return saved
    } catch (err) {
      setError(err.message || 'Could not save zones.')
      throw err
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      try {
        const result = await fetchAdminSettingsGroup('delivery_zones')
        const list = (result.data?.zones || []).map(fromApiZone)
        if (!cancelled) setZones(list.length ? list : data.zones.map((z) => ({ ...z })))
      } catch (err) {
        if (!cancelled) {
          setZones(data.zones.map((z) => ({ ...z })))
          setError(err.message || 'Could not load zones.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [data.zones])

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

  const handleUpdate = async () => {
    if (!draft) return
    const next = zones.map((z) => (z.id === draft.id ? { ...draft } : z))
    try {
      await persist(next)
      closeEdit()
    } catch {
      /* error already set */
    }
  }

  const toggleActive = async (id) => {
    const next = zones.map((z) => (z.id === id ? { ...z, active: !z.active } : z))
    setZones(next)
    if (editingId === id && draft) {
      setDraft((prev) => (prev ? { ...prev, active: !prev.active } : prev))
    }
    try {
      await persist(next)
    } catch {
      /* keep optimistic UI; error shown */
    }
  }

  const addZone = async () => {
    const id = `zone-${Date.now()}`
    const next = [
      ...zones,
      { id, name: 'New zone', baseFee: '1000', surge: '1.0', active: true },
    ]
    try {
      const saved = await persist(next)
      const created = saved.find((z) => z.id === id) || next[next.length - 1]
      openEdit(created.id)
    } catch {
      /* error already set */
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
          </Link>
        </header>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-xl text-sm text-gray-600">{data.intro}</p>
          <button
            type="button"
            disabled={saving || loading}
            onClick={addZone}
            className="inline-flex items-center gap-2 rounded-lg bg-rapid-orange px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#E84A15] disabled:opacity-50"
          >
            {data.addZoneLabel}
            <Plus size={16} strokeWidth={2.5} aria-hidden />
          </button>
        </div>

        {message ? (
          <p className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {message}
          </p>
        ) : null}
        {error ? (
          <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}
        {loading ? <p className="mb-4 text-sm text-gray-500">Loading zones…</p> : null}

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
