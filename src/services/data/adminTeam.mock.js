/** Admin team [362:2070](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=362-2070) */
import { ADMIN_SETTINGS_ADMIN_TEAM_PATH, ADMIN_SETTINGS_PATH } from './adminPaths'

export const ADMIN_SETTINGS_TEAM_PATH = ADMIN_SETTINGS_ADMIN_TEAM_PATH

export const ADMIN_TEAM = {
  breadcrumbs: [
    { label: 'System', path: ADMIN_SETTINGS_PATH },
    { label: 'Admin Team', path: null },
  ],
  title: 'Admin Team',
  subtitle: 'Manage administrative access levels and operational security.',
  inviteLabel: 'Invite Admin',
  stats: [
    { id: 'total', label: 'Total Operators', value: '24' },
    { id: 'active', label: 'Active Session', value: '18', hint: 'Online', hintTone: 'success' },
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
        clearance: 'superAdmin',
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
    resendLabel: 'Resend',
    revokeLabel: 'Revoke',
    invites: [
      {
        id: 'inv-1',
        email: 'elena.rostova@external.io',
        clearanceLabel: 'Support',
        clearance: 'support',
        dispatchTime: 'T-minus 48h',
      },
      {
        id: 'inv-2',
        email: 'james.okafor@partner.io',
        clearanceLabel: 'Operations',
        clearance: 'operations',
        dispatchTime: 'T-minus 24h',
      },
      {
        id: 'inv-3',
        email: 'priya.nair@contractor.io',
        clearanceLabel: 'Finance',
        clearance: 'finance',
        dispatchTime: 'T-minus 12h',
      },
    ],
  },
}
