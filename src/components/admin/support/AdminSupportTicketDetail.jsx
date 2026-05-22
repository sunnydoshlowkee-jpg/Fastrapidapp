import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bell,
  Bold,
  ExternalLink,
  Lock,
  Paperclip,
  Search,
  Send,
  Zap,
} from 'lucide-react'
import { ADMIN_NOTIFICATIONS_PATH } from '../../../services/data/adminNotifications.mock'

const statusStyles = {
  open: 'bg-emerald-50 text-emerald-700',
  in_progress: 'bg-amber-50 text-amber-800',
  resolved: 'bg-gray-100 text-gray-600',
}

function SupportMessage({ message }) {
  if (message.type === 'user') {
    return (
      <div className="flex max-w-[85%] flex-col items-start">
        <div className="rounded-2xl rounded-tl-sm border border-gray-200 bg-white px-4 py-3 shadow-sm">
          <p className="text-sm leading-relaxed text-gray-800">{message.body}</p>
          {message.link ? (
            <Link
              to={message.link.href}
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-rapid-orange hover:underline"
            >
              <ExternalLink size={14} strokeWidth={2} aria-hidden />
              {message.link.label}
            </Link>
          ) : null}
        </div>
        <span className="mt-1 text-xs text-gray-400">{message.time}</span>
      </div>
    )
  }

  if (message.type === 'internal') {
    return (
      <div className="flex max-w-[85%] flex-col items-end self-end">
        <p className="mb-1 flex items-center gap-1 text-xs text-amber-800">
          <Lock size={12} strokeWidth={2} aria-hidden />
          {message.author} • {message.time}
        </p>
        <div className="rounded-2xl rounded-tr-sm border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-sm leading-relaxed text-gray-800">{message.body}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex max-w-[85%] flex-col items-end self-end">
      <p className="mb-1 text-xs text-gray-400">
        {message.time} {message.author ? `• ${message.author}` : ''}
      </p>
      <div className="rounded-2xl rounded-tr-sm border border-orange-100 bg-orange-50 px-4 py-3">
        <p className="text-sm leading-relaxed text-gray-800">{message.body}</p>
      </div>
    </div>
  )
}

export default function AdminSupportTicketDetail({
  ticket,
  searchPlaceholder,
  assignLabel,
  resolveLabel,
  internalNoteLabel,
  messagePlaceholder,
}) {
  const { detail } = ticket
  const [internalNote, setInternalNote] = useState(false)
  const [message, setMessage] = useState(detail.draftMessage ?? '')

  return (
    <section className="flex min-w-0 flex-1 flex-col bg-[#F5F6F8]">
      <header className="flex items-center gap-4 border-b border-gray-200 bg-white px-6 py-3">
        <div className="relative flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden
          />
          <input
            type="search"
            placeholder={searchPlaceholder}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-11 pr-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-rapid-orange/40 focus:ring-2 focus:ring-rapid-orange/15"
          />
        </div>
        <Link
          to={ADMIN_NOTIFICATIONS_PATH}
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
          aria-label="Notifications"
        >
          <Bell size={18} strokeWidth={1.75} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </Link>
      </header>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg font-bold text-gray-900">
                  #{ticket.id}: {ticket.listTitle ?? ticket.title}
                </h1>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                    statusStyles[ticket.status] ?? statusStyles.open
                  }`}
                >
                  {ticket.statusLabel}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500">{detail.meta}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-50"
              >
                {assignLabel}
              </button>
              <button
                type="button"
                className="rounded-lg bg-rapid-orange px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#E84A15]"
              >
                {resolveLabel}
              </button>
            </div>
          </div>

          <article className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-3">
            <div className="flex items-center gap-3">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${detail.customer.avatarTone}`}
              >
                {detail.customer.initials}
              </span>
              <div>
                <p className="text-sm font-bold text-gray-900">{detail.customer.name}</p>
                <p className="text-xs text-gray-500">{detail.customer.email}</p>
                <p className="text-xs text-gray-600">{detail.customer.phone}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Total Orders
              </p>
              <p className="text-lg font-bold text-gray-900">{detail.customer.totalOrders}</p>
            </div>
          </article>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
          {detail.messages.map((msg) => (
            <SupportMessage key={msg.id} message={msg} />
          ))}
        </div>

        <footer className="border-t border-gray-200 bg-white px-6 py-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <button
                type="button"
                role="switch"
                aria-checked={internalNote}
                onClick={() => setInternalNote((v) => !v)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  internalNote ? 'bg-rapid-orange' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    internalNote ? 'left-[1.35rem]' : 'left-0.5'
                  }`}
                />
              </button>
              {internalNoteLabel}
            </label>
            <div className="flex items-center gap-2 text-gray-400">
              <button type="button" className="rounded p-1.5 hover:bg-gray-100" aria-label="Attach">
                <Paperclip size={18} strokeWidth={1.75} />
              </button>
              <button type="button" className="rounded p-1.5 hover:bg-gray-100" aria-label="Quick reply">
                <Zap size={18} strokeWidth={1.75} />
              </button>
              <button type="button" className="rounded p-1.5 hover:bg-gray-100" aria-label="Bold">
                <Bold size={18} strokeWidth={1.75} />
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                internalNote
                  ? 'Add an internal note (not visible to customer)...'
                  : messagePlaceholder.replace('Ayo', detail.customer.name.split(' ')[0])
              }
              className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-rapid-orange/40 focus:ring-2 focus:ring-rapid-orange/15"
            />
            <button
              type="button"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-rapid-orange text-white transition-colors hover:bg-[#E84A15]"
              aria-label="Send message"
            >
              <Send size={18} strokeWidth={2} aria-hidden />
            </button>
          </div>
        </footer>
      </div>
    </section>
  )
}
