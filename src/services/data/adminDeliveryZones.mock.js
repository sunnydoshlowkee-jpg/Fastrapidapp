/** Delivery zones [362:2686](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=362-2686) */
import { ADMIN_SETTINGS_DELIVERY_ZONES_PATH, ADMIN_SETTINGS_PATH } from './adminPaths'

export { ADMIN_SETTINGS_DELIVERY_ZONES_PATH }

export const ADMIN_DELIVERY_ZONES = {
  breadcrumbs: [
    { label: 'System', path: ADMIN_SETTINGS_PATH },
    { label: 'Delivery Zones', path: null },
  ],
  intro: 'Configure geographic pricing tiers and surge multipliers.',
  addZoneLabel: 'Add New Zone',
  zones: [
    {
      id: 'ZON-01-LGI',
      name: 'Lagos Island Main',
      baseFee: '2500',
      surge: '1.5',
      active: true,
    },
    {
      id: 'ZON-02-MLC',
      name: 'Mainland Central',
      baseFee: '1500',
      surge: '1.0',
      active: true,
    },
    {
      id: 'ZON-03-LK2',
      name: 'Lekki Phase 2',
      baseFee: '3000',
      surge: '1.2',
      active: false,
    },
  ],
  editPanel: {
    title: 'Edit Zone Parameters',
    statusLabel: 'Zone Status',
    activeBadge: 'Active',
    inactiveBadge: 'Inactive',
    fields: {
      name: 'Zone Name',
      baseFee: 'Base Fee (₦)',
      surge: 'Surge Multiplier',
    },
    geofence: {
      title: 'Geofence Boundary',
      redrawLabel: 'Redraw',
    },
    discardLabel: 'Discard',
    updateLabel: 'Update Tactics',
  },
}

export function cloneZones(zones) {
  return zones.map((z) => ({ ...z }))
}
