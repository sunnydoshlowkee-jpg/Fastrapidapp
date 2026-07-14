/** General settings [362:65](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=362-65) */
import { ADMIN_SETTINGS_GENERAL_PATH, ADMIN_SETTINGS_PATH } from './adminPaths'

export { ADMIN_SETTINGS_GENERAL_PATH }

export const ADMIN_GENERAL_SETTINGS = {
  breadcrumbs: [
    { label: 'System', path: ADMIN_SETTINGS_PATH },
    { label: 'General Settings', path: null },
  ],
  intro: 'Core platform identity and foundational parameters.',
  saveLabel: 'Save Changes',
  brandIdentity: {
    title: 'Brand Identity',
    fields: {
      platformName: {
        id: 'platformName',
        label: 'Platform Name',
        value: 'Káàbọ̀ Rapid',
      },
      supportEmail: {
        id: 'supportEmail',
        label: 'Support Email',
        value: 'ops@kaaborapid.com',
        type: 'email',
      },
      description: {
        id: 'description',
        label: 'Platform Description',
        value: 'High-speed delivery and logistics management platform.',
      },
    },
  },
  localization: {
    title: 'Localization',
    fields: {
      currency: {
        id: 'currency',
        label: 'Default Currency',
        value: 'ngn',
        options: [
          { value: 'ngn', label: 'NGN (₦)' },
          { value: 'usd', label: 'USD ($)' },
          { value: 'gbp', label: 'GBP (£)' },
        ],
      },
      timezone: {
        id: 'timezone',
        label: 'Timezone',
        value: 'africa-lagos',
        options: [
          { value: 'africa-lagos', label: 'Africa/Lagos (WAT)' },
          { value: 'utc', label: 'UTC' },
        ],
      },
      dateFormat: {
        id: 'dateFormat',
        label: 'Date Format',
        value: 'dd-mm-yyyy',
        options: [
          { value: 'dd-mm-yyyy', label: 'DD-MM-YYYY' },
          { value: 'mm-dd-yyyy', label: 'MM-DD-YYYY' },
          { value: 'yyyy-mm-dd', label: 'YYYY-MM-DD' },
        ],
      },
    },
  },
  maintenance: {
    title: 'System Maintenance',
    toggle: {
      id: 'maintenanceMode',
      label: 'Maintenance Mode',
      description: 'Disables external access to the platform for all non-admin users.',
      defaultOn: false,
    },
  },
}
