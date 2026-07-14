/** Switch to `'active'` to preview the live-orders dashboard */
export const MERCHANT_DASHBOARD_MODE = 'empty'

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
    primaryAction: 'Promote My Store',
    secondaryAction: 'View Customer Link',
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

export const MERCHANT_DASHBOARD_ACTIVE = {
  merchantId: '44092',
  stats: [
    {
      id: 'revenue',
      label: "Today's Revenue",
      value: '₦ 124,500',
      subtext: '+12% from yesterday',
      subtextTone: 'positive',
      icon: 'banknote',
    },
    {
      id: 'live-orders',
      label: 'Live Orders',
      value: '18',
      subtext: 'Currently in kitchen',
      subtextTone: 'muted',
      icon: 'refresh',
    },
    {
      id: 'completed',
      label: 'Completed',
      value: '142',
      subtext: 'Last 24 hours',
      subtextTone: 'muted',
      icon: 'check',
    },
    {
      id: 'rating',
      label: 'Performance Rating',
      value: '4.8/5.0',
      subtext: 'Top 5% in category',
      subtextTone: 'muted',
      icon: 'star',
      iconTone: 'warning',
    },
  ],
  liveOrders: [
    {
      id: 'ORD-9021',
      customer: 'Chukwudi O.',
      items: '2x Jollof Rice (Party), 1x Fried Plantain',
      icon: 'utensils',
      iconTone: 'blue',
      status: 'pending',
    },
    {
      id: 'ORD-9020',
      customer: 'Sarah M.',
      items: '1x Family Combo, 2x Coke',
      icon: 'cart',
      iconTone: 'purple',
      status: 'pending',
    },
    {
      id: 'ORD-9019',
      customer: 'David K.',
      items: '3x Beef Burger, 1x Fries',
      icon: 'burger',
      iconTone: 'blue',
      status: 'preparing',
      timeRemaining: '12M REMAINING',
    },
  ],
  stockAlerts: {
    badge: 'ACTION REQUIRED',
    items: [
      {
        id: 'pepper',
        title: 'Fresh Atarodo (Pepper)',
        detail: 'Critical low: 0.5kg remaining',
        action: 'Restock Now',
        severity: 'critical',
        showIcon: true,
      },
      {
        id: 'oil',
        title: 'Refined Sunflower Oil',
        detail: 'Running low: 2L remaining',
        action: 'View Vendors',
        severity: 'warning',
        showIcon: false,
      },
      {
        id: 'water',
        title: 'Bottled Water (50cl)',
        detail: 'Out of stock',
        action: 'Restock Now',
        severity: 'out',
        showIcon: true,
      },
    ],
    inventoryHealth: {
      label: 'INVENTORY HEALTH',
      percent: 82,
      subtext: '82% Items in stock',
    },
  },
}

/** Mobile active dashboard — [Figma 622:520](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=622-520) */
export const MERCHANT_DASHBOARD_ACTIVE_MOBILE = {
  stats: [
    {
      id: 'revenue',
      label: "Today's Revenue",
      value: '₦124,500',
      subtext: '+12% from yesterday',
      subtextTone: 'positiveGreen',
      icon: 'wallet',
      iconAccent: 'primary',
      iconAccent: 'primary',
    },
    {
      id: 'live-orders',
      label: 'Live Orders',
      value: '18',
      subtext: 'Currently in kitchen',
      subtextTone: 'muted',
      icon: 'chefhat',
      iconAccent: 'primary',
    },
    {
      id: 'completed',
      label: 'Completed',
      value: '142',
      subtext: 'Last 24 hrs',
      subtextTone: 'muted',
      icon: 'check',
      iconAccent: 'primary',
    },
    {
      id: 'performance',
      label: 'Performance',
      value: '4.8/5.0',
      subtext: 'Top 5% in category',
      subtextTone: 'muted',
      icon: 'star',
      iconAccent: 'primary',
    },
  ],
  liveOrders: [
    {
      id: '8824',
      displayId: '#8824',
      customer: 'Adaeze',
      amount: '₦4,500',
      summary: '2 items • Jollof Rice, Chicken',
      status: 'pending',
    },
    {
      id: '8823',
      displayId: '#8823',
      customer: 'Michael',
      amount: '₦3,200',
      summary: '1 item • Fried Rice Special',
      status: 'ready',
      badge: 'Ready',
    },
  ],
  stockAlerts: {
    items: [
      {
        id: 'pepper',
        title: 'Fresh Atarodo',
        badge: 'Critical Low',
        badgeTone: 'critical',
        dot: 'red',
      },
      {
        id: 'oil',
        title: 'Refined Sunflower Oil',
        badge: 'Running Low',
        badgeTone: 'running',
        dot: 'brown',
      },
      {
        id: 'water',
        title: 'Bottled Water 50cl',
        badge: 'Out of Stock',
        badgeTone: 'out',
        dot: 'red',
      },
    ],
    inventoryHealth: {
      label: 'Inventory Health',
      percent: 68,
    },
  },
}
