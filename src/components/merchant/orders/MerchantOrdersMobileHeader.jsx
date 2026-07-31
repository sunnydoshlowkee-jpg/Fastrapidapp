import MerchantHeaderActions from '../layout/MerchantHeaderActions'

export default function MerchantOrdersMobileHeader() {
  return (
    <header className="flex items-center justify-between gap-4">
      <h1 className="text-xl font-bold tracking-[-0.02em] text-merchant-ink">Orders</h1>
      <MerchantHeaderActions
        iconClassName="text-merchant-muted"
        iconSize={20}
        bellClassName="h-10 w-10 rounded-full"
        profileClassName="h-10 w-10 rounded-full border border-merchant-field-border bg-white text-merchant-ink"
      />
    </header>
  )
}
