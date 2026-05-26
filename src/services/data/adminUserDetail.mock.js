/** User detail [411:2752](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=411-2752) */
import { ADMIN_USERS, ADMIN_USERS_PATH } from './adminUsers.mock'

export const ADMIN_USER_DETAIL_DEFAULT_ID = 'OPR-8829-X'

const COMMON_TABS = [
  { id: 'orders', label: 'Order History' },
  { id: 'transactions', label: 'Transactions' },
  { id: 'notes', label: 'Notes', count: 2 },
]

const USER_DETAILS = {
  'OPR-8829-X': {
    id: 'OPR-8829-X',
    name: 'Sarah Jenkins',
    avatarTone: 'bg-rose-100 text-rose-700',
    avatarGlyph: 'SJ',
    verified: true,
    verifiedLabel: 'Verified',
    email: 's.jenkins@example.com',
    phone: '+234 801 234 5678',
    joined: 'Oct 12, 2023',
    suspendLabel: 'Suspend',
    banLabel: 'Ban User',
    kpis: [
      {
        id: 'orders',
        label: 'Total Orders',
        value: '1,204',
        icon: 'truck',
      },
      {
        id: 'spent',
        label: 'Total Spent',
        value: '₦4.2M',
        icon: 'bank',
      },
      {
        id: 'wallet',
        label: 'Wallet Balance',
        value: '₦124,500',
        icon: 'external',
        tone: 'violet',
      },
    ],
    tabs: COMMON_TABS,
    orderHistory: {
      columns: [
        { id: 'orderId', label: 'Order ID' },
        { id: 'date', label: 'Date' },
        { id: 'destination', label: 'Destination' },
        { id: 'amount', label: 'Amount' },
        { id: 'status', label: 'Status' },
      ],
      rows: [
        {
          id: 'ORD-001',
          dateDay: 'Oct 24',
          dateTime: '14:30',
          destination: 'Lagos Island Hub',
          amount: '₦4,500',
          status: 'delivered',
          statusLabel: 'Delivered',
        },
        {
          id: 'ORD-002',
          dateDay: 'Oct 23',
          dateTime: '09:15',
          destination: 'Ikeja City Mall',
          amount: '₦12,200',
          status: 'canceled',
          statusLabel: 'Canceled',
        },
        {
          id: 'ORD-003',
          dateDay: 'Oct 21',
          dateTime: '16:45',
          destination: 'Victoria Island',
          amount: '₦8,900',
          status: 'delivered',
          statusLabel: 'Delivered',
        },
      ],
      viewAllLabel: 'View All Orders',
    },
    transactions: {
      columns: [
        { id: 'txnId', label: 'Txn ID' },
        { id: 'date', label: 'Date' },
        { id: 'channel', label: 'Channel' },
        { id: 'amount', label: 'Amount' },
        { id: 'status', label: 'Status' },
      ],
      rows: [
        {
          id: 'TXN-49021',
          dateDay: 'Oct 24',
          dateTime: '14:31',
          channel: 'Wallet Top-up · Card',
          amount: '+₦50,000',
          amountTone: 'text-emerald-600',
          status: 'delivered',
          statusLabel: 'Success',
        },
        {
          id: 'TXN-48910',
          dateDay: 'Oct 23',
          dateTime: '09:18',
          channel: 'Order Payment',
          amount: '-₦12,200',
          amountTone: 'text-gray-900',
          status: 'canceled',
          statusLabel: 'Refunded',
        },
        {
          id: 'TXN-48720',
          dateDay: 'Oct 21',
          dateTime: '16:49',
          channel: 'Order Payment',
          amount: '-₦8,900',
          amountTone: 'text-gray-900',
          status: 'delivered',
          statusLabel: 'Success',
        },
      ],
    },
    notes: {
      title: 'Internal Notes',
      placeholder: 'Add a secure internal note...',
      submitLabel: 'Add Note',
      items: [
        {
          id: 'note-1',
          author: 'Tunde A. · Support',
          createdAt: 'Oct 22, 11:04',
          body: 'Customer reported a duplicate charge — refund of ₦12,200 processed via TXN-48910.',
        },
        {
          id: 'note-2',
          author: 'Amaka O. · Risk',
          createdAt: 'Oct 18, 09:32',
          body: 'KYC re-checked after device fingerprint mismatch — verified clean.',
        },
      ],
    },
    suspendModal: {
      title: 'Suspend Operator',
      targetLabel: 'Target: OPR-8829-X • ID: 99482',
      infractionLabel: 'Infraction Type',
      infractions: [
        { id: 'policy', label: 'Policy Violation' },
        { id: 'fraud', label: 'Fraud Alert' },
        { id: 'harassment', label: 'Harassment' },
        { id: 'abuse', label: 'System Abuse' },
      ],
      defaultInfractionId: 'fraud',
      durationLabel: 'Suspension Duration',
      durations: [
        { id: '24h', label: '24 Hours (Review Period)' },
        { id: '7d', label: '7 Days' },
        { id: '30d', label: '30 Days' },
        { id: 'indefinite', label: 'Indefinite' },
      ],
      defaultDurationId: '24h',
      notifyLabel: 'Notify Operator',
      notifyDescription: 'Send automated suspension notice via email.',
      cancelLabel: 'Cancel',
      submitLabel: 'Confirm Suspend',
    },
    banModal: {
      title: 'Permanent Ban',
      targetLabel: 'Target: OPR-8829-X • ID: 99482',
      warning:
        'This action is irreversible. The operator will be permanently removed from the system and all active sessions will be terminated immediately.',
      evidenceLabel: 'Evidence / Internal Notes',
      evidencePlaceholder: 'Require detailed explanation for audit logs...',
      confirmLabel: 'Type BAN to confirm',
      confirmPlaceholder: 'BAN',
      confirmWord: 'BAN',
      cancelLabel: 'Cancel',
      submitLabel: 'Execute Ban',
    },
  },
  'USR-MOB-OA': {
    id: 'USR-MOB-OA',
    name: 'Oluwaseun Adebayo',
    avatarTone: 'bg-gradient-to-br from-[#3A6A8D] to-[#1F3A4D] text-white',
    avatarGlyph: 'OA',
    avatarKind: 'photo',
    avatarBg: 'linear-gradient(135deg, #3A6A8D 0%, #1F3A4D 100%)',
    verified: true,
    verifiedLabel: 'Active',
    email: 'seun.adebayo@example.com',
    phone: '+234 801 234 5678',
    joined: 'Oct 12, 2023',
    suspendLabel: 'Suspend',
    banLabel: 'Ban User',
    kpis: [
      { id: 'orders', label: 'Total Orders', value: '42', icon: 'truck' },
      { id: 'spent', label: 'Total Spent', value: '₦128,900', icon: 'bank' },
      {
        id: 'wallet',
        label: 'Wallet Balance',
        value: '₦15,450',
        icon: 'external',
        tone: 'violet',
      },
    ],
    tabs: COMMON_TABS,
    orderHistory: {
      columns: [
        { id: 'orderId', label: 'Order ID' },
        { id: 'date', label: 'Date' },
        { id: 'destination', label: 'Destination' },
        { id: 'amount', label: 'Amount' },
        { id: 'status', label: 'Status' },
      ],
      rows: [
        {
          id: 'ORD-8921',
          dateDay: 'Today',
          dateTime: '2:45 PM',
          destination: 'Chicken Republic - Yaba',
          amount: '₦4,500',
          status: 'delivered',
          statusLabel: 'Delivered',
        },
        {
          id: 'ORD-8890',
          dateDay: 'Yesterday',
          dateTime: '6:30 PM',
          destination: 'Cold Stone Creamery',
          amount: '₦8,200',
          status: 'delivered',
          statusLabel: 'Delivered',
        },
        {
          id: 'ORD-8805',
          dateDay: 'Oct 24',
          dateTime: '1:15 PM',
          destination: 'Mama Cass - Ikeja',
          amount: '₦3,100',
          status: 'canceled',
          statusLabel: 'Cancelled',
        },
      ],
      viewAllLabel: 'View All Orders',
    },
    transactions: {
      columns: [
        { id: 'txnId', label: 'Txn ID' },
        { id: 'date', label: 'Date' },
        { id: 'channel', label: 'Channel' },
        { id: 'amount', label: 'Amount' },
        { id: 'status', label: 'Status' },
      ],
      rows: [],
    },
    notes: {
      title: 'Internal Notes',
      placeholder: 'Add a secure internal note...',
      submitLabel: 'Add Note',
      items: [],
    },
    suspendModal: {
      title: 'Suspend User',
      targetLabel: 'Target: USR-MOB-OA',
      infractionLabel: 'Infraction Type',
      infractions: [
        { id: 'policy', label: 'Policy Violation' },
        { id: 'fraud', label: 'Fraud Alert' },
        { id: 'harassment', label: 'Harassment' },
        { id: 'abuse', label: 'System Abuse' },
      ],
      defaultInfractionId: 'policy',
      durationLabel: 'Suspension Duration',
      durations: [
        { id: '24h', label: '24 Hours (Review Period)' },
        { id: '7d', label: '7 Days' },
        { id: '30d', label: '30 Days' },
        { id: 'indefinite', label: 'Indefinite' },
      ],
      defaultDurationId: '24h',
      notifyLabel: 'Notify User',
      notifyDescription: 'Send automated suspension notice via email.',
      cancelLabel: 'Cancel',
      submitLabel: 'Confirm Suspend',
    },
    banModal: {
      title: 'Permanent Ban',
      targetLabel: 'Target: USR-MOB-OA',
      warning:
        'This action is irreversible. The user will be permanently removed and all active sessions terminated immediately.',
      evidenceLabel: 'Evidence / Internal Notes',
      evidencePlaceholder: 'Require detailed explanation for audit logs...',
      confirmLabel: 'Type BAN to confirm',
      confirmPlaceholder: 'BAN',
      confirmWord: 'BAN',
      cancelLabel: 'Cancel',
      submitLabel: 'Execute Ban',
    },
  },
}

