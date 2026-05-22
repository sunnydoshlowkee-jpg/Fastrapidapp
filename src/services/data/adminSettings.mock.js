/** Admin settings home [379:710](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=379-710) */
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
          icon: 'sliders',
          path: ADMIN_SETTINGS_GENERAL_PATH,
        },
        { id: 'email', label: 'Email & SMTP', icon: 'mail', path: ADMIN_SETTINGS_EMAIL_PATH },
        {
          id: 'payment',
          label: 'Payment Gateway',
          icon: 'card',
          path: ADMIN_SETTINGS_PAYMENT_PATH,
        },
        {
          id: 'alerts',
          label: 'Alert Settings',
          icon: 'bell',
          path: ADMIN_SETTINGS_ALERTS_PATH,
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
          icon: 'toggle',
          path: ADMIN_SETTINGS_FEATURE_FLAGS_PATH,
        },
        {
          id: 'zones',
          label: 'Delivery Zones',
          icon: 'map',
          path: ADMIN_SETTINGS_DELIVERY_ZONES_PATH,
        },
        {
          id: 'commission',
          label: 'Commission Rates',
          icon: 'percent',
          path: ADMIN_SETTINGS_FINANCE_PATH,
        },
      ],
    },
    {
      id: 'team',
      label: 'Team',
      items: [
        { id: 'team', label: 'Admin Team', icon: 'users', path: ADMIN_SETTINGS_ADMIN_TEAM_PATH },
        {
          id: 'roles',
          label: 'Roles & Permissions',
          icon: 'key',
          path: ADMIN_SETTINGS_ROLES_PATH,
        },
      ],
    },
  ],
}
