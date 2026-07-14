/**
 * Dashboard live view [330:97](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=330-97)
 * Mobile Command Center [297:40315](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=297-40315)
 */
export const ADMIN_DASHBOARD = {
  pageTitle: 'Command Center',
  greeting: {
    title: 'Good morning, Admin 👋',
    subtitle: "Here's your live operational overview.",
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
    liveLabel: 'Live',
    events: [
      {
        id: '1',
        orderId: '#ORD-5921',
        time: '2 mins ago',
        dotTone: 'violet',
        statusLabel: 'Picked Up',
        statusTone: 'violet',
      },
      {
        id: '2',
        orderId: '#ORD-5920',
        time: '4 mins ago',
        dotTone: 'violet',
        statusLabel: 'En Route',
        statusTone: 'gray',
      },
      {
        id: '3',
        orderId: '#ORD-5919',
        time: '6 mins ago',
        dotTone: 'amber',
        statusLabel: 'Pending',
        statusTone: 'amber',
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
        title: 'Order #102 delayed > 30 mins',
        meta: 'Zone: VI / Assigned: Rider 42',
        actionLabel: 'Resolve',
      },
      {
        id: '2',
        severity: 'warning',
        title: 'Order #441 pending > 15 mins',
        meta: 'Zone: Ikoyi / Unassigned',
        actionLabel: 'Resolve',
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
      {
        id: 'island',
        name: 'Island Zone',
        level: 'high',
        levelLabel: 'High',
        percent: 92,
        ridersReady: '24 riders ready',
      },
      {
        id: 'mainland',
        name: 'Mainland Zone',
        level: 'medium',
        levelLabel: 'Medium',
        percent: 58,
        ridersReady: '12 riders ready',
      },
      {
        id: 'ikeja',
        name: 'Ikeja Zone',
        level: 'critical',
        levelLabel: 'Critical',
        percent: 18,
        ridersReady: '2 riders ready',
      },
    ],
    manageLabel: 'Manage Zones',
  },
  sidebar: {
    brandLabel: 'Admin',
    user: {
      name: 'Admin User',
      role: 'Super Admin',
      initials: 'AU',
      showRolePill: true,
    },
    logoutLabel: 'Logout',
    versionLabel: 'Rapid Admin v1.0.2',
    openLabel: 'Open menu',
    closeLabel: 'Close menu',
  },
}
