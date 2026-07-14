/** Merchant detail [351:2446](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=351-2446) */
import { ADMIN_MERCHANTS, ADMIN_MERCHANTS_PATH } from './adminMerchants.mock'

export const ADMIN_MERCHANT_DETAIL_DEFAULT_ID = 'MRCH9942A'

export function getAdminMerchantDocumentReviewPath(merchantId) {
  return `${ADMIN_MERCHANTS_PATH}/${merchantId}/documents/review`
}

const DEFAULT_DOCUMENT_REVIEW = {
  pageTitle: 'Document Review',
  sectionTitle: 'Required Documents',
  merchant: {
    name: 'Fresh Foods Market',
    category: 'Retail & Grocery',
    categoryIcon: 'store',
    avatarBg: 'linear-gradient(135deg, #B89A87 0%, #8B6F5A 100%)',
    avatarInitials: 'FF',
  },
  rejectLabel: 'Reject',
  verifyLabel: 'Verify',
  documents: [
    {
      id: 'doc-cac',
      title: 'CAC Certificate',
      description: 'Corporate Affairs Commission registration document.',
      status: 'reviewing',
      statusLabel: 'Reviewing',
      viewLabel: 'View Document',
      pageLabel: 'Page 1 of 1',
      hasViewer: true,
    },
    {
      id: 'doc-tax',
      title: 'Tax ID',
      description: 'Tax Identification Number certificate.',
      status: 'approved',
      statusLabel: 'Approved',
    },
    {
      id: 'doc-address',
      title: 'Proof of Address',
      description: 'Recent utility bill or bank statement.',
      status: 'pending',
      statusLabel: 'Pending',
    },
    {
      id: 'doc-gov-id',
      title: 'Gov ID',
      description: "Director's valid government issued ID.",
      status: 'rejected',
      statusLabel: 'Rejected',
      issue: 'Photo blurry. Please resubmit.',
    },
  ],
}

export function getDefaultMerchantDocumentReview() {
  return DEFAULT_DOCUMENT_REVIEW
}

