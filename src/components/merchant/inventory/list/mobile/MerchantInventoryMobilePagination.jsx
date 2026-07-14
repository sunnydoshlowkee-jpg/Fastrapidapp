import { ChevronLeft, ChevronRight } from 'lucide-react'

function pageNumbers(current, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }
  return [1, 2, 3].filter((p) => p <= totalPages)
}

export default function MerchantInventoryMobilePagination({ page, pageSize, total, onPageChange }) {
  const displayEnd = Math.min(page * pageSize, total)
  const displayCount = total === 0 ? 0 : displayEnd
  const totalPages = Math.max(1, Math.ceil(Math.max(total, 1) / pageSize))
  const pages = pageNumbers(page, totalPages)

  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-xs text-merchant-muted">
        Showing <span className="font-medium text-merchant-ink">{displayCount}</span> of{' '}
        <span className="font-medium text-merchant-ink">{total.toLocaleString()}</span> products
      </p>

      <nav className="flex items-center gap-1" aria-label="Inventory pagination">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-merchant-muted disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            aria-current={p === page ? 'page' : undefined}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
              p === page
                ? 'bg-merchant-primary text-white'
                : 'text-merchant-ink'
            }`}
          >
            {p}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-merchant-muted disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </nav>
    </div>
  )
}
