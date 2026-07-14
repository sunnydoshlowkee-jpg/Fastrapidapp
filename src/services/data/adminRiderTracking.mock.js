/** Rider live tracking [351:1904](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=351-1904) */
import { ADMIN_RIDERS_PATH } from './adminRiders.mock'

export const ADMIN_RIDER_TRACKING_PATH = '/admin/riders'

export function getRiderTrackingPath(riderId) {
  return `${ADMIN_RIDER_TRACKING_PATH}/${riderId}/tracking`
}

export const ADMIN_RIDER_TRACKING = {
  searchPlaceholder: 'Search orders, riders...',
  telemetryLabel: 'Live Telemetry Active',
  liveLabel: 'Live',
  enRouteLabel: 'En Route',
  estArrivalLabel: 'Est. Arrival',
  distanceLeftLabel: 'Distance Left',
  orderTimelineTitle: 'Order Timeline',
  callRiderLabel: 'Call Rider',
  messageLabel: 'Message',
  reassignLabel: 'Reassign Order',
  merchantMarkerLabel: 'Merchant',
  destinationMarkerLabel: 'Destination',
}

const TRACKING_BY_RIDER = {
  'RD-8492': {
    rider: {
      name: 'Adebayo O.',
      initials: 'AO',
      avatarTone: 'bg-violet-100 text-violet-700',
      plate: 'KJA-123-XY',
      rating: '4.9',
      statusLabel: 'Live',
    },
    stats: {
      eta: '12 mins',
      traffic: 'Traffic: Moderate',
      distance: '4.2 km',
      speed: 'Current Speed: 45 km/h',
    },
    order: {
      id: 'ORD-9928-VX',
      timeline: [
        {
          id: 'pickup',
          type: 'pickup',
          title: 'Picked Up',
          name: 'Chicken Republic',
          address: '14, Admiralty Way, Lekki',
          items: '2x Mega Meal, 1x Coke',
        },
        {
          id: 'dropoff',
          type: 'dropoff',
          title: 'Heading To',
          name: 'Sarah Johnson',
          address: 'Block 4, Flat 12, 1004 Estate, VI',
          items: null,
        },
      ],
    },
    map: {
      merchant: { x: 22, y: 68, label: 'MERCHANT' },
      rider: { x: 48, y: 52, label: 'EN ROUTE' },
      destination: { x: 78, y: 22, label: 'DESTINATION' },
    },
  },
}

export function getAdminRiderTracking(riderId) {
  const data = TRACKING_BY_RIDER[riderId] ?? TRACKING_BY_RIDER['RD-8492']
  return {
    ...ADMIN_RIDER_TRACKING,
    ...data,
    riderId: riderId ?? 'RD-8492',
    breadcrumbs: [
      { label: 'Riders', path: ADMIN_RIDERS_PATH },
      { label: riderId ?? 'RD-8492', path: `${ADMIN_RIDERS_PATH}/${riderId ?? 'RD-8492'}` },
      { label: 'Live Tracking' },
    ],
  }
}
