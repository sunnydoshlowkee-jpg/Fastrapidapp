import { Outlet, useLocation } from 'react-router-dom'
import AdminSidebar from '../components/admin/layout/AdminSidebar'
import AdminTopHeader from '../components/admin/layout/AdminTopHeader'
import { ADMIN_DASHBOARD } from '../services/data/adminDashboard.mock'
import { ADMIN_AUDIT_LOG_PATH } from '../services/data/adminAuditLog.mock'
import { ADMIN_DISPUTES_PATH } from '../services/data/adminDisputes.mock'
import { ADMIN_ORDERS_PATH } from '../services/data/adminOrders.mock'
import { ADMIN_FINANCE_OVERVIEW } from '../services/data/adminFinanceOverview.mock'
import { ADMIN_SETTINGS_FINANCE_PATH, ADMIN_SETTINGS_PATH } from '../services/data/adminPaths'
import { ADMIN_PAYOUTS_PATH } from '../services/data/adminPayouts.mock'
import { ADMIN_RIDERS_PATH } from '../services/data/adminRiders.mock'
import { ADMIN_SUPPORT_PATH } from '../services/data/adminSupportTickets.mock'
import { ADMIN_TRANSACTIONS_PATH } from '../services/data/adminTransactions.mock'

export default function AdminLayout() {
  const { pathname } = useLocation()
  const isTransactionDetail =
    pathname.startsWith(`${ADMIN_TRANSACTIONS_PATH}/`) &&
    pathname.length > ADMIN_TRANSACTIONS_PATH.length + 1
  const isRiderTracking = /\/admin\/riders\/[^/]+\/tracking$/.test(pathname)
  const hideTopHeader =
    pathname.startsWith(ADMIN_DISPUTES_PATH) ||
    pathname.startsWith(ADMIN_SUPPORT_PATH) ||
    isTransactionDetail ||
    isRiderTracking
  const isSettingsFinance = pathname.startsWith(ADMIN_SETTINGS_FINANCE_PATH)
  const searchPlaceholder = pathname.startsWith(ADMIN_AUDIT_LOG_PATH)
    ? 'Search operations...'
    : pathname.startsWith(ADMIN_ORDERS_PATH)
      ? 'Search orders, customers, riders...'
      : pathname.startsWith(ADMIN_RIDERS_PATH)
        ? 'Search riders, vehicles, plates...'
        : pathname.startsWith(ADMIN_TRANSACTIONS_PATH)
        ? 'Global search...'
        : pathname.startsWith(ADMIN_PAYOUTS_PATH)
          ? 'Search transactions, accounts...'
          : isSettingsFinance
            ? ADMIN_FINANCE_OVERVIEW.searchPlaceholder
            : ADMIN_DASHBOARD.searchPlaceholder
  const headerTitle = isSettingsFinance ? ADMIN_FINANCE_OVERVIEW.pageTitle : null

  return (
    <div className="flex min-h-screen bg-[#F5F6F8] font-sans text-gray-900">
      <AdminSidebar sidebar={ADMIN_DASHBOARD.sidebar} />
      <div className="flex min-w-0 flex-1 flex-col">
        {!hideTopHeader ? (
          <AdminTopHeader
            searchPlaceholder={searchPlaceholder}
            centerTitle={headerTitle}
          />
        ) : null}
        <main className={`flex min-h-0 flex-1 flex-col overflow-hidden ${hideTopHeader ? '' : 'overflow-y-auto'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
