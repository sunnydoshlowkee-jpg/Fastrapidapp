/**
 * Desktop [272:8249](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=272-8249),
 * mobile bank details [622:6963](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=622-6963).
 */
export const MERCHANT_ONBOARDING_BANK_DETAILS_PATH = '/merchant/signup/bank-details'

export const MERCHANT_ONBOARDING_BANK_DETAILS = {
  brandSubtitle: 'Merchant Onboarding',
  steps: [
    { id: 1, label: 'Business Profile', status: 'completed' },
    { id: 2, label: 'Verify Documents', status: 'completed' },
    { id: 3, label: 'Location & Hours', status: 'completed' },
    { id: 4, label: 'Payout details', status: 'active' },
  ],
  help: {
    title: 'Need help?',
    body: 'Our partner success team is available 24/7 to guide you through your application.',
    linkLabel: 'Chat with Support',
  },
  page: {
    title: 'Bank Details',
    mobileHeaderTitle: 'Bank Details',
    subtitle:
      'Where should we send your payouts? Enter your Nigerian bank account information below.',
    introLine1: 'Where should we send your payouts?',
    introLine2: 'Enter your Nigerian bank account information below.',
    saveNextLabel: 'Save & Next',
    mobileFinishLabel: 'Finish',
    skipLabel: 'Skip for now',
    mobileSkipLabel: 'Skip',
    securityNote:
      'Secured by CBN-compliant encryption and Kaabo fraud protection protocols.',
    helpPrefix: 'Need help?',
    helpLinkLabel: 'Contact Merchant Support',
  },
  fields: {
    bank: {
      label: 'Select Bank',
      placeholder: 'Choose a bank...',
      options: [
        'Access Bank',
        'GTBank',
        'First Bank',
        'Zenith Bank',
        'UBA',
        'Kuda Bank',
        'Opay',
      ],
    },
    accountNumber: {
      label: 'Account Number',
      placeholder: '0123456789',
    },
    accountName: {
      label: 'Account Name',
      verifiedBannerLabel: 'Account Name Verified',
      resolvedName: 'CHUKWUDI EMMANUEL OKAFOR',
    },
  },
  panel: {
    security: {
      title: 'Enterprise-Grade Security',
      description:
        'Your financial data is encrypted at the source. We never store raw account details on our servers, ensuring your business stays protected against unauthorized access.',
    },
    partnerLabel: 'Verified partner',
    imageUrl:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop',
    insight: {
      quote:
        'Merchants with verified bank details see a 40% faster onboarding completion rate.',
      source: 'Rapid Onboarding Insights',
    },
  },
}
