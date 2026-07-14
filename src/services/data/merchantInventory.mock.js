/** Desktop [272:6856](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=272-6856) · Mobile [622:1164](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=622-1164) */
/** Switch to `'empty'` to preview the menu upload setup screen */
export const MERCHANT_INVENTORY_MODE = 'active'

export const MERCHANT_INVENTORY = {
  pageTitle: 'Inventory',
  subtitle: 'Manage your product availability and pricing.',
  searchPlaceholder: 'Search menu...',
  bulkUpdateLabel: 'Bulk Update',
  addItemLabel: 'Add Item',
  summary: [
    { id: 'total', label: 'Total Products', value: '1,284' },
    { id: 'active', label: 'Active Items', value: '1,102' },
    { id: 'low-stock', label: 'Low Stock', value: '14', highlight: 'warning' },
    { id: 'value', label: 'Inventory Value', value: '₦2.4M' },
  ],
  table: {
    showingLabel: 'Showing',
    ofLabel: 'of',
    productsLabel: 'products',
  },
  mobile: {
    subtitle: 'Manage your product availability and pricing',
    addItemLabel: '+ Add Item',
    insightsTitle: 'Inventory Insights',
    insights: [
      {
        id: 'top-selling',
        label: 'Top Selling',
        title: 'Jollof Rice',
        subtext: '124 orders',
        tone: 'primary',
        icon: 'trending',
      },
      {
        id: 'low-stock',
        label: 'Low Stock Category',
        title: 'Produce',
        subtext: '4 items',
        tone: 'warning',
        icon: 'package',
      },
      {
        id: 'revenue',
        label: 'Menu Insights',
        title: 'Monthly Revenue',
        value: '₦452,000',
        tone: 'muted',
        icon: 'wallet',
      },
    ],
  },
  insights: [
    {
      id: 'top-selling',
      title: 'Jollof Rice',
      subtext: '124 orders today',
      tone: 'success',
      icon: 'trending',
    },
    {
      id: 'low-stock',
      title: 'Produce Category',
      subtext: '4 items need replenishment',
      tone: 'warning',
      icon: 'alert',
    },
    {
      id: 'revenue',
      title: '₦452,000',
      subtext: 'Estimated monthly revenue',
      tone: 'primary',
      icon: 'chart',
    },
  ],
}

export const MERCHANT_INVENTORY_PRODUCTS = [
  {
    id: 'ka-jlf-01',
    name: 'Signature Jollof Rice',
    sku: 'KA-JLF-01',
    mobileSku: 'JLF-01',
    category: 'Restaurant',
    price: '₦4,500',
    stockQty: '12',
    stockWarning: false,
    available: true,
    imageUrl:
      'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=80&h=80&fit=crop',
  },
  {
    id: 'ka-ppr-09',
    name: 'Fresh Atarodo',
    sku: 'KA-PPR-09',
    mobileSku: 'ATR-02',
    category: 'Ingredients',
    price: '₦1,200',
    stockQty: '2kg',
    stockWarning: true,
    available: true,
    imageUrl:
      'https://images.unsplash.com/photo-1563564621-6cf83c7931c4?w=80&h=80&fit=crop',
  },
  {
    id: 'ka-egs-04',
    name: 'Special Egusi Soup',
    sku: 'KA-EGS-04',
    mobileSku: 'EGS-03',
    category: 'Restaurant',
    price: '₦5,800',
    stockQty: '45',
    stockWarning: false,
    available: true,
    imageUrl:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=80&h=80&fit=crop',
  },
  {
    id: 'ka-drk-12',
    name: 'Chilled Zobo Extract',
    sku: 'KA-DRK-12',
    mobileSku: 'ZOB-04',
    category: 'Beverage',
    price: '₦850',
    stockQty: '120',
    stockWarning: false,
    available: true,
    imageUrl:
      'https://images.unsplash.com/photo-1546173159-315724d42f4d?w=80&h=80&fit=crop',
  },
]

export const MERCHANT_INVENTORY_TOTAL_COUNT = 1284
