import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { ADMIN_DISPUTES } from '../../../services/data/adminDisputes.mock'
import AdminDisputeDetail from './AdminDisputeDetail'
import AdminDisputesList from './AdminDisputesList'
import AdminDisputesMobilePage from './AdminDisputesMobilePage'

export default function AdminDisputesPage({ initialDisputeId } = {}) {
  const data = ADMIN_DISPUTES
  const [selectedId, setSelectedId] = useState(initialDisputeId ?? data.defaultSelectedId)
  const context = useOutletContext() ?? {}

  const selected = useMemo(
    () => data.disputes.find((d) => d.id === selectedId) ?? data.disputes[0],
    [data.disputes, selectedId],
  )

  return (
    <>
      <div className="flex h-full min-h-0 flex-1 lg:hidden">
        <AdminDisputesMobilePage data={data} onOpenDrawer={context.openDrawer} />
      </div>

      <div className="hidden h-full min-h-0 flex-1 lg:flex">
        <AdminDisputesList
          title={data.listTitle}
          disputes={data.disputes}
          selectedId={selected?.id}
          onSelect={setSelectedId}
        />
        {selected ? (
          <AdminDisputeDetail dispute={selected} searchPlaceholder={data.searchPlaceholder} />
        ) : null}
      </div>
    </>
  )
}
