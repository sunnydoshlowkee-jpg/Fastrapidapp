/** Desktop [272:8560](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=272-8560) · Mobile [622:7058](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=622-7058) */
export const MERCHANT_VERIFICATION_DOCUMENTS_PATH = '/merchant/signup/documents'

export const MERCHANT_VERIFICATION_DOCUMENTS = {
  brandSubtitle: 'Merchant Onboarding',
  steps: [
    { id: 1, label: 'Business Profile', status: 'completed' },
    { id: 2, label: 'Verify Documents', status: 'active' },
    { id: 3, label: 'Location & Hours', status: 'upcoming' },
    { id: 4, label: 'Payout details', status: 'upcoming' },
  ],
  help: {
    title: 'Need help?',
    body: 'Our partner success team is available 24/7 to guide you through your application.',
    linkLabel: 'Chat with Support',
  },
  page: {
    title: 'Verification Documents',
    subtitle:
      'Upload the required legal documentation to authorize your merchant account for logistics operations.',
    backLabel: 'Back to Profile',
    continueLabel: 'Continue',
    saveDraftLabel: 'Save Draft',
    mobileStepPrefix: 'Step 2:',
  },
  documents: [
    {
      id: 'cac',
      section: {
        title: 'CAC Certificate',
        subtitle: 'Corporate Affairs Commission Registration',
        icon: 'shield',
      },
      variant: 'dropzone',
      status: 'empty',
      dropzone: {
        prompt: 'Drop file here or',
        browseLabel: 'browse',
        hint: 'PDF, PNG or JPG (Max. 5MB)',
      },
    },
    {
      id: 'tin',
      section: {
        title: 'Tax ID (TIN)',
        subtitle: 'Taxpayer Identification Number Document',
        icon: 'file',
      },
      variant: 'dropzone',
      status: 'empty',
      dropzone: {
        prompt: 'Drop file here or',
        browseLabel: 'browse',
        hint: 'PDF, PNG or JPG (Max. 5MB)',
      },
    },
    {
      id: 'address',
      section: {
        title: 'Proof of Address',
        subtitle: 'Utility bill or bank statement (Last 3 months)',
        icon: 'location',
      },
      variant: 'compact',
      status: 'empty',
      compact: {
        label: 'Click to upload document',
      },
    },
  ],
  whyWeNeedThis: {
    title: 'Why we need this',
    body: 'To ensure the security of the Rapid ecosystem, we verify all merchants through official channels. Your data is encrypted and stored in compliance with local privacy regulations.',
    imageUrl:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=640&h=320&fit=crop',
  },
}
