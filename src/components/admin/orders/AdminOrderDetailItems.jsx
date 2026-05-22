export default function AdminOrderDetailItems({ items }) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-base font-bold text-gray-900">{items.title}</h2>
      <ul className="mt-4 divide-y divide-gray-100">
        {items.lines.map((line) => (
          <li key={line.id} className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900">
                <span className="text-gray-500">{line.qty}x</span> {line.name}
              </p>
              {line.note ? (
                <p className="mt-0.5 text-xs text-gray-500">{line.note}</p>
              ) : null}
            </div>
            <span className="shrink-0 text-sm font-semibold text-gray-800">₦{line.price}</span>
          </li>
        ))}
      </ul>
      <dl className="mt-6 space-y-2 border-t border-gray-100 pt-4 text-sm">
        <div className="flex justify-between text-gray-600">
          <dt>Subtotal</dt>
          <dd className="font-medium text-gray-800">₦{items.subtotal}</dd>
        </div>
        <div className="flex justify-between text-gray-600">
          <dt>Delivery Fee</dt>
          <dd className="font-medium text-gray-800">₦{items.deliveryFee}</dd>
        </div>
        <div className="flex justify-between text-gray-600">
          <dt>Service Charge</dt>
          <dd className="font-medium text-gray-800">₦{items.serviceCharge}</dd>
        </div>
        <div className="flex justify-between border-t border-gray-100 pt-3 text-base">
          <dt className="font-bold text-gray-900">Total</dt>
          <dd className="font-bold text-violet-600">₦{items.total}</dd>
        </div>
      </dl>
    </article>
  )
}
