/** Dashboard live view [330:97](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=330-97) */
export const ADMIN_DASHBOARD = {
  greeting: {
    title: 'Good morning, Admin 👋',
    subtitle: "Here's what's happening today.",
    systemStatus: 'System Online',
  },
  searchPlaceholder: 'Search orders, riders...',
  kpis: [
    {
      id: 'active-orders',
      variant: 'orders',
      label: 'Active Orders',
      value: '142',
      trend: '+12% vs last hr',
      showTrendIcon: true,
    },
    {
      id: 'active-riders',
      variant: 'riders',
      label: 'Active Riders',
      value: '84',
      trend: '92% Utilization',
    },
    {
      id: 'sla-breaches',
      variant: 'sla',
      label: 'SLA Breaches',
      value: '7',
      trend: 'Needs immediate attention',
    },
    {
      id: 'revenue',
      variant: 'revenue',
      label: "Today's Revenue",
      value: '₦2.4M',
      trend: 'Updated 2m ago',
    },
  ],
  telemetry: {
    title: 'Live Telemetry',
    liveLabel: 'LIVE',
    events: [
      {
        id: '1',
        title: 'Rider #4492 Re-routed',
        body: 'Heavy traffic detected on Admiralty Way. ETA adjusted +5m.',
        time: 'Just now',
      },
      {
        id: '2',
        title: 'Batch Delivery Complete',
        body: 'Order #ORD-8921 and #ORD-8922 delivered successfully by Rider #102.',
        time: '2m ago',
      },
      {
        id: '3',
        title: 'New Vendor Online',
        body: "'Iya Basira Foods' is now accepting orders in Surulere.",
        time: '5m ago',
      },
    ],
  },
  exceptions: {
    title: 'Exception Alerts',
    viewAllLabel: 'View All',
    items: [
      {
        id: '1',
        severity: 'critical',
        title: 'Unassigned Order > 15m',
        location: 'Lekki Phase 1',
        actionLabel: 'FORCE ASSIGN',
      },
      {
        id: '2',
        severity: 'warning',
        title: 'Vendor Offline During Peak',
        location: "'Chicken Republic - Yaba'",
        actionLabel: 'CONTACT VENDOR',
      },
    ],
  },
  topVendors: {
    title: 'Top Vendors',
    items: [
      { id: '1', name: 'Burger King', orders: 142, online: true, initials: 'BK', color: '#E85A1F' },
      { id: '2', name: "Domino's Pizza", orders: 98, online: true, initials: 'DP', color: '#2563EB' },
      { id: '3', name: 'Pizza Hut', orders: 0, online: false, initials: 'PH', color: '#DC2626', statusLabel: 'Offline' },
    ],
  },
  availability: {
    title: 'Availability',
    zones: [
      { id: 'island', name: 'Island Zone', level: 'high', percent: 92 },
      { id: 'mainland', name: 'Mainland Zone', level: 'medium', percent: 58 },
      { id: 'ikeja', name: 'Ikeja Zone', level: 'critical', percent: 18 },
    ],
    manageLabel: 'MANAGE ZONES',
  },
  sidebar: {
    brandLabel: 'Admin',
    user: {
      name: 'Admin User',
      role: 'Super Admin',
      initials: 'AU',
    },
    logoutLabel: 'Logout',
  },
}
