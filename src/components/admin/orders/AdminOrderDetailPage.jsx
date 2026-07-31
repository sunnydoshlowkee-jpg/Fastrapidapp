import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ADMIN_ORDERS_PATH } from '../../../services/data/adminOrders.mock'
import {
  fetchAdminOrderDetail,
  mapAdminOrderDetailFromApi,
  updateAdminOrderStatus,
} from '../../../services/adminOrdersService'
import AdminOrderDetailItems from './AdminOrderDetailItems'
import AdminOrderDetailMobilePage from './AdminOrderDetailMobilePage'
import AdminOrderDetailSidebar from './AdminOrderDetailSidebar'
import AdminOrderDetailStakeholders from './AdminOrderDetailStakeholders'
import AdminOrderDetailStepper from './AdminOrderDetailStepper'

const STATUS_OPTIONS = [
  'pending',
  'accepted',
  'preparing',
  'ready_for_pickup',
  'on_the_way',
  'delivered',
  'cancelled',
]

export default function AdminOrderDetailPage({ order: initialOrder, onOrderChange }) {
  const [order, setOrder] = useState(initialOrder)
  const [statusDraft, setStatusDraft] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [statusOpen, setStatusOpen] = useState(false)

  const applyStatus = async (nextStatus) => {
    if (!nextStatus || saving) return
    setSaving(true)
    setError('')
    setMessage('')
    try {
      const rawId = String(order.referenceId || order.id || '').replace(/\D+/g, '')
      const payload = await updateAdminOrderStatus(rawId || order.id, nextStatus)
      const full = await fetchAdminOrderDetail(payload?.id || rawId || order.id)
      const mapped = mapAdminOrderDetailFromApi(full)
      setOrder(mapped)
      onOrderChange?.(mapped)
      setMessage(`Status updated to ${nextStatus.replaceAll('_', ' ')}.`)
      setStatusOpen(false)
      setStatusDraft('')
    } catch (err) {
      setError(err.message || 'Failed to update status.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div className="lg:hidden">
        <AdminOrderDetailMobilePage
          order={order}
          onForceStatus={(status) => applyStatus(status)}
          statusSaving={saving}
        />
      </div>

      <div className="hidden p-6 lg:block">
      <Link
        to={ADMIN_ORDERS_PATH}
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
      >
        <ArrowLeft size={16} strokeWidth={2} aria-hidden />
        Back to orders
      </Link>

      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Order {order.id}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {order.placedAt} • ID: {order.referenceId}
          </p>
          {message ? <p className="mt-2 text-sm font-medium text-emerald-700">{message}</p> : null}
          {error ? <p className="mt-2 text-sm font-medium text-red-600">{error}</p> : null}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {statusOpen ? (
            <>
              <select
                value={statusDraft}
                onChange={(e) => setStatusDraft(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
              >
                <option value="">Select status…</option>
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status.replaceAll('_', ' ')}
                  </option>
                ))}
              </select>
              <button
                type="button"
                disabled={!statusDraft || saving}
                onClick={() => applyStatus(statusDraft)}
                className="rounded-lg bg-rapid-orange px-4 py-2 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-[#E84A15] disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Apply'}
              </button>
              <button
                type="button"
                onClick={() => setStatusOpen(false)}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setStatusOpen(true)}
              className="rounded-lg bg-rapid-orange px-4 py-2 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-[#E84A15]"
            >
              {order.updateStatusLabel || 'Update Status'}
            </button>
          )}
        </div>
      </header>

      <div className="space-y-6">
        <AdminOrderDetailStepper steps={order.steps} />
        <AdminOrderDetailStakeholders stakeholders={order.stakeholders} />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <AdminOrderDetailItems items={order.items} />
          </div>
          <div>
            <AdminOrderDetailSidebar
              adminActions={order.adminActions}
              notes={{
                ...order.notes,
                placeholder: 'Internal notes are Phase 2 — use Update Status for ops actions.',
                saveLabel: 'Coming soon',
              }}
              onForceCancel={() => applyStatus('cancelled')}
            />
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
