export default function MerchantOrdersMobileFilterBar({
  filters,
  activeFilter,
  counts,
  onChange,
}) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="tablist"
      aria-label="Filter orders by status"
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id
        const count = filter.countKey ? counts[filter.countKey] : null

        return (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(filter.id)}
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              isActive
                ? 'bg-merchant-primary text-white shadow-merchant-btn'
                : 'bg-merchant-surface text-merchant-muted shadow-merchant-stat'
            }`}
          >
            {filter.label}
            {count != null && !isActive && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-merchant-primary px-1.5 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
