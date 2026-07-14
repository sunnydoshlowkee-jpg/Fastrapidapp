/** Static UI copy for admin merchant detail (data comes from API). */
export const ADMIN_MERCHANT_DETAIL_UI = {
  contact: {
    title: 'Contact Intelligence',
    primaryOwnerLabel: 'Primary Owner',
    roleLabel: 'Role',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
  },
  location: {
    title: 'Location Data',
    registeredAddressLabel: 'Registered Address',
    viewMapLabel: 'View on Map',
  },
  operatingHours: {
    title: 'Operating Hours',
  },
  systemMeta: {
    title: 'System Meta',
    onboardingDateLabel: 'Onboarding Date',
    lastSyncLabel: 'Last Updated',
    apiVersionLabel: 'API Version',
  },
  documents: {
    title: 'Compliance Documents',
    subtitle: 'KYC and regulatory artefacts submitted by the merchant.',
    statusConfirm: {
      verify: {
        title: 'Mark document verified',
        description:
          'This will record the document as verified in the merchant compliance file.',
        cancelLabel: 'Cancel',
        confirmLabel: 'Mark Verified',
      },
      flag: {
        title: 'Flag document issue',
        description:
          'This will mark the document as rejected so the merchant can address it and re-upload if needed.',
        cancelLabel: 'Cancel',
        confirmLabel: 'Flag Issue',
      },
    },
  },
  tabs: [
    { id: 'info', label: 'Info' },
    { id: 'documents', label: 'Documents' },
    { id: 'orders', label: 'Orders' },
    { id: 'performance', label: 'Performance' },
    { id: 'notes', label: 'Notes' },
  ],
  kpis: {
    orders: { label: 'Total Orders', showTrend: false },
    revenue: { label: 'Lifetime Revenue', valueTone: 'text-violet-600', meta: 'All time' },
    rating: { label: 'Avg Rating', showStars: false },
  },
  documentReview: {
    pageTitle: 'Document Review',
    sectionTitle: 'Required Documents',
    rejectLabel: 'Reject',
    verifyLabel: 'Verify',
  },
}
