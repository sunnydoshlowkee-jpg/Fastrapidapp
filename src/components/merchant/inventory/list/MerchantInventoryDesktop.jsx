import { useNavigate, useOutletContext } from 'react-router-dom'
import { MERCHANT_MENU_NEW_PATH } from '../../../../services/data/merchantMenuItemCreate.mock'
import { MERCHANT_INVENTORY } from '../../../../services/data/merchantInventory.mock'
import MerchantDashboardHeader from '../../dashboard/MerchantDashboardHeader'
import MerchantInventoryInsightCards from './MerchantInventoryInsightCards'
import MerchantInventorySummaryCards from './MerchantInventorySummaryCards'
import MerchantInventoryTable from './MerchantInventoryTable'
import MerchantInventoryToolbar from './MerchantInventoryToolbar'
import useMerchantInventoryPage from './useMerchantInventoryPage'

export default function MerchantInventoryDesktop() {
  const navigate = useNavigate()
  const { openMobileNav } = useOutletContext()
  const data = MERCHANT_INVENTORY
  const {
    products,
    searchQuery,
    handleSearchChange,
    toggleAvailability,
    pagination,
    setPage,
  } = useMerchantInventoryPage()

  return (
    <div className="hidden flex-1 flex-col gap-6 p-6 lg:flex lg:gap-8 lg:p-8">
      <MerchantDashboardHeader
        title={data.pageTitle}
        showMenuButton
        onMenuClick={openMobileNav}
      />

      <p className="-mt-2 text-sm text-merchant-muted lg:-mt-4">{data.subtitle}</p>

      <MerchantInventoryToolbar
        searchPlaceholder={data.searchPlaceholder}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        bulkUpdateLabel={data.bulkUpdateLabel}
        addItemLabel={data.addItemLabel}
        onAddItem={() => navigate(MERCHANT_MENU_NEW_PATH)}
      />

      <MerchantInventorySummaryCards summary={data.summary} />

      <MerchantInventoryTable
        products={products}
        pagination={pagination}
        onPageChange={setPage}
        onToggleAvailability={toggleAvailability}
      />

      <MerchantInventoryInsightCards insights={data.insights} />
    </div>
  )
}
