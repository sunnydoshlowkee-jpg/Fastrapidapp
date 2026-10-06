/** Sidebar navigation */
import {
  ArrowLeftRight,
  BarChart3,
  Bike,
  ClipboardList,
  GitBranch,
  Headphones,
  LayoutDashboard,
  MapPinned,
  Scale,
  Settings,
  ShieldCheck,
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
    id: 'pipeline',
    label: 'Pipeline',
    items: [
      { to: '/admin/pipeline', icon: GitBranch, label: 'Overview', end: true },
      { to: '/admin/pipeline/board', icon: LayoutDashboard, label: 'Board' },
      { to: '/admin/pipeline/my-items', icon: ClipboardList, label: 'My Items' },
      { to: '/admin/pipeline/documents', icon: LayoutDashboard, label: 'Documents' },
      { to: '/admin/pipeline/activity', icon: ClipboardList, label: 'Activity' },
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
  {
    id: 'administration',
    label: 'Administration',
    items: [
      { to: '/admin/admins', icon: Users, label: 'Admin Users' },
      { to: '/admin/roles', icon: ShieldCheck, label: 'Roles' },
      { to: '/admin/permissions', icon: ShieldCheck, label: 'Permissions' },
      { to: '/admin/audit-log', icon: ClipboardList, label: 'Audit Logs' },
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

// Map a nav route to the backend permission(s) that grant access. When a
// permissions array is supplied, routes the user lacks permission for are
// hidden (presentation only — the backend independently enforces access).
// Full-access roles (super_admin/admin) are returned every permission name by
// the backend, so every route below stays visible for them automatically.
const PERMISSION_FOR_PATH = {
  // Overview
  '/admin/analytics': ['analytics.view'],
  // Operations
  '/admin/orders': ['orders.view'],
  '/admin/riders': ['riders.view'],
  '/admin/rider-map': ['dispatch.view'],
  '/admin/disputes': ['disputes.view'],
  '/admin/support': ['support_tickets.view'],
  // People
  '/admin/users': ['users.view'],
  '/admin/merchants': ['merchants.view'],
  // Finance
  '/admin/transactions': ['transactions.view'],
  '/admin/payouts': ['wallet.view'],
  // Pipeline
  '/admin/pipeline': ['pipeline.view'],
  '/admin/pipeline/board': ['pipeline.view'],
  '/admin/pipeline/my-items': ['pipeline.view'],
  '/admin/pipeline/documents': ['pipeline.view'],
  '/admin/pipeline/activity': ['pipeline.view'],
  // Platform
  '/admin/audit-log': ['audit_logs.view'],
  '/admin/settings': ['settings.view'],
  // Administration
  '/admin/admins': ['admins.view'],
  '/admin/roles': ['roles.view', 'permissions.view'],
  '/admin/permissions': ['permissions.view'],
}

export function buildAdminNavSections(counts = {}, permissions = null) {
  return ADMIN_NAV_SECTIONS.map((section) => ({
    ...section,
    items: section.items
      .filter((item) => {
        if (permissions === null || permissions.length === 0) return true

        const required = PERMISSION_FOR_PATH[item.to]
        if (!required) return true

        // Legacy full-access roles receive every permission name, so a blanket
        // match on the raw permission list covers super_admin/admin.
        return required.some((p) => permissions.includes(p))
      })
      .map((item) => {
        const key = NAV_COUNT_KEYS[item.to]
        const count = key ? counts[key] : undefined

        return {
          ...item,
          count: count > 0 ? count : undefined,
        }
      }),
  })).filter((section) => section.items.length > 0)
}
