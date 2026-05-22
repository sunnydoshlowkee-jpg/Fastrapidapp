/** Notifications panel [362:1441](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=362-1441) */
export const ADMIN_NOTIFICATIONS_PATH = '/admin/notifications'

export const ADMIN_NOTIFICATIONS = {
  title: 'Notifications',
  markAllReadLabel: 'MARK ALL READ',
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
      body: 'Cluster Alpha is currently experiencing 98% CPU utilization.',
      time: 'JUST NOW',
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
      body: 'Inbound transfer of ₦45,200.00 flagged for secondary compliance review.',
      time: '12M AGO',
      unread: true,
    },
    {
      id: 'n3',
      category: 'orders',
      variant: 'default',
      icon: 'route',
      title: 'Route Optimization Complete',
      body: 'Logistics AI has recalculated delivery paths for Sector 4, saving estimated 12% fuel.',
      time: '1H AGO',
      unread: false,
    },
    {
      id: 'n4',
      category: 'merchants',
      variant: 'default',
      icon: 'store',
      title: 'New Vendor Approved',
      body: 'Apex Supplies Inc. has passed automated vetting and is now active in the network.',
      time: '3H AGO',
      unread: false,
    },
  ],
}
