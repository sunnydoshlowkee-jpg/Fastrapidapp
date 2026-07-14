import { AlertTriangle, Package, TrendingUp, Wallet } from 'lucide-react'

const iconMap = {
  trending: TrendingUp,
  package: Package,
  wallet: Wallet,
  alert: AlertTriangle,
}

const toneStyles = {
  primary: 'bg-merchant-nav-active text-merchant-primary',
  warning: 'bg-[rgba(230,126,34,0.14)] text-[#E67E22]',
  muted: 'bg-merchant-icon-tile text-merchant-muted',
}

export default function MerchantInventoryMobileInsights({ title, insights }) {
  return (
    <section>
      <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-merchant-muted">{title}</h3>
      <div className="-mx-4 mt-3 flex gap-3 overflow-x-auto px-4 pb-1">
        {insights.map((insight) => {
          const Icon = iconMap[insight.icon] ?? TrendingUp
          const iconStyle = toneStyles[insight.tone] ?? toneStyles.primary

          return (
            <article
              key={insight.id}
              className="min-w-[140px] shrink-0 rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat"
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconStyle}`}>
                <Icon size={18} strokeWidth={1.75} aria-hidden />
              </div>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-wide text-merchant-muted">
                {insight.label}
              </p>
              {insight.value ? (
                <>
                  <p className="mt-1 text-xs font-medium text-merchant-muted">{insight.title}</p>
                  <p className="mt-0.5 text-base font-bold text-merchant-primary">{insight.value}</p>
                </>
              ) : (
                <>
                  <p className="mt-1 text-sm font-bold text-merchant-ink">{insight.title}</p>
                  <p className="mt-0.5 text-xs text-merchant-muted">{insight.subtext}</p>
                </>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
