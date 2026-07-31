import { Plus, Search } from 'lucide-react'

export default function MerchantInventoryMobileToolbar({
  searchPlaceholder,
  searchQuery,
  onSearchChange,
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

      <button
        type="button"
        onClick={onAddItem}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-merchant-primary py-3 text-sm font-semibold text-white shadow-merchant-btn"
      >
        <Plus size={18} strokeWidth={2.5} aria-hidden />
        {addItemLabel}
      </button>
    </div>
  )
}
