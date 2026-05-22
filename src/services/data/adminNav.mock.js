import {
  LayoutDashboard,
  ShoppingBag,
  Bike,
  Users,
  Store,
  ArrowLeftRight,
  Wallet,
  AlertTriangle,
  Settings,
  ScrollText,
  Headphones,
} from 'lucide-react'

export const ADMIN_NAV_ITEMS = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
  { to: '/admin/riders', icon: Bike, label: 'Riders' },
  { to: '/admin/users', icon: Users, label: 'Users' },
  { to: '/admin/merchants', icon: Store, label: 'Merchants' },
  { to: '/admin/transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { to: '/admin/payouts', icon: Wallet, label: 'Payouts' },
  { to: '/admin/disputes', icon: AlertTriangle, label: 'Disputes' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
  { to: '/admin/audit-log', icon: ScrollText, label: 'Audit Log' },
  { to: '/admin/support', icon: Headphones, label: 'Support Tickets' },
]
