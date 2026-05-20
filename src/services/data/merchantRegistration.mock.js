/** Desktop [272:8371](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=272-8371) · Mobile [622:6632](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=622-6632) */
export const MERCHANT_REGISTRATION_PATH = '/merchant/signup'

export { MERCHANT_EMAIL_VERIFY_PATH } from './merchantEmailVerification.mock'
export { MERCHANT_VERIFICATION_DOCUMENTS_PATH } from './merchantVerificationDocuments.mock'
export { MERCHANT_PENDING_APPROVAL_PATH } from './merchantPendingApproval.mock'
export { MERCHANT_ONBOARDING_LOCATION_HOURS_PATH } from './merchantOnboardingLocationHours.mock'
export { MERCHANT_ONBOARDING_BANK_DETAILS_PATH } from './merchantOnboardingBankDetails.mock'

export const MERCHANT_REGISTRATION = {
  brandSubtitle: 'Merchant Onboarding',
  steps: [
    { id: 1, label: 'Business Profile', status: 'active' },
    { id: 2, label: 'Verify Documents', status: 'upcoming' },
    { id: 3, label: 'Location & Hours', status: 'upcoming' },
    { id: 4, label: 'Payout details', status: 'upcoming' },
  ],
  help: {
    title: 'Need help?',
    body: 'Our partner success team is available 24/7 to guide you through your application.',
    linkLabel: 'Chat with Support',
  },
  form: {
    title: 'Tell us about',
    titleHighlight: 'your business.',
    saveDraftLabel: 'Save Draft',
    continueLabel: 'Continue',
    sections: {
      business: {
        title: 'Business Information',
        icon: 'store',
      },
      representative: {
        title: 'Representative Information',
        icon: 'user',
      },
      security: {
        title: 'Account Security',
        icon: 'lock',
      },
    },
    logo: {
      label: 'Store Logo',
      description: 'Upload a high-resolution logo for your merchant storefront. Min 500x500px.',
      actionLabel: 'Choose File',
    },
    fields: {
      legalName: {
        label: 'Legal Business Name',
        placeholder: 'e.g. Blue Ribbon Artisan Bakery',
      },
      businessType: {
        label: 'Business Type',
        options: ['Restaurant', 'Retail', 'Grocery', 'Pharmacy', 'Other'],
        defaultValue: 'Restaurant',
      },
      businessEmail: {
        label: 'Business Email',
        placeholder: 'orders@business.com',
      },
      phone: {
        label: 'Phone Number',
        placeholder: '+1(555) 000-0000',
      },
      address: {
        label: 'Registered Address',
        placeholder: 'Street, Building No, Suite',
      },
      description: {
        label: 'Store Description',
        placeholder: 'Briefly describe what you sell...',
      },
      repName: {
        label: 'Full Legal Name',
        placeholder: 'Jane Doe',
      },
      repRole: {
        label: 'Role / Title',
        placeholder: 'Owner, Manager, etc.',
      },
      repPhone: {
        label: 'Representative Phone',
        placeholder: '+1(555) 000-0000',
      },
      password: {
        label: 'Create Password',
        placeholder: '••••••••',
      },
      confirmPassword: {
        label: 'Confirm Password',
        placeholder: '••••••••',
      },
    },
  },
  panel: {
    title: "Scale your reach with Rapid's network.",
    description:
      'Merchants who complete their profile fully see 40% higher customer trust scores in their first month on the platform.',
    highlights: ['Integrated logistics', 'Real-time analytics'],
    imageUrl:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=1200&fit=crop&crop=faces',
  },
  mobile: {
    stepLabel: 'Step 1: Setting up your basic store profile.',
    form: {
      title: 'Tell us about',
      titleHighlight: 'your business.',
      saveDraftLabel: 'Save Draft',
      continueLabel: 'Continue',
      sections: {
        business: { title: 'Business Information', icon: 'store' },
        representative: { title: 'Representative Information', icon: 'user' },
        security: { title: 'Account Security', icon: 'lock' },
      },
      logo: {
        label: 'Store Logo',
        description: 'Upload a high-resolution logo for your merchant storefront. Min 500x500px.',
        actionLabel: 'Choose File',
      },
      fields: {
        legalName: {
          label: 'Legal Business Name',
          placeholder: 'e.g. Blue Ribbon Artisan Bakery',
        },
        businessType: {
          label: 'Business Type',
          placeholder: 'Select Type',
          options: ['Restaurant', 'Retail', 'Grocery', 'Pharmacy', 'Other'],
        },
        businessEmail: {
          label: 'Business Email',
          placeholder: 'orders@business.com',
        },
        phone: {
          label: 'Phone Number',
          placeholder: '+1(555) 000-0000',
        },
        addressStreet: {
          label: 'Registered Address',
          placeholder: 'Street, Building No., Suite',
        },
        addressCity: {
          label: 'City',
          placeholder: 'City',
        },
        addressZip: {
          label: 'ZIP Code',
          placeholder: 'ZIP Code',
        },
        description: {
          label: 'Store Description',
          placeholder: 'Briefly describe what you sell..',
        },
        repName: {
          label: 'Full Legal Name',
          placeholder: 'Jane Doe',
        },
        repRole: {
          label: 'Role/Title',
          placeholder: 'Owner, Manager, etc.',
        },
        repPhone: {
          label: 'Representative Phone',
          placeholder: '+1(555) 000-0000',
        },
        password: {
          label: 'Create Password',
          placeholder: '••••••••',
        },
        confirmPassword: {
          label: 'Confirm Password',
          placeholder: '••••••••',
        },
      },
    },
    promo: {
      title: "Scale your reach with Rapid's network.",
      highlights: ['Integrated Logistics', 'Real-time Analytics'],
    },
  },
}
