/**
 * Feature flags [362:1281](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=362-1281)
 * Mobile feature flags [297:23957](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=297-23957)
 */
import { ADMIN_SETTINGS_FEATURE_FLAGS_PATH, ADMIN_SETTINGS_PATH } from './adminPaths'

export { ADMIN_SETTINGS_FEATURE_FLAGS_PATH }

export const ADMIN_FEATURE_FLAGS = {
  breadcrumbs: [
    { label: 'Operations', path: ADMIN_SETTINGS_PATH },
    { label: 'Feature Flags', path: null },
  ],
  title: 'Feature Flags',
  description:
    'Manage global availability of platform features. Changes take effect immediately across all client applications.',
  saveLabel: 'Save Changes',
  flags: [
    {
      id: 'digitalWallet',
      title: 'Digital Wallet',
      description: 'Enables in-app wallet functionality, top-ups, and peer-to-peer transfers.',
      icon: 'wallet',
      iconTone: 'orange',
      highImpact: true,
      enabled: false,
      lastChanged: 'Last changed: Sysadmin • 2h ago',
      warning:
        'Disabling this will freeze all current user balances and prevent new transactions. Ensure financial reconciliation is complete before proceeding.',
      showWarningAlways: true,
    },
    {
      id: 'cryptoPayments',
      title: 'Crypto Payments',
      description:
        'Allow users to pay for services using supported cryptocurrencies.',
      icon: 'crypto',
      iconTone: 'violet',
      enabled: false,
      badge: { label: 'Beta Feature', tone: 'violet' },
      lastChanged: 'Last changed: Ops team • 1d ago',
    },
    {
      id: 'selfReg',
      title: 'Rider Self-Registration',
      description:
        'Open the driver portal for new autonomous sign-ups without admin approval.',
      icon: 'bike',
      enabled: false,
      lastChanged: 'Last changed: Auto • 5m ago',
    },
    {
      id: 'pushNotifications',
      title: 'Marketing Push Notifications',
      description: 'Enable automated promotional campaigns via FCM/APNS.',
      icon: 'bell',
      enabled: false,
      lastChanged: 'Last changed: Growth • 1w ago',
    },
  ],
  unsavedBar: {
    title: 'Unsaved Changes Detected',
    subtitle: 'Review modifications before deployment.',
    discardLabel: 'Discard',
    deployLabel: 'Deploy Changes',
  },
}

export function getInitialFlagState(flags) {
  return Object.fromEntries(flags.map((f) => [f.id, f.enabled]))
}
