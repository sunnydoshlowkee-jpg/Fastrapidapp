/**
 * Desktop [272:8044](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=272-8044),
 * mobile location [715:915](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=715-915),
 * mobile operating hours [715:756](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=715-756).
 */
export const MERCHANT_ONBOARDING_LOCATION_HOURS_PATH = '/merchant/signup/location-hours'

export const MERCHANT_ONBOARDING_LOCATION_HOURS = {
  brandSubtitle: 'Merchant Onboarding',
  steps: [
    { id: 1, label: 'Business Profile', status: 'completed' },
    { id: 2, label: 'Verify Documents', status: 'completed' },
    { id: 3, label: 'Location & Hours', status: 'active' },
    { id: 4, label: 'Payout details', status: 'upcoming' },
  ],
  help: {
    title: 'Need help?',
    body: 'Our partner success team is available 24/7 to guide you through your application.',
    linkLabel: 'Chat with Support',
  },
  page: {
    title: 'Location & Hours',
    mobileHeaderTitle: 'Location',
    mobileHoursHeaderTitle: 'Operating Hours',
    subtitle: 'Configure your storefront appearance and operational timings.',
    skipLabel: 'Skip',
    mobileProgressLocationPct: 58,
    mobileProgressHoursPct: 62,
    currentStep: 3,
    totalSteps: 4,
    previousLabel: 'Previous',
    saveNextLabel: 'Save & Next',
  },
  location: {
    number: 1,
    title: 'Business Location',
    description: 'Enter your physical address to help customers find you.',
    fields: {
      street: {
        label: 'Street Address',
        placeholder: '123 Merchant Way',
        defaultValue: '',
      },
      city: {
        label: 'City',
        placeholder: 'Lagos',
        defaultValue: '',
      },
      postalCode: {
        label: 'Postal Code',
        placeholder: '94103',
        defaultValue: '',
      },
    },
    map: {
      confirmLabel: 'Confirm on Map',
    },
  },
  hours: {
    number: 2,
    title: 'Operating Hours',
    description: 'Set when your store accepts orders each week.',
    mobileCardDescription: 'Define when your business is open for orders.',
    closedLabel: 'CLOSED',
    toLabel: 'to',
    days: [
      { id: 'mon', label: 'Monday', open: true, openTime: '09:00 AM', closeTime: '09:00 PM' },
      { id: 'tue', label: 'Tuesday', open: true, openTime: '09:00 AM', closeTime: '09:00 PM' },
      { id: 'wed', label: 'Wednesday', open: true, openTime: '09:00 AM', closeTime: '09:00 PM' },
      { id: 'thu', label: 'Thursday', open: true, openTime: '09:00 AM', closeTime: '09:00 PM' },
      { id: 'fri', label: 'Friday', open: true, openTime: '09:00 AM', closeTime: '11:00 PM' },
      { id: 'sat', label: 'Saturday', open: false },
      { id: 'sun', label: 'Sunday', open: false },
    ],
  },
}
