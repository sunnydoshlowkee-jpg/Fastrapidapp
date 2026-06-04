/** Static UI copy for admin merchants list (data comes from API). */
export const ADMIN_MERCHANTS_UI = {
  headerLabel: 'MERCHANT',
  subtitle: 'Manage and monitor platform merchants.',
  searchPlaceholder: 'Search by name, ID, or loca…',
  exportLabel: 'Export CSV',
  tabs: [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'active', label: 'Active' },
    { id: 'suspended', label: 'Suspended' },
    { id: 'rejected', label: 'Rejected' },
  ],
  columns: {
    business: 'Business',
    typeLocation: 'Type & Location',
    status: 'Status',
    verification: 'Verification',
    metrics: 'Metrics',
    joined: 'Joined',
    actions: 'Actions',
  },
  pagination: {
    showingPrefix: 'Showing',
    showingSuffix: 'merchants',
  },
  mobile: {
    pageTitle: 'Merchants',
    searchPlaceholder: 'Search businesses, ID, or phone...',
    totalOrdersLabel: 'Total Orders',
    filters: [
      { id: 'all', label: 'All' },
      { id: 'pending', label: 'Pending' },
      { id: 'active', label: 'Active' },
      { id: 'suspended', label: 'Suspended' },
      { id: 'rejected', label: 'Rejected' },
    ],
    bottomNav: [
      { id: 'overview', label: 'Overview', icon: 'bar-chart', path: '/admin' },
      { id: 'users', label: 'Users', icon: 'users-search', path: '/admin/users' },
      {
        id: 'merchants',
        label: 'Merchants',
        icon: 'store',
        path: '/admin/merchants',
        active: true,
      },
    ],
  },
}
