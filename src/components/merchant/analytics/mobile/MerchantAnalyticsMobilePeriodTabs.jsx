import { Calendar } from 'lucide-react'

export default function MerchantAnalyticsMobilePeriodTabs({ periods, activePeriod, onChange }) {
  return (
    <div
      className="flex gap-1 overflow-x-auto rounded-lg border border-merchant-divider bg-merchant-surface p-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="tablist"
      aria-label="Analytics period"
    >
      {periods.map((period) => {
        const isActive = activePeriod === period.id
        const isCustom = period.id === 'custom'

        return (
          <button
            key={period.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(period.id)}
            className={`flex shrink-0 items-center justify-center gap-1.5 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
              isActive
                ? 'bg-merchant-nav-active text-merchant-primary'
                : 'text-merchant-muted'
            }`}
          >
            {isCustom && <Calendar size={14} strokeWidth={1.75} aria-hidden />}
            {period.label}
          </button>
        )
      })}
    </div>
  )
}