const MERCHANT_DETAILS = {
  MRCH9942A: {
    id: 'MRCH9942A',
    name: 'Kowope Mart',
    logoStyle: 'kowope',
    logoGlyph: 'KOWOPE',
    logoSubglyph: 'MART',
    verified: true,
    type: 'Retail',
    typeLabel: 'RETAIL',
    typeTone: 'bg-gray-100 text-gray-700',
    status: 'active',
    statusLabel: 'Active',
    suspendLabel: 'Suspend',
    kpis: [
      {
        id: 'orders',
        label: 'Total Orders',
        value: '1,248',
        trend: '+12%',
        trendTone: 'text-emerald-600',
        showTrend: true,
        cornerAccent: 'gray',
      },
      {
        id: 'revenue',
        label: 'Lifetime Revenue',
        value: '₦4.2M',
        valueTone: 'text-violet-600',
        meta: 'YTD',
        metaTone: 'text-gray-400',
      },
      {
        id: 'rating',
        label: 'Avg Rating',
        value: '4.8',
        showStars: true,
        divider: 'violet',
      },
    ],
    tabs: [
      { id: 'info', label: 'Info' },
      { id: 'documents', label: 'Documents' },
      { id: 'orders', label: 'Orders' },
      { id: 'performance', label: 'Performance' },
      { id: 'notes', label: 'Notes' },
    ],
    contact: {
      title: 'Contact Intelligence',
      primaryOwnerLabel: 'Primary Owner',
      primaryOwner: 'Oluwaseun Adebayo',
      roleLabel: 'Role',
      role: 'Managing Director',
      phoneLabel: 'Phone',
      phone: '+234 801 234 5678',
      emailLabel: 'Email',
      email: 'seun@kowopemart.com',
    },
    location: {
      title: 'Location Data',
      registeredAddressLabel: 'Registered Address',
      lines: ['14B Admiralty Way,', 'Lekki Phase 1,', 'Lagos, Nigeria.'],
      viewMapLabel: 'View on Map',
    },
    operatingHours: {
      title: 'Operating Hours',
      rows: [
        { id: 'mon_fri', label: 'Mon - Fri', value: '08:00 - 20:00' },
        { id: 'sat', label: 'Saturday', value: '09:00 - 18:00' },
        { id: 'sun', label: 'Sunday', value: 'Closed', tone: 'text-red-600' },
      ],
    },
    systemMeta: {
      title: 'System Meta',
      onboardingDateLabel: 'Onboarding Date',
      onboardingDate: 'Oct 12, 2023',
      lastSyncLabel: 'Last Sync',
      lastSync: '2 mins ago',
      apiVersionLabel: 'API Version',
      apiVersion: 'v2.4.1',
    },
    documents: {
      title: 'Compliance Documents',
      subtitle: 'KYC and regulatory artefacts submitted by the merchant.',
      defaultSelectedId: 'doc-cac',
      items: [
        {
          id: 'doc-cac',
          title: 'Certificate of Incorporation',
          uploadedBy: 'Oluwaseun Adebayo',
          uploadedAt: 'Oct 12, 2023',
          size: '2.4 MB',
          fileType: 'PDF',
          status: 'in_review',
          statusLabel: 'In Review',
          preview: {
            issuer: 'FEDERAL REPUBLIC OF NIGERIA',
            issuerSub: ['Corporate Affairs', 'Commission'],
            heading: 'Certificate of\nIncorporation',
            paragraphs: [
              'I hereby certify that **KOWOPE MART LIMITED** is this day incorporated under the Companies and Allied Matters Act 2020 and that the company is limited by Shares.',
              'Given under my hand at Abuja this **12th** day of **October**, **2023**.',
            ],
            signature: 'Registrar General',
          },
        },
        {
          id: 'doc-tin',
          title: 'Tax Identification Number',
          uploadedBy: 'Oluwaseun Adebayo',
          uploadedAt: 'Oct 14, 2023',
          size: '0.8 MB',
          fileType: 'PDF',
          status: 'verified',
          statusLabel: 'Verified',
          preview: {
            issuer: 'FEDERAL INLAND REVENUE SERVICE',
            issuerSub: ['Tax Identification', 'Number Certificate'],
            heading: 'TIN Certificate',
            paragraphs: [
              'This is to certify that **KOWOPE MART LIMITED** has been registered with the Federal Inland Revenue Service.',
              'TIN: **20384756-0001** issued on **15th October, 2023**.',
            ],
            signature: 'Chairman, FIRS',
          },
        },
        {
          id: 'doc-utility',
          title: 'Utility Bill',
          uploadedBy: 'Oluwaseun Adebayo',
          uploadedAt: 'Oct 20, 2023',
          size: '1.1 MB',
          fileType: 'PDF',
          status: 'verified',
          statusLabel: 'Verified',
          preview: {
            issuer: 'IKEJA ELECTRIC PLC',
            issuerSub: ['Monthly Statement', 'October 2023'],
            heading: 'Customer\nStatement',
            paragraphs: [
              'Customer: **KOWOPE MART LIMITED**',
              'Service Address: **14B Admiralty Way, Lekki Phase 1, Lagos.**',
              'Statement period: **01 Oct - 31 Oct, 2023**.',
            ],
            signature: 'Authorised Officer',
          },
        },
        {
          id: 'doc-bvn',
          title: "Director's BVN",
          uploadedBy: 'Oluwaseun Adebayo',
          uploadedAt: 'Oct 12, 2023',
          size: '0.3 MB',
          fileType: 'PDF',
          status: 'rejected',
          statusLabel: 'Rejected',
          preview: {
            issuer: 'NIBSS',
            issuerSub: ['Bank Verification', 'Number Slip'],
            heading: 'BVN Slip',
            paragraphs: [
              'Holder: **Oluwaseun Adebayo**',
              'BVN: **************2231**',
              'Image quality insufficient. Please re-upload a clearer scan.',
            ],
            signature: 'NIBSS',
          },
        },
        {
          id: 'doc-bank',
          title: 'Bank Statement (90 days)',
          uploadedBy: 'Oluwaseun Adebayo',
          uploadedAt: 'Oct 22, 2023',
          size: '3.7 MB',
          fileType: 'PDF',
          status: 'pending',
          statusLabel: 'Awaiting Upload',
          preview: {
            issuer: '—',
            issuerSub: ['Document not yet', 'uploaded'],
            heading: 'Awaiting upload',
            paragraphs: [
              'The merchant has not yet uploaded this document. A reminder has been sent on **24 Oct, 2023**.',
            ],
            signature: '—',
          },
        },
      ],
    },
  },
}

