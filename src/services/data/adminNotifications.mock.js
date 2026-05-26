/**
 * Notifications panel [362:1441](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=362-1441)
 * Mobile notifications [297:40897](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=297-40897)
 */
export const ADMIN_NOTIFICATIONS_PATH = '/admin/notifications'

export const ADMIN_NOTIFICATIONS = {
  title: 'Notifications',
  markAllReadLabel: 'Mark all read',
  unreadSuffix: 'unread alerts',
  tabs: [
    { id: 'all', label: 'All' },
    { id: 'orders', label: 'Orders' },
    { id: 'finance', label: 'Finance' },
    { id: 'merchants', label: 'Merchants' },
    { id: 'system', label: 'System' },
  ],
  items: [
    {
      id: 'n1',
      category: 'system',
      variant: 'critical',
      title: 'Server Load Critical',
      body: 'Cluster Alpha is currently experiencing 98% CPU utilization. Immediate intervention required to prevent service degradation.',
      time: 'Just now',
      unread: true,
      actions: [
        { id: 'ack', label: 'Acknowledge', primary: true },
        { id: 'metrics', label: 'View Metrics', primary: false },
      ],
    },
    {
      id: 'n2',
      category: 'finance',
      variant: 'default',
      icon: 'banknote',
      title: 'Large Transaction Alert',
      body: 'A transfer of ₦54,000.00 was just initiated by Merchant ID #8842. Standard holds apply.',
      time: '10m ago',
      unread: true,
    },
    {
      id: 'n3',
      category: 'orders',
      variant: 'default',
      icon: 'truck',
      title: 'Route Optimization Complete',
      body: 'Daily fleet routing has been calculated. Estimated fuel savings: 12% across active sectors.',
      time: '1h ago',
      unread: false,
    },
    {
      id: 'n4',
      category: 'merchants',
      variant: 'default',
      icon: 'userPlus',
      title: 'New Vendor Approved',
      body: 'Global Supplies Inc. has passed compliance checks and is now active in the procurement network.',
      time: '3h ago',
      unread: false,
    },
  ],
}
