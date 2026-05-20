import { useNavigate } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { MERCHANT_MENU_NEW_PATH } from '../../../../services/data/merchantMenuItemCreate.mock'
import { MERCHANT_INVENTORY } from '../../../../services/data/merchantInventory.mock'
import MerchantInventoryMobileInsights from './mobile/MerchantInventoryMobileInsights'
import MerchantInventoryMobilePagination from './mobile/MerchantInventoryMobilePagination'
import MerchantInventoryMobileProductList from './mobile/MerchantInventoryMobileProductList'
import MerchantInventoryMobileSummaryCards from './mobile/MerchantInventoryMobileSummaryCards'
import MerchantInventoryMobileToolbar from './mobile/MerchantInventoryMobileToolbar'
import useMerchantInventoryPage from './useMerchantInventoryPage'

export default function MerchantInventoryMobile() {
  const navigate = useNavigate()
  const data = MERCHANT_INVENTORY
  const mobile = data.mobile
  const {
    products,
    searchQuery,
    handleSearchChange,
    pagination,
    setPage,
  } = useMerchantInventoryPage()

  return (
    <div className="flex flex-1 flex-col gap-4 px-4 pb-8 pt-5 lg:hidden">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold tracking-[-0.02em] text-merchant-ink">{data.pageTitle}</h1>
          <p className="mt-1 text-sm text-merchant-muted">{mobile.subtitle}</p>
        </div>
        <button
          type="button"
          className="relative flex h-10 w-10 shrink-0 items-center justify-center text-merchant-primary"
          aria-label="Notifications"
        >
          <Bell size={22} strokeWidth={1.75} />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" aria-hidden />
        </button>
      </header>

      <MerchantInventoryMobileToolbar
        searchPlaceholder={data.searchPlaceholder}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        bulkUpdateLabel={data.bulkUpdateLabel}
        addItemLabel={mobile.addItemLabel}
        onAddItem={() => navigate(MERCHANT_MENU_NEW_PATH)}
      />

      <MerchantInventoryMobileSummaryCards summary={data.summary} />

      <MerchantInventoryMobileProductList products={products} />

      <MerchantInventoryMobilePagination
        page={pagination.page}
        pageSize={pagination.pageSize}
        total={pagination.total}
        onPageChange={setPage}
      />

      <MerchantInventoryMobileInsights title={mobile.insightsTitle} insights={mobile.insights} />
    </div>
  )
}
