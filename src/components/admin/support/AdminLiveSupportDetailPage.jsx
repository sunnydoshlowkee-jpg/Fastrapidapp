import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  addAdminSupportMessage,
  fetchAdminSupportTicket,
  updateAdminSupportTicketStatus,
} from '../../../services/adminSupportService'

function formatWhen(iso) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

export default function AdminLiveSupportDetailPage() {
  const { ticketId } = useParams()
  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [body, setBody] = useState('')
  const [internal, setInternal] = useState(false)
  const [busy, setBusy] = useState(false)

  const reload = async () => {
    setTicket(await fetchAdminSupportTicket(ticketId))
  }

  useEffect(() => {
    if (!ticketId) return undefined
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError('')
      try {
        const data = await fetchAdminSupportTicket(ticketId)
        if (!cancelled) setTicket(data)
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load ticket.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [ticketId])

  if (!ticketId) return <Navigate to="/admin/support" replace />

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
      <Link to="/admin/support" className="text-sm font-semibold text-rapid-orange hover:underline">
        ← Back to support
      </Link>

      {loading ? (
        <p className="mt-6 text-sm text-gray-500">Loading ticket…</p>
      ) : error && !ticket ? (
        <p className="mt-6 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : ticket ? (
        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_280px]">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{ticket.subject}</h1>
            <p className="mt-1 text-sm text-gray-500">
              #{ticket.id} · {ticket.user_name} · {ticket.priority} priority
            </p>

            {error ? (
              <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            ) : null}

            <ul className="mt-6 space-y-3">
              {(ticket.messages || []).map((message) => (
                <li
                  key={message.id}
                  className={`rounded-xl border px-4 py-3 text-sm ${
                    message.is_internal
                      ? 'border-amber-200 bg-amber-50'
                      : message.author_type === 'admin'
                        ? 'border-orange-100 bg-orange-50/40'
                        : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-gray-800">
                      {message.author}
                      {message.is_internal ? ' · internal' : ''}
                    </p>
                    <p className="text-xs text-gray-400">{formatWhen(message.created_at)}</p>
                  </div>
                  <p className="mt-2 whitespace-pre-wrap text-gray-700">{message.body}</p>
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-2 rounded-xl border border-gray-200 bg-white p-4">
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={3}
                placeholder="Reply to customer…"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={internal}
                  onChange={(e) => setInternal(e.target.checked)}
                />
                Internal note (not visible to customer)
              </label>
              <button
                type="button"
                disabled={busy || !body.trim()}
                onClick={() =>
                  run(async () => {
                    await addAdminSupportMessage(ticket.id, body.trim(), internal)
                    setBody('')
                    setInternal(false)
                  })
                }
                className="rounded-lg bg-rapid-orange px-4 py-2 text-sm font-bold text-white disabled:opacity-40"
              >
                Send
              </button>
            </div>
          </div>

          <aside className="space-y-3">
            <article className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-xs font-bold uppercase text-gray-400">Status</p>
              <p className="mt-1 text-lg font-bold capitalize text-gray-900">{ticket.status}</p>
              {ticket.order_id ? (
                <Link
                  to={`/admin/orders/${ticket.order_id}`}
                  className="mt-3 inline-block text-sm font-semibold text-rapid-orange hover:underline"
                >
                  Order #{ticket.order_id}
                </Link>
              ) : null}
              <p className="mt-3 text-sm text-gray-600">{ticket.user_email}</p>
            </article>
            <button
              type="button"
              disabled={busy}
              onClick={() => run(() => updateAdminSupportTicketStatus(ticket.id, 'in_progress'))}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold"
            >
              Mark in progress
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => run(() => updateAdminSupportTicketStatus(ticket.id, 'resolved'))}
              className="w-full rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white"
            >
              Resolve ticket
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => run(() => updateAdminSupportTicketStatus(ticket.id, 'closed'))}
              className="w-full rounded-lg bg-gray-800 px-3 py-2 text-sm font-semibold text-white"
            >
              Close ticket
            </button>
          </aside>
        </div>
      ) : null}
    </div>
  )
}
