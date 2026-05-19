const statusStyles = {
  in_stock: 'bg-[rgba(34,197,94,0.14)] text-[#16A34A]',
  out_of_stock: 'bg-[rgba(239,68,68,0.12)] text-red-600',
}

const statusLabels = {
  in_stock: 'In Stock',
  out_of_stock: 'Out of Stock',
}

export default function MerchantAnalyticsMobileTopPerformers({ products }) {
  return (
    <article className="rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat">
      <h2 className="text-base font-bold text-merchant-ink">Top Performers</h2>
      <ul className="mt-4 flex flex-col gap-3">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex items-center gap-3 rounded-lg border border-merchant-divider p-3"
          >
            <img
              src={product.image}
              alt=""
              className="h-12 w-12 shrink-0 rounded-lg object-cover"
            />
            <p className="min-w-0 flex-1 text-sm font-semibold text-merchant-ink">{product.name}</p>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                statusStyles[product.status] || statusStyles.in_stock
              }`}
            >
              {statusLabels[product.status] || product.status}
            </span>
          </li>
        ))}
      </ul>
    </article>
  )
}
