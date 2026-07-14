/** Flag transaction modal [362:2](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=362-2) */

export const ADMIN_FLAG_TRANSACTION_MODAL = {
  title: 'Flag Transaction for Review',
  reasonLabel: 'Select Reason',
  noteLabel: 'Internal Note',
  notePlaceholder: 'Add context for the review team...',
  reasons: [
    { id: 'fraud', label: 'Fraud suspected' },
    { id: 'duplicate', label: 'Duplicate' },
    { id: 'chargeback', label: 'Chargeback risk' },
    { id: 'unusual', label: 'Unusual amount' },
    { id: 'other', label: 'Other' },
  ],
  defaultReasonId: 'fraud',
  escalate: {
    title: 'Escalate to Finance Team',
    description: 'Require immediate secondary approval.',
    defaultOn: true,
  },
  cancelLabel: 'Cancel',
  confirmLabel: 'Confirm Flag',
}
