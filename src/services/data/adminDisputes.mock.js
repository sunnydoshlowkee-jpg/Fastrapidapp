/** Disputes ledger & detail [362:2968](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=362-2968) */
export const ADMIN_DISPUTES_PATH = '/admin/disputes'

export const ADMIN_DISPUTES = {
  listTitle: 'Active Disputes',
  searchPlaceholder: 'Search commands...',
  defaultSelectedId: 'DSP-102',
  disputes: [
    {
      id: 'DSP-102',
      status: 'escalated',
      statusLabel: 'ESCALATED',
      parties: 'Alex M. vs. RideShare NG',
      amount: '₦45,000',
      openTime: 'OPEN: 4H 12M',
      detail: {
        title: 'Dispute #DSP-102',
        detailStatus: 'action_required',
        detailStatusLabel: 'ACTION REQUIRED',
        initiated: 'INITIATED OCT 24, 2023 • 14:30 GMT',
        amount: '₦45,000',
        userClaim: {
          title: 'USER CLAIM',
          party: 'Alex M. (ID: U-8832)',
          statement:
            'The driver never arrived at my pickup location, but the trip was marked as completed. I was charged the full fare.',
        },
        merchantResponse: {
          title: 'MERCHANT RESPONSE',
          party: 'RideShare NG (ID: M-410)',
          statement:
            'Telemetry logs show the driver was at the pickup coordinates for 8 minutes and attempted contact twice. Trip completion was triggered per policy after wait threshold.',
        },
        logPlaceholder: 'Add investigation notes for internal audit trail...',
        actions: [
          { id: 'info', label: 'Request More Info', icon: 'help', variant: 'muted' },
          { id: 'merchant', label: 'Rule for Merchant', icon: 'gavel', variant: 'merchant' },
          { id: 'refund', label: 'Full Refund to User', icon: 'wallet', variant: 'refund' },
        ],
      },
    },
    {
      id: 'DSP-101',
      status: 'reviewing',
      statusLabel: 'REVIEWING',
      parties: 'Sarah K. vs. QuickMart Lagos',
      amount: '₦12,500',
      openTime: 'OPEN: 1D 2H',
      detail: {
        title: 'Dispute #DSP-101',
        detailStatus: 'reviewing',
        detailStatusLabel: 'REVIEWING',
        initiated: 'INITIATED OCT 23, 2023 • 09:15 GMT',
        amount: '₦12,500',
        userClaim: {
          title: 'USER CLAIM',
          party: 'Sarah K. (ID: U-7721)',
          statement: 'Item received was damaged and not as described in the order.',
        },
        merchantResponse: {
          title: 'MERCHANT RESPONSE',
          party: 'QuickMart Lagos (ID: M-288)',
          statement: 'Replacement was offered within 2 hours of the report. Customer declined pickup.',
        },
        logPlaceholder: 'Add investigation notes for internal audit trail...',
        actions: [
          { id: 'info', label: 'Request More Info', icon: 'help', variant: 'muted' },
          { id: 'merchant', label: 'Rule for Merchant', icon: 'gavel', variant: 'merchant' },
          { id: 'refund', label: 'Full Refund to User', icon: 'wallet', variant: 'refund' },
        ],
      },
    },
    {
      id: 'DSP-099',
      status: 'reviewing',
      statusLabel: 'REVIEWING',
      parties: 'James O. vs. Fresh Bites VI',
      amount: '₦8,200',
      openTime: 'OPEN: 2D 5H',
      detail: {
        title: 'Dispute #DSP-099',
        detailStatus: 'reviewing',
        detailStatusLabel: 'REVIEWING',
        initiated: 'INITIATED OCT 22, 2023 • 16:45 GMT',
        amount: '₦8,200',
        userClaim: {
          title: 'USER CLAIM',
          party: 'James O. (ID: U-6540)',
          statement: 'Order was marked delivered but never received at my address.',
        },
        merchantResponse: {
          title: 'MERCHANT RESPONSE',
          party: 'Fresh Bites VI (ID: M-155)',
          statement: 'Delivery photo and GPS confirmation attached. Rider left package with security.',
        },
        logPlaceholder: 'Add investigation notes for internal audit trail...',
        actions: [
          { id: 'info', label: 'Request More Info', icon: 'help', variant: 'muted' },
          { id: 'merchant', label: 'Rule for Merchant', icon: 'gavel', variant: 'merchant' },
          { id: 'refund', label: 'Full Refund to User', icon: 'wallet', variant: 'refund' },
        ],
      },
    },
  ],
}
