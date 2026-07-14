/**
 * Disputes ledger & detail [362:2968](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=362-2968)
 * Mobile disputes list [297:20695](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=297-20695)
 */
export const ADMIN_DISPUTES_PATH = '/admin/disputes'

export const ADMIN_DISPUTES = {
  listTitle: 'Active Disputes',
  searchPlaceholder: 'Search commands...',
  mobileTitle: 'Rapid Admin',
  mobilePageTitle: 'Disputes',
  totalLabel: '41 Total',
  defaultMobileFilter: 'open',
  mobileFilters: [
    { id: 'open', label: 'Open' },
    { id: 'under_review', label: 'Under Review' },
    { id: 'escalated', label: 'Escalated' },
    { id: 'resolved', label: 'Resolved' },
  ],
  amountLabel: 'Disputed Amount',
  defaultSelectedId: 'DSP-102',
  disputes: [
    {
      id: 'DSP-102',
      mobileId: 'KBO-9821-A',
      mobileDetailId: 'DSP-8924A',
      status: 'escalated',
      statusLabel: 'ESCALATED',
      parties: 'Sarah Jenkins vs. Lagos Central Logistics',
      reason: 'Package reported damaged on arrival',
      amount: '₦45,000',
      mobileAmount: '₦ 145,000.00',
      detailMobileAmount: '₦145.00',
      orderReference: { label: 'ORD-9921', href: '/admin/orders/ORD-9921' },
      mobileStatusBadge: { label: 'OPEN', tone: 'gray' },
      urgency: { tone: 'critical', label: '>72h', icon: 'clock' },
      mobileGroup: 'open',
      openTime: 'OPEN: 4H 12M',
      detail: {
        title: 'Dispute #DSP-102',
        detailStatus: 'action_required',
        detailStatusLabel: 'ACTION REQUIRED',
        initiated: 'INITIATED OCT 24, 2023 • 14:30 GMT',
        amount: '₦45,000',
        userClaim: {
          title: 'USER CLAIM',
          mobileTitle: "User's Claim",
          party: 'Sarah J. (ID: U-8832)',
          statement:
            "I ordered the premium cleaning service, but the cleaner arrived 2 hours late and didn't finish the job. I expect a full refund for this terrible experience.",
          submittedBy: 'Submitted by Sarah J.',
          submittedAt: 'Oct 24, 2:15 PM',
        },
        merchantResponse: {
          title: 'MERCHANT RESPONSE',
          mobileTitle: "Merchant's Response",
          party: 'Lagos Central Logistics (ID: M-410)',
          statement:
            'We apologize for the delay, which was due to severe traffic. However, our cleaner completed all tasks requested in the premium package. We can offer a partial refund of 20% for the delay.',
          attachment: { label: 'proof_photos.zip', icon: 'paperclip' },
          trackRecord: {
            title: 'Merchant Track Record',
            subtitle: '2% dispute rate (Last 30 days)',
          },
        },
        logPlaceholder: 'Add investigation notes for internal audit trail...',
        internalNoteLabel: 'Admin Internal Note',
        internalNotePlaceholder: 'Add private notes regarding investigation...',
        actions: [
          { id: 'info', label: 'Request More Info', icon: 'help', variant: 'muted' },
          { id: 'merchant', label: 'Rule for Merchant', icon: 'gavel', variant: 'merchant' },
          { id: 'refund', label: 'Full Refund to User', icon: 'wallet', variant: 'refund' },
        ],
        mobileActions: [
          {
            id: 'refund',
            label: 'Issue Full Refund to User',
            variant: 'refund',
            icon: 'bank',
          },
          {
            id: 'merchant',
            label: 'Rule in Merchant Favor',
            variant: 'merchant',
            icon: 'gavel',
          },
          {
            id: 'info',
            label: 'Request More Information',
            variant: 'text',
          },
        ],
      },
    },
    {
      id: 'DSP-101',
      mobileId: 'KBO-9844-C',
      status: 'reviewing',
      statusLabel: 'REVIEWING',
      parties: 'Michael O. vs. Rapid Dispatch',
      reason: 'Courier no-show',
      amount: '₦12,500',
      mobileAmount: '₦ 12,500.00',
      urgency: { tone: 'warning', label: '>48h', icon: 'alertTriangle' },
      mobileGroup: 'open',
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
      mobileId: 'KBO-9890-B',
      status: 'reviewing',
      statusLabel: 'REVIEWING',
      parties: 'Tech Hub Intl vs. City Express Ltd',
      reason: 'Incorrect delivery fee charged',
      amount: '₦8,200',
      mobileAmount: '₦ 4,200.00',
      urgency: { tone: 'neutral', label: '12h ago', icon: null },
      mobileGroup: 'open',
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

export function getAdminDisputeById(disputeId) {
  if (!disputeId) return ADMIN_DISPUTES.disputes[0]
  return (
    ADMIN_DISPUTES.disputes.find((d) => d.id === disputeId) ??
    ADMIN_DISPUTES.disputes[0]
  )
}
