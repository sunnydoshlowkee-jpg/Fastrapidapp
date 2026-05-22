/** Finance overview / Operations Control [362:922](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=362-922) */
import { ADMIN_PAYOUTS_PATH } from './adminPayouts.mock'
import { ADMIN_SETTINGS_FINANCE_PATH } from './adminPaths'
import { ADMIN_TRANSACTIONS_PATH } from './adminTransactions.mock'

export const ADMIN_FINANCE_OVERVIEW = {
  pageTitle: 'Operations Control',
  searchPlaceholder: 'Query ledger...',
  liveFeedLabel: 'Live Feed',
  lastUpdated: 'Last updated: Just now',
  kpis: [
    {
      id: 'gross',
      variant: 'metric',
      label: 'Gross Revenue',
      value: '₦4.2M',
      trend: '↑ 12.5% vs last wk',
      trendUp: true,
      sparkline: '0,20 15,12 30,18 45,8 60,14 75,6',
    },
    {
      id: 'net',
      variant: 'metric',
      label: 'Net Revenue',
      value: '₦3.8M',
      trend: '↑ 8.2% vs last wk',
      trendUp: true,
      sparkline: '0,18 15,14 30,10 45,16 60,8 75,12',
    },
    {
      id: 'commission',
      variant: 'metric',
      label: 'Commission',
      value: '₦450k',
      trend: '↑ 4.1% vs last wk',
      trendUp: true,
      sparkline: '0,22 15,16 30,20 45,12 60,18 75,10',
    },
    {
      id: 'pending',
      variant: 'alert',
      label: 'Pending Payouts',
      value: '₦120k',
      trend: '⚠ Action req. 5 items',
      trendUp: false,
    },
  ],
  revenueTrend: {
    title: '7-Day Revenue Trend',
    modes: [
      { id: 'vol', label: 'Vol' },
      { id: 'rev', label: 'Rev' },
    ],
    defaultMode: 'rev',
    yAxis: ['1M', '800k', '600k', '400k', '200k', '0'],
    days: [
      { label: 'Mon', rev: 520000, vol: 4200, active: false },
      { label: 'Tue', rev: 680000, vol: 5100, active: false },
      { label: 'Wed', rev: 610000, vol: 4800, active: false },
      { label: 'Thu', rev: 920000, vol: 6200, active: true },
      { label: 'Fri', rev: 740000, vol: 5500, active: false },
      { label: 'Sat', rev: 880000, vol: 5900, active: false },
      { label: 'Sun', rev: 450000, vol: 3600, active: false },
    ],
    maxRev: 1000000,
    maxVol: 7000,
  },
  attention: {
    message:
      'There are currently 5 payouts awaiting manual approval in the queue. Processing is recommended to avoid SLA breach.',
    highlight: '5 payouts',
    actionLabel: 'Review Queue',
    actionPath: ADMIN_PAYOUTS_PATH,
  },
  commandConsole: {
    title: 'Command Console',
    actions: [
      {
        id: 'log',
        label: 'Transaction Log',
        icon: 'file',
        path: ADMIN_TRANSACTIONS_PATH,
      },
      {
        id: 'export',
        label: 'Export Financial Data',
        icon: 'download',
      },
    ],
  },
}
