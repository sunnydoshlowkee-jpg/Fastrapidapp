import { useMemo, useState } from 'react'
import { ADMIN_DISPUTES } from '../../../services/data/adminDisputes.mock'
import AdminDisputeDetail from './AdminDisputeDetail'
import AdminDisputesList from './AdminDisputesList'

export default function AdminDisputesPage() {
  const data = ADMIN_DISPUTES
  const [selectedId, setSelectedId] = useState(data.defaultSelectedId)

  const selected = useMemo(
    () => data.disputes.find((d) => d.id === selectedId) ?? data.disputes[0],
    [data.disputes, selectedId],
  )

  return (
    <div className="flex h-full min-h-0 flex-1">
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
  )
}
