import { useNavigate, useOutletContext } from 'react-router-dom'
import MerchantDashboardHeader from '../dashboard/MerchantDashboardHeader'
import MerchantOrdersFilterBar from './MerchantOrdersFilterBar'
import MerchantOrdersSummaryCards from './MerchantOrdersSummaryCards'
import MerchantOrdersTable from './MerchantOrdersTable'
import useMerchantOrdersPage from './useMerchantOrdersPage'
import {
  MERCHANT_ORDERS_FILTERS,
  MERCHANT_ORDERS_SUMMARY,
} from '../../../services/data/merchantOrders.mock'

export default function MerchantOrdersDesktop() {
  const navigate = useNavigate()
  const { openMobileNav } = useOutletContext()
  const {
    activeFilter,
    filterCounts,
    paginatedOrders,
    searchQuery,
    loading,
    error,
    handleFilterChange,
    handleSearchChange,
    pagination,
    setPage,
  } = useMerchantOrdersPage()

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 lg:gap-8 lg:p-8">
      <MerchantDashboardHeader
        title="Orders"
        showMenuButton
        onMenuClick={openMobileNav}
      />

      <MerchantOrdersFilterBar
        filters={MERCHANT_ORDERS_FILTERS}
        activeFilter={activeFilter}
        counts={filterCounts}
        onChange={handleFilterChange}
      />

      <MerchantOrdersSummaryCards summary={MERCHANT_ORDERS_SUMMARY} />

      {error ? (
        <div className="rounded-merchant-stat border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="py-12 text-center text-sm text-merchant-muted">Loading orders...</div>
      ) : (
      <MerchantOrdersTable
        orders={paginatedOrders}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        pagination={pagination}
        onPageChange={setPage}
        onViewOrder={(id) => navigate(`/merchant/orders/${id}`)}
      />
      )}
    </div>
  )
}
