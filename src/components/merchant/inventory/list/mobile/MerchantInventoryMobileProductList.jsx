import { AlertTriangle } from 'lucide-react'
import MerchantInventoryRowActions from '../MerchantInventoryRowActions'

function StatusBadge({ stockWarning }) {
  if (stockWarning) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(230,126,34,0.12)] px-2 py-0.5 text-[10px] font-semibold text-[#E67E22]">
        <AlertTriangle size={10} strokeWidth={2} aria-hidden />
        Low Stock
      </span>
    )
  }

  return (
    <span className="inline-flex rounded-full bg-merchant-nav-active px-2 py-0.5 text-[10px] font-semibold text-merchant-primary">
      Active
    </span>
  )
}

export default function MerchantInventoryMobileProductList({
  products,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleAvailability,
}) {
  if (!products.length) {
    return (
      <p className="rounded-merchant-stat bg-merchant-surface px-4 py-8 text-center text-sm text-merchant-muted shadow-merchant-stat">
        No products yet. Add your first menu item to get started.
      </p>
    )
  }

  return (
    <ul className="space-y-3">
      {products.map((product) => (
        <li key={product.id}>
          <article className="rounded-merchant-stat bg-merchant-surface p-3 shadow-merchant-stat">
            <div className="flex gap-3">
              <img
                key={product.imageKey}
                src={product.imageUrl}
                alt=""
                className="h-14 w-14 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-bold text-merchant-ink">{product.name}</p>
                  <p className="shrink-0 text-sm font-bold text-merchant-ink">{product.price}</p>
                </div>
                <p className="mt-0.5 text-xs text-merchant-muted">
                  SKU: {product.mobileSku ?? product.sku}
                </p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <p className="text-xs text-merchant-muted">qty {product.stockQty}</p>
                  <StatusBadge stockWarning={product.stockWarning} />
                </div>
              </div>
              <MerchantInventoryRowActions
                product={product}
                icon="horizontal"
                onEdit={onEdit}
                onDelete={onDelete}
                onDuplicate={onDuplicate}
                onToggleAvailability={(item) => onToggleAvailability(item.id)}
              />
            </div>
          </article>
        </li>
      ))}
    </ul>
  )
}
