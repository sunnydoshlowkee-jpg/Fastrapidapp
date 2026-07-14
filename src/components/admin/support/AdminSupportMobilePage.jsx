import { Link } from 'react-router-dom'
import { Bell, Menu, Plus, User } from 'lucide-react'

const priorityStyles = {
  high: 'bg-[#FFDAD7] text-[#930013] font-bold',
  urgent: 'bg-[#FFDAD7] text-[#930013] font-bold',
  normal: 'bg-[#E1E3E4] text-[#454557] font-medium',
}

function MobileTicketCard({ ticket }) {
  const priorityClass = priorityStyles[ticket.priority] ?? priorityStyles.normal

  return (
    <Link
      to={`/admin/support/${ticket.id}`}
      className="block rounded-lg bg-white p-4 shadow-[0px_1px_2px_rgba(26,28,29,0.04)] transition-colors hover:bg-gray-50"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {ticket.requesterAvatarUrl ? (
            <img
              src={ticket.requesterAvatarUrl}
              alt={ticket.requesterName ?? ''}
              className="h-10 w-10 rounded-xl object-cover"
            />
          ) : (
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                ticket.requesterAvatarTone ?? 'bg-[#E1E3E4] text-[#767588]'
              }`}
            >
              {ticket.requesterInitials ? (
                <span className="text-xs font-bold">{ticket.requesterInitials}</span>
              ) : (
                <User size={16} strokeWidth={1.75} aria-hidden />
              )}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-[#191C1D]">
              {ticket.requesterName ?? ticket.assignee?.name ?? 'Unassigned'}
            </h3>
            <p className="mt-0.5 text-xs text-[#454557]">
              #{ticket.id} • {ticket.time}
            </p>
          </div>
        </div>

        <span
          className={`inline-flex shrink-0 items-center rounded-sm px-2 py-0.5 text-xs ${priorityClass}`}
        >
          {ticket.priorityLabel}
        </span>
      </div>

      <h4 className="mt-3 text-sm font-medium text-[#191C1D]">{ticket.title}</h4>
      <p className="mt-1 line-clamp-2 text-sm leading-[1.65] text-[#454557]">
        {ticket.description}
      </p>
    </Link>
  )
}

export default function AdminSupportMobilePage({
  data,
  activeTab,
  onTabChange,
  tickets,
  onOpenDrawer,
}) {
  return (
    <div className="relative flex h-full flex-1 flex-col overflow-y-auto bg-[#F8F9FA]">
      <header className="sticky top-0 z-20 flex items-center justify-between gap-4 bg-white/80 px-6 py-4 backdrop-blur-md">
        <button
          type="button"
          onClick={onOpenDrawer}
          aria-label="Open navigation"
          className="flex h-7 w-9 items-center justify-center rounded-xl transition-colors hover:bg-[#E1E0FF]"
        >
          <Menu size={18} strokeWidth={2.25} className="text-[#2419E9]" />
        </button>

        <h1 className="flex-1 text-center text-xl font-bold tracking-[-0.025em] text-[#2563EB]">
          {data.mobileTitle ?? 'Support Center'}
        </h1>

        <button
          type="button"
          aria-label="Notifications"
          className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-[#E1E0FF]"
        >
          <Bell size={20} strokeWidth={1.75} className="text-[#454557]" />
        </button>
      </header>

      <nav
        className="sticky top-[64px] z-10 border-b border-[#C6C4DA]/15 bg-[#F8F9FA]/80 px-4 py-4 backdrop-blur-md"
        aria-label="Filter tickets"
      >
        <div className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {data.tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`shrink-0 rounded-xl px-4 py-1.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-[#E1E0FF] font-semibold text-[#1E0CE6]'
                    : 'bg-[#E7E8E9] font-medium text-[#454557] hover:bg-gray-200'
                }`}
              >
                {tab.mobileLabel ?? tab.label}
              </button>
            )
          })}
        </div>
      </nav>

      <div className="flex-1 space-y-4 px-4 py-4">
        {tickets.length === 0 ? (
          <p className="rounded-lg bg-white p-6 text-center text-sm text-[#454557] shadow-sm">
            No tickets in this queue.
          </p>
        ) : (
          tickets.map((ticket) => (
            <MobileTicketCard key={ticket.id} ticket={ticket} />
          ))
        )}
      </div>

      <button
        type="button"
        aria-label={data.newTicketLabel ?? 'New ticket'}
        className="fixed bottom-24 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-lg bg-[#2419E9] text-white shadow-[0px_8px_24px_rgba(36,25,233,0.25)] transition-colors hover:bg-[#1E0CE6]"
      >
        <Plus size={20} strokeWidth={2.5} />
      </button>
    </div>
  )
}
