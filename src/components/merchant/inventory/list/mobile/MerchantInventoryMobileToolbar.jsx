import { ChevronDown, Plus, Search } from 'lucide-react'

export default function MerchantInventoryMobileToolbar({
  searchPlaceholder,
  searchQuery,
  onSearchChange,
  bulkUpdateLabel,
  addItemLabel,
  onAddItem,
}) {
  return (
    <div className="flex flex-col gap-3">
      <label className="relative block">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-merchant-muted"
          aria-hidden
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full rounded-lg bg-merchant-input py-3 pl-11 pr-4 text-sm text-merchant-ink placeholder:text-merchant-muted focus:outline-none focus:ring-2 focus:ring-merchant-primary/20"
        />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onAddItem}
          className="flex items-center justify-center gap-2 rounded-lg bg-merchant-primary py-3 text-sm font-semibold text-white shadow-merchant-btn"
        >
          <Plus size={18} strokeWidth={2.5} aria-hidden />
          {addItemLabel}
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-lg bg-merchant-icon-tile py-3 text-sm font-semibold text-merchant-ink"
        >
          {bulkUpdateLabel}
          <ChevronDown size={16} className="text-merchant-muted" aria-hidden />
        </button>
      </div>
    </div>
  )
}
