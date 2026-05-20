import { ChevronDown, Plus, Search } from 'lucide-react'

export default function MerchantInventoryToolbar({
  searchPlaceholder,
  searchQuery,
  onSearchChange,
  bulkUpdateLabel,
  addItemLabel,
  onAddItem,
}) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      <label className="relative block min-w-0 flex-1">
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
          className="w-full rounded-lg border border-merchant-divider bg-merchant-surface py-3 pl-11 pr-4 text-sm text-merchant-ink placeholder:text-merchant-muted focus:border-merchant-primary focus:outline-none focus:ring-2 focus:ring-merchant-primary/20"
        />
      </label>

      <div className="flex gap-3">
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-merchant-divider bg-merchant-surface px-4 py-3 text-sm font-semibold text-merchant-ink transition-colors hover:bg-merchant-icon-tile sm:flex-none"
        >
          {bulkUpdateLabel}
          <ChevronDown size={16} className="text-merchant-muted" aria-hidden />
        </button>
        <button
          type="button"
          onClick={onAddItem}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#F5B800] px-5 py-3 text-sm font-semibold text-merchant-ink shadow-merchant-btn transition-colors hover:bg-[#e0a800] sm:flex-none"
        >
          <Plus size={18} strokeWidth={2.5} aria-hidden />
          {addItemLabel}
        </button>
      </div>
    </div>
  )
}
