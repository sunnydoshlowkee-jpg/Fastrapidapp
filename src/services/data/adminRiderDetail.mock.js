/** Rider detail [351:719](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=351-719) · Documents tab [396:258](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=396-258) */
import { ADMIN_RIDERS, ADMIN_RIDERS_PATH } from './adminRiders.mock'

export const ADMIN_RIDER_DETAIL_DEFAULT_ID = 'RD-8492'

const RIDER_DETAILS = {
  'RD-8492': {
    displayId: 'RDR-8492',
    joined: 'Joined Jan 2023',
    onlineLabel: 'Online',
    suspendLabel: 'Suspend',
    editProfileLabel: 'Edit Profile',
    defaultTab: 'documents',
    metrics: [
      { id: 'trips', label: 'Total Trips', value: '1,248', trend: '~12%', showTrend: true },
      { id: 'rating', label: 'Average Rating', value: '4.92', stars: 4 },
      { id: 'earnings', label: 'Total Earnings', value: '₦ 12,450' },
    ],
    tabs: [
      { id: 'trips', label: 'Trip history' },
      { id: 'documents', label: 'Documents' },
    ],
    tripHistory: [
      {
        id: 't1',
        route: 'Downtown to Airport',
        meta: 'Today, 2:45 PM • 12.4 miles',
        amount: '₦24.50',
        status: 'completed',
        statusLabel: 'Completed',
      },
      {
        id: 't2',
        route: 'West End to City Center',
        meta: 'Yesterday, 6:12 PM • 8.1 miles',
        amount: '₦18.20',
        status: 'completed',
        statusLabel: 'Completed',
      },
      {
        id: 't3',
        route: 'North Station to South End',
        meta: 'Yesterday, 11:30 AM • 5.6 miles',
        amount: '₦12.00',
        status: 'canceled',
        statusLabel: 'Canceled',
      },
      {
        id: 't4',
        route: 'Marina to Business District',
        meta: '2 days ago, 4:05 PM • 9.3 miles',
        amount: '₦21.80',
        status: 'completed',
        statusLabel: 'Completed',
      },
    ],
    documents: [
      {
        id: 'd1',
        name: 'Government ID',
        meta: 'Uploaded Jan 12, 2023 • PDF (2.4 MB)',
        icon: 'id',
        status: 'verified',
        statusLabel: 'Verified',
        actionLabel: 'View',
      },
      {
        id: 'd2',
        name: 'Vehicle Registration',
        meta: 'Uploaded Jan 14, 2023 • JPG (1.8 MB)',
        icon: 'document',
        status: 'pending_review',
        statusLabel: 'Pending Review',
        actionLabel: 'Review',
      },
      {
        id: 'd3',
        name: 'Insurance Policy',
        meta: 'Uploaded Jan 15, 2023 • PDF (4.1 MB)',
        icon: 'insurance',
        status: 'expired',
        statusLabel: 'Expired',
        actionLabel: 'Request New',
      },
    ],
  },
}

function buildFallbackDetail(listRider) {
  return {
    displayId: listRider.id.replace('RD-', 'RDR-'),
    joined: 'Joined 2024',
    onlineLabel: listRider.status === 'offline' ? 'Offline' : 'Online',
    suspendLabel: 'Suspend',
    editProfileLabel: 'Edit Profile',
    metrics: [
      { id: 'trips', label: 'Total Trips', value: listRider.trips, showTrend: false },
      { id: 'rating', label: 'Average Rating', value: listRider.rating, stars: 4 },
      { id: 'earnings', label: 'Total Earnings', value: '₦ —' },
    ],
    tabs: [
      { id: 'trips', label: 'Trip history' },
      { id: 'documents', label: 'Documents' },
    ],
    tripHistory: [],
    documents: [],
    defaultTab: 'trips',
  }
}

export function getAdminRiderDetail(riderId) {
  const listRider =
    ADMIN_RIDERS.riders.find((r) => r.id === riderId) ??
    ADMIN_RIDERS.riders.find((r) => r.id === ADMIN_RIDER_DETAIL_DEFAULT_ID)

  const detail = RIDER_DETAILS[listRider.id] ?? buildFallbackDetail(listRider)

  return {
    ...listRider,
    ...detail,
    breadcrumbs: [
      { label: 'Riders', path: ADMIN_RIDERS_PATH },
      { label: listRider.id },
    ],
  }
}
