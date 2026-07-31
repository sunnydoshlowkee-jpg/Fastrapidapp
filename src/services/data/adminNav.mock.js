/** Sidebar navigation */
import {
  BarChart3,
  Bike,
  ClipboardList,
  Headphones,
  LayoutDashboard,
  MapPinned,
  Scale,
  Settings,
  ShoppingBag,
  Store,
  Users,
  Wallet,
} from 'lucide-react'

export const ADMIN_NAV_SECTIONS = [
  {
    id: 'overview',
    label: 'Overview',
    items: [
      { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
      { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    ],
  },
  {
    id: 'operations',
    label: 'Operations',
    items: [
      { to: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
      { to: '/admin/riders', icon: Bike, label: 'Riders' },
      { to: '/admin/rider-map', icon: MapPinned, label: 'Live map' },
      { to: '/admin/disputes', icon: Scale, label: 'Disputes' },
      { to: '/admin/support', icon: Headphones, label: 'Support' },
    ],
  },
  {
    id: 'people',
    label: 'People',
    items: [
      { to: '/admin/users', icon: Users, label: 'Users' },
      { to: '/admin/merchants', icon: Store, label: 'Merchants' },
    ],
  },
  {
    id: 'finance',
    label: 'Finance',
    items: [
      { to: '/admin/transactions', icon: ArrowLeftRight, label: 'Transactions' },
      { to: '/admin/payouts', icon: Wallet, label: 'Payouts' },
    ],
  },
  {
    id: 'platform',
    label: 'Platform',
    items: [
      { to: '/admin/audit-log', icon: ClipboardList, label: 'Audit log' },
      { to: '/admin/settings', icon: Settings, label: 'Settings' },
    ],
  },
]

export const ADMIN_NAV_ITEMS = ADMIN_NAV_SECTIONS.flatMap((s) => s.items)

const NAV_COUNT_KEYS = {
  '/admin/orders': 'orders',
  '/admin/merchants': 'merchants_pending',
  '/admin/payouts': 'payouts',
  '/admin/disputes': 'disputes',
  '/admin/support': 'support',
}

export function buildAdminNavSections(counts = {}) {
  return ADMIN_NAV_SECTIONS.map((section) => ({
    ...section,
    items: section.items.map((item) => {
      const key = NAV_COUNT_KEYS[item.to]
      const count = key ? counts[key] : undefined

      return {
        ...item,
        count: count > 0 ? count : undefined,
      }
    }),
  }))
}
