/** Sidebar navigation [365:3701](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=365-3701) */
import {
  AlertTriangle,
  ArrowLeftRight,
  Bike,
  Headphones,
  LayoutDashboard,
  ScrollText,
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
    ],
  },
  {
    id: 'operations',
    label: 'Operations',
    items: [
      { to: '/admin/orders', icon: ShoppingBag, label: 'Orders', count: 12 },
      { to: '/admin/riders', icon: Bike, label: 'Riders' },
    ],
  },
  {
    id: 'people',
    label: 'People',
    items: [
      { to: '/admin/users', icon: Users, label: 'Users' },
      { to: '/admin/merchants', icon: Store, label: 'Merchants', count: 5 },
    ],
  },
  {
    id: 'finance',
    label: 'Finance',
    items: [
      { to: '/admin/transactions', icon: ArrowLeftRight, label: 'Transactions' },
      {
        to: '/admin/payouts',
        icon: Wallet,
        label: 'Payouts',
        count: 3,
        countTone: 'amber',
      },
      { to: '/admin/disputes', icon: AlertTriangle, label: 'Disputes', count: 2 },
    ],
  },
  {
    id: 'platform',
    label: 'Platform',
    items: [
      { to: '/admin/settings', icon: Settings, label: 'Settings' },
      { to: '/admin/audit-log', icon: ScrollText, label: 'Audit Log' },
      {
        to: '/admin/support',
        icon: Headphones,
        label: 'Support Tickets',
        count: 8,
      },
    ],
  },
]

export const ADMIN_NAV_ITEMS = ADMIN_NAV_SECTIONS.flatMap((s) => s.items)
