/** Static UI copy for admin user detail (data comes from API). */
export const ADMIN_USER_DETAIL_UI = {
  tabs: [
    { id: 'orders', label: 'Order History' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'notes', label: 'Notes' },
  ],
  orderHistory: {
    columns: [
      { id: 'orderId', label: 'Order ID' },
      { id: 'date', label: 'Date' },
      { id: 'destination', label: 'Destination' },
      { id: 'amount', label: 'Amount' },
      { id: 'status', label: 'Status' },
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
  },
  notes: {
    title: 'Internal Notes',
    placeholder: 'Add a secure internal note...',
    submitLabel: 'Add Note',
  },
  suspendModal: {
    title: 'Suspend User',
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
    warning:
      'This action is irreversible. The user will be permanently removed and all active sessions will be terminated immediately.',
    evidenceLabel: 'Evidence / Internal Notes',
    evidencePlaceholder: 'Require detailed explanation for audit logs...',
    confirmLabel: 'Type BAN to confirm',
    confirmPlaceholder: 'BAN',
    confirmWord: 'BAN',
    cancelLabel: 'Cancel',
    submitLabel: 'Execute Ban',
  },
}
