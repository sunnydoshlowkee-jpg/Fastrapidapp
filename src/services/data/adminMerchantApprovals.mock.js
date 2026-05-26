/** Mobile Merchant Approvals [297:18037](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=297-18037) */

export const ADMIN_MERCHANT_APPROVALS_PATH = '/admin/merchant-approvals'

export const ADMIN_MERCHANT_APPROVALS = {
  brand: 'Kàlàbọ Admin',
  pageTitle: 'Merchant Approvals',
  subtitle: 'Review and manage incoming merchant applications.',
  filters: [
    { id: 'pending', label: 'Pending' },
    { id: 'all', label: 'All' },
    { id: 'approved', label: 'Approved' },
    { id: 'rejected', label: 'Rejected' },
  ],
  defaultFilterId: 'pending',
  defaultSheetMerchantId: 'mch-mama-cass',
  merchants: [
    {
      id: 'mch-mama-cass',
      name: 'Mama Cass Kitchen',
      location: 'Ikeja, Lagos',
      status: 'pending',
      statusLabel: 'Pending Review',
      logoKind: 'image',
      logoTone: 'restaurant',
    },
    {
      id: 'mch-mile-12',
      name: 'Mile 12 Fresh',
      location: 'Ketu, Lagos',
      status: 'pending',
      statusLabel: 'Pending Review',
      logoKind: 'image',
      logoTone: 'grocery',
    },
    {
      id: 'mch-suya-spot',
      name: 'Suya Spot VI',
      location: 'Victoria Island',
      status: 'pending',
      statusLabel: 'Pending Review',
      logoKind: 'initial',
      logoText: 'S',
      logoBg: '#BE7BFF',
      logoTextColor: '#4C0084',
    },
    {
      id: 'mch-healthplus',
      name: 'HealthPlus Lekki',
      location: 'Lekki Phase 1',
      status: 'pending',
      statusLabel: 'Pending Review',
      logoKind: 'image',
      logoTone: 'pharmacy',
    },
  ],
  bottomNav: [
    { id: 'overview', label: 'Overview', icon: 'home', path: '/admin' },
    { id: 'users', label: 'Users', icon: 'users', path: '/admin/users' },
    {
      id: 'merchants',
      label: 'Merchants',
      icon: 'store',
      path: '/admin/merchant-approvals',
      active: true,
    },
    { id: 'riders', label: 'Riders', icon: 'truck', path: '/admin/riders' },
  ],
  sheet: {
    subtitle: 'Application Details',
    closeLabel: 'Close',
    ownerLabel: 'Owner',
    phoneLabel: 'Phone',
    addressLabel: 'Address',
    documentsTitle: 'Verification Documents',
    viewDocLabel: 'View Doc',
    approveLabel: 'Approve Merchant',
    rejectLabel: 'Reject Application',
  },
  applications: {
    'mch-mama-cass': {
      owner: 'Oluwaseun Adebayo',
      phone: '+234 803 123 4567',
      address: '12 Allen Avenue, Ikeja, Lagos',
      documents: [
        {
          id: 'doc-cac',
          label: 'Corporate Affairs Commission (CAC)',
          previewKind: 'cac',
        },
        {
          id: 'doc-id',
          label: 'Valid Government ID',
          previewKind: 'gov-id',
        },
      ],
    },
    'mch-mile-12': {
      owner: 'Chinedu Okafor',
      phone: '+234 805 998 1245',
      address: 'Mile 12 Market, Ketu, Lagos',
      documents: [
        {
          id: 'doc-cac',
          label: 'Corporate Affairs Commission (CAC)',
          previewKind: 'cac',
        },
        {
          id: 'doc-id',
          label: 'Valid Government ID',
          previewKind: 'gov-id',
        },
      ],
    },
    'mch-suya-spot': {
      owner: 'Aisha Bello',
      phone: '+234 802 446 7700',
      address: '7 Adetokunbo Ademola, Victoria Island',
      documents: [
        {
          id: 'doc-cac',
          label: 'Corporate Affairs Commission (CAC)',
          previewKind: 'cac',
        },
        {
          id: 'doc-id',
          label: 'Valid Government ID',
          previewKind: 'gov-id',
        },
      ],
    },
    'mch-healthplus': {
      owner: 'Dr. Tunde Adeniyi',
      phone: '+234 808 332 5544',
      address: 'Admiralty Way, Lekki Phase 1',
      documents: [
        {
          id: 'doc-cac',
          label: 'Corporate Affairs Commission (CAC)',
          previewKind: 'cac',
        },
        {
          id: 'doc-id',
          label: 'Valid Government ID',
          previewKind: 'gov-id',
        },
      ],
    },
  },
}
