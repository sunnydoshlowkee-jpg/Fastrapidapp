import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, EyeOff, FileText, Paperclip, Send } from 'lucide-react'
import { ADMIN_SUPPORT_PATH } from '../../../services/data/adminSupportTickets.mock'

const statusToneStyles = {
  red: 'bg-[#FFDAD6] text-[#93000A]',
  amber: 'bg-amber-100 text-amber-800',
  emerald: 'bg-emerald-100 text-emerald-800',
  gray: 'bg-gray-100 text-gray-600',
}

function TimestampPill({ label }) {
  return (
    <div className="flex justify-center py-2">
      <span className="inline-flex items-center rounded-full bg-[#EFF4FF] px-3 py-0.5 text-[11px] font-normal uppercase tracking-[0.1em] text-[#584237]">
        {label}
      </span>
    </div>
  )
}

function UserMessage({ message, customer }) {
  return (
    <div className="flex items-end gap-3">
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
          customer.avatarTone ?? 'bg-gray-200 text-gray-700'
        }`}
      >
        {customer.initials}
      </div>
      <div className="max-w-[80%] rounded-md rounded-bl-none bg-[#DCE9FF] px-3 py-3">
        <p className="text-sm leading-[1.65] text-[#0B1C30]">{message.body}</p>
      </div>
    </div>
  )
}

function InternalNote({ message }) {
  return (
    <div className="ml-auto max-w-[80%] rounded-md border-l-4 border-[#FFC107] bg-[#FFF8E1] p-3">
      <div className="flex items-center justify-end gap-2">
        <EyeOff size={11} strokeWidth={2.5} className="text-[#F57C00]" aria-hidden />
        <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#F57C00]">
          Internal Note
        </span>
      </div>
      <p className="mt-1 text-right text-sm leading-[1.65] text-[#584237]">
        {message.body}
      </p>
      <p className="mt-1 text-right text-[11px] text-[#584237]/70">
        {message.author} • {message.time}
      </p>
    </div>
  )
}

function AdminReply({ message }) {
  return (
    <div className="flex items-end justify-end gap-3">
      <div className="max-w-[80%] rounded-md rounded-br-none bg-[#F97316] p-3">
        <p className="text-right text-sm leading-[1.65] text-white">{message.body}</p>
      </div>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#9D4300] text-xs font-bold uppercase text-white">
        {message.author ?? 'AD'}
      </div>
    </div>
  )
}

export default function AdminSupportTicketDetailMobile({ ticket }) {
  const [internalReply, setInternalReply] = useState(false)
  const [draft, setDraft] = useState(ticket.detail?.draftMessage ?? '')

  const detail = ticket.detail ?? {}
  const customer = detail.customer ?? {}
  const composer = detail.composer ?? {}
  const statusBadge = ticket.statusBadge ?? {
    label: ticket.statusLabel?.toUpperCase(),
    tone: 'red',
  }

  return (
    <div className="relative flex h-full flex-1 flex-col overflow-hidden bg-[#F8F9FF]">
      <header className="flex items-center justify-between gap-4 border-b border-[#DCE9FF] bg-white px-4 py-3">
        <div className="flex min-w-0 items-center gap-4">
          <Link
            to={ADMIN_SUPPORT_PATH}
            aria-label="Back to support tickets"
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#0B1C30] transition-colors hover:bg-gray-100"
          >
            <ArrowLeft size={16} strokeWidth={2.25} />
          </Link>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold tracking-[-0.025em] text-[#0B1C30]">
              Ticket #{ticket.id}
            </h1>
            {ticket.categoryLabel ? (
              <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#584237]">
                {ticket.categoryLabel}
              </p>
            ) : null}
          </div>
        </div>

        <span
          className={`inline-flex items-center rounded-sm px-2 py-1 text-[11px] font-bold uppercase tracking-[0.1em] ${
            statusToneStyles[statusBadge.tone] ?? statusToneStyles.red
          }`}
        >
          {statusBadge.label}
        </span>
      </header>

      <div className="flex-1 space-y-6 overflow-y-auto p-4 pb-2">
        <section className="flex items-center justify-between gap-4 rounded-md bg-white p-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
          <div className="flex min-w-0 items-center gap-4">
            <div className="relative">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                  customer.avatarTone ?? 'bg-gray-200 text-gray-700'
                }`}
              >
                {customer.initials}
              </div>
              {customer.online ? (
                <span
                  className="absolute -bottom-0 -right-0 h-3 w-3 rounded-full border-2 border-white bg-[#006E2D]"
                  aria-hidden
                />
              ) : null}
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-base font-bold text-[#0B1C30]">
                {customer.name}
              </h2>
              <p className="truncate text-sm text-[#584237]">{customer.email}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="inline-flex items-center rounded-sm bg-[#E5EEFF] px-2 py-0.5 text-[11px] uppercase tracking-[0.1em] text-[#584237]">
              {customer.userBadge ?? 'USER'}
            </span>
            <span className="text-[8px] font-medium leading-[16px] text-[#584237]">
              {customer.joinedLabel}
            </span>
          </div>
        </section>

        <section className="space-y-4">
          {detail.timestampLabel ? (
            <TimestampPill label={detail.timestampLabel} />
          ) : null}

          {(detail.messages ?? []).map((message) => {
            if (message.type === 'internal') {
              return <InternalNote key={message.id} message={message} />
            }
            if (message.type === 'admin') {
              return <AdminReply key={message.id} message={message} />
            }
            return (
              <UserMessage
                key={message.id}
                message={message}
                customer={customer}
              />
            )
          })}
        </section>
      </div>

      <footer className="border-t border-[#E5EEFF] bg-white p-3 shadow-[0px_-4px_16px_rgba(0,0,0,0.05)]">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4 px-1">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.05em] text-[#584237]">
              <input
                type="checkbox"
                checked={internalReply}
                onChange={(e) => setInternalReply(e.target.checked)}
                className="h-4 w-4 rounded-sm border border-[#E0C0B1] text-[#9D4300] focus:ring-rapid-orange/30"
              />
              {composer.internalReplyLabel ?? 'Internal Reply'}
            </label>
            <div className="flex items-center gap-1 text-[#584237]">
              <button
                type="button"
                aria-label="Attach file"
                className="flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-gray-100"
              >
                <Paperclip size={14} strokeWidth={1.75} />
              </button>
              <button
                type="button"
                aria-label="Insert template"
                className="flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-gray-100"
              >
                <FileText size={14} strokeWidth={1.75} />
              </button>
            </div>
          </div>

          <div className="flex items-end gap-2 rounded-md border border-[#E0C0B1] bg-[#EFF4FF] p-1">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={composer.placeholder ?? 'Type your message...'}
              rows={1}
              className="min-h-[36px] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-[#0B1C30] outline-none placeholder:text-[#6B7280]"
            />
            <button
              type="button"
              aria-label="Send message"
              className="flex h-7 w-[30px] items-center justify-center rounded-md bg-[#9D4300] text-white transition-colors hover:bg-[#7e3600]"
            >
              <Send size={12} strokeWidth={2.25} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
