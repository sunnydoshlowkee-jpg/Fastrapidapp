import { AlertTriangle, MoreVertical } from 'lucide-react'
import MerchantInventoryAvailabilityToggle from './MerchantInventoryAvailabilityToggle'
import MerchantInventoryCategoryBadge from './MerchantInventoryCategoryBadge'
import MerchantInventoryPagination from './MerchantInventoryPagination'

const columns = [
  { key: 'image', label: 'Image', className: 'w-[72px]' },
  { key: 'name', label: 'Product Name', className: 'min-w-[180px]' },
  { key: 'category', label: 'Category', className: 'min-w-[120px]' },
  { key: 'price', label: 'Price', className: 'min-w-[90px]' },
  { key: 'stock', label: 'Stock Qty', className: 'min-w-[100px]' },
  { key: 'availability', label: 'Availability', className: 'min-w-[110px]' },
  { key: 'actions', label: 'Actions', className: 'w-[72px] text-right' },
]

export default function MerchantInventoryTable({
  products,
  pagination,
  onPageChange,
  onToggleAvailability,
}) {
  return (
    <section className="overflow-hidden rounded-merchant-stat bg-merchant-surface shadow-merchant-stat">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[880px] border-collapse text-left">
          <thead>
            <tr className="border-b border-merchant-divider bg-merchant-canvas/60">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={`px-4 py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-merchant-muted lg:px-6 ${col.className}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-sm text-merchant-muted">
                  No products match your search.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-merchant-divider last:border-b-0 hover:bg-merchant-canvas/40"
                >
                  <td className="px-4 py-4 lg:px-6">
                    <img
                      src={product.imageUrl}
                      alt=""
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  </td>
                  <td className="px-4 py-4 lg:px-6">
                    <p className="text-sm font-semibold text-merchant-ink">{product.name}</p>
                    <p className="mt-0.5 text-xs text-merchant-muted">SKU: {product.sku}</p>
                  </td>
                  <td className="px-4 py-4 lg:px-6">
                    <MerchantInventoryCategoryBadge category={product.category} />
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold tabular-nums text-merchant-ink lg:px-6">
                    {product.price}
                  </td>
                  <td className="px-4 py-4 lg:px-6">
                    <span
                      className={`inline-flex items-center gap-1 text-sm font-semibold ${
                        product.stockWarning ? 'text-[#E67E22]' : 'text-merchant-ink'
                      }`}
                    >
                      {product.stockQty}
                      {product.stockWarning && (
                        <AlertTriangle size={14} strokeWidth={2} aria-hidden />
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-4 lg:px-6">
                    <MerchantInventoryAvailabilityToggle
                      enabled={product.available}
                      onChange={() => onToggleAvailability(product.id)}
                      label={`Toggle availability for ${product.name}`}
                    />
                  </td>
                  <td className="px-4 py-4 text-right lg:px-6">
                    <button
                      type="button"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-merchant-muted transition-colors hover:bg-merchant-icon-tile hover:text-merchant-ink"
                      aria-label={`Actions for ${product.name}`}
                    >
                      <MoreVertical size={18} strokeWidth={1.75} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <MerchantInventoryPagination
        page={pagination.page}
        pageSize={pagination.pageSize}
        total={pagination.total}
        onPageChange={onPageChange}
      />
    </section>
  )
}
