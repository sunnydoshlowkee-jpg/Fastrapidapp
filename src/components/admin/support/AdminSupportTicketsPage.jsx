import { useMemo, useState } from 'react'
import { ADMIN_SUPPORT_TICKETS } from '../../../services/data/adminSupportTickets.mock'
import AdminSupportTicketDetail from './AdminSupportTicketDetail'
import AdminSupportTicketsList from './AdminSupportTicketsList'

export default function AdminSupportTicketsPage() {
  const data = ADMIN_SUPPORT_TICKETS
  const [activeTab, setActiveTab] = useState('all')
  const [selectedId, setSelectedId] = useState(data.defaultSelectedId)

  const filtered = useMemo(() => {
    if (activeTab === 'all') return data.tickets
    return data.tickets.filter((t) => t.status === activeTab)
  }, [activeTab, data.tickets])

  const selected = useMemo(
    () => data.tickets.find((t) => t.id === selectedId) ?? data.tickets[0],
    [data.tickets, selectedId],
  )

  return (
    <div className="flex h-full min-h-0 flex-1">
      <AdminSupportTicketsList
        title={data.listTitle}
        tabs={data.tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tickets={filtered}
        selectedId={selected?.id}
        onSelect={setSelectedId}
      />
      {selected ? (
        <AdminSupportTicketDetail
          ticket={selected}
          searchPlaceholder={data.searchPlaceholder}
          assignLabel={data.assignLabel}
          resolveLabel={data.resolveLabel}
          internalNoteLabel={data.internalNoteLabel}
          messagePlaceholder={data.messagePlaceholder}
        />
      ) : null}
    </div>
  )
}
