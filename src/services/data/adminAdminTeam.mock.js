/** Admin team [362:2070](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=362-2070) */
import { ADMIN_SETTINGS_PATH } from './adminSettings.mock'

export const ADMIN_SETTINGS_ADMIN_TEAM_PATH = `${ADMIN_SETTINGS_PATH}/admin-team`

export const ADMIN_ADMIN_TEAM = {
  breadcrumbs: [
    { label: 'System', path: ADMIN_SETTINGS_PATH },
    { label: 'Admin Team', path: null },
  ],
  title: 'Admin Team',
  subtitle: 'Manage administrative access levels and operational security.',
  inviteLabel: 'Invite Admin',
  stats: [
    { id: 'total', label: 'Total Operators', value: '24' },
    { id: 'active', label: 'Active Session', value: '18', hint: 'Online', hintTone: 'online' },
    { id: 'pending', label: 'Pending Clearances', value: '3' },
  ],
  roster: {
    title: 'Active Roster',
    columns: {
      operator: 'Operator',
      channel: 'Comm Channel',
      clearance: 'Clearance Level',
      status: 'Status',
      mfa: 'MFA',
      telemetry: 'Last Telemetry',
    },
    members: [
      {
        id: '1',
        name: 'Sarah Jenkins',
        initials: 'SJ',
        avatarTone: 'bg-violet-100 text-violet-700',
        email: 'sarah.j@kaabo.rapid.io',
        clearance: 'super_admin',
        clearanceLabel: 'Super Admin',
        online: true,
        mfaEnabled: true,
        lastTelemetry: 'Just now',
      },
      {
        id: '2',
        name: 'Marcus Reed',
        initials: 'MR',
        avatarTone: 'bg-gray-200 text-gray-700',
        email: 'marcus.r@kaabo.rapid.io',
        clearance: 'operations',
        clearanceLabel: 'Operations',
        online: true,
        mfaEnabled: true,
        lastTelemetry: '12m ago',
      },
      {
        id: '3',
        name: 'David Chen',
        initials: 'DC',
        avatarTone: 'bg-sky-100 text-sky-700',
        email: 'david.c@kaabo.rapid.io',
        clearance: 'finance',
        clearanceLabel: 'Finance',
        online: false,
        mfaEnabled: false,
        lastTelemetry: '4h ago',
      },
    ],
  },
  pending: {
    title: 'Pending Clearances',
    badge: '3 Action Required',
    columns: {
      identity: 'Target Identity',
      level: 'Assigned Level',
      dispatch: 'Dispatch Time',
      directives: 'Directives',
    },
    items: [
      {
        id: 'p1',
        email: 'elena.rostova@external.io',
        clearance: 'support',
        clearanceLabel: 'Support',
        dispatchTime: 'T-minus 48h',
      },
      {
        id: 'p2',
        email: 'james.okafor@partner.io',
        clearance: 'operations',
        clearanceLabel: 'Operations',
        dispatchTime: 'T-minus 24h',
      },
      {
        id: 'p3',
        email: 'mina.patel@contractor.io',
        clearance: 'finance',
        clearanceLabel: 'Finance',
        dispatchTime: 'T-minus 12h',
      },
    ],
    resendLabel: 'Resend',
    revokeLabel: 'Revoke',
  },
}

export const clearanceStyles = {
  super_admin: 'bg-violet-100 text-violet-800',
  operations: 'bg-gray-100 text-gray-600',
  finance: 'bg-gray-100 text-gray-600',
  support: 'bg-gray-100 text-gray-600',
}
