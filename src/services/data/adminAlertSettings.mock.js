/** Alert settings [362:1891](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=362-1891) */
import { ADMIN_SETTINGS_ALERTS_PATH, ADMIN_SETTINGS_PATH } from './adminPaths'

export { ADMIN_SETTINGS_ALERTS_PATH }

export const ADMIN_ALERT_SETTINGS = {
  breadcrumbs: [
    { label: 'System', path: ADMIN_SETTINGS_PATH },
    { label: 'Alert Settings', path: null },
  ],
  description:
    'Manage notification parameters across operational channels. Ensure critical event thresholds align with immediate response protocols.',
  resetLabel: 'Reset Defaults',
  saveLabel: 'Save Protocol',
  channels: {
    inApp: 'In-App',
    email: 'Email',
    sms: 'SMS',
  },
  eventTypeColumn: 'Event Type',
  sections: [
    {
      id: 'critical',
      title: 'Critical Operations',
      icon: 'alert',
      priorityBadge: 'High Priority',
      events: [
        {
          id: 'sla-breach',
          title: 'SLA Breach Detected',
          description: 'Triggers when processing time exceeds 99th percentile threshold.',
          channels: { inApp: true, email: true, sms: true },
        },
        {
          id: 'failed-payout',
          title: 'Failed Payout Delivery',
          description: 'Immediate alert on payment gateway rejection or timeout.',
          channels: { inApp: true, email: true, sms: false },
        },
      ],
    },
    {
      id: 'merchant',
      title: 'Merchant Intelligence',
      icon: 'store',
      events: [
        {
          id: 'merchant-onboarding',
          title: 'New Merchant Onboarding',
          description: 'Notification when a new merchant completes KYC verification.',
          channels: { inApp: true, email: false, sms: false },
        },
      ],
    },
  ],
}

export function getInitialAlertChannels(sections) {
  const state = {}
  sections.forEach((section) => {
    section.events.forEach((event) => {
      state[event.id] = { ...event.channels }
    })
  })
  return state
}
