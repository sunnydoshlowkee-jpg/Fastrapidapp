/** Admin order detail [330:968](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=330-968) */

export const ADMIN_ORDER_DETAIL_DEFAULT_ID = 'ORD-8829A'

const ORDER_DETAIL = {
  id: 'ORD-8829A',
  referenceId: '902847192',
  placedAt: 'Placed Today at 14:32',
  printReceiptLabel: 'Print Receipt',
  updateStatusLabel: 'Update Status',
  steps: [
    { id: 'accepted', label: 'Accepted', status: 'complete', icon: 'check' },
    { id: 'preparing', label: 'Preparing', status: 'active', icon: 'cooking' },
    { id: 'ready', label: 'Ready', status: 'upcoming', icon: 'bike' },
    { id: 'delivered', label: 'Delivered', status: 'upcoming', icon: 'home' },
  ],
  stakeholders: {
    customer: {
      title: 'Customer',
      name: 'Adeola Iye',
      actionLabel: 'View profile',
      icon: 'user',
      iconTone: 'purple',
    },
    merchant: {
      title: 'Merchant',
      name: 'Tantalizers Allen',
      actionLabel: 'Call',
      icon: 'store',
      iconTone: 'orange',
    },
    rider: {
      title: 'Rider',
      name: 'Chinedu Eze',
      actionLabel: 'Track',
      icon: 'bike',
      iconTone: 'orange',
    },
  },
  items: {
    title: 'Order Items',
    lines: [
      { id: '1', qty: 2, name: 'Jollof Rice & Chicken', note: 'Extra plantain, no salad', price: '7,000' },
      { id: '2', qty: 1, name: 'Meatpie', note: null, price: '1,200' },
    ],
    subtotal: '8,200',
    deliveryFee: '1,500',
    serviceCharge: '250',
    total: '9,950',
  },
  adminActions: {
    title: 'Admin Actions',
    items: [
      { id: 'reassign', label: 'Reassign Rider', icon: 'userSwitch' },
      { id: 'fee', label: 'Adjust Fee', icon: 'sliders' },
      { id: 'refund', label: 'Issue Refund', icon: 'refund' },
      { id: 'cancel', label: 'Cancel Order', icon: 'cancel', danger: true },
    ],
  },
  notes: {
    title: 'Notes',
    placeholder: 'Add internal admin note...',
    saveLabel: 'Save Note',
  },
}

export function getAdminOrderDetail(orderId) {
  if (!orderId || orderId === ORDER_DETAIL.id) return ORDER_DETAIL
  return {
    ...ORDER_DETAIL,
    id: orderId,
    referenceId: orderId.replace(/\D/g, '').slice(-9) || ORDER_DETAIL.referenceId,
  }
}
