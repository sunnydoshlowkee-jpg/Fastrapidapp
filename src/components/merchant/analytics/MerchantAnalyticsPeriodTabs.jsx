export default function MerchantAnalyticsPeriodTabs({
  periods,
  activePeriod,
  onChange,
  customRange,
  onCustomRangeChange,
}) {
  return (
    <div className="space-y-3">
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

      {activePeriod === 'custom' && customRange && onCustomRangeChange ? (
        <div className="flex flex-wrap items-end gap-3">
          <label className="text-sm text-merchant-muted">
            From
            <input
              type="date"
              value={customRange.from}
              onChange={(e) =>
                onCustomRangeChange({ ...customRange, from: e.target.value })
              }
              className="mt-1 block rounded-lg border border-merchant-divider bg-white px-3 py-2 text-sm text-merchant-ink"
            />
          </label>
          <label className="text-sm text-merchant-muted">
            To
            <input
              type="date"
              value={customRange.to}
              onChange={(e) =>
                onCustomRangeChange({ ...customRange, to: e.target.value })
              }
              className="mt-1 block rounded-lg border border-merchant-divider bg-white px-3 py-2 text-sm text-merchant-ink"
            />
          </label>
        </div>
      ) : null}
    </div>
  )
}
