/** Email & SMTP settings [376:246](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=376-246) */
import { ADMIN_SETTINGS_EMAIL_PATH, ADMIN_SETTINGS_PATH } from './adminPaths'

export { ADMIN_SETTINGS_EMAIL_PATH }

export const ADMIN_EMAIL_SMTP_SETTINGS = {
  breadcrumbs: [
    { label: 'System', path: ADMIN_SETTINGS_PATH },
    { label: 'Email & SMTP', path: null },
  ],
  card: {
    title: 'SMTP Relay Configuration',
    description:
      'Define the primary mail transfer agent settings for outbound system communications.',
  },
  fields: {
    host: { id: 'smtpHost', label: 'SMTP Host', value: 'smtp.postmarkapp.com' },
    port: { id: 'smtpPort', label: 'Port', value: '587' },
    username: { id: 'smtpUsername', label: 'Username', value: 'sysadmin_relay_01' },
    password: { id: 'smtpPassword', label: 'Password', value: '••••••••••••' },
    senderName: {
      id: 'senderName',
      label: 'Default Sender Name',
      value: 'Kààbọ̀ System Notification',
    },
    senderAddress: {
      id: 'senderAddress',
      label: 'Default Sender Address',
      value: 'noreply@kaabo-rapid.local',
    },
  },
  encryption: {
    label: 'Enforce TLS/SSL Encryption',
    description: 'Require secure connection for payload transmission. Recommended.',
    defaultOn: true,
  },
  discardLabel: 'Discard Changes',
  commitLabel: 'Commit Configuration',
}
