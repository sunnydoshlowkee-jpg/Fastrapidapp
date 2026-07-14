import { MERCHANT_SETTINGS_ACCOUNT_PATH } from './merchantAccountSettings.mock'
import { MERCHANT_SETTINGS_BUSINESS_PATH } from './merchantBusinessProfile.mock'
import { MERCHANT_SETTINGS_OPERATING_HOURS_PATH } from './merchantOperatingHours.mock'

export const MERCHANT_SETTINGS_PRIVACY_PATH = '/merchant/settings/privacy-security'

/** Desktop [272:11459](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=272-11459) · Mobile [622:1768](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=622-1768) */
export const MERCHANT_SETTINGS = {
  pageTitle: 'Settings',
  heading: 'General Settings',
  subtitle: 'Manage your merchant account, operations, and team access.',
  logoutLabel: 'Logout',
  cards: [
    {
      id: 'business-profile',
      title: 'Business Profile',
      description: 'Edit your merchant logo, display name, and public description.',
      icon: 'store',
      highlighted: false,
      to: MERCHANT_SETTINGS_BUSINESS_PATH,
    },
    {
      id: 'operating-hours',
      title: 'Operating Hours',
      description: 'Set daily opening and closing times, and manage holiday schedules.',
      icon: 'clock',
      highlighted: false,
      to: MERCHANT_SETTINGS_OPERATING_HOURS_PATH,
    },
    {
      id: 'payment-methods',
      title: 'Payment Methods',
      description: 'Link bank accounts, manage payout schedules, and view fees.',
      icon: 'banknote',
      highlighted: false,
    },
    {
      id: 'account-settings',
      title: 'Account Settings',
      description: 'Update contact email, phone number, and security preferences.',
      icon: 'user-cog',
      highlighted: true,
      to: MERCHANT_SETTINGS_ACCOUNT_PATH,
    },
    {
      id: 'privacy-security',
      title: 'Privacy & Security',
      description: 'Enable biometric unlock, authenticator app, and login preferences.',
      icon: 'shield',
      highlighted: false,
      to: MERCHANT_SETTINGS_PRIVACY_PATH,
    },
  ],
  mobile: {
    merchantId: '88291',
    signOutLabel: 'Sign Out',
    quickSupportLabel: 'Quick Support',
    cards: [
      {
        id: 'business-profile',
        title: 'Business Profile',
        description: 'Edit your merchant logo, display name, and public description.',
        icon: 'store',
        to: MERCHANT_SETTINGS_BUSINESS_PATH,
      },
      {
        id: 'operating-hours',
        title: 'Operating Hours',
        description: 'Set daily opening and closing times, and manage holiday schedules.',
        icon: 'clock',
        to: MERCHANT_SETTINGS_OPERATING_HOURS_PATH,
      },
      {
        id: 'account-settings',
        title: 'Account Settings',
        description: 'Update contact email, phone number, and security preferences.',
        icon: 'user',
        to: MERCHANT_SETTINGS_ACCOUNT_PATH,
      },
      {
        id: 'privacy-security',
        title: 'Privacy & Security',
        description: 'Enable biometric unlock, authenticator app, and login preferences.',
        icon: 'shield',
        to: MERCHANT_SETTINGS_PRIVACY_PATH,
      },
      {
        id: 'payment-methods',
        title: 'Payment Methods',
        description: 'Link bank accounts, manage payout schedules, and view fees.',
        icon: 'credit-card',
      },
    ],
  },
}