function buildFallbackDetail(listUser) {
  return {
    id: listUser.id,
    name: listUser.name,
    avatarTone: listUser.avatarTone,
    avatarGlyph: listUser.avatarGlyph,
    verified: listUser.status === 'active',
    verifiedLabel: listUser.status === 'active' ? 'Verified' : 'Unverified',
    email: listUser.email,
    phone: listUser.phone,
    joined: listUser.joined,
    suspendLabel: listUser.status === 'suspended' ? 'Reinstate' : 'Suspend',
    banLabel: 'Ban User',
    kpis: [
      { id: 'orders', label: 'Total Orders', value: listUser.orders, icon: 'truck' },
      { id: 'spent', label: 'Total Spent', value: listUser.wallet, icon: 'bank' },
      {
        id: 'wallet',
        label: 'Wallet Balance',
        value: listUser.wallet,
        icon: 'external',
        tone: 'violet',
      },
    ],
    tabs: COMMON_TABS.map((t) => (t.id === 'notes' ? { ...t, count: 0 } : t)),
    orderHistory: {
      columns: USER_DETAILS['OPR-8829-X'].orderHistory.columns,
      rows: [],
      viewAllLabel: 'View All Orders',
    },
    transactions: {
      columns: USER_DETAILS['OPR-8829-X'].transactions.columns,
      rows: [],
    },
    notes: {
      title: 'Internal Notes',
      placeholder: 'Add a secure internal note...',
      submitLabel: 'Add Note',
      items: [],
    },
    suspendModal: {
      ...USER_DETAILS['OPR-8829-X'].suspendModal,
      targetLabel: `Target: ${listUser.id}`,
    },
    banModal: {
      ...USER_DETAILS['OPR-8829-X'].banModal,
      targetLabel: `Target: ${listUser.id}`,
    },
  }
}

export function getAdminUserDetail(userId) {
  if (userId && USER_DETAILS[userId]) {
    return {
      ...USER_DETAILS[userId],
      breadcrumbs: [
        { label: 'Users', path: ADMIN_USERS_PATH },
        { label: USER_DETAILS[userId].name },
      ],
    }
  }

  const listUser =
    ADMIN_USERS.users.find((u) => u.id === userId) ?? ADMIN_USERS.users[0]

  return {
    ...buildFallbackDetail(listUser),
    breadcrumbs: [
      { label: 'Users', path: ADMIN_USERS_PATH },
      { label: listUser.name },
    ],
  }
}
