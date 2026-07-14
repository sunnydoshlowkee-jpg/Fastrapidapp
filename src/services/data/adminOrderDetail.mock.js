/**
 * Admin order detail [330:968](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=330-968)
 * Mobile order detail view [297:21940](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=297-21940)
 */

export const ADMIN_ORDER_DETAIL_DEFAULT_ID = 'ORD-8829'

export const ADMIN_ORDER_DETAIL_STATIC = {
  backLabel: 'Back to orders',
  printReceiptLabel: 'Print Receipt',
  updateStatusLabel: 'Update Status',
  supportLabel: 'Support',
  actionsLabel: 'Actions',
  adminActions: {
    title: 'Admin Actions',
    items: [
      { id: 'reassign', label: 'Reassign Rider', icon: 'userSwitch' },
      { id: 'fee', label: 'Adjust Fee', icon: 'sliders' },
      { id: 'refund', label: 'Issue Refund', icon: 'refund' },
      { id: 'cancel', label: 'Cancel Order', icon: 'cancel', danger: true },
    ],
  },
  refundSheet: {
    title: 'Issue Refund',
    orderPrefix: 'Order',
    closeLabel: 'Close',
    eligibleLabel: 'Eligible Amount',
    eligibleAmount: '45,000',
    currency: '₦',
    methodLabel: 'Refund Method',
    methods: [
      { id: 'full', label: 'Full' },
      { id: 'partial', label: 'Partial' },
      { id: 'wallet', label: 'Wallet' },
    ],
    defaultMethodId: 'full',
    amountLabel: 'Amount to Refund',
    defaultAmount: '45,000',
    reasonLabel: 'Reason for Refund',
    reasonOptions: [
      'Customer requested cancellation',
      'Item out of stock',
      'Driver unable to deliver',
      'Damaged or incorrect item',
      'Late delivery',
      'Other',
    ],
    defaultReason: 'Customer requested cancellation',
    notesLabel: 'Internal Notes (Optional)',
    notesPlaceholder: 'Add context for this refund...',
    ctaLabel: 'Confirm Refund',
  },
  reassignRider: {
    title: 'Reassign Rider',
    closeLabel: 'Close',
    searchPlaceholder: 'Search riders by name...',
    ctaLabel: 'Confirm Reassignment',
    busyLabel: 'Currently on a delivery',
    defaultSelectedId: 'oluwaseun-adebayo',
    riders: [
      {
        id: 'oluwaseun-adebayo',
        name: 'Oluwaseun Adebayo',
        initials: 'OA',
        avatarBg: 'bg-[#FDA77A]',
        avatarColor: 'text-[#9D4300]',
        distance: '1.2 km',
        rating: '4.9',
        status: 'available',
      },
      {
        id: 'ngozi-okafor',
        name: 'Ngozi Okafor',
        initials: 'NO',
        avatarBg: 'bg-[#BE7BFF]/40',
        avatarColor: 'text-[#4C0084]',
        distance: '2.5 km',
        rating: '4.7',
        status: 'available',
      },
      {
        id: 'chinedu-eze',
        name: 'Chinedu Eze',
        initials: 'CE',
        avatarBg: 'bg-[#E2E2E3]',
        avatarColor: 'text-[#1A1C1D]',
        distance: '3.1 km',
        rating: '4.5',
        status: 'available',
      },
      {
        id: 'emeka-nwosu',
        name: 'Emeka Nwosu',
        initials: 'EN',
        avatarBg: 'bg-[#F3F3F4]',
        avatarColor: 'text-[#584237]',
        status: 'busy',
      },
    ],
  },
  actionsSheet: {
    titlePrefix: 'Manage',
    closeLabel: 'Close',
    items: [
      {
        id: 'reassign',
        label: 'Reassign Rider',
        description: 'Current rider delayed',
        icon: 'bike',
        tone: 'orange',
        chevron: true,
      },
      {
        id: 'fee',
        label: 'Adjust Delivery Fee',
        description: 'Modify base fare',
        icon: 'wallet',
        tone: 'neutral',
        chevron: true,
      },
      {
        id: 'note',
        label: 'Add Internal Note',
        description: 'Visible only to admin',
        icon: 'note',
        tone: 'neutral',
      },
      {
        id: 'refund',
        label: 'Issue Refund',
        description: 'Partial or full return',
        icon: 'refund',
        tone: 'purple',
        spacingTop: true,
      },
      {
        id: 'cancel',
        label: 'Cancel Order',
        description: 'Requires customer notification',
        icon: 'cancel',
        tone: 'danger',
      },
    ],
  },
  notes: {
    title: 'Notes',
    placeholder: 'Add internal admin note...',
    saveLabel: 'Save Note',
  },
}

const ORDER_DETAIL = {
  id: 'ORD-8829',
  referenceId: '902847192',
  placedAt: 'Placed Today at 14:32',
  placedAtMobile: 'Placed at 12:10 PM today',
  statusLabel: 'In Transit',
  estimateLabel: 'Est. 12:45 PM',
  statusBadge: { label: 'Active', tone: 'violet' },
  steps: [
    { id: 'placed', label: 'Placed', status: 'complete', icon: 'check' },
    { id: 'accepted', label: 'Accepted', status: 'complete', icon: 'check' },
    { id: 'transit', label: 'Transit', status: 'active', icon: 'bike' },
    { id: 'delivered', label: 'Delivered', status: 'upcoming', icon: 'home' },
  ],
  stakeholders: {
    merchant: {
      title: 'Merchant',
      name: 'The Rustic Bean',
      initials: 'RB',
      distanceLabel: '1.2 km away',
      actionLabel: 'View store',
      icon: 'store',
      iconTone: 'orange',
    },
    rider: {
      title: 'Rider',
      name: 'Samuel K.',
      initials: 'SK',
      rating: '4.9',
      tripsLabel: '120 trips',
      actionLabel: 'Call rider',
      icon: 'bike',
      iconTone: 'orange',
    },
    customer: {
      title: 'Customer',
      name: 'Anita B.',
      maskedPhone: '+234 801 *** 89',
      actionLabel: 'View profile',
      icon: 'user',
      iconTone: 'purple',
    },
  },
  items: {
    title: 'Order Items',
    lines: [
      {
        id: '1',
        qty: 2,
        name: 'Iced Caramel Macchiato',
        note: 'Oat milk, Extra shot',
        price: '5,400',
      },
      { id: '2', qty: 1, name: 'Butter Croissant', note: null, price: '1,200' },
    ],
    subtotalLabel: 'Subtotal',
    subtotal: '6,600',
    deliveryLabel: 'Delivery Fee',
    deliveryFee: '800',
    serviceLabel: 'Service Fee',
    serviceCharge: '200',
    totalLabel: 'Total',
    total: '7,600',
  },
  ...ADMIN_ORDER_DETAIL_STATIC,
}

export function getAdminOrderDetail(orderId) {
  if (!orderId || orderId === ORDER_DETAIL.id) return ORDER_DETAIL
  return {
    ...ORDER_DETAIL,
    id: orderId,
    referenceId: orderId.replace(/\D/g, '').slice(-9) || ORDER_DETAIL.referenceId,
  }
}
