export default function MerchantAnalyticsMobilePeriodTabs({
  periods,
  activePeriod,
  onChange,
  customRange,
  onCustomRangeChange,
}) {
  return (
    <div className="space-y-3">
      <div
        className="flex gap-1 overflow-x-auto rounded-lg border border-merchant-divider bg-merchant-surface p-1"
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
              className={`min-w-[4rem] flex-1 rounded-md px-3 py-2 text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-merchant-primary text-white shadow-sm'
                  : 'text-merchant-muted'
              }`}
            >
              {period.label}
            </button>
          )
        })}
      </div>

      {activePeriod === 'custom' && customRange && onCustomRangeChange ? (
        <div className="grid grid-cols-2 gap-2">
          <label className="text-xs text-merchant-muted">
            From
            <input
              type="date"
              value={customRange.from}
              onChange={(e) =>
                onCustomRangeChange({ ...customRange, from: e.target.value })
              }
              className="mt-1 w-full rounded-lg border border-merchant-divider bg-white px-2 py-2 text-sm"
            />
          </label>
          <label className="text-xs text-merchant-muted">
            To
            <input
              type="date"
              value={customRange.to}
              onChange={(e) =>
                onCustomRangeChange({ ...customRange, to: e.target.value })
              }
              className="mt-1 w-full rounded-lg border border-merchant-divider bg-white px-2 py-2 text-sm"
            />
          </label>
        </div>
      ) : null}
    </div>
  )
}
