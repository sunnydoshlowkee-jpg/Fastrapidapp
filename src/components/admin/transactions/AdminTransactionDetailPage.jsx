import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ADMIN_TRANSACTION_DETAIL,
  getAdminTransactionActivity,
  getAdminTransactionDetail,
} from '../../../services/data/adminTransactionDetail.mock'
import { ADMIN_TRANSACTIONS_PATH } from '../../../services/data/adminTransactions.mock'
import AdminTransactionDetailMobile from './AdminTransactionDetailMobile'
import AdminTransactionDetailView from './AdminTransactionDetailView'
import AdminTransactionsActivityList from './AdminTransactionsActivityList'

export default function AdminTransactionDetailPage() {
  const { transactionId } = useParams()
  const navigate = useNavigate()
  const data = ADMIN_TRANSACTION_DETAIL
  const [activeTab, setActiveTab] = useState('all')

  const selectedId = transactionId ?? data.defaultSelectedId
  const activity = useMemo(
    () => getAdminTransactionActivity(selectedId),
    [selectedId],
  )
  const detail = useMemo(
    () => getAdminTransactionDetail(selectedId),
    [selectedId],
  )

  const handleSelect = (id) => {
    navigate(`${ADMIN_TRANSACTIONS_PATH}/${id}`, { replace: true })
  }

  return (
    <>
      <div className="flex h-full min-h-0 flex-1 lg:hidden">
        <AdminTransactionDetailMobile detail={detail} />
      </div>
      <div className="hidden h-full min-h-0 flex-1 lg:flex">
        <AdminTransactionsActivityList
          title={data.listTitle}
          viewAllLabel={data.viewAllLabel}
          activity={activity}
          tabs={data.activityTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
        <AdminTransactionDetailView detail={detail} searchPlaceholder={data.searchPlaceholder} />
      </div>
    </>
  )
}
