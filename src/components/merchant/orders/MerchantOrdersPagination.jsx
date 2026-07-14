import { ChevronLeft, ChevronRight } from 'lucide-react'

function pageNumbers(current, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }
  const pages = new Set([1, totalPages, current, current - 1, current + 1])
  return [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b)
}

export default function MerchantOrdersPagination({
  page,
  pageSize,
  total,
  onPageChange,
  variant = 'desktop',
}) {
  const isMobile = variant === 'mobile'
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)
  const pages = pageNumbers(page, totalPages)

  return (
    <div
      className={`flex flex-col gap-4 border-t border-merchant-divider px-4 py-4 lg:px-6 ${
        isMobile ? 'items-center' : 'sm:flex-row sm:items-center sm:justify-between'
      }`}
    >
      <p className={`text-sm text-merchant-muted ${isMobile ? 'text-center' : ''}`}>
        Showing{' '}
        <span className="font-medium text-merchant-ink">
          {start}–{end}
        </span>{' '}
        of <span className="font-medium text-merchant-ink">{total}</span> orders
      </p>

      <nav
        className={`flex items-center gap-1 ${isMobile ? 'justify-center' : ''}`}
        aria-label="Orders pagination"
      >
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-merchant-muted transition-colors hover:bg-merchant-icon-tile disabled:pointer-events-none disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>

        {pages.map((p, i) => {
          const prev = pages[i - 1]
          const showEllipsis = prev != null && p - prev > 1

          return (
            <span key={p} className="flex items-center gap-1">
              {showEllipsis && (
                <span className="px-1 text-sm text-merchant-muted" aria-hidden>
                  …
                </span>
              )}
              <button
                type="button"
                onClick={() => onPageChange(p)}
                aria-current={p === page ? 'page' : undefined}
                className={`flex h-9 min-w-[36px] items-center justify-center rounded-lg px-2 text-sm font-semibold transition-colors ${
                  p === page
                    ? 'bg-merchant-primary text-white'
                    : 'text-merchant-ink hover:bg-merchant-icon-tile'
                }`}
              >
                {p}
              </button>
            </span>
          )
        })}

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-merchant-muted transition-colors hover:bg-merchant-icon-tile disabled:pointer-events-none disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </nav>
    </div>
  )
}
