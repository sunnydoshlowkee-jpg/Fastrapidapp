/**
 * Pending approval — desktop [272:5128](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=272-5128),
 * mobile [622:7212](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=622-7212).
 */
export const MERCHANT_PENDING_APPROVAL_PATH = '/merchant/signup/pending'

export const MERCHANT_PENDING_APPROVAL = {
  supportLabel: 'Support',
  status: {
    title: 'Your account is under review.',
    descriptionPrefix: "We'll notify you by email and SMS within 24 hours once verified. Questions?",
    contactSupportLabel: 'Contact support.',
    refreshLabel: 'Refresh Status',
    signOutLabel: 'Sign Out',
  },
  cards: [
    {
      id: 'next-steps',
      title: 'Next Steps',
      body: "Once approved, you'll receive a welcome kit via email with instructions on how to integrate your first payment gateway.",
      icon: 'mapPin',
    },
    {
      id: 'need-help',
      title: 'Need Help?',
      body: 'Our merchant success team is available 24/7 to answer any questions regarding your application status.',
      icon: 'heart',
    },
  ],
  footer: {
    links: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Security', href: '#security' },
    ],
    copyright: '© 2024 MerchantCore. All rights reserved.',
  },
}