function buildFallbackDetail(listMerchant) {
  return {
    id: listMerchant.id,
    name: listMerchant.name,
    logoTone: listMerchant.logoTone,
    logoGlyph: listMerchant.logoGlyph,
    verified: listMerchant.status === 'active',
    type: listMerchant.type,
    typeLabel: listMerchant.type.toUpperCase(),
    typeTone: listMerchant.typeTone,
    status: listMerchant.status,
    statusLabel: listMerchant.statusLabel,
    suspendLabel: listMerchant.status === 'suspended' ? 'Reinstate' : 'Suspend',
    kpis: [
      {
        id: 'orders',
        label: 'Total Orders',
        value: listMerchant.orders ?? '--',
      },
      {
        id: 'revenue',
        label: 'Lifetime Revenue',
        value: listMerchant.gmv ?? '₦0.00',
        valueTone: 'text-violet-600',
      },
      {
        id: 'rating',
        label: 'Avg Rating',
        value: '—',
        showStars: true,
        divider: 'violet',
      },
    ],
    tabs: [
      { id: 'info', label: 'Info' },
      { id: 'documents', label: 'Documents' },
      { id: 'orders', label: 'Orders' },
      { id: 'performance', label: 'Performance' },
      { id: 'notes', label: 'Notes' },
    ],
    contact: {
      title: 'Contact Intelligence',
      primaryOwnerLabel: 'Primary Owner',
      primaryOwner: '—',
      roleLabel: 'Role',
      role: '—',
      phoneLabel: 'Phone',
      phone: '—',
      emailLabel: 'Email',
      email: '—',
    },
    location: {
      title: 'Location Data',
      registeredAddressLabel: 'Registered Address',
      lines: [listMerchant.location],
      viewMapLabel: 'View on Map',
    },
    operatingHours: {
      title: 'Operating Hours',
      rows: [{ id: 'unknown', label: 'Hours', value: 'Not provided' }],
    },
    systemMeta: {
      title: 'System Meta',
      onboardingDateLabel: 'Onboarding Date',
      onboardingDate: listMerchant.joined,
      lastSyncLabel: 'Last Sync',
      lastSync: '—',
      apiVersionLabel: 'API Version',
      apiVersion: 'v2.4.1',
    },
    documents: {
      title: 'Compliance Documents',
      subtitle: 'KYC and regulatory artefacts submitted by the merchant.',
      defaultSelectedId: null,
      items: [],
    },
  }
}

function buildDocumentReviewForMerchant(detail) {
  return {
    ...DEFAULT_DOCUMENT_REVIEW,
    merchant: {
      ...DEFAULT_DOCUMENT_REVIEW.merchant,
      name: detail.name ?? DEFAULT_DOCUMENT_REVIEW.merchant.name,
      avatarInitials:
        detail.name
          ?.split(' ')
          .map((s) => s[0])
          .slice(0, 2)
          .join('') ?? DEFAULT_DOCUMENT_REVIEW.merchant.avatarInitials,
    },
  }
}

export function getAdminMerchantDetail(merchantId) {
  if (merchantId && MERCHANT_DETAILS[merchantId]) {
    const base = MERCHANT_DETAILS[merchantId]
    return {
      ...base,
      documentReview: buildDocumentReviewForMerchant(base),
      breadcrumbs: [
        { label: 'Merchants', path: ADMIN_MERCHANTS_PATH },
        { label: base.name },
      ],
    }
  }

  const listMerchant =
    ADMIN_MERCHANTS.merchants.find((m) => m.id === merchantId) ??
    ADMIN_MERCHANTS.merchants[0]

  const base = buildFallbackDetail(listMerchant)
  return {
    ...base,
    documentReview: buildDocumentReviewForMerchant(base),
    breadcrumbs: [
      { label: 'Merchants', path: ADMIN_MERCHANTS_PATH },
      { label: listMerchant.name },
    ],
  }
}
