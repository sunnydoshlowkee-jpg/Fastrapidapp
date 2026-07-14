export default function MerchantAnalyticsPeriodTabs({ periods, activePeriod, onChange }) {
  return (
    <div
      className="flex gap-1 rounded-lg border border-merchant-divider bg-merchant-surface p-1 shadow-merchant-stat sm:inline-flex sm:w-auto"
      role="tablist"
      aria-label="Analytics period"
    >
      {periods.map((period) => {
        const isActive = activePeriod === period.id
        return (
          <button
            key={period.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(period.id)}
            className={`min-w-[4.5rem] rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
              isActive
                ? 'bg-merchant-primary text-white shadow-sm'
                : 'text-merchant-muted hover:bg-merchant-icon-tile hover:text-merchant-ink'
            }`}
          >
            {period.label}
          </button>
        )
      })}
    </div>
  )
}
