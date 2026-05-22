/** Feature flags [362:1281](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=362-1281) */
import { ADMIN_SETTINGS_FEATURE_FLAGS_PATH, ADMIN_SETTINGS_PATH } from './adminPaths'

export { ADMIN_SETTINGS_FEATURE_FLAGS_PATH }

export const ADMIN_FEATURE_FLAGS = {
  breadcrumbs: [
    { label: 'Operations', path: ADMIN_SETTINGS_PATH },
    { label: 'Feature Flags', path: null },
  ],
  title: 'Feature Flags',
  description:
    'Manage system-wide capabilities. Toggling core features may cause immediate service disruptions. Proceed with tactical awareness.',
  flags: [
    {
      id: 'digitalWallet',
      title: 'Digital Wallet',
      description:
        'Core financial engine. Disabling this restricts all user balances and internal transfers.',
      icon: 'wallet',
      enabled: true,
      lastChanged: 'Last changed: Sysadmin • 2h ago',
      warning:
        'Disabling active wallets requires secondary authorization.',
      showWarningWhenEnabled: true,
    },
    {
      id: 'cryptoPayments',
      title: 'Crypto Payments',
      description:
        'External integration for cryptocurrency funding and withdrawals via partner API.',
      icon: 'crypto',
      enabled: false,
      lastChanged: 'Last changed: Ops team • 1d ago',
    },
    {
      id: 'selfReg',
      title: 'Rider/Merchant Self-Reg',
      description:
        'Public portals for automated onboarding. Toggle off during maintenance windows.',
      icon: 'users',
      enabled: true,
      lastChanged: 'Last changed: Auto • 5m ago',
    },
    {
      id: 'pushNotifications',
      title: 'Push Notifications',
      description:
        'Global communication channel. Disabling halts all transactional and marketing alerts.',
      icon: 'bell',
      enabled: true,
      lastChanged: 'Last changed: Growth • 1w ago',
    },
    {
      id: 'biometricAuth',
      title: 'Biometric Auth (Beta)',
      description:
        'FaceID and TouchID support for mobile clients. Currently in staggered rollout.',
      icon: 'fingerprint',
      enabled: false,
      lastChanged: 'Last changed: Security • 2d ago',
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
