/** Desktop [272:10316](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=272-10316) · Bento [272:10371](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=272-10371) · Mobile [622:1865](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=622-1865) */
export const MERCHANT_SETTINGS_OPERATING_HOURS_PATH = '/merchant/settings/hours'

export const MERCHANT_OPERATING_HOURS = {
  breadcrumbs: {
    parent: 'Store Settings',
    current: 'Operating Hours',
  },
  headerSaveLabel: 'Save Schedule',
  pageTitle: 'Manage Business Hours',
  pageDescription:
    'Set your weekly schedule and holiday closures. These hours are visible to customers on the Global Eats platform.',
  weeklySchedule: {
    title: 'Weekly Schedule',
    liveBadge: 'LIVE UPDATES',
    closedLabel: 'CLOSED FOR REST',
    toLabel: 'to',
    days: [
      { id: 'mon', label: 'Monday', open: true, openTime: '09:00 AM', closeTime: '09:00 PM' },
      { id: 'tue', label: 'Tuesday', open: true, openTime: '09:00 AM', closeTime: '09:00 PM' },
      { id: 'wed', label: 'Wednesday', open: true, openTime: '09:00 AM', closeTime: '09:00 PM' },
      { id: 'thu', label: 'Thursday', open: true, openTime: '09:00 AM', closeTime: '10:00 PM' },
      { id: 'fri', label: 'Friday', open: true, openTime: '10:00 AM', closeTime: '11:30 PM' },
      { id: 'sat', label: 'Saturday', open: true, openTime: '10:00 AM', closeTime: '11:30 PM' },
      { id: 'sun', label: 'Sunday', open: false },
    ],
  },
  instantClose: {
    title: 'Instant Close',
    description:
      'Need to shut down immediately due to an emergency or surge? This will hide your store from all platforms instantly.',
    buttonLabel: 'Close Store Now',
  },
  holidays: {
    title: 'Holiday Closures',
    addLabel: 'Add New',
    items: [
      { id: 'christmas', name: 'Christmas Day', date: 'Dec 25, 2024' },
      { id: 'new-year', name: "New Year's Day", date: 'Jan 01, 2025' },
    ],
  },
  tip: {
    title: 'Did you know?',
    description:
      'Stores that update their holiday hours 2 weeks in advance see 15% higher customer satisfaction scores.',
  },
  footer: {
    discardLabel: 'Discard Changes',
    saveLabel: 'Save Operating Schedule',
  },
  toast: {
    message: 'Changes synced to merchant network.',
  },
  mobile: {
    pageTitle: 'Operating Hours',
    subtitle: 'Configure your weekly operating schedule and holiday exceptions.',
    weeklySchedule: {
      closedLabel: 'CLOSED FOR REST',
      toLabel: 'to',
      days: [
        { id: 'mon', label: 'Mon', open: true, openTime: '09:00AM', closeTime: '09:00PM' },
        { id: 'tue', label: 'Tue', open: true, openTime: '09:00AM', closeTime: '09:00PM' },
        { id: 'wed', label: 'Wed', open: true, openTime: '09:00AM', closeTime: '09:00PM' },
        { id: 'thu', label: 'Thu', open: true, openTime: '09:00AM', closeTime: '10:00PM' },
        { id: 'fri', label: 'Fri', open: true, openTime: '10:00AM', closeTime: '11:30PM' },
        { id: 'sat', label: 'Sat', open: true, openTime: '10:00AM', closeTime: '11:30PM' },
        { id: 'sun', label: 'Sun', open: false },
      ],
    },
    emergency: {
      sectionTitle: 'Emergency',
      title: 'Instant Close',
      description: 'Suspend all operations immediately across the merchant network.',
      buttonLabel: 'Close Store Now',
    },
    holidays: {
      title: 'Holiday Closures',
      addLabel: '+ Add New',
      items: [
        { id: 'christmas', name: 'Christmas Day', date: 'Dec 25, 2024' },
        { id: 'new-year', name: "New Year's Day", date: 'Jan 01, 2025' },
      ],
    },
    discardLabel: 'Discard Changes',
  },
}
