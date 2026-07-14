import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { ADMIN_SUPPORT_TICKETS } from '../../../services/data/adminSupportTickets.mock'
import AdminSupportMobilePage from './AdminSupportMobilePage'
import AdminSupportTicketDetail from './AdminSupportTicketDetail'
import AdminSupportTicketsList from './AdminSupportTicketsList'

export default function AdminSupportTicketsPage({ initialTicketId } = {}) {
  const data = ADMIN_SUPPORT_TICKETS
  const [activeTab, setActiveTab] = useState('all')
  const [selectedId, setSelectedId] = useState(initialTicketId ?? data.defaultSelectedId)
  const context = useOutletContext() ?? {}

  const filtered = useMemo(() => {
    if (activeTab === 'all') return data.tickets
    return data.tickets.filter((t) => t.status === activeTab)
  }, [activeTab, data.tickets])

  const selected = useMemo(
    () => data.tickets.find((t) => t.id === selectedId) ?? data.tickets[0],
    [data.tickets, selectedId],
  )

  return (
    <>
      <div className="flex h-full min-h-0 flex-1 lg:hidden">
        <AdminSupportMobilePage
          data={data}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tickets={filtered}
          onOpenDrawer={context.openDrawer}
        />
      </div>

      <div className="hidden h-full min-h-0 flex-1 lg:flex">
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
    </>
  )
}
