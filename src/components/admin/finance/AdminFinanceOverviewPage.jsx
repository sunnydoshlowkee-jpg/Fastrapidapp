import { useOutletContext } from 'react-router-dom'
import { ADMIN_FINANCE_OVERVIEW } from '../../../services/data/adminFinanceOverview.mock'
import AdminFinanceAttentionCard from './AdminFinanceAttentionCard'
import AdminFinanceCommandConsole from './AdminFinanceCommandConsole'
import AdminFinanceKpiCards from './AdminFinanceKpiCards'
import AdminFinanceOverviewMobilePage from './AdminFinanceOverviewMobilePage'
import AdminFinanceRevenueChart from './AdminFinanceRevenueChart'

export default function AdminFinanceOverviewPage() {
  const data = ADMIN_FINANCE_OVERVIEW
  const context = useOutletContext() ?? {}

  return (
    <>
      <div className="flex h-full min-h-0 flex-1 lg:hidden">
        <AdminFinanceOverviewMobilePage
          mobile={data.mobile}
          onOpenDrawer={context.openDrawer}
        />
      </div>

      <div className="hidden space-y-6 p-6 lg:block">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
        {data.liveFeedLabel}
        <span className="mx-2 text-gray-300" aria-hidden>
          •
        </span>
        {data.lastUpdated}
      </p>

      <AdminFinanceKpiCards kpis={data.kpis} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <AdminFinanceRevenueChart revenueTrend={data.revenueTrend} />
        </div>
        <div className="space-y-4">
          <AdminFinanceAttentionCard attention={data.attention} />
          <AdminFinanceCommandConsole commandConsole={data.commandConsole} />
        </div>
      </div>
      </div>
    </>
  )
}
