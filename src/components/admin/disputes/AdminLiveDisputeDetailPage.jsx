import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  addAdminDisputeNote,
  fetchAdminDispute,
  resolveAdminDispute,
  updateAdminDisputeStatus,
} from '../../../services/adminDisputesService'

function formatWhen(iso) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

export default function AdminLiveDisputeDetailPage() {
  const { disputeId } = useParams()
  const [dispute, setDispute] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [note, setNote] = useState('')
  const [busy, setBusy] = useState(false)

  const reload = async () => {
    const data = await fetchAdminDispute(disputeId)
    setDispute(data)
  }

  useEffect(() => {
    if (!disputeId) return undefined
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError('')
      try {
        const data = await fetchAdminDispute(disputeId)
        if (!cancelled) setDispute(data)
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load dispute.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [disputeId])

  if (!disputeId) return <Navigate to="/admin/disputes" replace />

  const run = async (fn) => {
    setBusy(true)
    setError('')
    try {
      await fn()
      await reload()
    } catch (err) {
      setError(err.message || 'Action failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="p-4 lg:p-6">
      <Link to="/admin/disputes" className="text-sm font-semibold text-rapid-orange hover:underline">
        ← Back to disputes
      </Link>

      {loading ? (
        <p className="mt-6 text-sm text-gray-500">Loading dispute…</p>
      ) : error && !dispute ? (
        <p className="mt-6 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : dispute ? (
        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <header>
              <h1 className="text-2xl font-bold text-gray-900">Dispute #{dispute.id}</h1>
              <p className="mt-1 text-sm text-gray-500">{dispute.parties}</p>
              <p className="mt-2 text-sm text-gray-700">{dispute.reason}</p>
            </header>

            {error ? (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            ) : null}

            <article className="rounded-xl border border-gray-200 bg-white p-4">
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500">Notes</h2>
              <ul className="mt-3 space-y-3">
                {(dispute.notes || []).length === 0 ? (
                  <li className="text-sm text-gray-500">No notes yet.</li>
                ) : (
                  dispute.notes.map((n) => (
                    <li key={n.id} className="rounded-lg bg-gray-50 px-3 py-2 text-sm">
                      <p className="font-semibold text-gray-800">{n.author}</p>
                      <p className="mt-1 text-gray-700">{n.body}</p>
                      <p className="mt-1 text-xs text-gray-400">{formatWhen(n.created_at)}</p>
                    </li>
                  ))
                )}
              </ul>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  placeholder="Internal investigation note…"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  disabled={busy || !note.trim()}
                  onClick={() =>
                    run(async () => {
                      await addAdminDisputeNote(dispute.id, note.trim())
                      setNote('')
                    })
                  }
                  className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
                >
                  Add note
                </button>
              </div>
            </article>
          </div>

          <aside className="space-y-4">
            <article className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-xs font-bold uppercase text-gray-400">Status</p>
              <p className="mt-1 text-lg font-bold text-gray-900">
                {dispute.status_label || dispute.status}
              </p>
              <p className="mt-3 text-xs font-bold uppercase text-gray-400">Amount</p>
              <p className="mt-1 text-lg font-bold text-red-600">{dispute.amount_label}</p>
              {dispute.order_id ? (
                <Link
                  to={`/admin/orders/${dispute.order_id}`}
                  className="mt-3 inline-block text-sm font-semibold text-rapid-orange hover:underline"
                >
                  View order #{dispute.order_id}
                </Link>
              ) : null}
              {dispute.resolution ? (
                <p className="mt-3 text-sm text-gray-600">
                  Resolution: <strong>{dispute.resolution}</strong>
                </p>
              ) : null}
            </article>

            <article className="rounded-xl border border-gray-200 bg-white p-4 space-y-2">
              <p className="text-xs font-bold uppercase text-gray-400">Actions</p>
              <button
                type="button"
                disabled={busy}
                onClick={() => run(() => updateAdminDisputeStatus(dispute.id, 'under_review'))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold"
              >
                Mark under review
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => run(() => updateAdminDisputeStatus(dispute.id, 'escalated'))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold"
              >
                Escalate
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => run(() => resolveAdminDispute(dispute.id, 'refund_user', note || undefined))}
                className="w-full rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white"
              >
                Resolve: refund user
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() =>
                  run(() => resolveAdminDispute(dispute.id, 'favor_merchant', note || undefined))
                }
                className="w-full rounded-lg bg-gray-800 px-3 py-2 text-sm font-semibold text-white"
              >
                Resolve: favor merchant
              </button>
              <p className="text-xs text-gray-400">
                Resolution records the outcome. Wallet refunds are not auto-executed yet.
              </p>
            </article>
          </aside>
        </div>
      ) : null}
    </div>
  )
}
