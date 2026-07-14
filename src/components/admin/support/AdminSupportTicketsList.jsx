import AdminSupportTicketCard from './AdminSupportTicketCard'

export default function AdminSupportTicketsList({
  title,
  tabs,
  activeTab,
  onTabChange,
  tickets,
  selectedId,
  onSelect,
}) {
  return (
    <aside className="flex w-full max-w-md shrink-0 flex-col border-r border-gray-200 bg-white lg:w-96">
      <div className="border-b border-gray-100 px-4 py-4">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <nav className="mt-3 flex flex-wrap gap-1" aria-label="Filter tickets">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      <ul className="flex-1 space-y-3 overflow-y-auto p-3">
        {tickets.length === 0 ? (
          <li className="px-2 py-8 text-center text-sm text-gray-500">No tickets in this queue.</li>
        ) : (
          tickets.map((ticket) => (
            <li key={ticket.id}>
              <AdminSupportTicketCard
                ticket={ticket}
                isSelected={ticket.id === selectedId}
                onSelect={() => onSelect(ticket.id)}
              />
            </li>
          ))
        )}
      </ul>
    </aside>
  )
}
