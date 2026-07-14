export default function MerchantOrdersFilterBar({ filters, activeFilter, counts, onChange }) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="tablist"
      aria-label="Filter orders by status"
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id
        const count = filter.countKey ? counts[filter.countKey] : null
        const label = count != null && count > 0 ? `${filter.label} (${count})` : filter.label

        return (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(filter.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              isActive
                ? 'bg-merchant-primary text-white shadow-merchant-btn'
                : 'border border-merchant-divider bg-merchant-surface text-merchant-ink hover:bg-merchant-icon-tile'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
