import { Link } from 'react-router-dom'

const statusStyles = {
  in_stock: 'bg-[rgba(34,197,94,0.14)] text-[#16A34A]',
  out_of_stock: 'bg-[rgba(239,68,68,0.12)] text-red-600',
}

const statusLabels = {
  in_stock: 'In Stock',
  out_of_stock: 'Out of Stock',
}

export default function MerchantAnalyticsTopPerformers({ products }) {
  return (
    <article className="rounded-merchant-stat bg-merchant-surface p-5 shadow-merchant-stat lg:p-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-merchant-ink">Top Performers</h2>
        <Link
          to="/merchant/menu"
          className="text-sm font-semibold text-merchant-primary hover:text-[#3837e6] hover:underline"
        >
          View All Inventory
        </Link>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-merchant-divider text-[10px] font-bold uppercase tracking-[0.08em] text-merchant-muted">
              <th className="pb-3 pr-4">Product</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3 pr-4 text-right">Units Sold</th>
              <th className="pb-3 text-right">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-merchant-divider last:border-0">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt=""
                      className="h-10 w-10 shrink-0 rounded-lg object-cover"
                    />
                    <span className="font-medium text-merchant-ink">{product.name}</span>
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                      statusStyles[product.status] || statusStyles.in_stock
                    }`}
                  >
                    {statusLabels[product.status] || product.status}
                  </span>
                </td>
                <td className="py-3 pr-4 text-right font-medium tabular-nums text-merchant-ink">
                  {product.unitsSold}
                </td>
                <td className="py-3 text-right font-semibold tabular-nums text-merchant-ink">
                  {product.revenue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  )
}
