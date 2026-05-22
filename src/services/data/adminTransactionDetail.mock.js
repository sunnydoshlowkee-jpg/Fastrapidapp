/** Admin transaction detail [408:1519](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=408-1519) */
import { ADMIN_TRANSACTIONS_PATH } from './adminTransactions.mock'

export const ADMIN_TRANSACTION_DETAIL_PATH = `${ADMIN_TRANSACTIONS_PATH}/:transactionId`

export const ADMIN_TRANSACTION_DETAIL_DEFAULT_ID = 'TRX-992A-4B'

const ACTIVITY = [
  {
    id: 'TRX-992A-4B',
    status: 'success',
    statusLabel: 'SUCCESS',
    amount: '45,000.00',
    customer: 'Oluwaseun Adepoju',
    time: '2:45 PM',
  },
  {
    id: 'TRX-881Z-2C',
    status: 'failed',
    statusLabel: 'FAILED',
    amount: '150,500.00',
    customer: 'Grace Eze',
    time: '1:30 PM',
  },
  {
    id: 'TRX-774Y-9K',
    status: 'pending',
    statusLabel: 'PENDING',
    amount: '1,200.00',
    customer: 'Kabiru Musa',
    time: '10:03 AM',
  },
  {
    id: 'TRX-665X-1D',
    status: 'success',
    statusLabel: 'SUCCESS',
    amount: '22,400.00',
    customer: 'Chioma Nwosu',
    time: '9:12 AM',
  },
]

const DETAILS = {
  'TRX-992A-4B': {
    id: 'TRX-992A-4B',
    status: 'success',
    statusLabel: 'SUCCESS',
    datetime: 'October 24, 2023 • 14:45:12 (GMT+1)',
    totalLabel: 'Total Amount',
    amount: '45,000.00',
    customer: {
      name: 'Oluwaseun Adepoju',
      email: 'seun.adepoju@example.com',
      phone: '+234 812 345 6789',
      initials: 'OA',
    },
    merchant: {
      name: 'Apex Logistics',
      location: 'Lagos, Nigeria',
      initials: 'AL',
      verifiedLabel: 'Verified Business',
    },
    payment: {
      title: 'Payment & Gateway',
      method: 'Card ****4242',
      gatewayRef: 'FLW-TUS-9918237',
      authCode: '669281',
    },
    actions: {
      flagLabel: 'Flag for Review',
      refundLabel: 'Issue Refund',
    },
  },
  'TRX-881Z-2C': {
    id: 'TRX-881Z-2C',
    status: 'failed',
    statusLabel: 'FAILED',
    datetime: 'October 24, 2023 • 13:30:18 (GMT+1)',
    totalLabel: 'Total Amount',
    amount: '150,500.00',
    customer: {
      name: 'Grace Eze',
      email: 'grace.eze@example.com',
      phone: '+234 803 221 4455',
      initials: 'GE',
    },
    merchant: {
      name: 'Metro Supplies Ltd',
      location: 'Abuja, Nigeria',
      initials: 'MS',
      verifiedLabel: 'Verified Business',
    },
    payment: {
      title: 'Payment & Gateway',
      method: 'Bank XFR',
      gatewayRef: 'FLW-BNK-8827104',
      authCode: '—',
    },
    actions: {
      flagLabel: 'Flag for Review',
      refundLabel: 'Issue Refund',
    },
  },
  'TRX-774Y-9K': {
    id: 'TRX-774Y-9K',
    status: 'pending',
    statusLabel: 'PENDING',
    datetime: 'October 24, 2023 • 10:03:44 (GMT+1)',
    totalLabel: 'Total Amount',
    amount: '1,200.00',
    customer: {
      name: 'Kabiru Musa',
      email: 'kabiru.m@example.com',
      phone: '+234 701 998 2210',
      initials: 'KM',
    },
    merchant: {
      name: 'Corner Shop Yaba',
      location: 'Lagos, Nigeria',
      initials: 'CS',
      verifiedLabel: 'Verified Business',
    },
    payment: {
      title: 'Payment & Gateway',
      method: 'Wallet',
      gatewayRef: 'FLW-WLT-4412098',
      authCode: '442901',
    },
    actions: {
      flagLabel: 'Flag for Review',
      refundLabel: 'Issue Refund',
    },
  },
}

export const ADMIN_TRANSACTION_DETAIL = {
  listTitle: 'Recent Activity',
  viewAllLabel: 'View All',
  viewAllPath: ADMIN_TRANSACTIONS_PATH,
  searchPlaceholder: 'Search orders, customers...',
  activityTabs: [
    { id: 'all', label: 'All' },
    { id: 'success', label: 'Success' },
    { id: 'pending', label: 'Pending' },
  ],
  defaultSelectedId: ADMIN_TRANSACTION_DETAIL_DEFAULT_ID,
  activity: ACTIVITY,
  details: DETAILS,
}

export function getAdminTransactionDetail(transactionId) {
  return (
    ADMIN_TRANSACTION_DETAIL.details[transactionId] ??
    { ...DETAILS['TRX-992A-4B'], id: transactionId }
  )
}

export function getAdminTransactionActivity(transactionId) {
  const inList = ACTIVITY.find((a) => a.id === transactionId)
  if (inList) return ACTIVITY
  return [{ ...ACTIVITY[0], id: transactionId }, ...ACTIVITY.slice(1)]
}
