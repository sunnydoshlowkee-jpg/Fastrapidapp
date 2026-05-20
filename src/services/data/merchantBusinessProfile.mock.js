/** Desktop [272:11107](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=272-11107) · Mobile [622:2154](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=622-2154) */
export const MERCHANT_SETTINGS_BUSINESS_PATH = '/merchant/settings/business'

export const MERCHANT_BUSINESS_PROFILE = {
  pageTitle: 'Business Profile',
  businessInfo: {
    name: 'Rapid Artisan Bakery',
    verified: true,
    verifiedLabel: 'Verified',
    description: 'Premium Nigerian-inspired pastries and artisanal breads since 2021.',
    email: 'contact@kaaboartisan.com',
    phone: '+234 802 123 4567',
    location: 'Victoria Island, Lagos',
  },
  storeStatus: {
    title: 'Store Status',
    description: 'Temporarily pause your store to stop receiving new orders.',
    pauseLabel: 'Pause Store',
    paused: false,
  },
  documents: {
    title: 'Document Management',
    description: 'Compliance and legal documentation for your business entity.',
    uploadLabel: 'Upload New',
    items: [
      {
        id: 'cac',
        name: 'CAC Registration Certificate',
        meta: 'Uploaded on Oct 12, 2023 • 2.4 MB',
        status: 'verified',
        iconTone: 'primary',
        icon: 'file',
      },
      {
        id: 'tin',
        name: 'Tax Identification Number (TIN)',
        meta: 'Uploaded on Nov 05, 2023 • 1.1 MB',
        status: 'pending',
        iconTone: 'muted',
        icon: 'id-card',
      },
      {
        id: 'utility',
        name: 'Utility Bill (Proof of Address)',
        meta: 'Image blurry and unreadable',
        status: 'rejected',
        iconTone: 'error',
        icon: 'file',
        reuploadLabel: 'Re-upload',
      },
    ],
  },
  mobile: {
    merchantId: '88291',
    subtitle: 'Manage your store details and verification documents.',
    businessInfo: {
      name: 'Rapid Artisan Bakery',
      logoUrl:
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=160&h=160&fit=crop',
      description:
        'Premium artisan bakery specializing in sourdough and handcrafted pastries. Est. 2021.',
      email: 'contact@kaaboartisan.com',
      phone: '+2348012345678',
      location: 'Victoria Island, Lagos',
    },
    storeStatus: {
      title: 'Store Status',
      description: 'Temporarily pause your store',
      pauseLabel: 'Pause Store',
      paused: false,
    },
    documents: {
      title: 'Document Management',
      items: [
        {
          id: 'cac',
          name: 'CAC Registration Certificate',
          status: 'verified',
        },
        {
          id: 'tin',
          name: 'Tax Identification Number (TIN)',
          status: 'pending',
        },
        {
          id: 'utility',
          name: 'Utility Bill',
          status: 'rejected',
          reuploadLabel: 'Re-upload',
        },
      ],
    },
    location: {
      title: 'Location Details',
      address: '12B Admiralty Way, Lekki Phase 1, Lagos, Nigeria.',
    },
  },
}
