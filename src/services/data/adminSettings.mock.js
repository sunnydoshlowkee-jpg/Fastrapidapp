/**
 * Admin settings home [379:710](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=379-710)
 * Mobile settings [297:23809](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=297-23809)
 */
import {
  ADMIN_SETTINGS_ADMIN_TEAM_PATH,
  ADMIN_SETTINGS_ALERTS_PATH,
  ADMIN_SETTINGS_DELIVERY_ZONES_PATH,
  ADMIN_SETTINGS_EMAIL_PATH,
  ADMIN_SETTINGS_FEATURE_FLAGS_PATH,
  ADMIN_SETTINGS_FINANCE_PATH,
  ADMIN_SETTINGS_GENERAL_PATH,
  ADMIN_SETTINGS_PATH,
  ADMIN_SETTINGS_PAYMENT_PATH,
  ADMIN_SETTINGS_ROLES_PATH,
} from './adminPaths'

export { ADMIN_SETTINGS_PATH, ADMIN_SETTINGS_FINANCE_PATH } from './adminPaths'

export const ADMIN_SETTINGS = {
  title: 'Settings',
  subtitle: 'Manage platform configuration',
  sections: [
    {
      id: 'platform',
      label: 'Platform',
      items: [
        {
          id: 'general',
          label: 'General',
          description: 'Global app settings and localization',
          icon: 'sliders',
          path: ADMIN_SETTINGS_GENERAL_PATH,
        },
        {
          id: 'email',
          label: 'SMTP',
          description: 'Email server configuration',
          icon: 'mail',
          path: ADMIN_SETTINGS_EMAIL_PATH,
        },
        {
          id: 'payment',
          label: 'Gateway',
          description: 'Payment processors and API keys',
          icon: 'card',
          path: ADMIN_SETTINGS_PAYMENT_PATH,
        },
      ],
    },
    {
      id: 'operations',
      label: 'Operations',
      items: [
        {
          id: 'flags',
          label: 'Feature Flags',
          description: 'Enable or disable experimental features',
          icon: 'toggle',
          path: ADMIN_SETTINGS_FEATURE_FLAGS_PATH,
          accentDot: 'violet',
        },
        {
          id: 'zones',
          label: 'Delivery Zones',
          description: 'Manage operational areas and pricing',
          icon: 'map',
          path: ADMIN_SETTINGS_DELIVERY_ZONES_PATH,
        },
        {
          id: 'commission',
          label: 'Commission',
          description: 'Set merchant and driver rates',
          icon: 'percent',
          iconTone: 'violet',
          path: ADMIN_SETTINGS_FINANCE_PATH,
        },
      ],
    },
    {
      id: 'team',
      label: 'Team',
      items: [
        {
          id: 'team',
          label: 'Admin Team',
          description: 'Manage dashboard users',
          icon: 'users',
          path: ADMIN_SETTINGS_ADMIN_TEAM_PATH,
        },
        {
          id: 'roles',
          label: 'Roles',
          description: 'Permissions and access control',
          icon: 'briefcase',
          path: ADMIN_SETTINGS_ROLES_PATH,
        },
      ],
    },
  ],
}
