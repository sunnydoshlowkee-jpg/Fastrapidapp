import { useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AdminMobileMenuButton from '../components/admin/layout/AdminMobileMenuButton'
import AdminSidebar from '../components/admin/layout/AdminSidebar'
import AdminTopHeader from '../components/admin/layout/AdminTopHeader'
import { ADMIN_DASHBOARD } from '../services/data/adminDashboard.mock'
import { fetchAdminNavCounts } from '../services/adminDashboardService'
import { getAdminAuthToken } from '../services/adminAuthService'
import api from '../services/api'
import { ADMIN_AUDIT_LOG_PATH } from '../services/data/adminAuditLog.mock'
import { ADMIN_DISPUTES_PATH } from '../services/data/adminDisputes.mock'
import { ADMIN_ORDERS_PATH } from '../services/data/adminOrders.mock'
import {
  ADMIN_SETTINGS_FEATURE_FLAGS_PATH,
  ADMIN_SETTINGS_FINANCE_PATH,
  ADMIN_SETTINGS_PATH,
  ADMIN_SETTINGS_PAYMENT_PATH,
  ADMIN_PAYOUTS_PATH,
  ADMIN_TRANSACTIONS_PATH,
  ADMIN_FINANCE_OVERVIEW_TITLE,
  ADMIN_FINANCE_SEARCH_PLACEHOLDER,
} from '../services/data/adminPaths'
import { ADMIN_MERCHANTS_PATH } from '../services/data/adminMerchants.mock'
import { ADMIN_MERCHANT_APPROVALS_PATH } from '../services/data/adminMerchantApprovals.mock'
import { ADMIN_RIDERS_PATH } from '../services/data/adminRiders.mock'
import { ADMIN_SUPPORT_PATH } from '../services/data/adminSupportTickets.mock'
import { ADMIN_USERS_PATH } from '../services/data/adminUsers.mock'
import {
  ADMIN_NOTIFICATIONS,
  ADMIN_NOTIFICATIONS_PATH,
} from '../services/data/adminNotifications.mock'

export default function AdminLayout() {
  const { pathname } = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [navCounts, setNavCounts] = useState({})
  const [sidebarUser, setSidebarUser] = useState(ADMIN_DASHBOARD.sidebar.user)
  const [adminPermissions, setAdminPermissions] = useState(null)

  useEffect(() => {
    const load = async () => {
      if (!getAdminAuthToken()) return

      try {
        const [{ data: meData }, counts] = await Promise.all([
          api.get('/admin/me'),
          fetchAdminNavCounts(),
        ])

        const user = meData?.data?.user
        if (user?.name) {
          const initials = user.name
            .split(' ')
            .filter(Boolean)
            .map((part) => part[0])
            .join('')
            .slice(0, 2)
            .toUpperCase()

          setSidebarUser({
            name: user.name,
            role: user.role_label || 'Super Admin',
            initials: initials || 'AD',
            showRolePill: true,
          })
        }

        if (Array.isArray(user?.permissions)) {
          setAdminPermissions(user.permissions)
        }

        setNavCounts(counts)
      } catch {
        setNavCounts({})
      }
    }

    load()
  }, [])

  const sidebar = useMemo(
    () => ({
      ...ADMIN_DASHBOARD.sidebar,
      user: sidebarUser,
    }),
    [sidebarUser],
  )

  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!drawerOpen) return undefined
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [drawerOpen])

  const isTransactionDetail =
    pathname.startsWith(`${ADMIN_TRANSACTIONS_PATH}/`) &&
    pathname.length > ADMIN_TRANSACTIONS_PATH.length + 1
  const isRiderTracking = /\/admin\/riders\/[^/]+\/tracking$/.test(pathname)
  const isMerchantsList =
    pathname === ADMIN_MERCHANTS_PATH || pathname === `${ADMIN_MERCHANTS_PATH}/`
  const isMerchantApprovals =
    pathname === ADMIN_MERCHANT_APPROVALS_PATH ||
    pathname === `${ADMIN_MERCHANT_APPROVALS_PATH}/`
  const isMerchantDocumentReview =
    /\/admin\/merchants\/[^/]+\/documents\/review$/.test(pathname)
  const isUsersList =
    pathname === ADMIN_USERS_PATH || pathname === `${ADMIN_USERS_PATH}/`
  const isUserDetail =
    pathname.startsWith(`${ADMIN_USERS_PATH}/`) &&
    pathname.length > ADMIN_USERS_PATH.length + 1
  const isOrderDetail = /\/admin\/orders\/[^/]+$/.test(pathname)
  const isSupport = pathname.startsWith(ADMIN_SUPPORT_PATH)
  const isDisputes = pathname.startsWith(ADMIN_DISPUTES_PATH)
  const isAuditLog = pathname.startsWith(ADMIN_AUDIT_LOG_PATH)
  const isSettingsFinance = pathname.startsWith(ADMIN_SETTINGS_FINANCE_PATH)
  const isPayoutsListEarly =
    pathname === ADMIN_PAYOUTS_PATH || pathname === `${ADMIN_PAYOUTS_PATH}/`
  const hideMobileMenuButton =
    isOrderDetail ||
    isSupport ||
    isDisputes ||
    isTransactionDetail ||
    isAuditLog ||
    isSettingsFinance ||
    isPayoutsListEarly ||
    isUsersList ||
    isUserDetail ||
    isMerchantsList ||
    isMerchantApprovals ||
    isMerchantDocumentReview
  const hideTopHeader =
    pathname.startsWith(ADMIN_DISPUTES_PATH) ||
    pathname.startsWith(ADMIN_SUPPORT_PATH) ||
    isMerchantsList ||
    isUsersList ||
    isUserDetail ||
    isTransactionDetail ||
    isRiderTracking ||
    isMerchantApprovals ||
    isMerchantDocumentReview
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
            ? ADMIN_FINANCE_SEARCH_PLACEHOLDER
            : ADMIN_DASHBOARD.searchPlaceholder
  const headerTitle = isSettingsFinance ? ADMIN_FINANCE_OVERVIEW_TITLE : null
  const isDashboard = pathname === '/admin' || pathname === '/admin/'
  const isNotifications =
    pathname === ADMIN_NOTIFICATIONS_PATH ||
    pathname === `${ADMIN_NOTIFICATIONS_PATH}/`
  const isSettingsHome =
    pathname === ADMIN_SETTINGS_PATH || pathname === `${ADMIN_SETTINGS_PATH}/`
  const isFeatureFlags =
    pathname === ADMIN_SETTINGS_FEATURE_FLAGS_PATH ||
    pathname === `${ADMIN_SETTINGS_FEATURE_FLAGS_PATH}/`
  const isPaymentGateway =
    pathname === ADMIN_SETTINGS_PAYMENT_PATH ||
    pathname === `${ADMIN_SETTINGS_PAYMENT_PATH}/`
  const isOrdersList =
    pathname === ADMIN_ORDERS_PATH || pathname === `${ADMIN_ORDERS_PATH}/`
  const isTransactionsList =
    pathname === ADMIN_TRANSACTIONS_PATH ||
    pathname === `${ADMIN_TRANSACTIONS_PATH}/`
  const isPayoutsList =
    pathname === ADMIN_PAYOUTS_PATH || pathname === `${ADMIN_PAYOUTS_PATH}/`
  const isRidersList =
    pathname === ADMIN_RIDERS_PATH || pathname === `${ADMIN_RIDERS_PATH}/`
  const mobileTitle = isDashboard
    ? ADMIN_DASHBOARD.pageTitle
    : isNotifications
      ? ADMIN_NOTIFICATIONS.title
      : isSettingsHome
        ? 'Settings'
        : isFeatureFlags
          ? 'Feature Flags'
          : isPaymentGateway
            ? 'Gateways'
            : isOrdersList
              ? 'Orders'
              : isTransactionsList
                ? 'Rapid Admin'
                : isRidersList
                  ? 'Riders'
                  : null
  const mobileTitleTone = isFeatureFlags
    ? 'orange'
    : isPaymentGateway || isTransactionsList
      ? 'leftDark'
      : isRidersList
        ? 'orangeCenter'
        : 'default'
  const mobileBellOrange = isOrdersList || isTransactionsList

  return (
    <div className="flex min-h-screen bg-[#F5F6F8] font-sans text-gray-900">
      <div className="hidden lg:flex">
        <AdminSidebar sidebar={sidebar} navCounts={navCounts} permissions={adminPermissions} />
      </div>

      {drawerOpen ? (
        <div className="fixed inset-0 z-40 flex lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-gray-900/50"
          />
          <div className="relative z-10 flex max-h-full max-w-[18rem]">
            <AdminSidebar
              sidebar={sidebar}
              navCounts={navCounts}
              permissions={adminPermissions}
              variant="drawer"
              onClose={() => setDrawerOpen(false)}
            />
          </div>
        </div>
      ) : null}

      {!hideMobileMenuButton ? (
        <AdminMobileMenuButton
          onOpen={() => setDrawerOpen(true)}
          label={ADMIN_DASHBOARD.sidebar.openLabel}
        />
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        {!hideTopHeader ? (
          <div className={isOrderDetail || isAuditLog || isSettingsFinance || isPayoutsList ? 'hidden lg:contents' : 'contents'}>
            <AdminTopHeader
              searchPlaceholder={searchPlaceholder}
              centerTitle={headerTitle}
              mobileTitle={mobileTitle}
              mobileTitleTone={mobileTitleTone}
              mobileBellOrange={mobileBellOrange}
            />
          </div>
        ) : null}
        <main className={`flex min-h-0 flex-1 flex-col overflow-hidden ${hideTopHeader ? '' : 'overflow-y-auto'}`}>
          <Outlet context={{ openDrawer: () => setDrawerOpen(true) }} />
        </main>
      </div>
    </div>
  )
}
