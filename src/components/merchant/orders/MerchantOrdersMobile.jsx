import { useNavigate } from 'react-router-dom'
import MerchantOrdersMobileFilterBar from './MerchantOrdersMobileFilterBar'
import MerchantOrdersMobileHeader from './MerchantOrdersMobileHeader'
import MerchantOrdersMobileSummaryCards from './MerchantOrdersMobileSummaryCards'
import MerchantOrdersMobileTable from './MerchantOrdersMobileTable'
import useMerchantOrdersPage from './useMerchantOrdersPage'
import { MERCHANT_ORDERS_FILTERS } from '../../../services/data/merchantOrders.mock'

export default function MerchantOrdersMobile() {
  const navigate = useNavigate()
  const {
    activeFilter,
    filterCounts,
    paginatedOrders,
    searchQuery,
    summaryMobile,
    handleFilterChange,
    handleSearchChange,
    pagination,
    setPage,
  } = useMerchantOrdersPage()

  return (
    <div className="flex flex-1 flex-col gap-4 px-4 pb-8 pt-5">
      <MerchantOrdersMobileHeader />

      <MerchantOrdersMobileSummaryCards summary={summaryMobile} />

      <MerchantOrdersMobileFilterBar
        filters={MERCHANT_ORDERS_FILTERS}
        activeFilter={activeFilter}
        counts={filterCounts}
        onChange={handleFilterChange}
      />

      <MerchantOrdersMobileTable
        orders={paginatedOrders}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        pagination={pagination}
        onPageChange={setPage}
        onViewOrder={(id) => navigate(`/merchant/orders/${id}`)}
      />
    </div>
  )
}
