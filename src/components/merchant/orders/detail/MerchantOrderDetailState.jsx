import BrandedLoader from '../../../ui/BrandedLoader'

export default function MerchantOrderDetailState({ loading, error, order, children }) {
  if (loading) {
    return (
      <div className="flex min-h-full flex-1 flex-col">
        <BrandedLoader fill className="p-8" />
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
