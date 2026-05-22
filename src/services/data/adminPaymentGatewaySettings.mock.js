/** Payment gateway settings [362:284](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=362-284) */
import { ADMIN_SETTINGS_PAYMENT_PATH, ADMIN_SETTINGS_PATH } from './adminPaths'

export { ADMIN_SETTINGS_PAYMENT_PATH }

export const ADMIN_PAYMENT_GATEWAY_SETTINGS = {
  breadcrumbs: [
    { label: 'System', path: ADMIN_SETTINGS_PATH },
    { label: 'Payment Gateway', path: null },
  ],
  intro:
    'Configure active gateway providers, manage environment credentials, and monitor transaction telemetry.',
  testMode: {
    title: 'Test Mode Active',
    body: 'System is currently operating in sandbox mode. Live transactions are bypassed and simulated. Ensure to switch to live credentials before production deployment.',
    toggleLabel: 'Sandbox',
    defaultOn: true,
  },
  providers: {
    title: 'Active Gateway Provider',
    options: [
      {
        id: 'paystack',
        name: 'Paystack',
        initials: 'PS',
        brandClass: 'bg-emerald-600 text-white',
        routeLabel: 'Primary Route',
        status: 'operational',
        statusLabel: 'Operational',
      },
      {
        id: 'flutterwave',
        name: 'Flutterwave',
        initials: 'FW',
        brandClass: 'bg-orange-500 text-white',
        routeLabel: 'Failover Route',
        status: null,
        statusLabel: null,
      },
    ],
    defaultId: 'paystack',
  },
  credentials: {
    title: 'Environment Credentials',
    publicKey: {
      id: 'publicKey',
      label: 'Public Key (Test)',
      value: 'pk_test_••••••••••••••••••••••••',
      masked: true,
    },
    secretKey: {
      id: 'secretKey',
      label: 'Secret Key (Test)',
      value: 'sk_test_••••••••••••••••••••••••',
      masked: true,
    },
    disclaimer: 'Never share your secret key or commit it to version control.',
  },
  actions: {
    testConnectionLabel: 'Test Connection',
    saveLabel: 'Save Configuration',
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
