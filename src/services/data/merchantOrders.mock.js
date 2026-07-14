/**
 * Desktop [272:5717](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=272-5717),
 * mobile [622:951](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=622-951).
 */
export const MERCHANT_ORDERS_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'new', label: 'New', countKey: 'new' },
  { id: 'preparing', label: 'Preparing' },
  { id: 'ready', label: 'Ready' },
  { id: 'dispatched', label: 'Dispatched' },
  { id: 'delivered', label: 'Delivered' },
]

export const MERCHANT_ORDERS_SUMMARY = {
  pending: {
    label: 'Pending Orders',
    value: '12',
    subtext: '+4 since 8:00 AM',
    subtextTone: 'positive',
  },
  revenue: {
    label: 'Daily Revenue',
    value: '₦428,500',
    subtext: '32 Transactions total',
    subtextTone: 'info',
  },
  completion: {
    label: 'Completion Rate',
    value: '98.2%',
    percent: 98.2,
  },
}

export const MERCHANT_ORDERS_SUMMARY_MOBILE = {
  pending: {
    label: 'Pending Orders',
    value: '12',
    subtext: '4 since 6:00 AM',
  },
  revenue: {
    label: 'Daily Revenue',
    value: '₦428,500',
    subtext: '@ 32 transactions total',
  },
  completion: {
    label: 'Completion Rate',
    value: '98.2%',
    percent: 98.2,
  },
}

export const MERCHANT_ORDERS_LIST = [
  {
    id: 'KA-8921',
    displayId: '#KA-8921',
    customer: { name: 'Chukwudi O.', initials: 'CO', avatarTone: 'blue' },
    itemsSummary: '2x Jollof Rice Special, 1x Zobo Drink...',
    total: '₦12,500',
    status: 'new',
  },
  {
    id: 'KA-8920',
    displayId: '#KA-8920',
    customer: { name: 'Sarah M.', initials: 'SM', avatarTone: 'purple' },
    itemsSummary: '1x Family Combo, 2x Coke',
    total: '₦18,200',
    status: 'preparing',
  },
  {
    id: 'KA-8919',
    displayId: '#KA-8919',
    customer: { name: 'David K.', initials: 'DK', avatarTone: 'teal' },
    itemsSummary: '3x Beef Burger, 1x Fries',
    total: '₦9,450',
    status: 'ready',
  },
  {
    id: 'KA-8918',
    displayId: '#KA-8918',
    customer: { name: 'Adaeze N.', initials: 'AN', avatarTone: 'pink' },
    itemsSummary: '2x Bunker Classic, 1x Truffle Fries',
    total: '₦8,800',
    status: 'new',
  },
  {
    id: 'KA-8917',
    displayId: '#KA-8917',
    customer: { name: 'Michael T.', initials: 'MT', avatarTone: 'amber' },
    itemsSummary: '1x Fried Rice Special',
    total: '₦3,200',
    status: 'dispatched',
  },
  {
    id: 'KA-8916',
    displayId: '#KA-8916',
    customer: { name: 'Blessing A.', initials: 'BA', avatarTone: 'green' },
    itemsSummary: '4x Party Jollof, 2x Plantain',
    total: '₦24,000',
    status: 'delivered',
  },
  {
    id: 'KA-8915',
    displayId: '#KA-8915',
    customer: { name: 'Emeka P.', initials: 'EP', avatarTone: 'indigo' },
    itemsSummary: '1x Shawarma Wrap, 1x Chapman',
    total: '₦5,600',
    status: 'delivered',
  },
  {
    id: 'KA-8914',
    displayId: '#KA-8914',
    customer: { name: 'Fatima H.', initials: 'FH', avatarTone: 'rose' },
    itemsSummary: '2x Suya Plate, 1x Malt',
    total: '₦7,100',
    status: 'new',
  },
  {
    id: 'KA-8913',
    displayId: '#KA-8913',
    customer: { name: 'James L.', initials: 'JL', avatarTone: 'slate' },
    itemsSummary: '1x Pepper Soup, 2x Rice',
    total: '₦11,300',
    status: 'preparing',
  },
  {
    id: 'KA-8912',
    displayId: '#KA-8912',
    customer: { name: 'Grace W.', initials: 'GW', avatarTone: 'cyan' },
    itemsSummary: '3x Small Chops Platter',
    total: '₦15,750',
    status: 'delivered',
  },
]

export const MERCHANT_ORDERS_PAGINATION = {
  page: 1,
  pageSize: 10,
  total: 248,
}
