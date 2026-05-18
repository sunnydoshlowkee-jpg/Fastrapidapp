export const MERCHANT_DASHBOARD_OVERVIEW = {
  merchantId: '44092',
  storeStatus: 'STORE LIVE',
  stats: [
    {
      id: 'revenue',
      label: "Today's Revenue",
      value: '—',
      subtext: 'waiting for your first sale',
      subtextTone: 'warning',
      icon: 'banknote',
    },
    {
      id: 'live-orders',
      label: 'Live Orders',
      value: '0',
      subtext: 'Currently in kitchen',
      subtextTone: 'muted',
      icon: 'refresh',
    },
    {
      id: 'completed',
      label: 'Completed',
      value: '—',
      subtext: 'Last 24 hours',
      subtextTone: 'muted',
      icon: 'check',
    },
    {
      id: 'rating',
      label: 'Performance Rating',
      value: 'N/A',
      subtext: 'Top 5% in category',
      subtextTone: 'muted',
      icon: 'star',
      iconTone: 'warning',
    },
  ],
  emptyState: {
    title: 'No live orders yet.',
    description:
      'Your store is open and waiting! Orders will appear here as soon as customers start browsing your menu.',
    primaryAction: 'Promote My Store',
    secondaryAction: 'View Customer Link',
    customerLink: 'https://rapid.app/store/demo',
  },
  tips: [
    {
      id: 'menu',
      title: 'Optimize your Menu',
      description: 'High-quality photos increase order volume by up to 40%.',
      icon: 'sparkles',
    },
    {
      id: 'promo',
      title: 'Run a Promotion',
      description: 'Setup a limited-time discount to attract new customers.',
      icon: 'megaphone',
    },
    {
      id: 'trends',
      title: 'Analyze Trends',
      description: 'Check which items are viewed most frequently.',
      icon: 'chart',
    },
  ],
}

export const MERCHANT_DASHBOARD_MOBILE = {
  overview: {
    title: 'Overview',
    subtitle: "Today's performance",
  },
  stats: [
    {
      id: 'total-revenue',
      label: 'Total Revenue',
      value: '$0.00',
      subtext: 'Waiting for your first sale',
      subtextTone: 'warning',
      icon: 'wallet',
    },
    {
      id: 'orders-today',
      label: 'Orders Today',
      value: '0',
      subtext: 'N/A vs yesterday',
      subtextTone: 'muted',
      icon: 'bag',
    },
    {
      id: 'avg-order',
      label: 'Avg Order Value',
      value: '-',
      subtext: 'N/A vs yesterday',
      subtextTone: 'muted',
      icon: 'receipt',
    },
    {
      id: 'store-views',
      label: 'Store Views',
      value: '0',
      subtext: 'Share link to get traffic',
      subtextTone: 'muted',
      icon: 'eye',
    },
  ],
  emptyState: {
    title: 'No live orders yet.',
    description:
      'Your store is open and waiting! Orders will appear here as soon as customers start browsing your menu.',
    action: 'View Customer Link',
    customerLink: 'https://rapid.app/store/demo',
  },
  gettingStarted: {
    title: 'Getting Started',
    items: [
      {
        id: 'menu',
        title: 'Optimize your Menu',
        description: 'Add photos and detailed descriptions to boost sales.',
        icon: 'utensils',
        iconTone: 'purple',
      },
      {
        id: 'promo',
        title: 'Run a Promotion',
        description: 'Offer a discount to your first 10 customers to kickstart orders.',
        icon: 'megaphone',
        iconTone: 'orange',
      },
      {
        id: 'trends',
        title: 'Analyze Trends',
        description: 'Check back here to see which items perform best once orders roll in.',
        icon: 'chart',
        iconTone: 'gray',
      },
    ],
  },
}
