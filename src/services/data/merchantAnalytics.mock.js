/**
 * Desktop [289:17227](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=289-17227),
 * mobile [622:7276](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=622-7276).
 */
export const MERCHANT_ANALYTICS_PERIODS = [
  { id: 'today', label: 'Today' },
  { id: '7d', label: '7D' },
  { id: '30d', label: '30D' },
  { id: 'custom', label: 'Custom' },
]

export const MERCHANT_ANALYTICS = {
  dateFilterLabel: 'Last 30 Days',
  revenue: {
    total: '₦1,240,500.00',
    change: '+12.4%',
    changePositive: true,
    chart: [
      { label: 'Mon', value: 62 },
      { label: 'Tue', value: 78 },
      { label: 'Wed', value: 55 },
      { label: 'Thu', value: 88 },
      { label: 'Fri', value: 95 },
      { label: 'Sat', value: 100 },
      { label: 'Sun', value: 72 },
    ],
  },
  quickStats: [
    { id: 'sales', label: 'Total Sales', value: '₦1.2M', change: '+12%', positive: true },
    { id: 'orders', label: 'Total Orders', value: '285', change: '+5%', positive: true },
    { id: 'aov', label: 'Avg Order Value', value: '₦4,200', change: '+2%', positive: true },
  ],
  peakHours: {
    chart: [
      { label: '8AM', value: 25, peak: false },
      { label: '10AM', value: 40, peak: false },
      { label: '12PM', value: 92, peak: true },
      { label: '2PM', value: 88, peak: true },
      { label: '4PM', value: 55, peak: false },
      { label: '6PM', value: 70, peak: false },
      { label: '8PM', value: 48, peak: false },
      { label: '10PM', value: 30, peak: false },
    ],
    insight:
      'Highest traffic observed between 12:00 PM and 2:00 PM. Consider increasing staff or launching flash promos during these windows.',
  },
  customerInsights: {
    returnRate: 76,
    segments: [
      { id: 'returning', label: 'Returning Customers', count: '217 Users', color: '#4342FF' },
      { id: 'new', label: 'New Customers', count: '68 Users', color: '#E5E7EB' },
    ],
    avgSpend: '₦4,500',
  },
  topPerformers: [
    {
      id: 'jollof',
      name: 'Spicy Jollof Platter',
      image: '/burger.png',
      status: 'in_stock',
      unitsSold: 84,
      revenue: '₦210,000',
    },
    {
      id: 'suya',
      name: 'Premium Beef Suya',
      image: '/pizza.png',
      status: 'in_stock',
      unitsSold: 62,
      revenue: '₦186,000',
    },
    {
      id: 'zobo',
      name: 'Organic Zobo (1L)',
      image: '/grocery-hero.png',
      status: 'out_of_stock',
      unitsSold: 41,
      revenue: '₦82,000',
    },
  ],
  feedback: {
    rating: '4.8',
    reviewCount: '1,204',
    reviews: [
      {
        id: 'r1',
        name: 'Chinedu O.',
        timeAgo: '2 hours ago',
        stars: 5,
        orderLabel: 'Ordered: 2x Jollof Rice Special',
        text: 'Food arrived hot and tasted amazing. Will definitely order again!',
      },
      {
        id: 'r2',
        name: 'Amaka N.',
        timeAgo: '5 hours ago',
        stars: 5,
        orderLabel: 'Ordered: 1x Family Combo',
        text: 'Portions were generous and delivery was faster than expected.',
      },
      {
        id: 'r3',
        name: 'David K.',
        timeAgo: '1 day ago',
        stars: 4,
        orderLabel: 'Ordered: 3x Beef Burger',
        text: 'Great quality overall. Packaging could be a bit sturdier.',
      },
    ],
  },
  mobile: {
    revenue: {
      highlightDay: 'Sun',
      changePill: true,
    },
    quickStats: [
      { id: 'sales', label: 'Total Sales', value: '₦1.2M', change: '+3%', positive: true },
      { id: 'orders', label: 'Total Orders', value: '285', change: '+6%', positive: true },
      { id: 'aov', label: 'Avg Order Value', value: '₦4,200', change: '+2%', positive: true },
    ],
    peakHours: {
      chart: [
        { label: '8AM', value: 30, peak: false },
        { label: '10AM', value: 45, peak: false },
        { label: '12PM', value: 100, peak: true },
        { label: '2PM', value: 95, peak: true },
        { label: '4PM', value: 50, peak: false },
        { label: '6PM', value: 65, peak: false },
      ],
      insight:
        'Highest traffic observed between 12:00 PM and 2:00 PM. Consider increasing staff or launching flash promos during these windows.',
    },
    customerInsights: {
      totalUsers: 285,
      segments: [
        { id: 'returning', label: 'Returning', percent: 76, count: 217, color: '#4342FF' },
        { id: 'new', label: 'New', percent: 24, count: 68, color: '#E5E7EB' },
      ],
      avgSpend: '₦4,500',
    },
    topPerformers: [
      {
        id: 'jollof',
        name: 'Spicy Jollof Platter',
        image: '/burger.png',
        status: 'in_stock',
      },
      {
        id: 'suya',
        name: 'Premium Beef Suya',
        image: '/pizza.png',
        status: 'out_of_stock',
      },
      {
        id: 'zobo',
        name: 'Tropical Zobo Refresher',
        image: '/grocery-hero.png',
        status: 'in_stock',
      },
    ],
    feedback: {
      rating: '4.8',
      reviewCount: '1,204',
      reviews: [
        {
          id: 'r1',
          name: 'Chinedu O.',
          timeAgo: '3 hours ago',
          stars: 5,
          text: 'Delivery was super fast and the food was still hot. Will order again!',
        },
        {
          id: 'r2',
          name: 'Amina Y.',
          timeAgo: '5 hours ago',
          stars: 5,
          text: 'Seasoning was perfect on the Suya. I just wish portions were slightly bigger.',
        },
        {
          id: 'r3',
          name: 'David T.',
          timeAgo: 'Yesterday',
          stars: 5,
          text: 'Amazing drink! The Zobo was refreshing and perfectly sweetened.',
        },
      ],
    },
  },
}
