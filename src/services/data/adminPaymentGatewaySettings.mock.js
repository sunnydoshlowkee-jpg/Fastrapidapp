/**
 * Payment gateway settings [362:284](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=362-284)
 * Mobile payment gateway [297:24077](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=297-24077)
 */
import { ADMIN_SETTINGS_PAYMENT_PATH, ADMIN_SETTINGS_PATH } from './adminPaths'

export { ADMIN_SETTINGS_PAYMENT_PATH }

export const ADMIN_PAYMENT_GATEWAY_SETTINGS = {
  breadcrumbs: [
    { label: 'System', path: ADMIN_SETTINGS_PATH },
    { label: 'Payment Gateway', path: null },
  ],
  pageTitle: 'Gateways',
  testMode: {
    title: 'Test Mode Active',
    body: 'Transactions will not be processed on real cards. Toggle below to go live.',
  },
  providers: {
    title: 'Active Provider',
    healthLabel: 'Healthy',
    options: [
      {
        id: 'paystack',
        name: 'Paystack',
        initial: 'P',
        initialColor: '#2563EB',
      },
      {
        id: 'flutterwave',
        name: 'Flutterwave',
        initial: 'F',
        initialColor: '#EAB308',
      },
    ],
    defaultId: 'paystack',
  },
  credentials: {
    title: 'API Credentials',
    testModeLabel: 'Test Mode',
    testModeDescription: 'Use test keys for sandbox environment',
    publicKey: {
      id: 'publicKey',
      label: 'Public Key',
      value: 'pk_test_a1b2c3d4e5f6g7h8i9j0',
    },
    secretKey: {
      id: 'secretKey',
      label: 'Secret Key',
      value: 'sk_test_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
    },
    lastUpdatedLabel: 'Last updated: 2 days ago',
  },
  actions: {
    saveLabel: 'Save Changes',
    testConnectionLabel: 'Test Connection',
  },
  telemetry: {
    title: 'System Telemetry',
    items: [
      { id: 'latency', label: 'Gateway Latency', value: '124 ms', percent: 72, tone: 'good' },
      { id: 'error', label: 'Error Rate (1H)', value: '0.02%', percent: 8, tone: 'good' },
      { id: 'ping', label: 'Last Ping', value: '14:02:44 UTC', percent: null, tone: 'neutral' },
    ],
  },
  activity: {
    title: 'Recent Activity',
    items: [
      { id: '1', title: 'Test Connection Successful', time: '2 mins ago', by: 'System Admin' },
      { id: '2', title: 'Test Mode Activated', time: '1 hour ago', by: 'System Admin' },
    ],
  },
}
