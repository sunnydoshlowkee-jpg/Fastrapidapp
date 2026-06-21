export default function MerchantOrderDetailState({ loading, error, order, children }) {
  if (loading) {
    return (
      <div className="flex min-h-full flex-1 items-center justify-center p-8 text-sm text-merchant-muted">
        Loading order details...
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="flex min-h-full flex-1 items-center justify-center p-8 text-center text-sm text-merchant-muted">
        {error || 'Order not found.'}
      </div>
    )
  }

  return children
}
